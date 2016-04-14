/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		3:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"draw","1":"puzzle","2":"puzzle_canvas","4":"wheel"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(5);
	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.20
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;
	  if (this.size === this.limit) {
	    removed = this.shift();
	  }

	  var entry = this.get(key, true);
	  if (!entry) {
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */

	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * 0.11 deprecation warning
	 */

	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}

	/**
	 * Assert asset exists
	 */

	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};

	    // save raw constructor data before merge
	    // so that we know which properties are provided at
	    // instantiation.
	    this._runtimeData = options.data;

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queueIndex;
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	  resetBatcherState();
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (queueIndex = 0; queueIndex < queue.length; queueIndex++) {
	    var watcher = queue[queueIndex];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    if (internalQueueDepleted && !watcher.user) {
	      // an internal watcher triggered by a user watcher...
	      // let's run it immediately after current user watcher is done.
	      userQueue.splice(queueIndex + 1, 0, watcher);
	    } else {
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        nextTick(flushBatcherQueue);
	      }
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = Object.create(null);
	  this.newDepIds = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDepIds = Object.create(null);
	  this.newDeps.length = 0;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds[id]) {
	    this.newDepIds[id] = true;
	    this.newDeps.push(dep);
	    if (!this.depIds[id]) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds[dep.id]) {
	      dep.removeSub(this);
	    }
	  }
	  this.depIds = this.newDepIds;
	  var tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var FOR = 2000;
	var IF = 2000;
	var SLOT = 2100;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.value = _toString(value);
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      el[attr] = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },

	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    this.prevKeys = Object.keys(value);
	    setObjectClasses(this.el, value);
	  },

	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val && isPlainObject(val)) {
	        setObjectClasses(this.el, val);
	      } else if (val && typeof val === 'string') {
	        addClass(this.el, val);
	      }
	    }
	    this.prevKeys = value.slice();
	  },

	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (!key) continue;
	        if (isPlainObject(key)) {
	          var keys = Object.keys(key);
	          for (var k = 0; k < keys.length; k++) {
	            removeClass(this.el, keys[k]);
	          }
	        } else {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};

	function setObjectClasses(el, obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    if (obj[key]) {
	      addClass(el, key);
	    }
	  }
	}

	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.');
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  var key = prop.path;
	  value = coerceProp(prop, value);
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop.options);
	  }
	  if (assertProp(prop, value)) {
	    defineReactive(vm, key, value);
	  }
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */

	function getPropDefaultValue(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */

	function assertProp(prop, value) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}

	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;
	    var isSimple = isSimplePath(parentKey);

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      val = coerceProp(prop, val);
	      if (assertProp(prop, val)) {
	        if (isSimple) {
	          withoutConversion(function () {
	            child[childKey] = val;
	          });
	        } else {
	          child[childKey] = val;
	        }
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    var value = parentWatcher.value;
	    if (isSimple && value !== undefined) {
	      withoutConversion(function () {
	        initProp(child, prop, value);
	      });
	    } else {
	      initProp(child, prop, value);
	    }

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    modifiers = parseModifiers(attr.name);
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName);

	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }

	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value)) {
	      value.trim().split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.');
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.');
	    }
	    var props = this._props;
	    var runtimeData = this._runtimeData ? typeof this._runtimeData === 'function' ? this._runtimeData() : this._runtimeData : null;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key) || runtimeData && hasOwn(runtimeData, key) && props[key].raw === null) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. Use prop default value instead.');
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        if (typeof handler === 'function') {
	          handler._fromParent = true;
	          vm.$on(name.replace(eventRE), handler);
	        } else if (process.env.NODE_ENV !== 'production') {
	          warn('v-on:' + name + '="' + attrs[i].value + '"' + (vm.$options.name ? ' on component <' + vm.$options.name + '>' : '') + ' expects a function value, got ' + handler);
	        }
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(factory, 'component', value);
	      }
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */

	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */

	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.20';

	// devtools global hook
	/* istanbul ignore next */
	if (config.devtools) {
	  if (devtools) {
	    devtools.emit('init', Vue);
	  } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	    console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	  }
	}

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Konva JavaScript Framework v0.12.3
	 * http://konvajs.github.io/
	 * Licensed under the MIT or GPL Version 2 licenses.
	 * Date: Thu Apr 07 2016
	 *
	 * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
	 * Modified work Copyright (C) 2014 - 2015 by Anton Lavrenov (Konva)
	 *
	 * @license
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */

	// runtime check for already included Konva
	(function(global){
	    'use strict';
	    /**
	     * @namespace Konva
	     */

	    var PI_OVER_180 = Math.PI / 180;

	    var Konva = {
	        // public
	        version: '0.12.3',

	        // private
	        stages: [],
	        idCounter: 0,
	        ids: {},
	        names: {},
	        shapes: {},
	        listenClickTap: false,
	        inDblClickWindow: false,

	        // configurations
	        enableTrace: false,
	        traceArrMax: 100,
	        dblClickWindow: 400,
	        /**
	         * Global pixel ratio configuration. KonvaJS automatically detect pixel ratio of current device.
	         * But you may override such property, if you want to use your value.
	         * @property pixelRatio
	         * @default undefined
	         * @memberof Konva
	         * @example
	         * Konva.pixelRatio = 1;
	         */
	        pixelRatio: undefined,
	        /**
	         * Drag distance property. If you start to drag a node you may want to wait until pointer is moved to some distance from start point,
	         * only then start dragging.
	         * @property dragDistance
	         * @default 0
	         * @memberof Konva
	         * @example
	         * Konva.dragDistance = 10;
	         */
	        dragDistance: 0,
	        /**
	         * Use degree values for angle properties. You may set this property to false if you want to use radiant values.
	         * @property angleDeg
	         * @default true
	         * @memberof Konva
	         * @example
	         * node.rotation(45); // 45 degrees
	         * Konva.angleDeg = false;
	         * node.rotation(Math.PI / 2); // PI/2 radian
	         */
	        angleDeg: true,
	         /**
	         * Show different warnings about errors or wrong API usage
	         * @property showWarnings
	         * @default true
	         * @memberof Konva
	         * @example
	         * Konva.showWarnings = false;
	         */
	        showWarnings: true,



	        /**
	         * @namespace Filters
	         * @memberof Konva
	         */
	        Filters: {},

	        /**
	         * returns whether or not drag and drop is currently active
	         * @method
	         * @memberof Konva
	         */
	        isDragging: function() {
	            var dd = Konva.DD;

	            // if DD is not included with the build, then
	            // drag and drop is not even possible
	            if (dd) {
	                return dd.isDragging;
	            }
	            return false;
	        },
	        /**
	        * returns whether or not a drag and drop operation is ready, but may
	        *  not necessarily have started
	        * @method
	        * @memberof Konva
	        */
	        isDragReady: function() {
	            var dd = Konva.DD;

	            // if DD is not included with the build, then
	            // drag and drop is not even possible
	            if (dd) {
	                return !!dd.node;
	            }
	            return false;
	        },
	        _addId: function(node, id) {
	            if(id !== undefined) {
	                this.ids[id] = node;
	            }
	        },
	        _removeId: function(id) {
	            if(id !== undefined) {
	                delete this.ids[id];
	            }
	        },
	        _addName: function(node, name) {
	            if(name) {
	                if(!this.names[name]) {
	                    this.names[name] = [];
	                }
	                this.names[name].push(node);
	            }
	        },
	        _removeName: function(name, _id) {
	            if(!name) {
	                return;
	            }
	            var nodes = this.names[name];
	            if(!nodes) {
	                return;
	            }
	            for(var n = 0; n < nodes.length; n++) {
	                var no = nodes[n];
	                if(no._id === _id) {
	                    nodes.splice(n, 1);
	                }
	            }
	            if(nodes.length === 0) {
	                delete this.names[name];
	            }
	        },
	        getAngle: function(angle) {
	            return this.angleDeg ? angle * PI_OVER_180 : angle;
	        },
	        _parseUA: function(userAgent) {
	            var ua = userAgent.toLowerCase(),
	                // jQuery UA regex
	                match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
	                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
	                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
	                /(msie) ([\w.]+)/.exec( ua ) ||
	                ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
	                [],

	                // adding mobile flag as well
	                mobile = !!(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)),
	                ieMobile = !!(userAgent.match(/IEMobile/i));

	            return {
	                browser: match[ 1 ] || '',
	                version: match[ 2 ] || '0',

	                // adding mobile flab
	                mobile: mobile,
	                ieMobile: ieMobile  // If this is true (i.e., WP8), then Konva touch events are executed instead of equivalent Konva mouse events
	            };
	        },
	        // user agent
	        UA: undefined
	    };

	    var glob =
	        typeof window !== 'undefined' ? window :
	        typeof global !== 'undefined' ? global :
	        typeof WorkerGlobalScope !== 'undefined' ? self : {};


	    Konva.UA = Konva._parseUA((glob.navigator && glob.navigator.userAgent) || '');

	    if (glob.Konva) {
	        console.error(
	            'Konva instance is already exist in current eviroment. ' +
	            'Please use only one instance.'
	        );
	    }
	    glob.Konva = Konva;
	    Konva.global = glob;


	    if( true) {
	        // runtime-check for browserify and nw.js (node-webkit)
	        if(glob.window && glob.window.document) {
	            Konva.document = glob.window.document;
	            Konva.window = glob.window;
	        } else {
	            // Node. Does not work with strict CommonJS, but
	            // only CommonJS-like enviroments that support module.exports,
	            // like Node.
	            var Canvas = __webpack_require__(7);
	            var jsdom = __webpack_require__(8).jsdom;

	            Konva.document = jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
	            Konva.window = Konva.document.parentWindow;
	            Konva.window.Image = Canvas.Image;
	            Konva._nodeCanvas = Canvas;
	        }
	        module.exports = Konva;
	        return;
	    }
	    else if( typeof define === 'function' && define.amd) {
	        // AMD. Register as an anonymous module.
	        define(function() {
	            return Konva;
	        });
	    }
	    Konva.document = document;
	    Konva.window = window;
	})(typeof window !== 'undefined' ? window : global);

	/*eslint-disable  eqeqeq, no-cond-assign, no-empty*/
	(function() {
	    'use strict';
	    /**
	     * Collection constructor.  Collection extends
	     *  Array.  This class is used in conjunction with {@link Konva.Container#get}
	     * @constructor
	     * @memberof Konva
	     */
	    Konva.Collection = function() {
	        var args = [].slice.call(arguments), length = args.length, i = 0;

	        this.length = length;
	        for(; i < length; i++) {
	            this[i] = args[i];
	        }
	        return this;
	    };
	    Konva.Collection.prototype = [];
	    /**
	     * iterate through node array and run a function for each node.
	     *  The node and index is passed into the function
	     * @method
	     * @memberof Konva.Collection.prototype
	     * @param {Function} func
	     * @example
	     * // get all nodes with name foo inside layer, and set x to 10 for each
	     * layer.get('.foo').each(function(shape, n) {
	     *   shape.setX(10);
	     * });
	     */
	    Konva.Collection.prototype.each = function(func) {
	        for(var n = 0; n < this.length; n++) {
	            func(this[n], n);
	        }
	    };
	    /**
	     * convert collection into an array
	     * @method
	     * @memberof Konva.Collection.prototype
	     */
	    Konva.Collection.prototype.toArray = function() {
	        var arr = [],
	            len = this.length,
	            n;

	        for(n = 0; n < len; n++) {
	            arr.push(this[n]);
	        }
	        return arr;
	    };
	    /**
	     * convert array into a collection
	     * @method
	     * @memberof Konva.Collection
	     * @param {Array} arr
	     */
	    Konva.Collection.toCollection = function(arr) {
	        var collection = new Konva.Collection(),
	            len = arr.length,
	            n;

	        for(n = 0; n < len; n++) {
	            collection.push(arr[n]);
	        }
	        return collection;
	    };

	    // map one method by it's name
	    Konva.Collection._mapMethod = function(methodName) {
	        Konva.Collection.prototype[methodName] = function() {
	            var len = this.length,
	                i;

	            var args = [].slice.call(arguments);
	            for(i = 0; i < len; i++) {
	                this[i][methodName].apply(this[i], args);
	            }

	            return this;
	        };
	    };

	    Konva.Collection.mapMethods = function(constructor) {
	        var prot = constructor.prototype;
	        for(var methodName in prot) {
	            Konva.Collection._mapMethod(methodName);
	        }
	    };

	    /*
	    * Last updated November 2011
	    * By Simon Sarris
	    * www.simonsarris.com
	    * sarris@acm.org
	    *
	    * Free to use and distribute at will
	    * So long as you are nice to people, etc
	    */

	    /*
	    * The usage of this class was inspired by some of the work done by a forked
	    * project, KineticJS-Ext by Wappworks, which is based on Simon's Transform
	    * class.  Modified by Eric Rowell
	    */

	    /**
	     * Transform constructor
	     * @constructor
	     * @param {Array} [m] Optional six-element matrix
	     * @memberof Konva
	     */
	    Konva.Transform = function(m) {
	        this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
	    };

	    Konva.Transform.prototype = {
	        /**
	         * Copy Konva.Transform object
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @returns {Konva.Transform}
	         */
	        copy: function() {
	            return new Konva.Transform(this.m);
	        },
	        /**
	         * Transform point
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Object} point 2D point(x, y)
	         * @returns {Object} 2D point(x, y)
	         */
	        point: function(point) {
	            var m = this.m;
	            return {
	                x: m[0] * point.x + m[2] * point.y + m[4],
	                y: m[1] * point.x + m[3] * point.y + m[5]
	            };
	        },
	        /**
	         * Apply translation
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Number} x
	         * @param {Number} y
	         * @returns {Konva.Transform}
	         */
	        translate: function(x, y) {
	            this.m[4] += this.m[0] * x + this.m[2] * y;
	            this.m[5] += this.m[1] * x + this.m[3] * y;
	            return this;
	        },
	        /**
	         * Apply scale
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Number} sx
	         * @param {Number} sy
	         * @returns {Konva.Transform}
	         */
	        scale: function(sx, sy) {
	            this.m[0] *= sx;
	            this.m[1] *= sx;
	            this.m[2] *= sy;
	            this.m[3] *= sy;
	            return this;
	        },
	        /**
	         * Apply rotation
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Number} rad  Angle in radians
	         * @returns {Konva.Transform}
	         */
	        rotate: function(rad) {
	            var c = Math.cos(rad);
	            var s = Math.sin(rad);
	            var m11 = this.m[0] * c + this.m[2] * s;
	            var m12 = this.m[1] * c + this.m[3] * s;
	            var m21 = this.m[0] * -s + this.m[2] * c;
	            var m22 = this.m[1] * -s + this.m[3] * c;
	            this.m[0] = m11;
	            this.m[1] = m12;
	            this.m[2] = m21;
	            this.m[3] = m22;
	            return this;
	        },
	        /**
	         * Returns the translation
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @returns {Object} 2D point(x, y)
	         */
	        getTranslation: function() {
	            return {
	                x: this.m[4],
	                y: this.m[5]
	            };
	        },
	        /**
	         * Apply skew
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Number} sx
	         * @param {Number} sy
	         * @returns {Konva.Transform}
	         */
	        skew: function(sx, sy) {
	            var m11 = this.m[0] + this.m[2] * sy;
	            var m12 = this.m[1] + this.m[3] * sy;
	            var m21 = this.m[2] + this.m[0] * sx;
	            var m22 = this.m[3] + this.m[1] * sx;
	            this.m[0] = m11;
	            this.m[1] = m12;
	            this.m[2] = m21;
	            this.m[3] = m22;
	            return this;
	         },
	        /**
	         * Transform multiplication
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @param {Konva.Transform} matrix
	         * @returns {Konva.Transform}
	         */
	        multiply: function(matrix) {
	            var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
	            var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

	            var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
	            var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

	            var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
	            var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

	            this.m[0] = m11;
	            this.m[1] = m12;
	            this.m[2] = m21;
	            this.m[3] = m22;
	            this.m[4] = dx;
	            this.m[5] = dy;
	            return this;
	        },
	        /**
	         * Invert the matrix
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @returns {Konva.Transform}
	         */
	        invert: function() {
	            var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
	            var m0 = this.m[3] * d;
	            var m1 = -this.m[1] * d;
	            var m2 = -this.m[2] * d;
	            var m3 = this.m[0] * d;
	            var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
	            var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
	            this.m[0] = m0;
	            this.m[1] = m1;
	            this.m[2] = m2;
	            this.m[3] = m3;
	            this.m[4] = m4;
	            this.m[5] = m5;
	            return this;
	        },
	        /**
	         * return matrix
	         * @method
	         * @memberof Konva.Transform.prototype
	         */
	        getMatrix: function() {
	            return this.m;
	        },
	        /**
	         * set to absolute position via translation
	         * @method
	         * @memberof Konva.Transform.prototype
	         * @returns {Konva.Transform}
	         * @author ericdrowell
	         */
	        setAbsolutePosition: function(x, y) {
	            var m0 = this.m[0],
	                m1 = this.m[1],
	                m2 = this.m[2],
	                m3 = this.m[3],
	                m4 = this.m[4],
	                m5 = this.m[5],
	                yt = ((m0 * (y - m5)) - (m1 * (x - m4))) / ((m0 * m3) - (m1 * m2)),
	                xt = (x - m4 - (m2 * yt)) / m0;

	            return this.translate(xt, yt);
	        }
	    };

	    // CONSTANTS
	    var CONTEXT_2D = '2d',
	        OBJECT_ARRAY = '[object Array]',
	        OBJECT_NUMBER = '[object Number]',
	        OBJECT_STRING = '[object String]',
	        PI_OVER_DEG180 = Math.PI / 180,
	        DEG180_OVER_PI = 180 / Math.PI,
	        HASH = '#',
	        EMPTY_STRING = '',
	        ZERO = '0',
	        KONVA_WARNING = 'Konva warning: ',
	        KONVA_ERROR = 'Konva error: ',
	        RGB_PAREN = 'rgb(',
	        COLORS = {
	            aliceblue: [240, 248, 255],
	            antiquewhite: [250, 235, 215],
	            aqua: [0, 255, 255],
	            aquamarine: [127, 255, 212],
	            azure: [240, 255, 255],
	            beige: [245, 245, 220],
	            bisque: [255, 228, 196],
	            black: [0, 0, 0],
	            blanchedalmond: [255, 235, 205],
	            blue: [0, 0, 255],
	            blueviolet: [138, 43, 226],
	            brown: [165, 42, 42],
	            burlywood: [222, 184, 135],
	            cadetblue: [95, 158, 160],
	            chartreuse: [127, 255, 0],
	            chocolate: [210, 105, 30],
	            coral: [255, 127, 80],
	            cornflowerblue: [100, 149, 237],
	            cornsilk: [255, 248, 220],
	            crimson: [220, 20, 60],
	            cyan: [0, 255, 255],
	            darkblue: [0, 0, 139],
	            darkcyan: [0, 139, 139],
	            darkgoldenrod: [184, 132, 11],
	            darkgray: [169, 169, 169],
	            darkgreen: [0, 100, 0],
	            darkgrey: [169, 169, 169],
	            darkkhaki: [189, 183, 107],
	            darkmagenta: [139, 0, 139],
	            darkolivegreen: [85, 107, 47],
	            darkorange: [255, 140, 0],
	            darkorchid: [153, 50, 204],
	            darkred: [139, 0, 0],
	            darksalmon: [233, 150, 122],
	            darkseagreen: [143, 188, 143],
	            darkslateblue: [72, 61, 139],
	            darkslategray: [47, 79, 79],
	            darkslategrey: [47, 79, 79],
	            darkturquoise: [0, 206, 209],
	            darkviolet: [148, 0, 211],
	            deeppink: [255, 20, 147],
	            deepskyblue: [0, 191, 255],
	            dimgray: [105, 105, 105],
	            dimgrey: [105, 105, 105],
	            dodgerblue: [30, 144, 255],
	            firebrick: [178, 34, 34],
	            floralwhite: [255, 255, 240],
	            forestgreen: [34, 139, 34],
	            fuchsia: [255, 0, 255],
	            gainsboro: [220, 220, 220],
	            ghostwhite: [248, 248, 255],
	            gold: [255, 215, 0],
	            goldenrod: [218, 165, 32],
	            gray: [128, 128, 128],
	            green: [0, 128, 0],
	            greenyellow: [173, 255, 47],
	            grey: [128, 128, 128],
	            honeydew: [240, 255, 240],
	            hotpink: [255, 105, 180],
	            indianred: [205, 92, 92],
	            indigo: [75, 0, 130],
	            ivory: [255, 255, 240],
	            khaki: [240, 230, 140],
	            lavender: [230, 230, 250],
	            lavenderblush: [255, 240, 245],
	            lawngreen: [124, 252, 0],
	            lemonchiffon: [255, 250, 205],
	            lightblue: [173, 216, 230],
	            lightcoral: [240, 128, 128],
	            lightcyan: [224, 255, 255],
	            lightgoldenrodyellow: [250, 250, 210],
	            lightgray: [211, 211, 211],
	            lightgreen: [144, 238, 144],
	            lightgrey: [211, 211, 211],
	            lightpink: [255, 182, 193],
	            lightsalmon: [255, 160, 122],
	            lightseagreen: [32, 178, 170],
	            lightskyblue: [135, 206, 250],
	            lightslategray: [119, 136, 153],
	            lightslategrey: [119, 136, 153],
	            lightsteelblue: [176, 196, 222],
	            lightyellow: [255, 255, 224],
	            lime: [0, 255, 0],
	            limegreen: [50, 205, 50],
	            linen: [250, 240, 230],
	            magenta: [255, 0, 255],
	            maroon: [128, 0, 0],
	            mediumaquamarine: [102, 205, 170],
	            mediumblue: [0, 0, 205],
	            mediumorchid: [186, 85, 211],
	            mediumpurple: [147, 112, 219],
	            mediumseagreen: [60, 179, 113],
	            mediumslateblue: [123, 104, 238],
	            mediumspringgreen: [0, 250, 154],
	            mediumturquoise: [72, 209, 204],
	            mediumvioletred: [199, 21, 133],
	            midnightblue: [25, 25, 112],
	            mintcream: [245, 255, 250],
	            mistyrose: [255, 228, 225],
	            moccasin: [255, 228, 181],
	            navajowhite: [255, 222, 173],
	            navy: [0, 0, 128],
	            oldlace: [253, 245, 230],
	            olive: [128, 128, 0],
	            olivedrab: [107, 142, 35],
	            orange: [255, 165, 0],
	            orangered: [255, 69, 0],
	            orchid: [218, 112, 214],
	            palegoldenrod: [238, 232, 170],
	            palegreen: [152, 251, 152],
	            paleturquoise: [175, 238, 238],
	            palevioletred: [219, 112, 147],
	            papayawhip: [255, 239, 213],
	            peachpuff: [255, 218, 185],
	            peru: [205, 133, 63],
	            pink: [255, 192, 203],
	            plum: [221, 160, 203],
	            powderblue: [176, 224, 230],
	            purple: [128, 0, 128],
	            rebeccapurple: [102, 51, 153],
	            red: [255, 0, 0],
	            rosybrown: [188, 143, 143],
	            royalblue: [65, 105, 225],
	            saddlebrown: [139, 69, 19],
	            salmon: [250, 128, 114],
	            sandybrown: [244, 164, 96],
	            seagreen: [46, 139, 87],
	            seashell: [255, 245, 238],
	            sienna: [160, 82, 45],
	            silver: [192, 192, 192],
	            skyblue: [135, 206, 235],
	            slateblue: [106, 90, 205],
	            slategray: [119, 128, 144],
	            slategrey: [119, 128, 144],
	            snow: [255, 255, 250],
	            springgreen: [0, 255, 127],
	            steelblue: [70, 130, 180],
	            tan: [210, 180, 140],
	            teal: [0, 128, 128],
	            thistle: [216, 191, 216],
	            transparent: [255, 255, 255, 0],
	            tomato: [255, 99, 71],
	            turquoise: [64, 224, 208],
	            violet: [238, 130, 238],
	            wheat: [245, 222, 179],
	            white: [255, 255, 255],
	            whitesmoke: [245, 245, 245],
	            yellow: [255, 255, 0],
	            yellowgreen: [154, 205, 5]
	        },

	        RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

	    /**
	     * @namespace Util
	     * @memberof Konva
	     */
	    Konva.Util = {
	        /*
	         * cherry-picked utilities from underscore.js
	         */
	        _isElement: function(obj) {
	            return !!(obj && obj.nodeType == 1);
	        },
	        _isFunction: function(obj) {
	            return !!(obj && obj.constructor && obj.call && obj.apply);
	        },
	        _isObject: function(obj) {
	            return (!!obj && obj.constructor === Object);
	        },
	        _isArray: function(obj) {
	            return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
	        },
	        _isNumber: function(obj) {
	            return Object.prototype.toString.call(obj) === OBJECT_NUMBER;
	        },
	        _isString: function(obj) {
	            return Object.prototype.toString.call(obj) === OBJECT_STRING;
	        },
	        // Returns a function, that, when invoked, will only be triggered at most once
	        // during a given window of time. Normally, the throttled function will run
	        // as much as it can, without ever going more than once per `wait` duration;
	        // but if you'd like to disable the execution on the leading edge, pass
	        // `{leading: false}`. To disable execution on the trailing edge, ditto.
	        _throttle: function(func, wait, opts) {
	            var context, args, result;
	            var timeout = null;
	            var previous = 0;
	            var options = opts || {};
	            var later = function() {
	                previous = options.leading === false ? 0 : new Date().getTime();
	                timeout = null;
	                result = func.apply(context, args);
	                context = args = null;
	            };
	            return function() {
	                var now = new Date().getTime();
	                if (!previous && options.leading === false) {
	                    previous = now;
	                }
	                var remaining = wait - (now - previous);
	                context = this;
	                args = arguments;
	                if (remaining <= 0) {
	                  clearTimeout(timeout);
	                  timeout = null;
	                  previous = now;
	                  result = func.apply(context, args);
	                  context = args = null;
	                } else if (!timeout && options.trailing !== false) {
	                  timeout = setTimeout(later, remaining);
	                }
	                return result;
	            };
	        },
	        /*
	         * other utils
	         */
	        _hasMethods: function(obj) {
	            var names = [],
	                key;

	            for(key in obj) {
	                if (!obj.hasOwnProperty(key)) {
	                    continue;
	                }
	                if(this._isFunction(obj[key])) {
	                    names.push(key);
	                }
	            }
	            return names.length > 0;
	        },
	        isValidSelector: function(selector) {
	            if (typeof selector !== 'string') {
	                return false;
	            }
	            var firstChar = selector[0];
	            return firstChar === '#' || firstChar === '.' || firstChar === firstChar.toUpperCase();
	        },
	        createCanvasElement: function() {
	            var canvas = Konva.document.createElement('canvas');
	            // on some environments canvas.style is readonly
	            try {
	                canvas.style = canvas.style || {};
	            } catch (e) {
	            }
	            return canvas;
	        },
	        isBrowser: function() {
	            return (typeof exports !== 'object');
	        },
	        _isInDocument: function(el) {
	            while(el = el.parentNode) {
	                if(el == Konva.document) {
	                    return true;
	                }
	            }
	            return false;
	        },
	        _simplifyArray: function(arr) {
	            var retArr = [],
	                len = arr.length,
	                util = Konva.Util,
	                n, val;

	            for (n = 0; n < len; n++) {
	                val = arr[n];
	                if (util._isNumber(val)) {
	                    val = Math.round(val * 1000) / 1000;
	                }
	                else if (!util._isString(val)) {
	                    val = val.toString();
	                }

	                retArr.push(val);
	            }

	            return retArr;
	        },
	        /*
	         * arg can be an image object or image data
	         */
	        _getImage: function(arg, callback) {
	            var imageObj, canvas;

	            // if arg is null or undefined
	            if(!arg) {
	                callback(null);
	            }

	            // if arg is already an image object
	            else if(this._isElement(arg)) {
	                callback(arg);
	            }

	            // if arg is a string, then it's a data url
	            else if(this._isString(arg)) {
	                imageObj = new Konva.window.Image();
	                imageObj.onload = function() {
	                    callback(imageObj);
	                };
	                imageObj.src = arg;
	            }

	            //if arg is an object that contains the data property, it's an image object
	            else if(arg.data) {
	                canvas = Konva.Util.createCanvasElement();
	                canvas.width = arg.width;
	                canvas.height = arg.height;
	                var _context = canvas.getContext(CONTEXT_2D);
	                _context.putImageData(arg, 0, 0);
	                this._getImage(canvas.toDataURL(), callback);
	            }
	            else {
	                callback(null);
	            }
	        },
	        _getRGBAString: function(obj) {
	            var red = obj.red || 0,
	                green = obj.green || 0,
	                blue = obj.blue || 0,
	                alpha = obj.alpha || 1;

	            return [
	                'rgba(',
	                red,
	                ',',
	                green,
	                ',',
	                blue,
	                ',',
	                alpha,
	                ')'
	            ].join(EMPTY_STRING);
	        },
	        _rgbToHex: function(r, g, b) {
	            return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	        },
	        _hexToRgb: function(hex) {
	            hex = hex.replace(HASH, EMPTY_STRING);
	            var bigint = parseInt(hex, 16);
	            return {
	                r: (bigint >> 16) & 255,
	                g: (bigint >> 8) & 255,
	                b: bigint & 255
	            };
	        },
	        /**
	         * return random hex color
	         * @method
	         * @memberof Konva.Util.prototype
	         */
	        getRandomColor: function() {
	            var randColor = (Math.random() * 0xFFFFFF << 0).toString(16);
	            while (randColor.length < 6) {
	                randColor = ZERO + randColor;
	            }
	            return HASH + randColor;
	        },
	        /**
	         * return value with default fallback
	         * @method
	         * @memberof Konva.Util.prototype
	         */
	        get: function(val, def) {
	            if (val === undefined) {
	                return def;
	            }
	            else {
	                return val;
	            }
	        },
	        /**
	         * get RGB components of a color
	         * @method
	         * @memberof Konva.Util.prototype
	         * @param {String} color
	         * @example
	         * // each of the following examples return {r:0, g:0, b:255}
	         * var rgb = Konva.Util.getRGB('blue');
	         * var rgb = Konva.Util.getRGB('#0000ff');
	         * var rgb = Konva.Util.getRGB('rgb(0,0,255)');
	         */
	        getRGB: function(color) {
	            var rgb;
	            // color string
	            if (color in COLORS) {
	                rgb = COLORS[color];
	                return {
	                    r: rgb[0],
	                    g: rgb[1],
	                    b: rgb[2]
	                };
	            }
	            // hex
	            else if (color[0] === HASH) {
	                return this._hexToRgb(color.substring(1));
	            }
	            // rgb string
	            else if (color.substr(0, 4) === RGB_PAREN) {
	                rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
	                return {
	                    r: parseInt(rgb[1], 10),
	                    g: parseInt(rgb[2], 10),
	                    b: parseInt(rgb[3], 10)
	                };
	            }
	            // default
	            else {
	                return {
	                    r: 0,
	                    g: 0,
	                    b: 0
	                };
	            }
	        },
	        // convert any color string to RGBA object
	        // from https://github.com/component/color-parser
	        colorToRGBA: function(str) {
	            str = str || 'black';
	            return Konva.Util._namedColorToRBA(str)
	                || Konva.Util._hex3ColorToRGBA(str)
	                || Konva.Util._hex6ColorToRGBA(str)
	                || Konva.Util._rgbColorToRGBA(str)
	                || Konva.Util._rgbaColorToRGBA(str);
	        },
	        // Parse named css color. Like "green"
	        _namedColorToRBA: function(str) {
	            var c = COLORS[str.toLowerCase()];
	            if (!c) {
	                return null;
	            }
	            return {
	                r: c[0],
	                g: c[1],
	                b: c[2],
	                a: 1
	            };
	        },
	        // Parse rgb(n, n, n)
	        _rgbColorToRGBA: function(str) {
	            if (str.indexOf('rgb(') === 0) {
	                str = str.match(/rgb\(([^)]+)\)/)[1];
	                var parts = str.split(/ *, */).map(Number);
	                return {
	                    r: parts[0],
	                    g: parts[1],
	                    b: parts[2],
	                    a: 1
	                };
	            }
	        },
	        // Parse rgba(n, n, n, n)
	        _rgbaColorToRGBA: function(str) {
	            if (str.indexOf('rgba(') === 0) {
	                str = str.match(/rgba\(([^)]+)\)/)[1];
	                var parts = str.split(/ *, */).map(Number);
	                return {
	                    r: parts[0],
	                    g: parts[1],
	                    b: parts[2],
	                    a: parts[3]
	                };
	            }

	        },
	        // Parse #nnnnnn
	        _hex6ColorToRGBA: function(str) {
	            if ((str[0] === '#') && (str.length === 7)) {
	                return {
	                    r: parseInt(str.slice(1, 3), 16),
	                    g: parseInt(str.slice(3, 5), 16),
	                    b: parseInt(str.slice(5, 7), 16),
	                    a: 1
	                };
	            }
	        },
	        // Parse #nnn
	        _hex3ColorToRGBA: function(str) {
	            if ((str[0] === '#') && (str.length === 4)) {
	                return {
	                    r: parseInt(str[1] + str[1], 16),
	                    g: parseInt(str[2] + str[2], 16),
	                    b: parseInt(str[3] + str[3], 16),
	                    a: 1
	                };
	            }
	        },
	        // o1 takes precedence over o2
	        _merge: function(o1, o2) {
	            var retObj = this._clone(o2);
	            for(var key in o1) {
	                if(this._isObject(o1[key])) {
	                    retObj[key] = this._merge(o1[key], retObj[key]);
	                }
	                else {
	                    retObj[key] = o1[key];
	                }
	            }
	            return retObj;
	        },
	        cloneObject: function(obj) {
	            var retObj = {};
	            for(var key in obj) {
	                if(this._isObject(obj[key])) {
	                    retObj[key] = this.cloneObject(obj[key]);
	                }
	                else if (this._isArray(obj[key])) {
	                    retObj[key] = this.cloneArray(obj[key]);
	                } else {
	                    retObj[key] = obj[key];
	                }
	            }
	            return retObj;
	        },
	        cloneArray: function(arr) {
	            return arr.slice(0);
	        },
	        _degToRad: function(deg) {
	            return deg * PI_OVER_DEG180;
	        },
	        _radToDeg: function(rad) {
	            return rad * DEG180_OVER_PI;
	        },
	        _capitalize: function(str) {
	            return str.charAt(0).toUpperCase() + str.slice(1);
	        },
	        throw: function(str) {
	            throw new Error(KONVA_ERROR + str);
	        },
	        error: function(str) {
	          console.error(KONVA_ERROR + str);
	        },
	        warn: function(str) {
	            /*
	             * IE9 on Windows7 64bit will throw a JS error
	             * if we don't use window.console in the conditional
	             */
	            if(Konva.global.console && console.warn && Konva.showWarnings) {
	                console.warn(KONVA_WARNING + str);
	            }
	        },
	        extend: function(child, parent) {
	            function Ctor() {
	                this.constructor = child;
	            }
	            Ctor.prototype = parent.prototype;
	            var oldProto = child.prototype;
	            child.prototype = new Ctor();
	            for (var key in oldProto) {
	                if (oldProto.hasOwnProperty(key)) {
	                    child.prototype[key] = oldProto[key];
	                }
	            }
	            child.__super__ = parent.prototype;
	            // create reference to parent
	            child.super = parent;
	        },
	        /**
	         * adds methods to a constructor prototype
	         * @method
	         * @memberof Konva.Util.prototype
	         * @param {Function} constructor
	         * @param {Object} methods
	         */
	        addMethods: function(constructor, methods) {
	            var key;

	            for (key in methods) {
	                constructor.prototype[key] = methods[key];
	            }
	        },
	        _getControlPoints: function(x0, y0, x1, y1, x2, y2, t) {
	            var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)),
	                d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
	                fa = t * d01 / (d01 + d12),
	                fb = t * d12 / (d01 + d12),
	                p1x = x1 - fa * (x2 - x0),
	                p1y = y1 - fa * (y2 - y0),
	                p2x = x1 + fb * (x2 - x0),
	                p2y = y1 + fb * (y2 - y0);

	            return [p1x, p1y, p2x, p2y];
	        },
	        _expandPoints: function(p, tension) {
	            var len = p.length,
	                allPoints = [],
	                n, cp;

	            for (n = 2; n < len - 2; n += 2) {
	                cp = Konva.Util._getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
	                allPoints.push(cp[0]);
	                allPoints.push(cp[1]);
	                allPoints.push(p[n]);
	                allPoints.push(p[n + 1]);
	                allPoints.push(cp[2]);
	                allPoints.push(cp[3]);
	            }

	            return allPoints;
	        },
	        _removeLastLetter: function(str) {
	            return str.substring(0, str.length - 1);
	        },
	        each: function(obj, func) {
	            for (var key in obj) {
	                func(key, obj[key]);
	            }
	        },
	        _getProjectionToSegment: function(x1, y1, x2, y2, x3, y3) {
	            var x, y, dist;

	            var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
	            if(pd2 == 0) {
	                x = x1;
	                y = y1;
	                dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
	            } else {
	                var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
	                if(u < 0) {
	                    x = x1;
	                    y = y1;
	                    dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
	                } else if (u > 1.0) {
	                    x = x2;
	                    y = y2;
	                    dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
	                } else {
	                    x = x1 + u * (x2 - x1);
	                    y = y1 + u * (y2 - y1);
	                    dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
	                }
	            }
	            return [x, y, dist];
	        },
	        // line as array of points.
	        // line might be closed
	        _getProjectionToLine: function(pt, line, isClosed) {
	            var pc = Konva.Util.cloneObject(pt);
	            var dist = Number.MAX_VALUE;
	            line.forEach(function(p1, i) {
	                if (!isClosed && i === line.length - 1) {
	                    return;
	                }
	                var p2 = line[(i + 1) % line.length];
	                var proj = Konva.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
	                var px = proj[0], py = proj[1], pdist = proj[2];
	                if (pdist < dist) {
	                    pc.x = px;
	                    pc.y = py;
	                    dist = pdist;
	                }
	            });
	            return pc;
	        },
	        _prepareArrayForTween: function(startArray, endArray, isClosed) {
	            var n, start = [], end = [];
	            if (startArray.length > endArray.length) {
	                var temp = endArray;
	                endArray = startArray;
	                startArray = temp;
	            }
	            for (n = 0; n < startArray.length; n += 2) {
	                start.push({
	                    x: startArray[n],
	                    y: startArray[n + 1]
	                });
	            }
	            for (n = 0; n < endArray.length; n += 2) {
	                end.push({
	                    x: endArray[n],
	                    y: endArray[n + 1]
	                });
	            }


	            var newStart = [];
	            end.forEach(function(point) {
	                var pr = Konva.Util._getProjectionToLine(point, start, isClosed);
	                newStart.push(pr.x);
	                newStart.push(pr.y);
	            });
	            return newStart;
	        }
	    };
	})();

	(function() {
	    'use strict';
	    // calculate pixel ratio
	    var canvas = Konva.Util.createCanvasElement(),
	        context = canvas.getContext('2d'),
	        _pixelRatio = (function(){
	            var devicePixelRatio = Konva.window.devicePixelRatio || 1,
	            backingStoreRatio = context.webkitBackingStorePixelRatio
	                || context.mozBackingStorePixelRatio
	                || context.msBackingStorePixelRatio
	                || context.oBackingStorePixelRatio
	                || context.backingStorePixelRatio
	                || 1;
	            return devicePixelRatio / backingStoreRatio;
	        })();

	    /**
	     * Canvas Renderer constructor
	     * @constructor
	     * @abstract
	     * @memberof Konva
	     * @param {Object} config
	     * @param {Number} config.width
	     * @param {Number} config.height
	     * @param {Number} config.pixelRatio KonvaJS automatically handles pixel ratio adjustments in order to render crisp drawings
	     *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
	     *  of 1.  Some high end tablets and phones, like iPhones and iPads (not the mini) have a device pixel ratio
	     *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
	     *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
	     *  specified, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
	     *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
	     */
	    Konva.Canvas = function(config) {
	        this.init(config);
	    };

	    Konva.Canvas.prototype = {
	        init: function(config) {
	            var conf = config || {};

	            var pixelRatio = conf.pixelRatio || Konva.pixelRatio || _pixelRatio;

	            this.pixelRatio = pixelRatio;
	            this._canvas = Konva.Util.createCanvasElement();

	            // set inline styles
	            this._canvas.style.padding = 0;
	            this._canvas.style.margin = 0;
	            this._canvas.style.border = 0;
	            this._canvas.style.background = 'transparent';
	            this._canvas.style.position = 'absolute';
	            this._canvas.style.top = 0;
	            this._canvas.style.left = 0;
	        },
	        /**
	         * get canvas context
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @returns {CanvasContext} context
	         */
	        getContext: function() {
	            return this.context;
	        },
	        /**
	         * get pixel ratio
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @returns {Number} pixel ratio
	         */
	        getPixelRatio: function() {
	            return this.pixelRatio;
	        },
	        /**
	         * get pixel ratio
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {Number} pixelRatio KonvaJS automatically handles pixel ratio adustments in order to render crisp drawings
	         *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
	         *  of 1.  Some high end tablets and phones, like iPhones and iPads have a device pixel ratio
	         *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
	         *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
	         *  specificed, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
	         *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
	         */
	        setPixelRatio: function(pixelRatio) {
	            var previousRatio = this.pixelRatio;
	            this.pixelRatio = pixelRatio;
	            this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
	        },
	        /**
	         * set width
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {Number} width
	         */
	        setWidth: function(width) {
	            // take into account pixel ratio
	            this.width = this._canvas.width = width * this.pixelRatio;
	            this._canvas.style.width = width + 'px';

	            var pixelRatio = this.pixelRatio,
	                _context = this.getContext()._context;
	            _context.scale(pixelRatio, pixelRatio);
	        },
	        /**
	         * set height
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {Number} height
	         */
	        setHeight: function(height) {
	            // take into account pixel ratio
	            this.height = this._canvas.height = height * this.pixelRatio;
	            this._canvas.style.height = height + 'px';
	            var pixelRatio = this.pixelRatio,
	                _context = this.getContext()._context;
	            _context.scale(pixelRatio, pixelRatio);
	        },
	        /**
	         * get width
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @returns {Number} width
	         */
	        getWidth: function() {
	            return this.width;
	        },
	        /**
	         * get height
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @returns {Number} height
	         */
	        getHeight: function() {
	            return this.height;
	        },
	        /**
	         * set size
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {Number} width
	         * @param {Number} height
	         */
	        setSize: function(width, height) {
	            this.setWidth(width);
	            this.setHeight(height);
	        },
	        /**
	         * to data url
	         * @method
	         * @memberof Konva.Canvas.prototype
	         * @param {String} mimeType
	         * @param {Number} quality between 0 and 1 for jpg mime types
	         * @returns {String} data url string
	         */
	        toDataURL: function(mimeType, quality) {
	            try {
	                // If this call fails (due to browser bug, like in Firefox 3.6),
	                // then revert to previous no-parameter image/png behavior
	                return this._canvas.toDataURL(mimeType, quality);
	            }
	            catch(e) {
	                try {
	                    return this._canvas.toDataURL();
	                }
	                catch(err) {
	                    Konva.Util.warn('Unable to get data URL. ' + err.message);
	                    return '';
	                }
	            }
	        }
	    };

	    Konva.SceneCanvas = function(config) {
	        var conf = config || {};
	        var width = conf.width || 0,
	            height = conf.height || 0;

	        Konva.Canvas.call(this, conf);
	        this.context = new Konva.SceneContext(this);
	        this.setSize(width, height);
	    };

	    Konva.Util.extend(Konva.SceneCanvas, Konva.Canvas);

	    Konva.HitCanvas = function(config) {
	        var conf = config || {};
	        var width = conf.width || 0,
	            height = conf.height || 0;

	        Konva.Canvas.call(this, conf);
	        this.context = new Konva.HitContext(this);
	        this.setSize(width, height);
	        this.hitCanvas = true;
	    };
	    Konva.Util.extend(Konva.HitCanvas, Konva.Canvas);

	})();

	(function() {
	    'use strict';
	    var COMMA = ',',
	        OPEN_PAREN = '(',
	        CLOSE_PAREN = ')',
	        OPEN_PAREN_BRACKET = '([',
	        CLOSE_BRACKET_PAREN = '])',
	        SEMICOLON = ';',
	        DOUBLE_PAREN = '()',
	        // EMPTY_STRING = '',
	        EQUALS = '=',
	        // SET = 'set',
	        CONTEXT_METHODS = [
	            'arc',
	            'arcTo',
	            'beginPath',
	            'bezierCurveTo',
	            'clearRect',
	            'clip',
	            'closePath',
	            'createLinearGradient',
	            'createPattern',
	            'createRadialGradient',
	            'drawImage',
	            'fill',
	            'fillText',
	            'getImageData',
	            'createImageData',
	            'lineTo',
	            'moveTo',
	            'putImageData',
	            'quadraticCurveTo',
	            'rect',
	            'restore',
	            'rotate',
	            'save',
	            'scale',
	            'setLineDash',
	            'setTransform',
	            'stroke',
	            'strokeText',
	            'transform',
	            'translate'
	        ];

	    var CONTEXT_PROPERTIES = ['fillStyle', 'strokeStyle', 'shadowColor', 'shadowBlur', 'shadowOffsetX',
	        'shadowOffsetY', 'lineCap', 'lineJoin', 'lineWidth', 'miterLimit', 'font', 'textAlign', 'textBaseline',
	        'globalAlpha', 'globalCompositeOperation'];

	    /**
	     * Canvas Context constructor
	     * @constructor
	     * @abstract
	     * @memberof Konva
	     */
	    Konva.Context = function(canvas) {
	        this.init(canvas);
	    };

	    Konva.Context.prototype = {
	        init: function(canvas) {
	            this.canvas = canvas;
	            this._context = canvas._canvas.getContext('2d');

	            if (Konva.enableTrace) {
	                this.traceArr = [];
	                this._enableTrace();
	            }
	        },
	        /**
	         * fill shape
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Konva.Shape} shape
	         */
	        fillShape: function(shape) {
	            if(shape.getFillEnabled()) {
	                this._fill(shape);
	            }
	        },
	        /**
	         * stroke shape
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Konva.Shape} shape
	         */
	        strokeShape: function(shape) {
	            if(shape.getStrokeEnabled()) {
	                this._stroke(shape);
	            }
	        },
	        /**
	         * fill then stroke
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Konva.Shape} shape
	         */
	        fillStrokeShape: function(shape) {
	            var fillEnabled = shape.getFillEnabled();
	            if(fillEnabled) {
	                this._fill(shape);
	            }
	            if(shape.getStrokeEnabled()) {
	                this._stroke(shape);
	            }
	        },
	        /**
	         * get context trace if trace is enabled
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Boolean} relaxed if false, return strict context trace, which includes method names, method parameters
	         *  properties, and property values.  If true, return relaxed context trace, which only returns method names and
	         *  properites.
	         * @returns {String}
	         */
	        getTrace: function(relaxed) {
	            var traceArr = this.traceArr,
	                len = traceArr.length,
	                str = '',
	                n, trace, method, args;

	            for (n = 0; n < len; n++) {
	                trace = traceArr[n];
	                method = trace.method;

	                // methods
	                if (method) {
	                    args = trace.args;
	                    str += method;
	                    if (relaxed) {
	                        str += DOUBLE_PAREN;
	                    }
	                    else {
	                        if (Konva.Util._isArray(args[0])) {
	                            str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
	                        }
	                        else {
	                            str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
	                        }
	                    }
	                }
	                // properties
	                else {
	                    str += trace.property;
	                    if (!relaxed) {
	                        str += EQUALS + trace.val;
	                    }
	                }

	                str += SEMICOLON;
	            }

	            return str;
	        },
	        /**
	         * clear trace if trace is enabled
	         * @method
	         * @memberof Konva.Context.prototype
	         */
	        clearTrace: function() {
	            this.traceArr = [];
	        },
	        _trace: function(str) {
	            var traceArr = this.traceArr,
	                len;

	            traceArr.push(str);
	            len = traceArr.length;

	            if (len >= Konva.traceArrMax) {
	                traceArr.shift();
	            }
	        },
	        /**
	         * reset canvas context transform
	         * @method
	         * @memberof Konva.Context.prototype
	         */
	        reset: function() {
	            var pixelRatio = this.getCanvas().getPixelRatio();
	            this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
	        },
	        /**
	         * get canvas
	         * @method
	         * @memberof Konva.Context.prototype
	         * @returns {Konva.Canvas}
	         */
	        getCanvas: function() {
	            return this.canvas;
	        },
	        /**
	         * clear canvas
	         * @method
	         * @memberof Konva.Context.prototype
	         * @param {Object} [bounds]
	         * @param {Number} [bounds.x]
	         * @param {Number} [bounds.y]
	         * @param {Number} [bounds.width]
	         * @param {Number} [bounds.height]
	         */
	        clear: function(bounds) {
	            var canvas = this.getCanvas();

	            if (bounds) {
	                this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
	            }
	            else {
	                this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
	            }
	        },
	        _applyLineCap: function(shape) {
	            var lineCap = shape.getLineCap();
	            if(lineCap) {
	                this.setAttr('lineCap', lineCap);
	            }
	        },
	        _applyOpacity: function(shape) {
	            var absOpacity = shape.getAbsoluteOpacity();
	            if(absOpacity !== 1) {
	                this.setAttr('globalAlpha', absOpacity);
	            }
	        },
	        _applyLineJoin: function(shape) {
	            var lineJoin = shape.getLineJoin();
	            if(lineJoin) {
	                this.setAttr('lineJoin', lineJoin);
	            }
	        },
	        setAttr: function(attr, val) {
	            this._context[attr] = val;
	        },

	        // context pass through methods
	        arc: function() {
	            var a = arguments;
	            this._context.arc(a[0], a[1], a[2], a[3], a[4], a[5]);
	        },
	        beginPath: function() {
	            this._context.beginPath();
	        },
	        bezierCurveTo: function() {
	            var a = arguments;
	            this._context.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
	        },
	        clearRect: function() {
	            var a = arguments;
	            this._context.clearRect(a[0], a[1], a[2], a[3]);
	        },
	        clip: function() {
	            this._context.clip();
	        },
	        closePath: function() {
	            this._context.closePath();
	        },
	        createImageData: function() {
	            var a = arguments;
	            if(a.length === 2) {
	                return this._context.createImageData(a[0], a[1]);
	            }
	            else if(a.length === 1) {
	                return this._context.createImageData(a[0]);
	            }
	        },
	        createLinearGradient: function() {
	            var a = arguments;
	            return this._context.createLinearGradient(a[0], a[1], a[2], a[3]);
	        },
	        createPattern: function() {
	            var a = arguments;
	            return this._context.createPattern(a[0], a[1]);
	        },
	        createRadialGradient: function() {
	            var a = arguments;
	            return this._context.createRadialGradient(a[0], a[1], a[2], a[3], a[4], a[5]);
	        },
	        drawImage: function() {
	            var a = arguments,
	                _context = this._context;

	            if(a.length === 3) {
	                _context.drawImage(a[0], a[1], a[2]);
	            }
	            else if(a.length === 5) {
	                _context.drawImage(a[0], a[1], a[2], a[3], a[4]);
	            }
	            else if(a.length === 9) {
	                _context.drawImage(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
	            }
	        },
	        isPointInPath: function(x, y) {
	            return this._context.isPointInPath(x, y);
	        },
	        fill: function() {
	            this._context.fill();
	        },
	        fillRect: function(x, y, width, height) {
	            this._context.fillRect(x, y, width, height);
	        },
	        strokeRect: function(x, y, width, height) {
	            this._context.strokeRect(x, y, width, height);
	        },
	        fillText: function() {
	            var a = arguments;
	            this._context.fillText(a[0], a[1], a[2]);
	        },
	        measureText: function(text) {
	            return this._context.measureText(text);
	        },
	        getImageData: function() {
	            var a = arguments;
	            return this._context.getImageData(a[0], a[1], a[2], a[3]);
	        },
	        lineTo: function() {
	            var a = arguments;
	            this._context.lineTo(a[0], a[1]);
	        },
	        moveTo: function() {
	            var a = arguments;
	            this._context.moveTo(a[0], a[1]);
	        },
	        rect: function() {
	            var a = arguments;
	            this._context.rect(a[0], a[1], a[2], a[3]);
	        },
	        putImageData: function() {
	            var a = arguments;
	            this._context.putImageData(a[0], a[1], a[2]);
	        },
	        quadraticCurveTo: function() {
	            var a = arguments;
	            this._context.quadraticCurveTo(a[0], a[1], a[2], a[3]);
	        },
	        restore: function() {
	            this._context.restore();
	        },
	        rotate: function() {
	            var a = arguments;
	            this._context.rotate(a[0]);
	        },
	        save: function() {
	            this._context.save();
	        },
	        scale: function() {
	            var a = arguments;
	            this._context.scale(a[0], a[1]);
	        },
	        setLineDash: function() {
	            var a = arguments,
	                _context = this._context;

	            // works for Chrome and IE11
	            if(this._context.setLineDash) {
	                _context.setLineDash(a[0]);
	            }
	            // verified that this works in firefox
	            else if('mozDash' in _context) {
	                _context.mozDash = a[0];
	            }
	            // does not currently work for Safari
	            else if('webkitLineDash' in _context) {
	                _context.webkitLineDash = a[0];
	            }

	            // no support for IE9 and IE10
	        },
	        getLineDash: function() {
	            return this._context.getLineDash();
	        },
	        setTransform: function() {
	            var a = arguments;
	            this._context.setTransform(a[0], a[1], a[2], a[3], a[4], a[5]);
	        },
	        stroke: function() {
	            this._context.stroke();
	        },
	        strokeText: function() {
	            var a = arguments;
	            this._context.strokeText(a[0], a[1], a[2]);
	        },
	        transform: function() {
	            var a = arguments;
	            this._context.transform(a[0], a[1], a[2], a[3], a[4], a[5]);
	        },
	        translate: function() {
	            var a = arguments;
	            this._context.translate(a[0], a[1]);
	        },
	        _enableTrace: function() {
	            var that = this,
	                len = CONTEXT_METHODS.length,
	                _simplifyArray = Konva.Util._simplifyArray,
	                origSetter = this.setAttr,
	                n, args;

	            // to prevent creating scope function at each loop
	            var func = function(methodName) {
	                    var origMethod = that[methodName],
	                        ret;

	                    that[methodName] = function() {
	                        args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
	                        ret = origMethod.apply(that, arguments);

	                        that._trace({
	                            method: methodName,
	                            args: args
	                        });

	                        return ret;
	                    };
	            };
	            // methods
	            for (n = 0; n < len; n++) {
	                func(CONTEXT_METHODS[n]);
	            }

	            // attrs
	            that.setAttr = function() {
	                origSetter.apply(that, arguments);
	                that._trace({
	                    property: arguments[0],
	                    val: arguments[1]
	                });
	            };
	        }
	    };

	    CONTEXT_PROPERTIES.forEach(function(prop) {
	        Object.defineProperty(Konva.Context.prototype, prop, {
	            get: function () {
	                return this._context[prop];
	            },
	            set: function (val) {
	                this._context[prop] = val;
	            }
	        });
	    });

	    Konva.SceneContext = function(canvas) {
	        Konva.Context.call(this, canvas);
	    };

	    Konva.SceneContext.prototype = {
	        _fillColor: function(shape) {
	            var fill = shape.fill();

	            this.setAttr('fillStyle', fill);
	            shape._fillFunc(this);
	        },
	        _fillPattern: function(shape) {
	            var fillPatternX = shape.getFillPatternX(),
	                fillPatternY = shape.getFillPatternY(),
	                fillPatternScale = shape.getFillPatternScale(),
	                fillPatternRotation = Konva.getAngle(shape.getFillPatternRotation()),
	                fillPatternOffset = shape.getFillPatternOffset();

	            if(fillPatternX || fillPatternY) {
	                this.translate(fillPatternX || 0, fillPatternY || 0);
	            }
	            if(fillPatternRotation) {
	                this.rotate(fillPatternRotation);
	            }
	            if(fillPatternScale) {
	                this.scale(fillPatternScale.x, fillPatternScale.y);
	            }
	            if(fillPatternOffset) {
	                this.translate(-1 * fillPatternOffset.x, -1 * fillPatternOffset.y);
	            }

	            this.setAttr('fillStyle', this.createPattern(shape.getFillPatternImage(), shape.getFillPatternRepeat() || 'repeat'));
	            this.fill();
	        },
	        _fillLinearGradient: function(shape) {
	            var start = shape.getFillLinearGradientStartPoint(),
	                end = shape.getFillLinearGradientEndPoint(),
	                colorStops = shape.getFillLinearGradientColorStops(),
	                grd = this.createLinearGradient(start.x, start.y, end.x, end.y);

	            if (colorStops) {
	                // build color stops
	                for(var n = 0; n < colorStops.length; n += 2) {
	                    grd.addColorStop(colorStops[n], colorStops[n + 1]);
	                }
	                this.setAttr('fillStyle', grd);
	                shape._fillFunc(this);
	            }
	        },
	        _fillRadialGradient: function(shape) {
	            var start = shape.getFillRadialGradientStartPoint(),
	                end = shape.getFillRadialGradientEndPoint(),
	                startRadius = shape.getFillRadialGradientStartRadius(),
	                endRadius = shape.getFillRadialGradientEndRadius(),
	                colorStops = shape.getFillRadialGradientColorStops(),
	                grd = this.createRadialGradient(start.x, start.y, startRadius, end.x, end.y, endRadius);

	            // build color stops
	            for(var n = 0; n < colorStops.length; n += 2) {
	                grd.addColorStop(colorStops[n], colorStops[n + 1]);
	            }
	            this.setAttr('fillStyle', grd);
	            this.fill();
	        },
	        _fill: function(shape) {
	            var hasColor = shape.fill(),
	                hasPattern = shape.getFillPatternImage(),
	                hasLinearGradient = shape.getFillLinearGradientColorStops(),
	                hasRadialGradient = shape.getFillRadialGradientColorStops(),
	                fillPriority = shape.getFillPriority();

	            // priority fills
	            if(hasColor && fillPriority === 'color') {
	                this._fillColor(shape);
	            }
	            else if(hasPattern && fillPriority === 'pattern') {
	                this._fillPattern(shape);
	            }
	            else if(hasLinearGradient && fillPriority === 'linear-gradient') {
	                this._fillLinearGradient(shape);
	            }
	            else if(hasRadialGradient && fillPriority === 'radial-gradient') {
	                this._fillRadialGradient(shape);
	            }
	            // now just try and fill with whatever is available
	            else if(hasColor) {
	                this._fillColor(shape);
	            }
	            else if(hasPattern) {
	                this._fillPattern(shape);
	            }
	            else if(hasLinearGradient) {
	                this._fillLinearGradient(shape);
	            }
	            else if(hasRadialGradient) {
	                this._fillRadialGradient(shape);
	            }
	        },
	        _stroke: function(shape) {
	            var dash = shape.dash(),
	                // ignore strokeScaleEnabled for Text
	                strokeScaleEnabled = (shape.getStrokeScaleEnabled() || (shape instanceof Konva.Text));

	            if(shape.hasStroke()) {
	                if (!strokeScaleEnabled) {
	                    this.save();
	                    this.setTransform(1, 0, 0, 1, 0, 0);
	                }

	                this._applyLineCap(shape);
	                if(dash && shape.dashEnabled()) {
	                    this.setLineDash(dash);
	                }

	                this.setAttr('lineWidth', shape.strokeWidth());
	                this.setAttr('strokeStyle', shape.stroke());

	                if (!shape.getShadowForStrokeEnabled()) {
	                    this.setAttr('shadowColor', 'rgba(0,0,0,0)');
	                }
	                shape._strokeFunc(this);

	                if (!strokeScaleEnabled) {
	                    this.restore();
	                }
	            }
	        },
	        _applyShadow: function(shape) {
	            var util = Konva.Util,
	                color = util.get(shape.getShadowRGBA(), 'black'),
	                blur = util.get(shape.getShadowBlur(), 5),
	                offset = util.get(shape.getShadowOffset(), {
	                    x: 0,
	                    y: 0
	                }),
	                m = shape.getAbsoluteTransform().m,
	                scaleX = m[0],
	                scaleY = m[3];

	            this.setAttr('shadowColor', color);
	            this.setAttr('shadowBlur', blur);
	            this.setAttr('shadowOffsetX', offset.x * scaleX);
	            this.setAttr('shadowOffsetY', offset.y * scaleY);
	        }
	    };
	    Konva.Util.extend(Konva.SceneContext, Konva.Context);

	    Konva.HitContext = function(canvas) {
	        Konva.Context.call(this, canvas);
	    };

	    Konva.HitContext.prototype = {
	        _fill: function(shape) {
	            this.save();
	            this.setAttr('fillStyle', shape.colorKey);
	            shape._fillFuncHit(this);
	            this.restore();
	        },
	        _stroke: function(shape) {
	            if(shape.hasStroke() && shape.strokeHitEnabled()) {
	                // ignore strokeScaleEnabled for Text
	                var strokeScaleEnabled = (shape.getStrokeScaleEnabled() || (shape instanceof Konva.Text));
	                if (!strokeScaleEnabled) {
	                    this.save();
	                    this.setTransform(1, 0, 0, 1, 0, 0);
	                }
	                this._applyLineCap(shape);
	                this.setAttr('lineWidth', shape.strokeWidth());
	                this.setAttr('strokeStyle', shape.colorKey);
	                shape._strokeFuncHit(this);
	                if (!strokeScaleEnabled) {
	                    this.restore();
	                }
	            }
	        }
	    };
	    Konva.Util.extend(Konva.HitContext, Konva.Context);
	})();

	(function() {
	    'use strict';
	    // CONSTANTS
	    var GET = 'get',
	        SET = 'set';

	    Konva.Factory = {
	        addGetterSetter: function(constructor, attr, def, validator, after) {
	            this.addGetter(constructor, attr, def);
	            this.addSetter(constructor, attr, validator, after);
	            this.addOverloadedGetterSetter(constructor, attr);
	        },
	        addGetter: function(constructor, attr, def) {
	            var method = GET + Konva.Util._capitalize(attr);

	            constructor.prototype[method] = function() {
	                var val = this.attrs[attr];
	                return val === undefined ? def : val;
	            };
	        },
	        addSetter: function(constructor, attr, validator, after) {
	            var method = SET + Konva.Util._capitalize(attr);

	            constructor.prototype[method] = function(val) {
	                if (validator) {
	                    val = validator.call(this, val);
	                }

	                this._setAttr(attr, val);

	                if (after) {
	                    after.call(this);
	                }

	                return this;
	            };
	        },
	        addComponentsGetterSetter: function(constructor, attr, components, validator, after) {
	            var len = components.length,
	                capitalize = Konva.Util._capitalize,
	                getter = GET + capitalize(attr),
	                setter = SET + capitalize(attr),
	                n, component;

	            // getter
	            constructor.prototype[getter] = function() {
	                var ret = {};

	                for (n = 0; n < len; n++) {
	                    component = components[n];
	                    ret[component] = this.getAttr(attr + capitalize(component));
	                }

	                return ret;
	            };

	            // setter
	            constructor.prototype[setter] = function(val) {
	                var oldVal = this.attrs[attr],
	                    key;

	                if (validator) {
	                    val = validator.call(this, val);
	                }

	                for (key in val) {
	                    if (!val.hasOwnProperty(key)) {
	                        continue;
	                    }
	                    this._setAttr(attr + capitalize(key), val[key]);
	                }

	                this._fireChangeEvent(attr, oldVal, val);

	                if (after) {
	                    after.call(this);
	                }

	                return this;
	            };

	            this.addOverloadedGetterSetter(constructor, attr);
	        },
	        addOverloadedGetterSetter: function(constructor, attr) {
	            var capitalizedAttr = Konva.Util._capitalize(attr),
	                setter = SET + capitalizedAttr,
	                getter = GET + capitalizedAttr;

	            constructor.prototype[attr] = function() {
	                // setting
	                if (arguments.length) {
	                    this[setter](arguments[0]);
	                    return this;
	                }
	                // getting
	                return this[getter]();
	            };
	        },
	        addDeprecatedGetterSetter: function(constructor, attr, def, validator) {
	            var method = GET + Konva.Util._capitalize(attr);
	            var message = attr + ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
	            constructor.prototype[method] = function() {
	                Konva.Util.error(message);
	                var val = this.attrs[attr];
	                return val === undefined ? def : val;
	            };
	            this.addSetter(constructor, attr, validator, function() {
	              Konva.Util.error(message);
	            });
	            this.addOverloadedGetterSetter(constructor, attr);
	        },
	        backCompat: function(constructor, methods) {
	            Konva.Util.each(methods, function(oldMethodName, newMethodName) {
	                var method = constructor.prototype[newMethodName];
	                constructor.prototype[oldMethodName] = function(){
	                    method.apply(this, arguments);
	                    Konva.Util.error(oldMethodName + ' method is deprecated and will be removed soon. Use ' + newMethodName + ' instead');
	                };
	            });
	        },
	        afterSetFilter: function() {
	            this._filterUpToDate = false;
	        }
	    };

	    Konva.Validators = {
	        /**
	         * @return {number}
	         */
	        RGBComponent: function(val) {
	            if (val > 255) {
	                return 255;
	            } else if (val < 0) {
	                return 0;
	            }
	            return Math.round(val);
	        },
	        alphaComponent: function(val) {
	            if (val > 1) {
	                return 1;
	            }
	            // chrome does not honor alpha values of 0
	            else if (val < 0.0001) {
	                return 0.0001;
	            }

	            return val;
	        }
	    };
	})();

	(function(Konva) {
	    'use strict';
	    // CONSTANTS
	    var ABSOLUTE_OPACITY = 'absoluteOpacity',
	        ABSOLUTE_TRANSFORM = 'absoluteTransform',
	        CHANGE = 'Change',
	        CHILDREN = 'children',
	        DOT = '.',
	        EMPTY_STRING = '',
	        GET = 'get',
	        ID = 'id',
	        KONVA = 'konva',
	        LISTENING = 'listening',
	        MOUSEENTER = 'mouseenter',
	        MOUSELEAVE = 'mouseleave',
	        NAME = 'name',
	        SET = 'set',
	        SHAPE = 'Shape',
	        SPACE = ' ',
	        STAGE = 'stage',
	        TRANSFORM = 'transform',
	        UPPER_STAGE = 'Stage',
	        VISIBLE = 'visible',
	        CLONE_BLACK_LIST = ['id'],

	        TRANSFORM_CHANGE_STR = [
	            'xChange.konva',
	            'yChange.konva',
	            'scaleXChange.konva',
	            'scaleYChange.konva',
	            'skewXChange.konva',
	            'skewYChange.konva',
	            'rotationChange.konva',
	            'offsetXChange.konva',
	            'offsetYChange.konva',
	            'transformsEnabledChange.konva'
	        ].join(SPACE);

	    /**
	     * Node constructor. Nodes are entities that can be transformed, layered,
	     * and have bound events. The stage, layers, groups, and shapes all extend Node.
	     * @constructor
	     * @memberof Konva
	     * @abstract
	     * @param {Object} config
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     */
	    Konva.Node = function(config) {
	        this._init(config);
	    };

	    Konva.Util.addMethods(Konva.Node, {
	        _init: function(config) {
	            var that = this;
	            this._id = Konva.idCounter++;
	            this.eventListeners = {};
	            this.attrs = {};
	            this._cache = {};
	            this._filterUpToDate = false;
	            this.setAttrs(config);

	            // event bindings for cache handling
	            this.on(TRANSFORM_CHANGE_STR, function() {
	                this._clearCache(TRANSFORM);
	                that._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	            });
	            this.on('visibleChange.konva', function() {
	                that._clearSelfAndDescendantCache(VISIBLE);
	            });
	            this.on('listeningChange.konva', function() {
	                that._clearSelfAndDescendantCache(LISTENING);
	            });
	            this.on('opacityChange.konva', function() {
	                that._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
	            });
	        },
	        _clearCache: function(attr){
	            if (attr) {
	                delete this._cache[attr];
	            }
	            else {
	                this._cache = {};
	            }
	        },
	        _getCache: function(attr, privateGetter){
	            var cache = this._cache[attr];

	            // if not cached, we need to set it using the private getter method.
	            if (cache === undefined) {
	                this._cache[attr] = privateGetter.call(this);
	            }

	            return this._cache[attr];
	        },
	        /*
	         * when the logic for a cached result depends on ancestor propagation, use this
	         * method to clear self and children cache
	         */
	        _clearSelfAndDescendantCache: function(attr) {
	            this._clearCache(attr);

	            if (this.children) {
	                this.getChildren().each(function(node) {
	                    node._clearSelfAndDescendantCache(attr);
	                });
	            }
	        },
	        /**
	        * clear cached canvas
	        * @method
	        * @memberof Konva.Node.prototype
	        * @returns {Konva.Node}
	        * @example
	        * node.clearCache();
	        */
	        clearCache: function() {
	            delete this._cache.canvas;
	            this._filterUpToDate = false;
	            return this;
	        },
	        /**
	        *  cache node to improve drawing performance, apply filters, or create more accurate
	        *  hit regions. For all basic shapes size of cache canvas will be automatically detected.
	        *  If you need to cache your custom `Konva.Shape` instance you have to pass shape's bounding box
	        *  properties. Look at [link to demo page](link to demo page) for more information.
	        * @method
	        * @memberof Konva.Node.prototype
	        * @param {Object} [config]
	        * @param {Number} [config.x]
	        * @param {Number} [config.y]
	        * @param {Number} [config.width]
	        * @param {Number} [config.height]
	        * @param {Number} [config.offset]  increase canvas size by `offset` pixel in all directions.
	        * @param {Boolean} [config.drawBorder] when set to true, a red border will be drawn around the cached
	        *  region for debugging purposes
	        * @returns {Konva.Node}
	        * @example
	        * // cache a shape with the x,y position of the bounding box at the center and
	        * // the width and height of the bounding box equal to the width and height of
	        * // the shape obtained from shape.width() and shape.height()
	        * image.cache();
	        *
	        * // cache a node and define the bounding box position and size
	        * node.cache({
	        *   x: -30,
	        *   y: -30,
	        *   width: 100,
	        *   height: 200
	        * });
	        *
	        * // cache a node and draw a red border around the bounding box
	        * // for debugging purposes
	        * node.cache({
	        *   x: -30,
	        *   y: -30,
	        *   width: 100,
	        *   height: 200,
	        *   offset : 10,
	        *   drawBorder: true
	        * });
	        */
	        cache: function(config) {
	            var conf = config || {},
	                rect = this.getClientRect(true),
	                width = conf.width || rect.width,
	                height = conf.height || rect.height,
	                x = conf.x || rect.x,
	                y = conf.y || rect.y,
	                offset = conf.offset || 0,
	                drawBorder = conf.drawBorder || false;

	            if (!width || !height) {
	                throw new Error('Width or height of caching configuration equals 0.');
	            }

	            width += offset * 2;
	            height += offset * 2;

	            x -= offset;
	            y -= offset;


	            var cachedSceneCanvas = new Konva.SceneCanvas({
	                width: width,
	                height: height
	            }),
	            cachedFilterCanvas = new Konva.SceneCanvas({
	                width: width,
	                height: height
	            }),
	            cachedHitCanvas = new Konva.HitCanvas({
	                pixelRatio: 1,
	                width: width,
	                height: height
	            }),
	            sceneContext = cachedSceneCanvas.getContext(),
	            hitContext = cachedHitCanvas.getContext();

	            cachedHitCanvas.isCache = true;

	            this.clearCache();

	            sceneContext.save();
	            hitContext.save();

	            sceneContext.translate(-x, -y);
	            hitContext.translate(-x, -y);

	            this.drawScene(cachedSceneCanvas, this, true);
	            this.drawHit(cachedHitCanvas, this, true);

	            sceneContext.restore();
	            hitContext.restore();

	            // this will draw a red border around the cached box for
	            // debugging purposes
	            if (drawBorder) {
	                sceneContext.save();
	                sceneContext.beginPath();
	                sceneContext.rect(0, 0, width, height);
	                sceneContext.closePath();
	                sceneContext.setAttr('strokeStyle', 'red');
	                sceneContext.setAttr('lineWidth', 5);
	                sceneContext.stroke();
	                sceneContext.restore();
	            }

	            this._cache.canvas = {
	                scene: cachedSceneCanvas,
	                filter: cachedFilterCanvas,
	                hit: cachedHitCanvas,
	                x: x,
	                y: y
	            };

	            return this;
	        },
	        /**
	         * Return client rectangle {x, y, width, height} of node. This rectangle also include all styling (strokes, shadows, etc).
	         * The rectangle position is relative to parent container.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Boolean} [skipTransform] flag should we skip transformation to rectangle
	         * @returns {Object} rect with {x, y, width, height} properties
	         * @example
	         * var rect = new Konva.Rect({
	         *      width : 100,
	         *      height : 100,
	         *      x : 50,
	         *      y : 50,
	         *      strokeWidth : 4,
	         *      stroke : 'black',
	         *      offsetX : 50,
	         *      scaleY : 2
	         * });
	         *
	         * // get client rect without think off transformations (position, rotation, scale, offset, etc)
	         * rect.getClientRect(true);
	         * // returns {
	         * //     x : -2,   // two pixels for stroke / 2
	         * //     y : -2,
	         * //     width : 104, // increased by 4 for stroke
	         * //     height : 104
	         * //}
	         *
	         * // get client rect with transformation applied
	         * rect.getClientRect();
	         * // returns Object {x: -2, y: 46, width: 104, height: 208}
	         */
	        getClientRect: function() {
	            // abstract method
	            // redefine in Container and Shape
	            throw new Error('abstract "getClientRect" method call');
	        },
	        _transformedRect: function(rect) {
	            var points = [
	                {x: rect.x, y: rect.y},
	                {x: rect.x + rect.width, y: rect.y},
	                {x: rect.x + rect.width, y: rect.y + rect.height},
	                {x: rect.x, y: rect.y + rect.height}
	            ];
	            var minX, minY, maxX, maxY;
	            var trans = this.getTransform();
	            points.forEach(function(point) {
	                var transformed = trans.point(point);
	                if (minX === undefined) {
	                    minX = maxX = transformed.x;
	                    minY = maxY = transformed.y;
	                }
	                minX = Math.min(minX, transformed.x);
	                minY = Math.min(minY, transformed.y);
	                maxX = Math.max(maxX, transformed.x);
	                maxY = Math.max(maxY, transformed.y);
	            });
	            return {
	                x: minX,
	                y: minY,
	                width: maxX - minX,
	                height: maxY - minY
	            };
	        },
	        _drawCachedSceneCanvas: function(context) {
	            context.save();
	            context._applyOpacity(this);
	            context.translate(
	                this._cache.canvas.x,
	                this._cache.canvas.y
	            );

	            var cacheCanvas = this._getCachedSceneCanvas();
	            var ratio = cacheCanvas.pixelRatio;

	            context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
	            context.restore();
	        },
	        _drawCachedHitCanvas: function(context) {
	            var cachedCanvas = this._cache.canvas,
	                hitCanvas = cachedCanvas.hit;
	            context.save();
	            context.translate(
	                this._cache.canvas.x,
	                this._cache.canvas.y
	            );
	            context.drawImage(hitCanvas._canvas, 0, 0);
	            context.restore();
	        },
	        _getCachedSceneCanvas: function() {
	            var filters = this.filters(),
	                cachedCanvas = this._cache.canvas,
	                sceneCanvas = cachedCanvas.scene,
	                filterCanvas = cachedCanvas.filter,
	                filterContext = filterCanvas.getContext(),
	                len, imageData, n, filter;

	            if (filters) {
	                if (!this._filterUpToDate) {
	                    var ratio = sceneCanvas.pixelRatio;

	                    try {
	                        len = filters.length;
	                        filterContext.clear();

	                        // copy cached canvas onto filter context
	                        filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
	                        imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());

	                        // apply filters to filter context
	                        for (n = 0; n < len; n++) {
	                            filter = filters[n];
	                            filter.call(this, imageData);
	                            filterContext.putImageData(imageData, 0, 0);
	                        }
	                    }
	                    catch(e) {
	                        Konva.Util.warn('Unable to apply filter. ' + e.message);
	                    }

	                    this._filterUpToDate = true;
	                }

	                return filterCanvas;
	            }
	            return sceneCanvas;
	        },
	        /**
	         * bind events to the node. KonvaJS supports mouseover, mousemove,
	         *  mouseout, mouseenter, mouseleave, mousedown, mouseup, wheel, click, dblclick, touchstart, touchmove,
	         *  touchend, tap, dbltap, dragstart, dragmove, and dragend events. The Konva Stage supports
	         *  contentMouseover, contentMousemove, contentMouseout, contentMousedown, contentMouseup, contentWheel
	         *  contentClick, contentDblclick, contentTouchstart, contentTouchmove, contentTouchend, contentTap,
	         *  and contentDblTap.  Pass in a string of events delimmited by a space to bind multiple events at once
	         *  such as 'mousedown mouseup mousemove'. Include a namespace to bind an
	         *  event by name such as 'click.foobar'.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} evtStr e.g. 'click', 'mousedown touchstart', 'mousedown.foo touchstart.foo'
	         * @param {Function} handler The handler function is passed an event object
	         * @returns {Konva.Node}
	         * @example
	         * // add click listener
	         * node.on('click', function() {
	         *   console.log('you clicked me!');
	         * });
	         *
	         * // get the target node
	         * node.on('click', function(evt) {
	         *   console.log(evt.target);
	         * });
	         *
	         * // stop event propagation
	         * node.on('click', function(evt) {
	         *   evt.cancelBubble = true;
	         * });
	         *
	         * // bind multiple listeners
	         * node.on('click touchstart', function() {
	         *   console.log('you clicked/touched me!');
	         * });
	         *
	         * // namespace listener
	         * node.on('click.foo', function() {
	         *   console.log('you clicked/touched me!');
	         * });
	         *
	         * // get the event type
	         * node.on('click tap', function(evt) {
	         *   var eventType = evt.type;
	         * });
	         *
	         * // get native event object
	         * node.on('click tap', function(evt) {
	         *   var nativeEvent = evt.evt;
	         * });
	         *
	         * // for change events, get the old and new val
	         * node.on('xChange', function(evt) {
	         *   var oldVal = evt.oldVal;
	         *   var newVal = evt.newVal;
	         * });
	         *
	         * // get event targets
	         * // with event delegations
	         * layer.on('click', 'Group', function(evt) {
	         *   var shape = evt.target;
	         *   var group = evtn.currentTarger;
	         * });
	         */
	        on: function(evtStr, handler) {
	            if (arguments.length === 3) {
	                return this._delegate.apply(this, arguments);
	            }
	            var events = evtStr.split(SPACE),
	                len = events.length,
	                n, event, parts, baseEvent, name;

	             /*
	             * loop through types and attach event listeners to
	             * each one.  eg. 'click mouseover.namespace mouseout'
	             * will create three event bindings
	             */
	            for(n = 0; n < len; n++) {
	                event = events[n];
	                parts = event.split(DOT);
	                baseEvent = parts[0];
	                name = parts[1] || EMPTY_STRING;

	                // create events array if it doesn't exist
	                if(!this.eventListeners[baseEvent]) {
	                    this.eventListeners[baseEvent] = [];
	                }

	                this.eventListeners[baseEvent].push({
	                    name: name,
	                    handler: handler
	                });
	            }

	            return this;
	        },
	        /**
	         * remove event bindings from the node. Pass in a string of
	         *  event types delimmited by a space to remove multiple event
	         *  bindings at once such as 'mousedown mouseup mousemove'.
	         *  include a namespace to remove an event binding by name
	         *  such as 'click.foobar'. If you only give a name like '.foobar',
	         *  all events in that namespace will be removed.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} evtStr e.g. 'click', 'mousedown touchstart', '.foobar'
	         * @returns {Konva.Node}
	         * @example
	         * // remove listener
	         * node.off('click');
	         *
	         * // remove multiple listeners
	         * node.off('click touchstart');
	         *
	         * // remove listener by name
	         * node.off('click.foo');
	         */
	        off: function(evtStr) {
	            var events = (evtStr || '').split(SPACE),
	                len = events.length,
	                n, t, event, parts, baseEvent, name;

	            if (!evtStr) {
	                // remove all events
	                for(t in this.eventListeners) {
	                    this._off(t);
	                }
	            }
	            for(n = 0; n < len; n++) {
	                event = events[n];
	                parts = event.split(DOT);
	                baseEvent = parts[0];
	                name = parts[1];

	                if(baseEvent) {
	                    if(this.eventListeners[baseEvent]) {
	                        this._off(baseEvent, name);
	                    }
	                }
	                else {
	                    for(t in this.eventListeners) {
	                        this._off(t, name);
	                    }
	                }
	            }
	            return this;
	        },
	        // some event aliases for third party integration like HammerJS
	        dispatchEvent: function(evt) {
	            var e = {
	              target: this,
	              type: evt.type,
	              evt: evt
	            };
	            this.fire(evt.type, e);
	            return this;
	        },
	        addEventListener: function(type, handler) {
	            // we have to pass native event to handler
	            this.on(type, function(evt){
	                handler.call(this, evt.evt);
	            });
	            return this;
	        },
	        removeEventListener: function(type) {
	            this.off(type);
	            return this;
	        },
	        // like node.on
	        _delegate: function(event, selector, handler) {
	            var stopNode = this;
	            this.on(event, function(evt) {
	                var targets = evt.target.findAncestors(selector, true, stopNode);
	                for(var i = 0; i < targets.length; i++) {
	                    evt = Konva.Util.cloneObject(evt);
	                    evt.currentTarget = targets[i];
	                    handler.call(targets[i], evt);
	                }
	            });
	        },
	        /**
	         * remove self from parent, but don't destroy
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         * @example
	         * node.remove();
	         */
	        remove: function() {
	            var parent = this.getParent();

	            if(parent && parent.children) {
	                parent.children.splice(this.index, 1);
	                parent._setChildrenIndices();
	                delete this.parent;
	            }

	            // every cached attr that is calculated via node tree
	            // traversal must be cleared when removing a node
	            this._clearSelfAndDescendantCache(STAGE);
	            this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	            this._clearSelfAndDescendantCache(VISIBLE);
	            this._clearSelfAndDescendantCache(LISTENING);
	            this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

	            return this;
	        },
	        /**
	         * remove and destroy self
	         * @method
	         * @memberof Konva.Node.prototype
	         * @example
	         * node.destroy();
	         */
	        destroy: function() {
	            // remove from ids and names hashes
	            Konva._removeId(this.getId());
	            Konva._removeName(this.getName(), this._id);

	            this.remove();
	            return this;
	        },
	        /**
	         * get attr
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} attr
	         * @returns {Integer|String|Object|Array}
	         * @example
	         * var x = node.getAttr('x');
	         */
	        getAttr: function(attr) {
	            var method = GET + Konva.Util._capitalize(attr);
	            if(Konva.Util._isFunction(this[method])) {
	                return this[method]();
	            }
	            // otherwise get directly
	            return this.attrs[attr];
	        },
	        /**
	        * get ancestors
	        * @method
	        * @memberof Konva.Node.prototype
	        * @returns {Konva.Collection}
	        * @example
	        * shape.getAncestors().each(function(node) {
	        *   console.log(node.getId());
	        * })
	        */
	        getAncestors: function() {
	            var parent = this.getParent(),
	                ancestors = new Konva.Collection();

	            while (parent) {
	                ancestors.push(parent);
	                parent = parent.getParent();
	            }

	            return ancestors;
	        },
	        /**
	         * get attrs object literal
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Object}
	         */
	        getAttrs: function() {
	            return this.attrs || {};
	        },
	        /**
	         * set multiple attrs at once using an object literal
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} config object containing key value pairs
	         * @returns {Konva.Node}
	         * @example
	         * node.setAttrs({
	         *   x: 5,
	         *   fill: 'red'
	         * });
	         */
	        setAttrs: function(config) {
	            var key, method;

	            if(!config) {
	                return this;
	            }
	            for(key in config) {
	                if (key === CHILDREN) {
	                    continue;
	                }
	                method = SET + Konva.Util._capitalize(key);
	                // use setter if available
	                if(Konva.Util._isFunction(this[method])) {
	                    this[method](config[key]);
	                }
	                // otherwise set directly
	                else {
	                    this._setAttr(key, config[key]);
	                }
	            }
	            return this;
	        },
	        /**
	         * determine if node is listening for events by taking into account ancestors.
	         *
	         * Parent    | Self      | isListening
	         * listening | listening |
	         * ----------+-----------+------------
	         * T         | T         | T
	         * T         | F         | F
	         * F         | T         | T
	         * F         | F         | F
	         * ----------+-----------+------------
	         * T         | I         | T
	         * F         | I         | F
	         * I         | I         | T
	         *
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	        isListening: function() {
	            return this._getCache(LISTENING, this._isListening);
	        },
	        _isListening: function() {
	            var listening = this.getListening(),
	                parent = this.getParent();

	            // the following conditions are a simplification of the truth table above.
	            // please modify carefully
	            if (listening === 'inherit') {
	                if (parent) {
	                    return parent.isListening();
	                }
	                else {
	                    return true;
	                }
	            }
	            else {
	                return listening;
	            }
	        },
	        /**
	         * determine if node is visible by taking into account ancestors.
	         *
	         * Parent    | Self      | isVisible
	         * visible   | visible   |
	         * ----------+-----------+------------
	         * T         | T         | T
	         * T         | F         | F
	         * F         | T         | T
	         * F         | F         | F
	         * ----------+-----------+------------
	         * T         | I         | T
	         * F         | I         | F
	         * I         | I         | T

	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	        isVisible: function() {
	            return this._getCache(VISIBLE, this._isVisible);
	        },
	        _isVisible: function() {
	            var visible = this.getVisible(),
	                parent = this.getParent();

	            // the following conditions are a simplification of the truth table above.
	            // please modify carefully
	            if (visible === 'inherit') {
	                if (parent) {
	                    return parent.isVisible();
	                }
	                else {
	                    return true;
	                }
	            }
	            else {
	                return visible;
	            }
	        },
	        /**
	         * determine if listening is enabled by taking into account descendants.  If self or any children
	         * have _isListeningEnabled set to true, then self also has listening enabled.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	        shouldDrawHit: function(canvas) {
	            var layer = this.getLayer();
	            return (canvas && canvas.isCache) || (layer && layer.hitGraphEnabled())
	                && this.isListening() && this.isVisible();
	        },
	        /**
	         * show node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         */
	        show: function() {
	            this.setVisible(true);
	            return this;
	        },
	        /**
	         * hide node.  Hidden nodes are no longer detectable
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         */
	        hide: function() {
	            this.setVisible(false);
	            return this;
	        },
	        /**
	         * get zIndex relative to the node's siblings who share the same parent
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Integer}
	         */
	        getZIndex: function() {
	            return this.index || 0;
	        },
	        /**
	         * get absolute z-index which takes into account sibling
	         *  and ancestor indices
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Integer}
	         */
	        getAbsoluteZIndex: function() {
	            var depth = this.getDepth(),
	                that = this,
	                index = 0,
	                nodes, len, n, child;

	            function addChildren(children) {
	                nodes = [];
	                len = children.length;
	                for(n = 0; n < len; n++) {
	                    child = children[n];
	                    index++;

	                    if(child.nodeType !== SHAPE) {
	                        nodes = nodes.concat(child.getChildren().toArray());
	                    }

	                    if(child._id === that._id) {
	                        n = len;
	                    }
	                }

	                if(nodes.length > 0 && nodes[0].getDepth() <= depth) {
	                    addChildren(nodes);
	                }
	            }
	            if(that.nodeType !== UPPER_STAGE) {
	                addChildren(that.getStage().getChildren());
	            }

	            return index;
	        },
	        /**
	         * get node depth in node tree.  Returns an integer.
	         *  e.g. Stage depth will always be 0.  Layers will always be 1.  Groups and Shapes will always
	         *  be >= 2
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Integer}
	         */
	        getDepth: function() {
	            var depth = 0,
	                parent = this.parent;

	            while(parent) {
	                depth++;
	                parent = parent.parent;
	            }
	            return depth;
	        },
	        setPosition: function(pos) {
	            this.setX(pos.x);
	            this.setY(pos.y);
	            return this;
	        },
	        getPosition: function() {
	            return {
	                x: this.getX(),
	                y: this.getY()
	            };
	        },
	        /**
	         * get absolute position relative to the top left corner of the stage container div
	         * or relative to passed node
	         * @method
	         * @param {Object} [top] optional parent node
	         * @memberof Konva.Node.prototype
	         * @returns {Object}
	         */
	        getAbsolutePosition: function(top) {
	            var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(),
	                absoluteTransform = new Konva.Transform(),
	                offset = this.offset();

	            // clone the matrix array
	            absoluteTransform.m = absoluteMatrix.slice();
	            absoluteTransform.translate(offset.x, offset.y);

	            return absoluteTransform.getTranslation();
	        },
	        /**
	         * set absolute position
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} pos
	         * @param {Number} pos.x
	         * @param {Number} pos.y
	         * @returns {Konva.Node}
	         */
	        setAbsolutePosition: function(pos) {
	            var origTrans = this._clearTransform(),
	                it;

	            // don't clear translation
	            this.attrs.x = origTrans.x;
	            this.attrs.y = origTrans.y;
	            delete origTrans.x;
	            delete origTrans.y;

	            // unravel transform
	            it = this.getAbsoluteTransform();

	            it.invert();
	            it.translate(pos.x, pos.y);
	            pos = {
	                x: this.attrs.x + it.getTranslation().x,
	                y: this.attrs.y + it.getTranslation().y
	            };

	            this.setPosition({x: pos.x, y: pos.y});
	            this._setTransform(origTrans);

	            return this;
	        },
	        _setTransform: function(trans) {
	            var key;

	            for(key in trans) {
	                this.attrs[key] = trans[key];
	            }

	            this._clearCache(TRANSFORM);
	            this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	        },
	        _clearTransform: function() {
	            var trans = {
	                x: this.getX(),
	                y: this.getY(),
	                rotation: this.getRotation(),
	                scaleX: this.getScaleX(),
	                scaleY: this.getScaleY(),
	                offsetX: this.getOffsetX(),
	                offsetY: this.getOffsetY(),
	                skewX: this.getSkewX(),
	                skewY: this.getSkewY()
	            };

	            this.attrs.x = 0;
	            this.attrs.y = 0;
	            this.attrs.rotation = 0;
	            this.attrs.scaleX = 1;
	            this.attrs.scaleY = 1;
	            this.attrs.offsetX = 0;
	            this.attrs.offsetY = 0;
	            this.attrs.skewX = 0;
	            this.attrs.skewY = 0;

	            this._clearCache(TRANSFORM);
	            this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);

	            // return original transform
	            return trans;
	        },
	        /**
	         * move node by an amount relative to its current position
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} change
	         * @param {Number} change.x
	         * @param {Number} change.y
	         * @returns {Konva.Node}
	         * @example
	         * // move node in x direction by 1px and y direction by 2px
	         * node.move({
	         *   x: 1,
	         *   y: 2)
	         * });
	         */
	        move: function(change) {
	            var changeX = change.x,
	                changeY = change.y,
	                x = this.getX(),
	                y = this.getY();

	            if(changeX !== undefined) {
	                x += changeX;
	            }

	            if(changeY !== undefined) {
	                y += changeY;
	            }

	            this.setPosition({x: x, y: y});
	            return this;
	        },
	        _eachAncestorReverse: function(func, top) {
	            var family = [],
	                parent = this.getParent(),
	                len, n;

	            // if top node is defined, and this node is top node,
	            // there's no need to build a family tree.  just execute
	            // func with this because it will be the only node
	            if (top && top._id === this._id) {
	                func(this);
	                return true;
	            }

	            family.unshift(this);

	            while(parent && (!top || parent._id !== top._id)) {
	                family.unshift(parent);
	                parent = parent.parent;
	            }

	            len = family.length;
	            for(n = 0; n < len; n++) {
	                func(family[n]);
	            }
	        },
	        /**
	         * rotate node by an amount in degrees relative to its current rotation
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Number} theta
	         * @returns {Konva.Node}
	         */
	        rotate: function(theta) {
	            this.setRotation(this.getRotation() + theta);
	            return this;
	        },
	        /**
	         * move node to the top of its siblings
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	        moveToTop: function() {
	            if (!this.parent) {
	                Konva.Util.warn('Node has no parent. moveToTop function is ignored.');
	                return false;
	            }
	            var index = this.index;
	            this.parent.children.splice(index, 1);
	            this.parent.children.push(this);
	            this.parent._setChildrenIndices();
	            return true;
	        },
	        /**
	         * move node up
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean} flag is moved or not
	         */
	        moveUp: function() {
	            if (!this.parent) {
	                Konva.Util.warn('Node has no parent. moveUp function is ignored.');
	                return false;
	            }
	            var index = this.index,
	                len = this.parent.getChildren().length;
	            if(index < len - 1) {
	                this.parent.children.splice(index, 1);
	                this.parent.children.splice(index + 1, 0, this);
	                this.parent._setChildrenIndices();
	                return true;
	            }
	            return false;
	        },
	        /**
	         * move node down
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	        moveDown: function() {
	            if (!this.parent) {
	                Konva.Util.warn('Node has no parent. moveDown function is ignored.');
	                return false;
	            }
	            var index = this.index;
	            if(index > 0) {
	                this.parent.children.splice(index, 1);
	                this.parent.children.splice(index - 1, 0, this);
	                this.parent._setChildrenIndices();
	                return true;
	            }
	            return false;
	        },
	        /**
	         * move node to the bottom of its siblings
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Boolean}
	         */
	        moveToBottom: function() {
	            if (!this.parent) {
	                Konva.Util.warn('Node has no parent. moveToBottom function is ignored.');
	                return false;
	            }
	            var index = this.index;
	            if(index > 0) {
	                this.parent.children.splice(index, 1);
	                this.parent.children.unshift(this);
	                this.parent._setChildrenIndices();
	                return true;
	            }
	            return false;
	        },
	        /**
	         * set zIndex relative to siblings
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Integer} zIndex
	         * @returns {Konva.Node}
	         */
	        setZIndex: function(zIndex) {
	            if (!this.parent) {
	                Konva.Util.warn('Node has no parent. zIndex parameter is ignored.');
	                return false;
	            }
	            var index = this.index;
	            this.parent.children.splice(index, 1);
	            this.parent.children.splice(zIndex, 0, this);
	            this.parent._setChildrenIndices();
	            return this;
	        },
	        /**
	         * get absolute opacity
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Number}
	         */
	        getAbsoluteOpacity: function() {
	            return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
	        },
	        _getAbsoluteOpacity: function() {
	            var absOpacity = this.getOpacity();
	            if(this.getParent()) {
	                absOpacity *= this.getParent().getAbsoluteOpacity();
	            }
	            return absOpacity;
	        },
	        /**
	         * move node to another container
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Container} newContainer
	         * @returns {Konva.Node}
	         * @example
	         * // move node from current layer into layer2
	         * node.moveTo(layer2);
	         */
	        moveTo: function(newContainer) {
	            // do nothing if new container is already parent
	            if (this.getParent() !== newContainer) {
	                this.remove();
	                newContainer.add(this);
	            }
	            return this;
	        },
	        /**
	         * convert Node into an object for serialization.  Returns an object.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Object}
	         */
	        toObject: function() {
	            var obj = {},
	                attrs = this.getAttrs(),
	                key, val, getter, defaultValue;

	            obj.attrs = {};

	            for(key in attrs) {
	                val = attrs[key];
	                // serialize only attributes that are not function, image, DOM, or objects with methods
	                if (Konva.Util._isFunction(val) || Konva.Util._isElement(val) ||
	                    (Konva.Util._isObject(val) || Konva.Util._hasMethods(val))) {
	                    continue;
	                }
	                getter = this[key];
	                // remove attr value so that we can extract the default value from the getter
	                delete attrs[key];
	                defaultValue = getter ? getter.call(this) : null;
	                // restore attr value
	                attrs[key] = val;
	                if (defaultValue !== val) {
	                    obj.attrs[key] = val;
	                }
	            }

	            obj.className = this.getClassName();
	            return obj;
	        },
	        /**
	         * convert Node into a JSON string.  Returns a JSON string.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {String}}
	         */
	        toJSON: function() {
	            return JSON.stringify(this.toObject());
	        },
	        /**
	         * get parent container
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         */
	        getParent: function() {
	            return this.parent;
	        },
	        /**
	         * get all ancestros (parent then parent of the parent, etc) of the node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} [selector] selector for search
	         * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
	         * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
	         * @returns {Array} [ancestors]
	         * @example
	         * // get one of the parent group
	         * var parentGroups = node.findAncestors('Group');
	         */
	        findAncestors: function(selector, includeSelf, stopNode) {
	            var res = [];

	            if (includeSelf && this._isMatch(selector)) {
	                res.push(this);
	            }
	            var ancestor = this.parent;
	            while(ancestor) {
	                if (ancestor === stopNode) {
	                    return res;
	                }
	                if (ancestor._isMatch(selector)) {
	                    res.push(ancestor);
	                }
	                ancestor = ancestor.parent;
	            }
	            return res;
	        },
	        /**
	         * get ancestor (parent or parent of the parent, etc) of the node that match passed selector
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} [selector] selector for search
	         * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
	         * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
	         * @returns {Konva.Node} ancestor
	         * @example
	         * // get one of the parent group
	         * var group = node.findAncestors('.mygroup');
	         */
	        findAncestor: function(selector, includeSelf, stopNode) {
	            return this.findAncestors(selector, includeSelf, stopNode)[0];
	        },
	        // is current node match passed selector?
	        _isMatch: function(selector) {
	            if (!selector) {
	                return false;
	            }
	            var selectorArr = selector.replace(/ /g, '').split(','),
	                len = selectorArr.length,
	                n, sel;

	            for (n = 0; n < len; n++) {
	                sel = selectorArr[n];
	                if (!Konva.Util.isValidSelector(sel)) {
	                    Konva.Util.warn('Selector "' + sel + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
	                    Konva.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
	                    Konva.Util.warn('Konva is awesome, right?');
	                }
	                // id selector
	                if(sel.charAt(0) === '#') {
	                    if (this.id() === sel.slice(1)) {
	                        return true;
	                    }
	                }
	                // name selector
	                else if(sel.charAt(0) === '.') {
	                    if (this.hasName(sel.slice(1))) {
	                        return true;
	                    }
	                } else if (this._get(sel).length !== 0) {
	                    return true;
	                }
	            }
	            return false;
	        },
	        /**
	         * get layer ancestor
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Layer}
	         */
	        getLayer: function() {
	            var parent = this.getParent();
	            return parent ? parent.getLayer() : null;
	        },
	        /**
	         * get stage ancestor
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Stage}
	         */
	        getStage: function() {
	            return this._getCache(STAGE, this._getStage);
	        },
	        _getStage: function() {
	            var parent = this.getParent();
	            if(parent) {
	                return parent.getStage();
	            }
	            else {
	                return undefined;
	            }
	        },
	        /**
	         * fire event
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} eventType event type.  can be a regular event, like click, mouseover, or mouseout, or it can be a custom event, like myCustomEvent
	         * @param {Event} [evt] event object
	         * @param {Boolean} [bubble] setting the value to false, or leaving it undefined, will result in the event
	         *  not bubbling.  Setting the value to true will result in the event bubbling.
	         * @returns {Konva.Node}
	         * @example
	         * // manually fire click event
	         * node.fire('click');
	         *
	         * // fire custom event
	         * node.fire('foo');
	         *
	         * // fire custom event with custom event object
	         * node.fire('foo', {
	         *   bar: 10
	         * });
	         *
	         * // fire click event that bubbles
	         * node.fire('click', null, true);
	         */
	        fire: function(eventType, evt, bubble) {
	            evt = evt || {};
	            evt.target = evt.target || this;
	            // bubble
	            if (bubble) {
	                this._fireAndBubble(eventType, evt);
	            }
	            // no bubble
	            else {
	                this._fire(eventType, evt);
	            }
	            return this;
	        },
	        /**
	         * get absolute transform of the node which takes into
	         *  account its ancestor transforms
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Transform}
	         */
	        getAbsoluteTransform: function(top) {
	            // if using an argument, we can't cache the result.
	            if (top) {
	                return this._getAbsoluteTransform(top);
	            }
	            // if no argument, we can cache the result
	            else {
	                return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
	            }
	        },
	        _getAbsoluteTransform: function(top) {
	            var at = new Konva.Transform(),
	                transformsEnabled, trans;

	            // start with stage and traverse downwards to self
	            this._eachAncestorReverse(function(node) {
	                transformsEnabled = node.transformsEnabled();
	                trans = node.getTransform();

	                if (transformsEnabled === 'all') {
	                    at.multiply(trans);
	                }
	                else if (transformsEnabled === 'position') {
	                    at.translate(node.x(), node.y());
	                }
	            }, top);
	            return at;
	        },
	        /**
	         * get transform of the node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Transform}
	         */
	        getTransform: function() {
	            return this._getCache(TRANSFORM, this._getTransform);
	        },
	        _getTransform: function() {
	            var m = new Konva.Transform(),
	                x = this.getX(),
	                y = this.getY(),
	                rotation = Konva.getAngle(this.getRotation()),
	                scaleX = this.getScaleX(),
	                scaleY = this.getScaleY(),
	                skewX = this.getSkewX(),
	                skewY = this.getSkewY(),
	                offsetX = this.getOffsetX(),
	                offsetY = this.getOffsetY();

	            if(x !== 0 || y !== 0) {
	                m.translate(x, y);
	            }
	            if(rotation !== 0) {
	                m.rotate(rotation);
	            }
	            if(skewX !== 0 || skewY !== 0) {
	                m.skew(skewX, skewY);
	            }
	            if(scaleX !== 1 || scaleY !== 1) {
	                m.scale(scaleX, scaleY);
	            }
	            if(offsetX !== 0 || offsetY !== 0) {
	                m.translate(-1 * offsetX, -1 * offsetY);
	            }

	            return m;
	        },
	        /**
	         * clone node.  Returns a new Node instance with identical attributes.  You can also override
	         *  the node properties with an object literal, enabling you to use an existing node as a template
	         *  for another node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} obj override attrs
	         * @returns {Konva.Node}
	         * @example
	         * // simple clone
	         * var clone = node.clone();
	         *
	         * // clone a node and override the x position
	         * var clone = rect.clone({
	         *   x: 5
	         * });
	         */
	        clone: function(obj) {
	            // instantiate new node
	            var attrs = Konva.Util.cloneObject(this.attrs),
	                key, allListeners, len, n, listener;
	            // filter black attrs
	            for (var i in CLONE_BLACK_LIST) {
	                var blockAttr = CLONE_BLACK_LIST[i];
	                delete attrs[blockAttr];
	            }
	            // apply attr overrides
	            for (key in obj) {
	                attrs[key] = obj[key];
	            }

	            var node = new this.constructor(attrs);
	            // copy over listeners
	            for(key in this.eventListeners) {
	                allListeners = this.eventListeners[key];
	                len = allListeners.length;
	                for(n = 0; n < len; n++) {
	                    listener = allListeners[n];
	                    /*
	                     * don't include konva namespaced listeners because
	                     *  these are generated by the constructors
	                     */
	                    if(listener.name.indexOf(KONVA) < 0) {
	                        // if listeners array doesn't exist, then create it
	                        if(!node.eventListeners[key]) {
	                            node.eventListeners[key] = [];
	                        }
	                        node.eventListeners[key].push(listener);
	                    }
	                }
	            }
	            return node;
	        },
	        /**
	         * Creates a composite data URL. If MIME type is not
	         * specified, then "image/png" will result. For "image/jpeg", specify a quality
	         * level as quality (range 0.0 - 1.0)
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} config
	         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
	         *  "image/png" is the default
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
	         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
	         *  is very high quality
	         * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image url. Default is 1
	         * @returns {String}
	         */
	        toDataURL: function(config) {
	            config = config || {};

	            var mimeType = config.mimeType || null,
	                quality = config.quality || null,
	                stage = this.getStage(),
	                x = config.x || 0,
	                y = config.y || 0,
	                pixelRatio = config.pixelRatio || 1,
	                canvas = new Konva.SceneCanvas({
	                    width: config.width || this.getWidth() || (stage ? stage.getWidth() : 0),
	                    height: config.height || this.getHeight() || (stage ? stage.getHeight() : 0),
	                    pixelRatio: pixelRatio
	                }),
	                context = canvas.getContext();

	            context.save();

	            if(x || y) {
	                context.translate(-1 * x, -1 * y);
	            }

	            this.drawScene(canvas);
	            context.restore();

	            return canvas.toDataURL(mimeType, quality);
	        },
	        /**
	         * converts node into an image.  Since the toImage
	         *  method is asynchronous, a callback is required.  toImage is most commonly used
	         *  to cache complex drawings as an image so that they don't have to constantly be redrawn
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {Object} config
	         * @param {Function} config.callback function executed when the composite has completed
	         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
	         *  "image/png" is the default
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
	         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
	         *  is very high quality
	         * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image.  Default is 1.
	         * @example
	         * var image = node.toImage({
	         *   callback: function(img) {
	         *     // do stuff with img
	         *   }
	         * });
	         */
	        toImage: function(config) {
	            if (!config || !config.callback) {
	                throw 'callback required for toImage method config argument';
	            }
	            Konva.Util._getImage(this.toDataURL(config), function(img) {
	                config.callback(img);
	            });
	        },
	        setSize: function(size) {
	            this.setWidth(size.width);
	            this.setHeight(size.height);
	            return this;
	        },
	        getSize: function() {
	            return {
	                width: this.getWidth(),
	                height: this.getHeight()
	            };
	        },
	        getWidth: function() {
	            return this.attrs.width || 0;
	        },
	        getHeight: function() {
	            return this.attrs.height || 0;
	        },
	        /**
	         * get class name, which may return Stage, Layer, Group, or shape class names like Rect, Circle, Text, etc.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {String}
	         */
	        getClassName: function() {
	            return this.className || this.nodeType;
	        },
	        /**
	         * get the node type, which may return Stage, Layer, Group, or Node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {String}
	         */
	        getType: function() {
	            return this.nodeType;
	        },
	        getDragDistance: function() {
	            // compare with undefined because we need to track 0 value
	            if (this.attrs.dragDistance !== undefined) {
	                return this.attrs.dragDistance;
	            } else if (this.parent) {
	                return this.parent.getDragDistance();
	            } else {
	                return Konva.dragDistance;
	            }
	        },
	        _get: function(selector) {
	            return this.className === selector || this.nodeType === selector ? [this] : [];
	        },
	        _off: function(type, name) {
	            var evtListeners = this.eventListeners[type],
	                i, evtName;

	            for(i = 0; i < evtListeners.length; i++) {
	                evtName = evtListeners[i].name;
	                // the following two conditions must be true in order to remove a handler:
	                // 1) the current event name cannot be konva unless the event name is konva
	                //    this enables developers to force remove a konva specific listener for whatever reason
	                // 2) an event name is not specified, or if one is specified, it matches the current event name
	                if((evtName !== 'konva' || name === 'konva') && (!name || evtName === name)) {
	                    evtListeners.splice(i, 1);
	                    if(evtListeners.length === 0) {
	                        delete this.eventListeners[type];
	                        break;
	                    }
	                    i--;
	                }
	            }
	        },
	        _fireChangeEvent: function(attr, oldVal, newVal) {
	            this._fire(attr + CHANGE, {
	                oldVal: oldVal,
	                newVal: newVal
	            });
	        },
	        setId: function(id) {
	            var oldId = this.getId();

	            Konva._removeId(oldId);
	            Konva._addId(this, id);
	            this._setAttr(ID, id);
	            return this;
	        },
	        setName: function(name) {
	            var oldNames = (this.getName() || '').split(/\s/g);
	            var newNames = (name || '').split(/\s/g);
	            var subname, i;
	            // remove all subnames
	            for(i = 0; i < oldNames.length; i++) {
	                subname = oldNames[i];
	                if ((newNames.indexOf(subname)) === -1 && subname) {
	                    Konva._removeName(subname, this._id);
	                }
	            }

	            // add new names
	            for(i = 0; i < newNames.length; i++) {
	                subname = newNames[i];
	                if ((oldNames.indexOf(subname) === -1) && subname) {
	                    Konva._addName(this, subname);
	                }
	            }

	            this._setAttr(NAME, name);
	            return this;
	        },
	        // naming methods
	        /**
	         * add name to node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} name
	         * @returns {Konva.Node}
	         * @example
	         * node.name('red');
	         * node.addName('selected');
	         * node.name(); // return 'red selected'
	         */
	        addName: function(name) {
	            if (!this.hasName(name)) {
	                var oldName = this.name();
	                var newName = oldName ? (oldName + ' ' + name) : name;
	                this.setName(newName);
	            }
	            return this;
	        },
	        /**
	         * check is node has name
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} name
	         * @returns {Boolean}
	         * @example
	         * node.name('red');
	         * node.hasName('red');   // return true
	         * node.hasName('selected'); // return false
	         */
	        hasName: function(name) {
	            var names = (this.name() || '').split(/\s/g);
	            return names.indexOf(name) !== -1;
	        },
	        /**
	         * remove name from node
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} name
	         * @returns {Konva.Node}
	         * @example
	         * node.name('red selected');
	         * node.removeName('selected');
	         * node.hasName('selected'); // return false
	         * node.name(); // return 'red'
	         */
	        removeName: function(name) {
	            var names = (this.name() || '').split(/\s/g);
	            var index = names.indexOf(name);
	            if (index !== -1) {
	                names.splice(index, 1);
	                this.setName(names.join(' '));
	            }
	            return this;
	        },
	        /**
	         * set attr
	         * @method
	         * @memberof Konva.Node.prototype
	         * @param {String} attr
	         * @param {*} val
	         * @returns {Konva.Node}
	         * @example
	         * node.setAttr('x', 5);
	         */
	        setAttr: function(attr, val) {
	            var method = SET + Konva.Util._capitalize(attr),
	                func = this[method];

	            if(Konva.Util._isFunction(func)) {
	                func.call(this, val);
	            }
	            // otherwise set directly
	            else {
	                this._setAttr(attr, val);
	            }
	            return this;
	        },
	        _setAttr: function(key, val) {
	            var oldVal;
	            if(val !== undefined) {
	                oldVal = this.attrs[key];
	                if (oldVal === val) {
	                    return;
	                }
	                this.attrs[key] = val;
	                this._fireChangeEvent(key, oldVal, val);
	            }
	        },
	        _setComponentAttr: function(key, component, val) {
	            var oldVal;
	            if(val !== undefined) {
	                oldVal = this.attrs[key];

	                if (!oldVal) {
	                    // set value to default value using getAttr
	                    this.attrs[key] = this.getAttr(key);
	                }

	                this.attrs[key][component] = val;
	                this._fireChangeEvent(key, oldVal, val);
	            }
	        },
	        _fireAndBubble: function(eventType, evt, compareShape) {
	            var okayToRun = true;

	            if(evt && this.nodeType === SHAPE) {
	                evt.target = this;
	            }

	            if(eventType === MOUSEENTER && compareShape && (this._id === compareShape._id || (this.isAncestorOf && this.isAncestorOf(compareShape)))) {
	                okayToRun = false;
	            }
	            else if(eventType === MOUSELEAVE && compareShape && (this._id === compareShape._id || (this.isAncestorOf && this.isAncestorOf(compareShape)))) {
	                okayToRun = false;
	            }
	            if(okayToRun) {
	                this._fire(eventType, evt);

	                // simulate event bubbling
	                var stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) && ((compareShape && compareShape.isAncestorOf && compareShape.isAncestorOf(this)) || !!(compareShape && compareShape.isAncestorOf));
	                if((evt && !evt.cancelBubble || !evt) && this.parent && this.parent.isListening() && (!stopBubble)) {
	                    if(compareShape && compareShape.parent) {
	                        this._fireAndBubble.call(this.parent, eventType, evt, compareShape.parent);
	                    }
	                    else {
	                        this._fireAndBubble.call(this.parent, eventType, evt);
	                    }
	                }
	            }
	        },
	        _fire: function(eventType, evt) {
	            var events = this.eventListeners[eventType],
	                i;

	            evt = evt || {};
	            evt.currentTarget = this;
	            evt.type = eventType;

	            if (events) {
	                for(i = 0; i < events.length; i++) {
	                    events[i].handler.call(this, evt);
	                }
	            }
	        },
	        /**
	         * draw both scene and hit graphs.  If the node being drawn is the stage, all of the layers will be cleared and redrawn
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Konva.Node}
	         */
	        draw: function() {
	            this.drawScene();
	            this.drawHit();
	            return this;
	        }
	    });

	    /**
	     * create node with JSON string or an Object.  De-serializtion does not generate custom
	     *  shape drawing functions, images, or event handlers (this would make the
	     *  serialized object huge).  If your app uses custom shapes, images, and
	     *  event handlers (it probably does), then you need to select the appropriate
	     *  shapes after loading the stage and set these properties via on(), setDrawFunc(),
	     *  and setImage() methods
	     * @method
	     * @memberof Konva.Node
	     * @param {String|Object} json string or object
	     * @param {Element} [container] optional container dom element used only if you're
	     *  creating a stage node
	     */
	    Konva.Node.create = function(data, container) {
	        if (Konva.Util._isString(data)) {
	            data = JSON.parse(data);
	        }
	        return this._createNode(data, container);
	    };
	    Konva.Node._createNode = function(obj, container) {
	        var className = Konva.Node.prototype.getClassName.call(obj),
	            children = obj.children,
	            no, len, n;

	        // if container was passed in, add it to attrs
	        if(container) {
	            obj.attrs.container = container;
	        }

	        no = new Konva[className](obj.attrs);
	        if(children) {
	            len = children.length;
	            for(n = 0; n < len; n++) {
	                no.add(this._createNode(children[n]));
	            }
	        }

	        return no;
	    };


	    // =========================== add getters setters ===========================

	    Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'position');
	    /**
	     * get/set node position relative to parent
	     * @name position
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Object} pos
	     * @param {Number} pos.x
	     * @param {Number} pos.y
	     * @returns {Object}
	     * @example
	     * // get position
	     * var position = node.position();
	     *
	     * // set position
	     * node.position({
	     *   x: 5
	     *   y: 10
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'x', 0);

	    /**
	     * get/set x position
	     * @name x
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} x
	     * @returns {Object}
	     * @example
	     * // get x
	     * var x = node.x();
	     *
	     * // set x
	     * node.x(5);
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'y', 0);

	    /**
	     * get/set y position
	     * @name y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} y
	     * @returns {Integer}
	     * @example
	     * // get y
	     * var y = node.y();
	     *
	     * // set y
	     * node.y(5);
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'opacity', 1);

	    /**
	     * get/set opacity.  Opacity values range from 0 to 1.
	     *  A node with an opacity of 0 is fully transparent, and a node
	     *  with an opacity of 1 is fully opaque
	     * @name opacity
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Object} opacity
	     * @returns {Number}
	     * @example
	     * // get opacity
	     * var opacity = node.opacity();
	     *
	     * // set opacity
	     * node.opacity(0.5);
	     */

	    Konva.Factory.addGetter(Konva.Node, 'name');
	    Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'name');

	    /**
	     * get/set name
	     * @name name
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {String} name
	     * @returns {String}
	     * @example
	     * // get name
	     * var name = node.name();
	     *
	     * // set name
	     * node.name('foo');
	     *
	     * // also node may have multiple names (as css classes)
	     * node.name('foo bar');
	     */

	    Konva.Factory.addGetter(Konva.Node, 'id');
	    Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'id');

	    /**
	     * get/set id. Id is global for whole page.
	     * @name id
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {String} id
	     * @returns {String}
	     * @example
	     * // get id
	     * var name = node.id();
	     *
	     * // set id
	     * node.id('foo');
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'rotation', 0);

	    /**
	     * get/set rotation in degrees
	     * @name rotation
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} rotation
	     * @returns {Number}
	     * @example
	     * // get rotation in degrees
	     * var rotation = node.rotation();
	     *
	     * // set rotation in degrees
	     * node.rotation(45);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Node, 'scale', ['x', 'y']);

	    /**
	     * get/set scale
	     * @name scale
	     * @param {Object} scale
	     * @param {Number} scale.x
	     * @param {Number} scale.y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Object}
	     * @example
	     * // get scale
	     * var scale = node.scale();
	     *
	     * // set scale
	     * shape.scale({
	     *   x: 2
	     *   y: 3
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'scaleX', 1);

	    /**
	     * get/set scale x
	     * @name scaleX
	     * @param {Number} x
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Number}
	     * @example
	     * // get scale x
	     * var scaleX = node.scaleX();
	     *
	     * // set scale x
	     * node.scaleX(2);
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'scaleY', 1);

	    /**
	     * get/set scale y
	     * @name scaleY
	     * @param {Number} y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Number}
	     * @example
	     * // get scale y
	     * var scaleY = node.scaleY();
	     *
	     * // set scale y
	     * node.scaleY(2);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Node, 'skew', ['x', 'y']);

	    /**
	     * get/set skew
	     * @name skew
	     * @param {Object} skew
	     * @param {Number} skew.x
	     * @param {Number} skew.y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Object}
	     * @example
	     * // get skew
	     * var skew = node.skew();
	     *
	     * // set skew
	     * node.skew({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'skewX', 0);

	    /**
	     * get/set skew x
	     * @name skewX
	     * @param {Number} x
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Number}
	     * @example
	     * // get skew x
	     * var skewX = node.skewX();
	     *
	     * // set skew x
	     * node.skewX(3);
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'skewY', 0);

	    /**
	     * get/set skew y
	     * @name skewY
	     * @param {Number} y
	     * @method
	     * @memberof Konva.Node.prototype
	     * @returns {Number}
	     * @example
	     * // get skew y
	     * var skewY = node.skewY();
	     *
	     * // set skew y
	     * node.skewY(3);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Node, 'offset', ['x', 'y']);

	    /**
	     * get/set offset.  Offsets the default position and rotation point
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Object} offset
	     * @param {Number} offset.x
	     * @param {Number} offset.y
	     * @returns {Object}
	     * @example
	     * // get offset
	     * var offset = node.offset();
	     *
	     * // set offset
	     * node.offset({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'offsetX', 0);

	    /**
	     * get/set offset x
	     * @name offsetX
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get offset x
	     * var offsetX = node.offsetX();
	     *
	     * // set offset x
	     * node.offsetX(3);
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'offsetY', 0);

	    /**
	     * get/set offset y
	     * @name offsetY
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get offset y
	     * var offsetY = node.offsetY();
	     *
	     * // set offset y
	     * node.offsetY(3);
	     */

	    Konva.Factory.addSetter(Konva.Node, 'dragDistance');
	    Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'dragDistance');

	    /**
	     * get/set drag distance
	     * @name dragDistance
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} distance
	     * @returns {Number}
	     * @example
	     * // get drag distance
	     * var dragDistance = node.dragDistance();
	     *
	     * // set distance
	     * // node starts dragging only if pointer moved more then 3 pixels
	     * node.dragDistance(3);
	     * // or set globally
	     * Konva.dragDistance = 3;
	     */


	    Konva.Factory.addSetter(Konva.Node, 'width', 0);
	    Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'width');
	    /**
	     * get/set width
	     * @name width
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} width
	     * @returns {Number}
	     * @example
	     * // get width
	     * var width = node.width();
	     *
	     * // set width
	     * node.width(100);
	     */

	    Konva.Factory.addSetter(Konva.Node, 'height', 0);
	    Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'height');
	    /**
	     * get/set height
	     * @name height
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Number} height
	     * @returns {Number}
	     * @example
	     * // get height
	     * var height = node.height();
	     *
	     * // set height
	     * node.height(100);
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'listening', 'inherit');
	    /**
	     * get/set listenig attr.  If you need to determine if a node is listening or not
	     *   by taking into account its parents, use the isListening() method
	     * @name listening
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Boolean|String} listening Can be "inherit", true, or false.  The default is "inherit".
	     * @returns {Boolean|String}
	     * @example
	     * // get listening attr
	     * var listening = node.listening();
	     *
	     * // stop listening for events
	     * node.listening(false);
	     *
	     * // listen for events
	     * node.listening(true);
	     *
	     * // listen to events according to the parent
	     * node.listening('inherit');
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'filters', undefined, function(val) {this._filterUpToDate = false; return val; });
	    /**
	     * get/set filters.  Filters are applied to cached canvases
	     * @name filters
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Array} filters array of filters
	     * @returns {Array}
	     * @example
	     * // get filters
	     * var filters = node.filters();
	     *
	     * // set a single filter
	     * node.cache();
	     * node.filters([Konva.Filters.Blur]);
	     *
	     * // set multiple filters
	     * node.cache();
	     * node.filters([
	     *   Konva.Filters.Blur,
	     *   Konva.Filters.Sepia,
	     *   Konva.Filters.Invert
	     * ]);
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'visible', 'inherit');
	    /**
	     * get/set visible attr.  Can be "inherit", true, or false.  The default is "inherit".
	     *   If you need to determine if a node is visible or not
	     *   by taking into account its parents, use the isVisible() method
	     * @name visible
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Boolean|String} visible
	     * @returns {Boolean|String}
	     * @example
	     * // get visible attr
	     * var visible = node.visible();
	     *
	     * // make invisible
	     * node.visible(false);
	     *
	     * // make visible
	     * node.visible(true);
	     *
	     * // make visible according to the parent
	     * node.visible('inherit');
	     */

	    Konva.Factory.addGetterSetter(Konva.Node, 'transformsEnabled', 'all');

	    /**
	     * get/set transforms that are enabled.  Can be "all", "none", or "position".  The default
	     *  is "all"
	     * @name transformsEnabled
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {String} enabled
	     * @returns {String}
	     * @example
	     * // enable position transform only to improve draw performance
	     * node.transformsEnabled('position');
	     *
	     * // enable all transforms
	     * node.transformsEnabled('all');
	     */



	    /**
	     * get/set node size
	     * @name size
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Object} size
	     * @param {Number} size.width
	     * @param {Number} size.height
	     * @returns {Object}
	     * @example
	     * // get node size
	     * var size = node.size();
	     * var x = size.x;
	     * var y = size.y;
	     *
	     * // set size
	     * node.size({
	     *   width: 100,
	     *   height: 200
	     * });
	     */
	    Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'size');

	    Konva.Factory.backCompat(Konva.Node, {
	        rotateDeg: 'rotate',
	        setRotationDeg: 'setRotation',
	        getRotationDeg: 'getRotation'
	    });

	    Konva.Collection.mapMethods(Konva.Node);
	})(Konva);

	(function() {
	    'use strict';
	    /**
	    * Grayscale Filter
	    * @function
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @example
	    * node.cache();
	    * node.filters([Konva.Filters.Grayscale]);
	    */
	    Konva.Filters.Grayscale = function(imageData) {
	        var data = imageData.data,
	            len = data.length,
	            i, brightness;

	        for(i = 0; i < len; i += 4) {
	            brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
	            // red
	            data[i] = brightness;
	            // green
	            data[i + 1] = brightness;
	            // blue
	            data[i + 2] = brightness;
	        }
	    };
	})();

	(function() {
	    'use strict';
	    /**
	     * Brighten Filter.
	     * @function
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Brighten]);
	     * node.brightness(0.8);
	     */
	    Konva.Filters.Brighten = function(imageData) {
	        var brightness = this.brightness() * 255,
	            data = imageData.data,
	            len = data.length,
	            i;

	        for(i = 0; i < len; i += 4) {
	            // red
	            data[i] += brightness;
	            // green
	            data[i + 1] += brightness;
	            // blue
	            data[i + 2] += brightness;
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'brightness', 0, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set filter brightness.  The brightness is a number between -1 and 1.&nbsp; Positive values
	    *  brighten the pixels and negative values darken them. Use with {@link Konva.Filters.Brighten} filter.
	    * @name brightness
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} brightness value between -1 and 1
	    * @returns {Number}
	    */

	})();

	(function() {
	    'use strict';
	    /**
	    * Invert Filter
	    * @function
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @example
	    * node.cache();
	    * node.filters([Konva.Filters.Invert]);
	    */
	    Konva.Filters.Invert = function(imageData) {
	        var data = imageData.data,
	            len = data.length,
	            i;

	        for(i = 0; i < len; i += 4) {
	            // red
	            data[i] = 255 - data[i];
	            // green
	            data[i + 1] = 255 - data[i + 1];
	            // blue
	            data[i + 2] = 255 - data[i + 2];
	        }
	    };
	})();

	/*
	 the Gauss filter
	 master repo: https://github.com/pavelpower/kineticjsGaussFilter
	*/
	(function() {
	    'use strict';
	    /*

	     StackBlur - a fast almost Gaussian Blur For Canvas

	     Version:   0.5
	     Author:    Mario Klingemann
	     Contact:   mario@quasimondo.com
	     Website:   http://www.quasimondo.com/StackBlurForCanvas
	     Twitter:   @quasimondo

	     In case you find this class useful - especially in commercial projects -
	     I am not totally unhappy for a small donation to my PayPal account
	     mario@quasimondo.de

	     Or support me on flattr:
	     https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

	     Copyright (c) 2010 Mario Klingemann

	     Permission is hereby granted, free of charge, to any person
	     obtaining a copy of this software and associated documentation
	     files (the "Software"), to deal in the Software without
	     restriction, including without limitation the rights to use,
	     copy, modify, merge, publish, distribute, sublicense, and/or sell
	     copies of the Software, and to permit persons to whom the
	     Software is furnished to do so, subject to the following
	     conditions:

	     The above copyright notice and this permission notice shall be
	     included in all copies or substantial portions of the Software.

	     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	     OTHER DEALINGS IN THE SOFTWARE.
	     */

	    function BlurStack() {
	        this.r = 0;
	        this.g = 0;
	        this.b = 0;
	        this.a = 0;
	        this.next = null;
	    }

	    var mul_table = [
	        512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
	        454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
	        482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
	        437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
	        497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
	        320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
	        446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
	        329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
	        505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
	        399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
	        324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
	        268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
	        451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
	        385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
	        332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
	        289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
	    ];

	    var shg_table = [
	        9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
	        17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
	        19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
	        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
	        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
	        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
	        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
	        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
	        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	        23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
	    ];

	    function filterGaussBlurRGBA( imageData, radius) {

	        var pixels = imageData.data,
	            width = imageData.width,
	            height = imageData.height;

	        var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
	            r_out_sum, g_out_sum, b_out_sum, a_out_sum,
	            r_in_sum, g_in_sum, b_in_sum, a_in_sum,
	            pr, pg, pb, pa, rbs;

	        var div = radius + radius + 1,
	            widthMinus1 = width - 1,
	            heightMinus1 = height - 1,
	            radiusPlus1 = radius + 1,
	            sumFactor = radiusPlus1 * ( radiusPlus1 + 1 ) / 2,
	            stackStart = new BlurStack(),
	            stackEnd = null,
	            stack = stackStart,
	            stackIn = null,
	            stackOut = null,
	            mul_sum = mul_table[radius],
	            shg_sum = shg_table[radius];

	        for ( i = 1; i < div; i++ ) {
	            stack = stack.next = new BlurStack();
	            if ( i === radiusPlus1 ){
	                stackEnd = stack;
	            }
	        }

	        stack.next = stackStart;

	        yw = yi = 0;

	        for ( y = 0; y < height; y++ )
	        {
	            r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

	            r_out_sum = radiusPlus1 * ( pr = pixels[yi] );
	            g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1] );
	            b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2] );
	            a_out_sum = radiusPlus1 * ( pa = pixels[yi + 3] );

	            r_sum += sumFactor * pr;
	            g_sum += sumFactor * pg;
	            b_sum += sumFactor * pb;
	            a_sum += sumFactor * pa;

	            stack = stackStart;

	            for( i = 0; i < radiusPlus1; i++ )
	            {
	                stack.r = pr;
	                stack.g = pg;
	                stack.b = pb;
	                stack.a = pa;
	                stack = stack.next;
	            }

	            for( i = 1; i < radiusPlus1; i++ )
	            {
	                p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
	                r_sum += ( stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i );
	                g_sum += ( stack.g = ( pg = pixels[p + 1])) * rbs;
	                b_sum += ( stack.b = ( pb = pixels[p + 2])) * rbs;
	                a_sum += ( stack.a = ( pa = pixels[p + 3])) * rbs;

	                r_in_sum += pr;
	                g_in_sum += pg;
	                b_in_sum += pb;
	                a_in_sum += pa;

	                stack = stack.next;
	            }


	            stackIn = stackStart;
	            stackOut = stackEnd;
	            for ( x = 0; x < width; x++ )
	            {
	                pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
	                if ( pa !== 0 )
	                {
	                    pa = 255 / pa;
	                    pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
	                    pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
	                    pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
	                } else {
	                    pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
	                }

	                r_sum -= r_out_sum;
	                g_sum -= g_out_sum;
	                b_sum -= b_out_sum;
	                a_sum -= a_out_sum;

	                r_out_sum -= stackIn.r;
	                g_out_sum -= stackIn.g;
	                b_out_sum -= stackIn.b;
	                a_out_sum -= stackIn.a;

	                p = (yw + ( ( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;

	                r_in_sum += ( stackIn.r = pixels[p]);
	                g_in_sum += ( stackIn.g = pixels[p + 1]);
	                b_in_sum += ( stackIn.b = pixels[p + 2]);
	                a_in_sum += ( stackIn.a = pixels[p + 3]);

	                r_sum += r_in_sum;
	                g_sum += g_in_sum;
	                b_sum += b_in_sum;
	                a_sum += a_in_sum;

	                stackIn = stackIn.next;

	                r_out_sum += ( pr = stackOut.r );
	                g_out_sum += ( pg = stackOut.g );
	                b_out_sum += ( pb = stackOut.b );
	                a_out_sum += ( pa = stackOut.a );

	                r_in_sum -= pr;
	                g_in_sum -= pg;
	                b_in_sum -= pb;
	                a_in_sum -= pa;

	                stackOut = stackOut.next;

	                yi += 4;
	            }
	            yw += width;
	        }


	        for ( x = 0; x < width; x++ )
	        {
	            g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

	            yi = x << 2;
	            r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
	            g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1]);
	            b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2]);
	            a_out_sum = radiusPlus1 * ( pa = pixels[yi + 3]);

	            r_sum += sumFactor * pr;
	            g_sum += sumFactor * pg;
	            b_sum += sumFactor * pb;
	            a_sum += sumFactor * pa;

	            stack = stackStart;

	            for( i = 0; i < radiusPlus1; i++ )
	            {
	                stack.r = pr;
	                stack.g = pg;
	                stack.b = pb;
	                stack.a = pa;
	                stack = stack.next;
	            }

	            yp = width;

	            for( i = 1; i <= radius; i++ )
	            {
	                yi = ( yp + x ) << 2;

	                r_sum += ( stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i );
	                g_sum += ( stack.g = ( pg = pixels[yi + 1])) * rbs;
	                b_sum += ( stack.b = ( pb = pixels[yi + 2])) * rbs;
	                a_sum += ( stack.a = ( pa = pixels[yi + 3])) * rbs;

	                r_in_sum += pr;
	                g_in_sum += pg;
	                b_in_sum += pb;
	                a_in_sum += pa;

	                stack = stack.next;

	                if( i < heightMinus1 )
	                {
	                    yp += width;
	                }
	            }

	            yi = x;
	            stackIn = stackStart;
	            stackOut = stackEnd;
	            for ( y = 0; y < height; y++ )
	            {
	                p = yi << 2;
	                pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
	                if ( pa > 0 )
	                {
	                    pa = 255 / pa;
	                    pixels[p] = ((r_sum * mul_sum) >> shg_sum ) * pa;
	                    pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum ) * pa;
	                    pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum ) * pa;
	                } else {
	                    pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
	                }

	                r_sum -= r_out_sum;
	                g_sum -= g_out_sum;
	                b_sum -= b_out_sum;
	                a_sum -= a_out_sum;

	                r_out_sum -= stackIn.r;
	                g_out_sum -= stackIn.g;
	                b_out_sum -= stackIn.b;
	                a_out_sum -= stackIn.a;

	                p = ( x + (( ( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

	                r_sum += ( r_in_sum += ( stackIn.r = pixels[p]));
	                g_sum += ( g_in_sum += ( stackIn.g = pixels[p + 1]));
	                b_sum += ( b_in_sum += ( stackIn.b = pixels[p + 2]));
	                a_sum += ( a_in_sum += ( stackIn.a = pixels[p + 3]));

	                stackIn = stackIn.next;

	                r_out_sum += ( pr = stackOut.r );
	                g_out_sum += ( pg = stackOut.g );
	                b_out_sum += ( pb = stackOut.b );
	                a_out_sum += ( pa = stackOut.a );

	                r_in_sum -= pr;
	                g_in_sum -= pg;
	                b_in_sum -= pb;
	                a_in_sum -= pa;

	                stackOut = stackOut.next;

	                yi += width;
	            }
	        }
	    }

	    /**
	     * Blur Filter
	     * @function
	     * @name Blur
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Blur]);
	     * node.blurRadius(10);
	     */
	    Konva.Filters.Blur = function Blur(imageData) {
	        var radius = Math.round(this.blurRadius());

	        if (radius > 0) {
	            filterGaussBlurRGBA(imageData, radius);
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'blurRadius', 0, null, Konva.Factory.afterSetFilter);

	    /**
	    * get/set blur radius. Use with {@link Konva.Filters.Blur} filter
	    * @name blurRadius
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} radius
	    * @returns {Integer}
	    */
	})();

	/*eslint-disable  max-depth */
	(function() {
		'use strict';
		function pixelAt(idata, x, y) {
			var idx = (y * idata.width + x) * 4;
			var d = [];
			d.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
			return d;
		}

		function rgbDistance(p1, p2) {
			return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2));
		}

		function rgbMean(pTab) {
			var m = [0, 0, 0];

			for (var i = 0; i < pTab.length; i++) {
				m[0] += pTab[i][0];
				m[1] += pTab[i][1];
				m[2] += pTab[i][2];
			}

			m[0] /= pTab.length;
			m[1] /= pTab.length;
			m[2] /= pTab.length;

			return m;
		}

		function backgroundMask(idata, threshold) {
			var rgbv_no = pixelAt(idata, 0, 0);
			var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
			var rgbv_so = pixelAt(idata, 0, idata.height - 1);
			var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);


			var thres = threshold || 10;
			if (rgbDistance(rgbv_no, rgbv_ne) < thres && rgbDistance(rgbv_ne, rgbv_se) < thres && rgbDistance(rgbv_se, rgbv_so) < thres && rgbDistance(rgbv_so, rgbv_no) < thres) {

				// Mean color
				var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);

				// Mask based on color distance
				var mask = [];
				for (var i = 0; i < idata.width * idata.height; i++) {
					var d = rgbDistance(mean, [idata.data[i * 4], idata.data[i * 4 + 1], idata.data[i * 4 + 2]]);
					mask[i] = (d < thres) ? 0 : 255;
				}

				return mask;
			}
		}

		function applyMask(idata, mask) {
			for (var i = 0; i < idata.width * idata.height; i++) {
				idata.data[4 * i + 3] = mask[i];
			}
		}

		function erodeMask(mask, sw, sh) {

			var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
			var side = Math.round(Math.sqrt(weights.length));
			var halfSide = Math.floor(side / 2);

			var maskResult = [];
			for (var y = 0; y < sh; y++) {
				for (var x = 0; x < sw; x++) {

					var so = y * sw + x;
					var a = 0;
					for (var cy = 0; cy < side; cy++) {
						for (var cx = 0; cx < side; cx++) {
							var scy = y + cy - halfSide;
							var scx = x + cx - halfSide;

							if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {

								var srcOff = scy * sw + scx;
								var wt = weights[cy * side + cx];

								a += mask[srcOff] * wt;
							}
						}
					}

					maskResult[so] = (a === 255 * 8) ? 255 : 0;
				}
			}

			return maskResult;
		}

		function dilateMask(mask, sw, sh) {

			var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
			var side = Math.round(Math.sqrt(weights.length));
			var halfSide = Math.floor(side / 2);

			var maskResult = [];
			for (var y = 0; y < sh; y++) {
				for (var x = 0; x < sw; x++) {

					var so = y * sw + x;
					var a = 0;
					for (var cy = 0; cy < side; cy++) {
						for (var cx = 0; cx < side; cx++) {
							var scy = y + cy - halfSide;
							var scx = x + cx - halfSide;

							if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {

								var srcOff = scy * sw + scx;
								var wt = weights[cy * side + cx];

								a += mask[srcOff] * wt;
							}
						}
					}

					maskResult[so] = (a >= 255 * 4) ? 255 : 0;
				}
			}

			return maskResult;
		}

		function smoothEdgeMask(mask, sw, sh) {

			var weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
			var side = Math.round(Math.sqrt(weights.length));
			var halfSide = Math.floor(side / 2);

			var maskResult = [];
			for (var y = 0; y < sh; y++) {
				for (var x = 0; x < sw; x++) {

					var so = y * sw + x;
					var a = 0;
					for (var cy = 0; cy < side; cy++) {
						for (var cx = 0; cx < side; cx++) {
							var scy = y + cy - halfSide;
							var scx = x + cx - halfSide;

							if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {

								var srcOff = scy * sw + scx;
								var wt = weights[cy * side + cx];

								a += mask[srcOff] * wt;
							}
						}
					}

					maskResult[so] = a;
				}
			}

			return maskResult;
		}

		/**
		 * Mask Filter
		 * @function
		 * @name Mask
		 * @memberof Konva.Filters
		 * @param {Object} imageData
		 * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Mask]);
	     * node.threshold(200);
		 */
		Konva.Filters.Mask = function(imageData) {
			// Detect pixels close to the background color
			var threshold = this.threshold(),
	        mask = backgroundMask(imageData, threshold);
			if (mask) {
				// Erode
				mask = erodeMask(mask, imageData.width, imageData.height);

				// Dilate
				mask = dilateMask(mask, imageData.width, imageData.height);

				// Gradient
				mask = smoothEdgeMask(mask, imageData.width, imageData.height);

				// Apply mask
				applyMask(imageData, mask);

				// todo : Update hit region function according to mask
			}

			return imageData;
		};

		Konva.Factory.addGetterSetter(Konva.Node, 'threshold', 0, null, Konva.Factory.afterSetFilter);
	})();

	(function () {
	    'use strict';
	    /**
	     * RGB Filter
	     * @function
	     * @name RGB
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author ippo615
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.RGB]);
	     * node.blue(120);
	     * node.green(200);
	     */
	    Konva.Filters.RGB = function (imageData) {
	        var data = imageData.data,
	            nPixels = data.length,
	            red = this.red(),
	            green = this.green(),
	            blue = this.blue(),
	            i, brightness;

	        for (i = 0; i < nPixels; i += 4) {
	            brightness = (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255;
	            data[i] = brightness * red; // r
	            data[i + 1] = brightness * green; // g
	            data[i + 2] = brightness * blue; // b
	            data[i + 3] = data[i + 3]; // alpha
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'red', 0, function(val) {
	        this._filterUpToDate = false;
	        if (val > 255) {
	            return 255;
	        }
	        else if (val < 0) {
	            return 0;
	        }
	        else {
	            return Math.round(val);
	        }
	    });
	    /**
	    * get/set filter red value. Use with {@link Konva.Filters.RGB} filter.
	    * @name red
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} red value between 0 and 255
	    * @returns {Integer}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'green', 0, function(val) {
	        this._filterUpToDate = false;
	        if (val > 255) {
	            return 255;
	        }
	        else if (val < 0) {
	            return 0;
	        }
	        else {
	            return Math.round(val);
	        }
	    });
	    /**
	    * get/set filter green value. Use with {@link Konva.Filters.RGB} filter.
	    * @name green
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} green value between 0 and 255
	    * @returns {Integer}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'blue', 0, Konva.Validators.RGBComponent, Konva.Factory.afterSetFilter);
	    /**
	    * get/set filter blue value. Use with {@link Konva.Filters.RGB} filter.
	    * @name blue
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} blue value between 0 and 255
	    * @returns {Integer}
	    */
	})();

	(function () {
	    'use strict';
	    /**
	     * RGBA Filter
	     * @function
	     * @name RGBA
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author codefo
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.RGBA]);
	     * node.blue(120);
	     * node.green(200);
	     * node.alpha(0.3);
	     */
	    Konva.Filters.RGBA = function (imageData) {
	        var data = imageData.data,
	            nPixels = data.length,
	            red = this.red(),
	            green = this.green(),
	            blue = this.blue(),
	            alpha = this.alpha(),
	            i, ia;

	        for (i = 0; i < nPixels; i += 4) {
	            ia = 1 - alpha;

	            data[i] = red * alpha + data[i] * ia; // r
	            data[i + 1] = green * alpha + data[i + 1] * ia; // g
	            data[i + 2] = blue * alpha + data[i + 2] * ia; // b
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'red', 0, function(val) {
	        this._filterUpToDate = false;
	        if (val > 255) {
	            return 255;
	        }
	        else if (val < 0) {
	            return 0;
	        }
	        else {
	            return Math.round(val);
	        }
	    });
	    /**
	    * get/set filter red value. Use with {@link Konva.Filters.RGBA} filter.
	    * @name red
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} red value between 0 and 255
	    * @returns {Integer}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'green', 0, function(val) {
	        this._filterUpToDate = false;
	        if (val > 255) {
	            return 255;
	        }
	        else if (val < 0) {
	            return 0;
	        }
	        else {
	            return Math.round(val);
	        }
	    });
	    /**
	    * get/set filter green value. Use with {@link Konva.Filters.RGBA} filter.
	    * @name green
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} green value between 0 and 255
	    * @returns {Integer}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'blue', 0, Konva.Validators.RGBComponent, Konva.Factory.afterSetFilter);
	    /**
	    * get/set filter blue value. Use with {@link Konva.Filters.RGBA} filter.
	    * @name blue
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} blue value between 0 and 255
	    * @returns {Integer}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'alpha', 1, function(val) {
	        this._filterUpToDate = false;
	        if (val > 1) {
	            return 1;
	        }
	        else if (val < 0) {
	            return 0;
	        }
	        else {
	            return val;
	        }
	    });
	    /**
	     * get/set filter alpha value. Use with {@link Konva.Filters.RGBA} filter.
	     * @name alpha
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Float} alpha value between 0 and 1
	     * @returns {Float}
	     */
	})();

	(function () {
	    'use strict';
	    /**
	    * HSV Filter. Adjusts the hue, saturation and value
	    * @function
	    * @name HSV
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @author ippo615
	    * @example
	    * image.filters([Konva.Filters.HSV]);
	    * image.value(200);
	    */

	    Konva.Filters.HSV = function (imageData) {
	        var data = imageData.data,
	            nPixels = data.length,
	            v = Math.pow(2, this.value()),
	            s = Math.pow(2, this.saturation()),
	            h = Math.abs((this.hue()) + 360) % 360,
	            i;

	        // Basis for the technique used:
	        // http://beesbuzz.biz/code/hsv_color_transforms.php
	        // V is the value multiplier (1 for none, 2 for double, 0.5 for half)
	        // S is the saturation multiplier (1 for none, 2 for double, 0.5 for half)
	        // H is the hue shift in degrees (0 to 360)
	        // vsu = V*S*cos(H*PI/180);
	        // vsw = V*S*sin(H*PI/180);
	        //[ .299V+.701vsu+.168vsw    .587V-.587vsu+.330vsw    .114V-.114vsu-.497vsw ] [R]
	        //[ .299V-.299vsu-.328vsw    .587V+.413vsu+.035vsw    .114V-.114vsu+.292vsw ]*[G]
	        //[ .299V-.300vsu+1.25vsw    .587V-.588vsu-1.05vsw    .114V+.886vsu-.203vsw ] [B]

	        // Precompute the values in the matrix:
	        var vsu = v * s * Math.cos(h * Math.PI / 180),
	            vsw = v * s * Math.sin(h * Math.PI / 180);
	        // (result spot)(source spot)
	        var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
	            rg = 0.587 * v - 0.587 * vsu + 0.330 * vsw,
	            rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
	        var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
	            gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
	            gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
	        var br = 0.299 * v - 0.300 * vsu + 1.250 * vsw,
	            bg = 0.587 * v - 0.586 * vsu - 1.050 * vsw,
	            bb = 0.114 * v + 0.886 * vsu - 0.200 * vsw;

	        var r, g, b, a;

	        for (i = 0; i < nPixels; i += 4) {
	            r = data[i + 0];
	            g = data[i + 1];
	            b = data[i + 2];
	            a = data[i + 3];

	            data[i + 0] = rr * r + rg * g + rb * b;
	            data[i + 1] = gr * r + gg * g + gb * b;
	            data[i + 2] = br * r + bg * g + bb * b;
	            data[i + 3] = a; // alpha
	        }

	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'hue', 0, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set hsv hue in degrees. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
	    * @name hue
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} hue value between 0 and 359
	    * @returns {Number}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'saturation', 0, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set hsv saturation. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
	    * @name saturation
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} saturation 0 is no change, -1.0 halves the saturation, 1.0 doubles, etc..
	    * @returns {Number}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'value', 0, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set hsv value. Use with {@link Konva.Filters.HSV} filter.
	    * @name value
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} value 0 is no change, -1.0 halves the value, 1.0 doubles, etc..
	    * @returns {Number}
	    */

	})();

	(function () {
	    'use strict';

	    Konva.Factory.addGetterSetter(Konva.Node, 'hue', 0, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set hsv hue in degrees. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
	    * @name hue
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} hue value between 0 and 359
	    * @returns {Number}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'saturation', 0, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set hsv saturation. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
	    * @name saturation
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} saturation 0 is no change, -1.0 halves the saturation, 1.0 doubles, etc..
	    * @returns {Number}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'luminance', 0, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set hsl luminance. Use with {@link Konva.Filters.HSL} filter.
	    * @name value
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} value 0 is no change, -1.0 halves the value, 1.0 doubles, etc..
	    * @returns {Number}
	    */

	    /**
	    * HSL Filter. Adjusts the hue, saturation and luminance (or lightness)
	    * @function
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @author ippo615
	    * @example
	    * image.filters([Konva.Filters.HSL]);
	    * image.luminance(200);
	    */

	    Konva.Filters.HSL = function (imageData) {
	        var data = imageData.data,
	            nPixels = data.length,
	            v = 1,
	            s = Math.pow(2, this.saturation()),
	            h = Math.abs((this.hue()) + 360) % 360,
	            l = this.luminance() * 127,
	            i;

	        // Basis for the technique used:
	        // http://beesbuzz.biz/code/hsv_color_transforms.php
	        // V is the value multiplier (1 for none, 2 for double, 0.5 for half)
	        // S is the saturation multiplier (1 for none, 2 for double, 0.5 for half)
	        // H is the hue shift in degrees (0 to 360)
	        // vsu = V*S*cos(H*PI/180);
	        // vsw = V*S*sin(H*PI/180);
	        //[ .299V+.701vsu+.168vsw    .587V-.587vsu+.330vsw    .114V-.114vsu-.497vsw ] [R]
	        //[ .299V-.299vsu-.328vsw    .587V+.413vsu+.035vsw    .114V-.114vsu+.292vsw ]*[G]
	        //[ .299V-.300vsu+1.25vsw    .587V-.588vsu-1.05vsw    .114V+.886vsu-.203vsw ] [B]

	        // Precompute the values in the matrix:
	        var vsu = v * s * Math.cos(h * Math.PI / 180),
	            vsw = v * s * Math.sin(h * Math.PI / 180);
	        // (result spot)(source spot)
	        var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
	            rg = 0.587 * v - 0.587 * vsu + 0.330 * vsw,
	            rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
	        var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
	            gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
	            gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
	        var br = 0.299 * v - 0.300 * vsu + 1.250 * vsw,
	            bg = 0.587 * v - 0.586 * vsu - 1.050 * vsw,
	            bb = 0.114 * v + 0.886 * vsu - 0.200 * vsw;

	        var r, g, b, a;

	        for (i = 0; i < nPixels; i += 4) {
	            r = data[i + 0];
	            g = data[i + 1];
	            b = data[i + 2];
	            a = data[i + 3];

	            data[i + 0] = rr * r + rg * g + rb * b + l;
	            data[i + 1] = gr * r + gg * g + gb * b + l;
	            data[i + 2] = br * r + bg * g + bb * b + l;
	            data[i + 3] = a; // alpha
	        }
	    };
	})();

	(function () {
	    'use strict';
	    /**
	     * Emboss Filter.
	     * Pixastic Lib - Emboss filter - v0.1.0
	     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	     * License: [http://www.pixastic.com/lib/license.txt]
	     * @function
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Emboss]);
	     * node.embossStrength(0.8);
	     * node.embossWhiteLevel(0.3);
	     * node.embossDirection('right');
	     * node.embossBlend(true);
	     */
	    Konva.Filters.Emboss = function (imageData) {

	        // pixastic strength is between 0 and 10.  I want it between 0 and 1
	        // pixastic greyLevel is between 0 and 255.  I want it between 0 and 1.  Also,
	        // a max value of greyLevel yields a white emboss, and the min value yields a black
	        // emboss.  Therefore, I changed greyLevel to whiteLevel
	        var strength = this.embossStrength() * 10,
	            greyLevel = this.embossWhiteLevel() * 255,
	            direction = this.embossDirection(),
	            blend = this.embossBlend(),
	            dirY = 0,
	            dirX = 0,
	            data = imageData.data,
	            w = imageData.width,
	            h = imageData.height,
	            w4 = w * 4,
	            y = h;

	        switch (direction) {
	            case 'top-left':
	                dirY = -1;
	                dirX = -1;
	                break;
	            case 'top':
	                dirY = -1;
	                dirX = 0;
	                break;
	            case 'top-right':
	                dirY = -1;
	                dirX = 1;
	                break;
	            case 'right':
	                dirY = 0;
	                dirX = 1;
	                break;
	            case 'bottom-right':
	                dirY = 1;
	                dirX = 1;
	                break;
	            case 'bottom':
	                dirY = 1;
	                dirX = 0;
	                break;
	            case 'bottom-left':
	                dirY = 1;
	                dirX = -1;
	                break;
	            case 'left':
	                dirY = 0;
	                dirX = -1;
	                break;
	        }

	        do {
	            var offsetY = (y - 1) * w4;

	            var otherY = dirY;
	            if (y + otherY < 1){
	                otherY = 0;
	            }
	            if (y + otherY > h) {
	                otherY = 0;
	            }

	            var offsetYOther = (y - 1 + otherY) * w * 4;

	            var x = w;
	            do {
	                var offset = offsetY + (x - 1) * 4;

	                var otherX = dirX;
	                if (x + otherX < 1){
	                    otherX = 0;
	                }
	                if (x + otherX > w) {
	                    otherX = 0;
	                }

	                var offsetOther = offsetYOther + (x - 1 + otherX) * 4;

	                var dR = data[offset] - data[offsetOther];
	                var dG = data[offset + 1] - data[offsetOther + 1];
	                var dB = data[offset + 2] - data[offsetOther + 2];

	                var dif = dR;
	                var absDif = dif > 0 ? dif : -dif;

	                var absG = dG > 0 ? dG : -dG;
	                var absB = dB > 0 ? dB : -dB;

	                if (absG > absDif) {
	                    dif = dG;
	                }
	                if (absB > absDif) {
	                    dif = dB;
	                }

	                dif *= strength;

	                if (blend) {
	                    var r = data[offset] + dif;
	                    var g = data[offset + 1] + dif;
	                    var b = data[offset + 2] + dif;

	                    data[offset] = (r > 255) ? 255 : (r < 0 ? 0 : r);
	                    data[offset + 1] = (g > 255) ? 255 : (g < 0 ? 0 : g);
	                    data[offset + 2] = (b > 255) ? 255 : (b < 0 ? 0 : b);
	                } else {
	                    var grey = greyLevel - dif;
	                    if (grey < 0) {
	                        grey = 0;
	                    } else if (grey > 255) {
	                        grey = 255;
	                    }

	                    data[offset] = data[offset + 1] = data[offset + 2] = grey;
	                }

	            } while (--x);
	        } while (--y);
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'embossStrength', 0.5, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set emboss strength. Use with {@link Konva.Filters.Emboss} filter.
	    * @name embossStrength
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} level between 0 and 1.  Default is 0.5
	    * @returns {Number}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'embossWhiteLevel', 0.5, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set emboss white level. Use with {@link Konva.Filters.Emboss} filter.
	    * @name embossWhiteLevel
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} embossWhiteLevel between 0 and 1.  Default is 0.5
	    * @returns {Number}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'embossDirection', 'top-left', null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set emboss direction. Use with {@link Konva.Filters.Emboss} filter.
	    * @name embossDirection
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {String} embossDirection can be top-left, top, top-right, right, bottom-right, bottom, bottom-left or left
	    *   The default is top-left
	    * @returns {String}
	    */

	    Konva.Factory.addGetterSetter(Konva.Node, 'embossBlend', false, null, Konva.Factory.afterSetFilter);
	    /**
	    * get/set emboss blend. Use with {@link Konva.Filters.Emboss} filter.
	    * @name embossBlend
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Boolean} embossBlend
	    * @returns {Boolean}
	    */
	})();

	(function () {
	    'use strict';
	    function remap(fromValue, fromMin, fromMax, toMin, toMax) {
	        // Compute the range of the data
	        var fromRange = fromMax - fromMin,
	          toRange = toMax - toMin,
	          toValue;

	        // If either range is 0, then the value can only be mapped to 1 value
	        if (fromRange === 0) {
	            return toMin + toRange / 2;
	        }
	        if (toRange === 0) {
	            return toMin;
	        }

	        // (1) untranslate, (2) unscale, (3) rescale, (4) retranslate
	        toValue = (fromValue - fromMin) / fromRange;
	        toValue = (toRange * toValue) + toMin;

	        return toValue;
	    }


	    /**
	    * Enhance Filter. Adjusts the colors so that they span the widest
	    *  possible range (ie 0-255). Performs w*h pixel reads and w*h pixel
	    *  writes.
	    * @function
	    * @name Enhance
	    * @memberof Konva.Filters
	    * @param {Object} imageData
	    * @author ippo615
	    * @example
	    * node.cache();
	    * node.filters([Konva.Filters.Enhance]);
	    * node.enhance(0.4);
	    */
	    Konva.Filters.Enhance = function (imageData) {
	        var data = imageData.data,
	            nSubPixels = data.length,
	            rMin = data[0], rMax = rMin, r,
	            gMin = data[1], gMax = gMin, g,
	            bMin = data[2], bMax = bMin, b,
	            i;

	        // If we are not enhancing anything - don't do any computation
	        var enhanceAmount = this.enhance();
	        if( enhanceAmount === 0 ){ return; }

	        // 1st Pass - find the min and max for each channel:
	        for (i = 0; i < nSubPixels; i += 4) {
	            r = data[i + 0];
	            if (r < rMin) { rMin = r; }
	            else if (r > rMax) { rMax = r; }
	            g = data[i + 1];
	            if (g < gMin) { gMin = g; } else
	            if (g > gMax) { gMax = g; }
	            b = data[i + 2];
	            if (b < bMin) { bMin = b; } else
	            if (b > bMax) { bMax = b; }
	            //a = data[i + 3];
	            //if (a < aMin) { aMin = a; } else
	            //if (a > aMax) { aMax = a; }
	        }

	        // If there is only 1 level - don't remap
	        if( rMax === rMin ){ rMax = 255; rMin = 0; }
	        if( gMax === gMin ){ gMax = 255; gMin = 0; }
	        if( bMax === bMin ){ bMax = 255; bMin = 0; }

	        var rMid, rGoalMax, rGoalMin,
	            gMid, gGoalMax, gGoalMin,
	            bMid, bGoalMax, bGoalMin;

	        // If the enhancement is positive - stretch the histogram
	        if ( enhanceAmount > 0 ){
	            rGoalMax = rMax + enhanceAmount * (255 - rMax);
	            rGoalMin = rMin - enhanceAmount * (rMin - 0);
	            gGoalMax = gMax + enhanceAmount * (255 - gMax);
	            gGoalMin = gMin - enhanceAmount * (gMin - 0);
	            bGoalMax = bMax + enhanceAmount * (255 - bMax);
	            bGoalMin = bMin - enhanceAmount * (bMin - 0);
	        // If the enhancement is negative -   compress the histogram
	        } else {
	            rMid = (rMax + rMin) * 0.5;
	            rGoalMax = rMax + enhanceAmount * (rMax - rMid);
	            rGoalMin = rMin + enhanceAmount * (rMin - rMid);
	            gMid = (gMax + gMin) * 0.5;
	            gGoalMax = gMax + enhanceAmount * (gMax - gMid);
	            gGoalMin = gMin + enhanceAmount * (gMin - gMid);
	            bMid = (bMax + bMin) * 0.5;
	            bGoalMax = bMax + enhanceAmount * (bMax - bMid);
	            bGoalMin = bMin + enhanceAmount * (bMin - bMid);
	        }

	        // Pass 2 - remap everything, except the alpha
	        for (i = 0; i < nSubPixels; i += 4) {
	            data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
	            data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
	            data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
	            //data[i + 3] = remap(data[i + 3], aMin, aMax, aGoalMin, aGoalMax);
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'enhance', 0, null, Konva.Factory.afterSetFilter);

	    /**
	    * get/set enhance. Use with {@link Konva.Filters.Enhance} filter.
	    * @name enhance
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Float} amount
	    * @returns {Float}
	    */
	})();

	(function () {
	    'use strict';
	    /**
	     * Posterize Filter. Adjusts the channels so that there are no more
	     *  than n different values for that channel. This is also applied
	     *  to the alpha channel.
	     * @function
	     * @name Posterize
	     * @author ippo615
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Posterize]);
	     * node.levels(0.8);
	     */

	    Konva.Filters.Posterize = function (imageData) {
	        // level must be between 1 and 255
	        var levels = Math.round(this.levels() * 254) + 1,
	            data = imageData.data,
	            len = data.length,
	            scale = (255 / levels),
	            i;

	        for (i = 0; i < len; i += 1) {
	            data[i] = Math.floor(data[i] / scale) * scale;
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'levels', 0.5, null, Konva.Factory.afterSetFilter);

	    /**
	    * get/set levels.  Must be a number between 0 and 1.  Use with {@link Konva.Filters.Posterize} filter.
	    * @name levels
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} level between 0 and 1
	    * @returns {Number}
	    */
	})();

	(function () {
	    'use strict';

	    /**
	     * Noise Filter. Randomly adds or substracts to the color channels
	     * @function
	     * @name Noise
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author ippo615
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Noise]);
	     * node.noise(0.8);
	     */
	    Konva.Filters.Noise = function (imageData) {
	        var amount = this.noise() * 255,
	            data = imageData.data,
	            nPixels = data.length,
	            half = amount / 2,
	            i;

	        for (i = 0; i < nPixels; i += 4) {
	            data[i + 0] += half - 2 * half * Math.random();
	            data[i + 1] += half - 2 * half * Math.random();
	            data[i + 2] += half - 2 * half * Math.random();
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'noise', 0.2, null, Konva.Factory.afterSetFilter);

	    /**
	    * get/set noise amount.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Noise} filter.
	    * @name noise
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} noise
	    * @returns {Number}
	    */
	})();

	/*eslint-disable max-depth */
	(function () {
	    'use strict';
	    /**
	     * Pixelate Filter. Averages groups of pixels and redraws
	     *  them as larger pixels
	     * @function
	     * @name Pixelate
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author ippo615
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Pixelate]);
	     * node.pixelSize(10);
	     */

	    Konva.Filters.Pixelate = function (imageData) {

	        var pixelSize = Math.ceil(this.pixelSize()),
	            width = imageData.width,
	            height = imageData.height,
	            x, y, i,
	            //pixelsPerBin = pixelSize * pixelSize,
	            red, green, blue, alpha,
	            nBinsX = Math.ceil(width / pixelSize),
	            nBinsY = Math.ceil(height / pixelSize),
	            xBinStart, xBinEnd, yBinStart, yBinEnd,
	            xBin, yBin, pixelsInBin;
	        imageData = imageData.data;

	        for (xBin = 0; xBin < nBinsX; xBin += 1) {
	            for (yBin = 0; yBin < nBinsY; yBin += 1) {

	                // Initialize the color accumlators to 0
	                red = 0;
	                green = 0;
	                blue = 0;
	                alpha = 0;

	                // Determine which pixels are included in this bin
	                xBinStart = xBin * pixelSize;
	                xBinEnd = xBinStart + pixelSize;
	                yBinStart = yBin * pixelSize;
	                yBinEnd = yBinStart + pixelSize;

	                // Add all of the pixels to this bin!
	                pixelsInBin = 0;
	                for (x = xBinStart; x < xBinEnd; x += 1) {
	                    if( x >= width ){ continue; }
	                    for (y = yBinStart; y < yBinEnd; y += 1) {
	                        if( y >= height ){ continue; }
	                        i = (width * y + x) * 4;
	                        red += imageData[i + 0];
	                        green += imageData[i + 1];
	                        blue += imageData[i + 2];
	                        alpha += imageData[i + 3];
	                        pixelsInBin += 1;
	                    }
	                }

	                // Make sure the channels are between 0-255
	                red = red / pixelsInBin;
	                green = green / pixelsInBin;
	                blue = blue / pixelsInBin;

	                // Draw this bin
	                for (x = xBinStart; x < xBinEnd; x += 1) {
	                    if( x >= width ){ continue; }
	                    for (y = yBinStart; y < yBinEnd; y += 1) {
	                        if( y >= height ){ continue; }
	                        i = (width * y + x) * 4;
	                        imageData[i + 0] = red;
	                        imageData[i + 1] = green;
	                        imageData[i + 2] = blue;
	                        imageData[i + 3] = alpha;
	                    }
	                }
	            }
	        }

	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'pixelSize', 8, null, Konva.Factory.afterSetFilter);

	    /**
	    * get/set pixel size. Use with {@link Konva.Filters.Pixelate} filter.
	    * @name pixelSize
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} pixelSize
	    * @returns {Integer}
	    */
	})();

	(function () {
	    'use strict';
	    /**
	     * Threshold Filter. Pushes any value above the mid point to
	     *  the max and any value below the mid point to the min.
	     *  This affects the alpha channel.
	     * @function
	     * @name Threshold
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author ippo615
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Threshold]);
	     * node.threshold(0.1);
	     */

	    Konva.Filters.Threshold = function (imageData) {
	        var level = this.threshold() * 255,
	            data = imageData.data,
	            len = data.length,
	            i;

	        for (i = 0; i < len; i += 1) {
	            data[i] = data[i] < level ? 0 : 255;
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'threshold', 0.5, null, Konva.Factory.afterSetFilter);

	    /**
	    * get/set threshold.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Threshold} or {@link Konva.Filters.Mask} filter.
	    * @name threshold
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Number} threshold
	    * @returns {Number}
	    */
	})();

	(function() {
	    'use strict';
	    /**
	     * Sepia Filter
	     * Based on: Pixastic Lib - Sepia filter - v0.1.0
	     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	     * @function
	     * @name Sepia
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @author Jacob Seidelin <jseidelin@nihilogic.dk>
	     * @license MPL v1.1 [http://www.pixastic.com/lib/license.txt]
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Sepia]);
	     */
	    Konva.Filters.Sepia = function (imageData) {
	        var data = imageData.data,
	            w = imageData.width,
	            y = imageData.height,
	            w4 = w * 4,
	            offsetY, x, offset, or, og, ob, r, g, b;

	        do {
	            offsetY = (y - 1) * w4;
	            x = w;
	            do {
	                offset = offsetY + (x - 1) * 4;

	                or = data[offset];
	                og = data[offset + 1];
	                ob = data[offset + 2];

	                r = or * 0.393 + og * 0.769 + ob * 0.189;
	                g = or * 0.349 + og * 0.686 + ob * 0.168;
	                b = or * 0.272 + og * 0.534 + ob * 0.131;

	                data[offset] = r > 255 ? 255 : r;
	                data[offset + 1] = g > 255 ? 255 : g;
	                data[offset + 2] = b > 255 ? 255 : b;
	                data[offset + 3] = data[offset + 3];
	            } while (--x);
	        } while (--y);
	    };
	})();

	(function () {
	    'use strict';
	    /**
	     * Solarize Filter
	     * Pixastic Lib - Solarize filter - v0.1.0
	     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	     * License: [http://www.pixastic.com/lib/license.txt]
	     * @function
	     * @name Solarize
	     * @memberof Konva.Filters
	     * @param {Object} imageData
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Solarize]);
	     */
	    Konva.Filters.Solarize = function (imageData) {
	        var data = imageData.data,
	            w = imageData.width,
	            h = imageData.height,
	            w4 = w * 4,
	            y = h;

	        do {
	            var offsetY = (y - 1) * w4;
	            var x = w;
	            do {
	                var offset = offsetY + (x - 1) * 4;
	                var r = data[offset];
	                var g = data[offset + 1];
	                var b = data[offset + 2];

	                if (r > 127) {
	                    r = 255 - r;
	                }
	                if (g > 127) {
	                    g = 255 - g;
	                }
	                if (b > 127) {
	                    b = 255 - b;
	                }

	                data[offset] = r;
	                data[offset + 1] = g;
	                data[offset + 2] = b;
	            } while (--x);
	        } while (--y);
	    };
	})();



	(function () {
	    'use strict';

	  /*
	   * ToPolar Filter. Converts image data to polar coordinates. Performs
	   *  w*h*4 pixel reads and w*h pixel writes. The r axis is placed along
	   *  what would be the y axis and the theta axis along the x axis.
	   * @function
	   * @author ippo615
	   * @memberof Konva.Filters
	   * @param {ImageData} src, the source image data (what will be transformed)
	   * @param {ImageData} dst, the destination image data (where it will be saved)
	   * @param {Object} opt
	   * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
	   *  default is in the middle
	   * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
	   *  default is in the middle
	   */

	    var ToPolar = function(src, dst, opt){

	        var srcPixels = src.data,
	            dstPixels = dst.data,
	            xSize = src.width,
	            ySize = src.height,
	            xMid = opt.polarCenterX || xSize / 2,
	            yMid = opt.polarCenterY || ySize / 2,
	            i, x, y, r = 0, g = 0, b = 0, a = 0;

	        // Find the largest radius
	        var rad, rMax = Math.sqrt( xMid * xMid + yMid * yMid );
	        x = xSize - xMid;
	        y = ySize - yMid;
	        rad = Math.sqrt( x * x + y * y );
	        rMax = (rad > rMax) ? rad : rMax;

	        // We'll be uisng y as the radius, and x as the angle (theta=t)
	        var rSize = ySize,
	            tSize = xSize,
	            radius, theta;

	        // We want to cover all angles (0-360) and we need to convert to
	        // radians (*PI/180)
	        var conversion = 360 / tSize * Math.PI / 180, sin, cos;

	        // var x1, x2, x1i, x2i, y1, y2, y1i, y2i, scale;

	        for( theta = 0; theta < tSize; theta += 1 ){
	            sin = Math.sin(theta * conversion);
	            cos = Math.cos(theta * conversion);
	            for( radius = 0; radius < rSize; radius += 1 ){
	                x = Math.floor(xMid + rMax * radius / rSize * cos);
	                y = Math.floor(yMid + rMax * radius / rSize * sin);
	                i = (y * xSize + x) * 4;
	                r = srcPixels[i + 0];
	                g = srcPixels[i + 1];
	                b = srcPixels[i + 2];
	                a = srcPixels[i + 3];

	                // Store it
	                //i = (theta * xSize  +  radius) * 4;
	                i = (theta + radius * xSize) * 4;
	                dstPixels[i + 0] = r;
	                dstPixels[i + 1] = g;
	                dstPixels[i + 2] = b;
	                dstPixels[i + 3] = a;

	            }
	        }
	    };

	    /*
	     * FromPolar Filter. Converts image data from polar coordinates back to rectangular.
	     *  Performs w*h*4 pixel reads and w*h pixel writes.
	     * @function
	     * @author ippo615
	     * @memberof Konva.Filters
	     * @param {ImageData} src, the source image data (what will be transformed)
	     * @param {ImageData} dst, the destination image data (where it will be saved)
	     * @param {Object} opt
	     * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
	     *  default is in the middle
	     * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
	     *  default is in the middle
	     * @param {Number} [opt.polarRotation] amount to rotate the image counterclockwis,
	     *  0 is no rotation, 360 degrees is a full rotation
	     */

	    var FromPolar = function(src, dst, opt){

	        var srcPixels = src.data,
	            dstPixels = dst.data,
	            xSize = src.width,
	            ySize = src.height,
	            xMid = opt.polarCenterX || xSize / 2,
	            yMid = opt.polarCenterY || ySize / 2,
	            i, x, y, dx, dy, r = 0, g = 0, b = 0, a = 0;


	        // Find the largest radius
	        var rad, rMax = Math.sqrt( xMid * xMid + yMid * yMid );
	        x = xSize - xMid;
	        y = ySize - yMid;
	        rad = Math.sqrt( x * x + y * y );
	        rMax = (rad > rMax) ? rad : rMax;

	        // We'll be uisng x as the radius, and y as the angle (theta=t)
	        var rSize = ySize,
	        tSize = xSize,
	        radius, theta,
	        phaseShift = opt.polarRotation || 0;

	        // We need to convert to degrees and we need to make sure
	        // it's between (0-360)
	        // var conversion = tSize/360*180/Math.PI;
	        //var conversion = tSize/360*180/Math.PI;

	        var x1, y1;

	        for( x = 0; x < xSize; x += 1 ){
	            for( y = 0; y < ySize; y += 1 ){
	                dx = x - xMid;
	                dy = y - yMid;
	                radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
	                theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
	                theta = theta * tSize / 360;
	                x1 = Math.floor(theta);
	                y1 = Math.floor(radius);
	                i = (y1 * xSize + x1) * 4;
	                r = srcPixels[i + 0];
	                g = srcPixels[i + 1];
	                b = srcPixels[i + 2];
	                a = srcPixels[i + 3];

	                // Store it
	                i = (y * xSize + x) * 4;
	                dstPixels[i + 0] = r;
	                dstPixels[i + 1] = g;
	                dstPixels[i + 2] = b;
	                dstPixels[i + 3] = a;
	            }
	        }

	    };

	    //Konva.Filters.ToPolar = Konva.Util._FilterWrapDoubleBuffer(ToPolar);
	    //Konva.Filters.FromPolar = Konva.Util._FilterWrapDoubleBuffer(FromPolar);

	    // create a temporary canvas for working - shared between multiple calls
	    var tempCanvas = Konva.Util.createCanvasElement();

	    /*
	     * Kaleidoscope Filter.
	     * @function
	     * @name Kaleidoscope
	     * @author ippo615
	     * @memberof Konva.Filters
	     * @example
	     * node.cache();
	     * node.filters([Konva.Filters.Kaleidoscope]);
	     * node.kaleidoscopePower(3);
	     * node.kaleidoscopeAngle(45);
	     */
	    Konva.Filters.Kaleidoscope = function(imageData){
	        var xSize = imageData.width,
	            ySize = imageData.height;

	        var x, y, xoff, i, r, g, b, a, srcPos, dstPos;
	        var power = Math.round( this.kaleidoscopePower() );
	        var angle = Math.round( this.kaleidoscopeAngle() );
	        var offset = Math.floor(xSize * (angle % 360) / 360);

	        if( power < 1 ){return; }

	        // Work with our shared buffer canvas
	        tempCanvas.width = xSize;
	        tempCanvas.height = ySize;
	        var scratchData = tempCanvas.getContext('2d').getImageData(0, 0, xSize, ySize);

	        // Convert thhe original to polar coordinates
	        ToPolar( imageData, scratchData, {
	            polarCenterX: xSize / 2,
	            polarCenterY: ySize / 2
	        });

	        // Determine how big each section will be, if it's too small
	        // make it bigger
	        var minSectionSize = xSize / Math.pow(2, power);
	        while( minSectionSize <= 8){
	            minSectionSize = minSectionSize * 2;
	            power -= 1;
	        }
	        minSectionSize = Math.ceil(minSectionSize);
	        var sectionSize = minSectionSize;

	        // Copy the offset region to 0
	        // Depending on the size of filter and location of the offset we may need
	        // to copy the section backwards to prevent it from rewriting itself
	        var xStart = 0,
	          xEnd = sectionSize,
	          xDelta = 1;
	        if( offset + minSectionSize > xSize ){
	            xStart = sectionSize;
	            xEnd = 0;
	            xDelta = -1;
	        }
	        for( y = 0; y < ySize; y += 1 ){
	            for( x = xStart; x !== xEnd; x += xDelta ){
	                xoff = Math.round(x + offset) % xSize;
	                srcPos = (xSize * y + xoff) * 4;
	                r = scratchData.data[srcPos + 0];
	                g = scratchData.data[srcPos + 1];
	                b = scratchData.data[srcPos + 2];
	                a = scratchData.data[srcPos + 3];
	                dstPos = (xSize * y + x) * 4;
	                scratchData.data[dstPos + 0] = r;
	                scratchData.data[dstPos + 1] = g;
	                scratchData.data[dstPos + 2] = b;
	                scratchData.data[dstPos + 3] = a;
	            }
	        }

	        // Perform the actual effect
	        for( y = 0; y < ySize; y += 1 ){
	            sectionSize = Math.floor( minSectionSize );
	            for( i = 0; i < power; i += 1 ){
	                for( x = 0; x < sectionSize + 1; x += 1 ){
	                    srcPos = (xSize * y + x) * 4;
	                    r = scratchData.data[srcPos + 0];
	                    g = scratchData.data[srcPos + 1];
	                    b = scratchData.data[srcPos + 2];
	                    a = scratchData.data[srcPos + 3];
	                    dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
	                    scratchData.data[dstPos + 0] = r;
	                    scratchData.data[dstPos + 1] = g;
	                    scratchData.data[dstPos + 2] = b;
	                    scratchData.data[dstPos + 3] = a;
	                }
	                sectionSize *= 2;
	            }
	        }

	        // Convert back from polar coordinates
	        FromPolar(scratchData, imageData, {polarRotation: 0});
	    };

	    /**
	    * get/set kaleidoscope power. Use with {@link Konva.Filters.Kaleidoscope} filter.
	    * @name kaleidoscopePower
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} power of kaleidoscope
	    * @returns {Integer}
	    */
	    Konva.Factory.addGetterSetter(Konva.Node, 'kaleidoscopePower', 2, null, Konva.Factory.afterSetFilter);

	    /**
	    * get/set kaleidoscope angle. Use with {@link Konva.Filters.Kaleidoscope} filter.
	    * @name kaleidoscopeAngle
	    * @method
	    * @memberof Konva.Node.prototype
	    * @param {Integer} degrees
	    * @returns {Integer}
	    */
	    Konva.Factory.addGetterSetter(Konva.Node, 'kaleidoscopeAngle', 0, null, Konva.Factory.afterSetFilter);

	})();

	(function() {
	    'use strict';
	    /**
	     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Node
	     * @abstract
	     * @param {Object} config
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height

	     */
	    Konva.Container = function(config) {
	        this.__init(config);
	    };

	    Konva.Util.addMethods(Konva.Container, {
	        __init: function(config) {
	            this.children = new Konva.Collection();
	            Konva.Node.call(this, config);
	        },
	        /**
	         * returns a {@link Konva.Collection} of direct descendant nodes
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {Function} [filterFunc] filter function
	         * @returns {Konva.Collection}
	         * @example
	         * // get all children
	         * var children = layer.getChildren();
	         *
	         * // get only circles
	         * var circles = layer.getChildren(function(node){
	         *    return node.getClassName() === 'Circle';
	         * });
	         */
	        getChildren: function(filterFunc) {
	            if (!filterFunc) {
	                return this.children;
	            }

	            var results = new Konva.Collection();
	            this.children.each(function(child){
	                if (filterFunc(child)) {
	                    results.push(child);
	                }
	            });
	            return results;
	        },
	        /**
	         * determine if node has children
	         * @method
	         * @memberof Konva.Container.prototype
	         * @returns {Boolean}
	         */
	        hasChildren: function() {
	            return this.getChildren().length > 0;
	        },
	        /**
	         * remove all children
	         * @method
	         * @memberof Konva.Container.prototype
	         */
	        removeChildren: function() {
	            var children = Konva.Collection.toCollection(this.children);
	            var child;
	            for (var i = 0; i < children.length; i++) {
	                child = children[i];
	                // reset parent to prevent many _setChildrenIndices calls
	                delete child.parent;
	                child.index = 0;
	                if (child.hasChildren()) {
	                    child.removeChildren();
	                }
	                child.remove();
	            }
	            children = null;
	            this.children = new Konva.Collection();
	            return this;
	        },
	        /**
	         * destroy all children
	         * @method
	         * @memberof Konva.Container.prototype
	         */
	        destroyChildren: function() {
	           var children = Konva.Collection.toCollection(this.children);
	            var child;
	            for (var i = 0; i < children.length; i++) {
	                child = children[i];
	                // reset parent to prevent many _setChildrenIndices calls
	                delete child.parent;
	                child.index = 0;
	                child.destroy();
	            }
	            children = null;
	            this.children = new Konva.Collection();
	            return this;
	        },
	        /**
	         * Add node or nodes to container.
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {...Konva.Node} child
	         * @returns {Container}
	         * @example
	         * layer.add(shape1, shape2, shape3);
	         */
	        add: function(child) {
	            if (arguments.length > 1) {
	                for (var i = 0; i < arguments.length; i++) {
	                    this.add(arguments[i]);
	                }
	                return this;
	            }
	            if (child.getParent()) {
	                child.moveTo(this);
	                return this;
	            }
	            var children = this.children;
	            this._validateAdd(child);
	            child.index = children.length;
	            child.parent = this;
	            children.push(child);
	            this._fire('add', {
	                child: child
	            });

	            // if node under drag we need to update drag animation
	            if (Konva.DD && child.isDragging()) {
	                Konva.DD.anim.setLayers(child.getLayer());
	            }

	            // chainable
	            return this;
	        },
	        destroy: function() {
	            // destroy children
	            if (this.hasChildren()) {
	                this.destroyChildren();
	            }
	            // then destroy self
	            Konva.Node.prototype.destroy.call(this);
	            return this;
	        },
	        /**
	         * return a {@link Konva.Collection} of nodes that match the selector.  Use '#' for id selections
	         * and '.' for name selections.  You can also select by type or class name. Pass multiple selectors
	         * separated by a space.
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {String} selector
	         * @returns {Collection}
	         * @example
	         * // select node with id foo
	         * var node = stage.find('#foo');
	         *
	         * // select nodes with name bar inside layer
	         * var nodes = layer.find('.bar');
	         *
	         * // select all groups inside layer
	         * var nodes = layer.find('Group');
	         *
	         * // select all rectangles inside layer
	         * var nodes = layer.find('Rect');
	         *
	         * // select node with an id of foo or a name of bar inside layer
	         * var nodes = layer.find('#foo, .bar');
	         */
	        find: function(selector) {
	            var retArr = [],
	                selectorArr = selector.replace(/ /g, '').split(','),
	                len = selectorArr.length,
	                n, i, sel, arr, node, children, clen;

	            for (n = 0; n < len; n++) {
	                sel = selectorArr[n];
	                if (!Konva.Util.isValidSelector(sel)) {
	                    Konva.Util.warn('Selector "' + sel + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
	                    Konva.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
	                    Konva.Util.warn('Konva is awesome, right?');
	                }
	                // id selector
	                if(sel.charAt(0) === '#') {
	                    node = this._getNodeById(sel.slice(1));
	                    if(node) {
	                        retArr.push(node);
	                    }
	                }
	                // name selector
	                else if(sel.charAt(0) === '.') {
	                    arr = this._getNodesByName(sel.slice(1));
	                    retArr = retArr.concat(arr);
	                }
	                // unrecognized selector, pass to children
	                else {
	                    children = this.getChildren();
	                    clen = children.length;
	                    for(i = 0; i < clen; i++) {
	                        retArr = retArr.concat(children[i]._get(sel));
	                    }
	                }
	            }

	            return Konva.Collection.toCollection(retArr);
	        },
	        /**
	         * return a first node from `find` method
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {String} selector
	         * @returns {Konva.Node}
	         * @example
	         * // select node with id foo
	         * var node = stage.findOne('#foo');
	         *
	         * // select node with name bar inside layer
	         * var nodes = layer.findOne('.bar');
	         */
	        findOne: function(selector) {
	            return this.find(selector)[0];
	        },
	        _getNodeById: function(key) {
	            var node = Konva.ids[key];

	            if(node !== undefined && this.isAncestorOf(node)) {
	                return node;
	            }
	            return null;
	        },
	        _getNodesByName: function(key) {
	            var arr = Konva.names[key] || [];
	            return this._getDescendants(arr);
	        },
	        _get: function(selector) {
	            var retArr = Konva.Node.prototype._get.call(this, selector);
	            var children = this.getChildren();
	            var len = children.length;
	            for(var n = 0; n < len; n++) {
	                retArr = retArr.concat(children[n]._get(selector));
	            }
	            return retArr;
	        },
	        // extenders
	        toObject: function() {
	            var obj = Konva.Node.prototype.toObject.call(this);

	            obj.children = [];

	            var children = this.getChildren();
	            var len = children.length;
	            for(var n = 0; n < len; n++) {
	                var child = children[n];
	                obj.children.push(child.toObject());
	            }

	            return obj;
	        },
	        _getDescendants: function(arr) {
	            var retArr = [];
	            var len = arr.length;
	            for(var n = 0; n < len; n++) {
	                var node = arr[n];
	                if(this.isAncestorOf(node)) {
	                    retArr.push(node);
	                }
	            }

	            return retArr;
	        },
	        /**
	         * determine if node is an ancestor
	         * of descendant
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {Konva.Node} node
	         */
	        isAncestorOf: function(node) {
	            var parent = node.getParent();
	            while(parent) {
	                if(parent._id === this._id) {
	                    return true;
	                }
	                parent = parent.getParent();
	            }

	            return false;
	        },
	        clone: function(obj) {
	            // call super method
	            var node = Konva.Node.prototype.clone.call(this, obj);

	            this.getChildren().each(function(no) {
	                node.add(no.clone());
	            });
	            return node;
	        },
	        /**
	         * get all shapes that intersect a point.  Note: because this method must clear a temporary
	         * canvas and redraw every shape inside the container, it should only be used for special sitations
	         * because it performs very poorly.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
	         * because it performs much better
	         * @method
	         * @memberof Konva.Container.prototype
	         * @param {Object} pos
	         * @param {Number} pos.x
	         * @param {Number} pos.y
	         * @returns {Array} array of shapes
	         */
	        getAllIntersections: function(pos) {
	            var arr = [];

	            this.find('Shape').each(function(shape) {
	                if(shape.isVisible() && shape.intersects(pos)) {
	                    arr.push(shape);
	                }
	            });

	            return arr;
	        },
	        _setChildrenIndices: function() {
	            this.children.each(function(child, n) {
	                child.index = n;
	            });
	        },
	        drawScene: function(can, top, caching) {
	            var layer = this.getLayer(),
	                canvas = can || (layer && layer.getCanvas()),
	                context = canvas && canvas.getContext(),
	                cachedCanvas = this._cache.canvas,
	                cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;

	            if (this.isVisible()) {
	                if (!caching && cachedSceneCanvas) {
	                    context.save();
	                    layer._applyTransform(this, context, top);
	                    this._drawCachedSceneCanvas(context);
	                    context.restore();
	                }
	                else {
	                    this._drawChildren(canvas, 'drawScene', top, false, caching);
	                }
	            }
	            return this;
	        },
	        drawHit: function(can, top, caching) {
	            var layer = this.getLayer(),
	                canvas = can || (layer && layer.hitCanvas),
	                context = canvas && canvas.getContext(),
	                cachedCanvas = this._cache.canvas,
	                cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

	            if (this.shouldDrawHit(canvas)) {
	                if (layer) {
	                    layer.clearHitCache();
	                }
	                if (!caching && cachedHitCanvas) {
	                    context.save();
	                    layer._applyTransform(this, context, top);
	                    this._drawCachedHitCanvas(context);
	                    context.restore();
	                }
	                else {
	                    this._drawChildren(canvas, 'drawHit', top);
	                }
	            }
	            return this;
	        },
	        _drawChildren: function(canvas, drawMethod, top, caching, skipBuffer) {
	            var layer = this.getLayer(),
	                context = canvas && canvas.getContext(),
	                clipWidth = this.getClipWidth(),
	                clipHeight = this.getClipHeight(),
	                hasClip = clipWidth && clipHeight,
	                clipX, clipY;

	            if (hasClip && layer) {
	                clipX = this.getClipX();
	                clipY = this.getClipY();

	                context.save();
	                layer._applyTransform(this, context);
	                context.beginPath();
	                context.rect(clipX, clipY, clipWidth, clipHeight);
	                context.clip();
	                context.reset();
	            }

	            this.children.each(function(child) {
	                child[drawMethod](canvas, top, caching, skipBuffer);
	            });

	            if (hasClip) {
	                context.restore();
	            }
	        },
	        shouldDrawHit: function(canvas) {
	            var layer = this.getLayer();
	            var dd = Konva.DD;
	            var layerUnderDrag = dd && Konva.isDragging() && (Konva.DD.anim.getLayers().indexOf(layer) !== -1);
	            return (canvas && canvas.isCache) || (layer && layer.hitGraphEnabled())
	                && this.isVisible() && !layerUnderDrag;
	        },
	        getClientRect: function(skipTransform) {
	            var minX, minY, maxX, maxY;
	            var selfRect = {
	                x: 0,
	                y: 0,
	                width: 0,
	                height: 0
	            };
	            this.children.each(function(child) {
	                var rect = child.getClientRect();

	                // skip invisible children (like empty groups)
	                // or don't skip... hmmm...
	                // if (rect.width === 0 && rect.height === 0) {
	                //     return;
	                // }

	                if (minX === undefined) { // initial value for first child
	                    minX = rect.x;
	                    minY = rect.y;
	                    maxX = rect.x + rect.width;
	                    maxY = rect.y + rect.height;
	                } else {
	                    minX = Math.min(minX, rect.x);
	                    minY = Math.min(minY, rect.y);
	                    maxX = Math.max(maxX, rect.x + rect.width);
	                    maxY = Math.max(maxY, rect.y + rect.height);
	                }

	            });

	            if (this.children.length !== 0) {
	                selfRect = {
	                    x: minX,
	                    y: minY,
	                    width: maxX - minX,
	                    height: maxY - minY
	                };
	            }

	            if (!skipTransform) {
	                return this._transformedRect(selfRect);
	            }
	            return selfRect;
	        }
	    });

	    Konva.Util.extend(Konva.Container, Konva.Node);
	    // deprecated methods
	    Konva.Container.prototype.get = Konva.Container.prototype.find;

	    // add getters setters
	    Konva.Factory.addComponentsGetterSetter(Konva.Container, 'clip', ['x', 'y', 'width', 'height']);
	    /**
	     * get/set clip
	     * @method
	     * @name clip
	     * @memberof Konva.Container.prototype
	     * @param {Object} clip
	     * @param {Number} clip.x
	     * @param {Number} clip.y
	     * @param {Number} clip.width
	     * @param {Number} clip.height
	     * @returns {Object}
	     * @example
	     * // get clip
	     * var clip = container.clip();
	     *
	     * // set clip
	     * container.setClip({
	     *   x: 20,
	     *   y: 20,
	     *   width: 20,
	     *   height: 20
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Container, 'clipX');
	    /**
	     * get/set clip x
	     * @name clipX
	     * @method
	     * @memberof Konva.Container.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get clip x
	     * var clipX = container.clipX();
	     *
	     * // set clip x
	     * container.clipX(10);
	     */

	    Konva.Factory.addGetterSetter(Konva.Container, 'clipY');
	    /**
	     * get/set clip y
	     * @name clipY
	     * @method
	     * @memberof Konva.Container.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get clip y
	     * var clipY = container.clipY();
	     *
	     * // set clip y
	     * container.clipY(10);
	     */

	    Konva.Factory.addGetterSetter(Konva.Container, 'clipWidth');
	    /**
	     * get/set clip width
	     * @name clipWidth
	     * @method
	     * @memberof Konva.Container.prototype
	     * @param {Number} width
	     * @returns {Number}
	     * @example
	     * // get clip width
	     * var clipWidth = container.clipWidth();
	     *
	     * // set clip width
	     * container.clipWidth(100);
	     */

	    Konva.Factory.addGetterSetter(Konva.Container, 'clipHeight');
	    /**
	     * get/set clip height
	     * @name clipHeight
	     * @method
	     * @memberof Konva.Container.prototype
	     * @param {Number} height
	     * @returns {Number}
	     * @example
	     * // get clip height
	     * var clipHeight = container.clipHeight();
	     *
	     * // set clip height
	     * container.clipHeight(100);
	     */

	    Konva.Collection.mapMethods(Konva.Container);
	})();

	(function(Konva) {
	    'use strict';
	    var HAS_SHADOW = 'hasShadow';
	    var SHADOW_RGBA = 'shadowRGBA';

	    function _fillFunc(context) {
	        context.fill();
	    }
	    function _strokeFunc(context) {
	        context.stroke();
	    }
	    function _fillFuncHit(context) {
	        context.fill();
	    }
	    function _strokeFuncHit(context) {
	        context.stroke();
	    }

	    function _clearHasShadowCache() {
	        this._clearCache(HAS_SHADOW);
	    }

	    function _clearGetShadowRGBACache() {
	        this._clearCache(SHADOW_RGBA);
	    }

	    /**
	     * Shape constructor.  Shapes are primitive objects such as rectangles,
	     *  circles, text, lines, etc.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Node
	     * @param {Object} config
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var customShape = new Konva.Shape({
	         *   x: 5,
	         *   y: 10,
	         *   fill: 'red',
	         *   // a Konva.Canvas renderer is passed into the drawFunc function
	         *   drawFunc: function(context) {
	         *     context.beginPath();
	         *     context.moveTo(200, 50);
	         *     context.lineTo(420, 80);
	         *     context.quadraticCurveTo(300, 100, 260, 170);
	         *     context.closePath();
	         *     context.fillStrokeShape(this);
	         *   }
	         *});
	     */
	    Konva.Shape = function(config) {
	        this.__init(config);
	    };

	    Konva.Util.addMethods(Konva.Shape, {
	        __init: function(config) {
	            this.nodeType = 'Shape';
	            this._fillFunc = _fillFunc;
	            this._strokeFunc = _strokeFunc;
	            this._fillFuncHit = _fillFuncHit;
	            this._strokeFuncHit = _strokeFuncHit;

	            // set colorKey
	            var shapes = Konva.shapes;
	            var key;

	            while(true) {
	                key = Konva.Util.getRandomColor();
	                if(key && !( key in shapes)) {
	                    break;
	                }
	            }

	            this.colorKey = key;
	            shapes[key] = this;

	            // call super constructor
	            Konva.Node.call(this, config);

	            this.on('shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearHasShadowCache);

	            this.on('shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearGetShadowRGBACache);
	        },
	        hasChildren: function() {
	            return false;
	        },
	        getChildren: function() {
	            return [];
	        },
	        /**
	         * get canvas context tied to the layer
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Konva.Context}
	         */
	        getContext: function() {
	            return this.getLayer().getContext();
	        },
	        /**
	         * get canvas renderer tied to the layer.  Note that this returns a canvas renderer, not a canvas element
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Konva.Canvas}
	         */
	        getCanvas: function() {
	            return this.getLayer().getCanvas();
	        },
	        /**
	         * returns whether or not a shadow will be rendered
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Boolean}
	         */
	        hasShadow: function() {
	            return this._getCache(HAS_SHADOW, this._hasShadow);
	        },
	        _hasShadow: function() {
	            return this.getShadowEnabled() && (this.getShadowOpacity() !== 0 && !!(this.getShadowColor() || this.getShadowBlur() || this.getShadowOffsetX() || this.getShadowOffsetY()));
	        },
	        getShadowRGBA: function() {
	            return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
	        },
	        _getShadowRGBA: function() {
	            if (this.hasShadow()) {
	                var rgba = Konva.Util.colorToRGBA(this.shadowColor());
	                return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + (rgba.a * (this.getShadowOpacity() || 1)) + ')';
	            }
	        },
	        /**
	         * returns whether or not the shape will be filled
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Boolean}
	         */
	        hasFill: function() {
	            return !!(this.getFill() || this.getFillPatternImage() || this.getFillLinearGradientColorStops() || this.getFillRadialGradientColorStops());
	        },
	        /**
	         * returns whether or not the shape will be stroked
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @returns {Boolean}
	         */
	        hasStroke: function() {
	            return !!(this.stroke());
	        },
	        /**
	         * determines if point is in the shape, regardless if other shapes are on top of it.  Note: because
	         *  this method clears a temporary canvas and then redraws the shape, it performs very poorly if executed many times
	         *  consecutively.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
	         *  because it performs much better
	         * @method
	         * @memberof Konva.Shape.prototype
	         * @param {Object} point
	         * @param {Number} point.x
	         * @param {Number} point.y
	         * @returns {Boolean}
	         */
	        intersects: function(point) {
	            var stage = this.getStage(),
	                bufferHitCanvas = stage.bufferHitCanvas,
	                p;

	            bufferHitCanvas.getContext().clear();
	            this.drawScene(bufferHitCanvas);
	            p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
	            return p[3] > 0;
	        },
	        // extends Node.prototype.destroy
	        destroy: function() {
	            Konva.Node.prototype.destroy.call(this);
	            delete Konva.shapes[this.colorKey];
	            return this;
	        },
	        _useBufferCanvas: function(caching) {
	            return !caching && (this.perfectDrawEnabled() && (this.getAbsoluteOpacity() !== 1) && this.hasFill() && this.hasStroke() && this.getStage()) ||
	                   (this.perfectDrawEnabled() && this.hasShadow() && (this.getAbsoluteOpacity() !== 1) && this.hasFill() && this.hasStroke() && this.getStage());
	        },
	        /**
	         * return self rectangle (x, y, width, height) of shape.
	         * This method are not taken into account transformation and styles.
	         * @method
	         * @memberof Konva.Node.prototype
	         * @returns {Object} rect with {x, y, width, height} properties
	         * @example
	         *
	         * rect.getSelfRect();  // return {x:0, y:0, width:rect.width(), height:rect.height()}
	         * circle.getSelfRect();  // return {x: - circle.width() / 2, y: - circle.height() / 2, width:circle.width(), height:circle.height()}
	         *
	         */
	        getSelfRect: function() {
	            var size = this.getSize();
	            return {
	                x: this._centroid ? Math.round(-size.width / 2) : 0,
	                y: this._centroid ? Math.round(-size.height / 2) : 0,
	                width: size.width,
	                height: size.height
	            };
	        },
	        getClientRect: function(skipTransform) {
	            var fillRect = this.getSelfRect();

	            var strokeWidth = (this.hasStroke() && this.strokeWidth()) || 0;
	            var fillAndStrokeWidth = fillRect.width + strokeWidth;
	            var fillAndStrokeHeight = fillRect.height + strokeWidth;

	            var shadowOffsetX = this.shadowOffsetX();
	            var shadowOffsetY = this.shadowOffsetY();

	            var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
	            var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);

	            var blurRadius = (this.hasShadow() && this.shadowBlur() || 0);

	            var width = preWidth + blurRadius * 2;
	            var height = preHeight + blurRadius * 2;

	            // if stroke, for example = 3
	            // we need to set x to 1.5, but after Math.round it will be 2
	            // as we have additional offset we need to increase width and height by 1 pixel
	            var roundingOffset = 0;
	            if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
	                roundingOffset = 1;
	            }
	            var rect = {
	                width: width + roundingOffset,
	                height: height + roundingOffset,
	                x: -Math.round(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetX, 0) + fillRect.x,
	                y: -Math.round(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetY, 0) + fillRect.y
	            };
	            if (!skipTransform) {
	                return this._transformedRect(rect);
	            }
	            return rect;
	        },
	        drawScene: function(can, top, caching, skipBuffer) {
	            var layer = this.getLayer(),
	                canvas = can || layer.getCanvas(),
	                context = canvas.getContext(),
	                cachedCanvas = this._cache.canvas,
	                drawFunc = this.sceneFunc(),
	                hasShadow = this.hasShadow(),
	                hasStroke = this.hasStroke(),
	                stage, bufferCanvas, bufferContext;

	            if(!this.isVisible()) {
	                return this;
	            }
	            if (cachedCanvas) {
	                context.save();
	                layer._applyTransform(this, context, top);
	                this._drawCachedSceneCanvas(context);
	                context.restore();
	                return this;
	            }
	            if (!drawFunc) {
	                return this;
	            }
	            context.save();
	            // if buffer canvas is needed
	            if (this._useBufferCanvas(caching) && !skipBuffer) {
	                stage = this.getStage();
	                bufferCanvas = stage.bufferCanvas;
	                bufferContext = bufferCanvas.getContext();
	                bufferContext.clear();
	                bufferContext.save();
	                bufferContext._applyLineJoin(this);
	                // layer might be undefined if we are using cache before adding to layer
	                if (!caching) {
	                    if (layer) {
	                        layer._applyTransform(this, bufferContext, top);
	                    } else {
	                        var m = this.getAbsoluteTransform(top).getMatrix();
	                        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	                    }
	                }

	                drawFunc.call(this, bufferContext);
	                bufferContext.restore();

	                var ratio = bufferCanvas.pixelRatio;
	                if (hasShadow && !canvas.hitCanvas) {
	                        context.save();
	                        context._applyShadow(this);
	                        context._applyOpacity(this);
	                        context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
	                        context.restore();
	                } else {
	                    context._applyOpacity(this);
	                    context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
	                }
	            }
	            // if buffer canvas is not needed
	            else {
	                context._applyLineJoin(this);
	                // layer might be undefined if we are using cache before adding to layer
	                if (!caching) {
	                    if (layer) {
	                        layer._applyTransform(this, context, top);
	                    } else {
	                        var o = this.getAbsoluteTransform(top).getMatrix();
	                        context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
	                    }
	                }

	                if (hasShadow && hasStroke && !canvas.hitCanvas) {
	                    context.save();
	                    // apply shadow
	                    if (!caching) {
	                        context._applyOpacity(this);
	                    }
	                    context._applyShadow(this);
	                    drawFunc.call(this, context);
	                    context.restore();
	                    // if shape has stroke we need to redraw shape
	                    // otherwise we will see a shadow under stroke (and over fill)
	                    // but I think this is unexpected behavior
	                    if (this.hasFill() && this.getShadowForStrokeEnabled()) {
	                        drawFunc.call(this, context);
	                    }
	                } else if (hasShadow && !canvas.hitCanvas) {
	                    context.save();
	                    if (!caching) {
	                        context._applyOpacity(this);
	                    }
	                    context._applyShadow(this);
	                    drawFunc.call(this, context);
	                    context.restore();
	                } else {
	                    if (!caching) {
	                        context._applyOpacity(this);
	                    }
	                    drawFunc.call(this, context);
	                }
	            }
	            context.restore();
	            return this;
	        },
	        drawHit: function(can, top, caching) {
	            var layer = this.getLayer(),
	                canvas = can || layer.hitCanvas,
	                context = canvas.getContext(),
	                drawFunc = this.hitFunc() || this.sceneFunc(),
	                cachedCanvas = this._cache.canvas,
	                cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

	            if(!this.shouldDrawHit(canvas)) {
	                return this;
	            }
	            if (layer) {
	                layer.clearHitCache();
	            }
	            if (cachedHitCanvas) {
	                context.save();
	                layer._applyTransform(this, context, top);
	                this._drawCachedHitCanvas(context);
	                context.restore();
	                return this;
	            }
	            if (!drawFunc) {
	                return this;
	            }
	            context.save();
	            context._applyLineJoin(this);
	            if (!caching) {
	                if (layer) {
	                    layer._applyTransform(this, context, top);
	                } else {
	                    var o = this.getAbsoluteTransform(top).getMatrix();
	                    context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
	                }
	            }
	            drawFunc.call(this, context);
	            context.restore();
	            return this;
	        },
	        /**
	        * draw hit graph using the cached scene canvas
	        * @method
	        * @memberof Konva.Shape.prototype
	        * @param {Integer} alphaThreshold alpha channel threshold that determines whether or not
	        *  a pixel should be drawn onto the hit graph.  Must be a value between 0 and 255.
	        *  The default is 0
	        * @returns {Konva.Shape}
	        * @example
	        * shape.cache();
	        * shape.drawHitFromCache();
	        */
	        drawHitFromCache: function(alphaThreshold) {
	            var threshold = alphaThreshold || 0,
	                cachedCanvas = this._cache.canvas,
	                sceneCanvas = this._getCachedSceneCanvas(),
	                hitCanvas = cachedCanvas.hit,
	                hitContext = hitCanvas.getContext(),
	                hitWidth = hitCanvas.getWidth(),
	                hitHeight = hitCanvas.getHeight(),
	                hitImageData, hitData, len, rgbColorKey, i, alpha;

	            hitContext.clear();
	            hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);

	            try {
	                hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
	                hitData = hitImageData.data;
	                len = hitData.length;
	                rgbColorKey = Konva.Util._hexToRgb(this.colorKey);

	                // replace non transparent pixels with color key
	                for(i = 0; i < len; i += 4) {
	                    alpha = hitData[i + 3];
	                    if (alpha > threshold) {
	                        hitData[i] = rgbColorKey.r;
	                        hitData[i + 1] = rgbColorKey.g;
	                        hitData[i + 2] = rgbColorKey.b;
	                        hitData[i + 3] = 255;
	                    }
	                    else {
	                        hitData[i + 3] = 0;
	                    }
	                }
	                hitContext.putImageData(hitImageData, 0, 0);
	            }
	            catch(e) {
	                Konva.Util.error('Unable to draw hit graph from cached scene canvas. ' + e.message);
	            }

	            return this;
	        }
	    });
	    Konva.Util.extend(Konva.Shape, Konva.Node);

	    // add getters and setters
	    Konva.Factory.addGetterSetter(Konva.Shape, 'stroke');

	    /**
	     * get/set stroke color
	     * @name stroke
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} color
	     * @returns {String}
	     * @example
	     * // get stroke color
	     * var stroke = shape.stroke();
	     *
	     * // set stroke color with color string
	     * shape.stroke('green');
	     *
	     * // set stroke color with hex
	     * shape.stroke('#00ff00');
	     *
	     * // set stroke color with rgb
	     * shape.stroke('rgb(0,255,0)');
	     *
	     * // set stroke color with rgba and make it 50% opaque
	     * shape.stroke('rgba(0,255,0,0.5');
	     */

	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'strokeRed', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'strokeGreen', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'strokeBlue', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'strokeAlpha', 1, Konva.Validators.alphaComponent);


	    Konva.Factory.addGetterSetter(Konva.Shape, 'strokeWidth', 2);

	    /**
	     * get/set stroke width
	     * @name strokeWidth
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} strokeWidth
	     * @returns {Number}
	     * @example
	     * // get stroke width
	     * var strokeWidth = shape.strokeWidth();
	     *
	     * // set stroke width
	     * shape.strokeWidth();
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'strokeHitEnabled', true);

	    /**
	     * get/set strokeHitEnabled property. Useful for performance optimization.
	     * You may set `shape.strokeHitEnabled(false)`. In this case stroke will be no draw on hit canvas, so hit area
	     * of shape will be decreased (by lineWidth / 2). Remember that non closed line with `strokeHitEnabled = false`
	     * will be not drawn on hit canvas, that is mean line will no trigger pointer events (like mouseover)
	     * Default value is true
	     * @name strokeHitEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} strokeHitEnabled
	     * @returns {Boolean}
	     * @example
	     * // get strokeHitEnabled
	     * var strokeHitEnabled = shape.strokeHitEnabled();
	     *
	     * // set strokeHitEnabled
	     * shape.strokeHitEnabled();
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'perfectDrawEnabled', true);

	    /**
	     * get/set perfectDrawEnabled. If a shape has fill, stroke and opacity you may set `perfectDrawEnabled` to improve performance.
	     * See http://konvajs.github.io/docs/performance/Disable_Perfect_Draw.html for more information.
	     * Default value is true
	     * @name perfectDrawEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} perfectDrawEnabled
	     * @returns {Boolean}
	     * @example
	     * // get perfectDrawEnabled
	     * var perfectDrawEnabled = shape.perfectDrawEnabled();
	     *
	     * // set perfectDrawEnabled
	     * shape.perfectDrawEnabled();
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'shadowForStrokeEnabled', true);

	    /**
	     * get/set shadowForStrokeEnabled. Useful for performance optimization.
	     * You may set `shape.shadowForStrokeEnabled(false)`. In this case stroke will be no draw shadow for stroke.
	     * Remember if you set `shadowForStrokeEnabled = false` for non closed line - that line with have no shadow!.
	     * Default value is true
	     * @name shadowForStrokeEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} shadowForStrokeEnabled
	     * @returns {Boolean}
	     * @example
	     * // get shadowForStrokeEnabled
	     * var shadowForStrokeEnabled = shape.shadowForStrokeEnabled();
	     *
	     * // set shadowForStrokeEnabled
	     * shape.shadowForStrokeEnabled();
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'lineJoin');

	    /**
	     * get/set line join.  Can be miter, round, or bevel.  The
	     *  default is miter
	     * @name lineJoin
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} lineJoin
	     * @returns {String}
	     * @example
	     * // get line join
	     * var lineJoin = shape.lineJoin();
	     *
	     * // set line join
	     * shape.lineJoin('round');
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'lineCap');

	    /**
	     * get/set line cap.  Can be butt, round, or square
	     * @name lineCap
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} lineCap
	     * @returns {String}
	     * @example
	     * // get line cap
	     * var lineCap = shape.lineCap();
	     *
	     * // set line cap
	     * shape.lineCap('round');
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'sceneFunc');

	    /**
	     * get/set scene draw function
	     * @name sceneFunc
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Function} drawFunc drawing function
	     * @returns {Function}
	     * @example
	     * // get scene draw function
	     * var sceneFunc = shape.sceneFunc();
	     *
	     * // set scene draw function
	     * shape.sceneFunc(function(context) {
	     *   context.beginPath();
	     *   context.rect(0, 0, this.width(), this.height());
	     *   context.closePath();
	     *   context.fillStrokeShape(this);
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'hitFunc');

	    /**
	     * get/set hit draw function
	     * @name hitFunc
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Function} drawFunc drawing function
	     * @returns {Function}
	     * @example
	     * // get hit draw function
	     * var hitFunc = shape.hitFunc();
	     *
	     * // set hit draw function
	     * shape.hitFunc(function(context) {
	     *   context.beginPath();
	     *   context.rect(0, 0, this.width(), this.height());
	     *   context.closePath();
	     *   context.fillStrokeShape(this);
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'dash');

	    /**
	     * get/set dash array for stroke.
	     * @name dash
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Array} dash
	     * @returns {Array}
	     * @example
	     *  // apply dashed stroke that is 10px long and 5 pixels apart
	     *  line.dash([10, 5]);
	     *  // apply dashed stroke that is made up of alternating dashed
	     *  // lines that are 10px long and 20px apart, and dots that have
	     *  // a radius of 5px and are 20px apart
	     *  line.dash([10, 20, 0.001, 20]);
	     */


	    Konva.Factory.addGetterSetter(Konva.Shape, 'shadowColor');

	    /**
	     * get/set shadow color
	     * @name shadowColor
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} color
	     * @returns {String}
	     * @example
	     * // get shadow color
	     * var shadow = shape.shadowColor();
	     *
	     * // set shadow color with color string
	     * shape.shadowColor('green');
	     *
	     * // set shadow color with hex
	     * shape.shadowColor('#00ff00');
	     *
	     * // set shadow color with rgb
	     * shape.shadowColor('rgb(0,255,0)');
	     *
	     * // set shadow color with rgba and make it 50% opaque
	     * shape.shadowColor('rgba(0,255,0,0.5');
	     */

	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'shadowRed', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'shadowGreen', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'shadowBlue', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'shadowAlpha', 1, Konva.Validators.alphaComponent);

	    Konva.Factory.addGetterSetter(Konva.Shape, 'shadowBlur');

	    /**
	     * get/set shadow blur
	     * @name shadowBlur
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} blur
	     * @returns {Number}
	     * @example
	     * // get shadow blur
	     * var shadowBlur = shape.shadowBlur();
	     *
	     * // set shadow blur
	     * shape.shadowBlur(10);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOpacity');

	    /**
	     * get/set shadow opacity.  must be a value between 0 and 1
	     * @name shadowOpacity
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} opacity
	     * @returns {Number}
	     * @example
	     * // get shadow opacity
	     * var shadowOpacity = shape.shadowOpacity();
	     *
	     * // set shadow opacity
	     * shape.shadowOpacity(0.5);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'shadowOffset', ['x', 'y']);

	    /**
	     * get/set shadow offset
	     * @name shadowOffset
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} offset
	     * @param {Number} offset.x
	     * @param {Number} offset.y
	     * @returns {Object}
	     * @example
	     * // get shadow offset
	     * var shadowOffset = shape.shadowOffset();
	     *
	     * // set shadow offset
	     * shape.shadowOffset({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOffsetX', 0);

	     /**
	     * get/set shadow offset x
	     * @name shadowOffsetX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get shadow offset x
	     * var shadowOffsetX = shape.shadowOffsetX();
	     *
	     * // set shadow offset x
	     * shape.shadowOffsetX(5);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOffsetY', 0);

	     /**
	     * get/set shadow offset y
	     * @name shadowOffsetY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get shadow offset y
	     * var shadowOffsetY = shape.shadowOffsetY();
	     *
	     * // set shadow offset y
	     * shape.shadowOffsetY(5);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternImage');

	    /**
	     * get/set fill pattern image
	     * @name fillPatternImage
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Image} image object
	     * @returns {Image}
	     * @example
	     * // get fill pattern image
	     * var fillPatternImage = shape.fillPatternImage();
	     *
	     * // set fill pattern image
	     * var imageObj = new Image();
	     * imageObj.onload = function() {
	     *   shape.fillPatternImage(imageObj);
	     * };
	     * imageObj.src = 'path/to/image/jpg';
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fill');

	    /**
	     * get/set fill color
	     * @name fill
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} color
	     * @returns {String}
	     * @example
	     * // get fill color
	     * var fill = shape.fill();
	     *
	     * // set fill color with color string
	     * shape.fill('green');
	     *
	     * // set fill color with hex
	     * shape.fill('#00ff00');
	     *
	     * // set fill color with rgb
	     * shape.fill('rgb(0,255,0)');
	     *
	     * // set fill color with rgba and make it 50% opaque
	     * shape.fill('rgba(0,255,0,0.5');
	     *
	     * // shape without fill
	     * shape.fill(null);
	     */

	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'fillRed', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'fillGreen', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'fillBlue', 0, Konva.Validators.RGBComponent);
	    Konva.Factory.addDeprecatedGetterSetter(Konva.Shape, 'fillAlpha', 1, Konva.Validators.alphaComponent);

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternX', 0);

	    /**
	     * get/set fill pattern x
	     * @name fillPatternX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill pattern x
	     * var fillPatternX = shape.fillPatternX();
	     * // set fill pattern x
	     * shape.fillPatternX(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternY', 0);

	    /**
	     * get/set fill pattern y
	     * @name fillPatternY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill pattern y
	     * var fillPatternY = shape.fillPatternY();
	     * // set fill pattern y
	     * shape.fillPatternY(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientColorStops');

	    /**
	     * get/set fill linear gradient color stops
	     * @name fillLinearGradientColorStops
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Array} colorStops
	     * @returns {Array} colorStops
	     * @example
	     * // get fill linear gradient color stops
	     * var colorStops = shape.fillLinearGradientColorStops();
	     *
	     * // create a linear gradient that starts with red, changes to blue
	     * // halfway through, and then changes to green
	     * shape.fillLinearGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientStartRadius', 0);

	    /**
	     * get/set fill radial gradient start radius
	     * @name fillRadialGradientStartRadius
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} radius
	     * @returns {Number}
	     * @example
	     * // get radial gradient start radius
	     * var startRadius = shape.fillRadialGradientStartRadius();
	     *
	     * // set radial gradient start radius
	     * shape.fillRadialGradientStartRadius(0);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndRadius', 0);

	    /**
	     * get/set fill radial gradient end radius
	     * @name fillRadialGradientEndRadius
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} radius
	     * @returns {Number}
	     * @example
	     * // get radial gradient end radius
	     * var endRadius = shape.fillRadialGradientEndRadius();
	     *
	     * // set radial gradient end radius
	     * shape.fillRadialGradientEndRadius(100);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientColorStops');

	    /**
	     * get/set fill radial gradient color stops
	     * @name fillRadialGradientColorStops
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} colorStops
	     * @returns {Array}
	     * @example
	     * // get fill radial gradient color stops
	     * var colorStops = shape.fillRadialGradientColorStops();
	     *
	     * // create a radial gradient that starts with red, changes to blue
	     * // halfway through, and then changes to green
	     * shape.fillRadialGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternRepeat', 'repeat');

	    /**
	     * get/set fill pattern repeat.  Can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  The default is 'repeat'
	     * @name fillPatternRepeat
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} repeat
	     * @returns {String}
	     * @example
	     * // get fill pattern repeat
	     * var repeat = shape.fillPatternRepeat();
	     *
	     * // repeat pattern in x direction only
	     * shape.fillPatternRepeat('repeat-x');
	     *
	     * // do not repeat the pattern
	     * shape.fillPatternRepeat('no repeat');
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillEnabled', true);

	    /**
	     * get/set fill enabled flag
	     * @name fillEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get fill enabled flag
	     * var fillEnabled = shape.fillEnabled();
	     *
	     * // disable fill
	     * shape.fillEnabled(false);
	     *
	     * // enable fill
	     * shape.fillEnabled(true);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'strokeEnabled', true);

	    /**
	     * get/set stroke enabled flag
	     * @name strokeEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get stroke enabled flag
	     * var strokeEnabled = shape.strokeEnabled();
	     *
	     * // disable stroke
	     * shape.strokeEnabled(false);
	     *
	     * // enable stroke
	     * shape.strokeEnabled(true);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'shadowEnabled', true);

	    /**
	     * get/set shadow enabled flag
	     * @name shadowEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get shadow enabled flag
	     * var shadowEnabled = shape.shadowEnabled();
	     *
	     * // disable shadow
	     * shape.shadowEnabled(false);
	     *
	     * // enable shadow
	     * shape.shadowEnabled(true);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'dashEnabled', true);

	    /**
	     * get/set dash enabled flag
	     * @name dashEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get dash enabled flag
	     * var dashEnabled = shape.dashEnabled();
	     *
	     * // disable dash
	     * shape.dashEnabled(false);
	     *
	     * // enable dash
	     * shape.dashEnabled(true);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'strokeScaleEnabled', true);

	    /**
	     * get/set strokeScale enabled flag
	     * @name strokeScaleEnabled
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get stroke scale enabled flag
	     * var strokeScaleEnabled = shape.strokeScaleEnabled();
	     *
	     * // disable stroke scale
	     * shape.strokeScaleEnabled(false);
	     *
	     * // enable stroke scale
	     * shape.strokeScaleEnabled(true);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPriority', 'color');

	    /**
	     * get/set fill priority.  can be color, pattern, linear-gradient, or radial-gradient.  The default is color.
	     *   This is handy if you want to toggle between different fill types.
	     * @name fillPriority
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {String} priority
	     * @returns {String}
	     * @example
	     * // get fill priority
	     * var fillPriority = shape.fillPriority();
	     *
	     * // set fill priority
	     * shape.fillPriority('linear-gradient');
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillPatternOffset', ['x', 'y']);

	    /**
	     * get/set fill pattern offset
	     * @name fillPatternOffset
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} offset
	     * @param {Number} offset.x
	     * @param {Number} offset.y
	     * @returns {Object}
	     * @example
	     * // get fill pattern offset
	     * var patternOffset = shape.fillPatternOffset();
	     *
	     * // set fill pattern offset
	     * shape.fillPatternOffset({
	     *   x: 20
	     *   y: 10
	     * });
	     */


	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternOffsetX', 0);
	    /**
	     * get/set fill pattern offset x
	     * @name fillPatternOffsetX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill pattern offset x
	     * var patternOffsetX = shape.fillPatternOffsetX();
	     *
	     * // set fill pattern offset x
	     * shape.fillPatternOffsetX(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternOffsetY', 0);
	    /**
	     * get/set fill pattern offset y
	     * @name fillPatternOffsetY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill pattern offset y
	     * var patternOffsetY = shape.fillPatternOffsetY();
	     *
	     * // set fill pattern offset y
	     * shape.fillPatternOffsetY(10);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillPatternScale', ['x', 'y']);

	    /**
	     * get/set fill pattern scale
	     * @name fillPatternScale
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} scale
	     * @param {Number} scale.x
	     * @param {Number} scale.y
	     * @returns {Object}
	     * @example
	     * // get fill pattern scale
	     * var patternScale = shape.fillPatternScale();
	     *
	     * // set fill pattern scale
	     * shape.fillPatternScale({
	     *   x: 2
	     *   y: 2
	     * });
	     */


	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternScaleX', 1);
	    /**
	     * get/set fill pattern scale x
	     * @name fillPatternScaleX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill pattern scale x
	     * var patternScaleX = shape.fillPatternScaleX();
	     *
	     * // set fill pattern scale x
	     * shape.fillPatternScaleX(2);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternScaleY', 1);
	    /**
	     * get/set fill pattern scale y
	     * @name fillPatternScaleY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill pattern scale y
	     * var patternScaleY = shape.fillPatternScaleY();
	     *
	     * // set fill pattern scale y
	     * shape.fillPatternScaleY(2);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillLinearGradientStartPoint', ['x', 'y']);

	    /**
	     * get/set fill linear gradient start point
	     * @name fillLinearGradientStartPoint
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} startPoint
	     * @param {Number} startPoint.x
	     * @param {Number} startPoint.y
	     * @returns {Object}
	     * @example
	     * // get fill linear gradient start point
	     * var startPoint = shape.fillLinearGradientStartPoint();
	     *
	     * // set fill linear gradient start point
	     * shape.fillLinearGradientStartPoint({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientStartPointX', 0);
	    /**
	     * get/set fill linear gradient start point x
	     * @name fillLinearGradientStartPointX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill linear gradient start point x
	     * var startPointX = shape.fillLinearGradientStartPointX();
	     *
	     * // set fill linear gradient start point x
	     * shape.fillLinearGradientStartPointX(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientStartPointY', 0);
	    /**
	     * get/set fill linear gradient start point y
	     * @name fillLinearGradientStartPointY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill linear gradient start point y
	     * var startPointY = shape.fillLinearGradientStartPointY();
	     *
	     * // set fill linear gradient start point y
	     * shape.fillLinearGradientStartPointY(20);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillLinearGradientEndPoint', ['x', 'y']);

	    /**
	     * get/set fill linear gradient end point
	     * @name fillLinearGradientEndPoint
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} endPoint
	     * @param {Number} endPoint.x
	     * @param {Number} endPoint.y
	     * @returns {Object}
	     * @example
	     * // get fill linear gradient end point
	     * var endPoint = shape.fillLinearGradientEndPoint();
	     *
	     * // set fill linear gradient end point
	     * shape.fillLinearGradientEndPoint({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientEndPointX', 0);
	    /**
	     * get/set fill linear gradient end point x
	     * @name fillLinearGradientEndPointX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill linear gradient end point x
	     * var endPointX = shape.fillLinearGradientEndPointX();
	     *
	     * // set fill linear gradient end point x
	     * shape.fillLinearGradientEndPointX(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientEndPointY', 0);
	    /**
	     * get/set fill linear gradient end point y
	     * @name fillLinearGradientEndPointY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill linear gradient end point y
	     * var endPointY = shape.fillLinearGradientEndPointY();
	     *
	     * // set fill linear gradient end point y
	     * shape.fillLinearGradientEndPointY(20);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillRadialGradientStartPoint', ['x', 'y']);

	    /**
	     * get/set fill radial gradient start point
	     * @name fillRadialGradientStartPoint
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} startPoint
	     * @param {Number} startPoint.x
	     * @param {Number} startPoint.y
	     * @returns {Object}
	     * @example
	     * // get fill radial gradient start point
	     * var startPoint = shape.fillRadialGradientStartPoint();
	     *
	     * // set fill radial gradient start point
	     * shape.fillRadialGradientStartPoint({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientStartPointX', 0);
	    /**
	     * get/set fill radial gradient start point x
	     * @name fillRadialGradientStartPointX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill radial gradient start point x
	     * var startPointX = shape.fillRadialGradientStartPointX();
	     *
	     * // set fill radial gradient start point x
	     * shape.fillRadialGradientStartPointX(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientStartPointY', 0);
	    /**
	     * get/set fill radial gradient start point y
	     * @name fillRadialGradientStartPointY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill radial gradient start point y
	     * var startPointY = shape.fillRadialGradientStartPointY();
	     *
	     * // set fill radial gradient start point y
	     * shape.fillRadialGradientStartPointY(20);
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillRadialGradientEndPoint', ['x', 'y']);

	    /**
	     * get/set fill radial gradient end point
	     * @name fillRadialGradientEndPoint
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Object} endPoint
	     * @param {Number} endPoint.x
	     * @param {Number} endPoint.y
	     * @returns {Object}
	     * @example
	     * // get fill radial gradient end point
	     * var endPoint = shape.fillRadialGradientEndPoint();
	     *
	     * // set fill radial gradient end point
	     * shape.fillRadialGradientEndPoint({
	     *   x: 20
	     *   y: 10
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndPointX', 0);
	    /**
	     * get/set fill radial gradient end point x
	     * @name fillRadialGradientEndPointX
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get fill radial gradient end point x
	     * var endPointX = shape.fillRadialGradientEndPointX();
	     *
	     * // set fill radial gradient end point x
	     * shape.fillRadialGradientEndPointX(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndPointY', 0);
	    /**
	     * get/set fill radial gradient end point y
	     * @name fillRadialGradientEndPointY
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get fill radial gradient end point y
	     * var endPointY = shape.fillRadialGradientEndPointY();
	     *
	     * // set fill radial gradient end point y
	     * shape.fillRadialGradientEndPointY(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternRotation', 0);

	    /**
	     * get/set fill pattern rotation in degrees
	     * @name fillPatternRotation
	     * @method
	     * @memberof Konva.Shape.prototype
	     * @param {Number} rotation
	     * @returns {Konva.Shape}
	     * @example
	     * // get fill pattern rotation
	     * var patternRotation = shape.fillPatternRotation();
	     *
	     * // set fill pattern rotation
	     * shape.fillPatternRotation(20);
	     */


	    Konva.Factory.backCompat(Konva.Shape, {
	        dashArray: 'dash',
	        getDashArray: 'getDash',
	        setDashArray: 'getDash',

	        drawFunc: 'sceneFunc',
	        getDrawFunc: 'getSceneFunc',
	        setDrawFunc: 'setSceneFunc',

	        drawHitFunc: 'hitFunc',
	        getDrawHitFunc: 'getHitFunc',
	        setDrawHitFunc: 'setHitFunc'
	    });

	    Konva.Collection.mapMethods(Konva.Shape);
	})(Konva);

	(function() {
	    'use strict';
	    // CONSTANTS
	    var STAGE = 'Stage',
	        STRING = 'string',
	        PX = 'px',

	        MOUSEOUT = 'mouseout',
	        MOUSELEAVE = 'mouseleave',
	        MOUSEOVER = 'mouseover',
	        MOUSEENTER = 'mouseenter',
	        MOUSEMOVE = 'mousemove',
	        MOUSEDOWN = 'mousedown',
	        MOUSEUP = 'mouseup',
	        CLICK = 'click',
	        DBL_CLICK = 'dblclick',
	        TOUCHSTART = 'touchstart',
	        TOUCHEND = 'touchend',
	        TAP = 'tap',
	        DBL_TAP = 'dbltap',
	        TOUCHMOVE = 'touchmove',
	        DOMMOUSESCROLL = 'DOMMouseScroll',
	        MOUSEWHEEL = 'mousewheel',
	        WHEEL = 'wheel',

	        CONTENT_MOUSEOUT = 'contentMouseout',
	        CONTENT_MOUSEOVER = 'contentMouseover',
	        CONTENT_MOUSEMOVE = 'contentMousemove',
	        CONTENT_MOUSEDOWN = 'contentMousedown',
	        CONTENT_MOUSEUP = 'contentMouseup',
	        CONTENT_CLICK = 'contentClick',
	        CONTENT_DBL_CLICK = 'contentDblclick',
	        CONTENT_TOUCHSTART = 'contentTouchstart',
	        CONTENT_TOUCHEND = 'contentTouchend',
	        CONTENT_DBL_TAP = 'contentDbltap',
	        CONTENT_TAP = 'contentTap',
	        CONTENT_TOUCHMOVE = 'contentTouchmove',
	        CONTENT_WHEEL = 'contentWheel',

	        DIV = 'div',
	        RELATIVE = 'relative',
	        KONVA_CONTENT = 'konvajs-content',
	        SPACE = ' ',
	        UNDERSCORE = '_',
	        CONTAINER = 'container',
	        EMPTY_STRING = '',
	        EVENTS = [MOUSEDOWN, MOUSEMOVE, MOUSEUP, MOUSEOUT, TOUCHSTART, TOUCHMOVE, TOUCHEND, MOUSEOVER, DOMMOUSESCROLL, MOUSEWHEEL, WHEEL],

	        // cached variables
	        eventsLength = EVENTS.length;

	    function addEvent(ctx, eventName) {
	        ctx.content.addEventListener(eventName, function(evt) {
	            ctx[UNDERSCORE + eventName](evt);
	        }, false);
	    }

	    /**
	     * Stage constructor.  A stage is used to contain multiple layers
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Container
	     * @param {Object} config
	     * @param {String|Element} config.container Container selector or DOM element
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var stage = new Konva.Stage({
	         *   width: 500,
	         *   height: 800,
	         *   container: 'containerId' // or "#containerId" or ".containerClass"
	         * });
	     */
	    Konva.Stage = function(config) {
	        this.___init(config);
	    };

	    Konva.Util.addMethods(Konva.Stage, {
	        ___init: function(config) {
	            this.nodeType = STAGE;
	            // call super constructor
	            Konva.Container.call(this, config);
	            this._id = Konva.idCounter++;
	            this._buildDOM();
	            this._bindContentEvents();
	            this._enableNestedTransforms = false;
	            Konva.stages.push(this);
	        },
	        _validateAdd: function(child) {
	            if (child.getType() !== 'Layer') {
	                Konva.Util.throw('You may only add layers to the stage.');
	            }
	        },
	        /**
	         * set container dom element which contains the stage wrapper div element
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {DomElement} container can pass in a dom element or id string
	         */
	        setContainer: function (container) {
	            if (typeof container === STRING) {
	                if (container.charAt(0) === '.') {
	                    var className = container.slice(1);
	                    container = Konva.document.getElementsByClassName(className)[0];
	                } else {
	                    var id;
	                    if (container.charAt(0) !== '#') {
	                        id = container;
	                    } else {
	                        id = container.slice(1);
	                    }
	                    container = Konva.document.getElementById(id);
	                }
	                if (!container) {
	                    throw 'Can not find container in document with id ' + id;
	                }
	            }
	            this._setAttr(CONTAINER, container);
	            return this;
	        },
	        shouldDrawHit: function() {
	            return true;
	        },
	        draw: function() {
	            Konva.Node.prototype.draw.call(this);
	            return this;
	        },
	        /**
	         * draw layer scene graphs
	         * @name draw
	         * @method
	         * @memberof Konva.Stage.prototype
	         */

	        /**
	         * draw layer hit graphs
	         * @name drawHit
	         * @method
	         * @memberof Konva.Stage.prototype
	         */

	        /**
	         * set height
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Number} height
	         */
	        setHeight: function(height) {
	            Konva.Node.prototype.setHeight.call(this, height);
	            this._resizeDOM();
	            return this;
	        },
	        /**
	         * set width
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Number} width
	         */
	        setWidth: function(width) {
	            Konva.Node.prototype.setWidth.call(this, width);
	            this._resizeDOM();
	            return this;
	        },
	        /**
	         * clear all layers
	         * @method
	         * @memberof Konva.Stage.prototype
	         */
	        clear: function() {
	            var layers = this.children,
	                len = layers.length,
	                n;

	            for(n = 0; n < len; n++) {
	                layers[n].clear();
	            }
	            return this;
	        },
	        clone: function(obj) {
	            if (!obj) {
	                obj = {};
	            }
	            obj.container = Konva.document.createElement(DIV);
	            return Konva.Container.prototype.clone.call(this, obj);
	        },
	        /**
	         * destroy stage
	         * @method
	         * @memberof Konva.Stage.prototype
	         */
	        destroy: function() {
	            var content = this.content;
	            Konva.Container.prototype.destroy.call(this);

	            if(content && Konva.Util._isInDocument(content)) {
	                this.getContainer().removeChild(content);
	            }
	            var index = Konva.stages.indexOf(this);
	            if (index > -1) {
	                Konva.stages.splice(index, 1);
	            }
	            return this;
	        },
	        /**
	         * get pointer position which can be a touch position or mouse position
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @returns {Object}
	         */
	        getPointerPosition: function() {
	            return this.pointerPos;
	        },
	        getStage: function() {
	            return this;
	        },
	        /**
	         * get stage content div element which has the
	         *  the class name "konvajs-content"
	         * @method
	         * @memberof Konva.Stage.prototype
	         */
	        getContent: function() {
	            return this.content;
	        },
	        /**
	         * Creates a composite data URL
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Object} config
	         * @param {Function} [config.callback] function executed when the composite has completed. Deprecated as method is sync now.
	         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
	         *  "image/png" is the default
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
	         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
	         *  is very high quality
	         */
	        toDataURL: function(config) {
	            config = config || {};

	            var mimeType = config.mimeType || null,
	                quality = config.quality || null,
	                x = config.x || 0,
	                y = config.y || 0,
	                canvas = new Konva.SceneCanvas({
	                    width: config.width || this.getWidth(),
	                    height: config.height || this.getHeight(),
	                    pixelRatio: config.pixelRatio
	                }),
	                _context = canvas.getContext()._context,
	                layers = this.children;

	            if(x || y) {
	                _context.translate(-1 * x, -1 * y);
	            }


	            layers.each(function(layer) {
	                var width = layer.getCanvas().getWidth();
	                var height = layer.getCanvas().getHeight();
	                var ratio = layer.getCanvas().getPixelRatio();
	                _context.drawImage(layer.getCanvas()._canvas, 0, 0, width / ratio, height / ratio);
	            });
	            var src = canvas.toDataURL(mimeType, quality);

	            if (config.callback) {
	                config.callback(src);
	            }

	            return src;
	        },
	        /**
	         * converts stage into an image.
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Object} config
	         * @param {Function} config.callback function executed when the composite has completed
	         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
	         *  "image/png" is the default
	         * @param {Number} [config.x] x position of canvas section
	         * @param {Number} [config.y] y position of canvas section
	         * @param {Number} [config.width] width of canvas section
	         * @param {Number} [config.height] height of canvas section
	         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
	         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
	         *  is very high quality
	         */
	        toImage: function(config) {
	            var cb = config.callback;

	            config.callback = function(dataUrl) {
	                Konva.Util._getImage(dataUrl, function(img) {
	                    cb(img);
	                });
	            };
	            this.toDataURL(config);
	        },
	        /**
	         * get visible intersection shape. This is the preferred
	         *  method for determining if a point intersects a shape or not
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {Object} pos
	         * @param {Number} pos.x
	         * @param {Number} pos.y
	         * @param {String} [selector]
	         * @returns {Konva.Node}
	         * @example
	         * var shape = stage.getIntersection({x: 50, y: 50});
	         * // or if you interested in shape parent:
	         * var group = stage.getIntersection({x: 50, y: 50}, 'Group');
	         */
	        getIntersection: function(pos, selector) {
	            var layers = this.getChildren(),
	                len = layers.length,
	                end = len - 1,
	                n, shape;

	            for(n = end; n >= 0; n--) {
	                shape = layers[n].getIntersection(pos, selector);
	                if (shape) {
	                    return shape;
	                }
	            }

	            return null;
	        },
	        _resizeDOM: function() {
	            if(this.content) {
	                var width = this.getWidth(),
	                    height = this.getHeight(),
	                    layers = this.getChildren(),
	                    len = layers.length,
	                    n, layer;

	                // set content dimensions
	                this.content.style.width = width + PX;
	                this.content.style.height = height + PX;

	                this.bufferCanvas.setSize(width, height);
	                this.bufferHitCanvas.setSize(width, height);

	                // set layer dimensions
	                for(n = 0; n < len; n++) {
	                    layer = layers[n];
	                    layer.setSize(width, height);
	                    layer.draw();
	                }
	            }
	        },
	        /**
	         * add layer or layers to stage
	         * @method
	         * @memberof Konva.Stage.prototype
	         * @param {...Konva.Layer} layer
	         * @example
	         * stage.add(layer1, layer2, layer3);
	         */
	        add: function(layer) {
	            if (arguments.length > 1) {
	                for (var i = 0; i < arguments.length; i++) {
	                    this.add(arguments[i]);
	                }
	                return this;
	            }
	            Konva.Container.prototype.add.call(this, layer);
	            layer._setCanvasSize(this.width(), this.height());

	            // draw layer and append canvas to container
	            layer.draw();
	            this.content.appendChild(layer.canvas._canvas);

	            // chainable
	            return this;
	        },
	        getParent: function() {
	            return null;
	        },
	        getLayer: function() {
	            return null;
	        },
	        /**
	         * returns a {@link Konva.Collection} of layers
	         * @method
	         * @memberof Konva.Stage.prototype
	         */
	        getLayers: function() {
	            return this.getChildren();
	        },
	        _bindContentEvents: function() {
	            for (var n = 0; n < eventsLength; n++) {
	                addEvent(this, EVENTS[n]);
	            }
	        },
	        _mouseover: function(evt) {
	            if (!Konva.UA.mobile) {
	                this._setPointerPosition(evt);
	                this._fire(CONTENT_MOUSEOVER, {evt: evt});
	            }
	        },
	        _mouseout: function(evt) {
	            if (!Konva.UA.mobile) {
	                this._setPointerPosition(evt);
	                var targetShape = this.targetShape;

	                if(targetShape && !Konva.isDragging()) {
	                    targetShape._fireAndBubble(MOUSEOUT, {evt: evt});
	                    targetShape._fireAndBubble(MOUSELEAVE, {evt: evt});
	                    this.targetShape = null;
	                }
	                this.pointerPos = undefined;

	                this._fire(CONTENT_MOUSEOUT, {evt: evt});
	            }
	        },
	        _mousemove: function(evt) {
	            // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
	            if (Konva.UA.ieMobile) {
	                return this._touchmove(evt);
	            }
	            // workaround fake mousemove event in chrome browser https://code.google.com/p/chromium/issues/detail?id=161464
	            if ((typeof evt.movementX !== 'undefined' || typeof evt.movementY !== 'undefined') && evt.movementY === 0 && evt.movementX === 0) {
	                return null;
	            }
	            if (Konva.UA.mobile) {
	                return null;
	            }
	            this._setPointerPosition(evt);
	            var shape;

	            if (!Konva.isDragging()) {
	                shape = this.getIntersection(this.getPointerPosition());
	                if(shape && shape.isListening()) {
	                    if(!Konva.isDragging() && (!this.targetShape || this.targetShape._id !== shape._id)) {
	                        if(this.targetShape) {
	                            this.targetShape._fireAndBubble(MOUSEOUT, {evt: evt}, shape);
	                            this.targetShape._fireAndBubble(MOUSELEAVE, {evt: evt}, shape);
	                        }
	                        shape._fireAndBubble(MOUSEOVER, {evt: evt}, this.targetShape);
	                        shape._fireAndBubble(MOUSEENTER, {evt: evt}, this.targetShape);
	                        this.targetShape = shape;
	                    }
	                    else {
	                        shape._fireAndBubble(MOUSEMOVE, {evt: evt});
	                    }
	                }
	                /*
	                 * if no shape was detected, clear target shape and try
	                 * to run mouseout from previous target shape
	                 */
	                else {
	                    if(this.targetShape && !Konva.isDragging()) {
	                        this.targetShape._fireAndBubble(MOUSEOUT, {evt: evt});
	                        this.targetShape._fireAndBubble(MOUSELEAVE, {evt: evt});
	                        this.targetShape = null;
	                    }

	                }

	                // content event
	                this._fire(CONTENT_MOUSEMOVE, {evt: evt});
	            }

	            // always call preventDefault for desktop events because some browsers
	            // try to drag and drop the canvas element
	            if (evt.preventDefault) {
	                evt.preventDefault();
	            }
	        },
	        _mousedown: function(evt) {
	            // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
	            if (Konva.UA.ieMobile) {
	                return this._touchstart(evt);
	            }
	            if (!Konva.UA.mobile) {
	                this._setPointerPosition(evt);
	                var shape = this.getIntersection(this.getPointerPosition());

	                Konva.listenClickTap = true;

	                if (shape && shape.isListening()) {
	                    this.clickStartShape = shape;
	                    shape._fireAndBubble(MOUSEDOWN, {evt: evt});
	                }

	                // content event
	                this._fire(CONTENT_MOUSEDOWN, {evt: evt});
	            }

	            // always call preventDefault for desktop events because some browsers
	            // try to drag and drop the canvas element
	            if (evt.preventDefault) {
	                evt.preventDefault();
	            }
	        },
	        _mouseup: function(evt) {

	            // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
	            if (Konva.UA.ieMobile) {
	                return this._touchend(evt);
	            }
	            if (!Konva.UA.mobile) {
	                this._setPointerPosition(evt);
	                var shape = this.getIntersection(this.getPointerPosition()),
	                    clickStartShape = this.clickStartShape,
	                    fireDblClick = false,
	                    dd = Konva.DD;

	                if(Konva.inDblClickWindow) {
	                    fireDblClick = true;
	                    Konva.inDblClickWindow = false;
	                }
	                // don't set inDblClickWindow after dragging
	                else if (!dd || !dd.justDragged) {
	                    Konva.inDblClickWindow = true;
	                } else if (dd) {
	                    dd.justDragged = false;
	                }

	                setTimeout(function() {
	                    Konva.inDblClickWindow = false;
	                }, Konva.dblClickWindow);

	                if (shape && shape.isListening()) {
	                    shape._fireAndBubble(MOUSEUP, {evt: evt});

	                    // detect if click or double click occurred
	                    if(Konva.listenClickTap && clickStartShape && clickStartShape._id === shape._id) {
	                        shape._fireAndBubble(CLICK, {evt: evt});

	                        if(fireDblClick) {
	                            shape._fireAndBubble(DBL_CLICK, {evt: evt});
	                        }
	                    }
	                }
	                // content events
	                this._fire(CONTENT_MOUSEUP, {evt: evt});
	                if (Konva.listenClickTap) {
	                    this._fire(CONTENT_CLICK, {evt: evt});
	                    if(fireDblClick) {
	                        this._fire(CONTENT_DBL_CLICK, {evt: evt});
	                    }
	                }

	                Konva.listenClickTap = false;
	            }

	            // always call preventDefault for desktop events because some browsers
	            // try to drag and drop the canvas element
	            if (evt.preventDefault) {
	                evt.preventDefault();
	            }
	        },
	        _touchstart: function(evt) {
	            this._setPointerPosition(evt);
	            var shape = this.getIntersection(this.getPointerPosition());

	            Konva.listenClickTap = true;

	            if (shape && shape.isListening()) {
	                this.tapStartShape = shape;
	                shape._fireAndBubble(TOUCHSTART, {evt: evt});

	                // only call preventDefault if the shape is listening for events
	                if (shape.isListening() && evt.preventDefault) {
	                    evt.preventDefault();
	                }
	            }
	            // content event
	            this._fire(CONTENT_TOUCHSTART, {evt: evt});
	        },
	        _touchend: function(evt) {
	            this._setPointerPosition(evt);
	            var shape = this.getIntersection(this.getPointerPosition()),
	                fireDblClick = false;

	            if(Konva.inDblClickWindow) {
	                fireDblClick = true;
	                Konva.inDblClickWindow = false;
	            }
	            else {
	                Konva.inDblClickWindow = true;
	            }

	            setTimeout(function() {
	                Konva.inDblClickWindow = false;
	            }, Konva.dblClickWindow);

	            if (shape && shape.isListening()) {
	                shape._fireAndBubble(TOUCHEND, {evt: evt});

	                // detect if tap or double tap occurred
	                if(Konva.listenClickTap && shape._id === this.tapStartShape._id) {
	                    shape._fireAndBubble(TAP, {evt: evt});

	                    if(fireDblClick) {
	                        shape._fireAndBubble(DBL_TAP, {evt: evt});
	                    }
	                }
	                // only call preventDefault if the shape is listening for events
	                if (shape.isListening() && evt.preventDefault) {
	                    evt.preventDefault();
	                }
	            }
	            // content events
	            this._fire(CONTENT_TOUCHEND, {evt: evt});
	            if (Konva.listenClickTap) {
	                this._fire(CONTENT_TAP, {evt: evt});
	                if(fireDblClick) {
	                    this._fire(CONTENT_DBL_TAP, {evt: evt});
	                }
	            }

	            Konva.listenClickTap = false;
	        },
	        _touchmove: function(evt) {
	            this._setPointerPosition(evt);
	            var dd = Konva.DD,
	                shape;
	            if (!Konva.isDragging()) {
	                shape = this.getIntersection(this.getPointerPosition());
	                if (shape && shape.isListening()) {
	                    shape._fireAndBubble(TOUCHMOVE, {evt: evt});
	                    // only call preventDefault if the shape is listening for events
	                    if (shape.isListening() && evt.preventDefault) {
	                        evt.preventDefault();
	                    }
	                }
	                this._fire(CONTENT_TOUCHMOVE, {evt: evt});
	            }
	            if(dd) {
	                if (Konva.isDragging()) {
	                    evt.preventDefault();
	                }
	            }
	        },
	        _DOMMouseScroll: function(evt) {
	            this._mousewheel(evt);
	        },
	        _mousewheel: function(evt) {
	            this._setPointerPosition(evt);
	            var shape = this.getIntersection(this.getPointerPosition());

	            if (shape && shape.isListening()) {
	                shape._fireAndBubble(WHEEL, {evt: evt});
	            }
	            this._fire(CONTENT_WHEEL, {evt: evt});
	        },
	        _wheel: function(evt) {
	            this._mousewheel(evt);
	        },
	        _setPointerPosition: function(evt) {
	            var contentPosition = this._getContentPosition(),
	                x = null,
	                y = null;
	            evt = evt ? evt : window.event;

	            // touch events
	            if(evt.touches !== undefined) {
	                // currently, only handle one finger
	                if (evt.touches.length > 0) {

	                    var touch = evt.touches[0];
	                    // get the information for finger #1
	                    x = touch.clientX - contentPosition.left;
	                    y = touch.clientY - contentPosition.top;
	                }
	            }
	            // mouse events
	            else {
	                x = evt.clientX - contentPosition.left;
	                y = evt.clientY - contentPosition.top;
	            }
	            if (x !== null && y !== null) {
	                this.pointerPos = {
	                    x: x,
	                    y: y
	                };
	            }
	        },
	        _getContentPosition: function() {
	            var rect = this.content.getBoundingClientRect ? this.content.getBoundingClientRect() : { top: 0, left: 0 };
	            return {
	                top: rect.top,
	                left: rect.left
	            };
	        },
	        _buildDOM: function() {
	            var container = this.getContainer();
	            if (!container) {
	                if (Konva.Util.isBrowser()) {
	                    throw 'Stage has no container. A container is required.';
	                } else {
	                    // automatically create element for jsdom in nodejs env
	                    container = Konva.document.createElement(DIV);
	                }
	            }
	            // clear content inside container
	            container.innerHTML = EMPTY_STRING;

	            // content
	            this.content = Konva.document.createElement(DIV);
	            this.content.style.position = RELATIVE;
	            this.content.className = KONVA_CONTENT;
	            this.content.setAttribute('role', 'presentation');
	            container.appendChild(this.content);

	            // the buffer canvas pixel ratio must be 1 because it is used as an
	            // intermediate canvas before copying the result onto a scene canvas.
	            // not setting it to 1 will result in an over compensation
	            this.bufferCanvas = new Konva.SceneCanvas();
	            this.bufferHitCanvas = new Konva.HitCanvas({pixelRatio: 1});

	            this._resizeDOM();
	        },
	        _onContent: function(typesStr, handler) {
	            var types = typesStr.split(SPACE),
	                len = types.length,
	                n, baseEvent;

	            for(n = 0; n < len; n++) {
	                baseEvent = types[n];
	                this.content.addEventListener(baseEvent, handler, false);
	            }
	        },
	        // currently cache function is now working for stage, because stage has no its own canvas element
	        // TODO: may be it is better to cache all children layers?
	        cache: function() {
	            Konva.Util.warn('Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.');
	        },
	        clearCache: function() {
	        }
	    });
	    Konva.Util.extend(Konva.Stage, Konva.Container);

	    // add getters and setters
	    Konva.Factory.addGetter(Konva.Stage, 'container');
	    Konva.Factory.addOverloadedGetterSetter(Konva.Stage, 'container');

	    /**
	     * get container DOM element
	     * @name container
	     * @method
	     * @memberof Konva.Stage.prototype
	     * @returns {DomElement} container
	     * @example
	     * // get container
	     * var container = stage.container();
	     * // set container
	     * var container = document.createElement('div');
	     * body.appendChild(container);
	     * stage.container(container);
	     */

	})();

	(function() {
	    'use strict';
	    /**
	     * BaseLayer constructor.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Container
	     * @param {Object} config
	     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
	     * to clear the canvas before each layer draw.  The default value is true.
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height

	     * @example
	     * var layer = new Konva.Layer();
	     */
	    Konva.BaseLayer = function(config) {
	        this.___init(config);
	    };

	    Konva.Util.addMethods(Konva.BaseLayer, {
	        ___init: function(config) {
	            this.nodeType = 'Layer';
	            Konva.Container.call(this, config);
	        },
	        createPNGStream: function() {
	            return this.canvas._canvas.createPNGStream();
	        },
	        /**
	         * get layer canvas
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         */
	        getCanvas: function() {
	            return this.canvas;
	        },
	        /**
	         * get layer hit canvas
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         */
	        getHitCanvas: function() {
	            return this.hitCanvas;
	        },
	        /**
	         * get layer canvas context
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         */
	        getContext: function() {
	            return this.getCanvas().getContext();
	        },
	        /**
	         * clear scene and hit canvas contexts tied to the layer
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         * @param {Object} [bounds]
	         * @param {Number} [bounds.x]
	         * @param {Number} [bounds.y]
	         * @param {Number} [bounds.width]
	         * @param {Number} [bounds.height]
	         * @example
	         * layer.clear();
	         * layer.clear({
	         *   x : 0,
	         *   y : 0,
	         *   width : 100,
	         *   height : 100
	         * });
	         */
	        clear: function(bounds) {
	            this.getContext().clear(bounds);
	            return this;
	        },
	        clearHitCache: function() {
	            this._hitImageData = undefined;
	        },
	        // extend Node.prototype.setZIndex
	        setZIndex: function(index) {
	            Konva.Node.prototype.setZIndex.call(this, index);
	            var stage = this.getStage();
	            if(stage) {
	                stage.content.removeChild(this.getCanvas()._canvas);

	                if(index < stage.getChildren().length - 1) {
	                    stage.content.insertBefore(this.getCanvas()._canvas, stage.getChildren()[index + 1].getCanvas()._canvas);
	                }
	                else {
	                    stage.content.appendChild(this.getCanvas()._canvas);
	                }
	            }
	            return this;
	        },
	        // extend Node.prototype.moveToTop
	        moveToTop: function() {
	            Konva.Node.prototype.moveToTop.call(this);
	            var stage = this.getStage();
	            if(stage) {
	                stage.content.removeChild(this.getCanvas()._canvas);
	                stage.content.appendChild(this.getCanvas()._canvas);
	            }
	            return this;
	        },
	        // extend Node.prototype.moveUp
	        moveUp: function() {
	            var moved = Konva.Node.prototype.moveUp.call(this);
	            if (!moved){
	                return this;
	            }
	            var stage = this.getStage();
	            if(!stage) {
	                return this;
	            }
	            stage.content.removeChild(this.getCanvas()._canvas);

	            if(this.index < stage.getChildren().length - 1) {
	                stage.content.insertBefore(this.getCanvas()._canvas, stage.getChildren()[this.index + 1].getCanvas()._canvas);
	            } else {
	                stage.content.appendChild(this.getCanvas()._canvas);
	            }
	            return this;
	        },
	        // extend Node.prototype.moveDown
	        moveDown: function() {
	            if(Konva.Node.prototype.moveDown.call(this)) {
	                var stage = this.getStage();
	                if(stage) {
	                    var children = stage.getChildren();
	                    stage.content.removeChild(this.getCanvas()._canvas);
	                    stage.content.insertBefore(this.getCanvas()._canvas, children[this.index + 1].getCanvas()._canvas);
	                }
	            }
	            return this;
	        },
	        // extend Node.prototype.moveToBottom
	        moveToBottom: function() {
	            if(Konva.Node.prototype.moveToBottom.call(this)) {
	                var stage = this.getStage();
	                if(stage) {
	                    var children = stage.getChildren();
	                    stage.content.removeChild(this.getCanvas()._canvas);
	                    stage.content.insertBefore(this.getCanvas()._canvas, children[1].getCanvas()._canvas);
	                }
	            }
	            return this;
	        },
	        getLayer: function() {
	            return this;
	        },
	        remove: function() {
	            var _canvas = this.getCanvas()._canvas;

	            Konva.Node.prototype.remove.call(this);

	            if(_canvas && _canvas.parentNode && Konva.Util._isInDocument(_canvas)) {
	                _canvas.parentNode.removeChild(_canvas);
	            }
	            return this;
	        },
	        getStage: function() {
	            return this.parent;
	        },
	        setSize: function(width, height) {
	            this.canvas.setSize(width, height);
	            return this;
	        },
	        /**
	         * get/set width of layer.getter return width of stage. setter doing nothing.
	         * if you want change width use `stage.width(value);`
	         * @name width
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         * @returns {Number}
	         * @example
	         * var width = layer.width();
	         */
	        getWidth: function() {
	            if (this.parent) {
	                return this.parent.getWidth();
	            }
	        },
	        setWidth: function() {
	            Konva.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
	        },
	        /**
	         * get/set height of layer.getter return height of stage. setter doing nothing.
	         * if you want change height use `stage.height(value);`
	         * @name height
	         * @method
	         * @memberof Konva.BaseLayer.prototype
	         * @returns {Number}
	         * @example
	         * var height = layer.height();
	         */
	        getHeight: function() {
	            if (this.parent) {
	                return this.parent.getHeight();
	            }
	        },
	        setHeight: function() {
	            Konva.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
	        },
	        // the apply transform method is handled by the Layer and FastLayer class
	        // because it is up to the layer to decide if an absolute or relative transform
	        // should be used
	        _applyTransform: function(shape, context, top) {
	            var m = shape.getAbsoluteTransform(top).getMatrix();
	            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	        }
	    });
	    Konva.Util.extend(Konva.BaseLayer, Konva.Container);

	    // add getters and setters
	    Konva.Factory.addGetterSetter(Konva.BaseLayer, 'clearBeforeDraw', true);
	    /**
	     * get/set clearBeforeDraw flag which determines if the layer is cleared or not
	     *  before drawing
	     * @name clearBeforeDraw
	     * @method
	     * @memberof Konva.BaseLayer.prototype
	     * @param {Boolean} clearBeforeDraw
	     * @returns {Boolean}
	     * @example
	     * // get clearBeforeDraw flag
	     * var clearBeforeDraw = layer.clearBeforeDraw();
	     *
	     * // disable clear before draw
	     * layer.clearBeforeDraw(false);
	     *
	     * // enable clear before draw
	     * layer.clearBeforeDraw(true);
	     */

	    Konva.Collection.mapMethods(Konva.BaseLayer);
	})();

	(function() {
	    'use strict';
	    // constants
	    var HASH = '#',
	        BEFORE_DRAW = 'beforeDraw',
	        DRAW = 'draw',

	        /*
	         * 2 - 3 - 4
	         * |       |
	         * 1 - 0   5
	         *         |
	         * 8 - 7 - 6
	         */
	        INTERSECTION_OFFSETS = [
	            {x: 0, y: 0},  // 0
	            {x: -1, y: 0}, // 1
	            {x: -1, y: -1}, // 2
	            {x: 0, y: -1}, // 3
	            {x: 1, y: -1}, // 4
	            {x: 1, y: 0}, // 5
	            {x: 1, y: 1}, // 6
	            {x: 0, y: 1}, // 7
	            {x: -1, y: 1}  // 8
	        ],
	        INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;

	    /**
	     * Layer constructor.  Layers are tied to their own canvas element and are used
	     * to contain groups or shapes.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.BaseLayer
	     * @param {Object} config
	     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
	     * to clear the canvas before each layer draw.  The default value is true.
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height

	     * @example
	     * var layer = new Konva.Layer();
	     */
	    Konva.Layer = function(config) {
	        this.____init(config);
	    };

	    Konva.Util.addMethods(Konva.Layer, {
	        ____init: function(config) {
	            this.nodeType = 'Layer';
	            this.canvas = new Konva.SceneCanvas();
	            this.hitCanvas = new Konva.HitCanvas({
	                pixelRatio: 1
	            });
	            // call super constructor
	            Konva.BaseLayer.call(this, config);
	        },
	        _setCanvasSize: function(width, height) {
	            this.canvas.setSize(width, height);
	            this.hitCanvas.setSize(width, height);
	        },
	        _validateAdd: function(child) {
	            var type = child.getType();
	            if (type !== 'Group' && type !== 'Shape') {
	                Konva.Util.throw('You may only add groups and shapes to a layer.');
	            }
	        },
	        /**
	         * get visible intersection shape. This is the preferred
	         * method for determining if a point intersects a shape or not
	         * also you may pass optional selector parametr to return ancestor of intersected shape
	         * @method
	         * @memberof Konva.Layer.prototype
	         * @param {Object} pos
	         * @param {Number} pos.x
	         * @param {Number} pos.y
	         * @param {String} [selector]
	         * @returns {Konva.Node}
	         * @example
	         * var shape = layer.getIntersection({x: 50, y: 50});
	         * // or if you interested in shape parent:
	         * var group = layer.getIntersection({x: 50, y: 50}, 'Group');
	         */
	        getIntersection: function(pos, selector) {
	            var obj, i, intersectionOffset, shape;

	            if(!this.hitGraphEnabled() || !this.isVisible()) {
	                return null;
	            }
	            // in some cases antialiased area may be bigger than 1px
	            // it is possible if we will cache node, then scale it a lot
	            // TODO: check { 0; 0 } point before loop, and remove it from INTERSECTION_OFFSETS.
	            var spiralSearchDistance = 1;
	            var continueSearch = false;
	            while (true) {
	                for (i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
	                    intersectionOffset = INTERSECTION_OFFSETS[i];
	                    obj = this._getIntersection({
	                        x: pos.x + intersectionOffset.x * spiralSearchDistance,
	                        y: pos.y + intersectionOffset.y * spiralSearchDistance
	                    });
	                    shape = obj.shape;
	                    if (shape && selector) {
	                        return shape.findAncestor(selector, true);
	                    } else if (shape) {
	                        return shape;
	                    }
	                    // we should continue search if we found antialiased pixel
	                    // that means our node somewhere very close
	                    continueSearch = !!obj.antialiased;
	                    // stop search if found empty pixel
	                    if (!obj.antialiased) {
	                        break;
	                    }
	                }
	                // if no shape, and no antialiased pixel, we should end searching
	                if (continueSearch) {
	                    spiralSearchDistance += 1;
	                } else {
	                    return null;
	                }
	            }
	        },
	        _getImageData: function(x, y) {
	            var width = this.hitCanvas.width || 1,
	                height = this.hitCanvas.height || 1,
	                index = (Math.round(y) * width ) + Math.round(x);

	            if (!this._hitImageData) {
	                this._hitImageData = this.hitCanvas.context.getImageData(0, 0, width, height);
	            }

	            return [
	                this._hitImageData.data[4 * index + 0], // Red
	                this._hitImageData.data[4 * index + 1], // Green
	                this._hitImageData.data[4 * index + 2], // Blue
	                this._hitImageData.data[4 * index + 3] // Alpha
	            ];
	        },
	        _getIntersection: function(pos) {
	            var ratio = this.hitCanvas.pixelRatio;
	            var p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data,
	                p3 = p[3],
	                colorKey, shape;
	            // fully opaque pixel
	            if(p3 === 255) {
	                colorKey = Konva.Util._rgbToHex(p[0], p[1], p[2]);
	                shape = Konva.shapes[HASH + colorKey];
	                if (shape) {
	                    return {
	                        shape: shape
	                    };
	                }
	                return {
	                    antialiased: true
	                };
	            }
	            // antialiased pixel
	            else if(p3 > 0) {
	                return {
	                    antialiased: true
	                };
	            }
	            // empty pixel
	            return {};
	        },
	        drawScene: function(can, top) {
	            var layer = this.getLayer(),
	                canvas = can || (layer && layer.getCanvas());

	            this._fire(BEFORE_DRAW, {
	                node: this
	            });

	            if(this.getClearBeforeDraw()) {
	                canvas.getContext().clear();
	            }

	            Konva.Container.prototype.drawScene.call(this, canvas, top);

	            this._fire(DRAW, {
	                node: this
	            });

	            return this;
	        },
	        drawHit: function(can, top) {
	            var layer = this.getLayer(),
	                canvas = can || (layer && layer.hitCanvas);

	            if(layer && layer.getClearBeforeDraw()) {
	                layer.getHitCanvas().getContext().clear();
	            }

	            Konva.Container.prototype.drawHit.call(this, canvas, top);
	            this.imageData = null; // Clear imageData cache
	            return this;
	        },
	        clear: function(bounds) {
	            Konva.BaseLayer.prototype.clear.call(this, bounds);
	            this.getHitCanvas().getContext().clear(bounds);
	            this.imageData = null; // Clear getImageData cache
	            return this;
	        },
	        // extend Node.prototype.setVisible
	        setVisible: function(visible) {
	            Konva.Node.prototype.setVisible.call(this, visible);
	            if(visible) {
	                this.getCanvas()._canvas.style.display = 'block';
	                this.hitCanvas._canvas.style.display = 'block';
	            }
	            else {
	                this.getCanvas()._canvas.style.display = 'none';
	                this.hitCanvas._canvas.style.display = 'none';
	            }
	            return this;
	        },
	        /**
	         * enable hit graph
	         * @name enableHitGraph
	         * @method
	         * @memberof Konva.Layer.prototype
	         * @returns {Layer}
	         */
	        enableHitGraph: function() {
	            this.setHitGraphEnabled(true);
	            return this;
	        },
	        /**
	         * disable hit graph
	         * @name disableHitGraph
	         * @method
	         * @memberof Konva.Layer.prototype
	         * @returns {Layer}
	         */
	        disableHitGraph: function() {
	            this.setHitGraphEnabled(false);
	            return this;
	        },
	        setSize: function(width, height) {
	            Konva.BaseLayer.prototype.setSize.call(this, width, height);
	            this.hitCanvas.setSize(width, height);
	            return this;
	        }
	    });
	    Konva.Util.extend(Konva.Layer, Konva.BaseLayer);

	    Konva.Factory.addGetterSetter(Konva.Layer, 'hitGraphEnabled', true);
	    /**
	     * get/set hitGraphEnabled flag.  Disabling the hit graph will greatly increase
	     *  draw performance because the hit graph will not be redrawn each time the layer is
	     *  drawn.  This, however, also disables mouse/touch event detection
	     * @name hitGraphEnabled
	     * @method
	     * @memberof Konva.Layer.prototype
	     * @param {Boolean} enabled
	     * @returns {Boolean}
	     * @example
	     * // get hitGraphEnabled flag
	     * var hitGraphEnabled = layer.hitGraphEnabled();
	     *
	     * // disable hit graph
	     * layer.hitGraphEnabled(false);
	     *
	     * // enable hit graph
	     * layer.hitGraphEnabled(true);
	     */
	    Konva.Collection.mapMethods(Konva.Layer);
	})();

	(function() {
	    'use strict';
	    /**
	     * FastLayer constructor. Layers are tied to their own canvas element and are used
	     * to contain shapes only.  If you don't need node nesting, mouse and touch interactions,
	     * or event pub/sub, you should use FastLayer instead of Layer to create your layers.
	     * It renders about 2x faster than normal layers.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.BaseLayer
	     * @param {Object} config
	     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
	     * to clear the canvas before each layer draw.  The default value is true.
	     * @param {Boolean} [config.visible]
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height

	     * @example
	     * var layer = new Konva.FastLayer();
	     */
	    Konva.FastLayer = function(config) {
	        this.____init(config);
	    };

	    Konva.Util.addMethods(Konva.FastLayer, {
	        ____init: function(config) {
	            this.nodeType = 'Layer';
	            this.canvas = new Konva.SceneCanvas();
	            // call super constructor
	            Konva.BaseLayer.call(this, config);
	        },
	        _validateAdd: function(child) {
	            var type = child.getType();
	            if (type !== 'Shape') {
	                Konva.Util.throw('You may only add shapes to a fast layer.');
	            }
	        },
	        _setCanvasSize: function(width, height) {
	            this.canvas.setSize(width, height);
	        },
	        hitGraphEnabled: function() {
	            return false;
	        },
	        getIntersection: function() {
	            return null;
	        },
	        drawScene: function(can) {
	            var layer = this.getLayer(),
	                canvas = can || (layer && layer.getCanvas());

	            if(this.getClearBeforeDraw()) {
	                canvas.getContext().clear();
	            }

	            Konva.Container.prototype.drawScene.call(this, canvas);

	            return this;
	        },
	        draw: function() {
	            this.drawScene();
	            return this;
	        },
	        // extend Node.prototype.setVisible
	        setVisible: function(visible) {
	            Konva.Node.prototype.setVisible.call(this, visible);
	            if(visible) {
	                this.getCanvas()._canvas.style.display = 'block';
	            }
	            else {
	                this.getCanvas()._canvas.style.display = 'none';
	            }
	            return this;
	        }
	    });
	    Konva.Util.extend(Konva.FastLayer, Konva.BaseLayer);

	    Konva.Collection.mapMethods(Konva.FastLayer);
	})();

	(function() {
	    'use strict';
	    /**
	     * Group constructor.  Groups are used to contain shapes or other groups.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Container
	     * @param {Object} config
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * * @param {Object} [config.clip] set clip
	     * @param {Number} [config.clipX] set clip x
	     * @param {Number} [config.clipY] set clip y
	     * @param {Number} [config.clipWidth] set clip width
	     * @param {Number} [config.clipHeight] set clip height

	     * @example
	     * var group = new Konva.Group();
	     */
	    Konva.Group = function(config) {
	        this.___init(config);
	    };

	    Konva.Util.addMethods(Konva.Group, {
	        ___init: function(config) {
	            this.nodeType = 'Group';
	            // call super constructor
	            Konva.Container.call(this, config);
	        },
	        _validateAdd: function(child) {
	            var type = child.getType();
	            if (type !== 'Group' && type !== 'Shape') {
	                Konva.Util.throw('You may only add groups and shapes to groups.');
	            }
	        }
	    });
	    Konva.Util.extend(Konva.Group, Konva.Container);

	    Konva.Collection.mapMethods(Konva.Group);
	})();

	(function(Konva) {
	    'use strict';

	    var now = (function() {
	        if (Konva.global.performance && Konva.global.performance.now) {
	            return function() {
	                return Konva.global.performance.now();
	            };
	        }

	        return function() {
	            return new Date().getTime();
	        };
	    })();

	    function FRAF(callback) {
	        setTimeout(callback, 1000 / 60);
	    }

	    var RAF = (function(){
	        return Konva.global.requestAnimationFrame
	            || Konva.global.webkitRequestAnimationFrame
	            || Konva.global.mozRequestAnimationFrame
	            || Konva.global.oRequestAnimationFrame
	            || Konva.global.msRequestAnimationFrame
	            || FRAF;
	    })();



	    function requestAnimFrame() {
	        return RAF.apply(Konva.global, arguments);
	    }

	    /**
	     * Animation constructor.  A stage is used to contain multiple layers and handle
	     * @constructor
	     * @memberof Konva
	     * @param {Function} func function executed on each animation frame.  The function is passed a frame object, which contains
	     *  timeDiff, lastTime, time, and frameRate properties.  The timeDiff property is the number of milliseconds that have passed
	     *  since the last animation frame.  The lastTime property is time in milliseconds that elapsed from the moment the animation started
	     *  to the last animation frame.  The time property is the time in milliseconds that ellapsed from the moment the animation started
	     *  to the current animation frame.  The frameRate property is the current frame rate in frames / second. Return false from function,
	     *  if you don't need to redraw layer/layers on some frames.
	     * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn on each animation frame. Can be a layer, an array of layers, or null.
	     *  Not specifying a node will result in no redraw.
	     * @example
	     * // move a node to the right at 50 pixels / second
	     * var velocity = 50;
	     *
	     * var anim = new Konva.Animation(function(frame) {
	     *   var dist = velocity * (frame.timeDiff / 1000);
	     *   node.move(dist, 0);
	     * }, layer);
	     *
	     * anim.start();
	     */
	    Konva.Animation = function(func, layers) {
	        var Anim = Konva.Animation;
	        this.func = func;
	        this.setLayers(layers);
	        this.id = Anim.animIdCounter++;
	        this.frame = {
	            time: 0,
	            timeDiff: 0,
	            lastTime: now()
	        };
	    };
	    /*
	     * Animation methods
	     */
	    Konva.Animation.prototype = {
	        /**
	         * set layers to be redrawn on each animation frame
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn.&nbsp; Can be a layer, an array of layers, or null.  Not specifying a node will result in no redraw.
	         * @return {Konva.Animation} this
	         */
	        setLayers: function(layers) {
	            var lays = [];
	            // if passing in no layers
	            if (!layers) {
	                lays = [];
	            }
	            // if passing in an array of Layers
	            // NOTE: layers could be an array or Konva.Collection.  for simplicity, I'm just inspecting
	            // the length property to check for both cases
	            else if (layers.length > 0) {
	                lays = layers;
	            }
	            // if passing in a Layer
	            else {
	                lays = [layers];
	            }

	            this.layers = lays;
	            return this;
	        },
	        /**
	         * get layers
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @return {Array} Array of Konva.Layer
	         */
	        getLayers: function() {
	            return this.layers;
	        },
	        /**
	         * add layer.  Returns true if the layer was added, and false if it was not
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @param {Konva.Layer} layer to add
	         * @return {Bool} true if layer is added to animation, otherwise false
	         */
	        addLayer: function(layer) {
	            var layers = this.layers,
	                len = layers.length, n;

	            // don't add the layer if it already exists
	            for (n = 0; n < len; n++) {
	                if (layers[n]._id === layer._id){
	                    return false;
	                }
	            }

	            this.layers.push(layer);
	            return true;
	        },
	        /**
	         * determine if animation is running or not.  returns true or false
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @return {Bool} is animation running?
	         */
	        isRunning: function() {
	            var a = Konva.Animation,
	                animations = a.animations,
	                len = animations.length,
	                n;

	            for (n = 0; n < len; n++) {
	                if (animations[n].id === this.id) {
	                    return true;
	                }
	            }
	            return false;
	        },
	        /**
	         * start animation
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @return {Konva.Animation} this
	         */
	        start: function() {
	            var Anim = Konva.Animation;
	            this.stop();
	            this.frame.timeDiff = 0;
	            this.frame.lastTime = now();
	            Anim._addAnimation(this);
	            return this;
	        },
	        /**
	         * stop animation
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @return {Konva.Animation} this
	         */
	        stop: function() {
	            Konva.Animation._removeAnimation(this);
	            return this;
	        },
	        _updateFrameObject: function(time) {
	            this.frame.timeDiff = time - this.frame.lastTime;
	            this.frame.lastTime = time;
	            this.frame.time += this.frame.timeDiff;
	            this.frame.frameRate = 1000 / this.frame.timeDiff;
	        }
	    };
	    Konva.Animation.animations = [];
	    Konva.Animation.animIdCounter = 0;
	    Konva.Animation.animRunning = false;

	    Konva.Animation._addAnimation = function(anim) {
	        this.animations.push(anim);
	        this._handleAnimation();
	    };
	    Konva.Animation._removeAnimation = function(anim) {
	        var id = anim.id,
	            animations = this.animations,
	            len = animations.length,
	            n;

	        for(n = 0; n < len; n++) {
	            if(animations[n].id === id) {
	                this.animations.splice(n, 1);
	                break;
	            }
	        }
	    };

	    Konva.Animation._runFrames = function() {
	        var layerHash = {},
	            animations = this.animations,
	            anim, layers, func, n, i, layersLen, layer, key, needRedraw;
	        /*
	         * loop through all animations and execute animation
	         *  function.  if the animation object has specified node,
	         *  we can add the node to the nodes hash to eliminate
	         *  drawing the same node multiple times.  The node property
	         *  can be the stage itself or a layer
	         */
	        /*
	         * WARNING: don't cache animations.length because it could change while
	         * the for loop is running, causing a JS error
	         */

	        for(n = 0; n < animations.length; n++) {
	            anim = animations[n];
	            layers = anim.layers;
	            func = anim.func;


	            anim._updateFrameObject(now());
	            layersLen = layers.length;

	            // if animation object has a function, execute it
	            if (func) {
	                // allow anim bypassing drawing
	                needRedraw = (func.call(anim, anim.frame) !== false);
	            } else {
	                needRedraw = true;
	            }
	            if (!needRedraw) {
	                continue;
	            }
	            for (i = 0; i < layersLen; i++) {
	                layer = layers[i];

	                if (layer._id !== undefined) {
	                    layerHash[layer._id] = layer;
	                }
	            }
	        }

	        for (key in layerHash) {
	            if (!layerHash.hasOwnProperty(key)) {
	                continue;
	            }
	            layerHash[key].draw();
	        }
	    };
	    Konva.Animation._animationLoop = function() {
	        var Anim = Konva.Animation;
	        if(Anim.animations.length) {
	            requestAnimFrame(Anim._animationLoop);
	            Anim._runFrames();
	        }
	        else {
	            Anim.animRunning = false;
	        }
	    };
	    Konva.Animation._handleAnimation = function() {
	        if(!this.animRunning) {
	            this.animRunning = true;
	            this._animationLoop();
	        }
	    };

	    /**
	     * batch draw
	     * @method
	     * @return {Konva.Layer} this
	     * @memberof Konva.Base.prototype
	     */
	    Konva.BaseLayer.prototype.batchDraw = function() {
	        var that = this,
	            Anim = Konva.Animation;

	        if (!this.batchAnim) {
	            this.batchAnim = new Anim(function() {
	                // stop animation after first tick
	                that.batchAnim.stop();
	            }, this);
	        }

	        this.lastBatchDrawTime = now();

	        if (!this.batchAnim.isRunning()) {
	            this.draw();
	            this.batchAnim.start();
	        }
	        return this;
	    };

	    /**
	     * batch draw
	     * @method
	     * @return {Konva.Stage} this
	     * @memberof Konva.Stage.prototype
	     */
	    Konva.Stage.prototype.batchDraw = function() {
	        this.getChildren().each(function(layer) {
	            layer.batchDraw();
	        });
	        return this;
	    };
	})(Konva);

	(function() {
	    'use strict';
	    var blacklist = {
	        node: 1,
	        duration: 1,
	        easing: 1,
	        onFinish: 1,
	        yoyo: 1
	    },

	    PAUSED = 1,
	    PLAYING = 2,
	    REVERSING = 3,

	    idCounter = 0,
	    colorAttrs = ['fill', 'stroke', 'shadowColor'];

	    var Tween = function(prop, propFunc, func, begin, finish, duration, yoyo) {
	        this.prop = prop;
	        this.propFunc = propFunc;
	        this.begin = begin;
	        this._pos = begin;
	        this.duration = duration;
	        this._change = 0;
	        this.prevPos = 0;
	        this.yoyo = yoyo;
	        this._time = 0;
	        this._position = 0;
	        this._startTime = 0;
	        this._finish = 0;
	        this.func = func;
	        this._change = finish - this.begin;
	        this.pause();
	    };
	    /*
	     * Tween methods
	     */
	    Tween.prototype = {
	        fire: function(str) {
	            var handler = this[str];
	            if (handler) {
	                handler();
	            }
	        },
	        setTime: function(t) {
	            if(t > this.duration) {
	                if(this.yoyo) {
	                    this._time = this.duration;
	                    this.reverse();
	                }
	                else {
	                    this.finish();
	                }
	            }
	            else if(t < 0) {
	                if(this.yoyo) {
	                    this._time = 0;
	                    this.play();
	                }
	                else {
	                    this.reset();
	                }
	            }
	            else {
	                this._time = t;
	                this.update();
	            }
	        },
	        getTime: function() {
	            return this._time;
	        },
	        setPosition: function(p) {
	            this.prevPos = this._pos;
	            this.propFunc(p);
	            this._pos = p;
	        },
	        getPosition: function(t) {
	            if(t === undefined) {
	                t = this._time;
	            }
	            return this.func(t, this.begin, this._change, this.duration);
	        },
	        play: function() {
	            this.state = PLAYING;
	            this._startTime = this.getTimer() - this._time;
	            this.onEnterFrame();
	            this.fire('onPlay');
	        },
	        reverse: function() {
	            this.state = REVERSING;
	            this._time = this.duration - this._time;
	            this._startTime = this.getTimer() - this._time;
	            this.onEnterFrame();
	            this.fire('onReverse');
	        },
	        seek: function(t) {
	            this.pause();
	            this._time = t;
	            this.update();
	            this.fire('onSeek');
	        },
	        reset: function() {
	            this.pause();
	            this._time = 0;
	            this.update();
	            this.fire('onReset');
	        },
	        finish: function() {
	            this.pause();
	            this._time = this.duration;
	            this.update();
	            this.fire('onFinish');
	        },
	        update: function() {
	            this.setPosition(this.getPosition(this._time));
	        },
	        onEnterFrame: function() {
	            var t = this.getTimer() - this._startTime;
	            if(this.state === PLAYING) {
	                this.setTime(t);
	            }
	            else if (this.state === REVERSING) {
	                this.setTime(this.duration - t);
	            }
	        },
	        pause: function() {
	            this.state = PAUSED;
	            this.fire('onPause');
	        },
	        getTimer: function() {
	            return new Date().getTime();
	        }
	    };

	    /**
	     * Tween constructor.  Tweens enable you to animate a node between the current state and a new state.
	     *  You can play, pause, reverse, seek, reset, and finish tweens.  By default, tweens are animated using
	     *  a linear easing.  For more tweening options, check out {@link Konva.Easings}
	     * @constructor
	     * @memberof Konva
	     * @example
	     * // instantiate new tween which fully rotates a node in 1 second
	     * var tween = new Konva.Tween({
	     *   node: node,
	     *   rotationDeg: 360,
	     *   duration: 1,
	     *   easing: Konva.Easings.EaseInOut
	     * });
	     *
	     * // play tween
	     * tween.play();
	     *
	     * // pause tween
	     * tween.pause();
	     */
	    Konva.Tween = function(config) {
	        var that = this,
	            node = config.node,
	            nodeId = node._id,
	            duration,
	            easing = config.easing || Konva.Easings.Linear,
	            yoyo = !!config.yoyo,
	            key;

	        if (typeof config.duration === 'undefined') {
	            duration = 1;
	        } else if (config.duration === 0) {  // zero is bad value for duration
	            duration = 0.001;
	        } else {
	            duration = config.duration;
	        }
	        this.node = node;
	        this._id = idCounter++;

	        this.anim = new Konva.Animation(function() {
	            that.tween.onEnterFrame();
	        }, node.getLayer() || ((node instanceof Konva.Stage) ? node.getLayers() : null));

	        this.tween = new Tween(key, function(i) {
	            that._tweenFunc(i);
	        }, easing, 0, 1, duration * 1000, yoyo);

	        this._addListeners();

	        // init attrs map
	        if (!Konva.Tween.attrs[nodeId]) {
	            Konva.Tween.attrs[nodeId] = {};
	        }
	        if (!Konva.Tween.attrs[nodeId][this._id]) {
	            Konva.Tween.attrs[nodeId][this._id] = {};
	        }
	        // init tweens map
	        if (!Konva.Tween.tweens[nodeId]) {
	            Konva.Tween.tweens[nodeId] = {};
	        }

	        for (key in config) {
	            if (blacklist[key] === undefined) {
	                this._addAttr(key, config[key]);
	            }
	        }

	        this.reset();

	        // callbacks
	        this.onFinish = config.onFinish;
	        this.onReset = config.onReset;
	    };

	    // start/diff object = attrs.nodeId.tweenId.attr
	    Konva.Tween.attrs = {};
	    // tweenId = tweens.nodeId.attr
	    Konva.Tween.tweens = {};

	    Konva.Tween.prototype = {
	        _addAttr: function(key, end) {
	            var node = this.node,
	                nodeId = node._id,
	                start, diff, tweenId, n, len, trueEnd, trueStart;

	            // remove conflict from tween map if it exists
	            tweenId = Konva.Tween.tweens[nodeId][key];

	            if (tweenId) {
	                delete Konva.Tween.attrs[nodeId][tweenId][key];
	            }

	            // add to tween map
	            start = node.getAttr(key);

	            if (Konva.Util._isArray(end)) {
	                diff = [];
	                len = Math.max(end.length, start.length);

	                if (key === 'points' && end.length !== start.length) {
	                    // before tweening points we need to make sure that start.length === end.length
	                    // Konva.Util._prepareArrayForTween thinking that end.length > start.length

	                    if (end.length > start.length) {
	                        // so in this case we will increase number of starting points
	                        trueStart = start;
	                        start = Konva.Util._prepareArrayForTween(start, end, node.closed());
	                    } else {
	                        // in this case we will increase number of eding points
	                        trueEnd = end;
	                        end = Konva.Util._prepareArrayForTween(end, start, node.closed());
	                    }
	                }

	                for (n = 0; n < len; n++) {
	                    diff.push((end[n]) - (start[n]));
	                }

	            } else if (colorAttrs.indexOf(key) !== -1) {
	                start = Konva.Util.colorToRGBA(start);
	                var endRGBA = Konva.Util.colorToRGBA(end);
	                diff = {
	                    r: endRGBA.r - start.r,
	                    g: endRGBA.g - start.g,
	                    b: endRGBA.b - start.b,
	                    a: endRGBA.a - start.a
	                };
	            } else {
	                diff = end - start;
	            }

	            Konva.Tween.attrs[nodeId][this._id][key] = {
	                start: start,
	                diff: diff,
	                end: end,
	                trueEnd: trueEnd,
	                trueStart: trueStart
	            };
	            Konva.Tween.tweens[nodeId][key] = this._id;
	        },
	        _tweenFunc: function(i) {
	            var node = this.node,
	                attrs = Konva.Tween.attrs[node._id][this._id],
	                key, attr, start, diff, newVal, n, len, end;

	            for (key in attrs) {
	                attr = attrs[key];
	                start = attr.start;
	                diff = attr.diff;
	                end = attr.end;

	                if (Konva.Util._isArray(start)) {
	                    newVal = [];
	                    len = Math.max(start.length, end.length);
	                    for (n = 0; n < len; n++) {
	                        newVal.push((start[n] || 0) + (diff[n] * i));
	                    }
	                } else if (colorAttrs.indexOf(key) !== -1) {
	                    newVal = 'rgba(' +
	                            Math.round(start.r + diff.r * i) + ',' +
	                            Math.round(start.g + diff.g * i) + ',' +
	                            Math.round(start.b + diff.b * i) + ',' +
	                            (start.a + diff.a * i) + ')';
	                } else {
	                    newVal = start + (diff * i);
	                }

	                node.setAttr(key, newVal);
	            }
	        },
	        _addListeners: function() {
	            var that = this;

	            // start listeners
	            this.tween.onPlay = function() {
	                that.anim.start();
	            };
	            this.tween.onReverse = function() {
	                that.anim.start();
	            };

	            // stop listeners
	            this.tween.onPause = function() {
	                that.anim.stop();
	            };
	            this.tween.onFinish = function() {
	                var node = that.node;

	                // after tweening  points of line we need to set original end
	                var attrs = Konva.Tween.attrs[node._id][that._id];
	                if (attrs.points && attrs.points.trueEnd) {
	                    node.points(attrs.points.trueEnd);
	                }

	                if (that.onFinish) {
	                    that.onFinish.call(that);
	                }
	            };
	            this.tween.onReset = function() {
	                var node = that.node;
	                // after tweening  points of line we need to set original start
	                var attrs = Konva.Tween.attrs[node._id][that._id];
	                if (attrs.points && attrs.points.trueStart) {
	                    node.points(attrs.points.trueStart);
	                }

	                if (that.onReset) {
	                    that.onReset();
	                }
	            };
	        },
	        /**
	         * play
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	        play: function() {
	            this.tween.play();
	            return this;
	        },
	        /**
	         * reverse
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	        reverse: function() {
	            this.tween.reverse();
	            return this;
	        },
	        /**
	         * reset
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	        reset: function() {
	            this.tween.reset();
	            return this;
	        },
	        /**
	         * seek
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @param {Integer} t time in seconds between 0 and the duration
	         * @returns {Tween}
	         */
	        seek: function(t) {
	            this.tween.seek(t * 1000);
	            return this;
	        },
	        /**
	         * pause
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	        pause: function() {
	            this.tween.pause();
	            return this;
	        },
	        /**
	         * finish
	         * @method
	         * @memberof Konva.Tween.prototype
	         * @returns {Tween}
	         */
	        finish: function() {
	            this.tween.finish();
	            return this;
	        },
	        /**
	         * destroy
	         * @method
	         * @memberof Konva.Tween.prototype
	         */
	        destroy: function() {
	            var nodeId = this.node._id,
	                thisId = this._id,
	                attrs = Konva.Tween.tweens[nodeId],
	                key;

	            this.pause();

	            for (key in attrs) {
	                delete Konva.Tween.tweens[nodeId][key];
	            }

	            delete Konva.Tween.attrs[nodeId][thisId];
	        }
	    };

	    /**
	     * Tween node properties. Shorter usage of {@link Konva.Tween} object.
	     *
	     * @method Konva.Node#to
	     * @memberof Konva.Node
	     * @param {Object} [params] tween params
	     * @example
	     *
	     * circle.to({
	     *  x : 50,
	     *  duration : 0.5
	     * });
	     */
	    Konva.Node.prototype.to = function(params) {
	        var onFinish = params.onFinish;
	        params.node = this;
	        params.onFinish = function() {
	            this.destroy();
	            if (onFinish) {
	                onFinish();
	            }
	        };
	        var tween = new Konva.Tween(params);
	        tween.play();
	    };

	    /*
	    * These eases were ported from an Adobe Flash tweening library to JavaScript
	    * by Xaric
	    */

	    /**
	     * @namespace Easings
	     * @memberof Konva
	     */
	    Konva.Easings = {
	        /**
	        * back ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	        'BackEaseIn': function(t, b, c, d) {
	            var s = 1.70158;
	            return c * (t /= d) * t * ((s + 1) * t - s) + b;
	        },
	        /**
	        * back ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'BackEaseOut': function(t, b, c, d) {
	            var s = 1.70158;
	            return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	        },
	        /**
	        * back ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'BackEaseInOut': function(t, b, c, d) {
	            var s = 1.70158;
	            if((t /= d / 2) < 1) {
	                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
	            }
	            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	        },
	        /**
	        * elastic ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	        'ElasticEaseIn': function(t, b, c, d, a, p) {
	            // added s = 0
	            var s = 0;
	            if(t === 0) {
	                return b;
	            }
	            if((t /= d) === 1) {
	                return b + c;
	            }
	            if(!p) {
	                p = d * 0.3;
	            }
	            if(!a || a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            }
	            else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        },
	        /**
	        * elastic ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'ElasticEaseOut': function(t, b, c, d, a, p) {
	            // added s = 0
	            var s = 0;
	            if(t === 0) {
	                return b;
	            }
	            if((t /= d) === 1) {
	                return b + c;
	            }
	            if(!p) {
	                p = d * 0.3;
	            }
	            if(!a || a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            }
	            else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
	        },
	        /**
	        * elastic ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'ElasticEaseInOut': function(t, b, c, d, a, p) {
	            // added s = 0
	            var s = 0;
	            if(t === 0) {
	                return b;
	            }
	            if((t /= d / 2) === 2) {
	                return b + c;
	            }
	            if(!p) {
	                p = d * (0.3 * 1.5);
	            }
	            if(!a || a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            }
	            else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            if(t < 1) {
	                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	            }
	            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	        },
	        /**
	        * bounce ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'BounceEaseOut': function(t, b, c, d) {
	            if((t /= d) < (1 / 2.75)) {
	                return c * (7.5625 * t * t) + b;
	            }
	            else if(t < (2 / 2.75)) {
	                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
	            }
	            else if(t < (2.5 / 2.75)) {
	                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
	            }
	            else {
	                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	            }
	        },
	        /**
	        * bounce ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	        'BounceEaseIn': function(t, b, c, d) {
	            return c - Konva.Easings.BounceEaseOut(d - t, 0, c, d) + b;
	        },
	        /**
	        * bounce ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'BounceEaseInOut': function(t, b, c, d) {
	            if(t < d / 2) {
	                return Konva.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
	            }
	            else {
	                return Konva.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	            }
	        },
	        /**
	        * ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	        'EaseIn': function(t, b, c, d) {
	            return c * (t /= d) * t + b;
	        },
	        /**
	        * ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'EaseOut': function(t, b, c, d) {
	            return -c * (t /= d) * (t - 2) + b;
	        },
	        /**
	        * ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'EaseInOut': function(t, b, c, d) {
	            if((t /= d / 2) < 1) {
	                return c / 2 * t * t + b;
	            }
	            return -c / 2 * ((--t) * (t - 2) - 1) + b;
	        },
	        /**
	        * strong ease in
	        * @function
	        * @memberof Konva.Easings
	        */
	        'StrongEaseIn': function(t, b, c, d) {
	            return c * (t /= d) * t * t * t * t + b;
	        },
	        /**
	        * strong ease out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'StrongEaseOut': function(t, b, c, d) {
	            return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
	        },
	        /**
	        * strong ease in out
	        * @function
	        * @memberof Konva.Easings
	        */
	        'StrongEaseInOut': function(t, b, c, d) {
	            if((t /= d / 2) < 1) {
	                return c / 2 * t * t * t * t * t + b;
	            }
	            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	        },
	        /**
	        * linear
	        * @function
	        * @memberof Konva.Easings
	        */
	        'Linear': function(t, b, c, d) {
	            return c * t / d + b;
	        }
	    };
	})();

	(function() {
	    'use strict';
	    Konva.DD = {
	        // properties
	        anim: new Konva.Animation(function() {
	            var b = this.dirty;
	            this.dirty = false;
	            return b;
	        }),
	        isDragging: false,
	        justDragged: false,
	        offset: {
	            x: 0,
	            y: 0
	        },
	        node: null,

	        // methods
	        _drag: function(evt) {
	            var dd = Konva.DD,
	                node = dd.node;

	            if(node) {
	               if(!dd.isDragging) {
	                    var pos = node.getStage().getPointerPosition();
	                    var dragDistance = node.dragDistance();
	                    var distance = Math.max(
	                        Math.abs(pos.x - dd.startPointerPos.x),
	                        Math.abs(pos.y - dd.startPointerPos.y)
	                    );
	                    if (distance < dragDistance) {
	                        return;
	                    }
	                }


	                node.getStage()._setPointerPosition(evt);
	                node._setDragPosition(evt);
	                if(!dd.isDragging) {
	                    dd.isDragging = true;
	                    node.fire('dragstart', {
	                        type: 'dragstart',
	                        target: node,
	                        evt: evt
	                    }, true);
	                }

	                // execute ondragmove if defined
	                node.fire('dragmove', {
	                    type: 'dragmove',
	                    target: node,
	                    evt: evt
	                }, true);
	            }
	        },
	        _endDragBefore: function(evt) {
	            var dd = Konva.DD,
	                node = dd.node,
	                layer;

	            if(node) {
	                layer = node.getLayer();
	                dd.anim.stop();

	                // only fire dragend event if the drag and drop
	                // operation actually started.
	                if(dd.isDragging) {
	                    dd.isDragging = false;
	                    dd.justDragged = true;
	                    Konva.listenClickTap = false;

	                    if (evt) {
	                        evt.dragEndNode = node;
	                    }
	                }

	                delete dd.node;

	                (layer || node).draw();
	            }
	        },
	        _endDragAfter: function(evt) {
	            evt = evt || {};
	            var dragEndNode = evt.dragEndNode;

	            if (evt && dragEndNode) {
	                dragEndNode.fire('dragend', {
	                    type: 'dragend',
	                    target: dragEndNode,
	                    evt: evt
	                }, true);
	            }
	        }
	    };

	    // Node extenders

	    /**
	     * initiate drag and drop
	     * @method
	     * @memberof Konva.Node.prototype
	     */
	    Konva.Node.prototype.startDrag = function() {
	        var dd = Konva.DD,
	            stage = this.getStage(),
	            layer = this.getLayer(),
	            pos = stage.getPointerPosition(),
	            ap = this.getAbsolutePosition();

	        if(pos) {
	            if (dd.node) {
	                dd.node.stopDrag();
	            }

	            dd.node = this;
	            dd.startPointerPos = pos;
	            dd.offset.x = pos.x - ap.x;
	            dd.offset.y = pos.y - ap.y;
	            dd.anim.setLayers(layer || this.getLayers());
	            dd.anim.start();

	            this._setDragPosition();
	        }
	    };

	    Konva.Node.prototype._setDragPosition = function(evt) {
	        var dd = Konva.DD,
	            pos = this.getStage().getPointerPosition(),
	            dbf = this.getDragBoundFunc();
	        if (!pos) {
	            return;
	        }
	        var newNodePos = {
	            x: pos.x - dd.offset.x,
	            y: pos.y - dd.offset.y
	        };

	        if(dbf !== undefined) {
	            newNodePos = dbf.call(this, newNodePos, evt);
	        }
	        this.setAbsolutePosition(newNodePos);

	        if (!this._lastPos || this._lastPos.x !== newNodePos.x ||
	            this._lastPos.y !== newNodePos.y) {
	            dd.anim.dirty = true;
	        }

	        this._lastPos = newNodePos;
	    };

	    /**
	     * stop drag and drop
	     * @method
	     * @memberof Konva.Node.prototype
	     */
	    Konva.Node.prototype.stopDrag = function() {
	        var dd = Konva.DD,
	            evt = {};
	        dd._endDragBefore(evt);
	        dd._endDragAfter(evt);
	    };

	    Konva.Node.prototype.setDraggable = function(draggable) {
	        this._setAttr('draggable', draggable);
	        this._dragChange();
	    };

	    var origDestroy = Konva.Node.prototype.destroy;

	    Konva.Node.prototype.destroy = function() {
	        var dd = Konva.DD;

	        // stop DD
	        if(dd.node && dd.node._id === this._id) {

	            this.stopDrag();
	        }

	        origDestroy.call(this);
	    };

	    /**
	     * determine if node is currently in drag and drop mode
	     * @method
	     * @memberof Konva.Node.prototype
	     */
	    Konva.Node.prototype.isDragging = function() {
	        var dd = Konva.DD;
	        return !!(dd.node && dd.node._id === this._id && dd.isDragging);
	    };

	    Konva.Node.prototype._listenDrag = function() {
	        var that = this;

	        this._dragCleanup();

	        if (this.getClassName() === 'Stage') {
	            this.on('contentMousedown.konva contentTouchstart.konva', function(evt) {
	                if(!Konva.DD.node) {
	                    that.startDrag(evt);
	                }
	            });
	        }
	        else {
	            this.on('mousedown.konva touchstart.konva', function(evt) {
	                // ignore right and middle buttons
	                if (evt.evt.button === 1 || evt.evt.button === 2) {
	                    return;
	                }
	                if(!Konva.DD.node) {
	                    that.startDrag(evt);
	                }
	            });
	        }

	        // listening is required for drag and drop
	        /*
	        this._listeningEnabled = true;
	        this._clearSelfAndAncestorCache('listeningEnabled');
	        */
	    };

	    Konva.Node.prototype._dragChange = function() {
	        if(this.attrs.draggable) {
	            this._listenDrag();
	        }
	        else {
	            // remove event listeners
	            this._dragCleanup();

	            /*
	             * force drag and drop to end
	             * if this node is currently in
	             * drag and drop mode
	             */
	            var stage = this.getStage();
	            var dd = Konva.DD;
	            if(stage && dd.node && dd.node._id === this._id) {
	                dd.node.stopDrag();
	            }
	        }
	    };

	    Konva.Node.prototype._dragCleanup = function() {
	        if (this.getClassName() === 'Stage') {
	            this.off('contentMousedown.konva');
	            this.off('contentTouchstart.konva');
	        } else {
	            this.off('mousedown.konva');
	            this.off('touchstart.konva');
	        }
	    };

	    Konva.Factory.addGetterSetter(Konva.Node, 'dragBoundFunc');

	    /**
	     * get/set drag bound function.  This is used to override the default
	     *  drag and drop position
	     * @name dragBoundFunc
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Function} dragBoundFunc
	     * @returns {Function}
	     * @example
	     * // get drag bound function
	     * var dragBoundFunc = node.dragBoundFunc();
	     *
	     * // create vertical drag and drop
	     * node.dragBoundFunc(function(pos){
	     *   return {
	     *     x: this.getAbsolutePosition().x,
	     *     y: pos.y
	     *   };
	     * });
	     */

	    Konva.Factory.addGetter(Konva.Node, 'draggable', false);
	    Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'draggable');

	     /**
	     * get/set draggable flag
	     * @name draggable
	     * @method
	     * @memberof Konva.Node.prototype
	     * @param {Boolean} draggable
	     * @returns {Boolean}
	     * @example
	     * // get draggable flag
	     * var draggable = node.draggable();
	     *
	     * // enable drag and drop
	     * node.draggable(true);
	     *
	     * // disable drag and drop
	     * node.draggable(false);
	     */

	    var html = Konva.document.documentElement;
	    html.addEventListener('mouseup', Konva.DD._endDragBefore, true);
	    html.addEventListener('touchend', Konva.DD._endDragBefore, true);

	    html.addEventListener('mousemove', Konva.DD._drag);
	    html.addEventListener('touchmove', Konva.DD._drag);

	    html.addEventListener('mouseup', Konva.DD._endDragAfter, false);
	    html.addEventListener('touchend', Konva.DD._endDragAfter, false);

	})();

	(function() {
	    'use strict';
	    /**
	     * Rect constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} [config.cornerRadius]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var rect = new Konva.Rect({
	     *   width: 100,
	     *   height: 50,
	     *   fill: 'red',
	     *   stroke: 'black',
	     *   strokeWidth: 5
	     * });
	     */
	    Konva.Rect = function(config) {
	        this.___init(config);
	    };

	    Konva.Rect.prototype = {
	        ___init: function(config) {
	            Konva.Shape.call(this, config);
	            this.className = 'Rect';
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            var cornerRadius = this.getCornerRadius(),
	                width = this.getWidth(),
	                height = this.getHeight();

	            context.beginPath();

	            if(!cornerRadius) {
	                // simple rect - don't bother doing all that complicated maths stuff.
	                context.rect(0, 0, width, height);
	            } else {
	                // arcTo would be nicer, but browser support is patchy (Opera)
	                cornerRadius = Math.min(cornerRadius, width / 2, height / 2);
	                context.moveTo(cornerRadius, 0);
	                context.lineTo(width - cornerRadius, 0);
	                context.arc(width - cornerRadius, cornerRadius, cornerRadius, Math.PI * 3 / 2, 0, false);
	                context.lineTo(width, height - cornerRadius);
	                context.arc(width - cornerRadius, height - cornerRadius, cornerRadius, 0, Math.PI / 2, false);
	                context.lineTo(cornerRadius, height);
	                context.arc(cornerRadius, height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false);
	                context.lineTo(0, cornerRadius);
	                context.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, Math.PI * 3 / 2, false);
	            }
	            context.closePath();
	            context.fillStrokeShape(this);
	        }
	    };

	    Konva.Util.extend(Konva.Rect, Konva.Shape);

	    Konva.Factory.addGetterSetter(Konva.Rect, 'cornerRadius', 0);
	    /**
	     * get/set corner radius
	     * @name cornerRadius
	     * @method
	     * @memberof Konva.Rect.prototype
	     * @param {Number} cornerRadius
	     * @returns {Number}
	     * @example
	     * // get corner radius
	     * var cornerRadius = rect.cornerRadius();
	     *
	     * // set corner radius
	     * rect.cornerRadius(10);
	     */

	    Konva.Collection.mapMethods(Konva.Rect);
	})();

	(function() {
	    'use strict';
	    // the 0.0001 offset fixes a bug in Chrome 27
	    var PIx2 = (Math.PI * 2) - 0.0001,
	        CIRCLE = 'Circle';

	    /**
	     * Circle constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.radius
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * // create circle
	     * var circle = new Konva.Circle({
	     *   radius: 40,
	     *   fill: 'red',
	     *   stroke: 'black'
	     *   strokeWidth: 5
	     * });
	     */
	    Konva.Circle = function(config) {
	        this.___init(config);
	    };

	    Konva.Circle.prototype = {
	        _centroid: true,
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = CIRCLE;
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            context.beginPath();
	            context.arc(0, 0, this.getRadius(), 0, PIx2, false);
	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        // implements Shape.prototype.getWidth()
	        getWidth: function() {
	            return this.getRadius() * 2;
	        },
	        // implements Shape.prototype.getHeight()
	        getHeight: function() {
	            return this.getRadius() * 2;
	        },
	        // implements Shape.prototype.setWidth()
	        setWidth: function(width) {
	            Konva.Node.prototype.setWidth.call(this, width);
	            if (this.radius() !== width / 2) {
	                this.setRadius(width / 2);
	            }
	        },
	        // implements Shape.prototype.setHeight()
	        setHeight: function(height) {
	            Konva.Node.prototype.setHeight.call(this, height);
	            if (this.radius() !== height / 2) {
	                this.setRadius(height / 2);
	            }
	        }
	    };
	    Konva.Util.extend(Konva.Circle, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Circle, 'radius', 0);
	    Konva.Factory.addOverloadedGetterSetter(Konva.Circle, 'radius');

	    /**
	     * get/set radius
	     * @name radius
	     * @method
	     * @memberof Konva.Circle.prototype
	     * @param {Number} radius
	     * @returns {Number}
	     * @example
	     * // get radius
	     * var radius = circle.radius();
	     *
	     * // set radius
	     * circle.radius(10);
	     */

	    Konva.Collection.mapMethods(Konva.Circle);
	})();

	(function() {
	    'use strict';
	    // the 0.0001 offset fixes a bug in Chrome 27
	    var PIx2 = (Math.PI * 2) - 0.0001,
	        ELLIPSE = 'Ellipse';

	    /**
	     * Ellipse constructor
	     * @constructor
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Object} config.radius defines x and y radius
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var ellipse = new Konva.Ellipse({
	     *   radius : {
	     *     x : 50,
	     *     y : 50
	     *   },
	     *   fill: 'red'
	     * });
	     */
	    Konva.Ellipse = function(config) {
	        this.___init(config);
	    };

	    Konva.Ellipse.prototype = {
	        _centroid: true,
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = ELLIPSE;
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            var rx = this.getRadiusX(),
	                ry = this.getRadiusY();

	            context.beginPath();
	            context.save();
	            if(rx !== ry) {
	                context.scale(1, ry / rx);
	            }
	            context.arc(0, 0, rx, 0, PIx2, false);
	            context.restore();
	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        // implements Shape.prototype.getWidth()
	        getWidth: function() {
	            return this.getRadiusX() * 2;
	        },
	        // implements Shape.prototype.getHeight()
	        getHeight: function() {
	            return this.getRadiusY() * 2;
	        },
	        // implements Shape.prototype.setWidth()
	        setWidth: function(width) {
	            Konva.Node.prototype.setWidth.call(this, width);
	            this.setRadius({
	                x: width / 2
	            });
	        },
	        // implements Shape.prototype.setHeight()
	        setHeight: function(height) {
	            Konva.Node.prototype.setHeight.call(this, height);
	            this.setRadius({
	                y: height / 2
	            });
	        }
	    };
	    Konva.Util.extend(Konva.Ellipse, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addComponentsGetterSetter(Konva.Ellipse, 'radius', ['x', 'y']);

	    /**
	     * get/set radius
	     * @name radius
	     * @method
	     * @memberof Konva.Ellipse.prototype
	     * @param {Object} radius
	     * @param {Number} radius.x
	     * @param {Number} radius.y
	     * @returns {Object}
	     * @example
	     * // get radius
	     * var radius = ellipse.radius();
	     *
	     * // set radius
	     * ellipse.radius({
	     *   x: 200,
	     *   y: 100
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Ellipse, 'radiusX', 0);
	    /**
	     * get/set radius x
	     * @name radiusX
	     * @method
	     * @memberof Konva.Ellipse.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get radius x
	     * var radiusX = ellipse.radiusX();
	     *
	     * // set radius x
	     * ellipse.radiusX(200);
	     */

	    Konva.Factory.addGetterSetter(Konva.Ellipse, 'radiusY', 0);
	    /**
	     * get/set radius y
	     * @name radiusY
	     * @method
	     * @memberof Konva.Ellipse.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get radius y
	     * var radiusY = ellipse.radiusY();
	     *
	     * // set radius y
	     * ellipse.radiusY(200);
	     */

	    Konva.Collection.mapMethods(Konva.Ellipse);

	})();

	(function() {
	    'use strict';
	    // the 0.0001 offset fixes a bug in Chrome 27
	    var PIx2 = (Math.PI * 2) - 0.0001;
	    /**
	     * Ring constructor
	     * @constructor
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.innerRadius
	     * @param {Number} config.outerRadius
	     * @param {Boolean} [config.clockwise]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var ring = new Konva.Ring({
	     *   innerRadius: 40,
	     *   outerRadius: 80,
	     *   fill: 'red',
	     *   stroke: 'black',
	     *   strokeWidth: 5
	     * });
	     */
	    Konva.Ring = function(config) {
	        this.___init(config);
	    };

	    Konva.Ring.prototype = {
	        _centroid: true,
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = 'Ring';
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            context.beginPath();
	            context.arc(0, 0, this.getInnerRadius(), 0, PIx2, false);
	            context.moveTo(this.getOuterRadius(), 0);
	            context.arc(0, 0, this.getOuterRadius(), PIx2, 0, true);
	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        // implements Shape.prototype.getWidth()
	        getWidth: function() {
	            return this.getOuterRadius() * 2;
	        },
	        // implements Shape.prototype.getHeight()
	        getHeight: function() {
	            return this.getOuterRadius() * 2;
	        },
	        // implements Shape.prototype.setWidth()
	        setWidth: function(width) {
	            Konva.Node.prototype.setWidth.call(this, width);
	            if (this.outerRadius() !== width / 2) {
	                this.setOuterRadius(width / 2);
	            }
	        },
	        // implements Shape.prototype.setHeight()
	        setHeight: function(height) {
	            Konva.Node.prototype.setHeight.call(this, height);
	            if (this.outerRadius() !== height / 2) {
	                this.setOuterRadius(height / 2);
	            }
	        },
	        setOuterRadius: function(val) {
	            this._setAttr('outerRadius', val);
	            this.setWidth(val * 2);
	            this.setHeight(val * 2);
	        }
	    };
	    Konva.Util.extend(Konva.Ring, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Ring, 'innerRadius', 0);

	    /**
	     * get/set innerRadius
	     * @name innerRadius
	     * @method
	     * @memberof Konva.Ring.prototype
	     * @param {Number} innerRadius
	     * @returns {Number}
	     * @example
	     * // get inner radius
	     * var innerRadius = ring.innerRadius();
	     *
	     * // set inner radius
	     * ring.innerRadius(20);
	     */
	    Konva.Factory.addGetter(Konva.Ring, 'outerRadius', 0);
	    Konva.Factory.addOverloadedGetterSetter(Konva.Ring, 'outerRadius');

	    /**
	     * get/set outerRadius
	     * @name outerRadius
	     * @method
	     * @memberof Konva.Ring.prototype
	     * @param {Number} outerRadius
	     * @returns {Number}
	     * @example
	     * // get outer radius
	     * var outerRadius = ring.outerRadius();
	     *
	     * // set outer radius
	     * ring.outerRadius(20);
	     */

	    Konva.Collection.mapMethods(Konva.Ring);
	})();

	(function() {
	    'use strict';
	    /**
	     * Wedge constructor
	     * @constructor
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.angle in degrees
	     * @param {Number} config.radius
	     * @param {Boolean} [config.clockwise]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * // draw a wedge that's pointing downwards
	     * var wedge = new Konva.Wedge({
	     *   radius: 40,
	     *   fill: 'red',
	     *   stroke: 'black'
	     *   strokeWidth: 5,
	     *   angleDeg: 60,
	     *   rotationDeg: -120
	     * });
	     */
	    Konva.Wedge = function(config) {
	        this.___init(config);
	    };

	    Konva.Wedge.prototype = {
	        _centroid: true,
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = 'Wedge';
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            context.beginPath();
	            context.arc(0, 0, this.getRadius(), 0, Konva.getAngle(this.getAngle()), this.getClockwise());
	            context.lineTo(0, 0);
	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        // implements Shape.prototype.getWidth()
	        getWidth: function() {
	            return this.getRadius() * 2;
	        },
	        // implements Shape.prototype.getHeight()
	        getHeight: function() {
	            return this.getRadius() * 2;
	        },
	        // implements Shape.prototype.setWidth()
	        setWidth: function(width) {
	            Konva.Node.prototype.setWidth.call(this, width);
	            if (this.radius() !== width / 2) {
	                this.setRadius(width / 2);
	            }
	        },
	        // implements Shape.prototype.setHeight()
	        setHeight: function(height) {
	            Konva.Node.prototype.setHeight.call(this, height);
	            if (this.radius() !== height / 2) {
	                this.setRadius(height / 2);
	            }
	        }
	    };
	    Konva.Util.extend(Konva.Wedge, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Wedge, 'radius', 0);

	    /**
	     * get/set radius
	     * @name radius
	     * @method
	     * @memberof Konva.Wedge.prototype
	     * @param {Number} radius
	     * @returns {Number}
	     * @example
	     * // get radius
	     * var radius = wedge.radius();
	     *
	     * // set radius
	     * wedge.radius(10);
	     */

	    Konva.Factory.addGetterSetter(Konva.Wedge, 'angle', 0);

	    /**
	     * get/set angle in degrees
	     * @name angle
	     * @method
	     * @memberof Konva.Wedge.prototype
	     * @param {Number} angle
	     * @returns {Number}
	     * @example
	     * // get angle
	     * var angle = wedge.angle();
	     *
	     * // set angle
	     * wedge.angle(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Wedge, 'clockwise', false);

	    /**
	     * get/set clockwise flag
	     * @name clockwise
	     * @method
	     * @memberof Konva.Wedge.prototype
	     * @param {Number} clockwise
	     * @returns {Number}
	     * @example
	     * // get clockwise flag
	     * var clockwise = wedge.clockwise();
	     *
	     * // draw wedge counter-clockwise
	     * wedge.clockwise(false);
	     *
	     * // draw wedge clockwise
	     * wedge.clockwise(true);
	     */

	    Konva.Factory.backCompat(Konva.Wedge, {
	        angleDeg: 'angle',
	        getAngleDeg: 'getAngle',
	        setAngleDeg: 'setAngle'
	    });

	    Konva.Collection.mapMethods(Konva.Wedge);
	})();

	(function() {
	    'use strict';
	    /**
	     * Arc constructor
	     * @constructor
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.angle in degrees
	     * @param {Number} config.innerRadius
	     * @param {Number} config.outerRadius
	     * @param {Boolean} [config.clockwise]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * // draw a Arc that's pointing downwards
	     * var arc = new Konva.Arc({
	     *   innerRadius: 40,
	     *   outerRadius: 80,
	     *   fill: 'red',
	     *   stroke: 'black'
	     *   strokeWidth: 5,
	     *   angle: 60,
	     *   rotationDeg: -120
	     * });
	     */
	    Konva.Arc = function(config) {
	        this.___init(config);
	    };

	    Konva.Arc.prototype = {
	        _centroid: true,
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = 'Arc';
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            var angle = Konva.getAngle(this.angle()),
	                clockwise = this.clockwise();

	            context.beginPath();
	            context.arc(0, 0, this.getOuterRadius(), 0, angle, clockwise);
	            context.arc(0, 0, this.getInnerRadius(), angle, 0, !clockwise);
	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        // implements Shape.prototype.getWidth()
	        getWidth: function() {
	            return this.getOuterRadius() * 2;
	        },
	        // implements Shape.prototype.getHeight()
	        getHeight: function() {
	            return this.getOuterRadius() * 2;
	        },
	        // implements Shape.prototype.setWidth()
	        setWidth: function(width) {
	            Konva.Node.prototype.setWidth.call(this, width);
	            if (this.getOuterRadius() !== width / 2) {
	                this.setOuterRadius(width / 2);
	            }
	        },
	        // implements Shape.prototype.setHeight()
	        setHeight: function(height) {
	            Konva.Node.prototype.setHeight.call(this, height);
	            if (this.getOuterRadius() !== height / 2) {
	                this.setOuterRadius(height / 2);
	            }
	        }
	    };
	    Konva.Util.extend(Konva.Arc, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Arc, 'innerRadius', 0);

	    /**
	     * get/set innerRadius
	     * @name innerRadius
	     * @method
	     * @memberof Konva.Arc.prototype
	     * @param {Number} innerRadius
	     * @returns {Number}
	     * @example
	     * // get inner radius
	     * var innerRadius = arc.innerRadius();
	     *
	     * // set inner radius
	     * arc.innerRadius(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Arc, 'outerRadius', 0);

	    /**
	     * get/set outerRadius
	     * @name outerRadius
	     * @method
	     * @memberof Konva.Arc.prototype
	     * @param {Number} outerRadius
	     * @returns {Number}
	     * @example
	     * // get outer radius
	     * var outerRadius = arc.outerRadius();
	     *
	     * // set outer radius
	     * arc.outerRadius(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Arc, 'angle', 0);

	    /**
	     * get/set angle in degrees
	     * @name angle
	     * @method
	     * @memberof Konva.Arc.prototype
	     * @param {Number} angle
	     * @returns {Number}
	     * @example
	     * // get angle
	     * var angle = arc.angle();
	     *
	     * // set angle
	     * arc.angle(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Arc, 'clockwise', false);

	    /**
	     * get/set clockwise flag
	     * @name clockwise
	     * @method
	     * @memberof Konva.Arc.prototype
	     * @param {Boolean} clockwise
	     * @returns {Boolean}
	     * @example
	     * // get clockwise flag
	     * var clockwise = arc.clockwise();
	     *
	     * // draw arc counter-clockwise
	     * arc.clockwise(false);
	     *
	     * // draw arc clockwise
	     * arc.clockwise(true);
	     */

	    Konva.Collection.mapMethods(Konva.Arc);
	})();

	(function() {
	    'use strict';
	    // CONSTANTS
	    var IMAGE = 'Image';

	    /**
	     * Image constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Image} config.image
	     * @param {Object} [config.crop]
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var imageObj = new Image();
	     * imageObj.onload = function() {
	     *   var image = new Konva.Image({
	     *     x: 200,
	     *     y: 50,
	     *     image: imageObj,
	     *     width: 100,
	     *     height: 100
	     *   });
	     * };
	     * imageObj.src = '/path/to/image.jpg'
	     */
	    Konva.Image = function(config) {
	        this.___init(config);
	    };

	    Konva.Image.prototype = {
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = IMAGE;
	            this.sceneFunc(this._sceneFunc);
	            this.hitFunc(this._hitFunc);
	        },
	        _useBufferCanvas: function() {
	            return (this.hasShadow() || this.getAbsoluteOpacity() !== 1) && this.hasStroke() && this.getStage();
	        },
	        _sceneFunc: function(context) {
	            var width = this.getWidth(),
	                height = this.getHeight(),
	                image = this.getImage(),
	                cropWidth, cropHeight, params;

	            if (image) {
	                cropWidth = this.getCropWidth();
	                cropHeight = this.getCropHeight();
	                if (cropWidth && cropHeight) {
	                    params = [image, this.getCropX(), this.getCropY(), cropWidth, cropHeight, 0, 0, width, height];
	                } else {
	                    params = [image, 0, 0, width, height];
	                }
	            }

	            if (this.hasFill() || this.hasStroke()) {
	                context.beginPath();
	                context.rect(0, 0, width, height);
	                context.closePath();
	                context.fillStrokeShape(this);
	            }

	            if (image) {
	                context.drawImage.apply(context, params);
	            }
	        },
	        _hitFunc: function(context) {
	            var width = this.getWidth(),
	                height = this.getHeight();

	            context.beginPath();
	            context.rect(0, 0, width, height);
	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        getWidth: function() {
	            var image = this.getImage();
	            return this.attrs.width || (image ? image.width : 0);
	        },
	        getHeight: function() {
	            var image = this.getImage();
	            return this.attrs.height || (image ? image.height : 0);
	        }
	    };
	    Konva.Util.extend(Konva.Image, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Image, 'image');

	    /**
	     * set image
	     * @name setImage
	     * @method
	     * @memberof Konva.Image.prototype
	     * @param {Image} image
	     */

	    /**
	     * get image
	     * @name getImage
	     * @method
	     * @memberof Konva.Image.prototype
	     * @returns {Image}
	     */

	    Konva.Factory.addComponentsGetterSetter(Konva.Image, 'crop', ['x', 'y', 'width', 'height']);
	    /**
	     * get/set crop
	     * @method
	     * @name crop
	     * @memberof Konva.Image.prototype
	     * @param {Object} crop
	     * @param {Number} crop.x
	     * @param {Number} crop.y
	     * @param {Number} crop.width
	     * @param {Number} crop.height
	     * @returns {Object}
	     * @example
	     * // get crop
	     * var crop = image.crop();
	     *
	     * // set crop
	     * image.crop({
	     *   x: 20,
	     *   y: 20,
	     *   width: 20,
	     *   height: 20
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Image, 'cropX', 0);
	    /**
	     * get/set crop x
	     * @method
	     * @name cropX
	     * @memberof Konva.Image.prototype
	     * @param {Number} x
	     * @returns {Number}
	     * @example
	     * // get crop x
	     * var cropX = image.cropX();
	     *
	     * // set crop x
	     * image.cropX(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Image, 'cropY', 0);
	    /**
	     * get/set crop y
	     * @name cropY
	     * @method
	     * @memberof Konva.Image.prototype
	     * @param {Number} y
	     * @returns {Number}
	     * @example
	     * // get crop y
	     * var cropY = image.cropY();
	     *
	     * // set crop y
	     * image.cropY(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Image, 'cropWidth', 0);
	    /**
	     * get/set crop width
	     * @name cropWidth
	     * @method
	     * @memberof Konva.Image.prototype
	     * @param {Number} width
	     * @returns {Number}
	     * @example
	     * // get crop width
	     * var cropWidth = image.cropWidth();
	     *
	     * // set crop width
	     * image.cropWidth(20);
	     */

	    Konva.Factory.addGetterSetter(Konva.Image, 'cropHeight', 0);
	    /**
	     * get/set crop height
	     * @name cropHeight
	     * @method
	     * @memberof Konva.Image.prototype
	     * @param {Number} height
	     * @returns {Number}
	     * @example
	     * // get crop height
	     * var cropHeight = image.cropHeight();
	     *
	     * // set crop height
	     * image.cropHeight(20);
	     */

	    Konva.Collection.mapMethods(Konva.Image);

	    /**
	     * load image from given url and create `Konva.Image` instance
	     * @method
	     * @memberof Konva.Image
	     * @param {String} url image source
	     * @param {Function} callback with Konva.Image instance as first argument
	     * @example
	     *  Konva.Image.fromURL(imageURL, function(image){
	     *    // image is Konva.Image instance
	     *    layer.add(image);
	     *    layer.draw();
	     *  });
	     */
	    Konva.Image.fromURL = function(url, callback) {
	        var img = new Image();
	        img.onload = function() {
	          var image = new Konva.Image({
	            image: img
	          });
	          callback(image);
	        };
	        img.src = url;
	    };
	})();

	/*eslint-disable max-depth */
	(function() {
	    'use strict';
	    // constants
	    var AUTO = 'auto',
	        //CANVAS = 'canvas',
	        CENTER = 'center',
	        CHANGE_KONVA = 'Change.konva',
	        CONTEXT_2D = '2d',
	        DASH = '-',
	        EMPTY_STRING = '',
	        LEFT = 'left',
	        TEXT = 'text',
	        TEXT_UPPER = 'Text',
	        MIDDLE = 'middle',
	        NORMAL = 'normal',
	        PX_SPACE = 'px ',
	        SPACE = ' ',
	        RIGHT = 'right',
	        WORD = 'word',
	        CHAR = 'char',
	        NONE = 'none',
	        ATTR_CHANGE_LIST = ['fontFamily', 'fontSize', 'fontStyle', 'fontVariant', 'padding', 'align', 'lineHeight', 'text', 'width', 'height', 'wrap'],

	        // cached variables
	        attrChangeListLen = ATTR_CHANGE_LIST.length,
	        dummyContext = Konva.Util.createCanvasElement().getContext(CONTEXT_2D);

	    /**
	     * Text constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {String} [config.fontFamily] default is Arial
	     * @param {Number} [config.fontSize] in pixels.  Default is 12
	     * @param {String} [config.fontStyle] can be normal, bold, or italic.  Default is normal
	     * @param {String} [config.fontVariant] can be normal or small-caps.  Default is normal
	     * @param {String} config.text
	     * @param {String} [config.align] can be left, center, or right
	     * @param {Number} [config.padding]
	     * @param {Number} [config.width] default is auto
	     * @param {Number} [config.height] default is auto
	     * @param {Number} [config.lineHeight] default is 1
	     * @param {String} [config.wrap] can be word, char, or none. Default is word
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var text = new Konva.Text({
	     *   x: 10,
	     *   y: 15,
	     *   text: 'Simple Text',
	     *   fontSize: 30,
	     *   fontFamily: 'Calibri',
	     *   fill: 'green'
	     * });
	     */
	    Konva.Text = function(config) {
	        this.___init(config);
	    };
	    function _fillFunc(context) {
	        context.fillText(this.partialText, 0, 0);
	    }
	    function _strokeFunc(context) {
	        context.strokeText(this.partialText, 0, 0);
	    }

	    Konva.Text.prototype = {
	        ___init: function(config) {
	            config = config || {};

	            // set default color to black
	            if (!config.fillLinearGradientColorStops && !config.fillRadialGradientColorStops) {
	                config.fill = config.fill || 'black';
	            }

	            if (config.width === undefined) {
	                config.width = AUTO;
	            }
	            if (config.height === undefined) {
	                config.height = AUTO;
	            }

	            // call super constructor
	            Konva.Shape.call(this, config);

	            this._fillFunc = _fillFunc;
	            this._strokeFunc = _strokeFunc;
	            this.className = TEXT_UPPER;

	            // update text data for certain attr changes
	            for(var n = 0; n < attrChangeListLen; n++) {
	                this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, this._setTextData);
	            }

	            this._setTextData();
	            this.sceneFunc(this._sceneFunc);
	            this.hitFunc(this._hitFunc);
	        },
	        _sceneFunc: function(context) {
	            var p = this.getPadding(),
	                textHeight = this.getTextHeight(),
	                lineHeightPx = this.getLineHeight() * textHeight,
	                textArr = this.textArr,
	                textArrLen = textArr.length,
	                totalWidth = this.getWidth(),
	                n;

	            context.setAttr('font', this._getContextFont());

	            context.setAttr('textBaseline', MIDDLE);
	            context.setAttr('textAlign', LEFT);
	            context.save();
	            if (p) {
	                context.translate(p, 0);
	                context.translate(0, p + textHeight / 2);
	            } else {
	                context.translate(0, textHeight / 2);
	            }


	            // draw text lines
	            for(n = 0; n < textArrLen; n++) {
	                var obj = textArr[n],
	                    text = obj.text,
	                    width = obj.width;

	                // horizontal alignment
	                context.save();
	                if(this.getAlign() === RIGHT) {
	                    context.translate(totalWidth - width - p * 2, 0);
	                }
	                else if(this.getAlign() === CENTER) {
	                    context.translate((totalWidth - width - p * 2) / 2, 0);
	                }

	                this.partialText = text;

	                context.fillStrokeShape(this);
	                context.restore();
	                context.translate(0, lineHeightPx);
	            }
	            context.restore();
	        },
	        _hitFunc: function(context) {
	            var width = this.getWidth(),
	                height = this.getHeight();

	            context.beginPath();
	            context.rect(0, 0, width, height);
	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        setText: function(text) {
	            var str = Konva.Util._isString(text) ? text : text.toString();
	            this._setAttr(TEXT, str);
	            return this;
	        },
	        /**
	         * get width of text area, which includes padding
	         * @method
	         * @memberof Konva.Text.prototype
	         * @returns {Number}
	         */
	        getWidth: function() {
	            return this.attrs.width === AUTO ? this.getTextWidth() + this.getPadding() * 2 : this.attrs.width;
	        },
	        /**
	         * get the height of the text area, which takes into account multi-line text, line heights, and padding
	         * @method
	         * @memberof Konva.Text.prototype
	         * @returns {Number}
	         */
	        getHeight: function() {
	            return this.attrs.height === AUTO ? (this.getTextHeight() * this.textArr.length * this.getLineHeight()) + this.getPadding() * 2 : this.attrs.height;
	        },
	        /**
	         * get text width
	         * @method
	         * @memberof Konva.Text.prototype
	         * @returns {Number}
	         */
	        getTextWidth: function() {
	            return this.textWidth;
	        },
	        /**
	         * get text height
	         * @method
	         * @memberof Konva.Text.prototype
	         * @returns {Number}
	         */
	        getTextHeight: function() {
	            return this.textHeight;
	        },
	        _getTextSize: function(text) {
	            var _context = dummyContext,
	                fontSize = this.getFontSize(),
	                metrics;

	            _context.save();
	            _context.font = this._getContextFont();

	            metrics = _context.measureText(text);
	            _context.restore();
	            return {
	                width: metrics.width,
	                height: parseInt(fontSize, 10)
	            };
	        },
	        _getContextFont: function() {
	            return this.getFontStyle() + SPACE + this.getFontVariant() + SPACE + this.getFontSize() + PX_SPACE + this.getFontFamily();
	        },
	        _addTextLine: function (line, width) {
	            return this.textArr.push({text: line, width: width});
	        },
	        _getTextWidth: function (text) {
	            return dummyContext.measureText(text).width;
	        },
	        _setTextData: function () {
	            var lines = this.getText().split('\n'),
	                fontSize = +this.getFontSize(),
	                textWidth = 0,
	                lineHeightPx = this.getLineHeight() * fontSize,
	                width = this.attrs.width,
	                height = this.attrs.height,
	                fixedWidth = width !== AUTO,
	                fixedHeight = height !== AUTO,
	                padding = this.getPadding(),
	                maxWidth = width - padding * 2,
	                maxHeightPx = height - padding * 2,
	                currentHeightPx = 0,
	                wrap = this.getWrap(),
	                shouldWrap = wrap !== NONE,
	                wrapAtWord = wrap !== CHAR && shouldWrap;

	            this.textArr = [];
	            dummyContext.save();
	            dummyContext.font = this._getContextFont();
	            for (var i = 0, max = lines.length; i < max; ++i) {
	                var line = lines[i],
	                    lineWidth = this._getTextWidth(line);
	                if (fixedWidth && lineWidth > maxWidth) {
	                    /*
	                     * if width is fixed and line does not fit entirely
	                     * break the line into multiple fitting lines
	                     */
	                    while (line.length > 0) {
	                        /*
	                         * use binary search to find the longest substring that
	                         * that would fit in the specified width
	                         */
	                        var low = 0, high = line.length,
	                            match = '', matchWidth = 0;
	                        while (low < high) {
	                            var mid = (low + high) >>> 1,
	                                substr = line.slice(0, mid + 1),
	                                substrWidth = this._getTextWidth(substr);
	                            if (substrWidth <= maxWidth) {
	                                low = mid + 1;
	                                match = substr;
	                                matchWidth = substrWidth;
	                            } else {
	                                high = mid;
	                            }
	                        }
	                        /*
	                         * 'low' is now the index of the substring end
	                         * 'match' is the substring
	                         * 'matchWidth' is the substring width in px
	                         */
	                        if (match) {
	                            // a fitting substring was found
	                            if (wrapAtWord) {
	                                // try to find a space or dash where wrapping could be done
	                                var wrapIndex = Math.max(match.lastIndexOf(SPACE),
	                                                          match.lastIndexOf(DASH)) + 1;
	                                if (wrapIndex > 0) {
	                                    // re-cut the substring found at the space/dash position
	                                    low = wrapIndex;
	                                    match = match.slice(0, low);
	                                    matchWidth = this._getTextWidth(match);
	                                }
	                            }
	                            this._addTextLine(match, matchWidth);
	                            textWidth = Math.max(textWidth, matchWidth);
	                            currentHeightPx += lineHeightPx;
	                            if (!shouldWrap ||
	                                (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx)) {
	                                /*
	                                 * stop wrapping if wrapping is disabled or if adding
	                                 * one more line would overflow the fixed height
	                                 */
	                                break;
	                            }
	                            line = line.slice(low);
	                            if (line.length > 0) {
	                                // Check if the remaining text would fit on one line
	                                lineWidth = this._getTextWidth(line);
	                                if (lineWidth <= maxWidth) {
	                                    // if it does, add the line and break out of the loop
	                                    this._addTextLine(line, lineWidth);
	                                    currentHeightPx += lineHeightPx;
	                                    textWidth = Math.max(textWidth, lineWidth);
	                                    break;
	                                }
	                            }
	                        } else {
	                            // not even one character could fit in the element, abort
	                            break;
	                        }
	                    }
	                } else {
	                    // element width is automatically adjusted to max line width
	                    this._addTextLine(line, lineWidth);
	                    currentHeightPx += lineHeightPx;
	                    textWidth = Math.max(textWidth, lineWidth);
	                }
	                // if element height is fixed, abort if adding one more line would overflow
	                if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
	                    break;
	                }
	            }
	            dummyContext.restore();
	            this.textHeight = fontSize;
	            this.textWidth = textWidth;
	        }
	    };
	    Konva.Util.extend(Konva.Text, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Text, 'fontFamily', 'Arial');

	    /**
	     * get/set font family
	     * @name fontFamily
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} fontFamily
	     * @returns {String}
	     * @example
	     * // get font family
	     * var fontFamily = text.fontFamily();
	     *
	     * // set font family
	     * text.fontFamily('Arial');
	     */

	    Konva.Factory.addGetterSetter(Konva.Text, 'fontSize', 12);

	    /**
	     * get/set font size in pixels
	     * @name fontSize
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {Number} fontSize
	     * @returns {Number}
	     * @example
	     * // get font size
	     * var fontSize = text.fontSize();
	     *
	     * // set font size to 22px
	     * text.fontSize(22);
	     */

	    Konva.Factory.addGetterSetter(Konva.Text, 'fontStyle', NORMAL);

	    /**
	     * set font style.  Can be 'normal', 'italic', or 'bold'.  'normal' is the default.
	     * @name fontStyle
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} fontStyle
	     * @returns {String}
	     * @example
	     * // get font style
	     * var fontStyle = text.fontStyle();
	     *
	     * // set font style
	     * text.fontStyle('bold');
	     */

	    Konva.Factory.addGetterSetter(Konva.Text, 'fontVariant', NORMAL);

	    /**
	     * set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
	     * @name fontVariant
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} fontVariant
	     * @returns {String}
	     * @example
	     * // get font variant
	     * var fontVariant = text.fontVariant();
	     *
	     * // set font variant
	     * text.fontVariant('small-caps');
	     */

	    Konva.Factory.addGetterSetter(Konva.Text, 'padding', 0);

	    /**
	     * set padding
	     * @name padding
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {Number} padding
	     * @returns {Number}
	     * @example
	     * // get padding
	     * var padding = text.padding();
	     *
	     * // set padding to 10 pixels
	     * text.padding(10);
	     */

	    Konva.Factory.addGetterSetter(Konva.Text, 'align', LEFT);

	    /**
	     * get/set horizontal align of text.  Can be 'left', 'center', or 'right'
	     * @name align
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} align
	     * @returns {String}
	     * @example
	     * // get text align
	     * var align = text.align();
	     *
	     * // center text
	     * text.align('center');
	     *
	     * // align text to right
	     * text.align('right');
	     */

	    Konva.Factory.addGetterSetter(Konva.Text, 'lineHeight', 1);

	    /**
	     * get/set line height.  The default is 1.
	     * @name lineHeight
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {Number} lineHeight
	     * @returns {Number}
	     * @example
	     * // get line height
	     * var lineHeight = text.lineHeight();
	     *
	     * // set the line height
	     * text.lineHeight(2);
	     */

	    Konva.Factory.addGetterSetter(Konva.Text, 'wrap', WORD);

	    /**
	     * get/set wrap.  Can be word, char, or none. Default is word.
	     * @name wrap
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} wrap
	     * @returns {String}
	     * @example
	     * // get wrap
	     * var wrap = text.wrap();
	     *
	     * // set wrap
	     * text.wrap('word');
	     */

	    Konva.Factory.addGetter(Konva.Text, 'text', EMPTY_STRING);
	    Konva.Factory.addOverloadedGetterSetter(Konva.Text, 'text');

	    /**
	     * get/set text
	     * @name getText
	     * @method
	     * @memberof Konva.Text.prototype
	     * @param {String} text
	     * @returns {String}
	     * @example
	     * // get text
	     * var text = text.text();
	     *
	     * // set text
	     * text.text('Hello world!');
	     */

	    Konva.Collection.mapMethods(Konva.Text);
	})();

	(function () {
	    'use strict';
	    /**
	     * Line constructor.&nbsp; Lines are defined by an array of points and
	     *  a tension
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Array} config.points
	     * @param {Number} [config.tension] Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
	     *   The default is 0
	     * @param {Boolean} [config.closed] defines whether or not the line shape is closed, creating a polygon or blob
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var line = new Konva.Line({
	     *   x: 100,
	     *   y: 50,
	     *   points: [73, 70, 340, 23, 450, 60, 500, 20],
	     *   stroke: 'red',
	     *   tension: 1
	     * });
	     */
	    Konva.Line = function (config) {
	        this.___init(config);
	    };

	    Konva.Line.prototype = {
	        ___init: function (config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = 'Line';

	            this.on('pointsChange.konva tensionChange.konva closedChange.konva', function () {
	                this._clearCache('tensionPoints');
	            });

	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function (context) {
	            var points = this.getPoints(),
	                length = points.length,
	                tension = this.getTension(),
	                closed = this.getClosed(),
	                tp, len, n;

	            if (!length) {
	                return;
	            }

	            context.beginPath();
	            context.moveTo(points[0], points[1]);

	            // tension
	            if (tension !== 0 && length > 4) {
	                tp = this.getTensionPoints();
	                len = tp.length;
	                n = closed ? 0 : 4;

	                if (!closed) {
	                    context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
	                }

	                while (n < len - 2) {
	                    context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
	                }

	                if (!closed) {
	                    context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
	                }
	            }
	            // no tension
	            else {
	                for (n = 2; n < length; n += 2) {
	                    context.lineTo(points[n], points[n + 1]);
	                }
	            }

	            // closed e.g. polygons and blobs
	            if (closed) {
	                context.closePath();
	                context.fillStrokeShape(this);
	            }
	            // open e.g. lines and splines
	            else {
	                context.strokeShape(this);
	            }
	        },
	        getTensionPoints: function () {
	            return this._getCache('tensionPoints', this._getTensionPoints);
	        },
	        _getTensionPoints: function () {
	            if (this.getClosed()) {
	                return this._getTensionPointsClosed();
	            } else {
	                return Konva.Util._expandPoints(this.getPoints(), this.getTension());
	            }
	        },
	        _getTensionPointsClosed: function () {
	            var p = this.getPoints(),
	                len = p.length,
	                tension = this.getTension(),
	                util = Konva.Util,
	                firstControlPoints = util._getControlPoints(
	                    p[len - 2],
	                    p[len - 1],
	                    p[0],
	                    p[1],
	                    p[2],
	                    p[3],
	                    tension
	                ),
	                lastControlPoints = util._getControlPoints(
	                    p[len - 4],
	                    p[len - 3],
	                    p[len - 2],
	                    p[len - 1],
	                    p[0],
	                    p[1],
	                    tension
	                ),
	                middle = Konva.Util._expandPoints(p, tension),
	                tp = [
	                    firstControlPoints[2],
	                    firstControlPoints[3]
	                ]
	                .concat(middle)
	                .concat([
	                    lastControlPoints[0],
	                    lastControlPoints[1],
	                    p[len - 2],
	                    p[len - 1],
	                    lastControlPoints[2],
	                    lastControlPoints[3],
	                    firstControlPoints[0],
	                    firstControlPoints[1],
	                    p[0],
	                    p[1]
	                ]);

	            return tp;
	        },
	        getWidth: function () {
	            return this.getSelfRect().width;
	        },
	        getHeight: function () {
	            return this.getSelfRect().height;
	        },
	        // overload size detection
	        getSelfRect: function () {
	            var points;
	            if (this.getTension() !== 0) {
	                points = this._getTensionPoints();
	            } else {
	                points = this.getPoints();
	            }
	            var minX = points[0];
	            var maxX = points[0];
	            var minY = points[1];
	            var maxY = points[1];
	            var x, y;
	            for (var i = 0; i < points.length / 2; i++) {
	                x = points[i * 2];
	                y = points[i * 2 + 1];
	                minX = Math.min(minX, x);
	                maxX = Math.max(maxX, x);
	                minY = Math.min(minY, y);
	                maxY = Math.max(maxY, y);
	            }
	            return {
	                x: Math.round(minX),
	                y: Math.round(minY),
	                width: Math.round(maxX - minX),
	                height: Math.round(maxY - minY)
	            };
	        }
	    };
	    Konva.Util.extend(Konva.Line, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Line, 'closed', false);

	    /**
	     * get/set closed flag.  The default is false
	     * @name closed
	     * @method
	     * @memberof Konva.Line.prototype
	     * @param {Boolean} closed
	     * @returns {Boolean}
	     * @example
	     * // get closed flag
	     * var closed = line.closed();
	     *
	     * // close the shape
	     * line.closed(true);
	     *
	     * // open the shape
	     * line.closed(false);
	     */

	    Konva.Factory.addGetterSetter(Konva.Line, 'tension', 0);

	    /**
	     * get/set tension
	     * @name tension
	     * @method
	     * @memberof Konva.Line.prototype
	     * @param {Number} Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
	     *   The default is 0
	     * @returns {Number}
	     * @example
	     * // get tension
	     * var tension = line.tension();
	     *
	     * // set tension
	     * line.tension(3);
	     */

	    Konva.Factory.addGetterSetter(Konva.Line, 'points', []);
	    /**
	     * get/set points array
	     * @name points
	     * @method
	     * @memberof Konva.Line.prototype
	     * @param {Array} points
	     * @returns {Array}
	     * @example
	     * // get points
	     * var points = line.points();
	     *
	     * // set points
	     * line.points([10, 20, 30, 40, 50, 60]);
	     *
	     * // push a new point
	     * line.points(line.points().concat([70, 80]));
	     */

	    Konva.Collection.mapMethods(Konva.Line);
	})();

	(function() {
	    'use strict';
	    /**
	     * Sprite constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {String} config.animation animation key
	     * @param {Object} config.animations animation map
	     * @param {Integer} [config.frameIndex] animation frame index
	     * @param {Image} config.image image object
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var imageObj = new Image();
	     * imageObj.onload = function() {
	     *   var sprite = new Konva.Sprite({
	     *     x: 200,
	     *     y: 100,
	     *     image: imageObj,
	     *     animation: 'standing',
	     *     animations: {
	     *       standing: [
	     *         // x, y, width, height (6 frames)
	     *         0, 0, 49, 109,
	     *         52, 0, 49, 109,
	     *         105, 0, 49, 109,
	     *         158, 0, 49, 109,
	     *         210, 0, 49, 109,
	     *         262, 0, 49, 109
	     *       ],
	     *       kicking: [
	     *         // x, y, width, height (6 frames)
	     *         0, 109, 45, 98,
	     *         45, 109, 45, 98,
	     *         95, 109, 63, 98,
	     *         156, 109, 70, 98,
	     *         229, 109, 60, 98,
	     *         287, 109, 41, 98
	     *       ]
	     *     },
	     *     frameRate: 7,
	     *     frameIndex: 0
	     *   });
	     * };
	     * imageObj.src = '/path/to/image.jpg'
	     */
	    Konva.Sprite = function(config) {
	        this.___init(config);
	    };

	    Konva.Sprite.prototype = {
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = 'Sprite';

	            this._updated = true;
	            var that = this;
	            this.anim = new Konva.Animation(function() {
	                // if we don't need to redraw layer we should return false
	                var updated = that._updated;
	                that._updated = false;
	                return updated;
	            });
	            this.on('animationChange.konva', function() {
	                // reset index when animation changes
	                this.frameIndex(0);
	            });
	            this.on('frameIndexChange.konva', function() {
	                this._updated = true;
	            });
	            // smooth change for frameRate
	            this.on('frameRateChange.konva', function() {
	                if (!this.anim.isRunning()) {
	                    return;
	                }
	                clearInterval(this.interval);
	                this._setInterval();
	            });

	            this.sceneFunc(this._sceneFunc);
	            this.hitFunc(this._hitFunc);
	        },
	        _sceneFunc: function(context) {
	            var anim = this.getAnimation(),
	                index = this.frameIndex(),
	                ix4 = index * 4,
	                set = this.getAnimations()[anim],
	                offsets = this.frameOffsets(),
	                x = set[ix4 + 0],
	                y = set[ix4 + 1],
	                width = set[ix4 + 2],
	                height = set[ix4 + 3],
	                image = this.getImage();

	            if (this.hasFill() || this.hasStroke()) {
	                context.beginPath();
	                context.rect(0, 0, width, height);
	                context.closePath();
	                context.fillStrokeShape(this);
	            }

	            if(image) {
	                if (offsets) {
	                    var offset = offsets[anim],
	                    ix2 = index * 2;
	                    context.drawImage(image, x, y, width, height, offset[ix2 + 0], offset[ix2 + 1], width, height);
	                } else {
	                    context.drawImage(image, x, y, width, height, 0, 0, width, height);
	                }
	            }
	        },
	        _hitFunc: function(context) {
	            var anim = this.getAnimation(),
	                index = this.frameIndex(),
	                ix4 = index * 4,
	                set = this.getAnimations()[anim],
	                offsets = this.frameOffsets(),
	                width = set[ix4 + 2],
	                height = set[ix4 + 3];

	            context.beginPath();
	            if (offsets) {
	                var offset = offsets[anim];
	                var ix2 = index * 2;
	                context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
	            } else {
	                context.rect(0, 0, width, height);
	            }
	            context.closePath();
	            context.fillShape(this);
	        },
	        _useBufferCanvas: function() {
	            return (this.hasShadow() || this.getAbsoluteOpacity() !== 1) && this.hasStroke();
	        },
	        _setInterval: function() {
	            var that = this;
	            this.interval = setInterval(function() {
	                that._updateIndex();
	            }, 1000 / this.getFrameRate());
	        },
	        /**
	         * start sprite animation
	         * @method
	         * @memberof Konva.Sprite.prototype
	         */
	        start: function() {
	            var layer = this.getLayer();

	            /*
	             * animation object has no executable function because
	             *  the updates are done with a fixed FPS with the setInterval
	             *  below.  The anim object only needs the layer reference for
	             *  redraw
	             */
	            this.anim.setLayers(layer);
	            this._setInterval();
	            this.anim.start();
	        },
	        /**
	         * stop sprite animation
	         * @method
	         * @memberof Konva.Sprite.prototype
	         */
	        stop: function() {
	            this.anim.stop();
	            clearInterval(this.interval);
	        },
	        /**
	         * determine if animation of sprite is running or not.  returns true or false
	         * @method
	         * @memberof Konva.Animation.prototype
	         * @returns {Boolean}
	         */
	        isRunning: function() {
	            return this.anim.isRunning();
	        },
	        _updateIndex: function() {
	            var index = this.frameIndex(),
	                animation = this.getAnimation(),
	                animations = this.getAnimations(),
	                anim = animations[animation],
	                len = anim.length / 4;

	            if(index < len - 1) {
	                this.frameIndex(index + 1);
	            }
	            else {
	                this.frameIndex(0);
	            }
	        }
	    };
	    Konva.Util.extend(Konva.Sprite, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Sprite, 'animation');

	    /**
	     * get/set animation key
	     * @name animation
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {String} anim animation key
	     * @returns {String}
	     * @example
	     * // get animation key
	     * var animation = sprite.animation();
	     *
	     * // set animation key
	     * sprite.animation('kicking');
	     */

	    Konva.Factory.addGetterSetter(Konva.Sprite, 'animations');

	    /**
	     * get/set animations map
	     * @name animations
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {Object} animations
	     * @returns {Object}
	     * @example
	     * // get animations map
	     * var animations = sprite.animations();
	     *
	     * // set animations map
	     * sprite.animations({
	     *   standing: [
	     *     // x, y, width, height (6 frames)
	     *     0, 0, 49, 109,
	     *     52, 0, 49, 109,
	     *     105, 0, 49, 109,
	     *     158, 0, 49, 109,
	     *     210, 0, 49, 109,
	     *     262, 0, 49, 109
	     *   ],
	     *   kicking: [
	     *     // x, y, width, height (6 frames)
	     *     0, 109, 45, 98,
	     *     45, 109, 45, 98,
	     *     95, 109, 63, 98,
	     *     156, 109, 70, 98,
	     *     229, 109, 60, 98,
	     *     287, 109, 41, 98
	     *   ]
	     * });
	     */

	    Konva.Factory.addGetterSetter(Konva.Sprite, 'frameOffsets');

	    /**
	    * get/set offsets map
	    * @name offsets
	    * @method
	    * @memberof Konva.Sprite.prototype
	    * @param {Object} offsets
	    * @returns {Object}
	    * @example
	    * // get offsets map
	    * var offsets = sprite.offsets();
	    *
	    * // set offsets map
	    * sprite.offsets({
	    *   standing: [
	    *     // x, y (6 frames)
	    *     0, 0,
	    *     0, 0,
	    *     5, 0,
	    *     0, 0,
	    *     0, 3,
	    *     2, 0
	    *   ],
	    *   kicking: [
	    *     // x, y (6 frames)
	    *     0, 5,
	    *     5, 0,
	    *     10, 0,
	    *     0, 0,
	    *     2, 1,
	    *     0, 0
	    *   ]
	    * });
	    */

	    Konva.Factory.addGetterSetter(Konva.Sprite, 'image');

	    /**
	     * get/set image
	     * @name image
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {Image} image
	     * @returns {Image}
	     * @example
	     * // get image
	     * var image = sprite.image();
	     *
	     * // set image
	     * sprite.image(imageObj);
	     */

	    Konva.Factory.addGetterSetter(Konva.Sprite, 'frameIndex', 0);

	    /**
	     * set/set animation frame index
	     * @name frameIndex
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {Integer} frameIndex
	     * @returns {Integer}
	     * @example
	     * // get animation frame index
	     * var frameIndex = sprite.frameIndex();
	     *
	     * // set animation frame index
	     * sprite.frameIndex(3);
	     */

	    Konva.Factory.addGetterSetter(Konva.Sprite, 'frameRate', 17);

	    /**
	     * get/set frame rate in frames per second.  Increase this number to make the sprite
	     *  animation run faster, and decrease the number to make the sprite animation run slower
	     *  The default is 17 frames per second
	     * @name frameRate
	     * @method
	     * @memberof Konva.Sprite.prototype
	     * @param {Integer} frameRate
	     * @returns {Integer}
	     * @example
	     * // get frame rate
	     * var frameRate = sprite.frameRate();
	     *
	     * // set frame rate to 2 frames per second
	     * sprite.frameRate(2);
	     */

	    Konva.Factory.backCompat(Konva.Sprite, {
	        index: 'frameIndex',
	        getIndex: 'getFrameIndex',
	        setIndex: 'setFrameIndex'
	    });

	    Konva.Collection.mapMethods(Konva.Sprite);
	})();

	/*eslint-disable  no-shadow, max-len, max-depth */
	(function () {
	    'use strict';
	    /**
	     * Path constructor.
	     * @author Jason Follas
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {String} config.data SVG data string
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var path = new Konva.Path({
	     *   x: 240,
	     *   y: 40,
	     *   data: 'M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z',
	     *   fill: 'green',
	     *   scale: 2
	     * });
	     */
	    Konva.Path = function (config) {
	        this.___init(config);
	    };

	    Konva.Path.prototype = {
	        ___init: function (config) {
	            this.dataArray = [];
	            var that = this;

	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = 'Path';

	            this.dataArray = Konva.Path.parsePathData(this.getData());
	            this.on('dataChange.konva', function () {
	                that.dataArray = Konva.Path.parsePathData(this.getData());
	            });

	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            var ca = this.dataArray,
	                closedPath = false;

	            // context position
	            context.beginPath();
	            for (var n = 0; n < ca.length; n++) {
	                var c = ca[n].command;
	                var p = ca[n].points;
	                switch (c) {
	                    case 'L':
	                        context.lineTo(p[0], p[1]);
	                        break;
	                    case 'M':
	                        context.moveTo(p[0], p[1]);
	                        break;
	                    case 'C':
	                        context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
	                        break;
	                    case 'Q':
	                        context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
	                        break;
	                    case 'A':
	                        var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6], fs = p[7];

	                        var r = (rx > ry) ? rx : ry;
	                        var scaleX = (rx > ry) ? 1 : rx / ry;
	                        var scaleY = (rx > ry) ? ry / rx : 1;

	                        context.translate(cx, cy);
	                        context.rotate(psi);
	                        context.scale(scaleX, scaleY);
	                        context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
	                        context.scale(1 / scaleX, 1 / scaleY);
	                        context.rotate(-psi);
	                        context.translate(-cx, -cy);

	                        break;
	                    case 'z':
	                        context.closePath();
	                        closedPath = true;
	                        break;
	                }
	            }

	            if (closedPath) {
	                context.fillStrokeShape(this);
	            }
	            else {
	                context.strokeShape(this);
	            }
	        },
	        getSelfRect: function() {
	            var points = [];
	            this.dataArray.forEach(function(data) {
	                points = points.concat(data.points);
	            });
	            var minX = points[0];
	            var maxX = points[0];
	            var minY = points[1];
	            var maxY = points[1];
	            var x, y;
	            for (var i = 0; i < points.length / 2; i++) {
	                x = points[i * 2]; y = points[i * 2 + 1];
	                minX = Math.min(minX, x);
	                maxX = Math.max(maxX, x);
	                minY = Math.min(minY, y);
	                maxY = Math.max(maxY, y);
	            }
	            return {
	                x: Math.round(minX),
	                y: Math.round(minY),
	                width: Math.round(maxX - minX),
	                height: Math.round(maxY - minY)
	            };
	        }
	    };
	    Konva.Util.extend(Konva.Path, Konva.Shape);

	    Konva.Path.getLineLength = function(x1, y1, x2, y2) {
	        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	    };
	    Konva.Path.getPointOnLine = function(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
	        if(fromX === undefined) {
	            fromX = P1x;
	        }
	        if(fromY === undefined) {
	            fromY = P1y;
	        }

	        var m = (P2y - P1y) / ((P2x - P1x) + 0.00000001);
	        var run = Math.sqrt(dist * dist / (1 + m * m));
	        if(P2x < P1x) {
	            run *= -1;
	        }
	        var rise = m * run;
	        var pt;

	        if (P2x === P1x) { // vertical line
	            pt = {
	                x: fromX,
	                y: fromY + rise
	            };
	        } else if((fromY - P1y) / ((fromX - P1x) + 0.00000001) === m) {
	            pt = {
	                x: fromX + run,
	                y: fromY + rise
	            };
	        }
	        else {
	            var ix, iy;

	            var len = this.getLineLength(P1x, P1y, P2x, P2y);
	            if(len < 0.00000001) {
	                return undefined;
	            }
	            var u = (((fromX - P1x) * (P2x - P1x)) + ((fromY - P1y) * (P2y - P1y)));
	            u = u / (len * len);
	            ix = P1x + u * (P2x - P1x);
	            iy = P1y + u * (P2y - P1y);

	            var pRise = this.getLineLength(fromX, fromY, ix, iy);
	            var pRun = Math.sqrt(dist * dist - pRise * pRise);
	            run = Math.sqrt(pRun * pRun / (1 + m * m));
	            if(P2x < P1x) {
	                run *= -1;
	            }
	            rise = m * run;
	            pt = {
	                x: ix + run,
	                y: iy + rise
	            };
	        }

	        return pt;
	    };

	    Konva.Path.getPointOnCubicBezier = function(pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
	        function CB1(t) {
	            return t * t * t;
	        }
	        function CB2(t) {
	            return 3 * t * t * (1 - t);
	        }
	        function CB3(t) {
	            return 3 * t * (1 - t) * (1 - t);
	        }
	        function CB4(t) {
	            return (1 - t) * (1 - t) * (1 - t);
	        }
	        var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
	        var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);

	        return {
	            x: x,
	            y: y
	        };
	    };
	    Konva.Path.getPointOnQuadraticBezier = function(pct, P1x, P1y, P2x, P2y, P3x, P3y) {
	        function QB1(t) {
	            return t * t;
	        }
	        function QB2(t) {
	            return 2 * t * (1 - t);
	        }
	        function QB3(t) {
	            return (1 - t) * (1 - t);
	        }
	        var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
	        var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);

	        return {
	            x: x,
	            y: y
	        };
	    };
	    Konva.Path.getPointOnEllipticalArc = function(cx, cy, rx, ry, theta, psi) {
	        var cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
	        var pt = {
	            x: rx * Math.cos(theta),
	            y: ry * Math.sin(theta)
	        };
	        return {
	            x: cx + (pt.x * cosPsi - pt.y * sinPsi),
	            y: cy + (pt.x * sinPsi + pt.y * cosPsi)
	        };
	    };
	    /*
	     * get parsed data array from the data
	     *  string.  V, v, H, h, and l data are converted to
	     *  L data for the purpose of high performance Path
	     *  rendering
	     */
	    Konva.Path.parsePathData = function(data) {
	        // Path Data Segment must begin with a moveTo
	        //m (x y)+  Relative moveTo (subsequent points are treated as lineTo)
	        //M (x y)+  Absolute moveTo (subsequent points are treated as lineTo)
	        //l (x y)+  Relative lineTo
	        //L (x y)+  Absolute LineTo
	        //h (x)+    Relative horizontal lineTo
	        //H (x)+    Absolute horizontal lineTo
	        //v (y)+    Relative vertical lineTo
	        //V (y)+    Absolute vertical lineTo
	        //z (closepath)
	        //Z (closepath)
	        //c (x1 y1 x2 y2 x y)+ Relative Bezier curve
	        //C (x1 y1 x2 y2 x y)+ Absolute Bezier curve
	        //q (x1 y1 x y)+       Relative Quadratic Bezier
	        //Q (x1 y1 x y)+       Absolute Quadratic Bezier
	        //t (x y)+    Shorthand/Smooth Relative Quadratic Bezier
	        //T (x y)+    Shorthand/Smooth Absolute Quadratic Bezier
	        //s (x2 y2 x y)+       Shorthand/Smooth Relative Bezier curve
	        //S (x2 y2 x y)+       Shorthand/Smooth Absolute Bezier curve
	        //a (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+     Relative Elliptical Arc
	        //A (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+  Absolute Elliptical Arc

	        // return early if data is not defined
	        if(!data) {
	            return [];
	        }

	        // command string
	        var cs = data;

	        // command chars
	        var cc = ['m', 'M', 'l', 'L', 'v', 'V', 'h', 'H', 'z', 'Z', 'c', 'C', 'q', 'Q', 't', 'T', 's', 'S', 'a', 'A'];
	        // convert white spaces to commas
	        cs = cs.replace(new RegExp(' ', 'g'), ',');
	        // create pipes so that we can split the data
	        for(var n = 0; n < cc.length; n++) {
	            cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
	        }
	        // create array
	        var arr = cs.split('|');
	        var ca = [];
	        // init context point
	        var cpx = 0;
	        var cpy = 0;
	        for( n = 1; n < arr.length; n++) {
	            var str = arr[n];
	            var c = str.charAt(0);
	            str = str.slice(1);
	            // remove ,- for consistency
	            str = str.replace(new RegExp(',-', 'g'), '-');
	            // add commas so that it's easy to split
	            str = str.replace(new RegExp('-', 'g'), ',-');
	            str = str.replace(new RegExp('e,-', 'g'), 'e-');
	            var p = str.split(',');
	            if(p.length > 0 && p[0] === '') {
	                p.shift();
	            }
	            // convert strings to floats
	            for(var i = 0; i < p.length; i++) {
	                p[i] = parseFloat(p[i]);
	            }
	            while(p.length > 0) {
	                if(isNaN(p[0])) {// case for a trailing comma before next command
	                    break;
	                }

	                var cmd = null;
	                var points = [];
	                var startX = cpx, startY = cpy;
	                // Move var from within the switch to up here (jshint)
	                var prevCmd, ctlPtx, ctlPty;     // Ss, Tt
	                var rx, ry, psi, fa, fs, x1, y1; // Aa


	                // convert l, H, h, V, and v to L
	                switch (c) {

	                    // Note: Keep the lineTo's above the moveTo's in this switch
	                    case 'l':
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'L':
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        points.push(cpx, cpy);
	                        break;

	                    // Note: lineTo handlers need to be above this point
	                    case 'm':
	                        var dx = p.shift();
	                        var dy = p.shift();
	                        cpx += dx;
	                        cpy += dy;
	                        cmd = 'M';
	                        // After closing the path move the current position
	                        // to the the first point of the path (if any).
	                        if(ca.length > 2 && ca[ca.length - 1].command === 'z'){
	                            for(var idx = ca.length - 2; idx >= 0; idx--){
	                                if(ca[idx].command === 'M'){
	                                    cpx = ca[idx].points[0] + dx;
	                                    cpy = ca[idx].points[1] + dy;
	                                    break;
	                                }
	                            }
	                        }
	                        points.push(cpx, cpy);
	                        c = 'l';
	                        // subsequent points are treated as relative lineTo
	                        break;
	                    case 'M':
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        cmd = 'M';
	                        points.push(cpx, cpy);
	                        c = 'L';
	                        // subsequent points are treated as absolute lineTo
	                        break;

	                    case 'h':
	                        cpx += p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'H':
	                        cpx = p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'v':
	                        cpy += p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'V':
	                        cpy = p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'C':
	                        points.push(p.shift(), p.shift(), p.shift(), p.shift());
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        points.push(cpx, cpy);
	                        break;
	                    case 'c':
	                        points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'C';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'S':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        prevCmd = ca[ca.length - 1];
	                        if(prevCmd.command === 'C') {
	                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
	                            ctlPty = cpy + (cpy - prevCmd.points[3]);
	                        }
	                        points.push(ctlPtx, ctlPty, p.shift(), p.shift());
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        cmd = 'C';
	                        points.push(cpx, cpy);
	                        break;
	                    case 's':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        prevCmd = ca[ca.length - 1];
	                        if(prevCmd.command === 'C') {
	                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
	                            ctlPty = cpy + (cpy - prevCmd.points[3]);
	                        }
	                        points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'C';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'Q':
	                        points.push(p.shift(), p.shift());
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        points.push(cpx, cpy);
	                        break;
	                    case 'q':
	                        points.push(cpx + p.shift(), cpy + p.shift());
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'Q';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'T':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        prevCmd = ca[ca.length - 1];
	                        if(prevCmd.command === 'Q') {
	                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
	                            ctlPty = cpy + (cpy - prevCmd.points[1]);
	                        }
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        cmd = 'Q';
	                        points.push(ctlPtx, ctlPty, cpx, cpy);
	                        break;
	                    case 't':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        prevCmd = ca[ca.length - 1];
	                        if(prevCmd.command === 'Q') {
	                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
	                            ctlPty = cpy + (cpy - prevCmd.points[1]);
	                        }
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'Q';
	                        points.push(ctlPtx, ctlPty, cpx, cpy);
	                        break;
	                    case 'A':
	                        rx = p.shift();
	                        ry = p.shift();
	                        psi = p.shift();
	                        fa = p.shift();
	                        fs = p.shift();
	                        x1 = cpx;
	                        y1 = cpy;
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        cmd = 'A';
	                        points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
	                        break;
	                    case 'a':
	                        rx = p.shift();
	                        ry = p.shift();
	                        psi = p.shift();
	                        fa = p.shift();
	                        fs = p.shift();
	                        x1 = cpx;
	                        y1 = cpy; cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'A';
	                        points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
	                        break;
	                }

	                ca.push({
	                    command: cmd || c,
	                    points: points,
	                    start: {
	                        x: startX,
	                        y: startY
	                    },
	                    pathLength: this.calcLength(startX, startY, cmd || c, points)
	                });
	            }

	            if(c === 'z' || c === 'Z') {
	                ca.push({
	                    command: 'z',
	                    points: [],
	                    start: undefined,
	                    pathLength: 0
	                });
	            }
	        }

	        return ca;
	    };
	    Konva.Path.calcLength = function(x, y, cmd, points) {
	        var len, p1, p2, t;
	        var path = Konva.Path;

	        switch (cmd) {
	            case 'L':
	                return path.getLineLength(x, y, points[0], points[1]);
	            case 'C':
	                // Approximates by breaking curve into 100 line segments
	                len = 0.0;
	                p1 = path.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
	                for( t = 0.01; t <= 1; t += 0.01) {
	                    p2 = path.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
	                    len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                    p1 = p2;
	                }
	                return len;
	            case 'Q':
	                // Approximates by breaking curve into 100 line segments
	                len = 0.0;
	                p1 = path.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
	                for( t = 0.01; t <= 1; t += 0.01) {
	                    p2 = path.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
	                    len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                    p1 = p2;
	                }
	                return len;
	            case 'A':
	                // Approximates by breaking curve into line segments
	                len = 0.0;
	                var start = points[4];
	                // 4 = theta
	                var dTheta = points[5];
	                // 5 = dTheta
	                var end = points[4] + dTheta;
	                var inc = Math.PI / 180.0;
	                // 1 degree resolution
	                if(Math.abs(start - end) < inc) {
	                    inc = Math.abs(start - end);
	                }
	                // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi
	                p1 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
	                if(dTheta < 0) {// clockwise
	                    for( t = start - inc; t > end; t -= inc) {
	                        p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
	                        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                        p1 = p2;
	                    }
	                }
	                else {// counter-clockwise
	                    for( t = start + inc; t < end; t += inc) {
	                        p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
	                        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                        p1 = p2;
	                    }
	                }
	                p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
	                len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);

	                return len;
	        }

	        return 0;
	    };
	    Konva.Path.convertEndpointToCenterParameterization = function(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
	        // Derived from: http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
	        var psi = psiDeg * (Math.PI / 180.0);
	        var xp = Math.cos(psi) * (x1 - x2) / 2.0 + Math.sin(psi) * (y1 - y2) / 2.0;
	        var yp = -1 * Math.sin(psi) * (x1 - x2) / 2.0 + Math.cos(psi) * (y1 - y2) / 2.0;

	        var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);

	        if(lambda > 1) {
	            rx *= Math.sqrt(lambda);
	            ry *= Math.sqrt(lambda);
	        }

	        var f = Math.sqrt((((rx * rx) * (ry * ry)) - ((rx * rx) * (yp * yp)) - ((ry * ry) * (xp * xp))) / ((rx * rx) * (yp * yp) + (ry * ry) * (xp * xp)));

	        if(fa === fs) {
	            f *= -1;
	        }
	        if(isNaN(f)) {
	            f = 0;
	        }

	        var cxp = f * rx * yp / ry;
	        var cyp = f * -ry * xp / rx;

	        var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
	        var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;

	        var vMag = function(v) {
	            return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	        };
	        var vRatio = function(u, v) {
	            return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
	        };
	        var vAngle = function(u, v) {
	            return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
	        };
	        var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
	        var u = [(xp - cxp) / rx, (yp - cyp) / ry];
	        var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
	        var dTheta = vAngle(u, v);

	        if(vRatio(u, v) <= -1) {
	            dTheta = Math.PI;
	        }
	        if(vRatio(u, v) >= 1) {
	            dTheta = 0;
	        }
	        if(fs === 0 && dTheta > 0) {
	            dTheta = dTheta - 2 * Math.PI;
	        }
	        if(fs === 1 && dTheta < 0) {
	            dTheta = dTheta + 2 * Math.PI;
	        }
	        return [cx, cy, rx, ry, theta, dTheta, psi, fs];
	    };
	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Path, 'data');

	    /**
	     * set SVG path data string.  This method
	     *  also automatically parses the data string
	     *  into a data array.  Currently supported SVG data:
	     *  M, m, L, l, H, h, V, v, Q, q, T, t, C, c, S, s, A, a, Z, z
	     * @name setData
	     * @method
	     * @memberof Konva.Path.prototype
	     * @param {String} SVG path command string
	     */

	    /**
	     * get SVG path data string
	     * @name getData
	     * @method
	     * @memberof Konva.Path.prototype
	     */

	    Konva.Collection.mapMethods(Konva.Path);
	})();

	(function() {
	    'use strict';
	    var EMPTY_STRING = '',
	        //CALIBRI = 'Calibri',
	        NORMAL = 'normal';

	    /**
	     * Path constructor.
	     * @author Jason Follas
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {String} [config.fontFamily] default is Calibri
	     * @param {Number} [config.fontSize] default is 12
	     * @param {String} [config.fontStyle] can be normal, bold, or italic.  Default is normal
	     * @param {String} [config.fontVariant] can be normal or small-caps.  Default is normal
	     * @param {String} config.text
	     * @param {String} config.data SVG data string
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var textpath = new Konva.TextPath({
	     *   x: 100,
	     *   y: 50,
	     *   fill: '#333',
	     *   fontSize: '24',
	     *   fontFamily: 'Arial',
	     *   text: 'All the world\'s a stage, and all the men and women merely players.',
	     *   data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50'
	     * });
	     */
	    Konva.TextPath = function(config) {
	        this.___init(config);
	    };

	    function _fillFunc(context) {
	        context.fillText(this.partialText, 0, 0);
	    }
	    function _strokeFunc(context) {
	        context.strokeText(this.partialText, 0, 0);
	    }

	    Konva.TextPath.prototype = {
	        ___init: function(config) {
	            var that = this;
	            this.dummyCanvas = Konva.Util.createCanvasElement();
	            this.dataArray = [];

	            // call super constructor
	            Konva.Shape.call(this, config);

	            // overrides
	            // TODO: shouldn't this be on the prototype?
	            this._fillFunc = _fillFunc;
	            this._strokeFunc = _strokeFunc;
	            this._fillFuncHit = _fillFunc;
	            this._strokeFuncHit = _strokeFunc;

	            this.className = 'TextPath';

	            this.dataArray = Konva.Path.parsePathData(this.attrs.data);
	            this.on('dataChange.konva', function() {
	                that.dataArray = Konva.Path.parsePathData(this.attrs.data);
	            });

	            // update text data for certain attr changes
	            this.on('textChange.konva textStroke.konva textStrokeWidth.konva', that._setTextData);
	            that._setTextData();
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            context.setAttr('font', this._getContextFont());
	            context.setAttr('textBaseline', 'middle');
	            context.setAttr('textAlign', 'left');
	            context.save();

	            var glyphInfo = this.glyphInfo;
	            for(var i = 0; i < glyphInfo.length; i++) {
	                context.save();

	                var p0 = glyphInfo[i].p0;

	                context.translate(p0.x, p0.y);
	                context.rotate(glyphInfo[i].rotation);
	                this.partialText = glyphInfo[i].text;

	                context.fillStrokeShape(this);
	                context.restore();

	                //// To assist with debugging visually, uncomment following
	                // context.beginPath();
	                // if (i % 2)
	                // context.strokeStyle = 'cyan';
	                // else
	                // context.strokeStyle = 'green';
	                // var p1 = glyphInfo[i].p1;
	                // context.moveTo(p0.x, p0.y);
	                // context.lineTo(p1.x, p1.y);
	                // context.stroke();
	            }
	            context.restore();
	        },
	        /**
	         * get text width in pixels
	         * @method
	         * @memberof Konva.TextPath.prototype
	         */
	        getTextWidth: function() {
	            return this.textWidth;
	        },
	        /**
	         * get text height in pixels
	         * @method
	         * @memberof Konva.TextPath.prototype
	         */
	        getTextHeight: function() {
	            return this.textHeight;
	        },
	        /**
	         * set text
	         * @method
	         * @memberof Konva.TextPath.prototype
	         * @param {String} text
	         */
	        setText: function(text) {
	            Konva.Text.prototype.setText.call(this, text);
	        },
	        _getTextSize: function(text) {
	            var dummyCanvas = this.dummyCanvas;
	            var _context = dummyCanvas.getContext('2d');

	            _context.save();

	            _context.font = this._getContextFont();
	            var metrics = _context.measureText(text);

	            _context.restore();

	            return {
	                width: metrics.width,
	                height: parseInt(this.attrs.fontSize, 10)
	            };
	        },
	        _setTextData: function() {

	            var that = this;
	            var size = this._getTextSize(this.attrs.text);
	            this.textWidth = size.width;
	            this.textHeight = size.height;

	            this.glyphInfo = [];

	            var charArr = this.attrs.text.split('');

	            var p0, p1, pathCmd;

	            var pIndex = -1;
	            var currentT = 0;

	            var getNextPathSegment = function() {
	                currentT = 0;
	                var pathData = that.dataArray;

	                for(var j = pIndex + 1; j < pathData.length; j++) {
	                    if(pathData[j].pathLength > 0) {
	                        pIndex = j;

	                        return pathData[j];
	                    }
	                    else if(pathData[j].command === 'M') {
	                        p0 = {
	                            x: pathData[j].points[0],
	                            y: pathData[j].points[1]
	                        };
	                    }
	                }

	                return {};
	            };
	            var findSegmentToFitCharacter = function(c) {

	                var glyphWidth = that._getTextSize(c).width;

	                var currLen = 0;
	                var attempts = 0;

	                p1 = undefined;
	                while(Math.abs(glyphWidth - currLen) / glyphWidth > 0.01 && attempts < 25) {
	                    attempts++;
	                    var cumulativePathLength = currLen;
	                    while(pathCmd === undefined) {
	                        pathCmd = getNextPathSegment();

	                        if(pathCmd && cumulativePathLength + pathCmd.pathLength < glyphWidth) {
	                            cumulativePathLength += pathCmd.pathLength;
	                            pathCmd = undefined;
	                        }
	                    }

	                    if(pathCmd === {} || p0 === undefined) {
	                        return undefined;
	                    }

	                    var needNewSegment = false;

	                    switch (pathCmd.command) {
	                        case 'L':
	                            if(Konva.Path.getLineLength(p0.x, p0.y, pathCmd.points[0], pathCmd.points[1]) > glyphWidth) {
	                                p1 = Konva.Path.getPointOnLine(glyphWidth, p0.x, p0.y, pathCmd.points[0], pathCmd.points[1], p0.x, p0.y);
	                            }
	                            else {
	                                pathCmd = undefined;
	                            }
	                            break;
	                        case 'A':

	                            var start = pathCmd.points[4];
	                            // 4 = theta
	                            var dTheta = pathCmd.points[5];
	                            // 5 = dTheta
	                            var end = pathCmd.points[4] + dTheta;

	                            if(currentT === 0){
	                                currentT = start + 0.00000001;
	                            }
	                            // Just in case start is 0
	                            else if(glyphWidth > currLen) {
	                                currentT += (Math.PI / 180.0) * dTheta / Math.abs(dTheta);
	                            }
	                            else {
	                                currentT -= Math.PI / 360.0 * dTheta / Math.abs(dTheta);
	                            }

	                            // Credit for bug fix: @therth https://github.com/ericdrowell/KonvaJS/issues/249
	                            // Old code failed to render text along arc of this path: "M 50 50 a 150 50 0 0 1 250 50 l 50 0"
	                            if(dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) {
	                                currentT = end;
	                                needNewSegment = true;
	                            }
	                            p1 = Konva.Path.getPointOnEllipticalArc(pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], currentT, pathCmd.points[6]);
	                            break;
	                        case 'C':
	                            if(currentT === 0) {
	                                if(glyphWidth > pathCmd.pathLength) {
	                                    currentT = 0.00000001;
	                                }
	                                else {
	                                    currentT = glyphWidth / pathCmd.pathLength;
	                                }
	                            }
	                            else if(glyphWidth > currLen) {
	                                currentT += (glyphWidth - currLen) / pathCmd.pathLength;
	                            }
	                            else {
	                                currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
	                            }

	                            if(currentT > 1.0) {
	                                currentT = 1.0;
	                                needNewSegment = true;
	                            }
	                            p1 = Konva.Path.getPointOnCubicBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], pathCmd.points[4], pathCmd.points[5]);
	                            break;
	                        case 'Q':
	                            if(currentT === 0) {
	                                currentT = glyphWidth / pathCmd.pathLength;
	                            }
	                            else if(glyphWidth > currLen) {
	                                currentT += (glyphWidth - currLen) / pathCmd.pathLength;
	                            }
	                            else {
	                                currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
	                            }

	                            if(currentT > 1.0) {
	                                currentT = 1.0;
	                                needNewSegment = true;
	                            }
	                            p1 = Konva.Path.getPointOnQuadraticBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3]);
	                            break;

	                    }

	                    if(p1 !== undefined) {
	                        currLen = Konva.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
	                    }

	                    if(needNewSegment) {
	                        needNewSegment = false;
	                        pathCmd = undefined;
	                    }
	                }
	            };
	            for(var i = 0; i < charArr.length; i++) {

	                // Find p1 such that line segment between p0 and p1 is approx. width of glyph
	                findSegmentToFitCharacter(charArr[i]);

	                if(p0 === undefined || p1 === undefined) {
	                    break;
	                }

	                var width = Konva.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);

	                // Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
	                // Can foresee having a rough pair table built in that the developer can override as needed.

	                var kern = 0;
	                // placeholder for future implementation

	                var midpoint = Konva.Path.getPointOnLine(kern + width / 2.0, p0.x, p0.y, p1.x, p1.y);

	                var rotation = Math.atan2((p1.y - p0.y), (p1.x - p0.x));
	                this.glyphInfo.push({
	                    transposeX: midpoint.x,
	                    transposeY: midpoint.y,
	                    text: charArr[i],
	                    rotation: rotation,
	                    p0: p0,
	                    p1: p1
	                });
	                p0 = p1;
	            }
	        },
	        getSelfRect: function() {
	            var points = [];
	            var fontSize = this.fontSize();

	            this.glyphInfo.forEach(function(info) {
	                points.push(info.p0.x);
	                points.push(info.p0.y);
	                points.push(info.p1.x);
	                points.push(info.p1.y);
	            });
	            var minX = points[0];
	            var maxX = points[0];
	            var minY = points[0];
	            var maxY = points[0];
	            var x, y;
	            for (var i = 0; i < points.length / 2; i++) {
	                x = points[i * 2]; y = points[i * 2 + 1];
	                minX = Math.min(minX, x);
	                maxX = Math.max(maxX, x);
	                minY = Math.min(minY, y);
	                maxY = Math.max(maxY, y);
	            }
	            return {
	                x: Math.round(minX) - fontSize,
	                y: Math.round(minY) - fontSize,
	                width: Math.round(maxX - minX) + fontSize * 2,
	                height: Math.round(maxY - minY) + fontSize * 2
	            };
	        }
	    };

	    // map TextPath methods to Text
	    Konva.TextPath.prototype._getContextFont = Konva.Text.prototype._getContextFont;

	    Konva.Util.extend(Konva.TextPath, Konva.Shape);

	    // add setters and getters
	    Konva.Factory.addGetterSetter(Konva.TextPath, 'fontFamily', 'Arial');

	    /**
	     * set font family
	     * @name setFontFamily
	     * @method
	     * @memberof Konva.TextPath.prototype
	     * @param {String} fontFamily
	     */

	     /**
	     * get font family
	     * @name getFontFamily
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.TextPath, 'fontSize', 12);

	    /**
	     * set font size
	     * @name setFontSize
	     * @method
	     * @memberof Konva.TextPath.prototype
	     * @param {int} fontSize
	     */

	     /**
	     * get font size
	     * @name getFontSize
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.TextPath, 'fontStyle', NORMAL);

	    /**
	     * set font style.  Can be 'normal', 'italic', or 'bold'.  'normal' is the default.
	     * @name setFontStyle
	     * @method
	     * @memberof Konva.TextPath.prototype
	     * @param {String} fontStyle
	     */

	     /**
	     * get font style
	     * @name getFontStyle
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.TextPath, 'fontVariant', NORMAL);

	    /**
	     * set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
	     * @name setFontVariant
	     * @method
	     * @memberof Konva.TextPath.prototype
	     * @param {String} fontVariant
	     */

	    /**
	     * @get font variant
	     * @name getFontVariant
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	    Konva.Factory.addGetter(Konva.TextPath, 'text', EMPTY_STRING);

	    /**
	     * get text
	     * @name getText
	     * @method
	     * @memberof Konva.TextPath.prototype
	     */

	    Konva.Collection.mapMethods(Konva.TextPath);
	})();

	(function() {
	    'use strict';
	    /**
	     * RegularPolygon constructor.&nbsp; Examples include triangles, squares, pentagons, hexagons, etc.
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Number} config.sides
	     * @param {Number} config.radius
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var hexagon = new Konva.RegularPolygon({
	     *   x: 100,
	     *   y: 200,
	     *   sides: 6,
	     *   radius: 70,
	     *   fill: 'red',
	     *   stroke: 'black',
	     *   strokeWidth: 4
	     * });
	     */
	    Konva.RegularPolygon = function(config) {
	        this.___init(config);
	    };

	    Konva.RegularPolygon.prototype = {
	        _centroid: true,
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = 'RegularPolygon';
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            var sides = this.attrs.sides,
	                radius = this.attrs.radius,
	                n, x, y;

	            context.beginPath();
	            context.moveTo(0, 0 - radius);

	            for(n = 1; n < sides; n++) {
	                x = radius * Math.sin(n * 2 * Math.PI / sides);
	                y = -1 * radius * Math.cos(n * 2 * Math.PI / sides);
	                context.lineTo(x, y);
	            }
	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        getWidth: function() {
	            return this.getRadius() * 2;
	        },
	        // implements Shape.prototype.getHeight()
	        getHeight: function() {
	            return this.getRadius() * 2;
	        },
	        // implements Shape.prototype.setWidth()
	        setWidth: function(width) {
	            Konva.Node.prototype.setWidth.call(this, width);
	            if (this.radius() !== width / 2) {
	                this.setRadius(width / 2);
	            }
	        },
	        // implements Shape.prototype.setHeight()
	        setHeight: function(height) {
	            Konva.Node.prototype.setHeight.call(this, height);
	            if (this.radius() !== height / 2) {
	                this.setRadius(height / 2);
	            }
	        }
	    };
	    Konva.Util.extend(Konva.RegularPolygon, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.RegularPolygon, 'radius', 0);

	    /**
	     * set radius
	     * @name setRadius
	     * @method
	     * @memberof Konva.RegularPolygon.prototype
	     * @param {Number} radius
	     */

	     /**
	     * get radius
	     * @name getRadius
	     * @method
	     * @memberof Konva.RegularPolygon.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.RegularPolygon, 'sides', 0);

	    /**
	     * set number of sides
	     * @name setSides
	     * @method
	     * @memberof Konva.RegularPolygon.prototype
	     * @param {int} sides
	     */

	    /**
	     * get number of sides
	     * @name getSides
	     * @method
	     * @memberof Konva.RegularPolygon.prototype
	     */

	    Konva.Collection.mapMethods(Konva.RegularPolygon);
	})();

	(function() {
	    'use strict';
	    /**
	     * Star constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Integer} config.numPoints
	     * @param {Number} config.innerRadius
	     * @param {Number} config.outerRadius
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var star = new Konva.Star({
	     *   x: 100,
	     *   y: 200,
	     *   numPoints: 5,
	     *   innerRadius: 70,
	     *   outerRadius: 70,
	     *   fill: 'red',
	     *   stroke: 'black',
	     *   strokeWidth: 4
	     * });
	     */
	    Konva.Star = function(config) {
	        this.___init(config);
	    };

	    Konva.Star.prototype = {
	        _centroid: true,
	        ___init: function(config) {
	            // call super constructor
	            Konva.Shape.call(this, config);
	            this.className = 'Star';
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            var innerRadius = this.innerRadius(),
	                outerRadius = this.outerRadius(),
	                numPoints = this.numPoints();

	            context.beginPath();
	            context.moveTo(0, 0 - outerRadius);

	            for(var n = 1; n < numPoints * 2; n++) {
	                var radius = n % 2 === 0 ? outerRadius : innerRadius;
	                var x = radius * Math.sin(n * Math.PI / numPoints);
	                var y = -1 * radius * Math.cos(n * Math.PI / numPoints);
	                context.lineTo(x, y);
	            }
	            context.closePath();

	            context.fillStrokeShape(this);
	        },
	        // implements Shape.prototype.getWidth()
	        getWidth: function() {
	            return this.getOuterRadius() * 2;
	        },
	        // implements Shape.prototype.getHeight()
	        getHeight: function() {
	            return this.getOuterRadius() * 2;
	        },
	        // implements Shape.prototype.setWidth()
	        setWidth: function(width) {
	            Konva.Node.prototype.setWidth.call(this, width);
	            if (this.outerRadius() !== width / 2) {
	                this.setOuterRadius(width / 2);
	            }
	        },
	        // implements Shape.prototype.setHeight()
	        setHeight: function(height) {
	            Konva.Node.prototype.setHeight.call(this, height);
	            if (this.outerRadius() !== height / 2) {
	                this.setOuterRadius(height / 2);
	            }
	        }
	    };
	    Konva.Util.extend(Konva.Star, Konva.Shape);

	    // add getters setters
	    Konva.Factory.addGetterSetter(Konva.Star, 'numPoints', 5);

	    /**
	     * set number of points
	     * @name setNumPoints
	     * @method
	     * @memberof Konva.Star.prototype
	     * @param {Integer} points
	     */

	     /**
	     * get number of points
	     * @name getNumPoints
	     * @method
	     * @memberof Konva.Star.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.Star, 'innerRadius', 0);

	    /**
	     * set inner radius
	     * @name setInnerRadius
	     * @method
	     * @memberof Konva.Star.prototype
	     * @param {Number} radius
	     */

	     /**
	     * get inner radius
	     * @name getInnerRadius
	     * @method
	     * @memberof Konva.Star.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.Star, 'outerRadius', 0);

	    /**
	     * set outer radius
	     * @name setOuterRadius
	     * @method
	     * @memberof Konva.Star.prototype
	     * @param {Number} radius
	     */

	     /**
	     * get outer radius
	     * @name getOuterRadius
	     * @method
	     * @memberof Konva.Star.prototype
	     */

	    Konva.Collection.mapMethods(Konva.Star);
	})();

	(function() {
	    'use strict';
	    // constants
	    var ATTR_CHANGE_LIST = ['fontFamily', 'fontSize', 'fontStyle', 'padding', 'lineHeight', 'text'],
	        CHANGE_KONVA = 'Change.konva',
	        NONE = 'none',
	        UP = 'up',
	        RIGHT = 'right',
	        DOWN = 'down',
	        LEFT = 'left',
	        LABEL = 'Label',

	     // cached variables
	     attrChangeListLen = ATTR_CHANGE_LIST.length;

	    /**
	     * Label constructor.&nbsp; Labels are groups that contain a Text and Tag shape
	     * @constructor
	     * @memberof Konva
	     * @param {Object} config
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * // create label
	     * var label = new Konva.Label({
	     *   x: 100,
	     *   y: 100,
	     *   draggable: true
	     * });
	     *
	     * // add a tag to the label
	     * label.add(new Konva.Tag({
	     *   fill: '#bbb',
	     *   stroke: '#333',
	     *   shadowColor: 'black',
	     *   shadowBlur: 10,
	     *   shadowOffset: [10, 10],
	     *   shadowOpacity: 0.2,
	     *   lineJoin: 'round',
	     *   pointerDirection: 'up',
	     *   pointerWidth: 20,
	     *   pointerHeight: 20,
	     *   cornerRadius: 5
	     * }));
	     *
	     * // add text to the label
	     * label.add(new Konva.Text({
	     *   text: 'Hello World!',
	     *   fontSize: 50,
	     *   lineHeight: 1.2,
	     *   padding: 10,
	     *   fill: 'green'
	     *  }));
	     */
	    Konva.Label = function(config) {
	        this.____init(config);
	    };

	    Konva.Label.prototype = {
	        ____init: function(config) {
	            var that = this;

	            Konva.Group.call(this, config);
	            this.className = LABEL;

	            this.on('add.konva', function(evt) {
	                that._addListeners(evt.child);
	                that._sync();
	            });
	        },
	        /**
	         * get Text shape for the label.  You need to access the Text shape in order to update
	         * the text properties
	         * @name getText
	         * @method
	         * @memberof Konva.Label.prototype
	         */
	        getText: function() {
	            return this.find('Text')[0];
	        },
	        /**
	         * get Tag shape for the label.  You need to access the Tag shape in order to update
	         * the pointer properties and the corner radius
	         * @name getTag
	         * @method
	         * @memberof Konva.Label.prototype
	         */
	        getTag: function() {
	            return this.find('Tag')[0];
	        },
	        _addListeners: function(text) {
	            var that = this,
	                n;
	            var func = function(){
	                    that._sync();
	                };

	            // update text data for certain attr changes
	            for(n = 0; n < attrChangeListLen; n++) {
	                text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
	            }
	        },
	        getWidth: function() {
	            return this.getText().getWidth();
	        },
	        getHeight: function() {
	            return this.getText().getHeight();
	        },
	        _sync: function() {
	            var text = this.getText(),
	                tag = this.getTag(),
	                width, height, pointerDirection, pointerWidth, x, y, pointerHeight;

	            if (text && tag) {
	                width = text.getWidth();
	                height = text.getHeight();
	                pointerDirection = tag.getPointerDirection();
	                pointerWidth = tag.getPointerWidth();
	                pointerHeight = tag.getPointerHeight();
	                x = 0;
	                y = 0;

	                switch(pointerDirection) {
	                    case UP:
	                        x = width / 2;
	                        y = -1 * pointerHeight;
	                        break;
	                    case RIGHT:
	                        x = width + pointerWidth;
	                        y = height / 2;
	                        break;
	                    case DOWN:
	                        x = width / 2;
	                        y = height + pointerHeight;
	                        break;
	                    case LEFT:
	                        x = -1 * pointerWidth;
	                        y = height / 2;
	                        break;
	                }

	                tag.setAttrs({
	                    x: -1 * x,
	                    y: -1 * y,
	                    width: width,
	                    height: height
	                });

	                text.setAttrs({
	                    x: -1 * x,
	                    y: -1 * y
	                });
	            }
	        }
	    };

	    Konva.Util.extend(Konva.Label, Konva.Group);

	    Konva.Collection.mapMethods(Konva.Label);

	    /**
	     * Tag constructor.&nbsp; A Tag can be configured
	     *  to have a pointer element that points up, right, down, or left
	     * @constructor
	     * @memberof Konva
	     * @param {Object} config
	     * @param {String} [config.pointerDirection] can be up, right, down, left, or none; the default
	     *  is none.  When a pointer is present, the positioning of the label is relative to the tip of the pointer.
	     * @param {Number} [config.pointerWidth]
	     * @param {Number} [config.pointerHeight]
	     * @param {Number} [config.cornerRadius]
	     */
	    Konva.Tag = function(config) {
	        this.___init(config);
	    };

	    Konva.Tag.prototype = {
	        ___init: function(config) {
	            Konva.Shape.call(this, config);
	            this.className = 'Tag';
	            this.sceneFunc(this._sceneFunc);
	        },
	        _sceneFunc: function(context) {
	            var width = this.getWidth(),
	                height = this.getHeight(),
	                pointerDirection = this.getPointerDirection(),
	                pointerWidth = this.getPointerWidth(),
	                pointerHeight = this.getPointerHeight(),
	                cornerRadius = Math.min(this.getCornerRadius(), width / 2, height / 2);

	            context.beginPath();
	            if (!cornerRadius) {
	                context.moveTo(0, 0);
	            } else {
	                context.moveTo(cornerRadius, 0);
	            }

	            if (pointerDirection === UP) {
	                context.lineTo((width - pointerWidth) / 2, 0);
	                context.lineTo(width / 2, -1 * pointerHeight);
	                context.lineTo((width + pointerWidth) / 2, 0);
	            }

	            if(!cornerRadius) {
	                context.lineTo(width, 0);
	            } else {
	                context.lineTo(width - cornerRadius, 0);
	                context.arc(width - cornerRadius, cornerRadius, cornerRadius, Math.PI * 3 / 2, 0, false);
	            }

	            if (pointerDirection === RIGHT) {
	                context.lineTo(width, (height - pointerHeight) / 2);
	                context.lineTo(width + pointerWidth, height / 2);
	                context.lineTo(width, (height + pointerHeight) / 2);
	            }

	            if(!cornerRadius) {
	                context.lineTo(width, height);
	            } else {
	                context.lineTo(width, height - cornerRadius);
	                context.arc(width - cornerRadius, height - cornerRadius, cornerRadius, 0, Math.PI / 2, false);
	            }

	            if (pointerDirection === DOWN) {
	                context.lineTo((width + pointerWidth) / 2, height);
	                context.lineTo(width / 2, height + pointerHeight);
	                context.lineTo((width - pointerWidth) / 2, height);
	            }

	            if(!cornerRadius) {
	                context.lineTo(0, height);
	            } else {
	                context.lineTo(cornerRadius, height);
	                context.arc(cornerRadius, height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false);
	            }

	            if (pointerDirection === LEFT) {
	                context.lineTo(0, (height + pointerHeight) / 2);
	                context.lineTo(-1 * pointerWidth, height / 2);
	                context.lineTo(0, (height - pointerHeight) / 2);
	            }

	            if(cornerRadius) {
	                context.lineTo(0, cornerRadius);
	                context.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, Math.PI * 3 / 2, false);
	            }

	            context.closePath();
	            context.fillStrokeShape(this);
	        },
	        getSelfRect: function() {
	            var x = 0,
	                y = 0,
	                pointerWidth = this.getPointerWidth(),
	                pointerHeight = this.getPointerHeight(),
	                direction = this.pointerDirection(),
	                width = this.getWidth(),
	                height = this.getHeight();

	            if (direction === UP) {
	                y -= pointerHeight;
	                height += pointerHeight;
	            } else if (direction === DOWN) {
	                height += pointerHeight;
	            } else if (direction === LEFT) {
	                // ARGH!!! I have no idea why should I used magic 1.5!!!!!!!!!
	                x -= pointerWidth * 1.5;
	                width += pointerWidth;
	            } else if (direction === RIGHT) {
	                width += pointerWidth * 1.5;
	            }
	            return {
	                x: x,
	                y: y,
	                width: width,
	                height: height
	            };
	        }
	    };

	    Konva.Util.extend(Konva.Tag, Konva.Shape);
	    Konva.Factory.addGetterSetter(Konva.Tag, 'pointerDirection', NONE);

	    /**
	     * set pointer Direction
	     * @name setPointerDirection
	     * @method
	     * @memberof Konva.Tag.prototype
	     * @param {String} pointerDirection can be up, right, down, left, or none.  The
	     *  default is none
	     */

	     /**
	     * get pointer Direction
	     * @name getPointerDirection
	     * @method
	     * @memberof Konva.Tag.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.Tag, 'pointerWidth', 0);

	    /**
	     * set pointer width
	     * @name setPointerWidth
	     * @method
	     * @memberof Konva.Tag.prototype
	     * @param {Number} pointerWidth
	     */

	     /**
	     * get pointer width
	     * @name getPointerWidth
	     * @method
	     * @memberof Konva.Tag.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.Tag, 'pointerHeight', 0);

	    /**
	     * set pointer height
	     * @name setPointerHeight
	     * @method
	     * @memberof Konva.Tag.prototype
	     * @param {Number} pointerHeight
	     */

	     /**
	     * get pointer height
	     * @name getPointerHeight
	     * @method
	     * @memberof Konva.Tag.prototype
	     */

	    Konva.Factory.addGetterSetter(Konva.Tag, 'cornerRadius', 0);

	    /**
	     * set corner radius
	     * @name setCornerRadius
	     * @method
	     * @memberof Konva.Tag.prototype
	     * @param {Number} corner radius
	     */

	    /**
	     * get corner radius
	     * @name getCornerRadius
	     * @method
	     * @memberof Konva.Tag.prototype
	     */

	    Konva.Collection.mapMethods(Konva.Tag);
	})();

	(function() {
	    'use strict';
	    /**
	     * Arrow constructor
	     * @constructor
	     * @memberof Konva
	     * @augments Konva.Shape
	     * @param {Object} config
	     * @param {Array} config.points
	     * @param {Number} [config.tension] Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
	     *   The default is 0
	     * @param {Number} config.pointerLength
	     * @param {Number} config.pointerWidth
	     * @param {String} [config.fill] fill color
	     * @param {Image} [config.fillPatternImage] fill pattern image
	     * @param {Number} [config.fillPatternX]
	     * @param {Number} [config.fillPatternY]
	     * @param {Object} [config.fillPatternOffset] object with x and y component
	     * @param {Number} [config.fillPatternOffsetX] 
	     * @param {Number} [config.fillPatternOffsetY] 
	     * @param {Object} [config.fillPatternScale] object with x and y component
	     * @param {Number} [config.fillPatternScaleX]
	     * @param {Number} [config.fillPatternScaleY]
	     * @param {Number} [config.fillPatternRotation]
	     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
	     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientStartPointX]
	     * @param {Number} [config.fillLinearGradientStartPointY]
	     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillLinearGradientEndPointX]
	     * @param {Number} [config.fillLinearGradientEndPointY]
	     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
	     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientStartPointX]
	     * @param {Number} [config.fillRadialGradientStartPointY]
	     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
	     * @param {Number} [config.fillRadialGradientEndPointX] 
	     * @param {Number} [config.fillRadialGradientEndPointY] 
	     * @param {Number} [config.fillRadialGradientStartRadius]
	     * @param {Number} [config.fillRadialGradientEndRadius]
	     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
	     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
	     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
	     * @param {String} [config.stroke] stroke color
	     * @param {Number} [config.strokeWidth] stroke width
	     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
	     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
	     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
	     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
	     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
	     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
	     *  is miter
	     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
	     *  is butt
	     * @param {String} [config.shadowColor]
	     * @param {Number} [config.shadowBlur]
	     * @param {Object} [config.shadowOffset] object with x and y component
	     * @param {Number} [config.shadowOffsetX]
	     * @param {Number} [config.shadowOffsetY]
	     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
	     *  between 0 and 1
	     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
	     * @param {Array} [config.dash]
	     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
	     * @param {Number} [config.x]
	     * @param {Number} [config.y]
	     * @param {Number} [config.width]
	     * @param {Number} [config.height]
	     * @param {Boolean} [config.visible]
	     * @param {Boolean} [config.listening] whether or not the node is listening for events
	     * @param {String} [config.id] unique id
	     * @param {String} [config.name] non-unique name
	     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
	     * @param {Object} [config.scale] set scale
	     * @param {Number} [config.scaleX] set scale x
	     * @param {Number} [config.scaleY] set scale y
	     * @param {Number} [config.rotation] rotation in degrees
	     * @param {Object} [config.offset] offset from center point and rotation point
	     * @param {Number} [config.offsetX] set offset x
	     * @param {Number} [config.offsetY] set offset y
	     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
	     *  the entire stage by dragging any portion of the stage
	     * @param {Number} [config.dragDistance]
	     * @param {Function} [config.dragBoundFunc]
	     * @example
	     * var line = new Konva.Line({
	     *   points: [73, 70, 340, 23, 450, 60, 500, 20],
	     *   stroke: 'red',
	     *   tension: 1,
	     *   pointerLength : 10,
	     *   pointerWidth : 12
	     * });
	     */
	    Konva.Arrow = function(config) {
	        this.____init(config);
	    };

	    Konva.Arrow.prototype = {
	        ____init: function(config) {
	            // call super constructor
	            Konva.Line.call(this, config);
	            this.className = 'Arrow';
	        },
	        _sceneFunc: function(ctx) {
	            Konva.Line.prototype._sceneFunc.apply(this, arguments);
	            var PI2 = Math.PI * 2;
	            var points = this.points();
	            var n = points.length;
	            var dx = points[n - 2] - points[n - 4];
	            var dy = points[n - 1] - points[n - 3];
	            var radians = (Math.atan2(dy, dx) + PI2) % PI2;
	            var length = this.pointerLength();
	            var width = this.pointerWidth();

	            ctx.save();
	            ctx.beginPath();
	            ctx.translate(points[n - 2], points[n - 1]);
	            ctx.rotate(radians);
	            ctx.moveTo(0, 0);
	            ctx.lineTo(-length, width / 2);
	            ctx.lineTo(-length, -width / 2);
	            ctx.closePath();
	            ctx.restore();

	            if (this.pointerAtBeginning()) {
	                ctx.save();
	                ctx.translate(points[0], points[1]);
	                dx = points[2] - points[0];
	                dy = points[3] - points[1];
	                ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
	                ctx.moveTo(0, 0);
	                ctx.lineTo(-length, width / 2);
	                ctx.lineTo(-length, -width / 2);
	                ctx.closePath();
	                ctx.restore();
	            }
	            ctx.fillStrokeShape(this);
	        }
	    };

	    Konva.Util.extend(Konva.Arrow, Konva.Line);
	    /**
	     * get/set pointerLength
	     * @name pointerLength
	     * @method
	     * @memberof Konva.Arrow.prototype
	     * @param {Number} Length of pointer of arrow.
	     *   The default is 10.
	     * @returns {Number}
	     * @example
	     * // get tension
	     * var pointerLength = line.pointerLength();
	     *
	     * // set tension
	     * line.pointerLength(15);
	     */

	    Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerLength', 10);
	    /**
	     * get/set pointerWidth
	     * @name pointerWidth
	     * @method
	     * @memberof Konva.Arrow.prototype
	     * @param {Number} Width of pointer of arrow.
	     *   The default is 10.
	     * @returns {Number}
	     * @example
	     * // get tension
	     * var pointerWidth = line.pointerWidth();
	     *
	     * // set tension
	     * line.pointerWidth(15);
	     */

	    Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerWidth', 10);
	    /**
	     * get/set pointerAtBeginning
	     * @name pointerAtBeginning
	     * @method
	     * @memberof Konva.Arrow.prototype
	     * @param {Number} Should pointer displayed at beginning of arrow.
	     *   The default is false.
	     * @returns {Boolean}
	     * @example
	     * // get tension
	     * var pointerAtBeginning = line.pointerAtBeginning();
	     *
	     * // set tension
	     * line.pointerAtBeginning(true);
	     */

	    Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerAtBeginning', false);
	    Konva.Collection.mapMethods(Konva.Arrow);

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ]);