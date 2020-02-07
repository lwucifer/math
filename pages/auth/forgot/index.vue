<template>
  <div class="auth auth-forgot">
    <div class="auth__main">
      <h3>Quên mật khẩu?</h3>
      <div class="auth_content mt-5">
        <div class="form-group">
          <input
            type="text"
            v-model="email"
            class="form-control"
            :class="error ? 'border-red' : ''"
            placeholder="Nhập số điện thoại hoặc email"
          />
          <p class="font-size-12 color-red text-left full-width mt-2" v-if="error">Tài khoản không tồn tại</p>
        </div>
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
      this.error = true;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>