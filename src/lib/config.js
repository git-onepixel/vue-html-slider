/**
 * @file Configuration
 * @author Onepixel<onepixel@126.com>
 */

export default {
    name: 'VueHtmlSlider',
    // The css3 transition value.
    transition: 'transform ease 0.3s',
    // Long tap event fired limit mills.
    longTapMills: 500,
    // Click event fired limit mills.
    clickMills: 300,
    // Fast move event limit mills.
    fastMoveMills: 300,
    // The transform coefficient when reached slider boundary.
    transformCoefficient: 0.35,
    // The move coefficient decide which page to stay.
    moveCoefficient: 0.5
}