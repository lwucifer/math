<template>
  <div class="cc-panel bg-white mb-4">
    <create-action @handleCLickSave="handleCLickSave" :isSubmit="isSubmit"/>
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

      <div class="row align-items-center mb-4" v-if="!payload.free">
        <div class="col-md-3">Giá bán</div>
        <div class="col-md-4">
          <app-input
            :value="numeral(payload.fee).format()"
            @input="handleChangeFee"
            :message="errorMessage.fee"
            :validate="validateProps.fee"
            type="text"
            class="mb-0"
          ></app-input>
        </div>
      </div>

      <div class="row align-items-center mb-4" v-if="!payload.free">
        <div class="col-md-3">Giá sau khuyến mại</div>
        <div class="col-md-4">
          <app-input
            :value="numeral(payload.price).format()"
            @input="handleChangePrice"
            :message="errorMessage.price"
            :validate="validateProps.price"
            type="text"
            class="mb-0"
          ></app-input>
        </div>
        <div class="percent_price__ElearningCreate" v-show="showPercent">
          <span>{{percent_price}}</span>
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
import { validatePrice } from "~/utils/validations";
import * as yup from "yup";
const schema = yup.object().shape({
  comment_allow: yup.string().required(),
  elearning_id: yup.string().required(),
  price: yup.number().required(),
  fee: yup.number().required(),
  privacy: yup.string().required(),
})
export default {
  components: {
    IconAngleDown,
    CreateAction
  },

  data() {
    return {
      percent_price:"",
      showPercent:false,
      showModalConfirm: false,
      confirmLoading: false,
      payload: {
        comment_allow: null,
        price: null,
        elearning_id: get(this, "general.id", ""),
        fee: null,
        free: null,
        passcode: "",
        privacy: null
      },
      errorMessage:{
        fee:"",
        price:""
      },
      validateProps:{
        fee:"",
        price:""
      },
      isSubmit:false,
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

        if (get(this, "setting.price", 0)) {
          this.payload.price = get(this, "setting.price", 0);
        }

        if (get(this, "setting.fee", 0)) {
          this.payload.fee = get(this, "setting.fee", 0);
          this.payload.free = 0
        }
        if (!get(this, "setting.fee", 0)) {
          this.payload.fee = get(this, "setting.fee", 0);
          this.payload.free = 1
        }
        if (get(this, "setting.privacy", "")) {
          this.payload.privacy = get(this, "setting.privacy", "");
        }
        const fee = toNumber(get(this, "setting.fee", 0));
        const price = toNumber(get(this, "setting.price", 0));
        this.percent_price= numeral((price-fee)/fee).format('0%')
      },
      deep: true
    },
    payload: {
      handler: function() {
        let that = this;
        const payload = createPayloadCourseSetting(this.payload);
        const elearning_id = getParamQuery("elearning_id");
        if (elearning_id) {
          schema.isValid(payload).then(function(valid) {
            that.isSubmit = valid;
          });
          
          if(this.payload.free == 1){
            console.log('hello')
          }
        }
        
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
      this.validateProps.fee= "";
      if(!fee){
        this.validateProps.fee =2;
        this.errorMessage.fee = "Trường này là bắt buộc";
        this.showPercent = false
      }else if(validatePrice(fee)){
        this.validateProps.fee =1;
        this.payload.fee = fee;
        }
      else if(!validatePrice(fee)){
        this.validateProps.fee =2;
        this.errorMessage.fee = "Tham số không hợp lệ";
        this.isSubmit =false;
        this.showPercent = false
      }
    },

    handleChangeFree(free) {
      this.payload.free = free;
    },

    handleChangePrice(price) {
      this.validateProps.price= "";
      if(!price){
        this.validateProps.price =2;
        this.errorMessage.price = "Trường này là bắt buộc";
        this.showPercent = false
      }else if(validatePrice(price)){
        this.payload.price = price;
        this.validateProps.price =1;
        }
      else if(!validatePrice(price)){
        this.validateProps.price =2;
        this.errorMessage.price = "Tham số không hợp lệ";
        this.showPercent = false
        this.isSubmit =false;
      }
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
        this.fetchSetting()
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

<style lang="scss">
.percent_price__ElearningCreate{
  background: #32AF85;
  span{
    color: #ffffff;
    display: block;
    padding: 5px;
  }
}
</style>
