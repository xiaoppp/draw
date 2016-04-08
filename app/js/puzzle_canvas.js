
import Konva from 'konva';
import _ from 'underscore';

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

    let activity = {
        x: 3,
        y: 3,
        items: [
            {
                id: 0,
                link: "img/puzzle/p1.jpg"
            },
            {
                id: 1,
                link: "img/puzzle/p2.jpg"
            },
            {
                id: 2,
                link: "img/puzzle/p3.jpg"
            },
            {
                id: 3,
                link: "img/puzzle/p4.jpg"
            },
            {
                id: 4,
                link: "img/puzzle/p5.jpg"
            },
            {
                id: 5,
                link: "img/puzzle/p6.jpg"
            },
            {
                id: 6,
                link: "img/puzzle/p7.jpg"
            },
            {
                id: 7,
                link: "img/puzzle/p8.jpg"
            },
            {
                id: 8,
                link: "img/puzzle/p9.jpg"
            }
        ]
    }

    //混淆位置之后的数据
    activity.suffleItems = _.shuffle(activity.items);

    const x = activity.x;
    const y = activity.y;

    const margin = 5;
    const left = 20;
    const top = 20;

    // 位置以及对应的坐标
    let items = [];
    let width = window.innerWidth;
    if (width > 480)
        width = 480;

    let dragImage = null;
    let previousImage = null;

    const imageWidth = (width - 40) / x;
    const shadowx = 1;
    const shadowy = 1;

    const stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: imageWidth * y + 40
    });

    // add canvas element
    const layer = new Konva.Layer();
    stage.add(layer);

    const tempLayer = new Konva.Layer();
    stage.add(tempLayer);

    stage.on('touchstart, dragstart', function(e) {
        console.log("touch start");
        dragImage = e.target;
        console.log("position: " + dragImage.position);
        e.target.moveTo(tempLayer);
        e.target.opacity(0.5);
        layer.draw();
    });

    stage.on('touchmove dragmove', function(evt) {
        console.log("touch move");

        let pos = stage.getPointerPosition();

        // 底层被drag image enter的image
        let image = layer.getIntersection(pos);

        if (previousImage && image) {
            if (previousImage !== image) {
                    // leave from old targer
                    previousImage.fire('dragleave', {
                        type : 'dragleave',
                        target : previousImage,
                        evt : evt.evt
                    }, true);

                    // enter new targer
                    image.fire('dragenter', {
                        type : 'dragenter',
                        target : image,
                        evt : evt.evt
                    }, true);
                    previousImage = image;
                }
        }

        if (!previousImage && image) {
            previousImage = image;
            image.fire('dragenter', {
                   type : 'dragenter',
                   target : image,
                   evt : evt.evt
               }, true);
        }
    });

    stage.on('touchend, dragend', function(e) {
        console.log("touch end");

        exchangePosition();

        e.target.moveTo(layer);
        layer.draw();
        tempLayer.draw();

        validatePosition();
    });

    // 进入image区域
    stage.on('dragenter', function(e) {
        console.log("drag enter");
        e.target.opacity(0.3);
        layer.draw();
    })

    // 离开image区域
    stage.on('dragleave', function(e) {
        console.log("drag leave");
        e.target.opacity(1);
        layer.draw();
    })

    loadImages();

    function validatePosition() {
        const images = stage.find('Image');

        //调整之后的位置是否等于初始位置
        let item = _.find(images, image => image.position !== image.oriIndex);

        if (!item) {
            alert("ok");

            stage.clear();

            Konva.Image.fromURL("img/puzzle/3.jpg", function(image) {
                // image is Konva.Image instance
                image.x(left);
                image.y(top);

                const layer = new Konva.Layer();
                stage.add(layer);
                layer.add(image);
                layer.draw();
            });
        }
    }

    function exchangePosition() {
        let dragItem = items.filter(i => i.position === dragImage.position)[0];
        let changeItem = items.filter(i => i.position === previousImage.position)[0];

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

        imageObj.onload = function() {
            let x = (imageWidth) * i + left;
            let y = (imageWidth) * j + top;

            let image = new Konva.Image({
                x: x,
                y: y,
                image: imageObj,
                width: imageWidth - margin,
                height: imageWidth - margin,
                draggable: true,
                opacity: 1,
                shadowOffsetX : shadowx,
                shadowOffsetY : shadowy
            });

            // 图片混淆之后的位置
            image.position = num;
            // 图片的初始位置
            image.oriIndex = activity.suffleItems[num].id;

            let item = {
                x: x,
                y: y,
                position: num
            }
            items.push(item);

            layer.add(image);
            layer.draw();
        }
    }

    function loadImages(layer, tempLayer) {
        let num = 0;

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j ++) {
                let path = activity.suffleItems[num].link;
                let imageObj = new Image();
                imageObj.src = path;

                loadImage(imageObj, i, j, num);
                num = num + 1;
            }
        }
    }
}
