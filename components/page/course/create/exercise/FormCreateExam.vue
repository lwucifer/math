<template>
  <div class="cc-panel__body">
    <div class="mb-4">
      <label for="title" class="heading-5 font-weight-bold mb-2 d-inline-block"
        >Tiêu đề {{ title }}
        <span class="caption text-base font-weight-normal"
          >(Tối đa 60 ký tự)</span
        ></label
      >
      <app-input id="title" :counter="60" v-model="payload.title" />
    </div>

    <!-- <div class="mb-4" v-show="category === 'TEST'">
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
    </div> -->

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
          >Số lần làm bài</label
        >

        <app-input
          type="text"
          class="mb-0 mt-3"
          @onFocus="(event) => event.target.select()"
          id="count"
          size="sm"
          style="width: 49px"
          v-model="payload.reworks"
        ></app-input>
      </div>
    </div>

    <div class="mb-4">
      <h5 class="font-weight-bold mb-3">Cài đặt thời gian mở đề</h5>
      <app-radio-group class="mb-4">
        <app-radio
          :checked="is_open === 1"
          @click="is_open = 1"
          name="group3"
          value="1"
          class="mr-4"
          >Có</app-radio
        >
        <app-radio
          :checked="is_open === 0"
          @click="is_open = 0"
          name="group3"
          value="0"
          >Không</app-radio
        >
      </app-radio-group>

      <div v-if="is_open == 1" class="d-flex align-items-center">
        <app-date-picker @input="handleSelectDate" value-format="YYYY-MM-DD" />

        <app-date-picker
          @input="handleSelectTime"
          type="time"
          value-format="hh:mm:ss"
          class="mr-4"
        />

        <IconEvent24px class="fill-primary"/>
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
import IconEvent24px from '~/assets/svg/v2-icons/event_24px.svg?inline';

import * as actionTypes from "~/utils/action-types";
import { getParamQuery } from "~/utils/common";
import { get } from "lodash";
import { mapState } from "vuex";
import { createPayloadExercise } from "~/models/course/AddCourse";

export default {
  components: {
    IconAngleDown,
    IconEvent24px
  },

  props: {
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
    ...mapState("elearning/create", {
      general: "general",
      lesson: "lesson",
    }),
  },

  data() {
    return {
      payload: {
        index: 1,
        elearning_id: "",
        required: get(this, "category", "") === "TEST" ? 1 : "",
        title: "",
        type: "",
        pass_score: 0,
        reworks: 0,
        duration: 0,
        category: this.category,
        open_time: "",
      },
      showModalConfirm: false,
      confirmLoading: false,
      is_open: 0,
      date: "",
      time: "",
    };
  },

  methods: {
    async handleAddExcercise() {
      this.showModalConfirm = true;
    },

    handleSelectDate(date) {
      this.date = date;
    },

    handleSelectTime(time) {
      this.time = time;
    },

    async handleOk() {
      this.confirmLoading = true;

      this.payload.elearning_id = get(this, "general.id", "");
      if (this.is_open == 1) {
        this.payload.open_time = `${this.date} ${this.time}`;
      }

      const payload = createPayloadExercise(this.payload);
      const res = await this.$store.dispatch(
        `elearning/creating/creating-excercises/${actionTypes.ELEARNING_CREATING_EXERCISES.ADD}`,
        payload
      );

      this.handleCancel();
      if (get(res, "success", false)) {
        this.$toasted.success(get(res, "message", ""));
        this.$store.dispatch("elearning/create/getExams");
        // this.$store.dispatch(`elearning/create/getProgress`);
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
