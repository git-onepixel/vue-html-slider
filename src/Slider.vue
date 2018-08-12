<template>
    <div class="vue-html-slider-wrapper" ref="viewport">
        <!--slider-list-->
        <ul class="slider-list-wrapper" ref="container"  
            :style="{transform: transform, transition: transition}">
            <li class="card-wrapper" v-for="card in cards" :key="card.index">
               <div class="card" :class="options.clsName">
                    <img alt="" :src="card.src">
               </div>
            </li>
        </ul>
        <!--indicators-->
        <ol class="indicators" v-show="!options.hideIndicator">
            <li v-for="card in cards" 
                :class="{current: card.index == curIndex}"
                v-if="card.index < 20"
                :key="card.index">
            </li>
        </ol>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cards: [],
            pageNow: 1,
            curIndex: -1,
            transform: '',
            transition: ''
        }
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        options: {
            type: Object,
            default() {
                return {
                    index: 0, // 当前位置
                    autoplay: false, // 是否自动播放
                    interval: 1000,  // 帧间隔(毫秒)
                    hideIndicator: false, // 是否隐藏页码
                    clsName: '', // 自定义样式
                    // 滑动结束后触发
                    changed: function (obj) {
                        console.log('changed');
                    },
                    // 单击事件
                    click: function (obj) {
                        console.log('click');
                    },
                    // 长按事件
                    longTap: function (obj) {
                        console.log('longTap');   
                    },
                    // 长按结束 
                    longTapEnd: function (obj) {
                        console.log('longTapEnd');       
                    }
                }
            }
        }
    },
    computed: {
        // 当前对象
        current() {
            let index = this.pageNow - 1;
            return this.cards[index];
        }
    },
    mounted() {
        setTimeout(() => this.initialize(), 300);
    },
    methods: {
        /** 
         * 初始化
         */
        initialize() {
            this.cards = this.data.map((item, index) => {
                item.index = index;
                return item;
            });
            if (this.$refs.container) {
                this.initView()
                this.setPageNow();
                this.bindTouchEvent();
                this.callback('changed'); 
            }
        },
        
        /** 
         * 初始化View
         */
        initView() {
            let index = this.options.index || 0;
            this.pageNow = index + 1;
            let cardWidth = this.$refs.viewport.offsetWidth;
            this.setTransform(- cardWidth * index);
        },
       
        /** 
         * 绑定 Touch 事件
         */
        bindTouchEvent() {
           let self = this; 
           let container =  this.$refs.container;
           let cardWidth = this.$refs.viewport.offsetWidth;  // 页面宽度
           let curOffset = - (cardWidth * this.curIndex); // 记录当前页面位置
           let maxWidth = - cardWidth * (this.cards.length -1); // 页面滑动最后一页的位置
           let startX, startY;  //  初始 X Y 坐标
           let startOffset = 0;  // 手指按下的屏幕位置
           let moveOffset = 0;  // 手指当前滑动的距离
           let moveOrient = 'left'; // 滑动的方向
           let isMove = false; // 是否发生左右滑动
           let startT = 0; // 记录手指按下去的时间
           let isTouchEnd = true; // 标记当前滑动是否结束(手指已离开屏幕) 
           let timer = null;

           // 手指放在屏幕上
           container.addEventListener('touchstart', e => {
               e.preventDefault();
               // 单手指触摸或者多手指同时触摸，禁止第二个手指延迟操作事件
               if (e.touches.length === 1 || isTouchEnd) {
                   let touch = e.touches[0];
                   startX = touch.clientX;
                   startY = touch.clientY;
                   startOffset = curOffset;  // 本次滑动前的初始位置  
                   self.transition = '';  // 取消动画效果 
                   startT = + new Date(); // 记录手指按下的开始时间
                   isMove = false; // 是否产生滑动
                   isTouchEnd = false; // 当前滑动开始

                   timer = setTimeout(() => {
                       if (!isMove) {
                          self.callback('longTap');
                       } else {
                          timer && clearTimeout(timer); 
                       }
                   }, 500);
               }
           }, false);

           // 手指在屏幕上滑动，页面跟随手指移动
           container.addEventListener('touchmove', e => {
               e.preventDefault();
               // 如果当前滑动已结束，不管其他手指是否在屏幕上都禁止该事件
               if (isTouchEnd) return ;
               
               let touch = e.touches[0];
               let deltaX = touch.clientX - startX;
               let deltaY = touch.clientY - startY;
               
               let offset = startOffset + deltaX; // 当前需要移动到的位置
               // 如果 offset > 0 或 < maxWidth,则表示页面超出边界
               if (offset > 0) {
                  offset = 0; 
               }
               if (offset < maxWidth) {
                  offset = maxWidth; 
               }
               deltaX = offset - startOffset;
               
               self.setTransform(offset);
               curOffset = offset;

               isMove = true;
               moveOffset = deltaX;
               // 判断手指滑动的方向
               moveOrient = deltaX > 0 ? 'right' : 'left'; 
           }, false);

           // 手指离开屏幕时，计算最终需要停留在哪一页
           container.addEventListener('touchend', e => {
               e.preventDefault();
               let offset = 0;
               timer && clearTimeout(timer); 
               // 计算手指在屏幕上停留的时间
               let deltaT = + new Date() - startT;
               // 发生了滑动，并且当前滑动事件未结束
               if (isMove && !isTouchEnd) { 
                    // 标记当前完整的滑动事件已经结束 
                    isTouchEnd = true; 
                    // 使用动画过渡让页面滑动到最终的位置
                    self.transition = 'transform ease 0.3s';
                    if (deltaT < 300) { 
                        if (curOffset === 0 && offset === 0) {
                            return ;
                        }
                        // 如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
                        offset = moveOrient === 'left' 
                            ? curOffset - cardWidth - moveOffset
                            : curOffset + cardWidth - moveOffset;
                        // 如果最终位置超过边界位置，则停留在边界位置
                        offset = offset > 0 ? 0 : offset;  // 左边界
                        offset = offset < maxWidth ? maxWidth : offset; // 右边界
                    } else {
                        // 如果滑动距离小于屏幕的50%，则退回到上一页
                        if (Math.abs(moveOffset) / cardWidth < 0.5) {
                            offset = curOffset - moveOffset;
                        } else {
                            // 如果滑动距离大于屏幕的50%，则滑动到下一页
                            offset = moveOrient === 'left'
                            ? curOffset - cardWidth - moveOffset 
                            : curOffset + cardWidth - moveOffset;
                            offset = offset > 0 ? 0 : offset;
                            offset = offset < maxWidth ? maxWidth : offset;
                        }
                    }
                   
                    // 执行滑动，让页面完整的显示到屏幕上
                    self.setTransform(offset);
                    curOffset = offset;
                    // 计算当前的页码
                    self.pageNow = Math.round(Math.abs(offset) / cardWidth) + 1;

                    // 设置页码，DOM操作需要放到异步队列中，否则会出现卡顿
                    setTimeout(() => {
                        self.setPageNow();
                        self.callback('changed');
                    }, 100);
                } else {
                    if (!isMove) {
                        if (deltaT < 300) {
                            self.callback('click');
                        }  
                        if (deltaT > 500) {
                            self.callback('longTapEnd');
                        }
                    }
                }
           }, false);
        },

        /**
         * 设置滑动
         */
        setTransform(offset) {
            this.transform = `translate3d(${offset}px, 0, 0)`;
        },

        /**
         * 设置页码
         */
        setPageNow() {
            this.curIndex = this.pageNow - 1;   
        },

        /**
         * 回调函数处理
         * @param {String} fn 函数名 
         */
        callback(fn) {
           let cb = this.options[fn];
           let obj = this.current;
           if (typeof cb !== 'function') {
                cb = function (obj) {
                    console.log(fn, obj);
                }
           }
           cb(obj);
        }
    }
}
</script>
<style lang="less" scoped>
    html, body, ul, ol {
        margin: 0;
        padding: 0;
    }
    ul, ol {
        list-style-type: none;
        list-style-image: none;
    }
    .vue-html-slider-wrapper {
        position: relative;
        overflow: hidden;
        height:100%;
        .slider-list-wrapper {
            overflow: hidden;
            width: fit-content;
            backface-visibility: hidden;
            white-space: nowrap;
            height:100%;
            font-size: 0;
            .card-wrapper {
               display: inline-block;
               width: 100vw;
               height: 100%;
               .card {
                    height: 100%;
                    display: -webkit-box;
                    display: -moz-box;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-box-align: center;
                    -moz-box-align: center;
                    -webkit-align-items: center;
                    align-items: center;
                    img {
                        width: 100%;
                        display: block;
                        height: 100%;
                    }
               }
            }
        }
        .indicators {
            position: absolute;
            bottom: 5vw;
            left: 50%;
            font-size: 0;
            white-space: nowrap;
            -webkit-transform:translateX(-50%);
            -moz-transform: translateX(-50%);
            -o-transform:translateX(-50%);
            transform: translateX(-50%);
            li {
                display: inline-block;
                position: relative;
                width: 5vw;
                &.current:after {
                    background: rgba(255, 255, 255, 1) !important;
                }
                &:after {
                    content: "";
                    width: 6px;
                    height: 6px; 
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -3px;
                    margin-left: -3px; 
                }
            }
        }
    }
</style>
