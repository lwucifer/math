<template>
  <div class="auth auth-forgot">
    <div id="label-verify-phone"></div>
    <div class="auth__main">
      <h3>Quên mật khẩu?</h3>
      <div class="auth_content mt-5">
        <app-input
          :message="messageErrorForgot"
          :error="errorForgot"
          type="text"
          v-model="email"
          placeholder="Nhập số điện thoại hoặc email"
          :validate="validateForgot"
          @input="hanldeEmail"
        />
        <app-button
          color="primary"
          square
          fullWidth
          @click="hanldeShowModalOTP"
          class="mb-3"
        >Khôi phục mật khẩu</app-button>
      </div>
    </div>
    <app-modal
      centered
      :width="400"
      :component-class="{ 'auth-modal': true }"
      v-if="modalConfirmEmail"
    >
      <!-- <h3 class="color-primary" slot="header">Đăng ký thành công</h3> -->

      <div slot="content">
        <p class="line-height-2">
          <br />Vui lòng xác thực tài khoản qua email
          <br />
          <span class="color-primary">{{this.email}}</span>
        </p>
        <n-link
          :to="'/auth/signin'"
          class="color-white btn btn--size-md btn--full-width btn--color-primary btn--square"
        >Xác thực tài khoản</n-link>
      </div>
    </app-modal>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import {
  createResetWithPhone,
  createResetWithEmail
} from "../../../models/auth/Forgot";
import { formatPhoneNumber } from "~/utils/validations";
import firebase from "@/services/firebase/FirebaseInit";
import { ERRORS } from "~/utils/error-code";

export default {
  components: {},

  data() {
    return {
      phone: "",
      email: "",
      password: "",
      error: false,
      showModalOTP: false,
      otp: "",
      modalConfirmEmail: false,
      errorRespon: false,
      messageErrorForgot: "",
      errorForgot: false,
      validateForgot: ""
    };
  },

  async mounted() {
    await this.$recaptcha.init();

    // Start Firebase invisible reCAPTCHA verifier
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
  },

  methods: {
    ...mapActions("auth", ["resetPasswordRequest", "sendotp"]),
    hanldeEmail() {
      this.errorForgot = false;
      this.validateForgot = "";
      this.messageErrorForgot = "";
    },
    async resetPass() {
      try {
        const token = await this.$recaptcha.execute("login");
        console.log("ReCaptcha token:", token);
        const checkText = this.email.includes("@");
        let resetModel = createResetWithEmail(this.email, token);
        const doAdd = this.resetPasswordRequest(resetModel).then(result => {
          if (result.success == true) {
            this.modalConfirmEmail = true;
          } else {
            this.showErrorForgot(result);
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    },
    hanldeShowModalOTP() {
      if (!this.email.includes("@")) {
        const data = {
          phone: `+${formatPhoneNumber(this.email)}`,
          appVerifier: window.recaptchaVerifier
        };
        this.sendotp(data).then(result => {
          console.log("result huydv", result);
          if (!result.code) {
            console.log("result huydv11111", result);
            this.$router.push(`/auth/forgot/changepass?phone=${this.email}`);
          } else {
            this.errorForgot = true;
            if (result && result.code == "auth/invalid-phone-number") {
              this.messageErrorForgot = "Số điện thoại bạn nhập không đúng";
            } else {
              this.messageErrorForgot = "Có lỗi. Xin vui lòng thử lại";
            }
          }
        });
      } else {
        this.resetPass();
      }
    },
    showErrorForgot(error) {
      this.errorForgot = true;
      let message = "";
      switch (error.code) {
        case ERRORS.REGISTER.REQUIRED:
          message =
            "Invalid parameter. Required: email or phone, g_recaptcha_response, password. verify_token is required if register by phone number";
          break;
        case ERRORS.FORGOT_PASSWORD.USER_NOT_FOUND:
          message = "User not found";
          break;
        default:
          message = "Đã có lỗi xảy ra. Vui lòng thử lại sau";
          break;
      }
      this.messageErrorForgot = message;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>