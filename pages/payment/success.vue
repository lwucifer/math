<template>
  <div class="wrap-success_payment">
      <IconSuccess/>
      <h5 class="my-4">Thanh toán thành công</h5>
      <app-button square class="mb-4">Góc học tập</app-button>
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
import IconSuccess from "~/assets/svg/Icons/success.svg?inline";
export default {
    components:{
        IconSuccess
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>