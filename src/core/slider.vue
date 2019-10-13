<template>
<div class="v-h-s-r" ref="viewport">
  <!--slider-card-list-->
  <ul class="s-c-l" ref="container" :style="{transform: transform, transition: transition}">
    <!--slider-pull-right-->
    <div v-if="pullRight.tpl && showTpl"
      class="s-p-r"
      v-html="pullRight.tpl">
    </div>

    <!--slider-card-wrappr-->
    <li class="s-c-r"
      v-for="(card, index) in cards"
      :class="{fade: options.useFade, show: card.display}"
      :style="getStyle(index)"
      :key="index">

      <div class="s-c-b" :class="options.clsName">
        <img :alt="card.title">
      </div>

      <!--card-loading-view-->
      <div class="c-l-v" v-if="!card.loaded" v-html="options.loading"></div>

      <!--load-error-view-->
      <div class="l-e-v" v-if="card.error" v-html="options.error"></div>
    </li>

    <!--slider-pull-left-->
    <div v-if="pullLeft.tpl && showTpl"
      class="s-p-l"
      v-html="pullLeft.tpl">
    </div>

  </ul>

  <!--card-indicator-list-->
  <ol class="c-i-l" v-show="!options.hideIndicator">
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
@import './slider.less';
</style>
