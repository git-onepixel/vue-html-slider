/**
 * @file image.
 * @author onepixel
 */
'use strict';

var constant = require('../lib/constant');
module.exports = {
    methods: {
        /**
         * Set images dom element to card.
         */
        setImageElement: function () {
            var self = this;
            var el = this.$refs.container;
            setTimeout(function () {
                var images = el.querySelectorAll('img');
                self.cards.forEach(function (card, index) {
                    card.el = images[index];
                });
                // Load all images if disable lazyload.
                if (!self.options.lazyload) {
                    self.loadAllImages();
                }   
                self.setImageView(false);
            }, 0)
        },

        /**
         * Load all images now.
         */
        loadAllImages: function () {
            var self = this;
            this.cards.forEach(function (card, index) {
                if (card.el.complete) {
                    card.loaded = true;
                    self.display(card, index === self.curIndex);
                } else {
                    self.preload(card);
                }
            });
        },

        /**
         * Set image display or hide when appears.
         * @param {*} isMove whether moving.
         */
        setImageView: function (isMove) {
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
                if (status && !card.loaded) {
                    card.displayUrl = card.src;
                    this.preload(card);
                } else {
                    card.display = status;
                }
                this.cards = this.cards.slice(0);
            }
        },

        /**
         * Preload image when appears.
         * @param card image object.
         */
        preload: function (card) {
            var self = this;
            card.el.onload = function () {
                card.loaded = true;
                self.display(card, card.index === self.curIndex);
            }
            card.el.onerror = function () {
                card.error = true;
                self.cards = self.cards.slice(0);
            }
        }
    }
}