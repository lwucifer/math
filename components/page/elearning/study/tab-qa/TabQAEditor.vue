<template>
  <div class="e-study-tab-qa-editor d-flex">
    <app-avatar :size="40" class="mr-4" />

    <div class="flex-grow e-study-tab-qa-editor__right">
      <app-input textarea rows="4" placeholder="Đặt câu hỏi" />

      <div class="d-flex justify-content-between">
        <app-button size="sm" color="default">
          <IconCameraAlt class="icon body-1 mr-2" />Chọn ảnh
        </app-button>
        <app-button size="sm">Gửi câu hỏi</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import IconCameraAlt from "~/assets/svg/v2-icons/camera_alt_24px.svg?inline";

export default {
  components: {
    IconCameraAlt
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_tab-qa-editor.scss";
</style>