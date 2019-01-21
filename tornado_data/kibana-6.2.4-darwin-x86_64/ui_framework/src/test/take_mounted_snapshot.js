'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Use this function to generate a Jest snapshot of components that have been fully rendered
 * using Enzyme's `mount` method. Typically, a mounted component will result in a snapshot
 * containing both React components and HTML elements. This function removes the React components,
 * leaving only HTML elements in the snapshot.
 */
const takeMountedSnapshot = exports.takeMountedSnapshot = mountedComponent => {
  const html = mountedComponent.html();
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
};
