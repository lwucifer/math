<template>
  <div class="wrap-success_payment px-3">
    <IconAlertCircle1 class="icon-fail_payment" />
    <h5 class="my-4">Thanh toán không thành công</h5>
    <!-- <p class="text-gray mb-4 description__payment-fail">
      Giao dịch không thành công. Thẻ của bạn cần xác thực 3D Secure. Liên hệ
      Hotline: 1900-6035 để biết thêm chi tiết. Bạn hãy thử thanh toán lại sau
      vài phút hoặc Chọn phương thức thanh toán khác
    </p> -->
    <p class="text-gray mb-4 description__payment-fail">
      {{ message }}
    </p>
    <div class="my-4">
      <app-button color="white" square class="mr-4" :to="transactionLink" nuxt
        >Lịch sử giao dịch</app-button
      >
      <app-button square to="/payment/cart" nuxt>Thanh toán lại</app-button>
    </div>
    <div>
      <PaymentSuccessFooter />
    </div>
  </div>
</template>

<script>
import IconAlertCircle1 from "~/assets/svg/icons/alert-circle-1.svg?inline";
import PaymentSuccessFooter from "~/components/page/payment/PaymenSuccessFooter";
import { get } from "lodash";
import { getToken } from "../../utils/auth";

export default {
  components: {
    IconAlertCircle1,
    PaymentSuccessFooter
  },

  data() {
    return {
      message: ""
    };
  },

  computed: {
    transactionLink() {
      const accountObj = getToken();
      if (!!accountObj) {
        return `/${accountObj.id}/info/transactions`;
      }
      return "#";
    }
  },

  mounted() {
    try {
      const res = JSON.parse(localStorage.getItem("res_payment"));
      if (!get(res, "success", true)) {
        this.message = get(res, "message", "Có lỗi xảy ra");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>
