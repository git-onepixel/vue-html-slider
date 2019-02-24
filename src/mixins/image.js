/**
 * @file image.
 * @author onepixel
 */

import constant from '../lib/constant';

export default {
    methods: {
        /**
         * Set images dom element to card.
         * Set 16 mills delay for a fade animation.
         */
        setImageElement() {
            var self = this;
            var el = this.$refs.container;
            setTimeout(() => {
                var images = el.querySelectorAll('img');
                this.cards.forEach((card, index) => {
                    card.el = images[index];
                });
                // Load all images if disable lazyload.
                if (!self.options.lazyload) {
                    this.loadAllImages();
                }   
                this.setImageView(false);
            }, 16);
        },

        /**
         * Load all images now.
         */
        loadAllImages() {
            this.cards.forEach(card => {
                card.el.src = card.src;
                this.preload(card);
            });
        },

        /**
         * Set image display or hide when appears.
         * @param {*} isMove whether moving.
         */
        setImageView(isMove) {
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
         * Preload image when appears.
         * @param card image object.
         */
        preload: function (card) {
            var self = this;
            if (card.el.complete) {
                card.loaded = true;
                self.display(card, true);
            } else {
                card.el.onload = function () {
                    card.loaded = true;
                    self.display(card, card.index === self.curIndex);
                }
            }
            card.el.onerror = function () {
                card.error = true;
                card.loaded = true;
                self.display(card, false)
            }
        },

        /**
         * Set card display
         * @param {*} card card object of cards.
         * @param {*} status display or hide.
         */
        display: function (card, status) {
            if (card && card.display !== status) {
                if (status && !card.loaded) {
                    card.el.src = card.src;
                    this.preload(card);
                } else {
                    card.display = status;
                    this.cards = this.cards.slice(0);
                }
            }
        }
    }
}