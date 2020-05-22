<template>
  <div class="wrap-success_payment">
      <IconCheckCircle1/>
      <h3 class="my-4">Thanh toán thành công</h3>
      <app-button square class="mb-4" nuxt to="/elearning/mycourses">Góc học tập</app-button>
      <div style="margin-bottom:36px">
          <n-link class="text-decoration-none" to="/elearning">Tiếp tục mua sắm</n-link>
      </div>
      <div>
          <PaymentSuccessFooter/>
      </div>
  </div>
</template>

<script>
import IconCheckCircle1 from '~/assets/svg/icons/check-circle-1.svg?inline';
import PaymentSuccessFooter from '~/components/page/payment/PaymenSuccessFooter';
export default {
    components:{
        IconCheckCircle1,
        PaymentSuccessFooter
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>