<template>
  <div class="wrap-cart-item_payment">
    <span>
      <img src="https://picsum.photos/110/66" />
    </span>
    <div class="ml-3">
      <p>{{ item.elearning_name }}</p>
      <p class="my-2 text-disabled">{{ item.teacher_name }}</p>
      <p class="text-secondary">
        <a @click.prevent="deleteCartItem">Xóa</a>
      </p>
    </div>
    <div class="ml-auto">
      <h6 class="text-right">{{ item.price }} đ</h6>
      <div class="d-flex mt-3">
        <span class="price-cart_payment">{{ item.original_price }}đ</span>
        <h6 class="ml-2">{{ item.discount }}%</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CartItem",

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    ...mapActions("cart", ["cartDelete"]),

    deleteCartItem() {
      console.log("[deleteCartItem]", this.item);
      this.cartDelete(this.item.elearning_id);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>
