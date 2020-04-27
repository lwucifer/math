<template>
  <div class="sub-block-section">
    <div class="sub-block-section__title">
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
      title: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/app/_app-sub-block-section.scss";
</style>