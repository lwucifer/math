<template>
  <div class="">
    <!--form-->
    <div v-if="showAddPayment">
      <add-bank-form></add-bank-form>
      <hr class="mb-4">
    </div>
    
    <!--list-->
    <div class="row mb-4 mt-3">
      <div class="col-md-9">
        <h6 class="mb-3">DANH SÁCH TÀI KHOẢN NHẬN TIỀN</h6>
        <div>
          <span class="text-primary d-flex">
            <IconCheck class="icon subheading"/>
            Bạn vừa thêm 1 tài khoản
          </span>
        </div>
      </div>
      <div class="col-md-3">
        <div class="text-right">
          <app-button @click.prevent="showAddPayment=!showAddPayment">
            <slot name="icon">
              <IconCiclePlus class="icon icon--btn icon--btn--pre"/>
            </slot>
            <span>Thêm tài khoản</span>
          </app-button>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-6"
         v-for="(bank, index) in accountBankList"
         :key="index"
      >
        <AccountPaymentItem
          :bank="bank"
          @handleRefreshAccountBank="handleRefresh"
        />
      </div>
    </div>
    <p><i style="font-size: 1.3rem;">Để nhận tiền từ việc bán bài giảng/khóa học của bạn, vui lòng cập nhật tài khoản ngâng hàng của bạn</i></p>
  </div>
</template>

<script>
import IconCiclePlus from '~/assets/svg/design-icons/plus-circle.svg?inline';
import IconCheck from '~/assets/svg/design-icons/check.svg?inline';
import AddBankForm from "~/components/page/account/forms/AddBank"
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import AccountPaymentItem from "~/components/page/account/Info/AccountPaymentItem";

export default {

  layout: 'account-info',
  
  components:{
    IconCiclePlus,
    IconCheck,
    AccountPaymentItem,
    AddBankForm
  },
  data() {
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
      accountBankList: "accountBankList",
    })
  },
  methods:{
    fecthPublicBank(){
      this.$store.dispatch(`bank/${actionTypes.PUBLIC_BANK.LIST}`)
    },
    fetchAccountBank(){
      this.$store.dispatch(`bank/${actionTypes.ACCOUNT_BANKS.LIST}`)
    },
    handleRefresh(){
      this.fetchAccountBank();
    },
  },
  created(){
    this.fecthPublicBank();
    this.fetchAccountBank();
  }

}
</script>

<style lang="scss">
  @import "~/assets/scss/components/account/_account-info-setting.scss";
</style>