<template>
  <sub-block-section
    title="Thông tin cá nhân"
  >
    <template v-slot:content>
  
      <div class="form--normal">
        <div class="row">
          <div class="col-12">
            <div class="d-flex">
              <app-button
                square
                class="btnAccountLink_account-info"
                v-if="!accountLink.list.linked"
                v-on:click="accountLink.showModal=true"
              >
                <IconPlus class="icon"/>
                <span class="ml-3">Liên kết trường học</span>
              </app-button>
    
              <AccountLinkModal
                :visible="accountLink.showModal"
                @click-close="closeLinkModal"
                @handleRefresh="handleRefresh"
              />
            </div>
          </div>
          
          <div class="col-md-3"><label for="" class="form--normal__title">Ảnh đại diện</label></div>
          <div class="col-md-9">
            <div class="app-input app-input--size-md">
              <upload-avatar :av-srt="avatarSrc"></upload-avatar>
            </div>
          </div>
          <div class="col-md-3"><label for="" class="form--normal__title">Họ và tên</label></div>
          <div class="col-md-9">
            <app-input v-model="name" disabled />
          </div>
          <div class="col-md-3"><label for="" class="form--normal__title">Số điện thoại</label></div>
          <div class="col-md-9">
            <app-input v-model="phone" disabled />
          </div>
          <div class="col-md-3"><label for="" class="form--normal__title">Email</label></div>
          <div class="col-md-9">
            <app-input v-model="email" disabled/>
          </div>
          <div class="col-md-3"><label for="" class="form--normal__title">Giới tính</label></div>
          <div class="col-md-2">
            <app-input v-model="sex" class="sex_Profile" disabled/>
          </div>
          <div class="col-md-2"><label for="" class="form--normal__title">Ngày sinh</label></div>
          <div class="col-md-2">
            <app-input v-model="birthday" class="birthday_Profile" disabled/>
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-9">
            <app-button
              nuxt
              :to="accountInfo ? '/' + accountInfo.id + '/info/change_pwd' : '/'"
            >
              <span class="">Thay đổi mật khẩu</span>
            </app-button>
          </div>
        </div>
      </div>
  
      <AccountChangePasswordModal
        :visible="showChangePass"
        @click-close="showChangePass = false"
      />
      <div class="d-flex mt-4">
        <app-button class="ml-auto" square>Lưu thay đổi</app-button>
      </div>
    </template>
  </sub-block-section>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import AccountInfoStudent from "~/components/page/account/Info/AccountInfoStudent";
import UploadAvatar from "~/components/page/account/Info/UploadAvatar";
import AccountChangePasswordModal from "~/components/page/account/AccountChangePasswordModal";
import AccountLinkModal from "~/components/page/account/Info/AccountLinkModal"
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
import { get } from "lodash";
import { getDateBirthDay, getDateFormat } from "~/utils/moment";
// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";
import { getToken } from "~/utils/auth";

export default {
  components: {
    IconPhoto,
    IconPlus,
    SchoolAccountSide,
    AccountInfoStudent,
    AccountChangePasswordModal,
    AccountLinkModal,
    UploadAvatar
  },
  data() {
    return {
      isAuthenticated: true,
      school: SCHOOL,
      name: "",
      phone: "",
      email: "",
      sex: "",
      birthday: "",
      showChangePass: false,
      accountLink:{
        showModal: false,
        list:""
      },
      avatar: [],
      avatarSrc: "https://picsum.photos/170/170",
      profileInfo:""
    };
  },
  watch:{
    profileList: {
      handler: function() {
        this.name = get(this,"profileList.fullname","");
        this.phone = get(this,"profileList.phone","");
        this.email = get(this,"profileList.email","");
        this.address = get(this,"profileList.address","");
        this.sex = get(this,"profileList.sex","") === "MALE" ? "Nam" : "Nữ";
        this.birthday = getDateBirthDay(get(this,"profileList.birthday",""));
        this.accountLink.list = get(this,"linkList.data",{});
        this.profileInfo = get(this,"profileList",{});
      }
    }
  },
  methods: {
    ...mapActions("account", [
      "accountPersonalEditAvatar",
      "accountPersonalList"
    ]),
    async fetchProfile(){
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`),
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_LINK.LIST}`)
      ])
    },
    closeNotify() {
      this.notify.showNotify = false;
    },
    closeLinkModal(){
      this.accountLink.showModal = false;
    },
    async handleRefresh(){
      this.fetchProfile();
    },
  },
  computed: {
    ...mapState("account", ["personalList"]),
    ...mapState("account", {
      profileList: "profileList"
    }),
    ...mapState("account", {
      linkList: "linkList"
    }),
    accountInfo() {
      return getToken()
    }
  },
  created() {
    this.fetchProfile();
    this.avatarSrc = this.personalList.avatar
      ? this.personalList.avatar.low
      : "https://picsum.photos/170/170";
  }
};
</script>

<style lang="scss">
  /*@import "~/assets/scss/components/school/_school-account.scss";*/
  /*@import "~/assets/scss/components/account/_account-info.scss";*/
</style>
