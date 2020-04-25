<template>
  <div class="wrap-success_payment px-3">
      <IconExclamationTriangle class="icon-fail_payment"/>
      <h5 class="my-4">Thanh toán không thành công</h5>
      <p class="text-gray mb-4">Giao dịch không thành công. Thẻ của bạn cần xác thực 3D Secure. Liên hệ Hotline: 1900-6035 để biết thêm chi tiết. Bạn hãy thử thanh toán lại sau vài phút hoặc Chọn phương thức thanh toán khác</p>
      <div class="my-4">
          <app-button color="white" square class="mr-4">Lịch sử giao dịch</app-button>
          <app-button square>Thanh toán lại</app-button>
      </div>
      <hr>
      <p class="my-4">Tải ứng dụng Schoolly để học tập đơn giản</p>
      <div>
        <span class="mr-4">
            <img src="~assets/images/footer/playstore.png" width="171" alt="">
        </span>
        <span>
            <img src="~assets/images/footer/appstore.png" width="176" alt="">
        </span>
      </div>
  </div>
</template>

<script>
import IconExclamationTriangle from '~/assets/svg/design-icons/exclamation-triangle.svg?inline';

export default {
    components: {
        IconExclamationTriangle
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>