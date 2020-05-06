<template>
  <div class="elearning-right-side body-3">
    <div class="elearning-right-side__img">
      <img
        class="d-block w-100"
        :src="get(info, 'avatar.medium', null)"
        :alt="get(info, 'name', '')"
      />
    </div>

    <template v-if="get(info, 'elearning_price.free', false)">
      <div class="elearning-right-side__price-wrapper">
        <b class="heading-2 text-primary ml-auto">Miễn phí</b>
      </div>
    </template>

    <template v-else>
      <div class="elearning-right-side__price-wrapper">
        <template v-if="get(info, 'elearning_price.discount', 0)">
          <s class="heading-4 text-gray">
            {{
              get(info, "elearning_price.original_price", 0) | numeralFormat
            }}đ
          </s>
          <b class="heading-2 text-primary"
            >{{ get(info, "elearning_price.price", 0) | numeralFormat }}đ</b
          >
        </template>

        <b v-else class="heading-2 text-primary ml-auto">
          {{ get(info, "elearning_price.original_price", 0) | numeralFormat }}đ
        </b>
      </div>
    </template>

    <app-button
      v-if="
        get(info, 'is_study', false) || get(info, 'elearning_price.free', false)
      "
      fullWidth
      class="text-uppercase body-2 font-weight-bold mb-4"
      @click="handleStudy"
      >Tham gia học</app-button
    >
    <app-button
      v-else
      fullWidth
      class="text-uppercase body-2 font-weight-bold mb-4"
      @click.prevent="handleAddToCart"
      >Chọn mua</app-button
    >

    <app-alert
      v-if="get(info, 'is_study', false)"
      class="mb-3"
      type="warning"
      size="sm"
      >Bạn đã mua bài giảng này vào ngày
      {{ get(info, "join_date", "") }}</app-alert
    >

    <ul class="info">
      <li>
        <IconPersonOutline class="icon" />
        Trình độ: {{ get(info, "level.name", "") }}
      </li>
      <li>
        <IconBorderColor class="icon" />
        Môn học: {{ get(info, "subject.name", "") }}
      </li>
      <li>
        <IconInsertComment class="icon" />
        Số bài giảng: {{ get(info, "lessons", 0) }} bài
      </li>
      <li>
        <IconTimer class="icon" />
        Thời lượng: {{ get(info, "duration", "") }}
      </li>
      <li>
        <IconRemoveRedEye class="icon" />Xem được trên máy tính, điện thoại,
        tablet
      </li>
    </ul>

    <app-divider class="elearning-right-side__divider my-0" />

    <div class="py-3 d-flex">
      <a class="text-info d-flex-center">
        <IconBxsShare class="icon subheading mr-2" />Chia sẻ
      </a>
      <a class="text-primary ml-auto d-flex-center">
        <IconFavorite
          v-if="info && info.is_favourite"
          class="icon subheading mr-2"
        />
        <IconFavoriteBorder v-else class="icon subheading mr-2" />
        Yêu thích
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
import IconFavoriteBorder from "~/assets/svg/v2-icons/favorite_border_24px.svg?inline";
import IconFavorite from "~/assets/svg/v2-icons/favorite_24px.svg?inline";
import IconPersonOutline from "~/assets/svg/v2-icons/person_outline_24px.svg?inline";
import IconBorderColor from "~/assets/svg/v2-icons/border_color_24px.svg?inline";
import IconInsertComment from "~/assets/svg/v2-icons/insert_comment_24px.svg?inline";
import IconTimer from "~/assets/svg/v2-icons/timer_24px.svg?inline";
import IconRemoveRedEye from "~/assets/svg/v2-icons/remove_red_eye_24px.svg?inline";
import IconBxsShare from "~/assets/svg/icons/bxs-share.svg?inline";

import { mapActions, mapGetters } from "vuex";
import { createOrderPaymentReq } from "~/models/payment/OrderPaymentReq";
import { createHashKeyReq } from "~/models/payment/HashKeyReq";
import { RESPONSE_SUCCESS } from "~/utils/config.js";
import JoinService from "~/services/elearning/Join";

import PaymentModal from "~/components/page/payment/PaymentModal";
export default {
  components: {
    IconShare,
    IconFavoriteBorder,
    IconFavorite,
    IconPersonOutline,
    IconBorderColor,
    IconInsertComment,
    IconTimer,
    IconRemoveRedEye,
    IconBxsShare,
    PaymentModal,
  },
  props: {
    info: {
      type: Object,
      default: () => ({}),
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

  created() {
    console.log(this.info);
  },

  methods: {
    get,

    async handleStudy() {
      const elearning_id = get(this, "info.id", "");

      if (!get(this, "info.elearning_price.free", false)) {
        this.$router.push(`/elearning/${elearning_id}/study`);
        return;
      }

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
