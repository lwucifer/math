<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="wrap-form_auth">
          <div class="head-form_auth">
            <h3>Đăng nhập</h3>
              <div class="auth__nav-v2">
                <a :class="byEmail ? '' : 'active'" @click="tabPhone">Số điện thoại</a>
                <a :class="byEmail ? 'active' : ''" @click="tabEmail">Email</a>
              </div>
            </div>
            <div class="px-4">
              <SigninEmail v-show="byEmail" />
              <SigninPhone v-show="!byEmail" />
            </div>
            <p class="title-either_auth">hoặc</p>
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
          <!--
            <n-link :to="'/auth/forgot'" class="color-blue text-decoration-none mb-4">Quên mật khẩu?</n-link>
          -->
          </div>
      </div>
      <div class="col-md-6 text-center">
        <h1 class="color-primary">Schoolly</h1>
        <img src="~assets/images/auth/image 13.png">
      </div>
    </div>
  </div>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions, mapMutations } from "vuex";
import {
  createSigninWithPhone,
  createSigninWithEmail
} from "~/models/auth/Signin";
import SigninEmail from "~/components/page/auth/signin/SigninEmail";
import SigninPhone from "~/components/page/auth/signin/SigninPhone";
import Fingerprint2 from "fingerprintjs2";
import * as constants from "~/utils/constants";

import IconFacebook from "~/assets/svg/icons/facebook.svg?inline";
import IconGoogle from "~/assets/svg/icons/google.svg?inline";
export default {
  components: { SigninEmail, SigninPhone,IconFacebook,IconGoogle },

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
    console.log("[Signin] fireMess", this.$fireMess);
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapMutations("auth", ["setCurrentDevice"]),
    tabPhone() {
      (this.byEmail = false), (this.password = "");
    },
    tabEmail() {
      (this.byEmail = true), (this.password = "");
    },
    fingerprintReport() {
      Fingerprint2.get(components => {
        let murmur = Fingerprint2.x64hash128(
          components
            .map(function(pair) {
              return pair.value;
            })
            .join(),
          31
        );
        const device_info = this.getDeviceInfoFromComponent(components);
        console.log("[device_info]", device_info);
        device_info.fingerPrint = murmur;
        device_info.name = this.getDeviceName(device_info.userAgent);
        console.log("[device_info] name", device_info.name);
        device_info.type = constants.DEVICE_TYPE.WEB;

        this.setCurrentDevice(device_info);
      });
    },
    getDeviceInfoFromComponent(components) {
      let deviceInfo = null;
      let details = "{";
      for (let index in components) {
        let obj = components[index];
        if (constants.FINGERPRINT_PROPS.includes(obj.key)) {
          let line = `"${obj.key}":"${String(obj.value).substr(0, 100)}"`;
          details += line;
          if (parseInt(index) < components.length - 1) {
            details += ",";
          }
        }
      }
      details += "}";
      if (!details) return;
      return JSON.parse(details);
    },
    getDeviceName(_userAgent) {
      if (!_userAgent) return "Unknown";
      const splits = _userAgent.split(/[(;)]/);
      if (!splits || splits.length <= 3) return _userAgent;
      const browser = splits[splits.length - 1] || "Unknown";
      const app = splits[2] || "Unknown";
      return `${browser.trim()} (${app.trim()})` || "Unknown";
    },
    initFingerPrint() {
      if (window.requestIdleCallback) {
        requestIdleCallback(this.fingerprintReport);
      } else {
        setTimeout(this.fingerprintReport, 500);
      }
    }
  },
  // mounted() {
    // this.initFingerPrint();
  // }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth-v2.scss";
</style>