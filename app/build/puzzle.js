webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Vue = __webpack_require__(2);
	var _ = __webpack_require__(5);
	var x = 4;
	var y = 5;

	function addItems() {

	    var fullwidth = window.innerWidth - 40;
	    var imagewidth = fullwidth / x;

	    for (var i = 1; i <= x * y; i++) {
	        var item = {
	            id: i,
	            index: i,
	            link: "img/puzzle/p" + i + ".jpeg"
	        };
	        vm.items.push(item);
	    }
	}

	function load() {
	    addItems();
	}

	var vm = new Vue({
	    el: '#app',
	    data: {
	        items: []
	    },
	    methods: {
	        dragstart: handleStart,
	        dragend: handleEnd,
	        dragover: handleOver,
	        dragenter: handleEnter,
	        drop: handleDrop
	    }
	});

	var dragElem = null;
	var dragNode = null;
	var targetNode = null;

	function handleStart(evt) {
	    dragNode = evt.target;
	    console.log("dragstart");

	    var st = dragNode.style;
	    Vue.nextTick(function () {
	        st.opacity = 0;
	    });
	}

	function handleEnd(evt) {
	    console.log("dragend");
	    dragNode.style.opacity = 1;

	    evt.preventDefault();
	    return true;
	}

	function handleOver(evt) {
	    evt.preventDefault();
	    return true;
	}

	function handleEnter(evt) {
	    console.log("dragenter");
	    targetNode = evt.target;

	    evt.preventDefault();
	    return true;
	}

	function handleDrop(evt) {

	    var targetIndex = _.findIndex(vm.items, function (item) {
	        return item.id == targetNode.id;
	    });
	    var originIndex = _.findIndex(vm.items, function (item) {
	        return item.id == dragNode.id;
	    });

	    if (targetIndex == originIndex) return console.log("＝＝");

	    var targetItem = vm.items[targetIndex];
	    var originItem = vm.items[originIndex];

	    vm.items.$set(targetIndex, originItem);
	    vm.items.$set(originIndex, targetItem);
	}

	load();

/***/ }
]);