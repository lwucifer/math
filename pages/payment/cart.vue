<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 bg-white py-3 px-4">
        <h6 class="text-primary">Giỏ hàng</h6>
        <div
          class="mt-3"
          v-for="(item, index) in cartCheckout.orders"
          :key="index"
        >
          <CartItem :item="item" />
        </div>
      </div>
      <div class="col-md-4">
        <CartSideRight />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartSideRight from "~/components/page/payment/CartSideRight";
import CartItem from "~/components/page/payment/CartItem";
export default {
  name: "ShoppingCart",

  components: {
    CartSideRight,
    CartItem
  },

  methods: {
    ...mapActions("cart", ["cartList"])
  },

  computed: {
    ...mapGetters("cart", ["cartCheckout"])
  },

  mounted() {
    this.cartList();
  }
};
</script>

<style></style>
