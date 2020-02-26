<template>
  <div class="account__side">
    <div class="account__side-item info">
      <h3>Giới thiệu</h3>
      <div id="label-verify-phone"></div>
      <table>
        <tbody>
          <tr>
            <td :class="validateEmail ? 'color-red' : ''">Email</td>
            <td v-if="personalList.email">{{personalList.email}}</td>
            <td v-else>
              <div v-if="showUpdateEmail" class="form-update-email">
                <input
                  @input="hanldeEmail"
                  type="text"
                  v-model="email"
                  :class="validateEmail ? 'color-red' : ''"
                />
                <app-button color="white" square size="xs" @click="saveEmail">Lưu</app-button>
              </div>
              <a class="update-phone" @click="showUpdateEmail = true" v-else>Cập nhật email</a>
            </td>
          </tr>
          <tr>
            <td :class="validatePhone ? 'color-red' : ''">Số điện thoại</td>
            <td v-if="personalList.phone_number">{{personalList.phone_number}}</td>
            <td v-else>
              <div v-if="showUpdatePhone" class="form-update-phone">
                <input type="text" v-model="phone" :class="validatePhone ? 'color-red' : ''" />
                <app-button color="white" square size="xs" @click="savePhone">Lưu</app-button>
              </div>
              <a class="update-phone" @click="showUpdatePhone = true" v-else>Cập nhật số điện thoại</a>
            </td>
          </tr>
          <tr>
            <td :class="validatePhone ? 'border-red' : ''">Ngày sinh</td>
            <td
              :class="validatePhone ? 'border-red' : ''"
            >{{personalList.birthday | getDateBirthDay}}</td>
          </tr>
          <tr>
            <td>Giới tính</td>
            <td>{{filterSex}}</td>
          </tr>
          <tr>
            <td>Địa chỉ</td>
            <td>{{personalList.address}}</td>
          </tr>
        </tbody>
      </table>

      <app-button class="mt-3" square fullWidth @click="showEdit = true">Chỉnh sửa thông tin</app-button>
      <AccountEditModal :visible="showEdit" @click-close="showEdit = false" />
      <!-- 
      <app-button square fullWidth @click="showChangePass = true">Đổi mật khẩu</app-button>
      <AccountChangePasswordModal
        :visible="showChangePass"
        @click-close="showChangePass = false"
        :account="account"
      />-->
    </div>

    <div class="account__side-item photos">
      <h3>Ảnh</h3>
      <div class="row m-0">
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
      </div>
      <n-link
        class="btn btn--size-md btn--full-width btn--color-primary btn--square"
        :to="'/account/photos'"
      >Xem toàn bộ ảnh</n-link>
    </div>

    <div class="account__side-item friends">
      <h3>
        Bạn bè
        <span>268</span>
      </h3>
      <div class="row">
        <div class="col-md-4 mb-3">
          <n-link :to="'/account/1'">
            <app-avatar src="https://picsum.photos/110/110" :size="100" />
            <strong>Regina Edwards</strong>
          </n-link>
        </div>
        <div class="col-md-4 mb-3">
          <n-link :to="'/account/1'">
            <app-avatar src="https://picsum.photos/110/110" :size="100" />
            <strong>Regina Edwards</strong>
          </n-link>
        </div>
        <div class="col-md-4 mb-3">
          <n-link :to="'/account/1'">
            <app-avatar src="https://picsum.photos/110/110" :size="100" />
            <strong>Regina Edwards</strong>
          </n-link>
        </div>
        <div class="col-md-4 mb-3">
          <n-link :to="'/account/1'">
            <app-avatar src="https://picsum.photos/110/110" :size="100" />
            <strong>Regina Edwards</strong>
          </n-link>
        </div>
        <div class="col-md-4 mb-3">
          <n-link :to="'/account/1'">
            <app-avatar src="https://picsum.photos/110/110" :size="100" />
            <strong>Regina Edwards</strong>
          </n-link>
        </div>
        <div class="col-md-4 mb-3">
          <n-link :to="'/account/1'">
            <app-avatar src="https://picsum.photos/110/110" :size="100" />
            <strong>Regina Edwards</strong>
          </n-link>
        </div>
      </div>
      <n-link
        class="mt-0 btn btn--size-md btn--full-width btn--color-primary btn--square"
        :to="'/account/friends'"
      >Tất cả bạn bè</n-link>
    </div>
    <app-modal centered :width="306" :component-class="{ 'auth-modal': true }" v-if="showModalOTP">
      <h3 class="color-primary" slot="header">
        Xác thực tài khoản
        <a class="btn-close" @click="showModalOTP = false">X</a>
      </h3>

      <div slot="content">
        <div class="form-group_border-bottom">
          <input
            type="text"
            v-model="otp"
            maxlength="6"
            class="form-control ml-0"
            placeholder="Nhập mã OTP"
            @input="hanldeOtp"
          />
        </div>
        <p class="color-red text-center full-width mt-2" v-if="errorOtp">{{messageErrorOtp}}</p>
        <app-button color="primary" square fullWidth @click="acceptOTP">Xác nhận</app-button>
      </div>
    </app-modal>
    <app-modal
      centered
      :width="306"
      :component-class="{ 'auth-modal': true }"
      v-if="showModalOtpPhone"
    >
      <h3 class="color-primary" slot="header">
        Xác thực tài khoản
        <a class="btn-close" @click="showModalOtpPhone = false">X</a>
      </h3>

      <div slot="content">
        <div class="form-group_border-bottom">
          <input
            type="text"
            v-model="otpPhone"
            maxlength="6"
            class="form-control ml-0"
            placeholder="Nhập mã OTP"
            @input="hanldeOtpPhone"
          />
        </div>
        <p class="color-red text-center full-width mt-2" v-if="errorOtpPhone">{{messageErrorPhone}}</p>
        <app-button color="primary" square fullWidth @click="acceptOtpPhone">Xác nhận</app-button>
      </div>
    </app-modal>
    <app-modal
      centered
      :width="400"
      :component-class="{ 'auth-modal': true }"
      v-if="modalConfirmEmail"
    >
      <h3 class="color-primary" slot="header"></h3>

      <div slot="content">
        <p class="line-height-2">
          <br />Vui lòng nhận mã otp tài khoản qua email
          <br />
          <span class="color-primary">{{this.email}}</span>
        </p>
        <app-button color="primary" square fullWidth @click="modalConfirmEmail = false">Xác nhận</app-button>
      </div>
    </app-modal>
    <app-modal centered :width="400" :component-class="{ 'auth-modal': true }" v-if="modalSuccess">
      <h3 class="color-primary" slot="header"></h3>

      <div slot="content">
        <p class="line-height-2">
          <br />Bạn đã thêm thành công
          <br />
        </p>
        <app-button color="primary" square fullWidth @click="modalConfirmEmail = false">Xác nhận</app-button>
      </div>
    </app-modal>
  </div>
</template>

<script>
import AccountEditModal from "~/components/page/account/AccountEditModal";
import AccountChangePasswordModal from "~/components/page/account/AccountChangePasswordModal";
import { mapState, mapActions } from "vuex";
import { formatPhoneNumber } from "~/utils/validations";
import firebase from "@/services/firebase/FirebaseInit";

export default {
  name: "E-learning",

  components: {
    AccountEditModal,
    AccountChangePasswordModal
  },

  props: {},

  data: () => ({
    showEdit: false,
    showChangePass: false,
    showUpdatePhone: false,
    validatePhone: false,
    phone: "",
    showUpdateEmail: false,
    validateEmail: false,
    email: "",
    showModalOTP: false,
    errorOtp: false,
    messageErrorOtp: "",
    showModalOtpPhone: false,
    errorOtpPhone: false,
    messageErrorPhone: "",
    otpPhone: "",
    otp: "",
    modalConfirmEmail: false,
    modalSuccess: false,
    verify_token: ""
  }),
  mounted() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "label-verify-phone",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("RecaptchaVerifier resolved");
        }
      }
    );
  },
  methods: {
    ...mapActions("account", [
      "accountPersonalList",
      "accountPersonalEditEmail",
      "verifyOtpEmail",
      "accountPersonalUpdatePhone"
    ]),
    ...mapActions("auth", ["sendotp", "verifiOtp"]),
    savePhone() {
      // this.showUpdatePhone = false;
      const data = {
        phone: `+${formatPhoneNumber(this.phone)}`,
        appVerifier: window.recaptchaVerifier
      };
      this.sendotp(data).then(result => {
        if (!result.code) {
          this.showModalOtpPhone = true;
        } else {
          // this.errorOtpPhone = true;
          // this.messageErrorPhone = "Số điện thoại bạn nhập không chính xác";
        }
      });
    },
    async acceptOtpPhone() {
      await this.verifiOtp(this.otpPhone).then(result => {
        console.log("result huydv", result);
        if (result && result.user) {
          this.verify_token = result.user ? result.user.ma : "";
          this.updatePhone();
        } else {
          this.errorOtpPhone = true;
          if (result.code == "auth/invalid-verification-code") {
            this.messageErrorPhone = "Mã OTP bạn nhập không đúng";
          } else if (result.code == "auth/code-expired") {
            this.messageErrorPhone = "Mã OTP của bạn nhập đã hết hạn";
          } else {
            this.messageErrorPhone = "Có lỗi. Xin vui lòng thử lại";
          }
        }
      });
    },
    updatePhone() {
      this.accountPersonalUpdatePhone({
        firebase_token: this.verify_token
      }).then(result => {
        console.log("[result]", result);
        if (result.success == true) {
          this.showModalOtpPhone = false;
          this.modalSuccess = true;
          const userId = this.personalList.id;
          this.accountPersonalList(userId);
        } else {
        }
      });
    },
    saveEmail() {
      this.accountPersonalEditEmail({
        email: this.email
      }).then(result => {
        if (result.success == true) {
          this.showModalOTP = true;
          this.modalConfirmEmail = true;
        } else {
          this.validateEmail = true;
        }
      });
      // this.showUpdateEmail = false;
    },
    async acceptOTP() {
      const data = {
        email: this.email,
        otp_code: this.otp
      };
      await this.verifyOtpEmail(data).then(result => {
        console.log("[verifyOtpEmail] huydv", result);
        if (result.success == true) {
          this.showModalOTP = false;
          this.modalSuccess = true;
          const userId = this.personalList.id;
          this.accountPersonalList(userId);
        } else {
          this.errorOtp = true;
          if (result.code == "2") {
            this.messageErrorOtp = "Mã OTP bạn nhập không đúng";
          } else if (result.code == "1") {
            this.messageErrorOtp = "Mã OTP của bạn nhập đã hết hạn";
          } else {
            this.messageErrorOtp = "Có lỗi. Xin vui lòng thử lại";
          }
        }
      });
    },
    hanldeEmail() {
      this.validateEmail = false;
    },
    hanldeOtpPhone() {
      this.errorOtpPhone = false;
      this.messageErrorOtp = "";
    },
    hanldeOtp() {
      this.errorOtp = false;
      this.messageErrorPhone = "";
    }
  },

  computed: {
    ...mapState("account", ["personalList"]),
    filterSex() {
      return this.personalList
        ? this.personalList.sex == 1
          ? "Nam"
          : "Nữ"
        : "";
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-side.scss";
</style>