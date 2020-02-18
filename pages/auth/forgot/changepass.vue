<template>
  <div class="auth auth-forgot">
    <div id="label-verify-phone"></div>
    <ChangePassEmail v-show="checkEmail" />
    <ChangePassPhone v-show="!checkEmail" />
    <!-- <div class="auth__main">
      <h3>Quên mật khẩu?</h3>
      <div class="auth_content mt-5">
        <app-input
          v-if="!checkEmail"
          maxlength="6"
          type="text"
          v-model="otp"
          placeholder="Nhập mã OTP"
          :error="$v.otp.$invalid"
          :message="errorMessage.otp"
          :validate="validateProps.otp"
          @input="handleOtp"
        />
        <app-input
          type="password"
          v-model="password"
          placeholder="Nhập mật khẩu mới"
          :error="$v.password.$invalid || validate.password"
          :message="errorMessage.password"
          :validate="validateProps.password"
          autocomplete="new-password"
          @input="handlePassword"
        />
        <app-input
          type="password"
          v-model="coPassword"
          placeholder="Xác nhận mật khẩu"
          :error="$v.coPassword.$invalid || validate.coPassword"
          :message="errorMessage.coPassword"
          :validate="validateProps.coPassword"
          autocomplete="new-password"
          class="mb-2"
          @input="handleCoPassword"
        />
        <p class="color-red text-center full-width" v-if="errorRespon">{{messageErrorChange}}</p>
        <app-button
          color="primary"
          square
          fullWidth
          @click="acceptResetPass"
          class="mb-3 mt-4"
          :disabled="disabledBtnForgot"
        >Xác nhận</app-button>
        <a
          v-if="!checkEmail"
          @click="sendOTP"
          :class="countDown === 0 ? '' : 'disable'"
          class="btn-send-otp"
    >Gửi lại mã xác thực ({{countDown}}s)</a>-->
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import {
  createResetPassWithPhone,
  createResetPassWithEmail
} from "../../../models/auth/Forgot";
import { formatPhoneNumber, validatePassword } from "~/utils/validations";
import { ERRORS } from "../../../utils/error-code";
import firebase from "@/services/firebase/FirebaseInit";
import ChangePassEmail from "~/components/page/auth/forgot/ChangePassEmail";
import ChangePassPhone from "~/components/page/auth/forgot/ChangePassPhone";

export default {
  components: {
    ChangePassEmail,
    ChangePassPhone
  },

  data() {
    return {};
  },
  async asyncData({ store, query }) {
    return { checkEmail: query.email ? true : false };
  },

  async mounted() {
    await this.$recaptcha.init();

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "label-verify-phone",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("RecaptchaVerifier resolved");
        }
      }
    );
  }

  // methods: {
  //   ...mapActions("auth", ["forgotPassword", "verifiOtp", "sendotp"]),
  //   async acceptResetPass() {
  //     try {
  //       const token = await this.$recaptcha.execute("resetpass");
  //       console.log("ReCaptcha token:", token);
  //       if (!this.checkEmail) {
  //         debugger;
  //         await this.verifiOtp(this.otp).then(result => {
  //           console.log("result huydv", result);
  //           if (result && result.user) {
  //             this.verify_token = result.user.ma;
  //             debugger;
  //             const resetPassModelPhone = createResetPassWithPhone(
  //               `+${formatPhoneNumber(this.phone)}`,
  //               this.verify_token,
  //               this.password,
  //               token
  //             );
  //             const doAdd = this.forgotPassword(resetPassModelPhone).then(
  //               res => {
  //                 if (res.success == true) {
  //                   this.$router.push("/auth/signin");
  //                 } else {
  //                 }
  //               }
  //             );
  //           } else {
  //             this.errorRespon = true;
  //             if (result && result.code == "auth/invalid-verification-code") {
  //               this.messageErrorChange = "Mã OTP bạn nhập không đúng";
  //             } else if (result && result.code == "auth/code-expired") {
  //               this.messageErrorChange = "Mã OTP của bạn nhập đã hết hạn";
  //             } else {
  //               this.messageErrorChange = "Có lỗi. Xin vui lòng thử lại";
  //             }
  //           }
  //         });
  //       } else {
  //         const resetPassModelEmail = createResetPassWithEmail(
  //           this.email,
  //           this.code,
  //           this.password,
  //           token
  //         );
  //         const doAdd = this.forgotPassword(resetPassModelEmail).then(
  //           result => {
  //             if (result.success == true) {
  //               this.$router.push("/auth/signin");
  //             } else {
  //             }
  //           }
  //         );
  //       }
  //     } catch (error) {
  //       console.log("Login error:", error);
  //     }
  //   },
  //   handleOtp() {
  //     this.errorRespon = false;
  //     this.otp = this.otp.replace(/\D/g, "");
  //     this.validateProps.otp = "";
  //     if (!this.$v.otp.required) {
  //       this.validateProps.otp = 2;
  //       this.errorMessage.otp = "Trường này là bắt buộc";
  //     } else if (!this.$v.otp.minLength) {
  //       this.validateProps.otp = 2;
  //       this.errorMessage.otp = "Mã OTP có 6 ký tự";
  //     } else {
  //       this.validateProps.otp = 1;
  //     }
  //   },
  //   handlePassword(_password) {
  //     this.errorRespon = false;
  //     this.validate.password = true;
  //     this.validateProps.password = "";
  //     if (!this.$v.password.required) {
  //       this.validateProps.password = 2;
  //       this.errorMessage.password = "Trường này là bắt buộc";
  //     } else if (validatePassword(_password)) {
  //       this.validateProps.password = 1;
  //       this.validate.password = false;
  //     } else if (!validatePassword(_password)) {
  //       this.validateProps.password = 2;
  //       this.errorMessage.password =
  //         "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái in hoa, thường và 1 chữ số";
  //     }
  //   },
  //   handleCoPassword() {
  //     this.errorRespon = false;
  //     if (!this.$v.coPassword.required) {
  //       this.validateProps.coPassword = 2;
  //       this.errorMessage.coPassword = "Trường này là bắt buộc";
  //     } else if (!this.$v.coPassword.sameAsPassword) {
  //       this.validateProps.coPassword = 2;
  //       this.errorMessage.coPassword = "Xác nhận mật khẩu không khớp";
  //     } else {
  //       this.validateProps.coPassword = 1;
  //     }
  //   },
  //   sendOTP() {
  //     const that = this;
  //     const data = {
  //       phone: `+${formatPhoneNumber(this.phone)}`,
  //       appVerifier: window.recaptchaVerifier
  //     };
  //     this.sendotp(data);
  //     if (that.countDown === 0) {
  //       that.countDown = that.countDownDefault;
  //       that.countDownTimer();
  //     }
  //   },
  //   countDownTimer() {
  //     const that = this;
  //     if (that.countDown > 0) {
  //       setTimeout(() => {
  //         that.countDown -= 1;
  //         that.countDownTimer();
  //       }, 1000);
  //     }
  //   }
  // },

  // created() {
  //   this.countDownTimer();
  // }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>