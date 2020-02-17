<template>
  <div>
    <div class="auth_content mb-4">
      <app-input type="text" v-model="phone" placeholder="Số điện thoại" />
      <app-input
        type="password"
        v-model="password"
        placeholder="Mật khẩu"
        class="mb-2"
        autocomplete="new-password"
      />
    </div>

    <app-button
      color="primary"
      square
      fullWidth
      @click.prevent="SubmitLoginPhone"
      class="mb-3"
    >Đăng nhập</app-button>
  </div>
</template>

<script>
import * as actionTypes from "../../../../utils/action-types";
import { mapState, mapActions } from "vuex";
import { createSigninWithPhone } from "../../../../models/auth/Signin";
import { formatPhoneNumber } from "~/utils/validations";

export default {
  computed: {},
  data() {
    return {
      phone: "",
      password: "",
      error: ""
    };
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
            this.$router.push("/");
          } else {
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
@import "~/assets/scss/components/auth/_auth-modal.scss";
</style>