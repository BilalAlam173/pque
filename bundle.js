(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

  var _HEAP_TREE = new WeakMap();

  var _IS_PRIMITIVE = new WeakMap();

  var _INIT_OPTIONS = new WeakMap();

  var _reArrangeBtoT = new WeakSet();

  var _reArrangeTtoB = new WeakSet();

  var _swap = new WeakSet();

  var _heapify = new WeakSet();

  var PriorityQueue = /*#__PURE__*/function () {
    /**
     * Array implementation of binary Heap tree
     */

    /**
     * ReArrange Bottom to Top
     * Starting from the last node, reach the root node
     * while swapping nodes where necessary to
     * make the binary heap tree state valid
     * @param {*} idx to be used for recursion
     */

    /**
     * ReArrange Top to Bottom
     * Starting from the root, reach the bottom
     * while swapping nodes where necessary to
     * make the binary heap tree state valid
     * @param {*} idx to be used for recursion
     */

    /** Nothing fancy, a smiple swap */

    /**
     * Ford's divide and conquer algorithm to build heap from array
     *
     * @param {*} i
     */

    /**
     * construct the heap from input using Ford's heapify Algorithm
     * @param {*} input
     */
    function PriorityQueue(input, options) {
      _classCallCheck(this, PriorityQueue);

      _heapify.add(this);

      _swap.add(this);

      _reArrangeTtoB.add(this);

      _reArrangeBtoT.add(this);

      _HEAP_TREE.set(this, {
        writable: true,
        value: []
      });

      _IS_PRIMITIVE.set(this, {
        writable: true,
        value: null
      });

      _INIT_OPTIONS.set(this, {
        writable: true,
        value: {
          isMin: true,
          priorityKey: 'key',
          valueKey: 'value'
        }
      });

      _classPrivateFieldSet(this, _HEAP_TREE, input || []);

      _classPrivateFieldSet(this, _INIT_OPTIONS, Object.assign(_classPrivateFieldGet(this, _INIT_OPTIONS), {}));

      if (Array.isArray(input) && input.length > 0) {
        /**
         * dividing into half and then backtracking till the start
         * of the array
         */
        var pivot = Math.floor(input.length / 2);

        for (var i = pivot; i >= 0; i--) {
          _classPrivateMethodGet(this, _heapify, _heapify2).call(this, i);
        }
      } else if (input && !Array.isArray(input)) {
        throw new Error("TypeError: unable to construct priority queue, input must be an array");
      }
    }

    _createClass(PriorityQueue, [{
      key: "toArray",

      /**
       * Returns the Heap tree in array form
       */
      value: function toArray() {
        return _classPrivateFieldGet(this, _HEAP_TREE);
      }
      /** Adds a new item with a priority */

    }, {
      key: "add",
      value: function add(item) {
        if (_classPrivateFieldGet(this, _IS_PRIMITIVE) === null) _classPrivateFieldSet(this, _IS_PRIMITIVE, item !== Object(item)); //simply append at the last of the tree

        _classPrivateFieldGet(this, _HEAP_TREE).push(item);

        if (_classPrivateFieldGet(this, _HEAP_TREE).length === 1) return;else {
          // and then reArrange from bottom to top
          _classPrivateMethodGet(this, _reArrangeBtoT, _reArrangeBtoT2).call(this);
        }
      }
      /**
       * pops the root of the tree and reArrange
       * itself to stay valid
       */

    }, {
      key: "pop",
      value: function pop() {
        if (_classPrivateFieldGet(this, _HEAP_TREE).length > 1) {
          var node = _classPrivateFieldGet(this, _HEAP_TREE)[0]; // move the last element to the top


          _classPrivateFieldGet(this, _HEAP_TREE)[0] = _classPrivateFieldGet(this, _HEAP_TREE).pop(); // Now Re arrange from top to bottom

          _classPrivateMethodGet(this, _reArrangeTtoB, _reArrangeTtoB2).call(this);

          return node;
        } else {
          return _classPrivateFieldGet(this, _HEAP_TREE).pop();
        }
      }
      /**
       * Merge two priority ques or an array into a priority queue
       * @param {Array/Priorityqueue} queue - queue/array to merge
       * @param {Object} options - configurations
       * @option {Boolean} mutate - modify the existing queue OR create a new queue
       * @option {Boolean} invert - invert the state of the HEAP after merge i.e min or max - **** TODO ****
       */

    }, {
      key: "merge",
      value: function merge(queue) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          mutate: false,
          invert: false
        };

        if (queue instanceof PriorityQueue || typeof queue.toArray === "function" || Array.isArray(queue)) {
          if (options.mutate) {
            var _classPrivateFieldGet2;

            (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _HEAP_TREE)).push.apply(_classPrivateFieldGet2, _toConsumableArray(queue.toArray ? queue.toArray() : queue));
          } else {
            return new PriorityQueue(_classPrivateFieldGet(this, _HEAP_TREE).concat(queue.toArray ? queue.toArray() : queue));
          }
        } else {
          throw new Error("TypeError: Unable to merge priority queue, provide either an array or an instance of priority queue");
        }
      }
    }, {
      key: "set",
      value: function set(idx, val) {//use idx if array of object
      }
    }, {
      key: "precede",
      value: function precede() {// increase priority
      }
    }, {
      key: "debase",
      value: function debase() {// decrease priority
      }
    }, {
      key: "length",
      get: function get() {
        return _classPrivateFieldGet(this, _HEAP_TREE).length;
      }
      /**
       * Returns the root node of the tree without modifying queue
       * largest priority value in max mode and vice versa
       */

    }, {
      key: "top",
      get: function get() {
        return _classPrivateFieldGet(this, _HEAP_TREE)[0];
      }
    }]);

    return PriorityQueue;
  }();

  exports["default"] = PriorityQueue;

  var _reArrangeBtoT2 = function _reArrangeBtoT2(idx) {
    var childIdx = idx || _classPrivateFieldGet(this, _HEAP_TREE).length - 1;
    var parentIdx = childIdx & 1 ? (childIdx - 1) / 2 : (childIdx - 2) / 2;
    var child = _classPrivateFieldGet(this, _IS_PRIMITIVE) ? _classPrivateFieldGet(this, _HEAP_TREE)[childIdx] : _classPrivateFieldGet(this, _HEAP_TREE)[childIdx][_classPrivateFieldGet(this, _INIT_OPTIONS).priorityKey];
    var parent = _classPrivateFieldGet(this, _IS_PRIMITIVE) ? _classPrivateFieldGet(this, _HEAP_TREE)[parentIdx] : _classPrivateFieldGet(this, _HEAP_TREE)[parentIdx][_classPrivateFieldGet(this, _INIT_OPTIONS).priorityKey];

    if (child < parent) {
      _classPrivateMethodGet(this, _swap, _swap2).call(this, parentIdx, childIdx);

      return _classPrivateMethodGet(this, _reArrangeBtoT, _reArrangeBtoT2).call(this, parentIdx);
    } else {
      return;
    }
  };

  var _reArrangeTtoB2 = function _reArrangeTtoB2(idx) {
    var currentIdx = idx || 0;
    var leftIdx = 2 * currentIdx + 1;
    var rightIdx = 2 * currentIdx + 2;
    var left = _classPrivateFieldGet(this, _IS_PRIMITIVE) ? _classPrivateFieldGet(this, _HEAP_TREE)[leftIdx] : _classPrivateFieldGet(this, _HEAP_TREE)[leftIdx] && _classPrivateFieldGet(this, _HEAP_TREE)[leftIdx][_classPrivateFieldGet(this, _INIT_OPTIONS).priorityKey];
    var right = _classPrivateFieldGet(this, _IS_PRIMITIVE) ? _classPrivateFieldGet(this, _HEAP_TREE)[rightIdx] : _classPrivateFieldGet(this, _HEAP_TREE)[rightIdx] && _classPrivateFieldGet(this, _HEAP_TREE)[rightIdx][_classPrivateFieldGet(this, _INIT_OPTIONS).priorityKey];
    var childIdx = left < right || left && !right ? leftIdx : rightIdx;

    if (_classPrivateFieldGet(this, _HEAP_TREE)[childIdx]) {
      _classPrivateMethodGet(this, _swap, _swap2).call(this, childIdx, currentIdx);

      _classPrivateMethodGet(this, _reArrangeTtoB, _reArrangeTtoB2).call(this, childIdx);
    } else {
      return;
    }
  };

  var _swap2 = function _swap2(x, y) {
    var b = _classPrivateFieldGet(this, _HEAP_TREE)[y];

    _classPrivateFieldGet(this, _HEAP_TREE)[y] = _classPrivateFieldGet(this, _HEAP_TREE)[x];
    _classPrivateFieldGet(this, _HEAP_TREE)[x] = b;
  };

  var _heapify2 = function _heapify2(i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var min = i;

    if (left <= _classPrivateFieldGet(this, _HEAP_TREE).length && _classPrivateFieldGet(this, _HEAP_TREE)[left] < _classPrivateFieldGet(this, _HEAP_TREE)[i]) {
      min = left;
    }

    if (right <= _classPrivateFieldGet(this, _HEAP_TREE).length && _classPrivateFieldGet(this, _HEAP_TREE)[right] < _classPrivateFieldGet(this, _HEAP_TREE)[min]) {
      min = right;
    }

    if (min != i) {
      _classPrivateMethodGet(this, _swap, _swap2).call(this, i, min);

      _classPrivateMethodGet(this, _heapify, _heapify2).call(this, min);
    }
  };

  module.exports = exports.default;

}());
