/**
 * @file helper
 */

export default {

    /**
     * Bind event
     * @param {*} el element
     * @param {*} events one or more event list
     * @param {*} cb callback
     */
    bindEvent(el, events, cb) {
        events = typeof events === 'string' ? [events] : events;
        events.forEach(e => {
            el.addEventListener(e, cb, false);
        });
    },

    /**
     * Create a slider slider card object with a valid image url.
     * @param {*} image image object or image url
     */
    createSliderCard(image) {
        image = image || {};
        let card = {};
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
}