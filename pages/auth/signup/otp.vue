<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="wrap-success-auth px-4">
          <h3 class="text-primary">Xác thực tài khoản</h3>
          <div class="auth_content mt-4 px-5">
            <app-input type="text" v-model="otp" placeholder="Nhập mã OTP"/>
          </div>
          <app-button color="primary" square class="btn-confirm"  @click="confirmOtp">
              Xác thực tài khoản
          </app-button>
        </div>
      </div>
      <div class="col-md-6 text-center">
          <ImageAuth/>
      </div>
    </div>
  </div>
</template>

<script>
import ImageAuth  from "~/components/page/auth/ImageAuth";
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    ImageAuth
  },

  data() {
    return {
      otp: "",
    };
  },

  methods: {
    ...mapActions("auth", ["verifiOtp"]),
    async confirmOtp(){
      await this.verifiOtp(this.otp).then(result => {
        console.log("result huydv", result);
        if (result && result.user) {
          console.log(result.user)
        } else {
          console.log(result)
        }
      })
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth-v2.scss";
</style>