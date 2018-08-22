<template>
    <div class="vue-html-slider-wrapper" ref="viewport">
        <!--slider-list-->
        <ul class="slider-list-wrapper" ref="container"  
            :style="{transform: transform, transition: transition}">
            <li class="card-wrapper" 
                v-for="(card, index) in cards"
                :class="{fade: options.useFade, show: card.display}"
                :style="getStyle(index)" 
                :key="index">
                <div class="card" :class="options.clsName">
                    <img alt="" :src="card.src">
                </div>
            </li>
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
    export { default } from './script/slider';
</script>
<style lang="less" scoped>
    @import url(./style/slider.less);
</style>
