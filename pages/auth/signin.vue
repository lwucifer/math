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
import { mapState, mapActions, mapMutations } from "vuex";
import {
  createSigninWithPhone,
  createSigninWithEmail
} from "~/models/auth/Signin";
import SigninEmail from "~/components/page/auth/signin/SigninEmail";
import SigninPhone from "~/components/page/auth/signin/SigninPhone";
import Fingerprint2 from "fingerprintjs2";
import * as constants from "~/utils/constants";

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
  mounted() {
    this.initFingerPrint();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>