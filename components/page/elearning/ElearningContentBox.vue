<template>
  <div class="elearning-content-box">
    <div class="elearning-content-box__title">
      <slot name="head">
        <h5 class="color-primary mb-3">Bài tập và bài kiểm tra</h5>
      </slot>
      <hr class/>
    </div>

    <div class="elearning-content-box__main">
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

<style lang="scss" scoped>
  @import "~/assets/scss/components/elearning/_elearning-content-box.scss";
</style>