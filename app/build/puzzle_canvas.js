webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _konva = __webpack_require__(6);

	var _konva2 = _interopRequireDefault(_konva);

	var _underscore = __webpack_require__(5);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	// var option = {
	//     sellerNick: 'cndlwy',
	//     module: ["device", "media", "server", "social", "widget", "sensor", "share", "buy", "im", "calendar", "prize"],
	//     console: 1
	// }
	//
	// Tida.ready(option, function() {
	//     load();
	// })

	load();

	function load() {

	    var activity = {
	        x: 3,
	        y: 3,
	        items: [{
	            id: 0,
	            link: "img/puzzle/p1.jpg"
	        }, {
	            id: 1,
	            link: "img/puzzle/p2.jpg"
	        }, {
	            id: 2,
	            link: "img/puzzle/p3.jpg"
	        }, {
	            id: 3,
	            link: "img/puzzle/p4.jpg"
	        }, {
	            id: 4,
	            link: "img/puzzle/p5.jpg"
	        }, {
	            id: 5,
	            link: "img/puzzle/p6.jpg"
	        }, {
	            id: 6,
	            link: "img/puzzle/p7.jpg"
	        }, {
	            id: 7,
	            link: "img/puzzle/p8.jpg"
	        }, {
	            id: 8,
	            link: "img/puzzle/p9.jpg"
	        }]
	    };

	    //混淆位置之后的数据
	    activity.suffleItems = _underscore2.default.shuffle(activity.items);

	    var x = activity.x;
	    var y = activity.y;

	    var margin = 5;
	    var left = 20;
	    var top = 20;

	    // 位置以及对应的坐标
	    var items = [];
	    var width = window.innerWidth;
	    if (width > 480) width = 480;

	    var dragImage = null;
	    var previousImage = null;

	    var imageWidth = (width - 40) / x;
	    var shadowx = 1;
	    var shadowy = 1;

	    var stage = new _konva2.default.Stage({
	        container: 'container',
	        width: width,
	        height: imageWidth * y + 40
	    });

	    // add canvas element
	    var layer = new _konva2.default.Layer();
	    stage.add(layer);

	    var tempLayer = new _konva2.default.Layer();
	    stage.add(tempLayer);

	    stage.on('touchstart, dragstart', function (e) {
	        console.log("touch start");
	        dragImage = e.target;
	        console.log("position: " + dragImage.position);
	        e.target.moveTo(tempLayer);
	        e.target.opacity(0.5);
	        layer.draw();
	    });

	    stage.on('touchmove dragmove', function (evt) {
	        console.log("touch move");

	        var pos = stage.getPointerPosition();

	        // 底层被drag image enter的image
	        var image = layer.getIntersection(pos);

	        if (previousImage && image) {
	            if (previousImage !== image) {
	                // leave from old targer
	                previousImage.fire('dragleave', {
	                    type: 'dragleave',
	                    target: previousImage,
	                    evt: evt.evt
	                }, true);

	                // enter new targer
	                image.fire('dragenter', {
	                    type: 'dragenter',
	                    target: image,
	                    evt: evt.evt
	                }, true);
	                previousImage = image;
	            }
	        }

	        if (!previousImage && image) {
	            previousImage = image;
	            image.fire('dragenter', {
	                type: 'dragenter',
	                target: image,
	                evt: evt.evt
	            }, true);
	        }
	    });

	    stage.on('touchend, dragend', function (e) {
	        console.log("touch end");

	        exchangePosition();

	        e.target.moveTo(layer);
	        layer.draw();
	        tempLayer.draw();

	        validatePosition();
	    });

	    // 进入image区域
	    stage.on('dragenter', function (e) {
	        console.log("drag enter");
	        e.target.opacity(0.3);
	        layer.draw();
	    });

	    // 离开image区域
	    stage.on('dragleave', function (e) {
	        console.log("drag leave");
	        e.target.opacity(1);
	        layer.draw();
	    });

	    loadImages();

	    function validatePosition() {
	        var images = stage.find('Image');

	        //调整之后的位置是否等于初始位置
	        var item = _underscore2.default.find(images, function (image) {
	            return image.position !== image.oriIndex;
	        });

	        if (!item) {
	            alert("ok");

	            stage.clear();

	            _konva2.default.Image.fromURL("img/puzzle/3.jpg", function (image) {
	                // image is Konva.Image instance
	                image.x(left);
	                image.y(top);

	                var layer = new _konva2.default.Layer();
	                stage.add(layer);
	                layer.add(image);
	                layer.draw();
	            });
	        }
	    }

	    function exchangePosition() {
	        var dragItem = items.filter(function (i) {
	            return i.position === dragImage.position;
	        })[0];
	        var changeItem = items.filter(function (i) {
	            return i.position === previousImage.position;
	        })[0];

	        previousImage.x(dragItem.x);
	        previousImage.y(dragItem.y);
	        previousImage.opacity(1);
	        previousImage.position = dragItem.position;

	        dragImage.x(changeItem.x);
	        dragImage.y(changeItem.y);
	        dragImage.opacity(1);
	        dragImage.position = changeItem.position;
	    }

	    function loadImage(imageObj, i, j, num) {

	        imageObj.onload = function () {
	            var x = imageWidth * i + left;
	            var y = imageWidth * j + top;

	            var image = new _konva2.default.Image({
	                x: x,
	                y: y,
	                image: imageObj,
	                width: imageWidth - margin,
	                height: imageWidth - margin,
	                draggable: true,
	                opacity: 1,
	                shadowOffsetX: shadowx,
	                shadowOffsetY: shadowy
	            });

	            // 图片混淆之后的位置
	            image.position = num;
	            // 图片的初始位置
	            image.oriIndex = activity.suffleItems[num].id;

	            var item = {
	                x: x,
	                y: y,
	                position: num
	            };
	            items.push(item);

	            layer.add(image);
	            layer.draw();
	        };
	    }

	    function loadImages(layer, tempLayer) {
	        var num = 0;

	        for (var i = 0; i < x; i++) {
	            for (var j = 0; j < y; j++) {
	                var path = activity.suffleItems[num].link;
	                var imageObj = new Image();
	                imageObj.src = path;

	                loadImage(imageObj, i, j, num);
	                num = num + 1;
	            }
	        }
	    }
	}

/***/ }
]);