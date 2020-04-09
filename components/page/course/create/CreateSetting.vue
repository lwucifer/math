<template>
  <div class="cc-panel bg-white mb-4">
    <div class="cc-panel__title">
      <h1 class="cc-panel__heading heading-5 text-primary">Cài đặt</h1>
    </div>

    <div class="cc-panel__body">
      <div class="row align-items-center mb-4">
        <div class="col-md-3">Chế độ hiển thị</div>
        <div class="col-md-9">
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
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-4">Cho phép bình luận tại bài giảng</div>
        <div class="col-md-8">
          <app-radio-group v-model="payload.comment_allow">
            <app-radio
              value="1"
              class="mr-4"
              :checked="payload.comment_allow === true"
              >Có</app-radio
            >
            <app-radio value="0" :checked="payload.comment_allow === false"
              >Không</app-radio
            >
          </app-radio-group>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Học phí</div>
        <div class="col-md-9">
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
      </div>

      <div class="row align-items-center mb-4" v-if="this.free == 1">
        <div class="col-md-3">Giá bán</div>
        <div class="col-md-4">
          <app-input
            :value="payload.fee ? numeral(payload.fee).format() : ''"
            @input="handleChangeFee"
            type="text"
            class="mb-0"
          ></app-input>
        </div>
      </div>

      <div class="row align-items-center mb-4" v-if="this.free == 1">
        <div class="col-md-3">Giá sau khuyến mại</div>
        <div class="col-md-4">
          <app-input
            :value="payload.price ? numeral(payload.price).format() : ''"
            @input="handleChangePrice"
            type="text"
            class="mb-0"
          ></app-input>
        </div>
        <div class="percent_price__ElearningCreate" v-if="percent_price">
          <span>{{ percent_price }}</span>
        </div>
      </div>

      <create-action @handleCLickSave="handleCLickSave" />
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

export default {
  components: {
    IconAngleDown,
    CreateAction,
  },

  data() {
    return {
      percent_price: "",
      showModalConfirm: false,
      confirmLoading: false,
      free: "",
      payload: {
        comment_allow: "",
        price: "",
        elearning_id: get(this, "general.id", ""),
        fee: "",
        privacy: "",
      },
    };
  },
  created() {
    this.fetchSetting();
  },

  watch: {
    setting: {
      handler: function() {
        this.payload.elearning_id = getParamQuery("elearning_id");
        this.payload.comment_allow = get(this, "setting.comment_allow", "");
        this.payload.price = get(this, "setting.price", "");
        this.payload.fee = get(this, "setting.fee", "");
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
      deep: true,
    },
  },

  computed: {
    ...mapState("elearning/creating/creating-setting", {
      setting: "setting",
    }),
    ...mapState("elearning/creating/creating-general", {
      general: "general",
    }),
  },

  methods: {
    fetchSetting() {
      const elearning_id = getParamQuery("elearning_id");
      if (elearning_id) {
        const options = {
          params: {
            elearning_id,
          },
        };
        this.$store.dispatch(
          `elearning/creating/creating-setting/${actionTypes.ELEARNING_CREATING_SETTING.LIST}`,
          options
        );
      }
    },

    handleChangePrivacy(privacy) {
      this.payload.privacy = privacy;
    },

    handleChangeFee(fee) {
      this.payload.fee = fee;
      this.handleSetPercent();
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

    handleChangePrice(price) {
      this.payload.price = price;
      this.handleSetPercent();
    },

    async handleCLickSave() {
      this.showModalConfirm = true;
    },

    async handleSaveSetting() {
      this.confirmLoading = true;
      const payload = createPayloadCourseSetting(this.payload);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-setting/${actionTypes.ELEARNING_CREATING_SETTING.ADD}`,
        payload
      );

      this.handleCancelSetting();

      if (get(result, "success", false)) {
        this.getProgress();
        this.fetchSetting();
        this.$toasted.success(
          defaultTo(get(result, "message", ""), "Thành công")
        );
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

    getProgress() {
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          elearning_id,
        },
      };
      this.$store.dispatch(
        `elearning/creating/creating-progress/${actionTypes.ELEARNING_CREATING_PROGRESS}`,
        options
      );
    },

    numeral,
  },
};
</script>

<style lang="scss">
.percent_price__ElearningCreate {
  background: #32af85;
  span {
    color: #ffffff;
    display: block;
    padding: 5px;
  }
}
</style>
