# vue-html-slider

[![npm][npm]][npm-url] 
[![downloads][downloads]][downloads-url]
[![license][license]][license-url]

A simple vue silder component.

[npm]: https://img.shields.io/npm/v/vue-html-slider.svg
[npm-url]: https://www.npmjs.com/package/vue-html-slider
[downloads]: https://img.shields.io/npm/dm/vue-html-slider.svg
[downloads-url]: https://npmcharts.com/compare/vue-html-slider?minimal=true
[license]: https://img.shields.io/npm/l/vue-html-slider.svg
[license-url]:https://github.com/git-onepixel/vue-html-slider/blob/master/LICENSE

## Installation
use npm
``` bash
npm install vue-html-slider
```
use yarn
``` bash
yarn add vue-html-slider
```

## Usage
``` bash
# vue template
<template> 
    <vue-html-slider 
        :images="images" # component props
        :options="options" # component props
        >
    </vue-html-slider>
</template>
<script>
    import Slider from 'vue-html-slider';
    export default {
        components: {
            # register slider as a html tag
            vue-html-slider: Slider
        },
        data() {
            return {
                # image list as array
                images: [
                    {
                        src: 'http://path/to/a.png'
                    },
                    {
                        src: 'http://path/to/b.png'
                    }
                ],
                # define slider by userself 
                options: {
                    index: 0,
                    autoplay: false,
                    interval: 1000,
                    loop: false, 
                    clsName: '', 
                    useFade: false,
                    gapWidth: 10,
                    hideIndicator: false, 
                    disableBounce: false,
                    changed(obj) {
                        # obj: {index, src}
                    },
                    click(obj) {
                        # obj: {index, src}
                    },
                    longTap(obj) {
                        # obj: {index, src}
                    },
                    longTapEnd(obj) {
                        # obj: {index, src}
                    }
                }
            }
        }
    }
</script>

```
### Configuration
| Property | Type | default | Description | 
| ------ | ------ | ------ | ------ | 
| index | Number | 0 |  Default image position index. |
| autoplay | Boolean | false | Whether autoplay, not implement. |
| interval | Number | 1000 |  Autoplay interval mills, not implement. |
| loop | Boolean | false | Playing slider with loop, not implement. |
| clsName | String | -- | Apply a css class on image element. | 
| useFade | Boolean | false | Apply fade animation to image when appears. | 
| gapWidth | Number | 0 | The gap width of images. | 
| hideIndicator | Boolen | false | Whether hide page number on bottom of image. As well, it can display 20 indicators at most.| 
| isDebug | Boolean | false | In Debug mode, slider will print some log infos by `console.log`. |
| disableBounce | Boolen | false | Whether disable bounce when reached slider boundary. | 

### Events
| Event | Type | Params | Description | 
| ------ | ------ | ------ | ------ | 
| changed | Function | image |  It fired when image position changed. |
| click | Function | image | A click event fired on image element. |
| longTap | Function | image |  Long tap event on image element. |
| longTapEnd | Function | image | When long tap event finished. |

## Dependence
This component developed by vue2 with less, so it need the follow npm packages for running at your code.
```
"devDependencies": {
    "css-loader": "^0.28.4",
    "file-loader": "^0.11.2",
    "less": "^2.7.2",
    "less-loader": "^4.0.4",
    "style-loader": "^0.18.2",
    "url-loader": "^0.5.9",
    "vue-html-loader": "^1.2.4",
    "vue-loader": "^13.0.0",
    "vue-template-compiler": "^2.3.4"
},
"dependencies": {
    "vue": "^2.3.4"
}
```
As well, in order to apply it in your project easily. A vue demo project for this component. See [slider-demo](https://github.com/git-onepixel/slider-demo) for help.

## License
This project is licensed under the MIT License.
See the [LICENSE.md](https://github.com/git-onepixel/vue-html-slider/blob/master/LICENSE) file for details.