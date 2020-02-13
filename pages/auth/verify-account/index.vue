<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <h3 v-if="activeAccount">Mở khóa tài khoản thành công</h3>
      <h3 v-else>Link mở khóa hết hạn</h3>
    </div>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";

export default {
  components: {},

  data() {
    return {};
  },
  async asyncData({ store, query }) {
    const action = await store.dispatch("auth/verifyEmail", {
      email: query.email ? query.email : "",
      code: query.code ? query.code : ""
    });

    return {
      activeAccount: action.success ? true : false
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>