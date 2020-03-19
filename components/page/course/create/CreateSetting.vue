<template>
  <div class="cc-panel bg-white mb-4">
    <create-action @handleCLickSave="handleCLickSave" />
    <div class="cc-panel__title">
      <h1 class="cc-panel__heading heading-5 text-primary">Cài đặt</h1>
    </div>

    <div class="cc-panel__body">
      <!-- <app-alert type="secondary" class="mb-4">
        Vui lòng hoàn thành
        <n-link to>
          <b>hồ sơ cá nhân</b>
        </n-link>&nbsp;trước khi cài đặt học phí cho bài giảng, khóa học của bạn
      </app-alert> -->

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Chế độ hiển thị</div>
        <div class="col-md-9">
          <app-select
            class="cc-select"
            @change="handleChangePrivacy"
            :value="payload.privacy"
            :options="[
              { value: 'PUBLIC', text: 'Công khai' },
              { value: 'PRIVATE', text: 'Riêng tư' }
            ]"
            placeholder="Chọn chế độ hiển thị"
          >
            <template slot="placeholder-icon">
              <IconAngleDown class="icon" />
            </template>
          </app-select>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-4">Cho phép bình luận tại bài giảng</div>
        <div class="col-md-8">
          <app-radio-group v-model="payload.comment_allow">
            <app-radio value="1" class="mr-4" checked="true">Có</app-radio>
            <app-radio value="0">Không</app-radio>
          </app-radio-group>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Học phí</div>
        <div class="col-md-9">
          <app-select
            class="cc-select"
            @change="handleChangeFree"
            :value="payload.free"
            :options="[
              { value: 0, text: 'Trả phí' },
              { value: 1, text: 'Miễn phí' }
            ]"
            placeholder="Chọn học phí"
          >
            <template slot="placeholder-icon">
              <IconAngleDown class="icon" />
            </template>
          </app-select>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Giá bán</div>
        <div class="col-md-4">
          <app-input
            :value="numeral(payload.fee).format()"
            @input="handleChangeFee"
            type="text"
            class="mb-0"
          ></app-input>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Giá sau khuyến mại</div>
        <div class="col-md-4">
          <app-input
            :value="numeral(fee_discount).format()"
            @input="handleChangeFeeDiscount"
            type="text"
            class="mb-0"
          ></app-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import CreateAction from "~/components/page/course/create/CreateAction";
import { getParamQuery, useEffect } from "~/utils/common";
import { get, toNumber } from "lodash";
import numeral from "numeral";
import { createPayloadCourseSetting } from "~/models/course/AddCourse";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    IconAngleDown,
    CreateAction
  },

  data() {
    return {
      fee_discount: 0,
      payload: {
        comment_allow: 1,
        discount: 0,
        elearning_id: getParamQuery("elearning_id"),
        fee: 0,
        free: 1,
        passcode: "",
        privacy: "PUBLIC"
      }
    };
  },

  updated() {
    console.log(this.payload);
  },

  methods: {
    handleChangePrivacy(privacy) {
      this.payload.privacy = privacy;
    },

    handleChangeFee(fee) {
      this.payload.fee = fee;
    },

    handleChangeFree(free) {
      this.payload.free = free;
    },

    handleChangeFeeDiscount(fee_discount) {
      this.fee_discount = fee_discount;
      this.payload.discount =
        numeral(this.payload.fee).value() - numeral(fee_discount).value();
    },

    async handleCLickSave() {
      const payload = createPayloadCourseSetting(this.payload);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-setting/${actionTypes.ELEARNING_CREATING_SETTING.ADD}`,
        payload
      );
      if (get(result, "success", false)) {
        this.$toasted.success(get(result, "message", ""));
        return;
      }
      this.$toasted.error(get(result, "message", ""));
    },

    numeral
  }
};
</script>

<style></style>
