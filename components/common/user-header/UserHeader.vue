<template>
  <div class="the-header__user">
    <app-avatar class="the-header__user-avt" src="https://picsum.photos/40/40" :size="40"></app-avatar>
    <div class="the-header__user-menu">
      <!--      <div style="height: 2rem;"></div>-->
      <ul>
        <li class="the-header__user-menu__item">
          <n-link to="/">
            <IconSchool />
            <span>Quản lý các trường học</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item">
          <n-link to="/">
            <IconDollar />
            <span>Thống kế</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item">
          <n-link to="/">
            <IconUser />
            <span>Thông tin tài khoản</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item">
          <n-link to="/">
            <IconTransaction />
            <span>Lịch sử giao dịch</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item">
          <n-link to="/">
            <IconBell />
            <span>Thông báo</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item">
          <n-link to="/">
            <IconSupport />
            <span>Trợ giúp</span>
          </n-link>
        </li>
        <li class="the-header__user-menu__item" @click.prevent="handleLogout">
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
import IconUser from "~/assets/svg/icons/user3.svg?inline";
import IconBell from "~/assets/svg/icons/bell.svg?inline";
import IconSchool from "~/assets/svg/icons/school.svg?inline";
import IconDollar from "~/assets/svg/icons/dollar.svg?inline";
import IconTransaction from "~/assets/svg/icons/transaction.svg?inline";
import IconSupport from "~/assets/svg/icons/support.svg?inline";
import IconLogout from "~/assets/svg/icons/logout.svg?inline";
import { mapMutations } from "vuex";

export default {
  components: {
    IconUser,
    IconBell,
    IconSchool,
    IconDollar,
    IconTransaction,
    IconSupport,
    IconLogout
  },
  methods: {
    ...mapMutations("auth", ["removeToken"]),
    handleLogout() {
      // console.log("aaa");
      this.removeToken();
      this.$router.push("/auth/signin");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/app/_app-user-header.scss";
</style>