
var Vue = require('vue');

const template = `
    <div style="position:absolute;padding:10px;" :style="{'top': top, 'left': left, 'width': width}">

        <div style="margin:0 auto; width:80%;margin-top:10px;">
            <img src="img/choujiang/haiyang/title.png" style="width:100%;" @click=draw()>
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
