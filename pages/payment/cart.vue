<template>
  <div class="container">
    <div class="row" v-if="get(cartCheckout, 'orders.length', 0)">
      <div class="col-md-8 bg-white py-3 px-4">
        <h6 class="text-primary">Giỏ hàng</h6>
        <div
          class="mt-3"
          v-for="(item, index) in carts"
          :key="index"
        >
          <CartItem :item="item" />
        </div>
      </div>
      <div class="col-md-4">
        <CartSideRight />
      </div>
    </div>
    <div class="bg-white py-3 px-4" v-else>
      <div class="d-flex align-items-center mb-4">
        <h4>Giỏ hàng</h4>
        <span class="text-gray">(0 sản phẩm)</span>
      </div>
      <div class="text-center my-4">
        <img src="~assets/images/payment/undraw_empty_xct9 (1) 1.png" />
        <p class="my-4">Không có sản phẩm nào trong giỏ hàng của bạn.</p>
        <app-button square to="/elearning" nuxt>Tiếp tục mua hàng</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CartSideRight from "~/components/page/payment/CartSideRight";
import CartItem from "~/components/page/payment/CartItem";
import { get } from "lodash";

export default {
  name: "ShoppingCart",

  components: {
    CartSideRight,
    CartItem,
  },

  methods: {
    ...mapActions("cart", ["cartList"]),
    get
  },

  computed: {
    ...mapGetters("cart", ["cartCheckout"]),
    ...mapState(`cart`, { carts: "carts" }),
  },

  created() {
    console.log(this.carts);
  },

  mounted() {
    this.cartList();
  },
};
</script>

<style></style>
