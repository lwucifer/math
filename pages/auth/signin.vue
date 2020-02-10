<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <h3>Đăng nhập</h3>
      <div class="auth__nav">
        <a :class="byEmail ? '' : 'active'" @click="byEmail = false">Số điện thoại</a>
        <a :class="byEmail ? 'active' : ''" @click="byEmail = true">Email</a>
      </div>
      <div class="auth_content">
        <div class="form-group" v-if="byEmail">
          <input type="text" v-model="email" class="form-control" placeholder="Email" />
        </div>
        <div class="form-group" v-else>
          <input type="number" v-model="phone" class="form-control" placeholder="Số điện thoại" />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="form-control" placeholder="Mật khẩu" />
          <p class="color-red text-center full-width mt-3" v-if="error">Email hoặc mật khẩu không chính xác.</p>
        </div>
      </div>

      <app-button color="primary" square fullWidth @click="login" class="mb-3">Đăng nhập</app-button>
      <n-link :to="'/auth/forgot'" class="color-blue text-decoration-none">Quên mật khẩu?</n-link>
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
      error: false,
      byEmail: false
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),
    login() {
      this.error = true;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>