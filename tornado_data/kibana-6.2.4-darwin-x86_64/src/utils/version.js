"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versionSatisfies = versionSatisfies;
exports.cleanVersion = cleanVersion;
function versionSatisfies(cleanActual, cleanExpected) {
  try {
    return cleanActual === cleanExpected;
  } catch (err) {
    return false;
  }
}

function cleanVersion(version) {
  const match = version.match(/\d+\.\d+\.\d+/);
  if (!match) return version;
  return match[0];
}
