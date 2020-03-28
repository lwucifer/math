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
            <app-radio
              value="1"
              class="mr-4"
              :checked="payload.comment_allow == 1"
              >Có</app-radio
            >
            <app-radio value="0" :checked="payload.comment_allow == 0"
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

export default {
  components: {
    IconAngleDown,
    CreateAction
  },

  data() {
    return {
      fee_discount: 0,
      showModalConfirm: false,
      confirmLoading: false,
      payload: {
        comment_allow: 1,
        discount: 0,
        elearning_id: get(this, "general.id", ""),
        fee: 0,
        free: 1,
        passcode: "",
        privacy: "PUBLIC"
      }
    };
  },

  created() {
    this.fetchSetting();
  },

  watch: {
    setting: {
      handler: function() {
        const elearning_id = getParamQuery("elearning_id");
        if (elearning_id) {
          this.payload.elearning_id = elearning_id;
        }

        const comment_allow = get(this, "setting.comment_allow", false) ? 1 : 0;
        this.payload.comment_allow = comment_allow;

        if (get(this, "setting.discount", 0)) {
          this.payload.discount = get(this, "setting.discount", 0);
        }

        if (get(this, "setting.fee", 0)) {
          this.payload.fee = get(this, "setting.fee", 0);
        }

        if (get(this, "setting.privacy", "")) {
          this.payload.privacy = get(this, "setting.privacy", "");
        }
        this.payload.free = get(this, "setting.free", false) ? 1 : 0;
        const fee = toNumber(get(this, "setting.fee", 0));
        const discount = toNumber(get(this, "setting.discount", 0));
        this.fee_discount = fee - discount;
      },
      deep: true
    }
  },

  computed: {
    ...mapState("elearning/creating/creating-setting", {
      setting: "setting"
    }),
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    })
  },

  methods: {
    fetchSetting() {
      const elearning_id = getParamQuery("elearning_id");
      if (elearning_id) {
        const options = {
          params: {
            elearning_id
          }
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
          elearning_id
        }
      };
      this.$store.dispatch(
        `elearning/creating/creating-progress/${actionTypes.ELEARNING_CREATING_PROGRESS}`,
        options
      );
    },

    numeral
  }
};
</script>

<style></style>
