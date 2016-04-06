
const Vue = require('vue');
const _ = require('underscore');

const x = 3;
const y = 3;

function addItems () {

    const fullwidth = window.innerWidth - 40;
    const imagewidth = fullwidth / x;

    for (let i = 1; i <= x * y; i++) {
        let item = {
            id: i,
            index: i,
            link : "img/puzzle/f" + i + ".jpg"
        }
        vm.items.push(item);
    }
}

function load() {
    addItems();
}

let vm = new Vue({
    el: '#app',
    data: {
        items: []
    },
    methods: {
        dragstart:handleStart,
        dragend:handleEnd,
        dragover:handleOver,
        dragenter:handleEnter,
        drop: handleDrop
    }
});

let dragNode = null;
let targetNode = null;

function handleStart(evt) {
    dragNode = evt.target;
    console.log("dragstart");

    let st = dragNode.style;
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

    let targetIndex = _.findIndex(vm.items, item => item.id == targetNode.id);
    let originIndex = _.findIndex(vm.items, item => item.id == dragNode.id);

    if (targetIndex == originIndex)
        return console.log("＝＝");

    let targetItem = vm.items[targetIndex];
    let originItem = vm.items[originIndex];

    vm.items.$set(targetIndex, originItem);
    vm.items.$set(originIndex, targetItem);
}

load();
