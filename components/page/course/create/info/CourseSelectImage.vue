<template>
  <div class="cgi-form-group">
    <h2 class="cgi-form-title heading-6 mb-4">{{ title }}</h2>

    <div class="row csa-row">
      <div class="col csa-col csa-col--left mb-4">
        <div class="cgi-upload-avt-preview">
          <img
            :src="default_image"
            alt
            class="d-block w-100"
            @error="handleError"
            :id="id"
          />
          <span class="cgi-upload-avt-close-preview" @click.stop="removeImage">
            <IconClose />
          </span>
        </div>
      </div>

      <div class="col csa-col csa-col--right mb-4">
        <p class="csa-desc caption text-gray">
          Để được chấp nhận, ảnh phải có kích thước nhỏ nhất là
          <strong>{{ minWidth }}x{{ minHeight }} </strong> pixels. Định dạng cho
          phép là .jpg, .jpeg, .jpg, .bmp, hoặc .png. Chúng tôi khuyến cáo không
          nên chèn chữ lên hình ảnh đại diện
        </p>

        <div class="mt-4">
          <app-button
            v-if="cropper"
            outline
            square
            size="sm"
            :loading="savingCrop"
            :disabled="error"
            @click="saveCrop"
            >Crop Ảnh</app-button
          >

          <template v-else>
            <app-upload
              accept=".jpg, .jpeg, .jpg, .bmp, .png"
              :fileList="[]"
              class="cgi-upload-avt mb-3"
              @change="handleUploadChange"
              placeholder="Chưa có ảnh nào được chọn"
            ></app-upload>
          </template>

          <div v-show="error" class="text-error caption">
            <IconExclamationTriangle class="icon mr-1" />Ảnh có thích thước quá
            nhỏ. Kích thước ảnh nhỏ nhất được chấp nhận là {{ minWidth }}x{{
              minHeight
            }}
            px. Hãy tải ảnh khác có kích thước lớn hơn.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBase64 } from "~/utils/common";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
const IconExclamationTriangle = () =>
  import("~/assets/svg/design-icons/exclamation-triangle.svg?inline");
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  components: {
    IconClose,
    IconExclamationTriangle,
  },

  props: {
    default_image: "",
    minWidth: 0,
    minHeight: 0,
    title: "",
    id: "",
  },

  data() {
    return {
      savingCrop: false,
      file: "",
      cropper: null,
      error: false,
    };
  },

  watch: {
    default: function() {
      if (this.default_image) {
        let image = document.getElementById(this.id);
        image.src = this.default_image;
      }
    },
  },

  methods: {
    blobToFile(theBlob, fileName) {
      var file = new File([theBlob], fileName);
      return file;
    },

    handleError() {
      this.pushFileToImage(this.file);
    },

    removeImage() {
      let image = document.getElementById(this.id);
      image.src = this.default_image;
      if (this.cropper) {
        this.cropper.destroy();
      }
      this.error = false;
      this.cropper = null;
      this.$emit("onSelectFile", "");
    },

    pushFileToImage(file) {
      if (file) {
        let image = document.getElementById(this.id);
        image.src = URL.createObjectURL(file);
        return image;
      }
      return "";
    },

    handleUploadChange(fileList, event) {
      const that = this;
      that.file = fileList[0];
      let image = this.pushFileToImage(that.file);
      if (!image) return;

      this.cropper = new Cropper(image, {
        aspectRatio: that.minWidth / that.minHeight,
        zoomable: false,
        autoCropArea: 1,
        crop(event) {
          that.error = false;
          if (event.detail.width < that.minWidth) that.error = true;
          if (event.detail.height < that.minHeight) that.error = true;
        },
      });
    },

    saveCrop() {
      if (this.error) return;
      this.savingCrop = true;
      const that = this;
      this.cropper.getCroppedCanvas().toBlob(function(blob) {
        const file = that.blobToFile(blob, that.file.name);
        let image = document.getElementById(that.id);
        image.src = URL.createObjectURL(file);
        that.$emit("onSelectFile", file);
        that.cropper.destroy();
        that.cropper = null;
        that.savingCrop = false;
      });
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_couse-select-avatar.scss";
</style>
