<template>
  <div>
    <div class="cc-panel bg-white">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">
          Thông tin chung
        </h1>
      </div>

      <div class="cc-panel__body">
        <div class="cgi-form-group mb-4">
          <h2 class="cgi-form-title heading-6 mb-3">Loại hình học tập</h2>
          <app-radio
            name="type"
            value="LECTURE"
            @click="handleSelectType"
            :checked="payload.type === 'LECTURE'"
            :class="{ 'mr-6': true, 'disabled-input': disable_type }"
            :disabled="disable_type"
            >Bài giảng</app-radio
          >
          <app-radio
            name="type"
            @click="handleSelectType"
            value="COURSE"
            :class="{ 'disabled-input': disable_type }"
            :disabled="disable_type"
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
            Tên {{ name }}
            <span class="caption text-sub">(Tối đa 60 ký tự)</span>
          </h2>
          <app-input :counter="60" v-model="payload.name" />
        </div>

        <CourseBenefit
          :name="name"
          :benefit="payload.benefit"
          @removeBenefit="removeBenefit"
          @addBenefit="addBenefit"
        />

        <div class="cgi-form-group mb-4">
          <h2 class="cgi-form-title heading-6 mb-3">Mô tả tổng quát</h2>
          <app-editor
            class="bg-input-gray mb-3"
            :sticky-offset="`{ top: 70, bottom: 0 }`"
            v-model="payload.description"
          />
          <span class="text-error" v-if="error.description">{{
            error.description
          }}</span>
          <!-- <span class="text-sub caption">Tối thiểu 300 ký tự</span> -->
        </div>

        <CourseSelectAvatar
          :defaultAvatar="get(general, 'avatar.medium', '')"
          @handleSelectAvatar="handleSelectAvatar"
        />

        <create-action
          @handleCLickSave="handleCLickSave"
          :isSubmit="isSubmit"
          @handleDelete="handleReset"
        />
      </div>

      <app-modal-confirm
        v-if="showModalConfirm"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        :title="title"
      />
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import numeral from "numeral";
import { toNumber, get, cloneDeep, trim } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import {
  useEffect,
  getParamQuery,
  redirectWithParams,
  image,
  stripHtml,
} from "~/utils/common";
import { createPayloadAddCourse } from "~/models/course/AddCourse";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
const IconCheckCircle = () =>
  import("~/assets/svg/icons/check-circle.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import CreateAction from "~/components/page/course/create/common/CreateAction";
import CourseSelectLevel from "~/components/page/course/create/info/CourseSelectLevel";
import CourseSelectSubject from "~/components/page/course/create/info/CourseSelectSubject";
import CourseSelectAvatar from "~/components/page/course/create/info/CourseSelectAvatar";
import CourseBenefit from "~/components/page/course/create/info/CourseBenefit";

const schema = yup.object().shape({
  avatar: yup.string().required(),
  benefit: yup.string().required(),
  description: yup
    .string()
    .min(300)
    .max(2000)
    .required(),
  level: yup.string().required(),
  name: yup
    .string()
    .max(60)
    .required(),
  subject: yup.string().required(),
  type: yup.string().required(),
});

const schema_update = yup.object().shape({
  benefit: yup.string().required(),
  description: yup
    .string()
    .min(300)
    .max(2000)
    .required(),
  level: yup.string().required(),
  name: yup
    .string()
    .max(60)
    .required(),
  subject: yup.string().required(),
  type: yup.string().required(),
});

export default {
  components: {
    IconAngleDown,
    CreateAction,
    CourseSelectLevel,
    CourseSelectSubject,
    CourseSelectAvatar,
    IconCheckCircle,
    IconTrashAlt,
    CourseBenefit,
  },

  data() {
    return {
      isSubmit: false,
      disable_type: false,
      error: {
        description: "",
      },
      title:
        "Xác nhận? Bạn sẽ không thể thay đổi loại hình học tập sau khi lưu",
      payload: {
        avatar: "",
        benefit: [],
        description: "",
        level: "",
        name: "",
        subject: "",
        type: "",
      },
      showModalConfirm: false,
      confirmLoading: false,
    };
  },

  created() {
    this.handleFetchElearningGeneral();
  },

  watch: {
    payload: {
      handler: function() {
        let that = this;
        const elearning_id = getParamQuery("elearning_id");
        let payload = cloneDeep(this.payload);
        payload.description = payload.description.replace("<p></p>", "");

        if (
          payload.description.length > 0 &&
          payload.description.length < 300
        ) {
          this.error.description = "Bạn chưa nhập đủ 300 ký tự";
        } else if (payload.description.length > 2000) {
          this.error.description = "Bạn nhập quá số ký tự cho phép";
        } else {
          this.error.description = "";
        }

        if (elearning_id) {
          schema_update.isValid(payload).then(function(valid) {
            that.isSubmit = valid;
          });
          return;
        }

        schema.isValid(payload).then(function(valid) {
          that.isSubmit = valid;
        });
      },
      deep: true,
    },
    general: {
      handler: function() {
        this.payload.benefit = [...get(this, "general.benefit", [])];
        this.payload.description = get(this, "general.description", "");
        this.payload.name = get(this, "general.name", "");
        this.payload.subject = get(this, "general.subject.id", "");
        this.payload.level = get(this, "general.level", "");
        this.payload.type = get(this, "general.type", "");
        if (get(this, "general.id", "")) {
          this.title = "Xác nhận?";
          this.disable_type = true;
          this.payload.elearning_id = get(this, "general.id", "");
        }
      },
      deep: true,
    },
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general",
    }),
    name() {
      return this.payload.type === "COURSE" ? "khoá học" : "bài giảng";
    },
  },

  methods: {
    handleReset() {
      this.payload.benefit = [...get(this, "general.benefit", [])];
      this.payload.description = get(this, "general.description", "");
      this.payload.name = get(this, "general.name", "");
      this.payload.subject = get(this, "general.subject", "");
      this.payload.level = get(this, "general.level", "");
      this.payload.type = get(this, "general.type", "");
      this.error = {};
    },

    removeBenefit(index) {
      this.payload.benefit = this.payload.benefit.filter(
        (item, i) => i !== index
      );
    },

    addBenefit(html) {
      this.payload.benefit.push(html);
    },

    handleFetchElearningGeneral() {
      const elearning_id = getParamQuery("elearning_id");
      if (elearning_id) {
        const options = {
          params: {
            elearning_id,
          },
        };
        this.$store.dispatch(
          `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.LIST}`,
          options
        );
      }
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
      this.payload.subject = get(subject, "id", "");
    },

    handleCLickSave() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;
      this.isSubmit = false;
      let payload = createPayloadAddCourse(this.payload);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.ADD}`,
        payload
      );

      this.isSubmit = true;
      this.confirmLoading = false;
      this.showModalConfirm = false;

      if (get(result, "success", false)) {
        const params = {
          elearning_id: get(result, "data.elearning_id", ""),
        };
        const options = {
          params,
        };
        await this.$store.dispatch(
          `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.LIST}`,
          options
        );
        redirectWithParams(params);
        this.getProgress();
        this.$toasted.success(get(result, "message", ""));
        return;
      }
      this.$toasted.error(get(result, "message", ""));
    },

    getProgress() {
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          elearning_id,
        },
      };
      this.$store.dispatch(
        `elearning/creating/creating-progress/${actionTypes.ELEARNING_CREATING_PROGRESS}`,
        options
      );
    },

    handleCancel() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    numeral,
    get,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-general-information.scss";
</style>
