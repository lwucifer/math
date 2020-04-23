<template>
  <div class="wrap-cart-side_payment">
      <div class="d-flex">
          <h5>Tổng tiền</h5>
          <h5 class="text-secondary ml-auto">196.000đ</h5>
      </div>
      <app-button square color="secondary" class="btn-cart_payment">TIẾN HÀNH ĐẶT MUA</app-button>
      <div class="d-flex align-items-center">
          <IconBookOpen class="fill-gray"/>
          <span class="ml-2">Nội dung chương trình học tập đa dạng</span>
      </div>
      <div class="my-4 d-flex align-items-center">
          <IconDollar/>
          <span class="ml-2">Phương thức thanh toán linh hoạt</span>
      </div>
      <div class="d-flex align-items-center">
          <IconEye/>
          <span class="ml-2">Học trên máy tính, điện thoại, tablet</span>
      </div>
  </div>
</template>

<script>
import IconBookOpen from '~/assets/svg/design-icons/book-open.svg?inline';
import IconDollar from '~/assets/svg/icons/dollar.svg?inline';
import IconEye from '~/assets/svg/icons/eye.svg?inline';

export default {
    components:{
        IconBookOpen,
        IconDollar,
        IconEye
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>