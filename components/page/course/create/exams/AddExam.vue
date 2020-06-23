<template>
  <div class="cc-panel__body">
    <div class="mb-4">
      <label for="title" class="heading-5 font-weight-bold mb-2 d-inline-block"
        >Tiêu đề bài kiểm tra
        <span class="caption text-base font-weight-normal"
          >(Tối đa 60 ký tự)</span
        ></label
      >
      <app-input
        id="title"
        :counter="60"
        v-model="payload.title"
        @input="checkTitle()"
      />
      <app-error :error="get(error, 'title', '')" />
    </div>

    <div class="mb-4">
      <h5 for="require" class="mb-3">Loại bài kiểm tra</h5>

      <app-radio-group>
        <app-radio
          name="group2"
          value="CHOICE"
          class="mr-4"
          :checked="payload.type === 'CHOICE'"
          @click="handleChangeType('CHOICE')"
          >Trắc nghiệm</app-radio
        >
        <app-radio
          name="group2"
          value="ESSAY"
          :checked="payload.type === 'ESSAY'"
          @click="handleChangeType('ESSAY')"
          >Tự luận</app-radio
        >
      </app-radio-group>
      <app-error :error="get(error, 'type', '')" />
    </div>

    <div class="caculate-point">
      <h5 class="mb-4">Chọn cách tính điểm</h5>

      <div class="d-flex mb-4">
        <app-radio
          value="coefficient"
          :checked="typeRadio == 'coefficient'"
          @click="handleSelectType"
          name="caculate-point"
          :disabled="disabledType"
          :class="{ 'mr-6': true, 'disabled-input': disabledType }"
          >Theo hệ số
          <v-popover placement="right" trigger="hover" class="d-inline-block">
            <IconQuestionCircle
              width="12px"
              height="12px"
              class="fill-gray vertical-middle"
            />

            <template #popover>
              <p>Các bài kiểm tra được cài đặt theo hệ số 1 hoặc hệ số 2</p>
              <p class="mb-3">
                để làm cơ sở tính điểm trung bình cho học sinh.
              </p>

              <a href="">Xem chi tiết</a>
            </template>
          </v-popover>
        </app-radio>

        <app-radio
          :checked="typeRadio == 'weight'"
          value="weight"
          :disabled="disabledType"
          @click="handleSelectType"
          name="caculate-point"
          :class="{ 'disabled-input': disabledType }"
          >Theo trọng số
          <v-popover placement="right" trigger="hover" class="d-inline-block">
            <IconQuestionCircle
              width="12px"
              height="12px"
              class="fill-gray vertical-middle"
            />

            <template #popover>
              <p>Các bài kiểm tra được cài đặt theo trọng số, tính theo %.</p>
              <p class="mb-3">
                Tổng trọng số của tất cả các bài kiểm tra là 100%.
              </p>

              <a href="">Xem chi tiết</a>
            </template>
          </v-popover>
        </app-radio>
      </div>

      <div
        class="d-flex align-items-center mb-5"
        v-if="typeRadio == 'coefficient'"
      >
        <p class="mr-3">Chọn hệ số:</p>

        <app-select
          class="mr-3"
          size="sm"
          :value="payload.coefficient"
          @change="handleChangeCoefficient"
          :options="[
            { value: 1, text: '1' },
            { value: 2, text: '2' },
          ]"
        >
          <template slot="placeholder-icon">
            <IconAngleDown class="icon" />
          </template>
        </app-select>

        <p class="text-warning">
          * Lưu ý: Bạn sẽ không thể thay đổi cách tính điểm sau khi bài kiểm tra
          đã được tạo
        </p>
      </div>

      <div class="d-flex align-items-center mb-5" v-if="typeRadio == 'weight'">
        <p class="mr-3">Nhập trọng số:</p>

        <app-input
          class="mr-3 mb-0 w-90 pr-3"
          size="sm"
          @onFocus="(event) => event.target.select()"
          v-model="payload.weight"
          @input="checkWeight()"
        >
          <template slot="unit">
            <span class="text-primary">%</span>
          </template>
        </app-input>

        <p class="text-warning">
          * Lưu ý: Bạn sẽ không thể thay đổi cách tính điểm sau khi bài kiểm tra
          đã được tạo
        </p>
      </div>
      <app-error :error="get(error, 'weight', '')" />
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
          class="mb-0 mt-3 ce-input-with-unit"
          @onFocus="(event) => event.target.select()"
          id="count"
          size="sm"
          style="width: 102px"
          v-model="payload.reworks"
        >
          <div slot="unit">Lần</div>
        </app-input>
      </div>
    </div>

    <div class="setup-time mt-5 mb-6">
      <h5 class="mb-4">
        Cài đặt thời gian
        <span class="text-base font-weight-normal"
          >(Không bắt buộc)
          <IconQuestionCircle width="12px" height="12px" class="fill-gray"
        /></span>
      </h5>

      <div class="d-flex align-items-center mb-3">
        <p class="w-120">Thời gian bắt đầu:</p>

        <SelectDate
          @onChange="handleChangeOpenTime"
          :value="payload.open_time"
          :disabled="!payload.opentime_enable"
        />
        <app-checkbox v-model="payload.opentime_enable"
          ><span class="text-base">Áp dụng</span></app-checkbox
        >
      </div>

      <div class="d-flex align-items-center">
        <p class="w-120">Thời gian kết thúc:</p>

        <SelectDate
          @onChange="handleChangeCloseTime"
          :value="payload.close_time"
          :disabled="!payload.closetime_enable"
        />

        <app-checkbox v-model="payload.closetime_enable"
          ><span class="text-base">Áp dụng</span></app-checkbox
        >
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
        @click="handleAddExam"
        >Tạo bài kiểm tra</app-button
      >
    </div>

    <app-modal-confirm
      centered
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      title="Tạo bài kiểm tra"
      description="Bạn có chắc chắn muốn tạo bài kiểm tra này?"
    />
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconEvent24px from "~/assets/svg/v2-icons/event_24px.svg?inline";
import IconQuestionCircle from "~/assets/svg/design-icons/question-circle.svg?inline";
import IconCalender from "~/assets/svg/v2-icons/calendar_today_24px.svg?inline";
import SelectDate from "~/components/page/course/create/setting/SelectDate";
import moment from "moment";
import * as actionTypes from "~/utils/action-types";
import { getParamQuery, useEffect } from "~/utils/common";
import { get } from "lodash";
import { mapState } from "vuex";
import { createPayloadExercise } from "~/models/course/AddCourse";
import numeral from "numeral";
import { getUTCDateTime } from '../../../../../utils/moment';

export default {
  components: {
    IconAngleDown,
    IconEvent24px,
    IconQuestionCircle,
    IconCalender,
    SelectDate,
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
      lesson: "lesson",
      exams: "exams",
    }),
    disabledType() {
      return !!(
        get(this, "exams.content.0.weight", "") !== "" ||
        get(this, "exams.content.0.coefficient", "") !== ""
      );
    },
  },

  mounted() {
    useEffect(this, this.watchExams.bind(this), ["exams"]);
  },

  data() {
    return {
      payload: {
        // index: 1,
        elearning_id: "",
        required: true,
        title: "",
        type: "",
        pass_score: 0,
        reworks: 1,
        duration: 0,
        category: "TEST",
        open_time: "",
        opentime_enable: false,
        close_time: "",
        closetime_enable: false,
        coefficient: 1,
        // id: "",
        weight: "",
      },
      showModalConfirm: false,
      confirmLoading: false,
      typeRadio: "coefficient",
      error: {
        title: "",
        type: "",
        weight: "",
      },
    };
  },

  methods: {
    handleChangeType(type) {
      this.payload.type = type;
      this.checkType();
    },

    checkPayload() {
      let check = true;
      check = this.checkTitle();
      check = this.checkType();
      check = this.checkWeight();
      return check;
    },

    checkWeight() {
      if (this.typeRadio !== "weight") {
        this.error.weight = "";
        return true;
      }

      if (!this.payload.weight) {
        this.error.weight = "Bạn cần nhập trọng số";
        return false;
      }

      const checkInteger = Number.isInteger(+this.payload.weight);
      if (!checkInteger) {
        this.error.weight = "Trọng số phải là số nguyên";
        return false;
      }

      if (+this.payload.weight <= 0) {
        this.error.weight = "Trọng số phải lớn hơn 0";
        return false;
      }

      if (+this.payload.weight > 100) {
        this.error.weight = "Trọng số không được lớn hơn 100";
        return false;
      }

      this.error.weight = "";
      return true;
    },

    checkType() {
      if (this.payload.type === "") {
        this.error.type = "Bạn cần nhập loại bài kiểm tra";
        return false;
      }
      this.error.type = "";
      return true;
    },

    checkTitle() {
      if (!this.payload.title) {
        this.error.title = "Bạn cần nhập tiêu đề";
        return false;
      }
      this.error.title = "";
      return true;
    },

    watchExams() {
      if (get(this, "exams.content.0.weight", "") !== "") {
        // this.payload.weight = get(this, "exams.content.0.weight", "");
        this.typeRadio = "weight";
      }
      if (get(this, "exams.content.0.coefficient", "") !== "") {
        // this.payload.coefficient = get(this, "exams.content.0.coefficient", "");
        this.typeRadio = "coefficient";
      }
    },

    handleChangeCoefficient(value) {
      this.payload.coefficient = value;
    },

    handleChangeOpenTime(date) {
      this.payload.open_time = date;
    },

    handleChangeCloseTime(date) {
      this.payload.close_time = date;
    },

    async handleAddExam() {
      this.showModalConfirm = true;
    },

    handleSelectDate(date) {
      this.date = date;
    },

    handleSelectTime(time) {
      this.time = time;
    },

    async handleOk() {
      if (!this.checkPayload()) {
        this.handleCancel();
        return;
      }

      this.confirmLoading = true;

      this.payload.elearning_id = get(this, "general.id", "");

      let data = { ...this.payload };
      data.open_time = getUTCDateTime(data.open_time).format('YYYY-MM-DD HH:mm:ss')
      data.close_time = getUTCDateTime(data.close_time).format('YYYY-MM-DD HH:mm:ss')

      if (!data.open_time) delete data.open_time;
      if (!data.close_time) delete data.close_time;
      if (this.typeRadio === "coefficient") delete data.weight;
      if (this.typeRadio === "weight") delete data.coefficient;

      const res = await this.$axios({
        url: "/elearning/creating/test",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });

      this.handleCancel();

      if (get(res, "data.success", false)) {
        this.$toasted.success(get(res, "data.message", "Thành công"));
        this.$store.dispatch("elearning/create/getExams");
        const data = {
          apply: true,
          calculation_method:
            this.typeRadio === "coefficient" ? "COEFFICIENT" : "WEIGHT",
          elearning_id: this.payload.elearning_id,
        };
        await this.handleCalculatePoint(data);
        this.$emit("cancel");
        return;
      }

      this.$toasted.error(get(res, "data.message", "Có lỗi xảy ra"));
    },

    async handleCalculatePoint(data) {
      const res = await this.$axios({
        url: "/elearning/creating/point_calculation",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
      return res;
    },

    handleCancel() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    handleSelectType(e) {
      this.typeRadio = e.target.value;
    },

    get,
  },
};
</script>
