<template>
  <div class="cc-panel bg-white mb-4">
    <div class="cc-panel__title">
      <h4 class="cc-panel__headin">Cài đặt</h4>
    </div>

    <div class="cc-panel__body">
      <div class="setup-time mb-5">
        <h5 class="mb-4 d-flex align-items-center">
          Cài đặt thời gian
          <span class="text-base font-weight-normal ml-2"
            >(Không bắt buộc)</span
          >

          <v-popover placement="right" trigger="hover">
            <IconQuestionCircle
              width="12px"
              height="12px"
              class="fill-gray icon-tooltip"
            />

            <template #popover>
              <p class="mb-2">
                Khoảng thời gian diễn ra chương trình học do giáo viên quy định.
              </p>
              <p>
                Cài đặt này không bắt buộc, xem chi tiết
                <n-link to="">tại đây</n-link>
              </p>
            </template>
          </v-popover>
        </h5>

        <div class="d-flex align-items-center mb-3">
          <p class="w-120">Thời gian bắt đầu:</p>

          <SelectDate
            @onChange="handleChangeStartDate"
            :value="payload.start_time"
            :disabled="!payload.starttime_enable"
          />

          <app-checkbox v-model="payload.starttime_enable"
            ><span class="text-base">Áp dụng</span></app-checkbox
          >
        </div>

        <div class="d-flex align-items-center">
          <p class="w-120">Thời gian kết thúc:</p>

          <SelectDate
            @onChange="handleChangeEndDate"
            :value="payload.end_time"
            :disabled="!payload.endtime_enable"
          />

          <app-checkbox v-model="payload.endtime_enable"
            ><span class="text-base">Áp dụng</span></app-checkbox
          >
        </div>
      </div>

      <div class="mb-4">
        <h5 class="mb-2">Chế độ hiển thị</h5>

        <app-select
          class="cc-select"
          @change="handleChangePrivacy"
          :value="payload.privacy"
          :options="[
            { value: '', text: 'Chọn chế độ hiển thị' },
            { value: 'PUBLIC', text: 'Công khai' },
            { value: 'PRIVATE', text: 'Riêng tư' },
          ]"
          placeholder="Chọn chế độ hiển thị"
        >
          <template slot="placeholder-icon">
            <IconAngleDown class="icon" />
          </template>
        </app-select>
      </div>

      <div class="mb-4">
        <h5 class="mb-3">
          Cho phép bình luận tại
          {{ get(general, "type", "") == "LECTURE" ? "bài giảng" : "khóa học" }}
        </h5>
        <app-radio-group>
          <app-radio
            value="1"
            class="mr-4"
            :checked="payload.comment_allow === 1"
            @click="payload.comment_allow = 1"
            >Có</app-radio
          >
          <app-radio
            value="0"
            :checked="payload.comment_allow === 0"
            @click="payload.comment_allow = 0"
            >Không</app-radio
          >
        </app-radio-group>
      </div>

      <div class="mb-4">
        <h5 class="mb-2">Học phí</h5>

        <app-select
          class="cc-select w-120"
          @change="handleChangeFree"
          :value="free"
          :options="[
            { value: '', text: 'Chọn học phí' },
            { value: 1, text: 'Trả phí' },
            { value: 2, text: 'Miễn phí' },
          ]"
          placeholder="Chọn học phí"
        >
          <template slot="placeholder-icon">
            <IconAngleDown class="icon" />
          </template>
        </app-select>
      </div>

      <div class="mb-4" v-if="this.free == 1">
        <h5 class="mb-2">Giá bán</h5>

        <app-input
          :value="numeral(payload.fee).format()"
          @onFocus="(event) => event.target.select()"
          type="text"
          @input="handleChangeFee"
          class="text-primary font-weight-semi-bold w-170 input-price"
        >
          <template #unit>đ</template>
        </app-input>

        <!-- <div class="app-input mb-0 app-input--size-md">
          <div class="app-input__input">
            <currency-input v-model="payload.fee" />
          </div>
        </div> -->
      </div>

      <div class="mb-4" v-if="this.free == 1">
        <h5 class="mb-2">Giá sau khuyến mại</h5>

        <div class="d-flex align-item-center">
          <app-input
            :value="numeral(payload.price).format()"
            @onFocus="(event) => event.target.select()"
            type="text"
            @input="handleChangePrice"
            class="text-primary font-weight-semi-bold w-170 mb-0 input-price"
          >
            <template #unit>đ</template>
          </app-input>

          <!-- <div class="app-input mb-0 app-input--size-md">
            <div class="app-input__input">
              <currency-input v-model="payload.price" />
            </div>
          </div> -->

          <div
            class="percent_price__ElearningCreate bg-primary text-white ml-3"
            v-if="percent_price"
          >
            {{ percent_price }}
          </div>
        </div>
      </div>
    </div>

    <div class="create-action pt-5">
      <div class="create-action__right d-flex align-items-center">
        <!-- <app-button
          outline
          class="mr-4"
          @click="handleReset"
          square
          color="error"
          ><IconDelete class="mr-2" /> Thiết lập lại</app-button
        >
        <app-button
          @click="handleCLickSave('draft')"
          class="mr-4"
          color="primary"
          square
          outline
          :disabled="!is_submit"
          ><IconSave class="mr-2" /> Lưu nháp</app-button
        > -->
        <app-button
          @click="handleCLickSave"
          class="create-action__btn mr-4"
          square
          ><Forward class="mr-2" /> Lưu & Tiếp tục</app-button
        >
      </div>
    </div>

    <app-modal-confirm
      centered
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleSaveSetting"
      @cancel="handleCancelSetting"
    />
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import CreateAction from "~/components/page/course/create/common/CreateAction";
import { getParamQuery, useEffect } from "~/utils/common";
import { get, toNumber } from "lodash";
import numeral from "numeral";
import { createPayloadCourseSetting } from "~/models/course/AddCourse";
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import { validatePrice } from "~/utils/validations";
import * as yup from "yup";
import IconArrowLeft from "~/assets/svg/design-icons/arrow-left.svg?inline";
import IconDelete from "~/assets/svg/v2-icons/delete_sweep_2.svg?inline";
import IconSave from "~/assets/svg/v2-icons/save_24px.svg?inline";
import Forward from "~/assets/svg/v2-icons/forward_2.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";
import IconWarning from "~/assets/svg/icons/warning.svg?inline";
import IconQuestionCircle from "~/assets/svg/design-icons/question-circle.svg?inline";
import IconCalender from "~/assets/svg/v2-icons/calendar_today_24px.svg?inline";
import SelectDate from "~/components/page/course/create/setting/SelectDate";

export default {
  components: {
    IconAngleDown,
    CreateAction,
    IconArrowLeft,
    IconDelete,
    IconSave,
    Forward,
    IconClose,
    IconWarning,
    IconQuestionCircle,
    IconCalender,
    SelectDate,
  },

  data() {
    return {
      showModalConfirm: false,
      confirmLoading: false,
      free: "",
      payload: {
        comment_allow: "",
        price: 0,
        elearning_id: get(this, "general.id", ""),
        fee: 0,
        privacy: "",
        end_time: "",
        endtime_enable: false,
        start_time: "",
        starttime_enable: false,
      },
    };
  },
  mounted() {
    useEffect(this, this.handleChangeSetting.bind(this), ["setting"]);
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
      setting: "setting",
    }),
    submit() {
      if (this.payload.comment_allow === "") return false;
      if (this.payload.privacy === "") return false;
      if (this.free === "") return false;
      if (this.free == 1) {
        if (!this.payload.fee) {
          return false;
        }
        // if (!this.payload.price) {
        //   return false;
        // }
      }
      return true;
    },
    percent_price() {
      let percent_price = "";
      const _fee = numeral(get(this, "payload.fee", 0)).value();
      const _price = numeral(get(this, "payload.price", 0)).value();
      if (_fee && _price) {
        percent_price = numeral((_price - _fee) / _fee).format("0%");
      }
      return percent_price;
    },
  },

  methods: {
    get,

    handleChangeStartDate(date) {
      this.payload.start_time = date;
    },

    handleChangeEndDate(date) {
      this.payload.end_time = date;
    },

    handleChangePrice(e) {
      this.payload.price = numeral(e).format();
    },
    handleChangeFee(e) {
      this.payload.fee = numeral(e).format();
    },
    handleChangeSetting() {
      this.payload.elearning_id = getParamQuery("elearning_id");
      this.payload.comment_allow = get(this, "setting.comment_allow", "");
      if (this.payload.comment_allow === true) {
        this.payload.comment_allow = 1;
      }
      if (this.payload.comment_allow === false) {
        this.payload.comment_allow = 0;
      }
      this.payload.price = get(this, "setting.price", 0);
      this.payload.start_time = get(this, "setting.start_time", "");
      this.payload.end_time = get(this, "setting.end_time", "");
      this.payload.starttime_enable = get(
        this,
        "setting.starttime_enable",
        false
      );
      this.payload.endtime_enable = get(this, "setting.endtime_enable", false);
      this.payload.fee = get(this, "setting.fee", 0);
      this.payload.privacy = get(this, "setting.privacy", "");
      const fee = toNumber(get(this, "setting.fee", ""));
      const price = toNumber(get(this, "setting.price", ""));
      // if (fee) {
      //   this.percent_price = numeral((price - fee) / fee).format("0%");
      // }
      if (fee > 0) {
        this.free = 1;
      }
      if (toNumber(get(this, "setting.fee", "-1")) === 0) {
        this.free = 2;
      }

      if (!this.payload.endtime_enable) {
        this.end_time = "";
      }

      if (!this.payload.starttime_enable) {
        this.start_time = "";
      }
    },

    handleChangePrivacy(privacy) {
      this.payload.privacy = privacy;
    },

    handleChangeFree(free) {
      this.free = free;
      if (free != 1) {
        this.payload.fee = 0;
        this.payload.price = 0;
      }
    },

    // handleSetPercent() {
    //   const _fee = numeral(get(this, "payload.fee", 0)).value();
    //   const _price = numeral(get(this, "payload.price", 0)).value();
    //   if (_fee && _price) {
    //     this.percent_price = numeral((_price - _fee) / _fee).format("0%");
    //   }
    // },

    handleCLickSave() {
      if (!this.submit) {
        this.$toasted.error("Bạn chưa thiết lập xong cài đặt");
        return;
      }
      this.showModalConfirm = true;
    },

    async handleSaveSetting() {
      this.confirmLoading = true;
      this.payload.elearning_id = getParamQuery("elearning_id");
      this.payload.fee = numeral(this.payload.fee).value();
      this.payload.price = numeral(this.payload.price).value();
      const payload = createPayloadCourseSetting(this.payload, this.free);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-setting/${actionTypes.ELEARNING_CREATING_SETTING.ADD}`,
        payload
      );

      this.handleCancelSetting();

      if (get(result, "success", false)) {
        this.$store.dispatch(`elearning/create/getSetting`);
        // this.$store.dispatch(`elearning/create/getProgress`);
        this.$toasted.success(get(result, "message", "Thành công"));
        this.$emit("nextStep", "exercise");
        return;
      }
      this.$toasted.error(get(result, "message", "Có lỗi xảy ra"));
    },

    handleCancelSetting() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    handleReset() {
      // this.percent_price = "";
      this.free = "";
      this.handleChangeSetting();
    },

    numeral,
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/elearning/course/creat/_creat-setting.scss";
</style>
