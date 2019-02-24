/**
 * @file pull
 * @author onepixel
 */

import constant from '../lib/constant';

export default {
    methods: {
        /**
         * Handle pull event.
         * @param offset the offset should transform.
         * @param moveOffset the real move offset.
         */
        handlePullEvent(offset, moveOffset) {
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
         * The callback can be executed when the current animation ends.
         * @param {*} obj current object.
         * @param {*} method method name.
         * @param {*} params function params.
         */
        callFn(obj, method, params) {
            var fn = obj[method];
            if (typeof fn === 'function') {
                setTimeout(() => {
                    fn.call(obj, params);
                }, 300);
            } 
        }
    }
}