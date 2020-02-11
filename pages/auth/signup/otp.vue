<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <h3>Xác thực tài khoản</h3>
      <div class="auth_content mt-4">
        <app-input type="text" v-model="otp" placeholder="Nhập mã OTP"/>
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
      otp: "",
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