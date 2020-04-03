<template>
  <div class="writting-test-score">
    <!--<label class="title" for="">Chấm điểm</label>-->
    <div class="writting-test-score__form">
      <div class="item">
        <label for="" class="content-title">Nhận xét chi biết bài làm của học sinh</label>
        <app-editor id="comment" v-model="formData.note"/>
      </div>
      <app-input
        class="d-inline-block"
        v-model="formData.mark"
        :disabled="formData.to_passed"
        label="Chấm điểm"
        labelBold
      >
      </app-input>
      <div>
        <app-checkbox
          v-model="formData.to_passed"
          :disabled="formData.mark"
          label="Cho qua"
        >
        </app-checkbox>
        <p class="form--note mt-2">
          <i>*Học sinh này đã vượt quá số lần làm bài cho phép. Bạn có đồng ý cho phép học sinh này hoàn thành bài tập với số điểm tối thiểu?</i>
        </p>
      </div>

      <div
        class="text-center mt-4"
      >
        <app-button
          square
          normal
          @click="submit"
        >
          Xác nhận
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {

    },
    data() {
      return {
        isPass: null,
        formData: {},
      }
    },
    watch: {
    
    },
    methods: {
      submit() {
        this.$emit('submit', this.formData)
      },
    }
  }
</script>

<style scoped>

</style>