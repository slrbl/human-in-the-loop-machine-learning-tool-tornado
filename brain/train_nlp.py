# Model training python Script
import requests
import json
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
import argparse
import sys
from sklearn import ensemble


parser = argparse.ArgumentParser()
parser.add_argument('-f', '--features', help="Comma separated list of the features to consider")
parser.add_argument('-l', '--label', help="The lable attribute")
parser.add_argument('-i', '--es_id', help="Elasticseach data id")
parser.add_argument('-s', '--es_address', help="Elasticseach data id")

args = parser.parse_args()

print args.features
print args.label
print args.es_id

features = args.features
label = args.label
es_id = args.es_id
es_id = args.es_address

source = features.split(',')
source.append(label)

#URL = "http://localhost:9200/lake/stats/_search/"
URL = es_address + '/_search/'
query = {'query':{'bool': {'must': [{'match': {'es_id': es_id}}, {'match': {'es_id': es_id}}]}}, 'size': 10000, '_source': source}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

response = requests.get(URL, data = json.dumps(query), headers = headers)
result =  json.loads(response.text)


# Vectorization
vectors = {}
for feature in features.split(','):
    vectors[feature] = []


vectors[label]=[]
print vectors



bag = []

for unit in result['hits']['hits']:
    for feature in unit['_source']:
        if feature != label:
            words = unit['_source'][feature].lower().replace('!',' ').replace('.',' ').replace('?',' ').replace('-',' ').replace('/',' ').replace('(',' ').replace(')',' ').split(' ')
            for word in words:
                if word not in bag and len(word)>=2: bag.append(word)
            print "----------"
    if unit['_source'][label]!='empty' and unit['_source'][label] not in vectors[label]:vectors[label].append(unit['_source'][label])


print bag
print len(bag)

print vectors[label]

for vector in vectors:
    print vector
    print vectors[vector]
    print '------'

#   print result

X = []
y = []
print label
for unit in result['hits']['hits']:
    if unit['_source'][label]!='empty':

        print '---'
        print unit['_source']
        x=[0]*len(bag)
        for feature in unit['_source']:
            if feature!=label:
                print feature
                words = unit['_source'][feature].lower().replace('!',' ').replace('.',' ').replace('?',' ').replace('-',' ').replace('/',' ').replace('(',' ').replace(')',' ').split(' ')
                print words
                for word in words:
                    if len(word)>=2:
                        x[bag.index(word)]=1
                    print x
            else:
                y.append(vectors[label].index(unit['_source'][label]))
        X.append(x)

print len(X)
print len(y)
print y


# Train a classifier
#clf = LogisticRegression(random_state = 0, solver='lbfgs', multi_class = 'multinomial').fit(X, y)

# Train a GradientBoostingClassifier classifier
clf = ensemble.GradientBoostingClassifier()

clf = clf.fit(X, y)

URL = es_address + '/_search/'
query = {'query':{'bool': {'must': [{'match': {'es_id': es_id}}, {'match': {'es_id': es_id}}]}}, 'size': 10000}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

response = requests.get(URL, data = json.dumps(query), headers = headers)
result =  json.loads(response.text)

for unit in result['hits']['hits']:
    print unit['_source']['auto_label']
    doc_id = unit['_id']

    URL = es_address + '/' + doc_id + '/_update'
    print URL

    current_features = [0.]*len(bag)
    for f in args.features.split(","):
        words = unit['_source'][f].lower().replace('!',' ').replace('.',' ').replace('?',' ').replace('-',' ').replace('/',' ').replace('(',' ').replace(')',' ').split(' ')
        for word in words:
            if len(word)>=2:current_features[bag.index(word)]= 1.

    print current_features

    current_proba = clf.predict_proba([current_features])[0]
    current_prediction = clf.predict([current_features])[0]
    print '----'
    pred=int(current_prediction)
    print '----'

    data = {'doc':{'auto_label':vectors[label][pred],'auto_proba':current_proba[pred]}}

    print requests.post(URL, data = json.dumps(data), headers = headers).text
