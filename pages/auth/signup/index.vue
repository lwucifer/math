<template>
  <div class="auth auth-signin">
    <div id="label-verify-phone"></div>
    <div class="auth__main">
      <h3>Đăng ký</h3>
      <div class="auth__nav">
        <a :class="byEmail ? '' : 'active'" @click="tabPhone">Số điện thoại</a>
        <a :class="byEmail ? 'active' : ''" @click="tabEmail">Email</a>
      </div>
      <div class="auth_content">
        <app-input v-if="byEmail" type="text" v-model="email" placeholder="Email" />
        <app-input v-else type="text" v-model="phone" placeholder="Số điện thoại" />
        <app-input type="password" v-model="password" placeholder="Mật khẩu" />
        <app-input type="text" v-model="fullname" placeholder="Họ và tên" />
      </div>
      <app-button color="primary" square fullWidth @click="hanldeShowModalOTP">Đăng ký</app-button>
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

export default {
  components: {
    IconFacebook,
    IconGoogle
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
      verify_token: ""
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
    ...mapActions("auth", ["register", "sendotp", "status", "verifiOtp"]),
    async submitRegister() {
      try {
        const token = await this.$recaptcha.execute("register");
        console.log("ReCaptcha token:", token);
        let registerModel = !this.byEmail
          ? createSignupWithPhone(
              formatPhoneNumber(this.phone),
              this.password,
              this.fullname,
              token,
              this.verify_token
            )
          : createSignupWithEmail(
              this.email,
              this.password,
              this.fullname,
              token
            );
        debugger;
        const doAdd = this.register(registerModel).then(result => {
          if (result.success == true) {
            this.$router.push("/auth/signin");
          } else {
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    },
    acceptOTP() {
      this.verifiOtp(this.otp).then(result => {
        console.log("result huydv", result);
        if (result) {
          this.verify_token = result.user.ma;
          console.log("result huydv11111", result);
          this.submitRegister();
        }
      });
    },
    async hanldeShowModalOTP() {
      if (this.phone != "" && this.password != "" && this.fullname != "") {
        const tokenCheckPhone = await this.$recaptcha.execute("status");
        const dataChecKPhone = {
          phone: formatPhoneNumber(this.phone),
          g_recaptcha_response: tokenCheckPhone
        };
        const doAdd = this.status(dataChecKPhone).then(result => {
          if (result.data == true) {
          } else {
            this.showModalOTP = true;
            const data = {
              phone: formatPhoneNumber(this.phone),
              appVerifier: window.recaptchaVerifier
            };
            this.sendotp(data);
            // .then(result => {
            //   console.log("result huydv", result);
            //   if (result) {
            //     console.log("result huydv11111", result);
            //   }
            // });
          }
        });
      } else {
        this.submitRegister();
      }
    },
    tabPhone() {
      (this.byEmail = false), (this.password = ""), (this.fullname = "");
    },
    tabEmail() {
      (this.byEmail = true), (this.password = ""), (this.fullname = "");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>