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
        class="mb-2"
        :error="$v.password.$invalid || validate.password"
        :message="errorMessage.password"
        :validate="validateProps.password"
        autocomplete="new-password"
        @input="handlePassword"
      />
      <p class="color-red text-center full-width" v-if="errorRespon">{{messageErrorLogin}}</p>
    </div>

    <app-button
      color="primary"
      square
      fullWidth
      :disabled="disabledBtnLogin"
      @click.prevent="SubmitLoginPhone"
      class="mb-3"
    >Đăng nhập</app-button>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import { createSigninWithPhone } from "~/models/auth/Signin";
import { formatPhoneNumber, validatePassword } from "~/utils/validations";
import { ERRORS } from "~/utils/error-code";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      phone: "0356235645",
      password: "quangTrung@123",
      error: "",
      errorMessage: {
        phone: "",
        password: ""
      },
      validateProps: { password: "", phone: "" },
      validate: { password: true },
      errorRespon: false,
      messageErrorLogin: ""
    };
  },
  validations: {
    phone: { required, minLength: minLength(10) },
    password: { required }
  },
  computed: {
    disabledBtnLogin() {
      const btnDisabled = this.$v.$invalid || this.validate.password;
      return btnDisabled;
    }
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async SubmitLoginPhone() {
      try {
        const token = await this.$recaptcha.execute("login");
        console.log("ReCaptcha token:", token);
        const loginModel = createSigninWithPhone(
          `+${formatPhoneNumber(this.phone)}`,
          this.password,
          token
        );
        const doAdd = this.login(loginModel).then(result => {
          if (result.success == true) {
            this.$emit('signin', true);

            this.$router.push("/");
          } else {
            this.showErrorWhenLogin(result);
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
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
    showErrorWhenLogin(error) {
      this.errorRespon = true;
      let message = "";
      switch (error.code) {
        case ERRORS.LOGIN.REQUIRED:
          message =
            "Invalid parameter. Required: email or phone, password, g_recaptcha_response";
          break;
        case ERRORS.LOGIN.EMAIL_INVALID:
          message = "Tài khoản hoặc mật khẩu bạn nhập chưa đúng";
          break;
        case ERRORS.LOGIN.USER_LOCKED:
          message = "User is locked";
          break;
        case ERRORS.LOGIN.BAD_CREDEN:
          message = "Mật khẩu bạn nhập chưa đúng";
          break;
        case ERRORS.LOGIN.EMAIL_LEFT:
          message = "Email/phone or password is incorrect, 1 time left";
          break;
        default:
          message = "Đã có lỗi xảy ra. Vui lòng thử lại sau";
          break;
      }
      this.messageErrorLogin = message;
    },
    
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth-modal.scss";
</style>