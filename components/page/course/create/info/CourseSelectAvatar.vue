<template>
  <div class="cgi-form-group">
    <h2 class="cgi-form-title heading-6 mb-4">Hình đại diện cho bài giảng</h2>

    <div class="row csa-row">
      <div class="col csa-col csa-col--left mb-4">
        <div v-if="cropping" class="csa-cropper-wrapper">
          <client-only>
            <vueCropper
              ref="cropper"
              mode="100% auto"
              :img="avatarChoosen"
              :outputType="cropperOutputType"
              :fixedNumber="[340, 204]"
              fixed
              autoCrop
              full
              :canScale="false"
              :fixedBox="true"
              :canMoveBox="true"
              infoTrue
              :autoCropWidth="340"
              :autoCropHeight="204"
            ></vueCropper>
          </client-only>
        </div>

        <div v-else class="cgi-upload-avt-preview">
          <img
            :src="avatarSrc || '/images/default-course-image.png'"
            alt
            class="d-block w-100"
            @error="handleError"
          />
          <span
            v-if="avatarSrc"
            class="cgi-upload-avt-close-preview"
            @click.stop="removeAvatar"
          >
            <IconClose />
          </span>
        </div>
      </div>

      <div class="col csa-col csa-col--right mb-4">
        <p class="csa-desc caption text-gray">
          Để được chấp nhận, hình đại diện phải có kích thước nhỏ nhất là
          <strong>340x204</strong> pixels. Định dạng cho phép là .jpg, .jpeg,
          .jpg, .bmp, hoặc .png. Chúng tôi khuyến cáo không nên chèn chữ lên
          hình ảnh đại diện
        </p>

        <div class="mt-4">
          <app-button
            v-if="cropping"
            outline
            square
            size="sm"
            :loading="savingCrop"
            @click="saveCrop"
            >Crop Ảnh</app-button
          >

          <template v-else>
            <app-upload
              accept=".jpg, .jpeg, .jpg, .bmp, .png"
              :fileList="avatar"
              class="cgi-upload-avt mb-3"
              @change="handleUploadChange"
              placeholder="Chưa có ảnh nào được chọn"
            ></app-upload>

            <div v-show="false" class="text-error caption">
              <IconExclamationTriangle class="icon mr-1" />Ảnh bản vừa tải lên
              có thích thước quá nhỏ. Kích thước ảnh nhỏ nhất được chấp nhận là
              750x422 px. Hãy tải ảnh khác có kích thước lớn hơn.
            </div>
          </template>
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

export default {
  components: {
    IconClose,
    IconExclamationTriangle,
  },

  props: {
    defaultAvatar: {},
  },

  data() {
    return {
      avatar: [],
      avatarSrc: null,
      avatarChoosen: null,
      cropping: false,
      savingCrop: false,
      cropperOutputType: null,
      file: "",
      _avatarSrc: null,
    };
  },

  watch: {
    defaultAvatar: function() {
      this.avatarSrc = this.defaultAvatar;
    },
  },

  methods: {
    handleError() {
      this.avatarSrc = this._avatarSrc;
    },

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    removeAvatar() {
      this.avatar = [];
      this.avatarSrc = null;
      this.$emit("handleSelectAvatar", "");
      this.file = "";
    },

    handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);
      this.cropperOutputType = fileList[0].name.split(".").slice(-1)[0];
      this.file = fileList[0];

      getBase64(this.avatar[0], (src) => {
        this.avatarChoosen = src;
        this.cropping = true;
        const timeout = setTimeout(() => {
          this.$refs.cropper.startCrop();
          clearTimeout(timeout);
        });
      });
    },

    saveCrop() {
      this.savingCrop = true;
      // console.log(this.$refs.cropper.cropW, this.$refs.cropper.cropH);
      this.$refs.cropper.getCropData((data) => {
        const file = this.dataURLtoFile(data, this.file.name);
        this._avatarSrc = data;
        this.avatarSrc = data;
        this.savingCrop = false;
        this.cropping = false;
        this.$emit("handleSelectAvatar", file);
      });
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_couse-select-avatar.scss";
</style>
