<template>
  <div class="auth auth-forgot">
    <div class="auth__main">
      <h3>Quên mật khẩu?</h3>
      <div class="auth_content mt-5">
        <app-input
          message="Tài khoản không tồn tại"
          type="text"
          v-model="email"
          placeholder="Nhập số điện thoại hoặc email"
          :validate="error ? 2 : 0"
        />
        <app-button color="primary" square fullWidth @click="login" class="mb-3">Khôi phục mật khẩu</app-button>
      </div>
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
      phone: "",
      email: "",
      password: "",
      error: false
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),
    login() {
      this.error = this.email;
      console.log(this.email);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>