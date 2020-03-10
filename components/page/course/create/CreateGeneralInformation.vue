<template>
  <div class="cc-panel bg-white">
    <create-action @handleCLickSave="handleCLickSave" :isSubmit="isSubmit" />
    <div class="cc-panel__title">
      <h1 class="cc-panel__heading heading-5 text-primary">Thông tin chung</h1>
    </div>

    <div class="cc-panel__body">
      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">Loại hình học tập</h2>
        <app-radio
          name="type"
          value="LECTURE"
          @click="handleSelectType"
          :checked="true"
          class="mr-6"
          >Bài giảng</app-radio
        >
        <app-radio name="type" @click="handleSelectType" value="COURSE"
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

      <CourseSelectAvatar @handleSelectAvatar="handleSelectAvatar" />
    </div>
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import CreateAction from "~/components/page/course/create/CreateAction";
import * as actionTypes from "~/utils/action-types";
import CourseSelectLevel from "~/components/page/course/CourseSelectLevel";
import CourseSelectSubject from "~/components/page/course/CourseSelectSubject";
import CourseSelectAvatar from "~/components/page/course/CourseSelectAvatar";
import { toNumber, get } from "lodash";
import { useEffect } from "~/utils/common";
import * as yup from "yup";

let schema = yup.object().shape({
  avatar: yup.string().required(),
  benefit: yup.string().required(),
  description: yup.string().required(),
  level: yup.string().required(),
  name: yup.string().required(),
  subject: yup.string().required(),
  type: yup.string().required()
});

export default {
  components: {
    IconAngleDown,
    CreateAction,
    CourseSelectLevel,
    CourseSelectSubject,
    CourseSelectAvatar
  },

  data() {
    return {
      isSubmit: false,
      payload: {
        avatar: "",
        benefit: "",
        description: "",
        discount: 0,
        fee: 0,
        level: "",
        name: "",
        subject: "",
        type: "LECTURE"
      }
    };
  },

  created() {
    useEffect(this, this.handleChangePayload.bind(this), [
      "payload.avatar",
      "payload.benefit",
      "payload.description",
      "payload.discount",
      "payload.fee",
      "payload.level",
      "payload.name",
      "payload.subject",
      "payload.type"
    ]);
  },

  methods: {
    handleChangePayload() {
      let that = this;
      schema.isValid(this.payload).then(function(valid) {
        that.isSubmit = valid;
      });
    },

    handleChangeLevel(level) {
      this.payload.level = get(level, "id", "")
        ? toNumber(get(level, "id", ""))
        : "";
    },

    handleSelectType(e) {
      this.payload.type = e.target.value;
    },

    handleSelectAvatar(avatar) {
      this.payload.avatar = avatar;
    },

    handleChangeSubject(subject) {
      this.payload.subject = get(subject, "code", "");
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
