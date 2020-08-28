(() => {
  var __defineProperty = Object.defineProperty;
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __markAsModule = (target) => {
    return __defineProperty(target, "__esModule", {value: true});
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defineProperty(target, name, {get: all[name], enumerable: true});
  };

  // node_modules/shufflejs/dist/shuffle.esm.js
  var require_shuffle_esm = __commonJS((exports) => {
    __export(exports, {
      default: () => shuffle_esm_default
    });
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function E() {
    }
    E.prototype = {
      on: function(name, callback, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
          fn: callback,
          ctx
        });
        return this;
      },
      once: function(name, callback, ctx) {
        var self = this;
        function listener() {
          self.off(name, listener);
          callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
      },
      emit: function(name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
        return this;
      },
      off: function(name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];
        if (evts && callback) {
          for (var i = 0, len = evts.length; i < len; i++) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
              liveEvents.push(evts[i]);
          }
        }
        liveEvents.length ? e[name] = liveEvents : delete e[name];
        return this;
      }
    };
    var tinyEmitter = E;
    var TinyEmitter = E;
    tinyEmitter.TinyEmitter = TinyEmitter;
    var proto = typeof Element !== "undefined" ? Element.prototype : {};
    var vendor = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
    var matchesSelector = match;
    function match(el, selector) {
      if (!el || el.nodeType !== 1)
        return false;
      if (vendor)
        return vendor.call(el, selector);
      var nodes = el.parentNode.querySelectorAll(selector);
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] == el)
          return true;
      }
      return false;
    }
    var throttleit = throttle;
    function throttle(func, wait) {
      var ctx, args, rtn, timeoutID;
      var last = 0;
      return function throttled() {
        ctx = this;
        args = arguments;
        var delta = new Date() - last;
        if (!timeoutID)
          if (delta >= wait)
            call();
          else
            timeoutID = setTimeout(call, wait - delta);
        return rtn;
      };
      function call() {
        timeoutID = 0;
        last = +new Date();
        rtn = func.apply(ctx, args);
        ctx = null;
        args = null;
      }
    }
    var arrayParallel = function parallel(fns, context, callback) {
      if (!callback) {
        if (typeof context === "function") {
          callback = context;
          context = null;
        } else {
          callback = noop;
        }
      }
      var pending = fns && fns.length;
      if (!pending)
        return callback(null, []);
      var finished = false;
      var results = new Array(pending);
      fns.forEach(context ? function(fn, i) {
        fn.call(context, maybeDone(i));
      } : function(fn, i) {
        fn(maybeDone(i));
      });
      function maybeDone(i) {
        return function(err, result) {
          if (finished)
            return;
          if (err) {
            callback(err, results);
            finished = true;
            return;
          }
          results[i] = result;
          if (!--pending)
            callback(null, results);
        };
      }
    };
    function noop() {
    }
    function getNumber(value2) {
      return parseFloat(value2) || 0;
    }
    var Point = /* @__PURE__ */ function() {
      function Point2(x, y) {
        _classCallCheck(this, Point2);
        this.x = getNumber(x);
        this.y = getNumber(y);
      }
      _createClass(Point2, null, [{
        key: "equals",
        value: function equals(a, b) {
          return a.x === b.x && a.y === b.y;
        }
      }]);
      return Point2;
    }();
    var Rect = /* @__PURE__ */ function() {
      function Rect2(x, y, w, h, id2) {
        _classCallCheck(this, Rect2);
        this.id = id2;
        this.left = x;
        this.top = y;
        this.width = w;
        this.height = h;
      }
      _createClass(Rect2, null, [{
        key: "intersects",
        value: function intersects(a, b) {
          return a.left < b.left + b.width && b.left < a.left + a.width && a.top < b.top + b.height && b.top < a.top + a.height;
        }
      }]);
      return Rect2;
    }();
    var Classes = {
      BASE: "shuffle",
      SHUFFLE_ITEM: "shuffle-item",
      VISIBLE: "shuffle-item--visible",
      HIDDEN: "shuffle-item--hidden"
    };
    var id = 0;
    var ShuffleItem = /* @__PURE__ */ function() {
      function ShuffleItem2(element) {
        _classCallCheck(this, ShuffleItem2);
        id += 1;
        this.id = id;
        this.element = element;
        this.isVisible = true;
        this.isHidden = false;
      }
      _createClass(ShuffleItem2, [{
        key: "show",
        value: function show() {
          this.isVisible = true;
          this.element.classList.remove(Classes.HIDDEN);
          this.element.classList.add(Classes.VISIBLE);
          this.element.removeAttribute("aria-hidden");
        }
      }, {
        key: "hide",
        value: function hide() {
          this.isVisible = false;
          this.element.classList.remove(Classes.VISIBLE);
          this.element.classList.add(Classes.HIDDEN);
          this.element.setAttribute("aria-hidden", true);
        }
      }, {
        key: "init",
        value: function init() {
          this.addClasses([Classes.SHUFFLE_ITEM, Classes.VISIBLE]);
          this.applyCss(ShuffleItem2.Css.INITIAL);
          this.scale = ShuffleItem2.Scale.VISIBLE;
          this.point = new Point();
        }
      }, {
        key: "addClasses",
        value: function addClasses(classes) {
          var _this = this;
          classes.forEach(function(className) {
            _this.element.classList.add(className);
          });
        }
      }, {
        key: "removeClasses",
        value: function removeClasses(classes) {
          var _this2 = this;
          classes.forEach(function(className) {
            _this2.element.classList.remove(className);
          });
        }
      }, {
        key: "applyCss",
        value: function applyCss(obj) {
          var _this3 = this;
          Object.keys(obj).forEach(function(key) {
            _this3.element.style[key] = obj[key];
          });
        }
      }, {
        key: "dispose",
        value: function dispose() {
          this.removeClasses([Classes.HIDDEN, Classes.VISIBLE, Classes.SHUFFLE_ITEM]);
          this.element.removeAttribute("style");
          this.element = null;
        }
      }]);
      return ShuffleItem2;
    }();
    ShuffleItem.Css = {
      INITIAL: {
        position: "absolute",
        top: 0,
        left: 0,
        visibility: "visible",
        willChange: "transform"
      },
      VISIBLE: {
        before: {
          opacity: 1,
          visibility: "visible"
        },
        after: {
          transitionDelay: ""
        }
      },
      HIDDEN: {
        before: {
          opacity: 0
        },
        after: {
          visibility: "hidden",
          transitionDelay: ""
        }
      }
    };
    ShuffleItem.Scale = {
      VISIBLE: 1,
      HIDDEN: 1e-3
    };
    var value = null;
    var testComputedSize = function() {
      if (value !== null) {
        return value;
      }
      var element = document.body || document.documentElement;
      var e = document.createElement("div");
      e.style.cssText = "width:10px;padding:2px;box-sizing:border-box;";
      element.appendChild(e);
      value = window.getComputedStyle(e, null).width === "10px";
      element.removeChild(e);
      return value;
    };
    function getNumberStyle(element, style) {
      var styles = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : window.getComputedStyle(element, null);
      var value2 = getNumber(styles[style]);
      if (!testComputedSize() && style === "width") {
        value2 += getNumber(styles.paddingLeft) + getNumber(styles.paddingRight) + getNumber(styles.borderLeftWidth) + getNumber(styles.borderRightWidth);
      } else if (!testComputedSize() && style === "height") {
        value2 += getNumber(styles.paddingTop) + getNumber(styles.paddingBottom) + getNumber(styles.borderTopWidth) + getNumber(styles.borderBottomWidth);
      }
      return value2;
    }
    function randomize(array) {
      var n = array.length;
      while (n) {
        n -= 1;
        var i = Math.floor(Math.random() * (n + 1));
        var temp = array[i];
        array[i] = array[n];
        array[n] = temp;
      }
      return array;
    }
    var defaults = {
      reverse: false,
      by: null,
      compare: null,
      randomize: false,
      key: "element"
    };
    function sorter(arr, options) {
      var opts = Object.assign({}, defaults, options);
      var original = Array.from(arr);
      var revert = false;
      if (!arr.length) {
        return [];
      }
      if (opts.randomize) {
        return randomize(arr);
      }
      if (typeof opts.by === "function") {
        arr.sort(function(a, b) {
          if (revert) {
            return 0;
          }
          var valA = opts.by(a[opts.key]);
          var valB = opts.by(b[opts.key]);
          if (valA === void 0 && valB === void 0) {
            revert = true;
            return 0;
          }
          if (valA < valB || valA === "sortFirst" || valB === "sortLast") {
            return -1;
          }
          if (valA > valB || valA === "sortLast" || valB === "sortFirst") {
            return 1;
          }
          return 0;
        });
      } else if (typeof opts.compare === "function") {
        arr.sort(opts.compare);
      }
      if (revert) {
        return original;
      }
      if (opts.reverse) {
        arr.reverse();
      }
      return arr;
    }
    var transitions = {};
    var eventName = "transitionend";
    var count = 0;
    function uniqueId() {
      count += 1;
      return eventName + count;
    }
    function cancelTransitionEnd(id2) {
      if (transitions[id2]) {
        transitions[id2].element.removeEventListener(eventName, transitions[id2].listener);
        transitions[id2] = null;
        return true;
      }
      return false;
    }
    function onTransitionEnd(element, callback) {
      var id2 = uniqueId();
      var listener = function listener2(evt) {
        if (evt.currentTarget === evt.target) {
          cancelTransitionEnd(id2);
          callback(evt);
        }
      };
      element.addEventListener(eventName, listener);
      transitions[id2] = {
        element,
        listener
      };
      return id2;
    }
    function arrayMax(array) {
      return Math.max.apply(Math, array);
    }
    function arrayMin(array) {
      return Math.min.apply(Math, array);
    }
    function getColumnSpan(itemWidth, columnWidth, columns, threshold) {
      var columnSpan = itemWidth / columnWidth;
      if (Math.abs(Math.round(columnSpan) - columnSpan) < threshold) {
        columnSpan = Math.round(columnSpan);
      }
      return Math.min(Math.ceil(columnSpan), columns);
    }
    function getAvailablePositions(positions, columnSpan, columns) {
      if (columnSpan === 1) {
        return positions;
      }
      var available = [];
      for (var i = 0; i <= columns - columnSpan; i++) {
        available.push(arrayMax(positions.slice(i, i + columnSpan)));
      }
      return available;
    }
    function getShortColumn(positions, buffer) {
      var minPosition = arrayMin(positions);
      for (var i = 0, len = positions.length; i < len; i++) {
        if (positions[i] >= minPosition - buffer && positions[i] <= minPosition + buffer) {
          return i;
        }
      }
      return 0;
    }
    function getItemPosition(_ref) {
      var itemSize = _ref.itemSize, positions = _ref.positions, gridSize = _ref.gridSize, total = _ref.total, threshold = _ref.threshold, buffer = _ref.buffer;
      var span = getColumnSpan(itemSize.width, gridSize, total, threshold);
      var setY = getAvailablePositions(positions, span, total);
      var shortColumnIndex = getShortColumn(setY, buffer);
      var point = new Point(gridSize * shortColumnIndex, setY[shortColumnIndex]);
      var setHeight = setY[shortColumnIndex] + itemSize.height;
      for (var i = 0; i < span; i++) {
        positions[shortColumnIndex + i] = setHeight;
      }
      return point;
    }
    function getCenteredPositions(itemRects, containerWidth) {
      var rowMap = {};
      itemRects.forEach(function(itemRect) {
        if (rowMap[itemRect.top]) {
          rowMap[itemRect.top].push(itemRect);
        } else {
          rowMap[itemRect.top] = [itemRect];
        }
      });
      var rects = [];
      var rows = [];
      var centeredRows = [];
      Object.keys(rowMap).forEach(function(key) {
        var itemRects2 = rowMap[key];
        rows.push(itemRects2);
        var lastItem = itemRects2[itemRects2.length - 1];
        var end = lastItem.left + lastItem.width;
        var offset = Math.round((containerWidth - end) / 2);
        var finalRects = itemRects2;
        var canMove = false;
        if (offset > 0) {
          var newRects = [];
          canMove = itemRects2.every(function(r) {
            var newRect = new Rect(r.left + offset, r.top, r.width, r.height, r.id);
            var noOverlap = !rects.some(function(r2) {
              return Rect.intersects(newRect, r2);
            });
            newRects.push(newRect);
            return noOverlap;
          });
          if (canMove) {
            finalRects = newRects;
          }
        }
        if (!canMove) {
          var intersectingRect;
          var hasOverlap = itemRects2.some(function(itemRect) {
            return rects.some(function(r) {
              var intersects = Rect.intersects(itemRect, r);
              if (intersects) {
                intersectingRect = r;
              }
              return intersects;
            });
          });
          if (hasOverlap) {
            var rowIndex = centeredRows.findIndex(function(items) {
              return items.includes(intersectingRect);
            });
            centeredRows.splice(rowIndex, 1, rows[rowIndex]);
          }
        }
        rects = rects.concat(finalRects);
        centeredRows.push(finalRects);
      });
      return [].concat.apply([], centeredRows).sort(function(a, b) {
        return a.id - b.id;
      }).map(function(itemRect) {
        return new Point(itemRect.left, itemRect.top);
      });
    }
    function hyphenate(str) {
      return str.replace(/([A-Z])/g, function(str2, m1) {
        return "-".concat(m1.toLowerCase());
      });
    }
    function arrayUnique(x) {
      return Array.from(new Set(x));
    }
    var id$1 = 0;
    var Shuffle2 = /* @__PURE__ */ function(_TinyEmitter) {
      _inherits(Shuffle3, _TinyEmitter);
      function Shuffle3(element) {
        var _this;
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _classCallCheck(this, Shuffle3);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(Shuffle3).call(this));
        _this.options = Object.assign({}, Shuffle3.options, options);
        if (_this.options.delimeter) {
          _this.options.delimiter = _this.options.delimeter;
        }
        _this.lastSort = {};
        _this.group = Shuffle3.ALL_ITEMS;
        _this.lastFilter = Shuffle3.ALL_ITEMS;
        _this.isEnabled = true;
        _this.isDestroyed = false;
        _this.isInitialized = false;
        _this._transitions = [];
        _this.isTransitioning = false;
        _this._queue = [];
        var el = _this._getElementOption(element);
        if (!el) {
          throw new TypeError("Shuffle needs to be initialized with an element.");
        }
        _this.element = el;
        _this.id = "shuffle_" + id$1;
        id$1 += 1;
        _this._init();
        _this.isInitialized = true;
        return _this;
      }
      _createClass(Shuffle3, [{
        key: "_init",
        value: function _init() {
          this.items = this._getItems();
          this.options.sizer = this._getElementOption(this.options.sizer);
          this.element.classList.add(Shuffle3.Classes.BASE);
          this._initItems(this.items);
          this._onResize = this._getResizeFunction();
          window.addEventListener("resize", this._onResize);
          if (document.readyState !== "complete") {
            var layout = this.layout.bind(this);
            window.addEventListener("load", function onLoad() {
              window.removeEventListener("load", onLoad);
              layout();
            });
          }
          var containerCss = window.getComputedStyle(this.element, null);
          var containerWidth = Shuffle3.getSize(this.element).width;
          this._validateStyles(containerCss);
          this._setColumns(containerWidth);
          this.filter(this.options.group, this.options.initialSort);
          this.element.offsetWidth;
          this.setItemTransitions(this.items);
          this.element.style.transition = "height ".concat(this.options.speed, "ms ").concat(this.options.easing);
        }
      }, {
        key: "_getResizeFunction",
        value: function _getResizeFunction() {
          var resizeFunction = this._handleResize.bind(this);
          return this.options.throttle ? this.options.throttle(resizeFunction, this.options.throttleTime) : resizeFunction;
        }
      }, {
        key: "_getElementOption",
        value: function _getElementOption(option) {
          if (typeof option === "string") {
            return this.element.querySelector(option);
          }
          if (option && option.nodeType && option.nodeType === 1) {
            return option;
          }
          if (option && option.jquery) {
            return option[0];
          }
          return null;
        }
      }, {
        key: "_validateStyles",
        value: function _validateStyles(styles) {
          if (styles.position === "static") {
            this.element.style.position = "relative";
          }
          if (styles.overflow !== "hidden") {
            this.element.style.overflow = "hidden";
          }
        }
      }, {
        key: "_filter",
        value: function _filter() {
          var category = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.lastFilter;
          var collection = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.items;
          var set = this._getFilteredSets(category, collection);
          this._toggleFilterClasses(set);
          this.lastFilter = category;
          if (typeof category === "string") {
            this.group = category;
          }
          return set;
        }
      }, {
        key: "_getFilteredSets",
        value: function _getFilteredSets(category, items) {
          var _this2 = this;
          var visible = [];
          var hidden = [];
          if (category === Shuffle3.ALL_ITEMS) {
            visible = items;
          } else {
            items.forEach(function(item) {
              if (_this2._doesPassFilter(category, item.element)) {
                visible.push(item);
              } else {
                hidden.push(item);
              }
            });
          }
          return {
            visible,
            hidden
          };
        }
      }, {
        key: "_doesPassFilter",
        value: function _doesPassFilter(category, element) {
          if (typeof category === "function") {
            return category.call(element, element, this);
          }
          var attr = element.getAttribute("data-" + Shuffle3.FILTER_ATTRIBUTE_KEY);
          var keys = this.options.delimiter ? attr.split(this.options.delimiter) : JSON.parse(attr);
          function testCategory(category2) {
            return keys.includes(category2);
          }
          if (Array.isArray(category)) {
            if (this.options.filterMode === Shuffle3.FilterMode.ANY) {
              return category.some(testCategory);
            }
            return category.every(testCategory);
          }
          return keys.includes(category);
        }
      }, {
        key: "_toggleFilterClasses",
        value: function _toggleFilterClasses(_ref) {
          var visible = _ref.visible, hidden = _ref.hidden;
          visible.forEach(function(item) {
            item.show();
          });
          hidden.forEach(function(item) {
            item.hide();
          });
        }
      }, {
        key: "_initItems",
        value: function _initItems(items) {
          items.forEach(function(item) {
            item.init();
          });
        }
      }, {
        key: "_disposeItems",
        value: function _disposeItems(items) {
          items.forEach(function(item) {
            item.dispose();
          });
        }
      }, {
        key: "_updateItemCount",
        value: function _updateItemCount() {
          this.visibleItems = this._getFilteredItems().length;
        }
      }, {
        key: "setItemTransitions",
        value: function setItemTransitions(items) {
          var _this$options = this.options, speed = _this$options.speed, easing = _this$options.easing;
          var positionProps = this.options.useTransforms ? ["transform"] : ["top", "left"];
          var cssProps = Object.keys(ShuffleItem.Css.HIDDEN.before).map(function(k) {
            return hyphenate(k);
          });
          var properties = positionProps.concat(cssProps).join();
          items.forEach(function(item) {
            item.element.style.transitionDuration = speed + "ms";
            item.element.style.transitionTimingFunction = easing;
            item.element.style.transitionProperty = properties;
          });
        }
      }, {
        key: "_getItems",
        value: function _getItems() {
          var _this3 = this;
          return Array.from(this.element.children).filter(function(el) {
            return matchesSelector(el, _this3.options.itemSelector);
          }).map(function(el) {
            return new ShuffleItem(el);
          });
        }
      }, {
        key: "_mergeNewItems",
        value: function _mergeNewItems(items) {
          var children = Array.from(this.element.children);
          return sorter(this.items.concat(items), {
            by: function by(element) {
              return children.indexOf(element);
            }
          });
        }
      }, {
        key: "_getFilteredItems",
        value: function _getFilteredItems() {
          return this.items.filter(function(item) {
            return item.isVisible;
          });
        }
      }, {
        key: "_getConcealedItems",
        value: function _getConcealedItems() {
          return this.items.filter(function(item) {
            return !item.isVisible;
          });
        }
      }, {
        key: "_getColumnSize",
        value: function _getColumnSize(containerWidth, gutterSize) {
          var size;
          if (typeof this.options.columnWidth === "function") {
            size = this.options.columnWidth(containerWidth);
          } else if (this.options.sizer) {
            size = Shuffle3.getSize(this.options.sizer).width;
          } else if (this.options.columnWidth) {
            size = this.options.columnWidth;
          } else if (this.items.length > 0) {
            size = Shuffle3.getSize(this.items[0].element, true).width;
          } else {
            size = containerWidth;
          }
          if (size === 0) {
            size = containerWidth;
          }
          return size + gutterSize;
        }
      }, {
        key: "_getGutterSize",
        value: function _getGutterSize(containerWidth) {
          var size;
          if (typeof this.options.gutterWidth === "function") {
            size = this.options.gutterWidth(containerWidth);
          } else if (this.options.sizer) {
            size = getNumberStyle(this.options.sizer, "marginLeft");
          } else {
            size = this.options.gutterWidth;
          }
          return size;
        }
      }, {
        key: "_setColumns",
        value: function _setColumns() {
          var containerWidth = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Shuffle3.getSize(this.element).width;
          var gutter = this._getGutterSize(containerWidth);
          var columnWidth = this._getColumnSize(containerWidth, gutter);
          var calculatedColumns = (containerWidth + gutter) / columnWidth;
          if (Math.abs(Math.round(calculatedColumns) - calculatedColumns) < this.options.columnThreshold) {
            calculatedColumns = Math.round(calculatedColumns);
          }
          this.cols = Math.max(Math.floor(calculatedColumns || 0), 1);
          this.containerWidth = containerWidth;
          this.colWidth = columnWidth;
        }
      }, {
        key: "_setContainerSize",
        value: function _setContainerSize() {
          this.element.style.height = this._getContainerSize() + "px";
        }
      }, {
        key: "_getContainerSize",
        value: function _getContainerSize() {
          return arrayMax(this.positions);
        }
      }, {
        key: "_getStaggerAmount",
        value: function _getStaggerAmount(index) {
          return Math.min(index * this.options.staggerAmount, this.options.staggerAmountMax);
        }
      }, {
        key: "_dispatch",
        value: function _dispatch(name) {
          var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (this.isDestroyed) {
            return;
          }
          data.shuffle = this;
          this.emit(name, data);
        }
      }, {
        key: "_resetCols",
        value: function _resetCols() {
          var i = this.cols;
          this.positions = [];
          while (i) {
            i -= 1;
            this.positions.push(0);
          }
        }
      }, {
        key: "_layout",
        value: function _layout(items) {
          var _this4 = this;
          var itemPositions = this._getNextPositions(items);
          var count2 = 0;
          items.forEach(function(item, i) {
            function callback() {
              item.applyCss(ShuffleItem.Css.VISIBLE.after);
            }
            if (Point.equals(item.point, itemPositions[i]) && !item.isHidden) {
              item.applyCss(ShuffleItem.Css.VISIBLE.before);
              callback();
              return;
            }
            item.point = itemPositions[i];
            item.scale = ShuffleItem.Scale.VISIBLE;
            item.isHidden = false;
            var styles = _this4.getStylesForTransition(item, ShuffleItem.Css.VISIBLE.before);
            styles.transitionDelay = _this4._getStaggerAmount(count2) + "ms";
            _this4._queue.push({
              item,
              styles,
              callback
            });
            count2 += 1;
          });
        }
      }, {
        key: "_getNextPositions",
        value: function _getNextPositions(items) {
          var _this5 = this;
          if (this.options.isCentered) {
            var itemsData = items.map(function(item, i) {
              var itemSize = Shuffle3.getSize(item.element, true);
              var point = _this5._getItemPosition(itemSize);
              return new Rect(point.x, point.y, itemSize.width, itemSize.height, i);
            });
            return this.getTransformedPositions(itemsData, this.containerWidth);
          }
          return items.map(function(item) {
            return _this5._getItemPosition(Shuffle3.getSize(item.element, true));
          });
        }
      }, {
        key: "_getItemPosition",
        value: function _getItemPosition(itemSize) {
          return getItemPosition({
            itemSize,
            positions: this.positions,
            gridSize: this.colWidth,
            total: this.cols,
            threshold: this.options.columnThreshold,
            buffer: this.options.buffer
          });
        }
      }, {
        key: "getTransformedPositions",
        value: function getTransformedPositions(itemRects, containerWidth) {
          return getCenteredPositions(itemRects, containerWidth);
        }
      }, {
        key: "_shrink",
        value: function _shrink() {
          var _this6 = this;
          var collection = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._getConcealedItems();
          var count2 = 0;
          collection.forEach(function(item) {
            function callback() {
              item.applyCss(ShuffleItem.Css.HIDDEN.after);
            }
            if (item.isHidden) {
              item.applyCss(ShuffleItem.Css.HIDDEN.before);
              callback();
              return;
            }
            item.scale = ShuffleItem.Scale.HIDDEN;
            item.isHidden = true;
            var styles = _this6.getStylesForTransition(item, ShuffleItem.Css.HIDDEN.before);
            styles.transitionDelay = _this6._getStaggerAmount(count2) + "ms";
            _this6._queue.push({
              item,
              styles,
              callback
            });
            count2 += 1;
          });
        }
      }, {
        key: "_handleResize",
        value: function _handleResize() {
          if (!this.isEnabled || this.isDestroyed) {
            return;
          }
          this.update();
        }
      }, {
        key: "getStylesForTransition",
        value: function getStylesForTransition(item, styleObject) {
          var styles = Object.assign({}, styleObject);
          if (this.options.useTransforms) {
            var x = this.options.roundTransforms ? Math.round(item.point.x) : item.point.x;
            var y = this.options.roundTransforms ? Math.round(item.point.y) : item.point.y;
            styles.transform = "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(item.scale, ")");
          } else {
            styles.left = item.point.x + "px";
            styles.top = item.point.y + "px";
          }
          return styles;
        }
      }, {
        key: "_whenTransitionDone",
        value: function _whenTransitionDone(element, itemCallback, done) {
          var id2 = onTransitionEnd(element, function(evt) {
            itemCallback();
            done(null, evt);
          });
          this._transitions.push(id2);
        }
      }, {
        key: "_getTransitionFunction",
        value: function _getTransitionFunction(opts) {
          var _this7 = this;
          return function(done) {
            opts.item.applyCss(opts.styles);
            _this7._whenTransitionDone(opts.item.element, opts.callback, done);
          };
        }
      }, {
        key: "_processQueue",
        value: function _processQueue() {
          if (this.isTransitioning) {
            this._cancelMovement();
          }
          var hasSpeed = this.options.speed > 0;
          var hasQueue = this._queue.length > 0;
          if (hasQueue && hasSpeed && this.isInitialized) {
            this._startTransitions(this._queue);
          } else if (hasQueue) {
            this._styleImmediately(this._queue);
            this._dispatch(Shuffle3.EventType.LAYOUT);
          } else {
            this._dispatch(Shuffle3.EventType.LAYOUT);
          }
          this._queue.length = 0;
        }
      }, {
        key: "_startTransitions",
        value: function _startTransitions(transitions2) {
          var _this8 = this;
          this.isTransitioning = true;
          var callbacks = transitions2.map(function(obj) {
            return _this8._getTransitionFunction(obj);
          });
          arrayParallel(callbacks, this._movementFinished.bind(this));
        }
      }, {
        key: "_cancelMovement",
        value: function _cancelMovement() {
          this._transitions.forEach(cancelTransitionEnd);
          this._transitions.length = 0;
          this.isTransitioning = false;
        }
      }, {
        key: "_styleImmediately",
        value: function _styleImmediately(objects) {
          if (objects.length) {
            var elements = objects.map(function(obj) {
              return obj.item.element;
            });
            Shuffle3._skipTransitions(elements, function() {
              objects.forEach(function(obj) {
                obj.item.applyCss(obj.styles);
                obj.callback();
              });
            });
          }
        }
      }, {
        key: "_movementFinished",
        value: function _movementFinished() {
          this._transitions.length = 0;
          this.isTransitioning = false;
          this._dispatch(Shuffle3.EventType.LAYOUT);
        }
      }, {
        key: "filter",
        value: function filter(category, sortOptions) {
          if (!this.isEnabled) {
            return;
          }
          if (!category || category && category.length === 0) {
            category = Shuffle3.ALL_ITEMS;
          }
          this._filter(category);
          this._shrink();
          this._updateItemCount();
          this.sort(sortOptions);
        }
      }, {
        key: "sort",
        value: function sort() {
          var sortOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.lastSort;
          if (!this.isEnabled) {
            return;
          }
          this._resetCols();
          var items = sorter(this._getFilteredItems(), sortOptions);
          this._layout(items);
          this._processQueue();
          this._setContainerSize();
          this.lastSort = sortOptions;
        }
      }, {
        key: "update",
        value: function update() {
          var isOnlyLayout = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
          if (this.isEnabled) {
            if (!isOnlyLayout) {
              this._setColumns();
            }
            this.sort();
          }
        }
      }, {
        key: "layout",
        value: function layout() {
          this.update(true);
        }
      }, {
        key: "add",
        value: function add(newItems) {
          var _this9 = this;
          var items = arrayUnique(newItems).map(function(el) {
            return new ShuffleItem(el);
          });
          this._initItems(items);
          this._resetCols();
          var allItems = this._mergeNewItems(items);
          var sortedItems = sorter(allItems, this.lastSort);
          var allSortedItemsSet = this._filter(this.lastFilter, sortedItems);
          var isNewItem = function isNewItem2(item) {
            return items.includes(item);
          };
          var applyHiddenState = function applyHiddenState2(item) {
            item.scale = ShuffleItem.Scale.HIDDEN;
            item.isHidden = true;
            item.applyCss(ShuffleItem.Css.HIDDEN.before);
            item.applyCss(ShuffleItem.Css.HIDDEN.after);
          };
          var itemPositions = this._getNextPositions(allSortedItemsSet.visible);
          allSortedItemsSet.visible.forEach(function(item, i) {
            if (isNewItem(item)) {
              item.point = itemPositions[i];
              applyHiddenState(item);
              item.applyCss(_this9.getStylesForTransition(item, {}));
            }
          });
          allSortedItemsSet.hidden.forEach(function(item) {
            if (isNewItem(item)) {
              applyHiddenState(item);
            }
          });
          this.element.offsetWidth;
          this.setItemTransitions(items);
          this.items = this._mergeNewItems(items);
          this.filter(this.lastFilter);
        }
      }, {
        key: "disable",
        value: function disable() {
          this.isEnabled = false;
        }
      }, {
        key: "enable",
        value: function enable() {
          var isUpdateLayout = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
          this.isEnabled = true;
          if (isUpdateLayout) {
            this.update();
          }
        }
      }, {
        key: "remove",
        value: function remove(elements) {
          var _this10 = this;
          if (!elements.length) {
            return;
          }
          var collection = arrayUnique(elements);
          var oldItems = collection.map(function(element) {
            return _this10.getItemByElement(element);
          }).filter(function(item) {
            return !!item;
          });
          var handleLayout = function handleLayout2() {
            _this10._disposeItems(oldItems);
            collection.forEach(function(element) {
              element.parentNode.removeChild(element);
            });
            _this10._dispatch(Shuffle3.EventType.REMOVED, {
              collection
            });
          };
          this._toggleFilterClasses({
            visible: [],
            hidden: oldItems
          });
          this._shrink(oldItems);
          this.sort();
          this.items = this.items.filter(function(item) {
            return !oldItems.includes(item);
          });
          this._updateItemCount();
          this.once(Shuffle3.EventType.LAYOUT, handleLayout);
        }
      }, {
        key: "getItemByElement",
        value: function getItemByElement(element) {
          return this.items.find(function(item) {
            return item.element === element;
          });
        }
      }, {
        key: "resetItems",
        value: function resetItems() {
          var _this11 = this;
          this._disposeItems(this.items);
          this.isInitialized = false;
          this.items = this._getItems();
          this._initItems(this.items);
          this.once(Shuffle3.EventType.LAYOUT, function() {
            _this11.setItemTransitions(_this11.items);
            _this11.isInitialized = true;
          });
          this.filter(this.lastFilter);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._cancelMovement();
          window.removeEventListener("resize", this._onResize);
          this.element.classList.remove("shuffle");
          this.element.removeAttribute("style");
          this._disposeItems(this.items);
          this.items.length = 0;
          this._transitions.length = 0;
          this.options.sizer = null;
          this.element = null;
          this.isDestroyed = true;
          this.isEnabled = false;
        }
      }], [{
        key: "getSize",
        value: function getSize(element) {
          var includeMargins = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          var styles = window.getComputedStyle(element, null);
          var width = getNumberStyle(element, "width", styles);
          var height = getNumberStyle(element, "height", styles);
          if (includeMargins) {
            var marginLeft = getNumberStyle(element, "marginLeft", styles);
            var marginRight = getNumberStyle(element, "marginRight", styles);
            var marginTop = getNumberStyle(element, "marginTop", styles);
            var marginBottom = getNumberStyle(element, "marginBottom", styles);
            width += marginLeft + marginRight;
            height += marginTop + marginBottom;
          }
          return {
            width,
            height
          };
        }
      }, {
        key: "_skipTransitions",
        value: function _skipTransitions(elements, callback) {
          var zero = "0ms";
          var data = elements.map(function(element) {
            var style = element.style;
            var duration = style.transitionDuration;
            var delay = style.transitionDelay;
            style.transitionDuration = zero;
            style.transitionDelay = zero;
            return {
              duration,
              delay
            };
          });
          callback();
          elements[0].offsetWidth;
          elements.forEach(function(element, i) {
            element.style.transitionDuration = data[i].duration;
            element.style.transitionDelay = data[i].delay;
          });
        }
      }]);
      return Shuffle3;
    }(tinyEmitter);
    Shuffle2.ShuffleItem = ShuffleItem;
    Shuffle2.ALL_ITEMS = "all";
    Shuffle2.FILTER_ATTRIBUTE_KEY = "groups";
    Shuffle2.EventType = {
      LAYOUT: "shuffle:layout",
      REMOVED: "shuffle:removed"
    };
    Shuffle2.Classes = Classes;
    Shuffle2.FilterMode = {
      ANY: "any",
      ALL: "all"
    };
    Shuffle2.options = {
      group: Shuffle2.ALL_ITEMS,
      speed: 250,
      easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      itemSelector: "*",
      sizer: null,
      gutterWidth: 0,
      columnWidth: 0,
      delimiter: null,
      buffer: 0,
      columnThreshold: 0.01,
      initialSort: null,
      throttle: throttleit,
      throttleTime: 300,
      staggerAmount: 15,
      staggerAmountMax: 150,
      useTransforms: true,
      filterMode: Shuffle2.FilterMode.ANY,
      isCentered: false,
      roundTransforms: true
    };
    Shuffle2.Point = Point;
    Shuffle2.Rect = Rect;
    Shuffle2.__sorter = sorter;
    Shuffle2.__getColumnSpan = getColumnSpan;
    Shuffle2.__getAvailablePositions = getAvailablePositions;
    Shuffle2.__getShortColumn = getShortColumn;
    Shuffle2.__getCenteredPositions = getCenteredPositions;
    var shuffle_esm_default = Shuffle2;
  });

  // main.js
  const Shuffle = require_shuffle_esm().default;
  document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== "/") {
      return;
    }
    document.querySelector(".nav--brand").addEventListener("click", (evt) => {
      evt.preventDefault();
      window.scrollTo({top: 0, behavior: "smooth"});
    });
    const shuffle = new Shuffle(document.querySelector(".projects__grid"), {
      itemSelector: ".projects__grid__item",
      group: ["featured"],
      speed: 500
    });
    [].forEach.call(document.querySelectorAll(".projects__list__selectors a"), (el) => {
      el.addEventListener("click", (evt) => {
        evt.preventDefault();
        if (document.querySelectorAll(".projects__list__selectors a.active").length === document.querySelectorAll(".projects__list__selectors a").length) {
          setActive(el);
        } else if (el.className === "active" && document.querySelectorAll(".projects__list__selectors a.active").length === 1) {
          setAllActive();
        } else {
          setActive(el);
        }
        const groups = [].map.call(document.querySelectorAll(".projects__list__selectors a.active"), (el2) => {
          return el2.getAttribute("data-group");
        });
        shuffle.filter(groups);
      });
    });
    const youtubePlayElem = document.querySelector("#youtube-play");
    if (youtubePlayElem) {
      const overlay = document.querySelector(".overlay");
      const content = document.querySelector(".overlay__content__container");
      youtubePlayElem.addEventListener("click", (evt) => {
        evt.preventDefault();
        content.innerHTML = '<iframe width="100%" height="800" src="https://www.youtube.com/embed/0r946bZIEDA?rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        overlay.classList.toggle("overlay--shown");
      });
      document.querySelector(".overlay").addEventListener("click", () => {
        overlay.classList.toggle("overlay--shown");
        content.innerHTML = "";
      });
    }
  });
  function setActive(activeElement) {
    [].forEach.call(document.querySelectorAll(".projects__list__selectors a"), (el) => {
      el.className = el === activeElement ? "active" : "";
    });
  }
  function setAllActive() {
    [].forEach.call(document.querySelectorAll(".projects__list__selectors a"), (el) => {
      el.className = "active";
    });
  }
})();
