<template>
  <div class="px-4">
    <div class="form--score">
      <app-checkbox
        v-model="formData.to_passed"
        label="Cho qua"
      >
      </app-checkbox>
      <p class="form--note mt-2">
        <i>*Học sinh này đã vượt quá số lần làm bài cho phép. Bạn có đồng ý cho phép học sinh này hoàn thành bài tập với số điểm tối thiểu?</i>
      </p>
    </div>

    <div
      class="mt-4"
    >
      <app-button
        square
        normal
        :color="formData.to_passed ? 'primary' : 'disabled'"
        @click="submit"
      >
        Xác nhận
      </app-button>
    </div>

    <app-divider class="mb-3 mt-4"/>
  </div>
</template>

<script>

  export default {
    components: {

    },
    data() {
      return {
        formData: {
          to_passed: false
        },
      }
    },
    watch: {
      filters: {
      }
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