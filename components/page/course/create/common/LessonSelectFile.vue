<template>
  <div class="cc-tab-panel">
    <app-upload
      @change="handleSelectFile"
      class="clc-upload-video"
      placeholder="Chưa có video nào được chọn"
      accept=".mp4, .f4v, .mov, .m4a, .m4v, .mp4a, .mp4v, .3gp, .3g2, .flv, .smil"
    >
    </app-upload>

    <p class="text-base mt-2 caption">
      <span class="text-gray font-weight-normal">Lưu ý:</span> Video phải có độ
      phân giải tối thiểu là 480p, dung lượng tối đa là 3GB.
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelectFile(files) {
      const data = {
        type: "VIDEO",
        lesson: files[0],
      };
      this.$emit("handleSelectFile", data);
    },
  },
};
</script>
