<template>
  <div class="wrap-cart-side_payment">
    <div class="d-flex">
      <h5>Tổng tiền</h5>
      <h5 class="text-secondary ml-auto">{{cartCheckout.cost}}</h5>
    </div>
    <app-button
      square
      color="secondary"
      class="btn-cart_payment"
      @click.prevent="handleCheckout"
    >TIẾN HÀNH ĐẶT MUA</app-button>
    <div class="d-flex align-items-center">
      <IconBookOpen class="fill-gray" />
      <span class="ml-2">Nội dung chương trình học tập đa dạng</span>
    </div>
    <div class="my-4 d-flex align-items-center">
      <IconDollar />
      <span class="ml-2">Phương thức thanh toán linh hoạt</span>
    </div>
    <div class="d-flex align-items-center">
      <IconEye />
      <span class="ml-2">Học trên máy tính, điện thoại, tablet</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import qs from "qs";

import IconBookOpen from "~/assets/svg/design-icons/book-open.svg?inline";
import IconDollar from "~/assets/svg/icons/dollar.svg?inline";
import IconEye from "~/assets/svg/icons/eye.svg?inline";
import { createOrderPaymentReq } from "~/models/payment/OrderPaymentReq";
import { RESPONSE_SUCCESS } from "~/utils/config";
import { createHashKeyReq } from "~/models/payment/HashKeyReq";

export default {
  components: {
    IconBookOpen,
    IconDollar,
    IconEye
  },

  computed: {
    ...mapGetters("cart", ["cartCheckout"])
  },

  methods: {
    ...mapActions("payment", ["postOder", "postHashKeyGenerate"]),

    handleCheckout() {
      console.log("[handleCheckout]", this.cartCheckout);

      // STEP 1: Submit Order
      const { cost, method, note, orders } = this.cartCheckout;
      const orderPaymentReq = createOrderPaymentReq(cost, method, note, orders);

      // STEP 2: Get Hash Key & Create Order
      const hashKeyReq = createHashKeyReq({
        vpc_ReturnURL: process.env.PAYMENT_RETURN_URL,
        vpc_Amount: cost + '',
        AgainLink: process.env.PAYMENT_AGAIN_LINK,
        Title: "title is here",
        payment_request: orderPaymentReq
      });
      this.postHashKeyGenerate(hashKeyReq)
        .then(hashKeyRes => {
          console.log("[postHashKeyGenerate]", hashKeyRes, hashKeyReq);

          // STEP 3: Request Payment to OnePay
          if(hashKeyRes.success == RESPONSE_SUCCESS){
            const onepayUrlWithParams = `${
              process.env.PAYMENT_REQ_URL
            }?${qs.stringify(hashKeyRes.data)}`;

            console.log("[postHashKeyGenerate] onepayUrlWithParams", onepayUrlWithParams);
            // alert(onepayUrlWithParams)
            // window.location.href = onepayUrlWithParams;
          }
        })
        .catch(err => {
          console.log("[postHashKeyGenerate] err", err);
        });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>
