<template>
  <div class="block-section">
    <div class="block-section__title">
      <slot name="title">
        <h3 class="block-section__title--main" @click="clickTitle">
          <icon-left-arrow v-if="hasIcon" class="block-section__icon-title" />
          {{ title }}
        </h3>
      </slot>
    </div>
    
    <div class="block-section__main">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  import IconLeftArrow from "~/assets/svg/icons/left-arrow.svg?inline";
  
  export default {
    components: {
      IconLeftArrow
    },
    props: {
      title: {
        type: String,
        required: true
      },
      hasIcon: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickTitle() {
        this.$emit('click')
      }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/app/_app-block-section.scss";
</style>