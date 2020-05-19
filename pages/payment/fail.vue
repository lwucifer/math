<template>
  <div class="wrap-success_payment px-3">
      <IconAlertCircle1 class="icon-fail_payment"/>
      <h5 class="my-4">Thanh toán không thành công</h5>
      <p class="text-gray mb-4 description__payment-fail">Giao dịch không thành công. Thẻ của bạn cần xác thực 3D Secure. Liên hệ Hotline: 1900-6035 để biết thêm chi tiết. Bạn hãy thử thanh toán lại sau vài phút hoặc Chọn phương thức thanh toán khác</p>
      <div class="my-4">
          <app-button color="white" square class="mr-4">Lịch sử giao dịch</app-button>
          <app-button square>Thanh toán lại</app-button>
      </div>
      <div>
          <PaymentSuccessFooter/>
      </div>
  </div>
</template>

<script>
import IconAlertCircle1 from '~/assets/svg/icons/alert-circle-1.svg?inline';
import PaymentSuccessFooter from '~/components/page/payment/PaymenSuccessFooter';
export default {
    components: {
        IconAlertCircle1,
        PaymentSuccessFooter
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>