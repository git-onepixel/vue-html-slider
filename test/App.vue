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
                'http://www.agri35.com/UploadFiles/img_3_3822664907_4141759376_27.jpg',
                'http://img.jituwang.com/uploads/allimg/160405/257858-160405000G246.jpg',
                'http://www.xinjiadiy.com/images/article_img/tuwen/20170511/4712.jpg',
                'http://img.article.pchome.net/00/55/99/22/pic_lib/wm/jingxuan361.jpg',
                'http://pic1.win4000.com/wallpaper/3/57c788da6de14.jpg',
                'http://pic1.nipic.com/2008-12-05/200812584425541_2.jpg',
                'http://image.biaobaiju.com/uploads/20180303/00/1520008747-jlZGzBonAW.jpg',
                'http://dimg02.c-ctrip.com/images/fd/tg/g5/M00/A5/4A/CggYsVbRFnSAB_blAAIBLOR3YCg820.jpg',
                'http://pic1.win4000.com/wallpaper/a/5450ad5a3c961.jpg'
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