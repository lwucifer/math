<template>
  <div class="elearning-right-side">
    <img
      class="d-block w-100 mb-4"
      :src="get(info, 'avatar.medium', null)"
      :alt="get(info, 'name', '')"
    />

    <template
      v-if="
        get(info, 'elearning_price.free', false) || get(info, 'is_study', false)
      "
    >
      <div class="elearning-right-side__price-wrapper">
        <b
          v-if="get(info, 'free', '')"
          class="elearning-right-side__price text-error"
          >Miễn phí</b
        >
      </div>
      <app-button
        color="secondary"
        fullWidth
        square
        class="text-uppercase mb-4"
        @click="handleStudy"
        >Tham gia học</app-button
      >
    </template>

    <template v-else>
      <div class="elearning-right-side__price-wrapper">
        <template v-if="get(info, 'elearning_price.discount', 0)">
          <b class="elearning-right-side__price text-error"
            >{{ get(info, "elearning_price.price", 0) | numeralFormat }}đ</b
          >
          <s class="heading-4 text-gray-2"
            >{{
              get(info, "elearning_price.original_price", 0) | numeralFormat
            }}đ</s
          >
        </template>

        <b v-else class="elearning-right-side__price text-error"
          >{{
            get(info, "elearning_price.original_price", 0) | numeralFormat
          }}đ</b
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
    <PaymentModal
      v-if="showModalPayment"
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
import JoinService from "~/services/elearning/Join";

import PaymentModal from "~/components/page/payment/PaymentModal";
export default {
  components: {
    IconShare,
    IconHeart,
    IconEye,
    IconClock,
    IconLessons,
    IconSubject,
    IconBook,
    PaymentModal,
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
      AddCartFail: false,
    };
  },

  computed: {
    ...mapGetters("cart", ["cartCheckout"]),
  },

  updated() {
    console.log(this.info);
  },

  methods: {
    get,

    async handleStudy() {
      const elearning_id = get(this, "info.id", "");

      const payload = {
        elearning_id,
      };

      const res = await new JoinService(this.$axios)["add"](payload);

      if (get(res, "success", false)) {
        this.$router.push(`/elearning/${elearning_id}/study`);
        return;
      }

      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },

    ...mapActions("cart", ["cartAdd"]),
    ...mapActions("cart", ["cartList"]),

    handleAddToCart() {
      const elearning_id = get(this, "info.id", "");
      this.cartAdd({ elearning_id }).then((result) => {
        this.cartList();
        this.showModalPayment = true;
        if (!result.success) {
          this.AddCartFail = true;
        }
      });
    },
    handleCloseModal() {
      this.showModalPayment = false;
      this.AddCartFail = false;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-right-side.scss";
</style>
