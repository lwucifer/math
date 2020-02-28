<template>
  <div class="auth auth-signin">
    <div id="label-verify-phone"></div>
    <div class="auth__main">
      <h3>Đăng ký</h3>
      <div class="auth__nav">
        <a :class="byEmail ? '' : 'active'" @click="tabPhone">Số điện thoại</a>
        <a :class="byEmail ? 'active' : ''" @click="tabEmail">Email</a>
      </div>
      <SignupEmail v-show="byEmail" />
      <SignupPhone v-show="!byEmail" />
      <hr class="mt-4 mb-4" />
      <div>
        <p>Đăng ký nhanh với</p>
        <div class="mt-3 mb-15">
          <app-button class="btn-social btn-facebook">
            <IconFacebook class="mr-2" />Facebook
          </app-button>
          <app-button class="btn-social btn-google">
            <IconGoogle class="mr-2" />Google
          </app-button>
        </div>
        <div>
          <span>Đã có tài khoản?</span>
          <n-link :to="'/auth/signin'" class="color-primary bold text-decoration-none">Đăng nhập</n-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconFacebook from "~/assets/svg/icons/facebook.svg?inline";
import IconGoogle from "~/assets/svg/icons/google.svg?inline";
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import firebase from "@/services/firebase/FirebaseInit";
import {
  createSignupWithPhone,
  createSignupWithEmail
} from "../../../models/auth/Signup";
import { formatPhoneNumber } from "~/utils/validations";
import SignupEmail from "~/components/page/auth/signup/SignupEmail";
import SignupPhone from "~/components/page/auth/signup/SignupPhone";

export default {
  components: {
    IconFacebook,
    IconGoogle,
    SignupEmail,
    SignupPhone
  },

  data() {
    return {
      phone: "",
      email: "",
      password: "",
      fullname: "",
      error: false,
      byEmail: false,
      statusValidate: 1,
      showModalOTP: false,
      listQuery: {},
      otp: "",
      verify_token: "",
      modalConfirmEmail: "",
      modalConfirmOTC: ""
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

    // window.recaptchaVerifier.render().then(widgetId => {
    //   window.recaptchaWidgetId = widgetId;
    // });
  },

  methods: {
    tabPhone() {
      (this.byEmail = false), (this.password = ""), (this.fullname = "");
    },
    tabEmail() {
      (this.byEmail = true), (this.password = ""), (this.fullname = "");
    },
    redirectSignin() {
      this.$router.push("/auth/signin");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>