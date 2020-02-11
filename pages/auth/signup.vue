<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <h3>Đăng ký</h3>
      <div class="auth__nav">
        <a :class="byEmail ? '' : 'active'" @click="byEmail = false">Số điện thoại</a>
        <a :class="byEmail ? 'active' : ''" @click="byEmail = true">Email</a>
      </div>
      <div class="auth_content">
        <app-input v-if="byEmail" type="text" v-model="email" placeholder="Email" />
        <app-input v-else type="text" v-model="phone" placeholder="Số điện thoại" />
        <app-input type="password" v-model="password" placeholder="Mật khẩu" />
        <app-input type="text" v-model="fullname" placeholder="Họ và tên" />
      </div>
      <app-button color="primary" square fullWidth @click="showModalOTP = true">Đăng ký</app-button>
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
    <app-modal centered :width="306" :component-class="{ 'auth-modal': true }" v-if="showModalOTP">
      <h3 class="color-primary" slot="header">
        Xác thực tài khoản
        <a class="btn-close" @click="$emit('click-close')">X</a>
      </h3>

      <div slot="content">
        <div class="form-group_border-bottom">
          <input type="text" v-model="otp" class="form-control ml-0" placeholder="Nhập mã OTP" />
        </div>
        <app-button color="primary" square fullWidth @click="acceptOTP">Xác nhận</app-button>
      </div>
    </app-modal>
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
      fullname: "",
      error: false,
      byEmail: false,
      statusValidate: 1,
      showModalOTP: false,
      listQuery: {},
      otp: ""
    };
  },
  async mounted() {
    await this.$recaptcha.init();
  },

  methods: {
    ...mapActions("auth", ["register"]),
    async submitRegister() {
      try {
        const token = await this.$recaptcha.execute("register");
        console.log("ReCaptcha token:", token);
        let data = {};
        if (this.byEmail == false) {
          (this.listQuery.phone = this.phone),
            (this.listQuery.password = this.password),
            (this.listQuery.fullname = this.fullname),
            (this.listQuery.g_recaptcha_response = token);
        } else {
          (this.listQuery.email = this.email),
            (this.listQuery.password = this.password),
            (this.listQuery.fullname = this.fullname),
            (this.listQuery.g_recaptcha_response = token);
        }
        debugger;
        const doAdd = this.register(this.listQuery).then(result => {
          if (result.success == true) {
            this.$router.push("/auth/signin");
          } else {
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    },
    acceptOTP() {
      this.listQuery.verify_token = "";
      this.submitRegister();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>