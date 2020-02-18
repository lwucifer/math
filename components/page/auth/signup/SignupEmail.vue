<template>
  <div>
    <div class="auth_content">
      <app-input type="text" v-model="email" placeholder="Email" />
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
      @click.prevent="registerEmail"
    >Đăng ký</app-button>
    <app-modal
      centered
      :width="400"
      :component-class="{ 'auth-modal': true }"
      v-if="modalConfirmEmail"
    >
      <h3 class="color-primary" slot="header">Đăng ký thành công</h3>

      <div slot="content">
        <p class="line-height-2">
          Tài khoản của bạn đã đăng ký thành công!
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
import * as actionTypes from "../../../../utils/action-types";
import { mapState, mapActions } from "vuex";
import { createSignupWithEmail } from "../../../../models/auth/Signup";
import { ERRORS } from "../../../../utils/error-code";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      fullname: "",
      error: "",
      modalConfirmEmail: false,
      errorMessage: {
        email: "",
        password: "",
        fullname: ""
      },
      validateProps: { password: "", email: "", fullname: "" },
      validate: { password: true },
      errorRespon: false,
      messageErrorLogin: ""
    };
  },
  validations: {
    email: { required, minLength: minLength(10) },
    password: { required },
    fullname: { required, minLength: minLength(8), maxLength: maxLength(32) }
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async registerEmail() {
      try {
        const token = await this.$recaptcha.execute("register");
        console.log("ReCaptcha token:", token);
        const registerModel = createSignupWithEmail(
          this.email,
          this.password,
          this.fullname,
          token
        );
        const doAdd = this.register(registerModel).then(result => {
          if (result.success == true) {
            this.modalConfirmEmail = true;
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    }
  }
};
</script>

<style lang="scss">
</style>