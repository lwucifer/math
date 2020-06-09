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
          <app-error :error="get(error, 'type', '')"></app-error>
        </div>

        <div class="row">
          <div class="col-md-4">
            <CourseSelectLevel
              :defaultValue="payload.level"
              @handleChangeLevel="handleChangeLevel"
            />
            <app-error :error="get(error, 'level', '')"></app-error>
          </div>

          <div class="col-md-5 ml-5">
            <CourseSelectSubject
              :defaultValue="payload.subject"
              @handleChangeSubject="handleChangeSubject"
            />
            <app-error :error="get(error, 'subject', '')"></app-error>
          </div>
        </div>

        <!-- <div class="setup-time mt-4 mb-6">
          <h5 class="mb-4">
            Cài đặt thời gian
            <span class="text-base font-weight-normal">(Không bắt buộc)</span>
          </h5>

          <div class="d-flex align-items-center mb-3">
            <p class="w-120">Thời gian bắt đầu:</p>

            <app-date-picker
              size="sm"
              placeholder="dd/mm/yyyy"
              value-type="DD-MM-YYYY"
              class="mr-3"
            >
              <template v-slot:icon-calendar>
                <IconCalender class="fill-primary" />
              </template>
            </app-date-picker>

            <app-date-picker
              size="sm"
              type="time"
              placeholder="HH:mm"
              value-format="HH:mm"
              class="ml-0 mr-6"
            />

            <app-checkbox><span class="text-base">Áp dụng</span></app-checkbox>
          </div>

          <div class="d-flex align-items-center">
            <p class="w-120">Thời gian kết thúc:</p>

            <app-date-picker
              size="sm"
              placeholder="dd/mm/yyyy"
              value-type="DD-MM-YYYY"
              class="mr-3"
            >
              <template v-slot:icon-calendar>
                <IconCalender class="fill-primary" />
              </template>
            </app-date-picker>

            <app-date-picker
              size="sm"
              type="time"
              placeholder="HH:mm"
              value-format="HH:mm"
              class="ml-0 mr-6"
            />

            <app-checkbox><span class="text-base">Áp dụng</span></app-checkbox>
          </div>
        </div> -->

        <div class="cgi-form-group mb-4">
          <h2 class="cgi-form-title heading-6 mb-3">
            Tiêu đề {{ name }}
            <span class="text-base font-weight-normal">(Tối đa 150 ký tự)</span>
          </h2>
          <app-input
            :placeholder="`Nhập tiêu đề của` + ' ' + name"
            :counter="150"
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
          :title="'Hình đại diện cho ' + name"
          id="avatar"
        />
        <app-error :error="get(error, 'avatar', '')"></app-error>

        <CourseSelectImage
          :isCompel="false"
          :default_image="
            get(general, 'cover_url.medium', '/images/default-course-image.png')
          "
          @onSelectFile="handleSelectCover"
          :minWidth="730"
          :minHeight="410"
          :title="'Hình minh hoạ cho ' + name"
          id="cover"
          :name="name"
        />
      </div>
      <app-modal-confirm
        centered
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
        <app-button @click="handleCLickSave" class="create-action__btn mr-4"
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
import IconCalender from "~/assets/svg/v2-icons/calendar_today_24px.svg?inline";

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
    IconCalender,
  },

  data() {
    return {
      initApp: true,
      error: {
        description: "",
        name: "",
        benefit: "",
        subject: "",
        level: "",
        type: "",
        avatar: "",
      },
      payload: {
        avatar: "",
        benefit: [],
        description: "",
        level: "",
        name: "",
        subject: "",
        cover_image: "",
        type: "",
      },
      showModalConfirm: false,
      confirmLoading: false,
    };
  },

  mounted() {
    useEffect(this, this.handleChangeGeneral.bind(this), ["general"]);
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
    }),
    name() {
      return this.payload.type === "COURSE" ? "khoá học" : "bài giảng";
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
    handleCheckPayload() {
      let check = true;

      if (!get(this, "payload.name", true)) {
        check = false;
        this.error.name = "Bạn cần nhập tên" + " " + this.name;
      } else if (get(this, "payload.name.length", 0) > 150) {
        check = false;
        this.error.name = "Tên " + this.name + " vượt quá số ký tự cho phép";
      } else {
        this.error.name = "";
      }

      if (!get(this, "payload.benefit.length", true)) {
        check = false;
        this.error.benefit = "Bạn cần thêm lợi ích cho" + " " + this.name;
      } else {
        this.error.benefit = "";
      }

      if (!get(this, "payload.description", true)) {
        check = false;
        this.error.description = "Bạn cần nhập mô tả" + " " + this.name;
      } else if (
        get(this, "payload.description.length", 0) > 0 &&
        get(this, "payload.description.length", 0) < 100
      ) {
        check = false;
        this.error.description = "Mô tả tổng quát không được ít hơn 100 ký tự.";
      } else if (get(this, "payload.description.length", 0) > 2000) {
        check = false;
        this.error.description = "Mô tả vượt quá số ký tự cho phép";
      } else {
        this.error.description = "";
      }

      if (!get(this, "payload.subject", true)) {
        check = false;
        this.error.subject = "Bạn cần chọn môn học cho" + " " + this.name;
      } else {
        this.error.subject = "";
      }

      if (!get(this, "payload.level", true)) {
        check = false;
        this.error.level = "Bạn cần chọn trình độ cho" + " " + this.name;
      } else {
        this.error.level = "";
      }

      if (!get(this, "payload.type", true)) {
        check = false;
        this.error.type = "Bạn cần chọn loại hình học tập";
      } else {
        this.error.type = "";
      }

      if (!get(this, "payload.avatar", true) && !this.general) {
        check = false;
        this.error.avatar = "Bạn cần chọn hình đại diện cho " + this.name;
      } else {
        this.error.avatar = "";
      }

      return check;
    },

    handleChangeGeneral() {
      this.payload.benefit = [...get(this, "general.benefit", [])];
      this.payload.description = get(this, "general.description", "");
      this.payload.name = get(this, "general.name", "");
      this.payload.subject = get(this, "general.subject.id", "");
      this.payload.level = get(this, "general.level", "");
      this.payload.type = get(this, "general.type", "");
      this.payload.elearning_id = get(this, "general.id", "");
    },

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
      if (value.length < 100) {
        this.error.description = "Mô tả tổng quát không được ít hơn 100 ký tự.";
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
      if (value.length > 150) {
        this.error.name = "Tên " + this.name + " vượt quá số ký tự cho phép";
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
      this.payload.level = level;
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
      this.payload.subject = subject;
    },

    handleCLickSave() {
      this.handleCheckPayload();
      this.showModalConfirm = true;
    },

    async handleOk() {
      try {
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
          const options = {
            params: {
              elearning_id,
            },
          };
          await this.$store.dispatch(`elearning/create/getGeneral`, options);
          // await this.$store.dispatch(`elearning/create/getProgress`);
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
      } catch (error) {
        this.$toasted.error("Có lỗi xảy ra");
        return;
      }
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
