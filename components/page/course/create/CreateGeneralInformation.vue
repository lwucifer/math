<template>
  <div v-if="initApp">
    <div class="cc-panel bg-white">
      <div class="cc-panel__title">
        <h4 class="cc-panel__heading">
          Thông tin chung
        </h4>
      </div>

      <div class="cc-panel__body">
        <div class="cgi-form-group mb-4">
          <h2 class="cgi-form-title heading-6 mb-3">Loại hình học tập</h2>
          <app-radio
            name="type"
            value="LECTURE"
            @click="handleSelectType"
            :checked="payload.type === 'LECTURE'"
            :class="{ 'mr-6': true, 'disabled-input': general }"
            :disabled="general"
            >Bài giảng</app-radio
          >
          <app-radio
            name="type"
            @click="handleSelectType"
            value="COURSE"
            :class="{ 'disabled-input': general }"
            :disabled="general"
            :checked="payload.type === 'COURSE'"
            >Khoá học</app-radio
          >
        </div>

        <div class="row">
          <CourseSelectLevel
            :defaultValue="payload.level"
            @handleChangeLevel="handleChangeLevel"
          />

          <CourseSelectSubject
            :defaultValue="payload.subject"
            @handleChangeSubject="handleChangeSubject"
          />
        </div>

        <div class="cgi-form-group mb-4">
          <h2 class="cgi-form-title heading-5 mb-3">
            Tên {{ name }}
            <span class="text-base font-weight-normal">(Tối đa 60 ký tự)</span>
          </h2>
          <app-input
            :placeholder="`Nhập tiêu đề của` + ' ' + name"
            :counter="60"
            v-model="payload.name"
            @input="handleChangeName($event)"
            @handleBlur="handleBlurName($event)"
          />
          <app-error :error="get(error, 'name', '')"></app-error>
        </div>

        <CourseBenefit
          :name="name"
          :benefit="payload.benefit"
          @removeBenefit="removeBenefit"
          @addBenefit="addBenefit"
          @cancelInputBenefit="cancelInputBenefit"
        />
        <app-error class="mb-4" :error="get(error, 'benefit', '')"></app-error>

        <div class="cgi-form-group mb-4">
          <h2 class="cgi-form-title heading-6 mb-3">
            Mô tả tổng quát
            <span class="text-base font-weight-normal"
              >(Tối thiểu 100 ký tự)</span
            >
          </h2>
          <app-editor
            class="bg-input-gray mb-3"
            :sticky-offset="`{ top: 70, bottom: 0 }`"
            v-model="payload.description"
            @input="handleChangeDescription($event)"
            @onBlur="handleBlurDescription"
          />
          <app-error :error="get(error, 'description', '')"></app-error>
        </div>

        <CourseSelectImage
          :default_image="
            get(general, 'avatar.medium', '/images/default-course-image.png')
          "
          @onSelectFile="handleSelectAvatar"
          :minWidth="340"
          :minHeight="204"
          title="Hình đại diện cho bài giảng"
          id="avatar"
        />

        <CourseSelectImage
          :isCompel="false"
          :default_image="
            get(general, 'cover_url.medium', '/images/default-course-image.png')
          "
          @onSelectFile="handleSelectCover"
          :minWidth="730"
          :minHeight="410"
          title="Hình minh hoạ cho bài giảng"
          id="cover"
        />
      </div>
      <app-modal-confirm
        v-if="showModalConfirm"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        :title="title_confirm"
        description="Bạn sẽ không thể thay đổi loại hình học tập sau khi lưu"
      />
    </div>

    <div class="create-action mt-5">
      <div class="create-action__right d-flex align-items-center">
        <!-- <app-button
          outline
          class="mr-4"
          @click="handleReset"
          color="error"
          ><IconDelete class="mr-2" /> Thiết lập lại</app-button
        >
        <app-button
          class="mr-4"
          color="primary"
          outline
          @click="handleCLickSave('draft')"
          :disabled="!submit"
          ><IconSave class="mr-2" /> Lưu nháp</app-button
        > -->
        <app-button
          @click="handleCLickSave"
          class="create-action__btn mr-4"
          :disabled="!submit"
          ><Forward class="mr-2" /> Lưu & Tiếp tục</app-button
        >
      </div>
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
import CourseSelectImage from "~/components/page/course/create/info/CourseSelectImage";
import CourseBenefit from "~/components/page/course/create/info/CourseBenefit";
import IconArrowLeft from "~/assets/svg/design-icons/arrow-left.svg?inline";
import IconDelete from "~/assets/svg/v2-icons/delete_sweep_2.svg?inline";
import IconSave from "~/assets/svg/v2-icons/save_24px.svg?inline";
import Forward from "~/assets/svg/v2-icons/forward_2.svg?inline";

export default {
  components: {
    IconAngleDown,
    CreateAction,
    CourseSelectLevel,
    CourseSelectSubject,
    CourseSelectImage,
    IconCheckCircle,
    IconTrashAlt,
    CourseBenefit,
    IconArrowLeft,
    IconDelete,
    IconSave,
    Forward,
  },

  data() {
    return {
      initApp: true,
      error: {
        description: "",
        name: "",
        benefit: "",
      },
      payload: {
        avatar: "",
        benefit: [...get(this, "general.benefit", [])],
        description: get(this, "general.description", ""),
        level: get(this, "general.level", ""),
        name: get(this, "general.name", ""),
        subject: get(this, "general.subject.id", ""),
        cover_image: "",
        type: get(this, "general.type", ""),
      },
      showModalConfirm: false,
      confirmLoading: false,
    };
  },

  mounted() {
    const elearning_id = getParamQuery("elearning_id");
    this.handleFetchElearningGeneral(elearning_id);
  },

  watch: {
    general: {
      handler: function() {
        this.payload.benefit = [...get(this, "general.benefit", [])];
        this.payload.description = get(this, "general.description", "");
        this.payload.name = get(this, "general.name", "");
        this.payload.subject = get(this, "general.subject.id", "");
        this.payload.level = get(this, "general.level", "");
        this.payload.type = get(this, "general.type", "");
        this.payload.elearning_id = get(this, "general.id", "");
      },
      deep: true,
    },
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
    }),
    name() {
      return this.payload.type === "COURSE" ? "khoá học" : "bài giảng";
    },
    submit() {
      if (!get(this, "payload.name", "")) return false;
      if (!get(this, "payload.benefit.length", 0)) return false;
      if (!get(this, "payload.description", "")) return false;
      if (!get(this, "payload.subject", "")) return false;
      if (!get(this, "payload.level", "")) return false;
      if (!get(this, "payload.type", "")) return false;
      if (!get(this, "payload.avatar", "") && !this.general) return false;
      // if (!get(this, "payload.cover_image", "") && !this.general) return false;

      const length_name = get(this, "payload.name", 0);
      if (length_name > 60) {
        return false;
      }

      const lengh_description = get(this, "payload.description.length", 0);
      if (lengh_description > 0 && lengh_description < 300) {
        return false;
      }
      if (lengh_description > 2000) {
        return false;
      }

      return true;
    },
    title_confirm() {
      let title = "Xác nhận?";
      if (get(this, "general.id", "")) {
        title = "Xác nhận?";
      }
      return title;
    },
  },

  methods: {
    handleBlurName(e) {
      this.handleChangeName(e.target.value);
    },
    handleBlurDescription() {
      this.handleChangeDescription(this.payload.description);
    },
    handleChangeDescription(value) {
      value = value.replace("<p></p>", "");
      if (!value) {
        this.error.description = "Bạn cần nhập mô tả" + " " + this.name;
        return;
      }
      if (value.length < 300) {
        this.error.description = "Mô tả không được ít hơn 300 ký tự";
        return;
      }
      if (value.length > 2000) {
        this.error.description = "Mô tả vượt quá số ký tự cho phép";
        return;
      }
      this.error.description = "";
    },

    handleChangeName(value) {
      if (!value) {
        this.error.name = "Bạn cần nhập tên" + " " + this.name;
        return;
      }
      if (value.length > 60) {
        this.error.name = "Tên khoá học vượt quá số ký tự cho phép";
        return;
      }
      this.error.name = "";
    },

    checkShowErrorBenefit() {
      if (!this.payload.benefit.length) {
        this.error.benefit = "Bạn cần thêm lợi ích cho" + " " + this.name;
        return;
      }
      this.error.benefit = "";
    },

    removeBenefit(index) {
      this.payload.benefit = this.payload.benefit.filter(
        (item, i) => i !== index
      );
      this.checkShowErrorBenefit();
    },

    cancelInputBenefit() {
      this.checkShowErrorBenefit();
    },

    addBenefit(html) {
      this.payload.benefit.push(html);
      this.checkShowErrorBenefit();
    },

    handleFetchElearningGeneral(elearning_id) {
      const options = {
        params: {
          elearning_id,
        },
      };
      this.$store.dispatch(`elearning/create/getGeneral`, options);
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

    handleSelectCover(cover) {
      this.payload.cover_image = cover;
    },

    handleChangeSubject(subject) {
      this.payload.subject = get(subject, "id", "");
    },

    handleCLickSave() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;
      let payload = createPayloadAddCourse(this.payload);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.ADD}`,
        payload
      );

      this.confirmLoading = false;
      this.showModalConfirm = false;

      if (get(result, "success", false)) {
        const elearning_id = get(result, "data.elearning_id", "");
        this.handleFetchElearningGeneral(elearning_id);
        redirectWithParams({ elearning_id });
        this.$toasted.success(get(result, "message", ""));
        if (this.payload.type === "LECTURE") {
          this.$emit("nextStep", "content-lecture");
        }
        if (this.payload.type === "COURSE") {
          this.$emit("nextStep", "content-course");
        }

        return;
      }
      this.$toasted.error(get(result, "message", ""));
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
