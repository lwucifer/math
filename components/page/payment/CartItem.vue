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
import { get } from "lodash";
import { getDeviceID } from "~/utils/common";

export default {
  name: "CartItem",

  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    ...mapActions("cart", ["cartDelete"]),
    ...mapActions("cart", ["cartList"]),

    deleteCartItem() {
      const elearning_id = get(this, "item.elearning_id", "");
      this.cartDelete(elearning_id).then((res) => {
        if (get(res, "success", false)) {
          this.$toasted.success(get(res, "message", "Thành công"));
          this.cartList();
          return;
        }
        this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
      });
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/payment/_payment.scss";
</style>
