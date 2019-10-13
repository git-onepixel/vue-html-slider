/**
 * @file Image handler
 * @author Onepixel<onepixel@126.com>
 */

import constant from '../libs/constant';

export default {
  methods: {
    /**
     * Set images dom element to card.
     * Set 16 mills delay for a fade animation.
     */
    setImageElement() {
      const el = this.$refs.container;
      setTimeout(() => {
        const images = el.querySelectorAll('img');
        this.cards.forEach((card, index) => {
          card.el = images[index];
        });
        // Load all images if disable lazyload.
        if (!this.options.lazyload) {
          this.loadAllImages();
        }
        this.setImageView(false);
      }, 16);
    },

    /**
     * Load all images now.
     */
    loadAllImages() {
      this.cards.forEach((card) => {
        card.el.src = card.src;
        this.preload(card);
      });
    },

    /**
     * Set image display or hide when appears.
     * @param {*} isMove whether moving.
     */
    setImageView(isMove) {
      const last = this.cards[this.curIndex - 1];
      const next = this.cards[this.curIndex + 1];

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
    preload(card) {
      if (card.el.complete) {
        card.loaded = true;
        this.display(card, true);
      } else {
        card.el.onload = () => {
          card.loaded = true;
          this.display(card, card.index === this.curIndex);
        };
      }
      card.el.onerror = () => {
        card.error = true;
        card.loaded = true;
        this.display(card, false);
      };
    },

    /**
     * Set card display
     * @param {*} card card object of cards.
     * @param {*} status display or hide.
     */
    display(card, status) {
      if (card && card.display !== status) {
        if (status && !card.loaded) {
          card.el.src = card.src;
          this.preload(card);
        } else {
          card.display = status;
          this.cards = this.cards.slice(0);
        }
      }
    },
  },
};
