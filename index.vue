<template>
    <div class="vue-html-slider-wrapper" ref="viewport">
        <!--slider-list-wrapper-->
        <ul class="slider-list-wrapper" ref="container"  
            :style="{transform: transform, transition: transition}">

            <!--pull-right-wrapper-->
            <div v-if="pullRight.tpl && showTpl" 
                 class="pull-right-wrapper" 
                 v-html="pullRight.tpl">
            </div>

            <!--slider-card-->
            <li class="card-wrapper"
                v-for="(card, index) in cards"
                :class="{fade: options.useFade, show: card.display}"
                :style="getStyle(index)" 
                :key="index">
                <div class="card" :class="options.clsName">
                    <img :alt="card.title" :src="card.displayUrl">
                </div>
                <!--loading-page-->
                <div v-if="!card.loaded" class="loading" v-html="options.loading"></div>
                <!--load-error-page-->
                <div v-if="card.error" class="error" v-html="options.error"></div>
            </li>

            <!--pull-left-wrapper-->
            <div v-if="pullLeft.tpl && showTpl" 
                 class="pull-left-wrapper" 
                 v-html="pullLeft.tpl">
            </div>
        </ul>
        <!--indicators-->
        <ol class="indicators" v-show="!options.hideIndicator">
            <li v-for="(card, index) in cards"
                v-if="card.index < maxIndicators"
                :class="{current: card.index == curIndex}"
                :key="index">
            </li>
        </ol>
    </div>
</template>
<script>
    module.exports = require('./slider');
</script>
<style lang="less" scoped>
    @import url(./slider/css/index.less);
</style>
