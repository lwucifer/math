<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <h3>Đăng ký</h3>
      <div class="auth__nav">
        <a :class="byEmail ? '' : 'active'" @click="byEmail = false">Số điện thoại</a>
        <a :class="byEmail ? 'active' : ''" @click="byEmail = true">Email</a>
      </div>
      <div class="auth_content">
        <div class="form-group" v-if="byEmail">
          <input type="text" v-model="email" class="form-control" placeholder="Email" />
        </div>

        <div class="form-group" v-else>
          <input type="number" v-model="phone" class="form-control" placeholder="Số điện thoại" />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="form-control" placeholder="Mật khẩu" />
        </div>
        <div class="form-group">
          <input type="text" v-model="fullname" class="form-control" placeholder="Họ và tên" />
        </div>
      </div>
      <app-button color="primary" square fullWidth @click="login">Đăng ký</app-button>
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
  </div>
</template>

<script>
import IconSuccess from "~/assets/svg/icons/success.svg?inline";
import IconFacebook from "~/assets/svg/icons/facebook.svg?inline";
import IconGoogle from "~/assets/svg/icons/google.svg?inline";
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    IconFacebook,
    IconGoogle,
    IconSuccess
  },

  data() {
    return {
      phone: "",
      email: "",
      password: "",
      error: false,
      byEmail: false,
      statusValidate: 1
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),
    login() {
      this.error = true;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>