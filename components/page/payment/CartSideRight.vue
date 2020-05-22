<template>
  <div class="wrap-cart-side_payment">
    <sub-block-section 
      :title-cls="{'border-0': true }"
      title="Thông tin đơn hàng"
    >
      <template v-slot:content>
        <div class="item__payment-side">
            <div class="name-elearning__payment">
              <span>Khóa học đại số lớp 11</span>
              <span class=" text-primary ml-auto">198,000đ</span>
            </div>
            <span class="name-teacher__payment">Trần Văn Nam</span>
        </div>
        <div style="margin-top:4rem;padding:0 1.6rem">
          <div  class="d-flex">
            <h3>Tổng tiền</h3>
            <h3 class="text-primary ml-auto">
              {{ numeral(get(cartCheckout, "cost", 0)).format() }}
            </h3>
          </div>
          <app-button
            color="primary"
            class="btn-cart_payment"
            @click.prevent="handleCheckout"
            >THANH TOÁN NGAY</app-button>
        </div>
        <hr>
        <div class="wrap-footer__payment-side">
          <div class="d-flex align-items-center">
            <IconCollectionsBookmark24px class="fill-primary" />
            <span class="ml-3">Nội dung chương trình học tập đa dạng</span>
          </div>
          <div class="my-4 d-flex align-items-center">
            <IconCreditCard24px class="fill-primary"/>
            <span class="ml-3">Phương thức thanh toán linh hoạt</span>
          </div>
          <div class="d-flex align-items-center">
            <IconDevices24px class="fill-primary"/>
            <span class="ml-3">Học trên máy tính, điện thoại, tablet</span>
          </div>
        </div>
      </template>
    </sub-block-section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
import IconCollectionsBookmark24px from '~/assets/svg/v2-icons/collections_bookmark_24px.svg?inline';
import IconCreditCard24px from '~/assets/svg/v2-icons/credit_card_24px.svg?inline';
import IconDevices24px from '~/assets/svg/v2-icons/devices_24px.svg?inline';
import { createOrderPaymentReq } from "~/models/payment/OrderPaymentReq";
import { RESPONSE_SUCCESS } from "~/utils/config";
import { createHashKeyReq } from "~/models/payment/HashKeyReq";
import { get } from "lodash";
import numeral from "numeral";

export default {
  components: {
    IconCollectionsBookmark24px,
    IconCreditCard24px,
    IconDevices24px,
  },

  computed: {
    ...mapGetters("cart", ["cartCheckout"]),
  },

  methods: {
    get,
    numeral,
    ...mapActions("payment", ["postOder", "postHashKeyGenerate"]),

    handleCheckout() {
      console.log("[handleCheckout]", this.cartCheckout);

      // STEP 1: Submit Order
      const { cost, method, note, orders } = this.cartCheckout;
      const orderPaymentReq = createOrderPaymentReq(cost, method, note, orders);

      // STEP 2: Get Hash Key & Create Order
      const hashKeyReq = createHashKeyReq({
        vpc_ReturnURL: process.env.PAYMENT_RETURN_URL,
        vpc_Amount: cost * 100 + "",
        AgainLink: process.env.PAYMENT_AGAIN_LINK,
        Title: "title is here",
        payment_request: orderPaymentReq,
      });
      this.postHashKeyGenerate(hashKeyReq)
        .then((hashKeyRes) => {
          console.log("[postHashKeyGenerate]", hashKeyRes, hashKeyReq);

          // STEP 3: Request Payment to OnePay
          if (hashKeyRes.success == RESPONSE_SUCCESS) {
            const onepayUrlWithParams = `${
              process.env.PAYMENT_REQ_URL
            }?${qs.stringify(hashKeyRes.data)}`;

            console.log(
              "[postHashKeyGenerate] onepayUrlWithParams",
              onepayUrlWithParams
            );
            // alert(onepayUrlWithParams)
            window.location.href = onepayUrlWithParams;
          }
        })
        .catch((err) => {
          console.log("[postHashKeyGenerate] err", err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>
