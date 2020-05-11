<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide active="1" />
      </div>
      <div class="col-md-9">
        <div class="school-account__main">
          <block-section title="Thông tin tài khoản">
            <template v-slot:content>
              <general-info />
              <school-info v-if="isStudentRole" />
              <department-info v-if="isTeacherRole" />
            </template>
          </block-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import AccountInfoStudent from "~/components/page/account/Info/AccountInfoStudent";
import GeneralInfo from "~/components/page/account/Info/GeneralInfo";
import SchoolInfo from "~/components/page/account/Info/SchoolInfo";
import DepartmentInfo from "~/components/page/account/Info/DepartmentInfo";
import AccountChangePasswordModal from "~/components/page/account/AccountChangePasswordModal";
import AccountLinkModal from "~/components/page/account/Info/AccountLinkModal";
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions, mapGetters } from "vuex";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
import { get } from "lodash";
import { getDateBirthDay, getDateFormat } from "~/utils/moment";

// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";

export default {
  layout: "account-info",

  components: {
    IconPhoto,
    IconPlus,
    SchoolAccountSide,
    AccountInfoStudent,
    AccountChangePasswordModal,
    AccountLinkModal,
    GeneralInfo,
    SchoolInfo,
    DepartmentInfo
  },
  data() {
    return {
      isAuthenticated: true,
      name: "",
      phone: "",
      email: "",
      sex: "",
      birthday: "",
      showChangePass: false,
      accountLink: {
        showModal: false,
        list: ""
      },
      profileInfo: ""
    };
  },
  watch: {
    profileList: {
      handler: function() {
        this.name = get(this, "profileList.fullname", "");
        this.phone = get(this, "profileList.phone", "");
        this.email = get(this, "profileList.email", "");
        this.address = get(this, "profileList.address", "");
        this.sex = get(this, "profileList.sex", "") === "MALE" ? "Nam" : "Nữ";
        this.birthday = getDateBirthDay(get(this, "profileList.birthday", ""));
        this.accountLink.list = get(this, "linkList.data", {});
        this.profileInfo = get(this, "profileList", {});
      }
    }
  },
  methods: {
    async fetchProfile() {
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`),
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_LINK.LIST}`)
      ]);
    },
    closeNotify() {
      this.notify.showNotify = false;
    },
    closeLinkModal() {
      this.accountLink.showModal = false;
    },
    async handleRefresh() {
      this.fetchProfile();
    }
  },
  computed: {
    ...mapState("account", {
      profileList: "profileList"
    }),
    ...mapState("account", {
      linkList: "linkList"
    }),
    ...mapGetters("auth", ["isTeacherRole", "isStudentRole"])
  },
  created() {
    this.fetchProfile();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
@import "~/assets/scss/components/account/_account-info.scss";
</style>