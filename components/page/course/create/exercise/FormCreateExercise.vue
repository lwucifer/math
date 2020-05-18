<template>
  <div class="cc-panel__body">
    <div class="mb-4">
      <h5 for="title" class="mb-3 d-inline-block">
        Tiêu đề {{ title }}
        <span class="caption text-base font-weight-normal"
          >(Tối đa 60 ký tự)</span
        >
      </h5>
      <app-input id="title" :counter="60" v-model="payload.title" />
    </div>

    <div class="mb-4" v-show="category === 'EXERCISE'">
      <h5 for="require" class="mb-3">{{ title_required }}</h5>

      <app-radio-group>
        <app-radio
          name="group1"
          value="1"
          class="mr-4"
          :checked="payload.required === 1"
          @click="payload.required = 1"
          >Có</app-radio
        >
        <app-radio
          name="group1"
          value="0"
          :checked="payload.required === 0"
          @click="payload.required = 0"
          >Không</app-radio
        >
      </app-radio-group>
    </div>

    <div class="mb-4">
      <h5 for="require" class="mb-3">Loại {{ title }}</h5>

      <app-radio-group>
        <app-radio
          name="group2"
          value="CHOICE"
          class="mr-4"
          :checked="payload.type === 'CHOICE'"
          @click="payload.type = 'CHOICE'"
          >Trắc nghiệm</app-radio
        >
        <app-radio
          name="group2"
          value="ESSAY"
          :checked="payload.type === 'ESSAY'"
          @click="payload.type = 'ESSAY'"
          >Tự luận</app-radio
        >
      </app-radio-group>

      <!-- <div class="col-md-10">
        <app-select
          class="cc-select"
          id="require"
          :options="[
            { value: '', text: 'Chọn' },
            { value: 'CHOICE', text: 'Trắc nghiệm' },
            { value: 'ESSAY', text: 'Tự luận' },
          ]"
          placeholder="Bắt buộc"
          size="sm"
          style="width: 112px"
          v-model="payload.type"
        >
          <template slot="placeholder-icon">
            <IconAngleDown class="icon" />
          </template>
        </app-select>
      </div> -->
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
        >
          <div slot="unit">Phút</div>
        </app-input>
      </div>

      <div class="col-12 col-md-4">
        <label for="point" class="heading-5 font-weight-bold">Điểm đạt</label>

        <app-input
          type="text"
          @onFocus="(event) => event.target.select()"
          min="0"
          max="10"
          class="mb-0 ce-input-with-unit mt-3"
          id="point"
          size="sm"
          style="width: 102px"
          v-model="payload.pass_score"
        >
          <div slot="unit">/10</div>
        </app-input>
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
          :value="1"
        >
          <div slot="unit">Lần</div>
        </app-input>
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
        >Tạo {{ title }}</app-button
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
    title() {
      return get(this, "category", "") === "TEST" ? "bài kiểm tra" : "bài tập";
    },
    title_required() {
      return get(this, "category", "") === "TEST"
        ? "Bài kiểm tra bắt buộc?"
        : "Bài tập bắt buộc?";
    },
  },

  data() {
    return {
      payload: {
        index: 1,
        lesson_id: "",
        required: get(this, "category", "") === "TEST" ? 1 : "",
        title: "",
        type: "",
        pass_score: 0,
        reworks: 0,
        duration: 0,
        category: this.category,
      },
      showModalConfirm: false,
      confirmLoading: false,
    };
  },

  methods: {
    async handleAddExcercise() {
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
        // this.$store.dispatch(`elearning/create/getProgress`);

        if (get(this, "category", "") === "TEST") {
          this.$store.dispatch("elearning/create/getExams");
        } else {
          const lesson_id = get(this, "lesson.id", "");
          this.$store.dispatch("elearning/create/getLesson", lesson_id);
        }

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
