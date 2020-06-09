<template>
  <div class="cc-tab-panel">
    <app-upload
      @change="handleSelectFile"
      class="clc-upload-video"
      :placeholder="get(lesson, 'file_name', 'Chưa có audio nào được chọn')"
      accept=".m4a, .mp3"
    >
    </app-upload>

    <p class="text-base mt-2 caption">
      <span class="text-gray font-weight-bold">Lưu ý:</span> Upload bài học đúng định dạng audio, dung lượng tối đa 100MB cho 1 file.
    </p>
  </div>
</template>

<script>
import { get } from "lodash";

export default {
  props: {
    lesson: {}
  },

  methods: {
    handleSelectFile(files) {
      const data = {
        type: "VIDEO",
        lesson: files[0],
      };
      this.$emit("handleSelectFile", data);
    },
    get,
  },
};
</script>
