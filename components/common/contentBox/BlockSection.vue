<template>
  <div class="block-section">
    <div class="block-section__title">
      <slot name="title">
        <h3 class="block-section__title--main">{{ title }}</h3>
      </slot>
    </div>
    
    <div class="block-section__main">
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
  @import "~/assets/scss/components/app/_app-block-section.scss";
</style>