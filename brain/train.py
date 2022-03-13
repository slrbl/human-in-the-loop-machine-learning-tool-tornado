# Model training python Script
# Tornado project
# Author: Walid Daboubi
# version: 1.0 - 2018/01/16

import requests
import json
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
import argparse
from sklearn import ensemble
import sys

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--features', help="Comma separated list of the features to consider")
parser.add_argument('-l', '--label', help="The label attribute")
parser.add_argument('-i', '--es_id', help="Elasticseach data id")
parser.add_argument('-s', '--es_address', help="Elasticseach data id")

# getting arguments
args = parser.parse_args()
features = args.features
label = args.label
es_id = args.es_id
es_address = args.es_address

# Constants
HEADERS = {'Content-type': 'application/json', 'Accept': 'application/json'}


source = features.split(',')
source.append(label)


es_url = '{}/_search'.format(es_address)
query = {'query':{'bool': {'must': [{'match': {'es_id': es_id}}, {'match': {'es_id': es_id}}]}}, 'size': 10000, '_source': source}
response = requests.get(es_url, data = json.dumps(query), headers = HEADERS)
data_result =  json.loads(response.text)

# Vectorization
vectors = {}
for feature in features.split(','):
    vectors[feature] = []
vectors[label] = []


for unit in data_result['hits']['hits']:
    for feature in unit['_source']:
        print (type(unit['_source'][feature]))
        if feature != label and unit['_source'][feature] not in vectors[feature]:
            vectors[feature].append(unit['_source'][feature])
    if unit['_source'][label] != 'empty' and unit['_source'][label] not in vectors[label]:vectors[label].append(unit['_source'][label])


# X,y initialization
X = []
y = []

for unit in data_result['hits']['hits']:
    if unit['_source'][label] != 'empty':
        x = []
        for feature in unit['_source']:
            try:
                if feature != label:x.append(float(unit['_source'][feature]))
            except:
                if feature != label:x.append(float(vectors[feature].index(unit['_source'][feature])))
        y.append(vectors[label].index(unit['_source'][label]))
        X.append(x)

# Train a LogisticRegression classifier
clf = LogisticRegression(random_state = 0, solver='lbfgs', multi_class = 'multinomial').fit(X, y)

# Label the data units without human label
es_url = '{}/_search/'.format(es_address)
query = {'query':{'bool': {'must': [{'match': {'es_id': es_id}}, {'match': {'es_id': es_id}}]}}, 'size': 10000}
response = requests.get(es_url, data = json.dumps(query), headers = HEADERS)
data_result =  json.loads(response.text)

for unit in data_result['hits']['hits']:
    # Get the current data unit id
    doc_id = unit['_id']
    es_url = '{}/{}/_update'.format(es_address, doc_id)
    current_features = []
    for feature in args.features.split(','):
        try:
            current_features.append(float(unit['_source'][feature]))
        except:
            current_features.append(float(vectors[f].index(unit['_source'][f])))
    current_proba = clf.predict_proba([current_features])[0]
    current_prediction = clf.predict([current_features])[0]
    data = {'doc':{'auto_label':vectors[label][current_prediction],'auto_proba':current_proba[current_prediction]}}
    query = {'query':{'bool': {'must': [{'match': {'es_id': es_id}}, {'match': {'es_id': es_id}}]}}, 'size': 1000, '_source': source}
    try:
        print(requests.post(es_url, data = json.dumps(data), headers = HEADERS).text)
    except:
        print("Something went wrong saving the label for {}".format(doc_id))
