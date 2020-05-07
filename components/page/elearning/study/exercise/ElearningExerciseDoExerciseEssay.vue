<template>
  <div class="e-exercise-essay">
    <div class="mb-3">
      <div class="d-flex justify-content-between mb-2">
        <span>Câu hỏi</span>
        <a href="" class="text-decoration-none">In câu hỏi</a>
      </div>

      <div class="e-exercise-essay__question-name">Câu hỏi</div>
    </div>

    <div class="mb-15">
      <label class="d-inline-block mb-2" for="essay-answer">Câu trả lời</label>
      <app-input id="essay-answer" placeholder="Nhập câu trả lời" textarea></app-input>
    </div>


    <div class="e-exercise-essay__bottom d-flex">
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