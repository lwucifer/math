<template>
  <div class="cgi-form-group">
    <h2 class="cgi-form-title heading-6 mb-4">Hình đại diện</h2>

    <div class="row csa-row">
      <div class="col csa-col csa-col--left mb-4">
        <div v-if="cropping" class="csa-cropper-wrapper">
          <client-only>
            <vueCropper
              ref="cropper"
              :img="avatarChoosen"
              :fixedNumber="[750, 422]"
              fixed
              autoCrop
              full
              infoTrue
            ></vueCropper>
          </client-only>
        </div>

        <div v-else class="cgi-upload-avt-preview">
          <img
            :src="avatarSrc || require('~/assets/images/create-course/default-course-image.png')"
            alt
            class="d-block w-100"
          />
          <span v-if="avatarSrc" class="cgi-upload-avt-close-preview" @click.stop="removeAvatar">
            <IconClose />
          </span>
        </div>
      </div>

      <div class="col csa-col csa-col--right mb-4">
        <p
          class="csa-desc caption text-gray"
        >- Để được chấp nhận, hình đại diện phải có kích thước nhỏ nhất là 750x422 pixels. Định dạng cho phép là .jpg, .jpeg, .jpg, .bmp, hoặc .png</p>
        <p
          class="csa-desc caption text-gray"
        >- Chúng tôi khuyến cáo không nên chèn chữ lên hình ảnh đại diện</p>

        <div class="mt-4">
          <app-button
            v-if="cropping"
            outline
            square
            size="sm"
            :loading="savingCrop"
            @click="saveCrop"
          >Crop Ảnh</app-button>

          <template v-else>
            <app-upload
              accept=".jpg, .jpeg, .jpg, .bmp, .png"
              :outputType="cropperOutputType"
              :fileList="avatar"
              class="cgi-upload-avt mb-3"
              @change="handleUploadChange"
            ></app-upload>
            <div v-show="false" class="text-error caption">
              <IconExclamationTriangle class="icon mr-1" />Ảnh bản vừa tải lên có thích thước quá nhỏ. Kích thước ảnh nhỏ nhất được chấp nhận là 750x422 px. Hãy tải ảnh khác có kích thước lớn hơn.
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
    IconExclamationTriangle
  },

  props: {
    defaultAvatar: {}
  },

  data() {
    return {
      avatar: [],
      avatarSrc: null,
      avatarChoosen: null,
      cropping: false,
      savingCrop: false,
      cropperOutputType: null
    };
  },

  mounted() {
    console.log(this);
  },

  watch: {
    defaultAvatar: function() {
      this.avatarSrc = this.defaultAvatar;
    }
  },

  methods: {
    removeAvatar() {
      this.avatar = [];
      this.avatarSrc = null;
      this.$emit("handleSelectAvatar", "");
    },

    handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);
      this.cropperOutputType = fileList[0].name.split(".").slice(-1)[0];

      getBase64(this.avatar[0], src => {
        this.avatarChoosen = src;
        this.cropping = true;
        setTimeout(() => {
          this.$refs.cropper.startCrop();
        });
      });
    },

    saveCrop() {
      this.savingCrop = true;
      this.$refs.cropper.getCropData(data => {
        this.avatarSrc = data;
        this.savingCrop = false;
        this.cropping = false;
      });

      this.$refs.cropper.getCropBlob(data => {
        this.$emit("handleSelectAvatar", data);
      });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_couse-select-avatar.scss";
</style>