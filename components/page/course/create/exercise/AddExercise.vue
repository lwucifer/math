<template>
  <div class="cc-panel__body">
    <div class="mb-4">
      <h5 for="title" class="mb-3 d-inline-block">
        Tiêu đề bài tập
        <span class="caption text-base font-weight-normal"
          >(Tối đa 60 ký tự)</span
        >
      </h5>
      <app-input
        @change="checkTitle()"
        id="title"
        :counter="60"
        v-model="payload.title"
      />
      <app-error :error="get(error, 'title', '')" />
    </div>

    <div class="mb-4" v-show="category === 'EXERCISE'">
      <h5 for="require" class="mb-3">Bài tập bắt buộc?</h5>

      <app-radio-group>
        <app-radio
          name="group1"
          @change="checkRequired()"
          value="1"
          class="mr-4"
          :checked="payload.required === 1"
          @click="payload.required = 1"
          >Có</app-radio
        >
        <app-radio
          name="group1"
          value="0"
          @change="checkRequired()"
          :checked="payload.required === 0"
          @click="payload.required = 0"
          >Không</app-radio
        >
      </app-radio-group>
      <app-error :error="get(error, 'required', '')" />
    </div>

    <div class="mb-4">
      <h5 for="require" class="mb-3">Loại bài tập</h5>

      <app-radio-group>
        <app-radio
          name="group2"
          value="CHOICE"
          @change="checkType()"
          class="mr-4"
          :checked="payload.type === 'CHOICE'"
          @click="payload.type = 'CHOICE'"
          >Trắc nghiệm</app-radio
        >
        <app-radio
          name="group2"
          @change="checkType()"
          value="ESSAY"
          :checked="payload.type === 'ESSAY'"
          @click="payload.type = 'ESSAY'"
          >Tự luận</app-radio
        >
      </app-radio-group>
      <app-error :error="get(error, 'type', '')" />
    </div>

    <div class="row align-items-center mb-4" v-show="payload.required">
      <div class="col-12 col-md-4">
        <label for="time" class="heading-5 font-weight-bold"
          >Thời gian làm bài</label
        >

        <app-input
          type="text"
          @onFocus="(event) => event.target.select()"
          class="mb-0 ce-input-with-unit mt-3"
          id="time"
          size="sm"
          style="width: 112px"
          v-model="payload.duration"
          @change="checkDuration()"
        >
          <div slot="unit">Phút</div>
        </app-input>
        <app-error :error="get(error, 'duration', '')" />
      </div>

      <div class="col-12 col-md-4">
        <label for="point" class="heading-5 font-weight-bold">Điểm đạt</label>

        <app-input
          type="text"
          @onFocus="(event) => event.target.select()"
          min="0"
          @change="checkPassScore()"
          max="10"
          class="mb-0 ce-input-with-unit mt-3"
          id="point"
          size="sm"
          style="width: 102px"
          v-model="payload.pass_score"
        >
          <div slot="unit">/10</div>
        </app-input>
        <app-error :error="get(error, 'pass_score', '')" />
      </div>

      <div class="col-12 col-md-4">
        <label for="count" class="heading-5 font-weight-bold"
          >Số lần làm bài tối đa</label
        >

        <app-input
          type="text"
          class="mb-0 ce-input-with-unit mt-3"
          @onFocus="(event) => event.target.select()"
          id="count"
          size="sm"
          style="width: 102px"
          v-model="payload.reworks"
          @change="checkReworks()"
        >
          <div slot="unit">Lần</div>
        </app-input>
        <app-error :error="get(error, 'reworks', '')" />
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <app-button
        size="md"
        color="default"
        outline
        class="font-weight-semi-bold mr-4 text-secondary"
        @click="$emit('cancel')"
        >Huỷ</app-button
      >
      <app-button
        size="md"
        color="primary"
        class="font-weight-semi-bold"
        @click="handleAddExcercise"
        :disabled="disabled_all"
        >Tạo bài tập</app-button
      >
    </div>
    <app-modal-confirm
      title="Bạn muốn tạo bài tập?"
      description="Bạn sẽ không thể thay đổi loại bài tập sau khi tạo."
      centered
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import * as actionTypes from "~/utils/action-types";
import { getParamQuery } from "~/utils/common";
import { get } from "lodash";
import { mapState } from "vuex";
import { createPayloadExercise } from "~/models/course/AddCourse";

export default {
  components: {
    IconAngleDown,
  },

  props: {
    lesson: {
      type: Object,
      default: null,
    },
    category: {
      type: String,
      default: "",
    },
  },

  computed: {
    disabled_all() {
      return this.$store.getters["elearning/create/disabled_all"];
    },
  },

  data() {
    return {
      payload: {
        // index: 1,
        lesson_id: "",
        required: "",
        title: "",
        type: "",
        pass_score: 0,
        reworks: 1,
        duration: 0,
        category: this.category,
      },
      error: {
        title: "",
        required: "",
        type: "",
        duration: "",
        pass_score: "",
        reworks: "",
      },
      showModalConfirm: false,
      confirmLoading: false,
    };
  },

  methods: {
    checkPayload() {
      let check = true;
      check = this.checkTitle();
      check = this.checkDuration();
      check = this.checkPassScore();
      check = this.checkReworks();
      check = this.checkType();
      check = this.checkRequired();
      return check;
    },

    checkTitle() {
      if (!this.payload.title) {
        this.error.title = "Tiêu đề bài tập không được để trống";
        return false;
      }
      this.error.title = "";
      return true;
    },

    checkDuration() {
      if (this.payload.required === 0) {
        this.error.duration = "";
        return true;
      }
      if (this.payload.duration === "") {
        this.error.duration = "Thời gian làm bài không được để trống";
        return false;
      }
      this.error.duration = "";
      return true;
    },

    checkPassScore() {
      if (this.payload.required === 0) {
        this.error.pass_score = "";
        return true;
      }
      if (this.payload.pass_score === "") {
        this.error.pass_score = "Điểm đạt không được để trống";
        return false;
      }
      this.error.pass_score = "";
      return true;
    },

    checkReworks() {
      if (this.payload.required === 0) {
        this.error.reworks = "";
        return true;
      }
      if (this.payload.reworks === "") {
        this.error.reworks = "Số lần làm bài không được để trống";
        return false;
      }
      this.error.reworks = "";
      return true;
    },

    checkType() {
      if (this.payload.type === "") {
        this.error.type = "Loại bài tập không được để trống";
        return false;
      }
      this.error.type = "";
      return true;
    },

    checkRequired() {
      if (this.payload.required === "") {
        this.error.required = "Bài tập bắt buộc không được để trống";
        return false;
      }
      this.error.required = "";
      return true;
    },

    async handleAddExcercise() {
      if (!this.checkPayload()) {
        this.$toasted.error("Invalid params");
        return;
      }
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;

      this.payload.lesson_id = get(this, "lesson.id", "");

      const payload = createPayloadExercise(this.payload);
      const res = await this.$store.dispatch(
        `elearning/creating/creating-excercises/${actionTypes.ELEARNING_CREATING_EXERCISES.ADD}`,
        payload
      );

      this.handleCancel();
      if (get(res, "success", false)) {
        this.$toasted.success(get(res, "message", ""));
        const lesson_id = get(this, "lesson.id", "");
        this.$store.dispatch("elearning/create/getLesson", lesson_id);

        this.$emit("cancel");
        return;
      }

      this.$toasted.error(get(res, "message", ""));
    },

    handleCancel() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    get,
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/elearning/course/creat/_form-creat-excercise.scss";
</style>
