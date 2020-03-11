<template>
  <div class="cgi-form-group">
    <h2 class="cgi-form-title heading-6 mb-4">
      Hình đại diện (Kích thước 500x300)
    </h2>
    <app-upload
      :fileList="avatar"
      class="cgi-upload-avt"
      @change="handleUploadChange"
    >
      <template v-if="avatarSrc">
        <div class="cgi-upload-avt-preview">
          <img :src="avatarSrc" alt />
          <span class="cgi-upload-avt-close-preview" @click.stop="removeAvatar">
            <IconClose />
          </span>
        </div>
      </template>

      <template v-else>
        <div class="cgi-upload-avt-icon-wrapper">
          <IconCamera class="icon" />
        </div>
      </template>
    </app-upload>
  </div>
</template>

<script>
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import { getBase64 } from "~/utils/common";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");

export default {
  components: {
    IconCamera,
    IconClose
  },

  data() {
    return {
      avatar: [],
      avatarSrc: null
    };
  },

  props: {
    defaultAvatar: ""
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
      this.$emit("handleSelectAvatar", fileList[0]);
      this.avatar = Array.from(fileList);
      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
    }
  }
};
</script>
