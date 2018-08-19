/**
 * @file Slider handler
 * @author onepixel
 */
import constant from './constant';
import config from './config';
import options from './options';

export default {
    data() {
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
            default() {
                return [];
            }
        },
        // A configuration for slider
        options: {
            type: Object,
            default() {
                return options;
            }
        }
    },
    computed: {
        // Current image object.
        current() {
            let index = this.pageNow - 1;
            return this.cards[index];
        }
    },
    mounted() {
        // The initialization need to delay 300 mills.
        setTimeout(() => this.initialize(), 300);
    },
    methods: {

        /**
         * Initialization
         */
        initialize() {
            // Make the prop data copy to inner variable.
            // As well, add a extra index for every card.
            this.cards = this.data.map((item, index) => {
                item.index = index;
                return item;
            });
            // The `mounted` method will be called again when the component destroyed.
            // What's different from first called is that the html DOM is destroyed.
            // So, you need ensure the DOM object available before initialization.  
            if (this.$refs.container) {
                this.initView()
                this.setCurrentPageIndex();
                this.bindTouchEvent();
                this.callback(constant.CHANGED); 
            }
        },
        
        /** 
         * Initialize page view.
         */
        initView() {
            let index = this.options.index || 0;
            this.pageNow = index + 1;
            this.cardWidth = this.$refs.viewport.offsetWidth;
            // The max offset of last page.
            this.maxOffset = - this.cardWidth * (this.cards.length -1);
            this.setTransform(- this.cardWidth * index);
        },
       
        /** 
         * Bind user touch event.
         */
        bindTouchEvent() {
           let self = this; 
           // User touch container.
           let container =  this.$refs.container;
           // Record current page index.
           let curOffset = - (this.cardWidth * this.curIndex);
           // Initial client x.
           let startX;
           // The offset of pressing the screen. 
           let startOffset = 0;
           // Current move offset.
           let moveOffset = 0;
           // Whether triggered `touchmove` event.
           let isMove = false;
           // Record mills when finger press the screen.
           let startT = 0;
           // Record current touch event whether has been end.
           let isTouchEnd = true;
           // `setTimeout` handle.
           let timer = null;
           // Finger just press on screen.
           container.addEventListener(constant.TOUCH_START, e => {
               e.preventDefault();
               // Allow single fingers or multiple fingers touch at the same time.
               // Not allow the second finger delay touch.
               if (e.touches.length === 1 || isTouchEnd) {
                   let touch = e.touches[0];
                   startX = touch.clientX;
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
                   timer = setTimeout(() => {
                       if (!isMove) {
                          self.callback(constant.LONG_TAP);
                       } else {
                          timer && clearTimeout(timer); 
                       }
                   }, config.logTapMills);
               }
           }, false);
           // Transform card successive when finger moving on screen.
           container.addEventListener(constant.TOUCH_MOVE, e => {
               e.preventDefault();
               // If current move is finished, it should terminate the follow actions anyhow.
               if (isTouchEnd) return ; 
               
               let touch = e.touches[0];
               // Finger move offset really.
               let deltaX = touch.clientX - startX;
               // Page should move offset.
               let offset = startOffset + deltaX;
               // If the offset over left boundary or right bounday.
               // It should set offset special.
               if (offset > 0 || offset < this.maxOffset) {
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
           }, false);

           // Calculate which page to stay when finger leave from screen.
           container.addEventListener(constant.TOUCH_END, e => {
               e.preventDefault();
               let offset = 0;
               // Cancel timer to stop to check.
               timer && clearTimeout(timer); 
               // Calculate mills of finger stay on screen.
               let deltaT = + new Date() - startT;
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
                    if (deltaT < config.fastMoveMills) { 
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
        setPageNow(offset) {
            this.pageNow = Math.round(Math.abs(offset) / this.cardWidth) + 1;
             // Set page number, it should put DOM operation to asynchronous queue in order to prevent unfluency.
            setTimeout(() => {
                // Set current page index.
                this.setCurrentPageIndex();
                // Handle changed event.
                this.callback(constant.CHANGED);
            }, 100);
        },

        /**
         * Set current page number index.
         */
        setCurrentPageIndex() {
            this.curIndex = this.pageNow - 1;   
        },

        /**
         * Set move orient.
         * @param {*} deltaX Current move offset x really.
         */
        setMoveOrient(deltaX) {
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
        getMoveNextOffset(curOffset, moveOffset) {
            let offset = 0;
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
        getOverBoundaryOffset(startOffset, deltaX) {
            let offset = startOffset + deltaX;
            let options = {};
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
        setTransform(offset) {
            this.transform = `translate3d(${offset}px, 0, 0)`;
        },

        /**
         * Handle callback method of props.
         * @param {String} fn method name.
         * @param {Object} options config object.  
         */
        callback(fn, options) {
           let self = this;
           let cb = this.options[fn];
           let obj = this.current;
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
        log(...params) {
            // Turn on debug mode.
            if (this.options.isDebug) {
                console.log(...params);
            }
        }
    }
}