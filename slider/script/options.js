/**
 * @file Default options for slider props.
 * @author onepixel
 */
'use strict';

module.exports = {
    // Set default position when slider initialized.
    index: 0, 
    // Set slider whether autoplay, not implement.
    autoplay: false,
    // Set slider autoplay interval mills, not implement.
    interval: 1000,
    // Playing slider with loop, not implement. 
    loop: false,
    // Set whether hide page number on bottom of image.
    hideIndicator: false,
    // Whether disable bounce when reached page boundary.
    disableBounce: false,
    // Apply a css class to every page of images.
    clsName: '',
    // Apply fade animation to image when appears.
    useFade: false,
    // The gap width of images.
    gapWidth: 0,
    // In Debug mode, slider will print some log infos by `console.log`.
    isDebug: false,
    // It fired when page position changed.
    changed: function (obj) {
        // obj: {index, src}
    },
    // A click event fired on image element.
    click: function (obj) {
        // obj: {index, src}
    },
    // Long tap event on image element.
    longTap: function (obj) {
        // obj: {index, src}
    },
    // It fired when long tap event finished.
    longTapEnd: function (obj) {
        // obj: {index, src}
    }
}