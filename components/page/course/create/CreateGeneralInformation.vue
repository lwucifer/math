<template>
  <div class="cc-panel bg-white">
    <create-action @handleCLickSave="handleCLickSave" />
    <div class="cc-panel__title">
      <h1 class="cc-panel__heading heading-5 text-primary">Thông tin chung</h1>
    </div>

    <div class="cc-panel__body">
      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">Loại hình học tập</h2>
        <app-radio
          name="type"
          value="LECTURE"
          v-model="payload.type"
          checked
          class="mr-6"
          >Bài giảng</app-radio
        >
        <app-radio name="type" value="COURSE" v-model="payload.type"
          >Khoá học</app-radio
        >
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="cgi-form-group mb-4">
            <h2 class="cgi-form-title heading-6 mb-3">Trình độ</h2>
            <CourseSelectLevel @handleChangeLevel="handleChangeLevel" />
          </div>
        </div>

        <div class="col-md-3">
          <div class="cgi-form-group mb-4">
            <h2 class="cgi-form-title heading-6 mb-3">Môn học</h2>
            <CourseSelectSubject @handleChangeSubject="handleChangeSubject" />
          </div>
        </div>
      </div>

      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">
          Tên khoá học
          <span class="caption text-sub">(Tối đa 60 ký tự)</span>
        </h2>
        <app-input :counter="60" v-model="payload.name" />
      </div>

      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">Lợi ích từ khoá học</h2>
        <app-editor v-model="payload.benefit" class="bg-input-gray mb-3" />
        <span class="text-sub caption">Tối thiểu 300 ký tự</span>
      </div>

      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">Mô tả tổng quát</h2>
        <app-editor class="bg-input-gray mb-3" v-model="payload.description" />
        <span class="text-sub caption">Tối thiểu 300 ký tự</span>
      </div>

      <div class="cgi-form-group">
        <h2 class="cgi-form-title heading-6 mb-4">
          Hình đại diện (Kích thước 500x300)
        </h2>
        <app-upload
          :fileList="avatar"
          class="cgi-upload-avt"
          @change="handleUploadChange"
        >
          <template v-if="avatar.length">
            <div class="cgi-upload-avt-preview">
              <img :src="avatarSrc" alt />
              <span
                class="cgi-upload-avt-close-preview"
                @click.stop="removeAvatar"
              >
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
import { getBase64 } from "~/utils/common";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import CreateAction from "~/components/page/course/create/CreateAction";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");
import * as actionTypes from "~/utils/action-types";
import CourseSelectLevel from "~/components/page/course/CourseSelectLevel";
import CourseSelectSubject from "~/components/page/course/CourseSelectSubject";
import { toNumber, get } from "lodash";

export default {
  components: {
    IconCamera,
    IconClose,
    IconAngleDown,
    CreateAction,
    CourseSelectLevel,
    CourseSelectSubject
  },

  data() {
    return {
      avatar: [],
      avatarSrc: null,
      payload: {
        avatar: "",
        benefit: "",
        description: "",
        discount: 0,
        fee: 0,
        level: 0,
        name: "",
        subject: "",
        type: "LECTURE"
      }
    };
  },

  methods: {
    handleUploadChange(fileList, event) {
      this.payload.avatar = fileList[0];
      this.avatar = Array.from(fileList);
      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
    },

    handleChangeLevel(level) {
      this.payload.level = toNumber(get(level, "id", 0));
    },

    handleChangeSubject(subject) {
      this.payload.subject = get(subject, "code", "");
    },

    removeAvatar() {
      this.avatar = [];
      this.payload.avatar = "";
    },

    handleCLickSave() {
      this.$store.dispatch(
        `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.ADD}`,
        this.payload
      );
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-general-information.scss";
</style>
