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
          :checked="payload.type === 'LECTURE'"
          class="mr-6"
          >Bài giảng</app-radio
        >
        <app-radio
          name="type"
          @click="handleSelectType"
          value="COURSE"
          :checked="payload.type === 'COURSE'"
          >Khoá học</app-radio
        >
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="cgi-form-group mb-4">
            <h2 class="cgi-form-title heading-6 mb-3">Trình độ</h2>
            <CourseSelectLevel
              :defaultValue="payload.level"
              @handleChangeLevel="handleChangeLevel"
            />
          </div>
        </div>

        <div class="col-md-3">
          <div class="cgi-form-group mb-4">
            <h2 class="cgi-form-title heading-6 mb-3">Môn học</h2>
            <CourseSelectSubject
              :defaultValue="payload.subject"
              @handleChangeSubject="handleChangeSubject"
            />
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
        <h2 class="cgi-form-title heading-6 mb-3">
          Học phí
        </h2>
        <app-input :value="payload.fee" @input="handleChangeFee" />
      </div>

      <div class="cgi-form-group mb-4">
        <h2 class="cgi-form-title heading-6 mb-3">
          Giảm giá
        </h2>
        <app-input :value="payload.discount" @input="handleChangeDiscount" />
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

      <CourseSelectAvatar
        :defaultAvatar="get(general, 'avatar.medium', '')"
        @handleSelectAvatar="handleSelectAvatar"
      />
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
import numeral from "numeral";
import { createPayloadAddCourse } from "~/models/course/AddCourse";
import { mapState } from "vuex";

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
        discount: "",
        fee: "",
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

    useEffect(this, this.handleChangeElearningId.bind(this), [
      "$route.query.elearning_id"
    ]);

    useEffect(this, this.handleChangeGeneral.bind(this), [
      "general.benefit",
      "general.description",
      "general.discount",
      "general.fee",
      "general.level",
      "general.name",
      "general.subject",
      "general.type"
    ]);
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    })
  },

  methods: {
    handleChangeGeneral() {
      this.payload.benefit = get(this, "general.benefit", "");
      this.payload.description = get(this, "general.description", "");
      this.payload.discount = get(this, "general.discount", "");
      this.payload.fee = get(this, "general.fee", "");
      this.payload.name = get(this, "general.name", "");
      this.payload.subject = get(this, "general.subject", "");
      this.payload.level = get(this, "general.level", "");
      this.payload.type = get(this, "general.type", "LECTURE");
    },

    handleChangeElearningId() {
      const elearning_id = get(this, "$route.query.elearning_id", "");
      if (elearning_id) {
        this.payload.elearning_id = elearning_id;
        const options = {
          params: {
            elearning_id
          }
        };
        this.$store.dispatch(
          `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.LIST}`,
          options
        );
      }
    },

    handleChangeDiscount(discount) {
      this.payload.discount = numeral(discount).format();
    },

    handleChangeFee(fee) {
      this.payload.fee = numeral(fee).format();
    },

    handleChangePayload() {
      let that = this;
      if (this.$route.query.elearning_id) {
        this.isSubmit = true;
        return;
      }
      const payload = createPayloadAddCourse(this.payload);
      schema.isValid(payload).then(function(valid) {
        that.isSubmit = valid;
      });
    },

    handleChangeLevel(level) {
      this.payload.level = get(level, "id", "");
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
      let payload = createPayloadAddCourse(this.payload);
      this.$store.dispatch(
        `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.ADD}`,
        payload
      );
      this.isSubmit = false;
    },

    numeral,
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-general-information.scss";
</style>
