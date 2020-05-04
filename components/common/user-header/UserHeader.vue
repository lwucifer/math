<template>
  <div class="the-header__user">
    <app-avatar class="the-header__user-avt" src="https://picsum.photos/40/40" :size="40"></app-avatar>
    <div class="the-header__user-menu">
      <!--      <div style="height: 2rem;"></div>-->
      <ul>
        <li class="the-header__user-menu__item" v-if="checkMenuGuard(MENU.ELEARNING)">
          <n-link to="/elearning/manager">
            <IconSchool />
            <span>Quản lý E-Learning</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item" v-if="checkMenuGuard(MENU.STUDENT)">
          <n-link to="/">
            <IconSchool />
            <span>Quản lý học sinh</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item" v-if="checkMenuGuard(MENU.ACCOUNT_INFO)">
          <n-link :to="getAccountInfoLink">
            <IconUser />
            <span>Thông tin tài khoản</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item" v-if="checkMenuGuard(MENU.REVENUE)">
          <n-link :to="getRevenueLink">
            <IconDollar />
            <span>Thống kế doanh thu</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item" v-if="checkMenuGuard(MENU.TRANSACTION)">
          <n-link :to="getTransactionLink">
            <IconTransaction />
            <span>Lịch sử giao dịch</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item" v-if="checkMenuGuard(MENU.NOTIFICATION)">
          <n-link :to="getNotificationLink">
            <IconBell />
            <span>Thông báo</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item" v-if="checkMenuGuard(MENU.SETTINGS)">
          <n-link :to="getSettingLink">
            <IconBell />
            <span>Cài đặt chung</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item" v-if="checkMenuGuard(MENU.SUPPORT)">
          <n-link :to="getSupportLink">
            <IconSupport />
            <span>Trợ giúp</span>
          </n-link>
        </li>
        <li
          class="the-header__user-menu__item"
          @click.prevent="handleLogout"
          v-if="checkMenuGuard(MENU.SIGNOUT)"
        >
          <n-link to>
            <IconLogout />
            <span>Đăng xuất</span>
          </n-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { USER_ROLES, ACCOUNT_PROFILE_MENU } from "~/utils/constants";
import { isCommonElementIn2Array } from "~/utils/common";
import { getToken } from "~/utils/auth";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";

import IconUser from "~/assets/svg/icons/user3.svg?inline";
import IconBell from "~/assets/svg/icons/bell.svg?inline";
import IconSchool from "~/assets/svg/icons/school.svg?inline";
import IconDollar from "~/assets/svg/icons/dollar.svg?inline";
import IconTransaction from "~/assets/svg/icons/transaction.svg?inline";
import IconSupport from "~/assets/svg/icons/support.svg?inline";
import IconLogout from "~/assets/svg/icons/logout.svg?inline";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      MENU: ACCOUNT_PROFILE_MENU
    };
  },

  components: {
    IconUser,
    IconBell,
    IconSchool,
    IconDollar,
    IconTransaction,
    IconSupport,
    IconLogout
  },

  computed: {
    ...mapState("account", { profile: "profileList" }),

    userRoles() {
      return this.get(this, "profile.role.authority", false) || [];
    },

    getAccountInfoLink() {
      const accountObj = getToken();
      if(!!accountObj) {
        return `/${accountObj.id}/info`
      }
    },

    getRevenueLink() {
      const accountObj = getToken();
      if(!!accountObj) {
        return `/${accountObj.id}/info/revenues`
      }
    },

    getTransactionLink() {
      const accountObj = getToken();
      if(!!accountObj) {
        return `/${accountObj.id}/info/transactions`
      }
    },

    getNotificationLink() {
      const accountObj = getToken();
      if(!!accountObj) {
        return `/${accountObj.id}/info/announcement`
      }
    },

    getSettingLink() {
      const accountObj = getToken();
      if(!!accountObj) {
        return `/${accountObj.id}/info/setting`
      }
    },

    getSupportLink() {
      const accountObj = getToken();
      if(!!accountObj) {
        return `/${accountObj.id}/info/support`
      }
    },
  },

  methods: {
    ...mapMutations("auth", ["removeToken"]),
    get,
    handleLogout() {
      // console.log("aaa");
      this.removeToken();
      this.$router.push("/auth/signin");
    },

    async fetchProfile() {
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`)
      ]);
    },

    checkMenuGuard(_menuActive) {
      let isValidMenu = true;
      switch (_menuActive) {
        case this.MENU.ELEARNING:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_TEACHER
          ]);
          break;

        case this.MENU.STUDENT:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_TEACHER
          ]);
          break;

        case this.MENU.ACCOUNT_INFO:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_USER,
            USER_ROLES.ROLE_STUDENT,
            USER_ROLES.ROLE_TEACHER,
            USER_ROLES.ROLE_PARENT
          ]);
          break;

        case this.MENU.REVENUE:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_TEACHER
          ]);
          break;

        case this.MENU.TRANSACTION:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_USER,
            USER_ROLES.ROLE_TEACHER,
            USER_ROLES.ROLE_STUDENT
          ]);
          break;

        case this.MENU.NOTIFICATION:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_USER,
            USER_ROLES.ROLE_STUDENT,
            USER_ROLES.ROLE_TEACHER,
            USER_ROLES.ROLE_PARENT
          ]);
          break;

        case this.MENU.SETTINGS:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_USER,
            USER_ROLES.ROLE_STUDENT,
            USER_ROLES.ROLE_TEACHER,
            USER_ROLES.ROLE_PARENT
          ]);
          break;

        case this.MENU.SUPPORT:
          isValidMenu = isCommonElementIn2Array(this.userRoles, [
            USER_ROLES.ROLE_USER,
            USER_ROLES.ROLE_STUDENT,
            USER_ROLES.ROLE_TEACHER,
            USER_ROLES.ROLE_PARENT
          ]);
          break;

        case this.MENU.SIGNOUT:
          isValidMenu = true;
          break;

        default:
          isValidMenu = true;
          break;
      }

      return isValidMenu;
    }
  },

  async created() {
    await this.fetchProfile();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/app/_app-user-header.scss";
</style>