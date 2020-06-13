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
            <div v-if="get(item, 'student.answer', false)" v-html="get(item, 'student.answer', '')"></div>
            <div v-else class="text-center caption text-gray-2">Chưa có câu trả lời</div>
          </div>
        </div>
      </div>
      <div class="item elearning-writing-test-result">
        <attachment-assets
          v-if="get(item, 'student.attachment', false)"
          :link="get(item, 'student.attachment')"
        />
      </div>
    </div>
    <div class="item" v-if="note">
      <label for="" class="text-dark content-title">Nhận xét chi biết bài làm của học sinh</label>
      <div class="content--note">
        <div v-if="note" v-html="note"></div>
        <div v-else class="text-center caption text-gray-2">Chưa có nhận xét</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { get } from "lodash"
  import AttachmentAssets from "~/components/page/elearning/manager/exam/AttachmentAssets"
  
  export default {
    components: {
      AttachmentAssets
    },
    props: {
      contents: {
        type: Array,
        required: true,
        validator: value => value.every(item => ["content", "index"].every(key => key in item))
      },
      note: {
        type: String
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