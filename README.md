# vue-html-slider

[![npm][npm]][npm-url] 
[![downloads][downloads]][downloads-url]
[![license][license]][license-url]

A simple vue silder component .

[npm]: https://img.shields.io/npm/v/vue-html-slider.svg
[npm-url]: https://www.npmjs.com/package/vue-html-slider
[downloads]: https://img.shields.io/npm/dm/vue-html-slider.svg
[downloads-url]: https://npmcharts.com/compare/vue-html-slider?minimal=true
[license]: https://img.shields.io/npm/l/vue-html-slider.svg
[license-url]:https://github.com/git-onepixel/vue-html-slider/blob/master/LICENSE

# Installation
use npm
``` bash
npm install vue-html-slider
```
use yarn
``` bash
yarn add vue-html-slider
```

# Usage
``` bash
# Vue template
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
            # Register slider as a html tag
            vue-html-slider: Slider
        },
        data() {
            return {
                # Image list as array
                images: [
                    {
                        src: http://path/to/a.png
                    },
                    {
                        src: http://path/to/b.png
                    }
                ],
                # Define slider by userself 
                options: {
                    # Default image position index.
                    index: 0,
                    # Whether autoplay, not implement.
                    autoplay: false,
                    # Autoplay interval mills, not implement.
                    interval: 1000, 
                    # Apply a css class on image element.
                    clsName: 'xxx', 
                    # Whether hide page number on bottom of image.
                    hideIndicator: false, 
                    # It fired when image position changed.
                    changed: function (obj) {
                    },
                    # A click event on image element.
                    click: function (obj) {
                    },
                    # Long tap event on image element.
                    longTap: function (obj) {
                    },
                    # When long tap event finished. 
                    longTapEnd: function (obj) {
                    }
                }
            }
        }
    }
</script>

```
## Configuration
| Property | Type | default | Description | 
| ------ | ------ | ------ | ------ | 
| index | Number | 0 |  Default image position index. |
| autoplay | Boolean | false | Whether autoplay, not implement. |
| interval | Number | 1000 |  Autoplay interval mills, not implement. |
| clsName | String | | Apply a css class on image element. | 
| hideIndicator | Boolen | false | Whether hide page number on bottom of image. | 

## Events
| Event | Type | Params | Description | 
| ------ | ------ | ------ | ------ | 
| changed | Function | image object |  It fired when image position changed. |
| click | Function | image object | Whether autoplay, not implement. |
| longTap | Function | image object |  Long tap event on image element. |
| longTapEnd | Function | object | When long tap event finished. | 

# Dependence
The component developed by vue2.x with es6 and less , so it need the follow npm packages for runing on your code .
```
"devDependencies": {
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "babel-runtime": "^6.23.0",
    "css-loader": "^0.28.4",
    "file-loader": "^0.11.2",
    "html-webpack-plugin": "^2.29.0",
    "less": "^2.7.2",
    "less-loader": "^4.0.4",
    "style-loader": "^0.18.2",
    "transform-runtime": "0.0.0",
    "url-loader": "^0.5.9",
    "vue-hot-reload-api": "^2.1.0",
    "vue-html-loader": "^1.2.4",
    "vue-loader": "^13.0.0",
    "vue-template-compiler": "^2.3.4",
    "webpack": "^3.0.0",
    "webpack-dev-server": "^2.5.0"
},
"dependencies": {
    "es6-promise": "^4.1.1",
    "vue": "^2.3.4"
}
```
As well , in order to apply it in your project easily . A vue demo project for this component . see [slider-demo](https://github.com/git-onepixel/slider-demo)

# License
This project is licensed under the MIT License .
See the [LICENSE.md](https://github.com/git-onepixel/vue-html-slider/blob/master/LICENSE) file for details .

# Keywords
vue slider carousel