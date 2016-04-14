require('./draw/drawItem');
require('./draw/drawCenter');

var Vue = require('vue');
var _ = require('underscore');

var viewportWidth = window.innerWidth;
// binding data
var activitydata = {
    activity: {
        activityid: "1",
        name: "name",
        start_time: "",
        end_time: ""
    },
    exposeItems: [],
    drawItems: [
        {
            id: 1,
            link: "img/choujiang/haiyang/1.png",
            award: "img/choujiang/awards/flow.png"
        },
        {
            id: 2,
            link: "img/choujiang/haiyang/2.png",
            award: "img/choujiang/awards/flow.png"
        },
        {
            id: 3,
            link: "img/choujiang/haiyang/3.png",
            award: "img/choujiang/awards/thanks.png"
        },
        {
            id: 4,
            link: "img/choujiang/haiyang/4.png",
            award: "img/choujiang/awards/coupon.png"
        },
        {
            id: 5,
            link: "img/choujiang/haiyang/5.png",
            award: "img/choujiang/awards/thanks.png"
        },
        {
            id: 6,
            link: "img/choujiang/haiyang/6.png",
            award: "img/choujiang/awards/thanks.png"
        },
        {
            id: 7,
            link: "img/choujiang/haiyang/7.png",
            award: "img/choujiang/awards/thanks.png"
        },
        {
            id: 8,
            link: "img/choujiang/haiyang/8.png",
            award: "img/choujiang/awards/flow.png"
        },
        {
            id: 9,
            link: "img/choujiang/haiyang/9.png",
            award: "img/choujiang/awards/mobilefee.png"
        },
        {
            id: 10,
            link: "img/choujiang/haiyang/10.png",
            award: "img/choujiang/awards/redbag.png"
        },
        {
            id: 11,
            link: "img/choujiang/haiyang/11.png",
            award: "img/choujiang/awards/thanks.png"
        },
        {
            id: 12,
            link: "img/choujiang/haiyang/12.png",
            award: "img/choujiang/awards/redbag.png"
        },
        {
            id: 13,
            link: "img/choujiang/haiyang/13.png",
            award: "img/choujiang/awards/thanks.png"
        },
        {
            id: 14,
            link: "img/choujiang/haiyang/14.png",
            award: "img/choujiang/awards/thanks.png"
        }
    ]
}

var vm = new Vue({
    el: '#app',
    data: {
        //抽奖宝贝
        drawItems: [],
        centerLeft: 0,
        centerTop: 0,
        centerWidth: 0,
        showRule: false
    },
    events: {
        "on-draw": onDraw
    }
});

init();

function init() {
    var fullwidth = viewportWidth - 40;
    if (fullwidth > 480)
        fullwidth = 480;

    var startx = 20;
    var starty = 20;

    var imagelen = fullwidth / 4;

    // set the position for every item
    _.each(activitydata.drawItems, function(item, i) {
        item.left = 0;
        item.top = 0;
        item.width = imagelen;

        if (i <= 3) {
            item.left = startx + imagelen * i;
            item.top = starty;
        }
        if (i >= 4 && i <= 6) {
            item.left = startx + imagelen * 3;
            item.top = starty + imagelen * (i - 3);
        }
        if (i >= 7 && i <= 10) {
            item.left = startx + imagelen * 3 - imagelen * (i - 7); //总长度 减去 占用长度
            item.top = starty + imagelen * 4;
        }
        if (i > 10) {
            item.left = startx;
            item.top = starty + imagelen * 4 - imagelen * (i - 10);
        }

        // item.left = item.left + 10;
        // item.top = item.top + 10;
        // console.log(i);
        console.log(item.left);
        console.log(item.top);
    })

    vm.drawItems = activitydata.drawItems;
    vm.centerLeft = startx + imagelen;
    vm.centerTop = starty + imagelen;
    vm.centerWidth = imagelen * 2;
}

// current step in draw table
var step = 0;
// stop step of drawing
var stopStep = 999;
var interval = null;

// start to deaw
function startDraw() {
    interval = setInterval(function() {
        stopDraw();
        vm.$broadcast('on-refresh', step);
        step ++;
        if (step > vm.drawItems.length) {
            step = 0;
        }
    }, 100);

    //获取抽奖结果，以及中奖编号
    postDraw();
}

function stopDraw() {
    // console.log("step: " + step);

    if (stopStep == step) {
        clearInterval(interval);
        interval = null;
        console.log("stopStep: " + stopStep);
        //阶梯数组用来控制停止
        var stopSteps = [150, 300, 500, 750, 1050, 1400, 1800];
        for (let i = 0; i < stopSteps.length; i++) {
            let stepid = Number(stopStep) + i + 1;
            if (stepid > vm.drawItems.length) {
                stepid = Number(stopStep) + i + 1 - 14;
            }
            setTimeout(() => vm.$broadcast('on-refresh', stepid), stopSteps[i]);
        }
    }
}

function postDraw() {
    setTimeout(function() {
        //设置中奖编号
        stopStep = _.random(0, 13);
        console.log(stopStep);
        stopStep = stopStep - 6;
        if (stopStep < 0) {
            stopStep = stopStep + vm.drawItems.length;
        }
    }, 500);
}

function onDraw() {
    if (interval) {
        return;
    }
    else {
        startDraw();
    }
}
