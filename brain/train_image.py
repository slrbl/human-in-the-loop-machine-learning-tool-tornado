# About: Image classfication for Tornado Human in The loop Machine Learning
# Review: 2021/06/28

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import argparse
import sys
import requests
import json
from shutil import copyfile
import os
import operator
import numpy as np


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-d",
        "--data_location",
        help='The location where training data is located. Every class needs to be stored in separate folder for training.',
        required=False,
    )
    parser.add_argument(
        "-i",
        "--es_id",
        help='Elasticseach dataset id',
        required=True,
    )
    parser.add_argument(
        '-s',
        '--es_address',
        help="Elasticseach address",
        required=True,
    )
    parser.add_argument(
        "-t",
        "--train_mode",
        help='Use it only for predict mode',
        action='store_true',
    )
    return vars(parser.parse_args())


def execute_cmd(cmd):
    print ("Executing the command:")
    print(cmd)
    try:
        output = os.popen(cmd).read()
    except:
        output = "Something went wrong running the above command"
    return output


# Build model
def make_model(input_shape, num_classes):
    inputs = keras.Input(shape=input_shape)
    # Image augmentation block
    x = data_augmentation(inputs)

    # Entry block
    x = layers.experimental.preprocessing.Rescaling(1.0 / 255)(x)
    x = layers.Conv2D(32, 3, strides=2, padding="same")(x)
    x = layers.BatchNormalization()(x)
    x = layers.Activation("relu")(x)
    x = layers.Conv2D(64, 3, padding="same")(x)
    x = layers.BatchNormalization()(x)
    x = layers.Activation("relu")(x)
    previous_block_activation = x  # Set aside residual
    for size in [128, 256, 512, 728]:
        x = layers.Activation("relu")(x)
        x = layers.SeparableConv2D(size, 3, padding="same")(x)
        x = layers.BatchNormalization()(x)
        x = layers.Activation("relu")(x)
        x = layers.SeparableConv2D(size, 3, padding="same")(x)
        x = layers.BatchNormalization()(x)
        x = layers.MaxPooling2D(3, strides=2, padding="same")(x)
        # Project residual
        residual = layers.Conv2D(size, 1, strides=2, padding="same")(
            previous_block_activation
        )
        x = layers.add([x, residual])  # Add back residual
        previous_block_activation = x  # Set aside next residual
    x = layers.SeparableConv2D(1024, 3, padding="same")(x)
    x = layers.BatchNormalization()(x)
    x = layers.Activation("relu")(x)
    x = layers.GlobalAveragePooling2D()(x)
    if num_classes == 2:
        activation = "sigmoid"
        units = 1
    else:
        activation = "softmax"
        units = num_classes
        #units = 1
    x = layers.Dropout(0.5)(x)
    outputs = layers.Dense(units, activation=activation)(x)
    return keras.Model(inputs, outputs)


def get_possible_classes(es_data):
    humna_label_count = 0
    classes = []
    for unit in es_data:
        unit = unit['_source']
        if (unit[human_label_key] != None and len(unit[human_label_key])>0 and unit[human_label_key] != 'empty'):
            humna_label_count+=1
            class_name = str(unit[human_label_key]).lower()
            if class_name not in classes:
                classes.append(class_name)
    return humna_label_count,classes


def remove_corrupted_files(classes, data_folder):
    num_skipped = 0
    for folder_name in classes:
        folder_name = folder_name.replace(' ','')
        folder_path = os.path.join(data_folder, folder_name)
        files = [f for f in os.listdir(folder_path) if os.path.isfile(f)]
        for fname in files:
            fpath = os.path.join(folder_path, fname)
            print(fpath)
            try:
                fobj = open(fpath, "rb")
                is_jfif = tf.compat.as_bytes("JFIF") in fobj.peek(10)
            finally:
                fobj.close()
            if not is_jfif:
                num_skipped += 1
                # Delete corrupted image
                os.remove(fpath)
    print("Deleted %d images" % num_skipped)

ARGS = get_args()

EPOCHS = 50

TRAIN_MODE = ARGS["train_mode"]
DATA_FOLDER = ARGS["data_location"]
ES_ID = ARGS['es_id']
ES_ADDRESS = ARGS['es_address']
human_label_key = ES_ID + '_human_label'

image_size = (180, 180)
#image_size = (32, 32)


# Pprepare data folders
URL = ES_ADDRESS + '/_search/'
query = {'query':{'bool': {'must': [{'match': {'es_id': ES_ID}}, {'match': {'es_id': ES_ID}}]}}, 'size': 10000}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
response = requests.get(URL, data = json.dumps(query), headers = headers)
result =  json.loads(response.text)

humna_label_count,classes = get_possible_classes(result['hits']['hits'])



print (classes)

try:
    os.mkdir('tmp/{}'.format(str(ES_ID)))
    os.mkdir('tmp/{}/classes'.format(str(ES_ID)))
    for class_name in classes:
        #os.mkdir('tmp/'+str(ES_ID)+'/classes/'+class_name)
        os.mkdir('tmp/{}/classes/{}'.format(str(ES_ID),class_name))
except:
    print("Temporary directory data already exist")


# Count number of data units per class
class_count={}
for class_name in classes:
    class_count[class_name] = 0
data_size = 0
for unit in result['hits']['hits']:
    unit = unit['_source']
    if (unit[human_label_key] != None and len(unit[human_label_key])>0 and unit[human_label_key] != 'empty' and unit[human_label_key] != ' '):
        image_file = unit['image_file']
        class_name = str(unit[human_label_key]).lower()
        class_count[class_name]+=1
        src = 'public/datasets/{}/{}'.format(ES_ID, image_file)
        #dst = 'tmp/'+str(es_id)+'/classes/'+class_name.replace(' ','')+'/'+image_file

        # Create class folder if doenst exist
        try:
            os.mkdir('tmp/{}/classes/{}'.format(str(ES_ID),class_name))
        except:
            print("Temporary directory data already exist")

        dst = 'tmp/{}/classes/{}/{}'.format(str(ES_ID), class_name.replace(' ',''), image_file)
        print('Source file {}'.format(src))
        print('Destination file {}'.format(dst))
        print(copyfile(src, dst))
        data_size+=1

# Balance dataset
bigger_class = max(class_count, key=class_count.get)
lower_class = min(class_count, key=class_count.get)
diff = class_count[bigger_class]-class_count[lower_class]
# Balance dataset
count=0

# sort all the data inits of the bigger class by confidence
bigger_class_probs = {}
for unit in result['hits']['hits']:
    unit = unit['_source']
    if (unit[human_label_key] == bigger_class):
        if 'auto_proba' in unit:
            bigger_class_probs[unit['image_file']] = unit['auto_proba']
        else:
            bigger_class_probs[unit['image_file']] = 0

print('*'*600)
bigger_class_probs_sorted = {k: v for k, v in sorted(bigger_class_probs.items(), key=lambda item: item[1],reverse=True)}
print(bigger_class_probs_sorted)
print('*'*600)

"""
# Parse all the image files of the bigger class
# for file_to_remove in os.listdir('tmp/'+str(es_id)+'/classes/'+bigger_class):
# remove the files with the highest confidence
for file_to_remove in bigger_class_probs_sorted:
    #os.remove('tmp/'+str(es_id)+'/classes/'+bigger_class+'/'+file_to_remove)
    os.remove('tmp/{}/classes/{}/{}'.format(str(ES_ID), bigger_class, file_to_remove))
    if count==diff:
        break
    count+=1


print(bigger_class)
print(lower_class)
print(diff)
"""

#DATA_FOLDER = 'tmp/'+str(es_id)+'/classes/'
DATA_FOLDER = 'tmp/{}/classes/'.format(str(ES_ID))

# Check and delete corrupted images
remove_corrupted_files(classes, DATA_FOLDER)


if len(classes) == 2:
    label_mode='binary'
else:
    label_mode='categorical'

# Generate a Dataset
batch_size = 32
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATA_FOLDER,
    validation_split=0.1,
    subset="training",
    seed=100,
    image_size=image_size,
    batch_size=batch_size,
    label_mode=label_mode
)
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATA_FOLDER,
    validation_split=0.1,
    subset="validation",
    seed=100,
    image_size=image_size,
    batch_size=batch_size,
    label_mode=label_mode
)
# Using image data augmentation
data_augmentation = keras.Sequential(
    [

        #layers.experimental.preprocessing.RandomFlip("horizontal"), # Desactivated for romain number use case
        layers.experimental.preprocessing.RandomRotation(0.1),
    ]
)
# Configure the dataset for performance
train_ds = train_ds.prefetch(buffer_size=32)
val_ds = val_ds.prefetch(buffer_size=32)
print(len(classes))
model = make_model(input_shape=image_size + (3,), num_classes=len(classes))
# Train model
epochs = EPOCHS
callbacks = [
    keras.callbacks.ModelCheckpoint('tmp/'+str(ES_ID)+'/save_at_{epoch}.h5'),
]
model.compile(
    optimizer=keras.optimizers.Adam(1e-3),
    loss="binary_crossentropy",
    metrics=["accuracy"],
)
history = model.fit(
    train_ds, epochs=epochs, callbacks=callbacks, validation_data=val_ds,
)
model.save('tmp/'+str(ES_ID)+'/model.h5')
print ("4"*100)
print (history.history)
print ("4"*100)

min_confidence = 1
max_confidence = 0

compatible_human_machine_count = 0

if len(classes)>2:
    # Claases neeed to be sorted by alphabetical oder
    #https://stackoverflow.com/questions/38971293/get-class-labels-from-keras-functional-model
    classes = sorted(classes)
    # ['iv', 'i', 'viii', 'vi', 'ix', 'v', 'ii', 'vii', 'x', 'iii', 'xii']

for unit in result['hits']['hits']:
    doc_id = unit['_id']
    unit = unit['_source']
    image_file_name = unit['image_file']
    image_path = 'public/datasets/'+ES_ID+'/'+image_file_name
    img = keras.preprocessing.image.load_img(
        image_path, target_size=image_size
    )
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create batch axis
    predictions = model.predict(img_array)

    print ("--------------------------------------------------------------------------------------------------------------------")
    print (predictions)
    print(image_path)
    print(predictions)
    if len(classes)>2:
        scores = predictions[0]
        pred_confidence = max(scores)
        max_score_index = np.where(scores == pred_confidence)[0][0]
        print(pred_confidence)
        print (max_score_index)
        print (classes)
        pred = classes[max_score_index]
        print(pred)
        print ("===========")
        #pred=str(np.argmax(tf.nn.softmax(predictions[0])))
        #print(pred)
    else:
        if predictions[0][0]>0.5:
            pred = classes[0]
            pred_confidence = predictions[0][0]
        else:
            pred = classes[1]
            pred_confidence = 1-predictions[0][0]

        print (pred)
        print(pred_confidence)
    if pred_confidence>max_confidence:
        max_confidence = pred_confidence
    if pred_confidence<min_confidence:
        min_confidence = pred_confidence
    if unit[human_label_key] == pred:
        compatible_human_machine_count += 1
    # Update the prediction in ES
    URL = ES_ADDRESS + '/'+doc_id + '/_update'
    data = {'doc':{'auto_label':pred,'auto_proba':str(pred_confidence)}}
    print (requests.post(URL, data = json.dumps(data), headers = headers).text)


# Add training to the database
print(execute_cmd("rails runner \"Training.create(es_id:'{}',acc:{},val_acc:{},seed_size:{},min_confidence:{},max_confidence:{},humna_label_count:{},compatible_human_machine_count:{})\"".format(ES_ID,history.history['accuracy'][-1],history.history['val_accuracy'][-1],data_size,min_confidence,max_confidence,humna_label_count,compatible_human_machine_count)))
# Update dataset status
print(execute_cmd("rails runner \"Dataset.find_by_es_id('{}').update(status:'ready')\"".format(ES_ID)))
