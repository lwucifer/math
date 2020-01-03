<template>
  <div class="post-image">
    <div class="post-image-item" v-for="(item, index) in images" :key="index">
      <div class="post-image-item__container">
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>