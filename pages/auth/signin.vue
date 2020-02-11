<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <h3>Đăng nhập</h3>
      <div class="auth__nav">
        <a :class="byEmail ? '' : 'active'" @click="tabPhone">Số điện thoại</a>
        <a :class="byEmail ? 'active' : ''" @click="tabEmail">Email</a>
      </div>
      <div class="auth_content mb-4">
        <app-input v-if="byEmail" type="text" v-model="email" placeholder="Email" />
        <app-input v-else type="text" v-model="phone" placeholder="Số điện thoại" />
        <app-input type="password" v-model="password" placeholder="Mật khẩu" class="mb-2" />
        <p
          class="color-red text-center full-width"
          v-if="error"
        >Email hoặc mật khẩu không chính xác.</p>
      </div>

      <app-button color="primary" square fullWidth @click="SubmitLogin" class="mb-3">Đăng nhập</app-button>
      <n-link :to="'/auth/forgot'" class="color-blue text-decoration-none">Quên mật khẩu?</n-link>
    </div>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";

export default {
  components: {},

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
    async SubmitLogin() {
      try {
        const token = await this.$recaptcha.execute("login");
        console.log("ReCaptcha token:", token);
        let data = {};
        if (this.byEmail == false) {
          data = {
            phone: this.phone,
            password: this.password,
            g_recaptcha_response: token
          };
        } else {
          data = {
            email: this.email,
            password: this.password,
            g_recaptcha_response: token
          };
        }
        const doAdd = this.login(data).then(result => {
          if (result.success == true) {
            this.$router.push("/");
          } else {
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    },
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