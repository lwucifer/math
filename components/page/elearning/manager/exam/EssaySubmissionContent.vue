<template>
  <div class="elearning-writting-test-result">
    <div class="item"
       v-for="(item, index) in contents"
       :key="index"
    >
      <label class="content-title">{{ item.title }}</label>
      <div class="test-content" v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      contents: {
        type: Array,
        required: true,
        validator: value => value.every(item => ["title", "content"].every(key => key in item))
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
</style>