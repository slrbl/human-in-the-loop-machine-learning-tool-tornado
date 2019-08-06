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

args = parser.parse_args()

print args.features
print args.label
print args.es_id

features = args.features
label = args.label
es_id = args.es_id
es_address = args.es_address

source = features.split(',')
source.append(label)


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

for unit in result['hits']['hits']:
    for feature in unit['_source']:
        print type(unit['_source'][feature])
        if feature!=label and unit['_source'][feature] not in vectors[feature]:
            vectors[feature].append(unit['_source'][feature])
    if unit['_source'][label]!='empty' and unit['_source'][label] not in vectors[label]:vectors[label].append(unit['_source'][label])

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
        x=[]
        for feature in unit['_source']:
            #if feature!=label:x.append(float(unit['_source'][feature]))

            try:
                if feature!=label:x.append(float(unit['_source'][feature]))
            except:
                if feature!=label:x.append(float(vectors[feature].index(unit['_source'][feature])))
        #y.append(int(unit['_source'][label]))
        y.append(vectors[label].index(unit['_source'][label]))

        print '---------------'
        print x
        print '---------------'

        X.append(x)


# 749
# 728
#439
#839
#876

print X
print '-----'
print y

# Train a LogisticRegression classifier
clf = LogisticRegression(random_state = 0, solver='lbfgs', multi_class = 'multinomial').fit(X, y)


# Train a GradientBoostingClassifier classifier
#clf = ensemble.GradientBoostingClassifier()

"""#criterion='friedman_mse', init=None,
                                           learning_rate=0.1, loss='deviance', max_depth=3,
                                           max_features=None, max_leaf_nodes=None,
                                           min_samples_leaf=1,
                                           min_samples_split=2, min_weight_fraction_leaf=0.0,
                                           n_estimators=100, presort='auto', random_state=None,
                                           subsample=1.0, verbose=0, warm_start=False)"""
#clf = clf.fit(X, y)



# Label the data units without human label
#URL = "http://localhost:9200/lake/stats/_search/"
URL = es_address + '/_search/'
query = {'query':{'bool': {'must': [{'match': {'es_id': es_id}}, {'match': {'es_id': es_id}}]}}, 'size': 10000}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

response = requests.get(URL, data = json.dumps(query), headers = headers)
result =  json.loads(response.text)

for unit in result['hits']['hits']:
    print unit['_source']['auto_label']
    doc_id = unit['_id']

    URL = es_address + '/'+doc_id + '/_update'
    print URL

    current_features = []
    for f in args.features.split(","):
        try:
            current_features.append(float(unit['_source'][f]))
        except:
            current_features.append(float(vectors[f].index(unit['_source'][f])))
    print current_features
    current_proba = clf.predict_proba([current_features])[0]
    current_prediction = clf.predict([current_features])[0]

    print current_prediction
    print vectors[label]
    print current_prediction
    print vectors[label][current_prediction]
    print current_proba
    print '--------'
    print clf.predict([current_features])
    print clf.predict_proba([current_features])
    print '--------'
    data = {'doc':{'auto_label':vectors[label][current_prediction],'auto_proba':current_proba[current_prediction]}}

    query = {'query':{'bool': {'must': [{'match': {'es_id': es_id}}, {'match': {'es_id': es_id}}]}}, 'size': 1000, '_source': source}


    print requests.post(URL, data = json.dumps(data), headers = headers).text
