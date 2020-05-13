<template>
  <div>
    <div class="auth_content mb-4">
      <app-input
        type="text"
        v-model="email"
        placeholder="Email"
        :error="$v.email.$invalid"
        :message="errorMessage.email"
        :validate="validateProps.email"
        @input="handleEmail"
      >
        <template v-slot:prepend-inner>
          <div class="icon-inner-input">
            <IconMail24px />
          </div>
        </template>
      </app-input>
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
      >
        <template v-slot:prepend-inner>
          <div class="icon-inner-input">
            <IconLock24px />
          </div>
        </template>
      </app-input>
      <p class="color-red text-center full-width" v-if="errorRespon">{{messageErrorLogin}}</p>
    </div>
    <app-button
      :disabled="disabledBtnLogin"
      color="primary"
      square
      fullWidth
      @click.prevent="SubmitLoginEmail"
      class="mb-3"
    >Đăng nhập</app-button>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import { createSigninWithEmail } from "~/models/auth/Signin";
import { validatePassword } from "~/utils/validations.js";
import { ERRORS } from "~/utils/error-code";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import IconMail24px from "~/assets/svg/v2-icons/mail_24px.svg?inline";
import IconLock24px from "~/assets/svg/v2-icons/lock_24px.svg?inline";
export default {
  components: {
    IconMail24px,
    IconLock24px
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      errorMessage: {
        email: "",
        password: ""
      },
      validateProps: { password: "", email: "" },
      validate: { password: true },
      errorRespon: false,
      messageErrorLogin: ""
    };
  },
  validations: {
    email: { required, email },
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
    async SubmitLoginEmail() {
      try {
        const token = await this.$recaptcha.execute("login");
        console.log("ReCaptcha token:", token);
        const loginModel = createSigninWithEmail(
          this.email,
          this.password,
          token
        );
        const doAdd = this.login(loginModel).then(result => {
          if (result.success == true) {
            this.$emit("signin", true);

            this.$router.push("/");
          } else {
            this.showErrorWhenLogin(result);
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    },
    handleEmail() {
      this.errorRespon = false;
      this.validateProps.email = "";
      if (!this.$v.email.required) {
        this.validateProps.email = 2;
        this.errorMessage.email = "Trường này là bắt buộc";
      } else if (!this.$v.email.email) {
        this.validateProps.email = 2;
        this.errorMessage.email = "Email không hợp lệ";
      } else {
        this.validateProps.email = 1;
        this.errorMessage.email = "";
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
        this.errorMessage.password = "";
      } else if (!validatePassword(_password)) {
        this.validateProps.password = 2;
        this.errorMessage.password =
          "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái và 1 chữ số";
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
        case ERRORS.LOGIN.USER_INACTIVE:
          message = "Tài khoản chưa được xác thực";
          break;
        default:
          message = "Đã có lỗi xảy ra. Vui lòng thử lại sau";
          break;
      }
      this.messageErrorLogin = message;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth-modal.scss";
</style>