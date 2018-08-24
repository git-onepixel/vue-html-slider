/**
 * @file Slider handler
 * @author onepixel
 */
'use strict';

var constant = require('./constant');
var config = require('./config');
var options = require('./options');

module.exports = {
    data: function() {
        return {
            // A images list.
            cards: [],
            // Current page number.
            pageNow: 1,
            // Current page position index.
            curIndex: -1,
            // A css3 transform for making page move to given position.
            transform: '',
            // A css3 transition applied when page bounce to right position.
            transition: '',
            // Slider can display indicators at most.
            maxIndicators: 20,
            // Slider card width.
            cardWidth: 0,
            // Move orient
            moveOrient: constant.LEFT,
            // Max offset of slider last page.
            maxOffset: 0
        }
    },
    props: {
        // A prop for image list
        data: {
            type: Array,
            default: function () {
                return [];
            }
        },
        // A configuration for slider
        options: {
            type: Object,
            default: function () {
                return options;
            }
        }
    },
    computed: {
        // Current image object.
        current: function () {
            var index = this.pageNow - 1;
            return this.cards[index];
        }
    },
    mounted: function () {
        // The initialization need to delay 300 mills.
        setTimeout(function () {
            this.initialize();
        }.bind(this), 300);
    },
    methods: {

        /**
         * Initialization
         */
        initialize: function () {
            // Make the prop data copy to inner variable.
            // As well, add a extra index for every card.
            this.cards = this.data.map(function (card, index) {
                card.index = index;
                card.display = false;
                return card;
            });
            // The `mounted` method will be called again when the component destroyed.
            // What's different from first called is that the html DOM is destroyed.
            // So, you need ensure the DOM object available before initialization.  
            if (this.$refs.container) {
                // Initialize slider.
                this.initView();
                // Calculate current page index.
                this.setCurrentPageIndex();
                // Bind user touch event.
                this.bindTouchEvent();
                // Handle default event.
                this.callback(constant.CHANGED); 
            }
        },
        
        /** 
         * Initialize page view.
         */
        initView: function () {
            // The default position index.
            var index = this.options.index || 0;
            this.pageNow = index + 1;
            // Calculate card width.
            this.cardWidth = this.$refs.viewport.offsetWidth;
            // Add a gap to between images.
            this.cardWidth += this.options.gapWidth || 0;
            // The max offset of last page.
            this.maxOffset = - this.cardWidth * (this.cards.length -1);
            // Transform images to default position.
            this.setTransform(- this.cardWidth * index);
            // Apply fade to image.
            this.setImageFade(false);
        },
       
        /** 
         * Bind user touch event.
         */
        bindTouchEvent: function () {
           var self = this; 
           // User touch container.
           var container =  this.$refs.container;
           // Record current page index.
           var curOffset = - (this.cardWidth * this.curIndex);
           // Initial client x.
           var startX, startY;
           // The offset of pressing the screen. 
           var startOffset = 0;
           // Current move offset.
           var moveOffset = 0;
           // Whether triggered `touchmove` event.
           var isMove = false;
           // Record mills when finger press the screen.
           var startT = 0;
           // Record current touch event whether has been end.
           var isTouchEnd = true;
           // The move offset prefer horizontal.
           var isPreferHorizontal = false;
           // `setTimeout` handle.
           var timer = null;
           // Finger just press on screen.
           container.addEventListener(constant.TOUCH_START, function (e) {
               e.preventDefault();
               // Allow single fingers or multiple fingers touch at the same time.
               // Not allow the second finger delay touch.
               if (e.touches.length === 1 || isTouchEnd) {
                   var touch = e.touches[0];
                   startX = touch.clientX;
                   startY = touch.clientY;
                   // Set initial position before moving.
                   startOffset = curOffset;
                   // Initialize `transition`
                   self.transition = '';
                   // Record mills of finger press screen. 
                   startT = + new Date();
                   // Initialize `isMove`
                   isMove = false;
                   // Initialize `isTouchEnd`
                   isTouchEnd = false;
                   // Check whether trigger `touchmove`
                   // If it don't move after 500 mills, I think it triggered `longtap` event.
                   // Otherwise, cancel timer to stop check.
                   timer = setTimeout(function () {
                       if (!isMove) {
                          self.callback(constant.LONG_TAP);
                       } else {
                          timer && clearTimeout(timer); 
                       }
                   }, config.logTapMills);
               }
           }, false);
           // Transform card successive when finger moving on screen.
           container.addEventListener(constant.TOUCH_MOVE, function (e) {
               e.preventDefault();
               // If current move is finished, it should terminate the follow actions anyhow.
               if (isTouchEnd) return ; 
               
               var touch = e.touches[0];
               // Finger move offset X really.
               var deltaX = touch.clientX - startX;
               // Finger move offset Y really.
               var deltaY = touch.clientY - startY;
               // If deltaX more than deltaY, the touch moving is prefer horizontal.
               isPreferHorizontal = Math.abs(deltaX) / Math.abs(deltaY) > config.preferCoefficient;
               // Page should move offset.
               var offset = startOffset + deltaX;
               // If the offset over left boundary or right bounday.
               // It should set offset special.
               if (offset > 0 || offset < self.maxOffset) {
                   offset = self.getOverBoundaryOffset(startOffset, deltaX); 
               }
               // Calculate effective deltax again. 
               deltaX = offset - startOffset;
               // Save deltaX to moveOffset.
               moveOffset = deltaX;
               // Save offset to curOffset.
               curOffset = offset;
               // Execute transform immediately.
               self.setTransform(offset);
               // Set it is been moved.
               isMove = true;
               // Set move orient.
               self.setMoveOrient(deltaX);
               // Apply fade to image.
               self.setImageFade(true);
           }, false);

           // Calculate which page to stay when finger leave from screen.
           container.addEventListener(constant.TOUCH_END, function (e) {
               e.preventDefault();
               var offset = 0;
               // Cancel timer to stop to check.
               timer && clearTimeout(timer); 
               // Calculate mills of finger stay on screen.
               var deltaT = + new Date() - startT;
               // Moving, and current move event is not end.
               if (isMove && !isTouchEnd) { 
                    // Record current move event has been end. 
                    isTouchEnd = true; 
                    // Using transition make page move to right position.
                    self.transition = config.transition;
                    // If move to left or right boundary, it shold terminate the follow actions anyhow.
                    if (curOffset === this.maxOffset || curOffset === 0) {
                        if (offset === 0)  return ;
                    }
                    // It is a fast move if the mills is less then 300 mills.
                    // It will can move next only when fast move with horizontal.
                    // If the isPreferHorizontal is false, I think user don't want to next page.
                    // So, it need to recovery offset x to original position. 
                    if (deltaT < config.fastMoveMills && isPreferHorizontal) { 
                        // Moving to next page.
                        offset = self.getMoveNextOffset(curOffset, moveOffset);
                    } else {
                        // If move length is less than precent 50 of page width, it should back to last page.
                        if (Math.abs(moveOffset) / this.cardWidth < config.moveCoefficient) {
                            offset = curOffset - moveOffset;
                        } else {
                            // Otherwise, it should move to next page.
                            offset = self.getMoveNextOffset(curOffset, moveOffset);
                        }
                    }
                    // Executing transform to move it to right position.
                    self.setTransform(offset);
                    // Save offset to curOffset.
                    curOffset = offset;
                    // Handle current page number.
                    self.setPageNow(offset);
                } else {
                    if (!isMove) {
                        // Click event.
                        if (deltaT < config.clickMills) {
                            self.callback(constant.CLICK);
                        }  
                        // When long tap event end.
                        if (deltaT > config.logTapMills) {
                            self.callback(constant.LONG_TAP_END);
                        }
                    }
                }
           }, false);
        },

        /**
         * Set current page number.
         * @param {*} offset 
         */
        setPageNow: function (offset) {
            this.pageNow = Math.round(Math.abs(offset) / this.cardWidth) + 1;
             // Set page number, it should put DOM operation to asynchronous queue in order to prevent unfluency.
            setTimeout(function () {
                // Set current page index.
                this.setCurrentPageIndex();
                // Apply fade to image.
                this.setImageFade(false);
                // Handle changed event.
                this.callback(constant.CHANGED);
            }.bind(this), 100);
        },

        /**
         * Set current page number index.
         */
        setCurrentPageIndex: function () {
            this.curIndex = this.pageNow - 1;   
        },

        /**
         * Set move orient.
         * @param {*} deltaX Current move offset x really.
         */
        setMoveOrient: function (deltaX) {
            if (deltaX > 0) {
                this.moveOrient = constant.RIGHT;
            } else {
                this.moveOrient = constant.LEFT;
            }
        },

        /**
         * Get offset of moving to next page.
         * @param {*} curOffset Current offset
         * @param {*} moveOffset Move offset
         */
        getMoveNextOffset: function (curOffset, moveOffset) {
            var offset = 0;
            // Move to left
            if (this.moveOrient === constant.LEFT) {
                offset = curOffset - this.cardWidth - moveOffset;
            // Move to right.
            } else {
                offset = curOffset + this.cardWidth - moveOffset;
            }
            // If offset more than zero, set zero.    
            if (offset > 0) {
                offset = 0;
            }
            // If offset less than max offset, set max offset.   
            if (offset < this.maxOffset) {
                offset = this.maxOffset;
            }
            return offset;  
        },

        /**
         * Get offset of over left boundary or right boundary.
         * @param {*} startOffset Start offset
         * @param {*} deltaX Current move offset x really
         */
        getOverBoundaryOffset: function (startOffset, deltaX) {
            var offset = startOffset + deltaX;
            var options = {};
             // The left boundary.
            if (offset > 0) {
                if (this.options.disableBounce) {
                    offset = 0;
                } else {
                    offset = startOffset + deltaX * config.transformCoefficient;
                    options.x = offset;
                    this.callback(constant.PULL_RIGHT, options);
                }
             }
             // The right boundary.
             if (offset < this.maxOffset) {
                if (this.options.disableBounce) {
                    offset = this.maxOffset;
                } else {
                    offset = startOffset + deltaX * config.transformCoefficient;
                    options.x = this.maxOffset - offset;
                    this.callback(constant.PULL_LEFT, options);
                }
             }
             return offset;
        },

        /**
         * Apply transform to DOM immediately.
         * 
         * Using translate3d to turn on GPU hardware to accelerate animation rendering performance. 
         * @param {*} offset translate offset x.
         */
        setTransform: function (offset) {
            this.transform = 'translate3d(' + offset + 'px, 0, 0)';
        },

        /**
         * Apply fade animation to image when appears.
         * @param {*} isMove whether moving.
         */
        setImageFade: function (isMove) {
            var last = this.cards[this.curIndex - 1];
            var next = this.cards[this.curIndex + 1];

            if (isMove) {
                if (this.moveOrient === constant.RIGHT) {
                    this.display(last, true);
                    this.display(next, false);
                } else {
                    this.display(last, false);
                    this.display(next, true);
                }
            } else {
                this.display(last, false);
                this.display(next, false);
                this.display(this.current, true);
            }
        },

        /**
         * Set card display
         * @param {*} card card object of cards.
         * @param {*} status display or hide.
         */
        display: function (card, status) {
            if (card && card.display !== status) {
                card.display = status;
                this.cards = this.cards.slice(0);
            }
        },

        /**
         * Get slider item style.
         * @param {*} index 
         */
        getStyle: function (index) {
            var css = '';
            var last = this.cards.length - 1 === index;
            var gapWidth = this.options.gapWidth || 0;
            if (gapWidth && !last) {
                css = 'margin-right: ' + gapWidth + 'px';
            }
            return css;
        },

        /**
         * Handle callback method of props.
         * @param {String} fn method name.
         * @param {Object} options config object.  
         */
        callback: function (fn, options) {
           var self = this;
           var cb = this.options[fn];
           var obj = this.current;
           if (typeof cb !== 'function') {
                cb = function (obj, options) {
                    self.log(fn, obj, options);
                }
           }
           cb(obj, options);
        },

        /** 
         * Print log infos
         * @param {*} params arguments. 
         */
        log: function () {
            // Turn on debug mode.
            if (this.options.isDebug) {
                console.log.apply(null, arguments);
            }
        }
    }
}