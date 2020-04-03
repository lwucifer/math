<template>
  <div class="cc-panel__body">
    <div class="mb-4">
      <label for="title" class="text-sub mb-2 d-inline-block"
        >Tiêu đề bài tập</label
      >
      <app-input id="title" :counter="100" v-model="payload.title" />
    </div>

    <div class="row align-items-center mb-4">
      <div class="col-md-2">
        <label for="require" class="text-gray caption">Loại bài tập</label>
      </div>
      <div class="col-md-10">
        <app-select
          class="cc-select"
          id="require"
          :options="[
            { value: 'CHOICE', text: 'Trắc nghiệm' },
            { value: 'ESSAY', text: 'Tự luận' }
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
      </div>
    </div>

    <div class="row align-items-center mb-4">
      <div class="col-md-2">
        <label for="require" class="text-gray caption">Bài tập bắt buộc?</label>
      </div>
      <div class="col-md-10">
        <app-select
          class="cc-select"
          id="require"
          :options="[
            { value: 1, text: 'Có' },
            { value: 0, text: 'Không' }
          ]"
          placeholder="Bắt buộc"
          size="sm"
          style="width: 112px"
          v-model="payload.required"
        >
          <template slot="placeholder-icon">
            <IconAngleDown class="icon" />
          </template>
        </app-select>
      </div>
    </div>

    <div class="row align-items-center mb-4">
      <div class="col-md-2">
        <label for="time" class="text-gray caption">Thời gian làm bài</label>
      </div>

      <div class="col-md-10">
        <app-input
          type="number"
          class="mb-0 ce-input-with-unit"
          id="time"
          size="sm"
          style="width: 112px"
          v-model="payload.duration"
        >
          <div slot="unit">Phút</div>
        </app-input>
      </div>
    </div>

    <div class="row align-items-center mb-4">
      <div class="col-md-2">
        <label for="point" class="text-gray caption">Điểm đạt</label>
      </div>

      <div class="col-md-10">
        <app-input
          type="number"
          min="0"
          max="10"
          class="mb-0 ce-input-with-unit"
          id="point"
          size="sm"
          style="width: 102px"
          v-model="payload.pass_score"
        >
          <div slot="unit">/10</div>
        </app-input>
      </div>
    </div>

    <div class="row align-items-center mb-4">
      <div class="col-md-2">
        <label for="count" class="text-gray caption">Số lần làm bài</label>
      </div>

      <div class="col-md-10">
        <app-input
          type="number"
          class="mb-0"
          id="count"
          size="sm"
          style="width: 49px"
          v-model="payload.reworks"
        ></app-input>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <app-button
        size="sm"
        color="disabled"
        class="font-weight-semi-bold mr-4"
        square
        @click="$emit('handleCancel')"
        >Huỷ bỏ</app-button
      >
      <app-button
        size="sm"
        color="primary"
        class="font-weight-semi-bold"
        square
        @click="handleAddExcercise"
        >Tạo bài tập</app-button
      >
    </div>
    <app-modal-confirm
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
    IconAngleDown
  },

  props: {
    lesson: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      payload: {
        index: 1,
        lesson_id: "",
        required: 1,
        title: "",
        type: "CHOICE",
        pass_score: 0,
        reworks: 0,
        duration: 0,
        category: "EXERCISE"
      },
      showModalConfirm: false,
      confirmLoading: false
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
        this.$emit("handleRefreshExcercises");
        return;
      }

      this.$toasted.error(get(res, "message", ""));
    },

    handleCancel() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    }
  }
};
</script>
