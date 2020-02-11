<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <h3>Đăng ký thành công</h3>
      <div class="auth_content mt-4 mb-4 text-center">
        <p class="line-height-2">
            Tài khoản của bạn đã đăng ký thành công!<br>
            Vui lòng xác thực tài khoản qua email<br> 
            <span class="color-primary">datpt262@gmail.com</span>
        </p>
      </div>
      <app-button color="primary" square fullWidth @click="login">
          Xác thực tài khoản
      </app-button>
    </div>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";

export default {
  components: {},

  data() {
    return {
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),
    login() {
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>