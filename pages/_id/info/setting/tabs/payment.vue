<template>
  <div class="wrap-payment__account-info-setting">
      <app-button square size="sm" class="mb-2 btn__add-account" @click.prevent="showAddPayment=!showAddPayment">
        <IconCiclePlus class="icon mr-2"/>
        Thêm tài khoản nhận  tiền
      </app-button>
      <p class="text-secondary font-italic">Để nhận tiền từ việc bán bài giảng/khóa học, vui lòng cập nhật tài khoản ngân hàng của bạn</p>
      <div class="wrap-group-input" v-if="showAddPayment">
        <div class="group-select-label">
          <label>Chọn ngân hàng nhận</label>
          <app-vue-select 
            :placeholder="'Chọn ngân hàng'" 
            label="name"
            searchable
            clearable
            :options="opts"
            class="app-vue-select ml-3"
            />
        </div>
        <app-input  label="Chi nhánh"/>
        <app-input  label="Tên chủ tài khoản"/>
        <app-input  label="Số tài khoản"/>
        <div class="d-flex justify-content-end">
          <app-button square size="sm" color="info">Hủy</app-button>
          <app-button square size="sm" class="btn__add-account ml-3">Thêm</app-button>
        </div>
      </div>
      <hr class="my-4">
      <h6 class="mb-2">DANH SÁCH NHẬN TIỀN</h6>
      <div class="color-primary d-flex align-items-center">
        <IconCheck class="icon subheading"/>
        <span>Bạn vừa thêm 1 tài khoản</span>
      </div>
      <div class="d-flex">
        <AccountPaymentList/>
      </div>
  </div>
</template>

<script>
import IconCiclePlus from '~/assets/svg/design-icons/plus-circle.svg?inline';
import IconCheck from '~/assets/svg/design-icons/check.svg?inline';
import AccountPaymentList from "~/components/page/account/Info/AccountPaymentList"
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
export default {
  components:{
    IconCiclePlus,
    IconCheck,
    AccountPaymentList
  },
  data(){
    return ({
      showAddPayment: false,
      opts:[]
    })
  },
  watch:{
    bankList:{
      handler: function(){
        this.opts = get(this,"bankList",[])
      }
    }
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("bank", {
      bankList: "bankList",
    })
  },
  methods:{
    fecthPublicBank(){
      this.$store.dispatch(`bank/${actionTypes.PUBLIC_BANK.LIST}`)
    },
  },
  created(){
    this.fecthPublicBank();
  }

}
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-info-setting.scss";
</style>