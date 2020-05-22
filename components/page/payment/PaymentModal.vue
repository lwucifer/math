<template>
  <div class="modal_payment" v-if="fail">
    <button class="btn-close-modal" @click.prevent="$emit('close-modal')">
      <IconClose2 />
    </button>
    <div class="d-flex align-items-center">
      <IconCloseOutline class="mr-2 fill-secondary" />
      <span>Thêm vào giỏ hàng thất bại</span>
    </div>
    <app-button
      square
      class="mt-4 btn-view-cart"
      @click.prevent="$router.push('/elearning')"
      >Tiếp tục mua sắm</app-button
    >
  </div>
  <div class="modal_payment" v-else>
    <button class="btn-close-modal" @click.prevent="$emit('close-modal')">
      <IconClose2 />
    </button>
    <div class="d-flex align-items-center">
      <IconCheckCircle24px class="mr-2 fill-primary" />
      <span>Thêm giỏ hàng thành công</span>
    </div>
    <app-button
      square
      class="mt-4 btn-view-cart"
      @click.prevent="$router.push('/payment/cart')"
      >Xem giỏ hàng và thanh toán</app-button
    >
  </div>
</template>

<script>
import IconCheckCircle24px from '~/assets/svg/v2-icons/check_circle_24px.svg?inline';
import IconCloseOutline from '~/assets/svg/icons/Close-outline.svg?inline';
import IconClose2 from "~/assets/svg/icons/close2.svg?inline";

export default {
  components: {
    IconCheckCircle24px,
    IconCloseOutline,
    IconClose2,
  },
  props: {
    fail: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.modal_payment {
  background: white;
  width: 273px;
  padding:10px;
  position: fixed;
  z-index: 120;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  top: 85px;
  right: 10%;
   &::after {
      content: "";
      position: absolute;
      top: -12px;  /* At the top of the tooltip */
      right:  15%;
      margin-left: -6px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent white transparent;
      display: block;
      z-index: 12px;
  }
  // visibility: hidden;
  .btn-close-modal {
    top: 7%;
    right: 5%;
    position: absolute;
  }
  .btn-view-cart{
      font-size: 14px;
  }
}
@-webkit-keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 10%;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 10%;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    top: 10%;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    top: 10%;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}
</style>
