<template>
  <div class="sub-block-section">
    <div class="sub-block-section__title"
       v-if="hasTitle"
    >
      <slot name="title">
        <h4 class="sub-block-section__title--main">
          <icon-left-arrow v-if="hasIcon" class="sub-block-section__icon-title" /><span>{{ title }}</span>
        </h4>
      </slot>
    </div>
    
    <div class="sub-block-section__main">
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
      hasTitle: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      hasIcon: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/app/_app-sub-block-section.scss";
</style>