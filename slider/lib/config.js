/**
 * @file Configuration
 * @author onepixel
 */
'use strict';

module.exports = {
    name: 'VueHtmlSlider',
    // The css3 transition value.
    transition: 'transform ease 0.3s',
    // Long tap event fired imit mills.
    logTapMills: 500,
    // Click event fired limit mills.
    clickMills: 300,
    // Fast move event limit mills.
    fastMoveMills: 300,
    // The transform coefficient when reached slider boundary.
    transformCoefficient: 0.35,
    // The move coefficient decide which page to stay.
    moveCoefficient: 0.5
}