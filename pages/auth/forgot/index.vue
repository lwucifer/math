<template>
  <div class="auth auth-forgot">
    <div id="label-verify-phone"></div>
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
        <app-button
          color="primary"
          square
          fullWidth
          @click="hanldeShowModalOTP"
          class="mb-3"
        >Khôi phục mật khẩu</app-button>
      </div>
    </div>
    <app-modal centered :width="306" :component-class="{ 'auth-modal': true }" v-if="showModalOTP">
      <h3 class="color-primary" slot="header">
        Xác thực tài khoản
        <a class="btn-close" @click="showModalOTP = false">X</a>
      </h3>

      <div slot="content">
        <div class="form-group_border-bottom">
          <input type="text" v-model="otp" class="form-control ml-0" placeholder="Nhập mã OTP" />
        </div>
        <app-button color="primary" square fullWidth @click="acceptOTP">Xác nhận</app-button>
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

export default {
  components: {},

  data() {
    return {
      phone: "",
      email: "",
      password: "",
      error: false,
      showModalOTP: false,
      otp: ""
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
    ...mapActions("auth", ["resetPasswordRequest", "sendotp", "verifiOtp"]),
    async resetPass() {
      try {
        const token = await this.$recaptcha.execute("login");
        console.log("ReCaptcha token:", token);
        const checkText = this.email.includes("@");
        let resetModel = createResetWithEmail(this.email, token);
        const doAdd = this.resetPasswordRequest(resetModel).then(result => {
          if (result.success == true) {
            // this.$router.push("/auth/signin");
          } else {
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
          if (result) {
            console.log("result huydv11111", result);
            this.$router.push(
              `/auth/forgot/changepass?phone=${formatPhoneNumber(this.email)}`
            );
          }
        });
      } else {
        this.resetPass();
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>