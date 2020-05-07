<template>
  <div class="e-exercise-do-exercise-essay">
    <div class="e-exercise-do-exercise-essay__bottom d-flex">
      <app-button class="mr-auto" color="default" size="sm">
        <IconCloudUpload class="icon fill-opacity-1 body-1 mr-2" />Tải lên câu trả lời
      </app-button>

      <app-button size="sm" color="info">
        <IconSend class="icon body-1 mr-2" />Nộp bài
      </app-button>
    </div>
  </div>
</template>

<script>
import IconCloudUpload from "~/assets/svg/v2-icons/cloud_upload_24px.svg?inline";
import IconSend from "~/assets/svg/v2-icons/send_24px.svg?inline";

export default {
  components: {
    IconSend,
    IconCloudUpload
  }
};
</script>

<style>
</style>