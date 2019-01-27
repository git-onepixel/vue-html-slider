# vue-html-slider

[![npm][npm]][npm-url] 
[![downloads][downloads]][downloads-url]
[![license][license]][license-url]

A simple, light and configurable vue silder component.

[npm]: https://img.shields.io/npm/v/vue-html-slider.svg
[npm-url]: https://www.npmjs.com/package/vue-html-slider
[downloads]: https://img.shields.io/npm/dm/vue-html-slider.svg
[downloads-url]: https://npmcharts.com/compare/vue-html-slider?minimal=true
[license]: https://img.shields.io/npm/l/vue-html-slider.svg
[license-url]:https://github.com/git-onepixel/vue-html-slider/blob/master/LICENSE

## Installation
use npm
```
npm install vue-html-slider
```
use yarn
```
yarn add vue-html-slider
```

## Get Started
Just one property is required to start the slider. As follows.
```
# vue template
<template> 
    <vue-html-slider :data="images"></vue-html-slider>
</template>
<script>
    import vueHtmlSlider from 'vue-html-slider';
    export default {
        components: {
            vue-html-slider: vueHtmlSlider
        },
        data() {
            return {
                images: [
                    'http://path/to/a.png',
                    'http://path/to/b.png'
                ]
            }
        }
    }
</script>
```
With just a few steps, you can get a slider. As well, there is an online [demo](https://www.duqianduan.com/slider/index.html) which provides a real experience for you. 

![avatar](https://static.duqianduan.com/slider/qrcode.png)
 
## Advanced
Slider defines many properties for customizing what you want. You can set the `options` property to slider as follow.

```
<vue-html-slider :options="options"></vue-html-slider>
...
data() {
    return {
        options: {
            index: 0,
            lazyload: true,
            useFade: true,
            click() {
                # user click event callback.
            },
            ...
        }
    }
}
```

The `options` contains many properties. All properties are listed below.

| Property | Type | default/params | Description | 
| ------ | ------ | ------ | ------ | 
| index | Number | 0 |  Default image position index. |
| autoplay | Boolean | false | Whether autoplay, not implement. |
| interval | Number | 1000 |  Autoplay interval mills, not implement. |
| loop | Boolean | false | Playing slider with loop, not implement. |
| clsName | String | - | Apply a css class on image element. | 
| gapWidth | Number | 0 | You can set a gap between each image.|
| useFade | Boolean | false | Apply fade animation to image when appears. |
| lazyload | Boolean | false | The image will be loaded only appears, if true. |
| zoom | Boolean | false | You can zoom picture scale by gesture if set true, not implement.|
| loading | String | - | It will be shown before loaded. A html template or characters are supported.| 
| error | String | - | It will be shown after load error. A html template or characters are supported.|   
| hideIndicator | Boolen | false | Whether hide page number on bottom of image. As well, it can display 20 indicators at most.| 
| isDebug | Boolean | false | In Debug mode, slider will print some log infos by `console.log`. |
| disableBounce | Boolen | false | Whether disable bounce when reached slider boundary. |
| changed | Function | image |  It will be fired when image position changed. |
| click | Function | image | A click event fired on image element. |
| longTap | Function | image |  A `longTap` event on image element. |
| longTapEnd | Function | image | It will be fired when the `longTap` event completes. |

## Pull-left / Pull-right
You can move more when reached slider left or right boundary if you set `disableBounce` false. So, you can listen the event by setting the `pull-left` or `pull-right` property to slider. As follows.

```
<vue-html-slider :pull-left="pullLeft" :pull-right="pullRight"></vue-html-slider>
...
data() {
    return {
        pullLeft: {
            tpl: '<div class="foo">query all</div>',
            pull(x) {
                # pulling continuously.
            },
            release(x) {
                # released.
            }
        },
        ...
    }
}
```
The `pull-left` and `pull-right` have three properties respectively as follows.

| Property | Type | params | Description | 
| ------ | ------ | ------ | ------ | 
| tpl | String | - |  A html template will be shown when beyond slider boundary. Characters are also supported. |
| pull | Function | x | A pull event will be fired continuously before released. |
| release | Function | x | A release event will be fired when released. |

The `pull` or `release` parameter `x` refers to the distance that page leaves the boundary which is an absolute value.

As well, in order to apply it in your project easily, a vue demo project for this component. See [slider-demo](https://github.com/git-onepixel/slider-demo) for help.

## License
This project is licensed under the MIT License.
See the [LICENSE.md](https://github.com/git-onepixel/vue-html-slider/blob/master/LICENSE) file for details.