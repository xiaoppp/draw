
var Vue = require('vue');

const template = `
    <div class="center-block text-center" style="display:inline-blick;position:absolute;padding:5px;"
        :style="{'top': item.top, 'left': item.left, 'width': item.width - 4, 'height': item.width - 4}">
        <div :style="{'background-image': 'url(' + item.link + ')', 'border': border, 'opacity': opacity}"
            style="width:100%;height:100%;background-size:100% 100%;">
            <img style="width:50%;position:absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;" v-bind:src="item.award">
        </div>
    </div>
        `;

var drawItem = Vue.extend({
    template: template,
    props: ['item'],
    events: {
        "on-refresh": function(i) {
            // console.log(i);
            // console.log(this.item.id);
            if (this.item.id == i) {
                this.border = "solid 2px white";
                this.opacity = "0.7";
            }
            else {
                this.border = "solid 2px black";
                this.opacity = "1";
            }
        }
    },
    data: function() {
            return {
                border: "solid 2px black",
                opacity: "1"
            };
        }
})

Vue.component('draw-item', drawItem);
