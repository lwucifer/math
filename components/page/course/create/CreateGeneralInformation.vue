<template>
  <div class="cc-panel bg-white">
    <div class="cc-panel__title">
      <h1 class="cc-panel__heading heading-5 text-primary">Thông tin chung</h1>
    </div>

    <div class="cc-panel__body">
      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">Loại hình học tập</h2>
        <app-radio name="type" value="0" class="mr-6">Bài giảng</app-radio>
        <app-radio name="type" value="1" checked>Khoá học</app-radio>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="cgi-form-group mb-4">
            <h2 class="cgi-form-title heading-6 mb-3">Trình độ</h2>
            <app-select
              class="cc-select"
              :options="[{ value: 0, text: 'Lớp A'}, { value: 1, text: 'Lớp B'}]"
              placeholder="Chọn lớp"
            >
              <template slot="placeholder-icon">
                <IconAngleDown class="icon" />
              </template>
            </app-select>
          </div>
        </div>

        <div class="col-md-3">
          <div class="cgi-form-group mb-4">
            <h2 class="cgi-form-title heading-6 mb-3">Môn học</h2>
            <app-select
              class="cc-select"
              :options="[{ value: 0, text: 'Môn học 1'}, { value: 1, text: 'Môn học 2'}]"
              placeholder="Chọn môn học"
            >
              <template slot="placeholder-icon">
                <IconAngleDown class="icon" />
              </template>
            </app-select>
          </div>
        </div>
      </div>

      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">
          Tên khoá học
          <span class="caption text-sub">(Tối đa 60 ký tự)</span>
        </h2>
        <app-input :counter="60" />
      </div>

      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">Lợi ích từ khoá học</h2>
        <app-editor />
        <span class="text-sub caption">Tối thiểu 300 ký tự</span>
      </div>

      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">Mô tả tổng quát</h2>
        <app-input textarea class="mb-2" />
        <span class="text-sub caption">Tối thiểu 300 ký tự</span>
      </div>

      <div class="cgi-form-group">
        <h2 class="cgi-form-title heading-6 mb-4">Hình đại diện (Kích thước 500x300)</h2>
        <app-upload :fileList="avatar" class="cgi-upload-avt" @change="handleUploadChange">
          <template v-if="avatar.length">
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
    </div>
  </div>
</template>

<script>
import { getBase64 } from "~/utils/file";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");

export default {
  components: {
    IconCamera,
    IconClose,
    IconAngleDown
  },

  data() {
    return {
      avatar: [],
      avatarSrc: null
    };
  },

  methods: {
    handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
    },

    removeAvatar() {
      this.avatar = [];
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-general-information.scss";
</style>