var Vue = require('vue');
var config = require('../util/config')

const template = `
<div v-for="item in items" class="col-xs-4">
    <div  style="display:inline-block;position:relative;">
        <div style="display:inline-block;">
            <img v-bind:src="item.cover" style="width:100%;margin:1px;"/>
        </div>
    </div>
</div>
    `;

var drawItems = Vue.extend({
    template: template,
    props: ['items'],
    methods: {
        draw: function() {
            this.$dispatch('on-draw', function enddraw() {

            });

            this.$broadcast('on-refresh', function() {
                
            })
        }
        // itemClick: function (id) {
        //     this.$dispatch('on-item-click', id);
        // }
    }
})

Vue.component('draw-items', drawItems);
