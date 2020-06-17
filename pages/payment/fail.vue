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
      <app-button square @click="handleRepayOrder">Thanh toán lại</app-button>
    </div>
    <div>
      <PaymentSuccessFooter />
    </div>

    <app-modal-notify
      v-if="notify.isShowNotify"
      :type="notify.type"
      title
      :description="notify.description"
      @close="notify.isShowNotify = false"
      @ok="notify.isShowNotify = false"
    />

  </div>
</template>

<script>
import IconAlertCircle1 from "~/assets/svg/icons/alert-circle-1.svg?inline";
import PaymentSuccessFooter from "~/components/page/payment/PaymenSuccessFooter";
import { get } from "lodash";
import { getToken } from "../../utils/auth";
import { createRepayReq } from '../../models/payment/RepayReq';
import { mapActions } from 'vuex';
import { RESPONSE_SUCCESS } from '../../utils/config';

export default {
  components: {
    IconAlertCircle1,
    PaymentSuccessFooter
  },

  data() {
    return {
      message: "",
      notify: {
        type: "",
        description: "",
        isShowNotify: false
      }
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
  },

  methods: {
    ...mapActions("payment", ["postRepay"]),

    handleRepayOrder() {
      const orderFail = JSON.parse(localStorage.getItem("res_payment"));
      if(!orderFail) return;
      console.log("[handleRepayOrder]", orderFail);
      const repayReq = createRepayReq({
        vpc_ReturnURL: process.env.PAYMENT_RETURN_URL,
        // vpc_Amount: item.cost,
        AgainLink: process.env.PAYMENT_AGAIN_LINK,
        Title: "Title",
        vpc_OrderInfo: orderFail.data
      });

      // get new haskey for payment
      this.postRepay(repayReq).then(hashKeyRes => {
        console.log("[handleRepayOrder] hashKeyRes", hashKeyRes);
        if (hashKeyRes.success == RESPONSE_SUCCESS) {
          // call onepay for payment
          const onepayUrlWithParams = `${
            process.env.PAYMENT_REQ_URL
          }?${qs.stringify(hashKeyRes.data)}`;

          console.log(
            "[postHashKeyGenerate] onepayUrlWithParams",
            onepayUrlWithParams
          );
          window.location.href = onepayUrlWithParams;
        } else {
          console.log("[dosomething else]");
          this.notify = {
            type: "error",
            description: "Thanh toán lại thất bại",
            isShowNotify: true
          };
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>
