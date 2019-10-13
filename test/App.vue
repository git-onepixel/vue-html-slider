<template>
   <div id="app" class="slider-demo-layer">
        <div class="slider-wrapper">
            <vue-html-slider 
                v-if="images.length" 
                :data="images" 
                :options="options" 
                :pull-right="pullRight">
            </vue-html-slider>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import vueHtmlSlider from '../src/core/slider.vue';

export default {
    data() {
        return {
            images: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721068&di=de6a4473f2fe5d1819b51454583bb79a&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2017-10-10%2F59dc6fd0f132d.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721037&di=45d48db20b54b191168f2c3b8043846d&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20150210%2Ff2808fb86b.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721067&di=37b66115a94d70cd7c76a49d4e47cfb2&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2017-10-10%2F59dc6fd5957ce.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721036&di=be7fee6e56ea64a234521c2bab8c0d23&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20141024%2F2ebf76d289.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538712551191&di=0d9641592a19e5c2d814b50c240197ef&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20150210%2F1bdd1466a7.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721026&di=b4e312f17f3e5f5735101ac1a78ad020&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2018-07-25%2F5b583bbd97161.jpg%3Fdown',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711843960&di=b381d6a0274f2b9bf7e0ccb6662213e6&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F199%2Ff17a17ba673e491a8da066ebfec00cd1.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711902827&di=4518d563adb45aa7c872bb6f2640ee5b&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20141024%2F6f04c35f76.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538712059328&di=fdf61e1b1b7a1c557bffd3b250c65d78&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F208%2Ff736fed01a61484a9826e11ca436374d.jpg'
            ],
            options: {
                index: 0,
                hideIndicator: false,
                isDebug: true,
                disableBounce: false,
                clsName: 'autopic',
                gapWidth: 10,
                useFade: true,
                lazyload: true,
                loading: '<div class="loading-view"></div>',
                error: '<div class="load-error">加载失败</div>',
                click(obj) {
                    // console.log('click', obj);
                },
                changed(obj) {
                    console.log('changed', obj)
                },
                longTap(obj) {
                    // console.log('longTap', obj)
                },
                longTapEnd(obj) {
                    // console.log('longTapEnd', obj)
                }
            },
            pullRight: {
                tpl: `<div class="query-more pull"><span>查看文档</span></div>`,
                pull(x) {
                    if (x > 50) {
                        this.tpl = `<div class="query-more release"><span>释放查看</span></div>`;
                    }
                },
                release(x) {
                    if (x > 50) {
                        location.href = 'https://www.npmjs.com/package/vue-html-slider';
                    }
                }
            }
        }
    },

    components: {
        'vue-html-slider': vueHtmlSlider
    },

    created() {
        let img = new Image();
        img.src = 'https://www.duqianduan.com/log/s.gif';
    }
}
</script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
}
.slider-demo-layer {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    .slider-wrapper {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
}
.query-more {
    margin: 0 1rem;
    color: #fff;
    width: 12px;
    height: 100%;
    white-space: normal;
    line-height: 1.2;
    font-size: 12px;
    position:relative;
    span {
        display: block;
        position:absolute;
        top:50%;
        width:100%;
        transform: translateY(-50%);
    }   
    &.release{
       span::before {
          content: "←";
       }
    }
    &.pull {
        span::before {
           content: "→";
        }
    }
}
.loading-view {
    width:100%;
    height: 100%;
    background: url(./assets/loading.gif) no-repeat;
    background-size: 1rem 1rem;
    background-position: center center;
}
.load-error {
    position: absolute;
    top: 50%;
    width:100%;
    transform: translateY(-50%);
    text-align: center;
}
.autopic {
    img {
        height:auto !important
    }
}
  
</style>