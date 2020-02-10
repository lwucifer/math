<template>
  <div class="auth auth-forgot">
    <div class="auth__main">
      <h3>Quên mật khẩu?</h3>
      <div class="auth_content mt-5">
        <div class="form-group">
          <input type="text" v-model="otp" class="form-control" placeholder="Nhập mã OTP" />
          <p
            class="font-size-12 color-red text-left full-width mt-2"
            v-if="error"
          >Tài khoản không tồn tại</p>
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="password"
            class="form-control"
            placeholder="Nhập mật khẩu mới"
          />
          <p
            class="font-size-12 color-red text-left full-width mt-2"
            v-if="error"
          >Tài khoản không tồn tại</p>
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="coPassword"
            class="form-control"
            placeholder="Xác nhận mật khẩu"
          />
          <p
            class="font-size-12 color-red text-left full-width mt-2"
            v-if="error"
          >Tài khoản không tồn tại</p>
        </div>
        <app-button color="primary" square fullWidth @click="login" class="mb-3">Xác nhận</app-button>
        <a @click="sendOTP" :class="countDown === 0 ? '' : 'disable'"
         class="btn-send-otp">Gửi lại mã xác thực ({{countDown}}s)</a>
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
      otp: "",
      password: "",
      coPassword: "",
      error: false,
      countDownDefault: 120,
      countDown: 120,
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),
    login() {
      this.error = true;
    },
    sendOTP() {
      const that = this;
      if (that.countDown === 0) {
        that.countDown = that.countDownDefault;
        that.countDownTimer();
      }
    },
    countDownTimer() {
      const that = this;
      if (that.countDown > 0) {
        setTimeout(() => {
          that.countDown -= 1;
          that.countDownTimer();
        }, 1000);
      }
    }
  },

  created () {
      this.countDownTimer();
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>