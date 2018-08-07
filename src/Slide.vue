<template>
    <div class="vue-slide-ui-wrapper" ref="viewport">
        <ul class="card-list-wrapper" ref="container" :style="{transform: transform}">
            <li class="card-wrapper" v-for="card in cards">
               <div class="card" :class="options.clsName">
                    <img alt="" :src="card.src">
               </div>
            </li>
        </ul>
        <ol class="page-number" v-show="!options.hideMark">
          <li v-for="(card, index) in cards" :class="{now: currentPoint == index}"></li>
        </ol>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cards: [],
            pageNow: 1,
            currentPoint: -1,
            transform: ''
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
                    // 是否自动播放
                    autoplay: false,
                    // 帧间隔(毫秒)
                    interval: 1000,
                    // 是否隐藏页码
                    hideMark: false,
                    // 自定义样式
                    clsName: 'demo',
                    // 滑动结束后触发
                    changed: function (obj) {
                        console.log('changed')
                    },
                    // 点击
                    click: function (obj) {
                        console.log('click')
                    },
                    // 长按
                    longTap: function (obj) {
                        console.log('longTap')   
                    },
                    // 长按结束 
                    longTapEnd: function (obj) {
                        console.log('longTapEnd')       
                    }
                }
            }
        }
    },
    computed: {
        current() {
            let index = this.pageNow - 1;
            return this.cards[index];
        }
    },
    mounted() {
        setTimeout(() => this.initialize(), 300);
    },
    methods: {
        initialize() {
            this.cards = this.data.map((item, index) => {
                item.index = index;
                return item;
            });
            if (this.$refs.container) {
                this.initTouchEvent();
                this.setPageNow();
                this.callback('changed'); 
            }
        },
       
        initTouchEvent() {
           let self = this; 
           let container =  this.$refs.container;
           var currentPosition = 0; // 记录当前页面位置
           //  var currentPoint = -1;   // 记录当前点的位置
           
           // 页面宽度
           let pageWidth = this.$refs.viewport.offsetWidth; 
           var maxWidth = - pageWidth * (this.cards.length -1); // 页面滑动最后一页的位置
           var startX, startY;
           var initialPos = 0;  // 手指按下的屏幕位置
           var moveLength = 0;  // 手指当前滑动的距离
           var direction = 'left'; // 滑动的方向
           var isMove = false; // 是否发生左右滑动
           var startT = 0; // 记录手指按下去的时间
           var isTouchEnd = true; // 标记当前滑动是否结束(手指已离开屏幕) 
           var timer = null;

           // 手指放在屏幕上
           container.addEventListener('touchstart', e => {
               e.preventDefault();
               // 单手指触摸或者多手指同时触摸，禁止第二个手指延迟操作事件
               if (e.touches.length === 1 || isTouchEnd) {
                   var touch = e.touches[0];
                   startX = touch.clientX;
                   startY = touch.clientY;
                   // 本次滑动前的初始位置
                   initialPos = currentPosition;  
                   // 取消动画效果 
                   container.style.webkitTransition = ''; 
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
               
               var touch = e.touches[0];
               var deltaX = touch.clientX - startX;
               var deltaY = touch.clientY - startY;
               
               var translate = initialPos + deltaX; // 当前需要移动到的位置
               // 如果translate>0 或 < maxWidth,则表示页面超出边界
               if (translate > 0) {
                  translate = 0; 
               }
               if (translate < maxWidth) {
                  translate = maxWidth; 
               }
               deltaX = translate - initialPos;
               
               self.setTransform(translate);
               currentPosition = translate;

               isMove = true;
               moveLength = deltaX;
               // 判断手指滑动的方向
               direction = deltaX > 0 ? 'right' : 'left'; 
           }, false);

           // 手指离开屏幕时，计算最终需要停留在哪一页
           container.addEventListener('touchend', e => {
               e.preventDefault();
               var translate = 0;
               timer && clearTimeout(timer); 
               // 计算手指在屏幕上停留的时间
               var deltaT = + new Date() - startT;
               // 发生了滑动，并且当前滑动事件未结束
               if (isMove && !isTouchEnd) { 
                    // 标记当前完整的滑动事件已经结束 
                    isTouchEnd = true; 
                    // 使用动画过渡让页面滑动到最终的位置
                    container.style.webkitTransition = '0.3s ease transform';
                    if (deltaT < 300) { // 如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
                        if (currentPosition === 0 && translate === 0) {
                            return ;
                        }
                        translate = direction === 'left' 
                            ? currentPosition - (pageWidth + moveLength) 
                            : currentPosition + pageWidth - moveLength;
                        // 如果最终位置超过边界位置，则停留在边界位置
                        // 左边界
                        translate = translate > 0 ? 0 : translate; 
                        // 右边界
                        translate = translate < maxWidth ? maxWidth : translate; 
                    } else {
                        // 如果滑动距离小于屏幕的50%，则退回到上一页
                        if (Math.abs(moveLength) / pageWidth < 0.5) {
                            translate = currentPosition - moveLength;
                        } else {
                            // 如果滑动距离大于屏幕的50%，则滑动到下一页
                            translate = direction === 'left'
                            ? currentPosition - (pageWidth + moveLength) 
                            : currentPosition + pageWidth - moveLength;
                            translate = translate > 0 ? 0 : translate;
                            translate = translate < maxWidth ? maxWidth : translate;
                        }
                    }
                   
                    // 执行滑动，让页面完整的显示到屏幕上
                     self.setTransform(translate);
                    currentPosition = translate;
                    // 计算当前的页码
                    self.pageNow = Math.round(Math.abs(translate) / pageWidth) + 1;

                    setTimeout(() => {
                        // 设置页码，DOM操作需要放到异步队列中，否则会出现卡顿
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

        setTransform(offset) {
            this.transform = `translate3d(${offset}px, 0, 0)`;
        },
        setPageNow() {
            this.currentPoint = this.pageNow - 1;   
        },
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
    // @import './base.less';
    .vue-slide-ui-wrapper {
        position: relative;
        overflow: hidden;
        height:100%;
        .card-list-wrapper {
            overflow: hidden;
            width: fit-content;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
            white-space: nowrap;
            height:100%;
            font-size: 0;
            .card-wrapper {
               display: inline-block;
               width: 100vw;
               height: 100%;
               .card{
                    height: 100%;
                    // margin: 0 3px;
                    display:-webkit-box;
                    -webkit-box-align:center;
                    img {
                        width: 100%;
                        display: block;
                        height: 100%;
                    }
               }
            }
        }
        .page-number {
            display: -webkit-box;
            position: absolute;
            bottom: 5%;
            left: 35%;
            height: 1em;
            width: 30%;
            li {
                -webkit-box-flex: 1;
                width: 0;
                position: relative;
                &.now:after {
                    background: rgba(255,255,255,1) !important;
                }
                &:after {
                    content: "";
                    width: 6px;
                    height: 6px; 
                    background: rgba(255,255,255,0.3);
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
