/**
 * @file props
 * @author Onepixel<onepixel@126.com>
 */

import options from '../lib/options';

export default {
    props: {
        // A prop for image list. 
        // A string value for image url be supported as well.
        data: {
            type: Array,
            default() {
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
            default() {
                return options;
            }
        },
        // Pull left when reached right boundary.
        pullLeft: {
            type: Object,
            default() {
                return {
                    // html template
                    tpl: '', 
                    // pulling before release.
                    pull() {},
                    // pull end
                    release() {}
                }
            }
        },
        // Pull right when reached left boundary.
        pullRight: {
            type: Object,
            default() {
                return {
                    // html template
                    tpl: '', 
                    // pulling before release.
                    pull(x) {},
                    // pull end
                    release() {}
                }
            }
        }
    }
}