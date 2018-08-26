/**
 * @file pull
 * @author onepixel
 */
'use strict';

var constant = require('../lib/constant');
module.exports = {
    methods: {
        /**
         * Handle pull event.
         * @param offset the offset should transform.
         * @param moveOffset the real move offset.
         */
        handlePullEvent: function (offset, moveOffset) {
            if (this.options.disableBounce) {
                return false;
            }
            // Pulling before release.
            if (!moveOffset) {
                if (offset > 0) {
                    this.callFn(this.pullRight, 'pull', offset);    
                } else {
                    this.callFn(this.pullLeft, 'pull', this.maxOffset - offset);    
                }
            } else {
                if (offset == 0 && this.moveOrient === constant.RIGHT) {
                    this.callFn(this.pullRight, 'release', moveOffset);  
                } 
                if (offset == this.maxOffset && this.moveOrient === constant.LEFT) {
                    this.callFn(this.pullLeft, 'release', this.maxOffset - moveOffset); 
                }
            }
        },

        /**
         * Call function delay.
         * @param {*} obj current object
         * @param {*} method method name
         * @param {*} params function params
         */
        callFn: function (obj, method, params) {
            var fn = obj[method];
            if (typeof fn === 'function') {
                setTimeout(function () {
                    fn.call(obj, params);
                }, 300);
            } 
        }
    }
}