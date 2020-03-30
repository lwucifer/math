<template>
  <div class="cc-panel__body">
    <!-- <app-alert type="warning" class="mb-4" show-close>
      <template slot="icon">
        <IconInfoCircle class="icon ce-alert-icon heading-3 fill-sub" />
      </template>
      Bạn có thể tạo bài kiểm tra bắt buộc cho bài giảng, khóa học của bạn tại
      đây. Học sinh cần hoàn thành bài kiểm tra và đạt điểm để hoàn thành khóa
      học.
    </app-alert> -->

    <app-button
      class="font-weight-semi-bold"
      color="secondary"
      size="sm"
      square
      @click="$emit('handleClick')"
      >Tạo bài tập</app-button
    >
  </div>
</template>

<script>
import IconInfoCircle from "~/assets/svg/design-icons/info-circle.svg?inline";

export default {
  components: {
    IconInfoCircle
  }
};
</script>
