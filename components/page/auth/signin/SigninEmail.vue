<template>
  <div>
    <div class="auth_content mb-4">
      <app-input
        type="text"
        v-model="email"
        placeholder="Email"
        :error="$v.email.$invalid"
        :message="errorMessage.email"
        @input="handleEmail"
      />
      <app-input
        type="text"
        v-model="password"
        placeholder="Mật khẩu"
        class="mb-2"
        :error="$v.password.$invalid || validate.password"
        :message="errorMessage.password"
        autocomplete="new-password"
        @input="handlePassword"
      />
      <p class="color-red text-center full-width" v-if="error">Email hoặc mật khẩu không chính xác.</p>
    </div>
    <app-button
      color="primary"
      square
      fullWidth
      @click.prevent="SubmitLoginEmail"
      class="mb-3"
    >Đăng nhập</app-button>
  </div>
</template>

<script>
import * as actionTypes from "../../../../utils/action-types";
import { mapState, mapActions } from "vuex";
import { createSigninWithEmail } from "../../../../models/auth/Signin";
import { validatePassword } from "../../../../utils/validations.js";

import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  computed: {},
  data() {
    return {
      email: "",
      password: "",
      error: "",
      errorMessage: {
        email: "",
        password: ""
      },
      validate: { password: true }
    };
  },
  validations: {
    email: { required, email },
    password: { required }
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
            this.$router.push("/");
          } else {
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    },
    handleEmail() {
      if (!this.$v.email.required) {
        this.errorMessage.email = "Trường này là bắt buộc";
      } else if (!this.$v.email.email) {
        this.errorMessage.email = "Email không hợp lệ";
      }
    },
    handlePassword(_password) {
      debugger;
      this.validate.password = true;
      if (!this.$v.password.required) {
        this.errorMessage.password = "Trường này là bắt buộc";
      } else if (validatePassword(_password)) {
        this.validate.password = false;
      } else if (!validatePassword(_password)) {
        this.errorMessage.password =
          "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái và 1 chữ số";
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth-modal.scss";
</style>