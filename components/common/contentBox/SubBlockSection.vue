<template>
  <div class="sub-block-section">
    <div class="sub-block-section__title"
       v-if="hasTitle"
    >
      <slot name="title">
        <h4 class="sub-block-section__title--main">{{ title }}</h4>
      </slot>
    </div>
    
    <div class="sub-block-section__main">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      hasTitle: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/app/_app-sub-block-section.scss";
</style>