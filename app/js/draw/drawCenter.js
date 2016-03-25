
var Vue = require('vue');

const template = `
    <div style="position:absolute;padding:10px;" :style="{'top': top, 'left': left, 'width': width}">
        <div>
            <img src="img/choujiang/items/title.png" style="width:100%">
        </div>
        <div class="center-block text-center" style="margin-top:20px;">
            <img src="img/choujiang/items/pointer.png" style="width:60%;" @click=draw()>
        </div>
    </div>
        `;

var drawCenter = Vue.extend({
    template: template,
    props: ['left', 'top', 'width'],
    methods: {
        draw: function() {
            this.$dispatch('on-draw');
        }
    }
})

Vue.component('draw-center', drawCenter);
