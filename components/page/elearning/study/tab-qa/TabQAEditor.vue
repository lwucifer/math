<template>
  <div class="e-study-tab-qa-editor d-flex">
    <app-avatar :size="40" class="mr-4" />

    <div class="flex-grow e-study-tab-qa-editor__right">
      <template v-if="type === 'review'">
        <h6 class="font-weight-medium mb-3">Mức độ hài lòng</h6>
        <app-select-stars class="mb-4" />
      </template>

      <app-input class="mb-3" textarea rows="4" placeholder="Đặt câu hỏi" />

      <!-- Preview Upload Image -->
      <div v-if="uploadImgSrc" class="e-study-tab-qa-editor__preview">
        <img :src="uploadImgSrc" alt />
        <span class="e-study-tab-qa-editor__close-preview" @click.stop="removeImgUpload">
          <IconClose class="icon" />
        </span>
      </div>
      <!-- End Preview Upload Image -->

      <div class="d-flex justify-content-between mt-4">
        <app-upload
          v-if="type === 'comment'"
          :fileList="uploadFileList"
          accept="image/*, image/heic, image/heif"
          class="tab-qa-comment-editor__upload d-inline-block"
          @change="handleUploadChange"
        >
          <app-button size="sm" color="default">
            <IconCameraAlt class="icon body-1 mr-2" />Chọn ảnh
          </app-button>
        </app-upload>

        <app-button class="ml-auto" size="sm">Gửi câu hỏi</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getBase64 } from "~/utils/common";

import IconCameraAlt from "~/assets/svg/v2-icons/camera_alt_24px.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");

export default {
  components: {
    IconCameraAlt,
    IconClose
  },

  props: {
    type: {
      type: String,
      default: "comment",
      validator: value => ["comment", "review"].includes(value)
    }
  },

  data() {
    return {
      uploadFileList: [],
      uploadImgSrc: null
    };
  },

  methods: {
    handleUploadChange(fileList, event) {
      this.uploadFileList = Array.from(fileList);
      getBase64(this.uploadFileList[0], src => {
        this.uploadImgSrc = src;
      });
    },

    removeImgUpload() {
      this.uploadFileList = [];
      this.uploadImgSrc = null;

      if (this.mode === "edit") {
        this.isDeleteOldImg = true;
      }
    },

    submit() {}
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_tab-qa-editor.scss";
</style>