<template>
  <div class="cc-tab-panel">
    <app-upload @change="handleSelectFile" class="clc-upload-video">
      <div slot="hint" class="mt-2 caption">
        <b class="text-gray">Lưu ý:</b>
        <span class="text-sub"
          >Chỉ upload file nhỏ hơn 3GB, định dạng .mp4</span
        >
      </div>
    </app-upload>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelectFile(files) {
      const data = {
        type: "VIDEO",
        lesson: files[0]
      };
      this.$emit("handleSelectFile", data);
    }
  }
};
</script>
