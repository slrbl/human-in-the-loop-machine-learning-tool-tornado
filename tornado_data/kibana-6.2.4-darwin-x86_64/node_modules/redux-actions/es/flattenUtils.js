import camelCase from './camelCase';
import ownKeys from './ownKeys';
import hasGeneratorInterface from './hasGeneratorInterface';
import isPlainObject from 'lodash-es/isPlainObject';

var defaultNamespace = '/';

var flattenWhenNode = function flattenWhenNode(predicate) {
  return function flatten(map) {
    var namespace = arguments.length <= 1 || arguments[1] === undefined ? defaultNamespace : arguments[1];
    var partialFlatMap = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var partialFlatActionType = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

    function connectNamespace(type) {
      return partialFlatActionType ? '' + partialFlatActionType + namespace + type : type;
    }

    ownKeys(map).forEach(function (type) {
      var nextNamespace = connectNamespace(type);
      var mapValue = map[type];

      if (!predicate(mapValue)) {
        partialFlatMap[nextNamespace] = map[type];
      } else {
        flatten(map[type], namespace, partialFlatMap, nextNamespace);
      }
    });

    return partialFlatMap;
  };
};

var flattenActionMap = flattenWhenNode(isPlainObject);
var flattenReducerMap = flattenWhenNode(function (node) {
  return isPlainObject(node) && !hasGeneratorInterface(node);
});

function unflattenActionCreators(flatActionCreators) {
  var namespace = arguments.length <= 1 || arguments[1] === undefined ? defaultNamespace : arguments[1];

  function unflatten(flatActionType) {
    var partialNestedActionCreators = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var partialFlatActionTypePath = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    var nextNamespace = camelCase(partialFlatActionTypePath.shift());
    if (partialFlatActionTypePath.length) {
      if (!partialNestedActionCreators[nextNamespace]) {
        partialNestedActionCreators[nextNamespace] = {};
      }
      unflatten(flatActionType, partialNestedActionCreators[nextNamespace], partialFlatActionTypePath);
    } else {
      partialNestedActionCreators[nextNamespace] = flatActionCreators[flatActionType];
    }
  }

  var nestedActionCreators = {};
  Object.getOwnPropertyNames(flatActionCreators).forEach(function (type) {
    return unflatten(type, nestedActionCreators, type.split(namespace));
  });
  return nestedActionCreators;
}

export { flattenActionMap, flattenReducerMap, unflattenActionCreators };