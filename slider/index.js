/**
 * @file Slider handler
 * @author onepixel
 */
'use strict';

var constant = require('./lib/constant');
var config = require('./lib/config');
var mixins = require('./mixins');

module.exports = {

    name: config.name,

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
            maxOffset: 0,
            // Wether display tpl which provided.
            showTpl: false
        }
    },

    mixins: mixins,
    
    computed: {
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
            // As well, add an extra index for every card.
            this.cards = [];
            
            this.data.forEach(function (image, index) {
                // create a valid card object.
                var card = this.createValidCard(image);

                if (card) {
                    card.index = index;
                    card.display = false;
                    card.loaded = false;
                    card.error = false;
                    card.el = null;
                    this.cards.push(card);
                } else {
                    // Discard the invalid image object.
                }
            }.bind(this));
            // The `mounted` method will be called again when the component destroyed.
            // What's different from first called is that the html DOM is destroyed.
            // So, you need ensure the DOM object available before initialization.  
            if (this.$refs.container) {
                this.render();
            }
        },

        /**
         * Create a card object with a valid image url.
         * @param {*} image image object or image url
         */
        createValidCard: function (image) {
            image = image || {};
            var card = {};
            if (typeof image === 'string') {
                card.src = image;
            } else {
                card = image;
            }
            if (card.src) {
                return card;
            }
            // an invalid image url 
            else {
                // returns a null value to indicate an invalid value
                return null;
            }
        },
        
        /** 
         * Render slider.
         */
        render: function () {
            // The default position index.
            var index = this.options.index || 0;
            // Current page number.
            this.pageNow = index + 1;
            // Display tpl if provided.    
            this.showTpl = true;
            // Calculate card width.
            this.cardWidth = this.$refs.viewport.offsetWidth;
            // Add a gap to between images.
            this.cardWidth += this.options.gapWidth || 0;
            // The max offset of last page.
            this.maxOffset = - this.cardWidth * (this.cards.length -1);
            // Transform images to default position.
            this.setTransform(- this.cardWidth * index);
            // Set images dom element.
            this.setImageElement();
            // Calculate current page index.
            this.setCurrentPageIndex();
            // Handle default event.
            this.callback(constant.CHANGED); 
            // Initialize user touch event.
            this.initUserTouchEvent();
        }
    }
}