<template>
  <div class="cc-panel bg-white mb-4">
    <div class="cc-panel__title">
      <h4 class="cc-panel__headin">Cài đặt</h4>
    </div>

    <div class="cc-panel__body">
      <div class="mb-4">
        <!-- <div
          class="noti-setting d-flex justify-content-between align-items-center"
        >
          <div class="noti-setting__text text-warning">
            <IconWarning class="mr-2" /> Vui lòng hoàn thành
            <n-link to="" class="text-warning">hồ sơ cá nhân</n-link> trước khi
            cài đặt học phí cho bài giảng, khóa học của bạn.
          </div>
          <button class="noti-setting__close">
            <IconClose fill="#E6A01E" />
          </button>
        </div> -->

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
        <h5 class="mb-3">Cho phép bình luận tại khóa học</h5>
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
          class="cc-select"
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
          v-model="payload.fee"
          @onFocus="(event) => event.target.select()"
          type="number"
          class="text-primary font-weight-semi-bold w-170"
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
            v-model="payload.price"
            @onFocus="(event) => event.target.select()"
            type="number"
            class="text-primary font-weight-semi-bold w-170 mb-0"
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
          :disabled="!is_submit"
          ><Forward class="mr-2" /> Lưu & Tiếp tục</app-button
        >
      </div>
    </div>

    <app-modal-confirm
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
import { get, toNumber, defaultTo } from "lodash";
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
  },

  data() {
    return {
      percent_price: "",
      showModalConfirm: false,
      confirmLoading: false,
      free: "",
      is_submit: false,
      payload: {
        comment_allow: "",
        price: 0,
        elearning_id: get(this, "general.id", ""),
        fee: 0,
        privacy: "",
      },
    };
  },
  mounted() {
    this.handleChangeSetting();
    // this.$store.dispatch(`elearning/create/getSetting`);
    useEffect(this, this.handleCheckSubmit.bind(this), ["payload", "free"]);
  },

  watch: {
    setting: {
      handler: function() {
        this.handleChangeSetting();
      },
      deep: true,
    },
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
      setting: "setting",
    }),
  },

  methods: {
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
      this.payload.fee = get(this, "setting.fee", 0);
      this.payload.privacy = get(this, "setting.privacy", "");
      const fee = toNumber(get(this, "setting.fee", ""));
      const price = toNumber(get(this, "setting.price", ""));
      if (fee) {
        this.percent_price = numeral((price - fee) / fee).format("0%");
      }
      if (fee > 0) {
        this.free = 1;
      }
      if (toNumber(get(this, "setting.fee", "-1")) === 0) {
        this.free = 2;
      }
    },

    handleCheckSubmit() {
      this.handleSetPercent();
      if (this.payload.comment_allow === "") return (this.is_submit = false);
      if (this.payload.privacy === "") return (this.is_submit = false);
      if (this.free === "") return (this.is_submit = false);
      if (this.free == 1) {
        if (!this.payload.fee) {
          return (this.is_submit = false);
        }
        if (!this.payload.price) {
          return (this.is_submit = false);
        }
      }
      this.is_submit = true;
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

    handleSetPercent() {
      const _fee = numeral(get(this, "payload.fee", 0)).value();
      const _price = numeral(get(this, "payload.price", 0)).value();
      if (_fee && _price) {
        this.percent_price = numeral((_price - _fee) / _fee).format("0%");
      }
    },

    async handleCLickSave(type_save) {
      this.showModalConfirm = true;
    },

    async handleSaveSetting() {
      this.confirmLoading = true;
      this.payload.elearning_id = getParamQuery("elearning_id");
      const payload = createPayloadCourseSetting(this.payload, this.free);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-setting/${actionTypes.ELEARNING_CREATING_SETTING.ADD}`,
        payload
      );

      this.handleCancelSetting();

      if (get(result, "success", false)) {
        this.$store.dispatch(`elearning/create/getSetting`);
        this.$store.dispatch(`elearning/create/getProgress`);
        this.$toasted.success(
          defaultTo(get(result, "message", ""), "Thành công")
        );
        this.$emit("nextStep", "exercise");
        return;
      }
      this.$toasted.error(
        defaultTo(get(result, "message", ""), "Có lỗi xảy ra")
      );
    },

    handleCancelSetting() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    handleReset() {
      this.percent_price = "";
      this.free = "";
      this.handleChangeSetting();
    },

    numeral,
  },
};
</script>

<style lang="scss">
.noti-setting {
  background: #fcf8e3;
  border: 1px solid #cdc52d;
  border-radius: 2px;
  height: 40px;
  padding: 0 1.5rem;
  margin: 1rem 0 3rem 0;

  &__text {
    a {
      font-weight: 600;
      text-decoration: none;
    }
  }
}
.percent_price__ElearningCreate {
  border-radius: 2px;
  padding: 10px;
}
</style>
