<template>
  <div class="auth auth-forgot">
    <div class="auth__main">
      <h3>Quên mật khẩu?</h3>
      <div class="auth_content mt-5">
        <app-input
          message="Tài khoản không tồn tại"
          type="text"
          v-model="otp"
          placeholder="Nhập mã OTP"
          :validate="error ? 2 : 0"
        />
        <app-input
          message="Tài khoản không tồn tại"
          type="password"
          v-model="password"
          placeholder="Nhập mật khẩu mới"
          :validate="error ? 2 : 0"
        />
        <app-input
          message="Tài khoản không tồn tại"
          type="password"
          v-model="coPassword"
          placeholder="Xác nhận mật khẩu"
          :validate="error ? 2 : 0"
        />
        <app-button color="primary" square fullWidth @click="acceptResetPass" class="mb-3">Xác nhận</app-button>
        <!-- <a
          @click="sendOTP"
          :class="countDown === 0 ? '' : 'disable'"
          class="btn-send-otp"
        >Gửi lại mã xác thực ({{countDown}}s)</a>-->
      </div>
    </div>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import {
  createResetPassWithPhone,
  createResetPassWithEmail
} from "../../../models/auth/Forgot";
import { formatPhoneNumber } from "~/utils/validations";

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
      email: "",
      verify_token: ""
    };
  },
  async mounted() {
    await this.$recaptcha.init();
  },

  computed: {
    ...mapState("auth", ["firebaseToken"])
  },

  methods: {
    ...mapActions("auth", ["forgotPassword", "verifiOtp"]),
    async acceptResetPass() {
      const token = await this.$recaptcha.execute("resetpass");
      console.log("ReCaptcha token:", token);
      if (this.otp != "") {
        await this.verifiOtp(this.otp).then(result => {
          console.log("result huydv", result);
          if (result) {
            this.verify_token = result.user.ma;
            try {
              debugger;
              let resetPassModel = createResetPassWithPhone(
                formatPhoneNumber(this.email),
                this.verify_token,
                this.password,
                token
              );
              // : createResetPassWithEmail(this.email, this.password, token);
              const doAdd = this.forgotPassword(resetPassModel).then(result => {
                if (result.success == true) {
                  this.$router.push("/auth/signin");
                } else {
                }
              });
            } catch (error) {
              console.log("Login error:", error);
            }
            // console.log("result huydv11111", result);
          }
        });
      }
      // try {
      //   debugger;
      //   const token = await this.$recaptcha.execute("resetpass");
      //   console.log("ReCaptcha token:", token);
      //   const checkText = this.email.includes("@");
      //   let resetPassModel = !checkText
      //     ? createResetPassWithPhone(
      //         formatPhoneNumber(this.email),
      //         this.firebaseToken,
      //         this.password,
      //         token
      //       )
      //     : createResetPassWithEmail(this.email, this.password, token);
      //   const doAdd = this.forgotPassword(resetPassModel).then(result => {
      //     if (result.success == true) {
      //       this.$router.push("/auth/signin");
      //     } else {
      //     }
      //   });
      // } catch (error) {
      //   console.log("Login error:", error);
      // }
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

  created() {
    this.countDownTimer();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>