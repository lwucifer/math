<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <h3>Đăng nhập</h3>
      <div class="auth__nav">
        <a :class="byEmail ? '' : 'active'" @click="tabPhone">Số điện thoại</a>
        <a :class="byEmail ? 'active' : ''" @click="tabEmail">Email</a>
      </div>
      <SigninEmail v-show="byEmail" />
      <SigninPhone v-show="!byEmail" />
      <n-link :to="'/auth/forgot'" class="color-blue text-decoration-none">Quên mật khẩu?</n-link>
    </div>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import {
  createSigninWithPhone,
  createSigninWithEmail
} from "~/models/auth/Signin";
import SigninEmail from "~/components/page/auth/signin/SigninEmail";
import SigninPhone from "~/components/page/auth/signin/SigninPhone";

export default {
  components: { SigninEmail, SigninPhone },

  data() {
    return {
      phone: "",
      email: "",
      password: "",
      error: false,
      byEmail: false
    };
  },
  async mounted() {
    await this.$recaptcha.init();
  },
  methods: {
    ...mapActions("auth", ["login"]),
    tabPhone() {
      (this.byEmail = false), (this.password = "");
    },
    tabEmail() {
      (this.byEmail = true), (this.password = "");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>