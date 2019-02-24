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
                    <img :alt="card.title">
                </div>
                <!--loading-page-->
                <div class="loading" 
                     v-if="!card.loaded" 
                     v-html="options.loading">
                </div>
                <!--load-error-page-->
                <div class="error" 
                     v-if="card.error" 
                     v-html="options.error">
                </div>
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
    export { default } from './slider';
</script>
<style lang="less" scoped>
    @import '../css/index.less';
</style>
