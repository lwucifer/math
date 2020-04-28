<template>
  <div class="elearning-right-side">
    <img
      class="d-block w-100 mb-4"
      :src="get(info, 'avatar.medium', null)"
      :alt="get(info, 'name', '')"
    />

    <template v-if="get(info, 'free', '')">
      <div class="elearning-right-side__price-wrapper">
        <b
          v-if="get(info, 'free', '')"
          class="elearning-right-side__price text-error"
          >Miễn phí</b
        >
      </div>
      <app-button color="secondary" fullWidth square class="text-uppercase mb-4"
        >Tham gia học</app-button
      >
    </template>

    <template v-else>
      <div class="elearning-right-side__price-wrapper">
        <template v-if="get(info, 'price.discount', 0)">
          <b class="elearning-right-side__price text-error"
            >{{ get(info, "price.discount", 0) | numeralFormat }}đ</b
          >
          <s class="heading-4 text-gray-2"
            >{{ get(info, "price.original_price", 0) | numeralFormat }}đ</s
          >
        </template>

        <b v-else class="elearning-right-side__price text-error"
          >{{ get(info, "price.original_price", 0) | numeralFormat }}đ</b
        >
      </div>
      <app-button
        color="secondary"
        fullWidth
        square
        class="text-uppercase mb-4"
        @click.prevent="handleAddToCart"
        >Chọn mua</app-button
      >
      <!-- <app-alert class="mb-3" type="warning" size="sm">Bạn đã mua bài giảng này vào ngày 20/10/2019</app-alert> -->
    </template>

    <ul class="info">
      <li>
        <IconBook class="icon" />
        Trình độ: {{ get(program, "level", "") }}
      </li>
      <li>
        <IconSubject class="icon" />
        Môn học: {{ get(program, "subject", "") }}
      </li>
      <li>
        <IconLessons class="icon" />
        Số bài giảng: {{ get(program, "lessons", 0) }} bài
      </li>
      <li>
        <IconClock class="icon" />
        Thời lượng: {{ get(program, "duration", 0) }} phút
      </li>
      <li>
        <IconEye class="icon" />Xem được trên máy tính, điện thoại, tablet
      </li>
    </ul>
    <hr />
    <div class="my-3 d-flex">
      <a class="color-primary d-flex-center">
        <IconShare class="fill-primary mr-2" />Chia sẻ
      </a>
      <a class="color-red ml-auto d-flex-center">
        <IconHeart class="fill-red mr-2" />Yêu thích
      </a>
    </div>
    <PaymentModal :show="showModalPayment"
                  :fail="AddCartFail"
                  @close-modal="handleCloseModal"
    />
  </div>
</template>

<script>
import { get } from "lodash";
import qs from "qs";

import IconShare from "~/assets/svg/icons/share.svg?inline";
import IconHeart from "~/assets/svg/icons/heart.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconSubject from "~/assets/svg/icons/subject.svg?inline";
import IconLessons from "~/assets/svg/icons/lessons.svg?inline";
import IconClock from "~/assets/svg/icons/clock.svg?inline";
import IconEye from "~/assets/svg/icons/eye.svg?inline";

import { mapActions, mapGetters } from "vuex";
import { createOrderPaymentReq } from "~/models/payment/OrderPaymentReq";
import { createHashKeyReq } from "~/models/payment/HashKeyReq";
import { RESPONSE_SUCCESS } from "~/utils/config.js";

import PaymentModal from "~/components/page/payment/PaymentModal"
export default {
  components: {
    IconShare,
    IconHeart,
    IconEye,
    IconClock,
    IconLessons,
    IconSubject,
    IconBook,
    PaymentModal
  },
  props: {
    info: {
      type: Object,
    },
    program: {},
  },

  data() {
    return {
      showModalPayment: false,
      AddCartFail:false

    };
  },

  computed: {
    ...mapGetters("cart", ["cartCheckout"]),
  },

  methods: {
    get,

    ...mapActions("cart", ["cartAdd"]),

    handleAddToCart() {
      console.log("[handleAddToCart]", this.info);
      this.cartAdd({ elearning_id: this.info.id }).then(result => {
        console.log("[handleAddToCart] cartAdd", result);
        if(result.success){
          this.showModalPayment = true;
        }
        else{
          this.showModalPayment = true;
          this.AddCartFail = true;
        }
      });
    },
    handleCloseModal(){
      this.showModalPayment = false
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-right-side.scss";
</style>
