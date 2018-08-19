/**
 * @file Default options for slider props.
 * @author onepixel
 */
import constant from './constant';
// Default options
export default {
    // Set default position when slider initialized.
    index: 0, 
    // Set slider whether autoplay, not implement.
    autoplay: false,
    // Set slider autoplay interval mills, not implement.
    interval: 1000,
    // Set whether hide page number on bottom of image.
    hideIndicator: false,
    // Whether disable bounce when reached page boundary.
    disableBounce: false,
    // Apply a css class to every page of images.
    clsName: '',
    // In Debug mode, slider will print some log infos by `console.log`.
    isDebug: false,
    // It fired when page position changed.
    [constant.CHANGED](obj) {
        // obj: {index, src}
    },
    // A click event fired on image element.
    [constant.CLICK](obj) {
        // obj: {index, src}
    },
    // Long tap event on image element.
    [constant.LONG_TAP](obj) {
        // obj: {index, src}
    },
    // It fired when long tap event finished.
    [constant.LONG_TAP_END](obj) {
        // obj: {index, src}
    },
    // Pull left on the right boundary.
    [constant.PULL_LEFT](obj, options) {
        // obj: {index, src}
        // options: {x}
    },
    // Pull right on the left boundary.
    [constant.PULL_RIGHT](obj, options) {
        // obj: {index, src}
        // options: {x}
    }
}