'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pager = exports.Pager = function Pager(totalItems, itemsPerPage) {
  var initialPageIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  _classCallCheck(this, Pager);

  _initialiseProps.call(this);

  if (isNaN(parseInt(totalItems, 10))) {
    throw new Error('Please provide a number of totalItems');
  }

  if (isNaN(parseInt(itemsPerPage, 10))) {
    throw new Error('Please provide a number of itemsPerPage');
  }

  if (isNaN(parseInt(initialPageIndex, 10))) {
    throw new Error('Please provide a number of initialPageIndex');
  }

  this.totalItems = totalItems;
  this.itemsPerPage = itemsPerPage;
  this.currentPageIndex = initialPageIndex;

  this.update();
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.setTotalItems = function (totalItems) {
    _this.totalItems = totalItems;
    _this.update();
  };

  this.setItemsPerPage = function (itemsPerPage) {
    _this.itemsPerPage = itemsPerPage;
    _this.update();
  };

  this.isPageable = function () {
    return _this.firstItemIndex !== -1;
  };

  this.getTotalPages = function () {
    return _this.totalPages;
  };

  this.getCurrentPageIndex = function () {
    return _this.currentPageIndex;
  };

  this.getFirstItemIndex = function () {
    return _this.firstItemIndex;
  };

  this.getLastItemIndex = function () {
    return _this.lastItemIndex;
  };

  this.hasNextPage = function () {
    return _this.currentPageIndex < _this.totalPages - 1;
  };

  this.hasPreviousPage = function () {
    return _this.currentPageIndex > 0;
  };

  this.goToNextPage = function () {
    _this.goToPageIndex(_this.currentPageIndex + 1);
  };

  this.goToPreviousPage = function () {
    _this.goToPageIndex(_this.currentPageIndex - 1);
  };

  this.goToPageIndex = function (pageIndex) {
    _this.currentPageIndex = pageIndex;
    _this.update();
  };

  this.update = function () {
    if (_this.totalItems <= 0) {
      _this.totalPages = 0;
      _this.currentPageIndex = 0;
      _this.firstItemIndex = -1;
      _this.lastItemIndex = -1;
      return;
    }

    _this.totalPages = Math.ceil(_this.totalItems / _this.itemsPerPage);

    // Ensure the current page falls within our range of total pages.
    _this.currentPageIndex = Math.min(Math.max(0, _this.currentPageIndex), _this.totalPages - 1);

    // Find the range of visible items on the current page.
    _this.firstItemIndex = _this.currentPageIndex * _this.itemsPerPage;
    _this.lastItemIndex = Math.min(_this.firstItemIndex + _this.itemsPerPage, _this.totalItems) - 1;
  };
};