<template>
  <div>
    <div class="auth_content mb-4">
      <app-input
        type="text"
        v-model="phone"
        placeholder="Số điện thoại"
        :error="$v.phone.$invalid"
        :message="errorMessage.phone"
        :validate="validateProps.phone"
        @input="handlePhone"
      />
      <app-input
        type="password"
        v-model="password"
        placeholder="Mật khẩu"
        :error="$v.password.$invalid || validate.password"
        :message="errorMessage.password"
        :validate="validateProps.password"
        autocomplete="new-password"
        @input="handlePassword"
      />
      <app-input
        type="text"
        v-model="fullname"
        placeholder="Họ và tên"
        class="mb-2"
        :error="$v.fullname.$invalid"
        :message="errorMessage.fullname"
        :validate="validateProps.fullname"
        @input="handleFullname"
      />
      <p class="color-red text-center full-width" v-if="errorRespon">{{messageErrorRegister}}</p>
    </div>
    <app-button
      color="primary"
      square
      fullWidth
      :disabled="disabledBtnRegister"
      @click.prevent="hanldeShowModalOTP"
    >Đăng ký</app-button>
    <app-modal centered :width="306" :component-class="{ 'auth-modal': true }" v-if="showModalOTP">
      <h3 class="color-primary" slot="header">
        Xác thực tài khoản
        <a class="btn-close" @click="showModalOTP = false">X</a>
      </h3>

      <div slot="content">
        <div class="form-group_border-bottom">
          <input
            type="text"
            v-model="otp"
            maxlength="6"
            class="form-control ml-0"
            placeholder="Nhập mã OTP"
          />
        </div>
        <p class="color-red text-center full-width mt-2" v-if="errorOtp">{{messageErrorOtp}}</p>
        <app-button color="primary" square fullWidth @click="acceptOTP">Xác nhận</app-button>
      </div>
    </app-modal>
    <app-modal
      centered
      :width="400"
      :component-class="{ 'auth-modal': true }"
      v-if="modalConfirmOTP"
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
import { formatPhoneNumber, validatePassword } from "~/utils/validations";
import IconSucessGreen from "~/assets/svg/icons/sucess-green.svg?inline";
import { ERRORS } from "../../../../utils/error-code";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

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
      modalConfirmOTP: "",
      otp: "",
      errorMessage: {
        phone: "",
        password: "",
        fullname: ""
      },
      validateProps: { password: "", phone: "", fullname: "" },
      validate: { password: true },
      errorRespon: false,
      messageErrorRegister: "",
      errorOtp: false,
      messageErrorOtp: ""
    };
  },
  validations: {
    phone: { required, minLength: minLength(10) },
    password: { required },
    fullname: { required, minLength: minLength(8), maxLength: maxLength(32) }
  },
  computed: {
    disabledBtnRegister() {
      const btnDisabled = this.$v.$invalid || this.validate.password;
      return btnDisabled;
    }
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
            this.modalConfirmOTP = true;
          } else {
            this.showErrorWhenRegister(result);
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
            const data = {
              phone: `+${formatPhoneNumber(this.phone)}`,
              appVerifier: window.recaptchaVerifier
            };
            this.sendotp(data).then(result => {
              if (!result.code) {
                this.showModalOTP = true;
              } else {
                this.errorRespon = true;
                this.messageErrorRegister =
                  "Số điện thoại bạn nhập không chính xác";
              }
            });
          }
          // else {
          //   this.errorRespon = true;
          //   this.messageErrorRegister = "Số điện thoại bạn nhập đã đăng ký";
          // }
        });
      }
    },
    async acceptOTP() {
      await this.verifiOtp(this.otp).then(result => {
        console.log("result huydv", result);
        if (result && result.user) {
          this.verify_token = result.user ? result.user.ma : "";
          console.log("result huydv11111", result);
          this.submitRegister();
        } else {
          this.errorOtp = true;
          if (result.code == "auth/invalid-verification-code") {
            this.messageErrorOtp = "Mã OTP bạn nhập không đúng";
          } else if (result.code == "auth/code-expired") {
            this.messageErrorOtp = "Mã OTP của bạn nhập đã hết hạn";
          } else {
            this.messageErrorOtp = "Có lỗi. Xin vui lòng thử lại";
          }
        }
      });
    },
    handlePhone() {
      this.errorRespon = false;
      this.phone = this.phone.replace(/\D/g, "");
      this.validateProps.phone = "";
      if (!this.$v.phone.required) {
        this.validateProps.phone = 2;
        this.errorMessage.phone = "Trường này là bắt buộc";
      } else if (!this.$v.phone.minLength) {
        this.validateProps.phone = 2;
        this.errorMessage.phone = "Số bạn nhập không phải là số điện thoại";
      } else {
        this.validateProps.phone = 1;
      }
    },
    handlePassword(_password) {
      this.errorRespon = false;
      this.validate.password = true;
      this.validateProps.password = "";
      if (!this.$v.password.required) {
        this.validateProps.password = 2;
        this.errorMessage.password = "Trường này là bắt buộc";
      } else if (validatePassword(_password)) {
        this.validateProps.password = 1;
        this.validate.password = false;
      } else if (!validatePassword(_password)) {
        this.validateProps.password = 2;
        this.errorMessage.password =
          "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái in hoa, thường và 1 chữ số";
      }
    },
    handleFullname() {
      this.errorRespon = false;
      this.validateProps.fullname = "";
      if (!this.$v.fullname.required) {
        this.validateProps.fullname = 2;
        this.errorMessage.fullname = "Trường này là bắt buộc";
      } else if (!this.$v.fullname.minLength) {
        this.validateProps.fullname = 2;
        this.errorMessage.fullname =
          "Họ và tên phải có ít nhất 8 ký tự và nhiều nhất là 32 ký tự";
      } else if (!this.$v.fullname.maxLength) {
        this.validateProps.fullname = 2;
        this.errorMessage.fullname =
          "Họ và tên phải có ít nhất 8 ký tự và nhiều nhất là 32 ký tự";
      } else {
        this.validateProps.fullname = 1;
      }
    },
    showErrorWhenRegister(error) {
      this.errorRespon = true;
      let message = "";
      switch (error.code) {
        case ERRORS.REGISTER.REQUIRED:
          message =
            "Invalid parameter. Required: email or phone, g_recaptcha_response, password. verify_token is required if register by phone number";
          break;
        case ERRORS.REGISTER.EMAIL_PHONE_USED:
          message = "Email or phone has been used";
          break;
        case ERRORS.REGISTER.PASSWORD_LEAST:
          message =
            "Invalid password. Password must at least 8 characters, include lowercase, uppercase and number";
          break;
        default:
          message = "Something went wrong. Please try again";
          break;
      }
      this.messageErrorRegister = message;
    }
  }
};
</script>

<style lang="scss">
</style>