<template>
  <div class="elearning-writting-test-result">
    <div
      v-for="(item, index) in contents"
      :key="index"
    >
      <div class="item">
        <label class="content-title">Câu hỏi {{ get(item, 'index', '*') }}</label>
        <div class="test-content" v-html="get(item, 'content', '')"></div>
      </div>
      <div class="item">
        <div class="writing-answer">
          <label class="font-weight-semi-bold text-dark mb-2 d-block">Câu trả lời</label>
          <div class="test-content-answer">
            <div v-html="get(item, 'student.answer', '')"></div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import { get } from "lodash"
  
  export default {
    props: {
      contents: {
        type: Array,
        required: true,
        validator: value => value.every(item => ["content", "index", "student"].every(key => key in item))
      }
    },
    computed: {
      hasManyQues: function() {
        return this.contents.length > 1
      }
    },
    data() {
      return {}
    },
    methods: {
      get
    }
  }
</script>

<style scoped>
</style>