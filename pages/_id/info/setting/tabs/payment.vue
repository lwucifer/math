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
          <app-select placeholder="Chọn ngân hàng"/>
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
        <AccountPaymentItem class="mr-4"/>
        <AccountPaymentItem/>
      </div>
  </div>
</template>

<script>
import IconCiclePlus from '~/assets/svg/design-icons/plus-circle.svg?inline';
import IconCheck from '~/assets/svg/design-icons/check.svg?inline';
import AccountPaymentItem from "~/components/page/account/Info/AccountPaymentItem"
export default {
  components:{
    IconCiclePlus,
    IconCheck,
    AccountPaymentItem
  },
  data(){
    return ({
      showAddPayment: false
    })
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-info-setting.scss";
</style>