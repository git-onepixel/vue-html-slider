/**
 * @file props
 * @author onepixel
 */
'use strict';

var options = require('../lib/options');
module.exports = {
    props: {
        // A prop for image list.
        data: {
            type: Array,
            default: function () {
                return [
                    {
                        title: '',
                        src: ''
                    }
                ];
            }
        },
        // A configuration for slider.
        options: {
            type: Object,
            default: function () {
                return options;
            }
        },
        // Pull left when reached right boundary.
        pullLeft: {
            type: Object,
            default: function () {
                return {
                    // html template
                    tpl: '', 
                    // pulling before release.
                    pull: function (x) {},
                    // pull end
                    release: function () {}
                }
            }
        },
        // Pull right when reached left boundary.
        pullRight: {
            type: Object,
            default: function () {
                return {
                    // html template
                    tpl: '', 
                    // pulling before release.
                    pull: function (x) {},
                    // pull end
                    release: function () {}
                }
            }
        }
    }
}