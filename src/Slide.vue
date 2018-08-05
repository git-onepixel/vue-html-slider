<template>
    <div class="vue-slide-plus-wrapper">
        <ul class="card-list-wrapper" ref="container" :style="getTransform()">
            <li class="card" v-for="card in cards" :style="setBackground(card.url)">
            </li>
        </ul>
        <ol class="page-number">
          <li v-for="(card, index) in cards" :class="{now: currentPoint}"></li>
        </ol>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cards: [],
            pageNow: 1,
            currentPoint: -1;
            transform: '';
        }
    },
    props: {
        images: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    mounted() {
        setTimeout(() => this.initialize(), 300);
    },
    methods: {
        initialize() {
            this.cards = this.images(image => {

                return image;
            });
            // this.points
            this.initTouchEvent();
            this.setPageNow();

        },
       
        initTouchEvent() {
           let container =  this.$refs.container;
           var currentPosition = 0; // 记录当前页面位置
          //  var currentPoint = -1;   // 记录当前点的位置
           
           // 页面宽度
           let pageWidth = document.documentElement.offsetWidth; 
           var maxWidth = - pageWidth * (this.cards.length -1); // 页面滑动最后一页的位置
           var startX, startY;
           var initialPos = 0;  // 手指按下的屏幕位置
           var moveLength = 0;  // 手指当前滑动的距离
           var direction = 'left'; // 滑动的方向
           var isMove = false; // 是否发生左右滑动
           var startT = 0; // 记录手指按下去的时间
           var isTouchEnd = true; // 标记当前滑动是否结束(手指已离开屏幕) 

           // 手指放在屏幕上
           container.addEventListener('touchstart', e => {
               e.preventDefault();
               // 单手指触摸或者多手指同时触摸，禁止第二个手指延迟操作事件
               if (e.touches.length === 1 || isTouchEnd) {
                   var touch = e.touches[0];
                   startX = touch.pageX;
                   startY = touch.pageY;
                   // 本次滑动前的初始位置
                   initialPos = currentPosition;  
                   // 取消动画效果 
                   viewport.style.webkitTransition = ''; 
                   startT = + new Date(); // 记录手指按下的开始时间
                   isMove = false; // 是否产生滑动
                   isTouchEnd = false; // 当前滑动开始
               }
           }, false);

           // 手指在屏幕上滑动，页面跟随手指移动
           container.addEventListener('touchmove', e => {
               e.preventDefault();
               
               // 如果当前滑动已结束，不管其他手指是否在屏幕上都禁止该事件
               if (isTouchEnd) return ;
               
               var touch = e.touches[0];
               var deltaX = touch.pageX - startX;
               var deltaY = touch.pageY - startY;
               
               var translate = initialPos + deltaX; // 当前需要移动到的位置
               // 如果translate>0 或 < maxWidth,则表示页面超出边界
               if (translate > 0) {
                  translate = 0; 
               }
               if (translate < maxWidth) {
                  translate = maxWidth; 
               }
               deltaX = translate - initialPos;
               this.transform(translate);
               isMove = true;
               moveLength = deltaX;
               // 判断手指滑动的方向
               direction = deltaX > 0 ? 'right' : 'left'; 
           }, false);

           // 手指离开屏幕时，计算最终需要停留在哪一页
           container.addEventListener('touchend', e => {
               e.preventDefault();
               var translate = 0;
               // 计算手指在屏幕上停留的时间
               var deltaT = + new Date() - startT;
               // 发生了滑动，并且当前滑动事件未结束
               if (isMove && !isTouchEnd) { 
                    // 标记当前完整的滑动事件已经结束 
                    isTouchEnd = true; 
                    // 使用动画过渡让页面滑动到最终的位置
                    viewport.style.webkitTransition = '0.3s ease -webkit-transform';
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
                            translate = direction === 'left'?
                            currentPosition - (pageWidth + moveLength) 
                            : currentPosition + pageWidth - moveLength;
                            translate = translate > 0 ? 0 : translate;
                            translate = translate < maxWidth ? maxWidth : translate;
                        }
                    }
                   
                    // 执行滑动，让页面完整的显示到屏幕上
                    this.transform(translate);
                    // 计算当前的页码
                    pageNow = Math.round(Math.abs(translate) / pageWidth) + 1;

                    setTimeout(() => {
                        // 设置页码，DOM操作需要放到异步队列中，否则会出现卡顿
                        this.setPageNow();
                    }, 100);
                }
           }, false);
        },

        setTransform(offset) {
           
           this.transform = offset;
           currentPosition = translate;
        },
        setPageNow() {
            currentPoint = pageNow - 1;   
        },
        setBackground(url) {
            return {
               backgroundImage: 'url(${url})` 
            }
        },
        getTransform(url) {
            return {
                transform: 'translate3d(' + this.transform + 'px, 0, 0)' 
            }
        }
    }
}
</script>
<style lang="less" scoped>
    @import './base/less';
    .vue-slide-plus-wrapper {
        position: relative;
        overflow: hidden;

        .card-list-wrapper {
            overflow: hidden;
            width: fit-content;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
            .card {
               font-size: 0;
               display: inline-block;
               width: 100vw;
               background-size: cover;
               background-position: center center;
               background-repeat: no-repeat; 
               visibility: visible;
            }
        }
        .page-number {
            display: -webkit-box;
            position: absolute;
            bottom: 5%;
            left: 35%;
            height: 1em;
            width: 30%;
        }
        .pagenumber div{
            -webkit-box-flex: 1;
            width: 0;
            position: relative;
        }
        .pagenumber .now:after {
            background: rgba(255,255,255,1) !important;
        }
        .pagenumber div:after{
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
</style>