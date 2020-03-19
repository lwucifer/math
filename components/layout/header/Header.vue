<template>
  <div class="the-header">
    <div class="the-header__content">
      <div class="the-header__logo">
        <n-link to="/">
          <Logo />
        </n-link>
      </div>

      <div class="the-header__search">
        <form class="the-header__search__form" @submit.prevent>
          <input type="text" placeholder="Tìm kiếm" />
          <button type="submit">
            <IconSearch width="15" height="15" class="fill-white" />
          </button>
        </form>
      </div>

      <ul class="the-header__menu">
        <li>
          <n-link to="/">Dòng thời gian</n-link>
        </li>
        <li>
          <n-link to="/elearning">E-learning</n-link>
        </li>
        <li>
          <n-link to="/school">Trường học</n-link>
        </li>
        <li>
          <app-dropdown
            position="left"
            v-model="dropdownCourse"
            :content-width="'20rem'"
            class="link--dropdown link--dropdown-course"
          >
            <n-link slot="activator" to="/course">
              Bài giảng và khóa học
              <IconCaretDown width="10" height="10" class="fill-primary" />
            </n-link>
            <div class="link--dropdown__content">
              <ul>
                <li>
                  <n-link to>Bài giảng</n-link>
                </li>
                <li>
                  <n-link to>Khóa học</n-link>
                </li>
              </ul>
            </div>
          </app-dropdown>
        </li>
      </ul>

      <div v-if="isAuthenticated" class="the-header__user">
        <button class="item">
          <IconMessager />
          <span class="number">9</span>
        </button>
        <button class="item">
          <IconShoppingCartAlt />
          <span class="number">9</span>
        </button>
        <button class="item">
          <IconBell />
          <span class="number">9</span>
        </button>
        <app-dropdown
          position="right"
          v-model="dropdownAuth"
          :content-width="'15rem'"
          class="link--dropdown link--dropdown-auth item"
        >
          <app-avatar
            slot="activator"
            class="the-header__user-avt"
            src="https://picsum.photos/60/60"
            :size="44"
          ></app-avatar>
          <div class="link--dropdown__content">
            <ul>
              <li>
                <n-link to="/elearning/manager">Quản lý E-Learning</n-link>
              </li>
              <li>
                <n-link to>Quản lý học sinh</n-link>
              </li>
              <li>
                <n-link to="/account/info">Thông tin tài khoản</n-link>
              </li>
              <li>
                <n-link to="/account/info/revenues">Thống kê doanh thu</n-link>
              </li>
              <li>
                <n-link to="/account/info/transactions">Lịch sử giao dịch</n-link>
              </li>
              <li>
                <n-link to>Cài đặt</n-link>
              </li>
              <li>
                <n-link to>Thông báo</n-link>
              </li>
              <li>
                <n-link to>Trợ giúp</n-link>
              </li>
              <li>
                <n-link to>Đăng xuất</n-link>
              </li>
            </ul>
          </div>
        </app-dropdown>
      </div>

      <div v-else class="d-flex">
        <n-link
          class="btn btn--size-md btn--color-primary btn--square mr-3"
          :to="'/auth/signin'"
        >Đăng nhập</n-link>
        <n-link
          class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
          :to="'/auth/signup'"
        >Đăng ký</n-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconGlobeNoti from "~/assets/svg/icons/globe-noti.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconBell from "~/assets/svg/icons/bell.svg?inline";
import IconShoppingCartAlt from "~/assets/svg/design-icons/shopping-cart-alt.svg?inline";
import IconMessager from "~/assets/svg/icons/messager.svg?inline";

export default {
  components: {
    Logo,
    IconSearch,
    IconGlobeNoti,
    IconCaretDown,
    IconBell,
    IconShoppingCartAlt,
    IconMessager
  },

  data: () => ({
    showLogin: false,
    dropdownAuth: false,
    dropdownCourse: false
  }),
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  methods: {
    redirectSignin() {
      this.$router.push("/auth/signin");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/the-header/_the-header.scss";
</style>