<template>
  <div class="rate-status">
    <p class="text-dark font-weight-semi-bold mb-2 rate-status__title">Tỉ lệ hoàn thành tính trên {{ total | toThousandFilter }} học sinh làm bài</p>
    <div class="d-md-flex justify-content-md-between rate-status__figure">
      <p>Đạt: <span class="text-success font-weight-semi-bold">{{ passed }}</span></p>
      <p>Không đạt: <span class="text-error font-weight-semi-bold">{{ failed }}</span></p>
      <p>Chưa chấm: <span class="text-warning font-weight-semi-bold">{{ pending }}</span></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      total: {
        type: Number | String,
        required: true
      },
      passed: {
        type: Number | String,
        required: true
      },
      failed: {
        type: Number | String,
        required: true
      },
      pending: {
        type: Number | String,
        required: true
      },
    },

    filters: {
    }
  }
</script>

<style scoped lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-rate-status.scss";
</style>