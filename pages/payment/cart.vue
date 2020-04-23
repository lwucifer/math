<template>
  <div class="container">
      <div class="row">
          <div class="col-md-8 bg-white py-3 px-4">
              <h6 class="text-primary">Giỏ hàng</h6>
              <div class="mt-3"  v-for="index in 3" :key="index">
                  <CartItem/>
              </div>
          </div>
          <div class="col-md-4">
                <CartSideRight/>
          </div>
      </div>
  </div>
</template>

<script>
import CartSideRight from "~/components/page/payment/CartSideRight"
import CartItem from "~/components/page/payment/CartItem"
export default {
    components:{
        CartSideRight,
        CartItem
    }
}
</script>

<style>
@import "~/assets/scss/components/payment/_payment.scss";
</style>