loadWheel();

function loadWheel() {
    let fullWidth = window.innerWidth;
    if (fullWidth > 480)
        fullWidth = 480;

    let stageWidth = fullWidth - 30;

    const pointerWidth = 100;
    const pointerHeight = 130;

    Konva.angleDeg = false;
    //角度旋转速率
    let angularVelocity = 30;
    //是否旋转
    var controlled = false;
    //摩擦系数
    var angularFriction = 0.1;

    //wedge 数目
    const numWedges = 6;

    const stage = new Konva.Stage({
        container: 'container',
        width: fullWidth,
        height: fullWidth,
        x: 15,
        y: 0
    });

    const layer = new Konva.Layer();
    const imageLayer = new Konva.Layer();

    const anim = new Konva.Animation(animate, layer);

    let selectWedge = null;
    let time = -1;
    let selectIndexs = [0, 2, 3];

    const wheel = new Konva.Group({
        x: stageWidth / 2,
        y: stageWidth / 2
    });

    function load() {
        for(var n = 0; n < numWedges; n++) {
            let item = {};

            if (n === 0) {
                item.atype = "MOBILEFARE";
                item.color = "#fc6769";
            }
            if (n === 1) {
                item.atype = "COUPON";
                item.color = "#fd8484";
            }
            if (n === 2) {
                item.atype = "REDPACKET";
                item.color = "#fc6769";
            }
            if (n === 3) {
                item.atype = "FLOW";
                item.color = "#fd8484";
            }
            if (n === 4) {
                item.atype = "thanks";
                item.color = "#fc6769";
            }
            if (n === 5) {
                item.atype = "ITEM";
                item.color = "#fd8484";
            }

            item.awardlink = "img/wheel/" + item.atype + ".png";
            addWedge(n, item);
        }

        addPointer();
    }

    function addPointer() {
        Konva.Image.fromURL("img/wheel/ring.png", function(image) {
            image.x(0);
            image.y(0);
            image.width(stageWidth);
            image.height(stageWidth);

            imageLayer.add(image);
            imageLayer.draw();
        });

        Konva.Image.fromURL("img/wheel/pointer.png", function(image) {
            image.x(stageWidth / 2 - pointerWidth / 2);
            image.y(stageWidth / 2 - pointerHeight / 2);
            image.width(pointerWidth);
            image.height(pointerHeight);

            image.on('mousedown', function (e) {

                //selectIndex = _.random(0, 5);
                time += 1;

                if (time > 2)
                    return alert("超过三次了，别贪得无厌！");

                if (selectWedge)
                    selectWedge.fill("#fd8484");

                anim.start();
            })

            imageLayer.add(image);
            imageLayer.draw();
        });
    }

    function addWedge(n, item) {
        const angle = 2 * Math.PI / numWedges;

        var wedge = new Konva.Group({
            rotation: n * angle,
        });

        // console.log("ratation: " + 2 * n * Math.PI / numWedges);

        var wedgeBackground = new Konva.Wedge({
            radius: stageWidth / 2,
            angle: angle,
            fill: item.color,
            fillPriority: 'radial-gradient',
            stroke: '#ccc',
            strokeWidth: 2
        });

        wedgeBackground.oriIndex = n;

        wedge.add(wedgeBackground);

        Konva.Image.fromURL(item.awardlink, function(image) {
            // this value changed image distance from pointer
            image.x(stageWidth / 2 - 60);
            // this value changed angle
            image.y(50);

            image.width(80);
            image.height(80);

            image.rotation((Math.PI + angle) / 2);
            wedge.add(image);
            layer.draw();
        });

        wedge.startRotation = wedge.getRotation();

        wheel.add(wedge);
    }

    function animate(frame) {
        // handle wheel spin
        var angularVelocityChange = angularVelocity * frame.timeDiff * (1 - angularFriction) / 1000;
        angularVelocity -= angularVelocityChange;

        let degree = frame.timeDiff * angularVelocity / 1000;
        wheel.rotate(degree);

        //console.log(angularVelocityChange);
        console.log("degree: " + degree);
        console.log(angularVelocity);

        // 旋转速率低于 5时开始寻找哪个奖品中奖
        if (angularVelocity < 7) {

            // 当前指向的item
            var intersection = layer.getIntersection({
                x: stage.getWidth() / 2,
                y: 150
            });

            if (intersection) {
                console.log("index: " + intersection.oriIndex);
                console.log(selectIndexs[time]);

                if (intersection.oriIndex === selectIndexs[time]) {
                    anim.stop();
                    wheel.rotate(0.4);

                    intersection.fill("yellow");
                    selectWedge = intersection;

                    angularVelocity = 30;
                }
            }
        }
    }

    layer.add(wheel);
    stage.add(layer);
    stage.add(imageLayer);

    load();
}
