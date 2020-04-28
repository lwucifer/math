<template>
  <div class="modal_payment" :class="show ? 'show' : ''" v-if="fail">
    <button class="btn-close-modal" @click.prevent="$emit('close-modal')">
      <IconClose2 />
    </button>
    <IconShoppingCartAlt class="fill-secondary" />
    <span>Thêm sản phẩm vào giỏ hàng không thành công.</span>
  </div>
  <div class="modal_payment" :class="show ? 'show' : ''" v-else>
    <button class="btn-close-modal" @click.prevent="$emit('close-modal')">
      <IconClose2 />
    </button>
    <div class="d-flex align-items-center">
      <IconSuccess class="icon mr-2" />
      <span>Thêm giỏ hàng thành công</span>
    </div>
    <app-button
      square
      class="mt-4"
      @click.prevent="$router.push('/payment/cart')"
      >Xem giỏ hàng và thanh toán</app-button
    >
  </div>
</template>

<script>
import IconSuccess from "~/assets/svg/icons/success.svg?inline";
import IconShoppingCartAlt from "~/assets/svg/design-icons/shopping-cart-alt.svg?inline";
import IconClose2 from "~/assets/svg/icons/close2.svg?inline";
export default {
  components: {
    IconSuccess,
    IconShoppingCartAlt,
    IconClose2,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
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
  padding: 20px;
  position: fixed;
  z-index: 120;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 10%;
  right: 5%;
  visibility: hidden;
  .btn-close-modal {
    top: 7%;
    right: 7%;
    position: absolute;
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
