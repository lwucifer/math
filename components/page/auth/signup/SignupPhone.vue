<template>
  <div>
    <div class="auth_content">
      <app-input type="text" v-model="phone" placeholder="Số điện thoại" />
      <app-input
        type="password"
        v-model="password"
        placeholder="Mật khẩu"
        autocomplete="new-password"
      />
      <app-input type="text" v-model="fullname" placeholder="Họ và tên" />
    </div>
    <app-button
      color="primary"
      type="submit"
      square
      fullWidth
      @click.prevent="hanldeShowModalOTP"
    >Đăng ký</app-button>
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
    <app-modal
      centered
      :width="400"
      :component-class="{ 'auth-modal': true }"
      v-if="modalConfirmOTC"
    >
      <div slot="content">
        <div class="auth_content text-center mb-4">
          <IconSucessGreen class="mt-3 mb-3" />
          <p class="h3">Xác thực tài khoản thành công</p>
        </div>
        <n-link
          :to="'/auth/signin'"
          class="color-white btn btn--size-md btn--full-width btn--color-primary btn--square"
        >Đóng</n-link>
      </div>
    </app-modal>
  </div>
</template>

<script>
import * as actionTypes from "../../../../utils/action-types";
import { mapState, mapActions } from "vuex";
import { createSignupWithPhone } from "../../../../models/auth/Signup";
import { formatPhoneNumber } from "~/utils/validations";
import IconSucessGreen from "~/assets/svg/icons/sucess-green.svg?inline";

export default {
  components: {
    IconSucessGreen
  },
  data() {
    return {
      phone: "",
      password: "",
      fullname: "",
      error: "",
      showModalOTP: false,
      modalConfirmOTC: "",
      otp: ""
    };
  },
  methods: {
    ...mapActions("auth", ["register", "sendotp", "status", "verifiOtp"]),
    async submitRegister() {
      try {
        const token = await this.$recaptcha.execute("register");
        console.log("ReCaptcha token:", token);
        const registerModel = createSignupWithPhone(
          `+${formatPhoneNumber(this.phone)}`,
          this.password,
          this.fullname,
          token,
          this.verify_token
        );
        const doAdd = this.register(registerModel).then(result => {
          if (result.success == true) {
            this.modalConfirmOTC = true;
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    },
    async hanldeShowModalOTP() {
      if (this.phone != "" && this.password != "" && this.fullname != "") {
        const tokenCheckPhone = await this.$recaptcha.execute("status");
        const dataChecKPhone = {
          phone: `+${formatPhoneNumber(this.phone)}`,
          g_recaptcha_response: tokenCheckPhone
        };
        const doAdd = this.status(dataChecKPhone).then(result => {
          if (result.data == false) {
            this.showModalOTP = true;
            const data = {
              phone: `+${formatPhoneNumber(this.phone)}`,
              appVerifier: window.recaptchaVerifier
            };
            this.sendotp(data);
          }
        });
      }
    },
    async acceptOTP() {
      await this.verifiOtp(this.otp).then(result => {
        console.log("result huydv", result);
        if (result) {
          this.verify_token = result.user ? result.user.ma : "";
          console.log("result huydv11111", result);
          this.submitRegister();
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>