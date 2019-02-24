/**
 * @file app
 */

import Vue from 'vue';
import vueHtmlSlider from './slider';

new Vue({
    el: '#app',

    data() {
        return {
            images: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721068&di=de6a4473f2fe5d1819b51454583bb79a&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2017-10-10%2F59dc6fd0f132d.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721051&di=b029c4f89917783d1db3cef7e360d34f&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F14%2Faf1e7f98ae76b396831256398554a9ea.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721067&di=37b66115a94d70cd7c76a49d4e47cfb2&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2017-10-10%2F59dc6fd5957ce.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721037&di=45d48db20b54b191168f2c3b8043846d&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20150210%2Ff2808fb86b.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721036&di=be7fee6e56ea64a234521c2bab8c0d23&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20141024%2F2ebf76d289.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538712551191&di=0d9641592a19e5c2d814b50c240197ef&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20150210%2F1bdd1466a7.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711721026&di=b4e312f17f3e5f5735101ac1a78ad020&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2018-07-25%2F5b583bbd97161.jpg%3Fdown',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711843960&di=b381d6a0274f2b9bf7e0ccb6662213e6&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F199%2Ff17a17ba673e491a8da066ebfec00cd1.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538711902827&di=4518d563adb45aa7c872bb6f2640ee5b&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20141024%2F6f04c35f76.jpg'
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
                    // console.log('changed', obj)
                },
                longTap(obj) {
                    // console.log('longTap', obj)
                },
                longTapEnd(obj) {
                    // console.log('longTapEnd', obj)
                }
            },
            pullRight: {
                tpl: `<div class="query-more pull"><span>右拉查看文档</span></div>`,
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

    methods: {

    }

});