'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noOverflowPlacement = noOverflowPlacement;

/**
 * Determine the best placement for a popup that avoids clipping by the window view port.
 *
 * @param {native DOM Element} staticNode - DOM node that popup placement is referenced too.
 * @param {native DOM Element} popupNode - DOM node containing popup content.
 * @param {string} requestedPlacement - Preferred placement. One of ["top", "right", "bottom", "left"]
 * @param {number} buffer - avoid popup from getting too close to window edge
 *
 * @returns {string} One of ["top", "right", "bottom", "left"] that ensures no window overflow.
 */
function noOverflowPlacement(staticNode, popupNode, requestedPlacement) {
  var buffer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var staticNodeRect = staticNode.getBoundingClientRect();
  var popupNodeRect = popupNode.getBoundingClientRect();

  // determine popup overflow in each direction
  // negative values signal window overflow, large values signal lots of free space
  var popupOverflow = {
    top: staticNodeRect.top - (popupNodeRect.height + buffer),
    right: window.innerWidth - (staticNodeRect.right + popupNodeRect.width + buffer),
    bottom: window.innerHeight - (staticNodeRect.bottom + popupNodeRect.height + buffer),
    left: staticNodeRect.left - (staticNodeRect.width + buffer)
  };

  function hasCrossDimensionOverflow(key) {
    if (key === 'left' || key === 'right') {
      var domNodeCenterY = staticNodeRect.top + staticNodeRect.height / 2;
      var tooltipTop = domNodeCenterY - (popupNodeRect.height / 2 + buffer);
      if (tooltipTop <= 0) {
        return true;
      }
      var tooltipBottom = domNodeCenterY + popupNodeRect.height / 2 + buffer;
      if (tooltipBottom >= window.innerHeight) {
        return true;
      }
    } else {
      var domNodeCenterX = staticNodeRect.left + staticNodeRect.width / 2;
      var tooltipLeft = domNodeCenterX - (popupNodeRect.width / 2 + buffer);
      if (tooltipLeft <= 0) {
        return true;
      }
      var tooltipRight = domNodeCenterX + popupNodeRect.width / 2 + buffer;
      if (tooltipRight >= window.innerWidth) {
        return true;
      }
    }
    return false;
  }

  var noOverflowPlacement = requestedPlacement;
  if (popupOverflow[requestedPlacement] <= 0 || hasCrossDimensionOverflow(requestedPlacement)) {
    // requested placement overflows window bounds
    // select direction what has the most free space
    Object.keys(popupOverflow).forEach(function (key) {
      if (popupOverflow[key] > popupOverflow[noOverflowPlacement] && !hasCrossDimensionOverflow(key)) {
        noOverflowPlacement = key;
      }
    });
  }

  return noOverflowPlacement;
}