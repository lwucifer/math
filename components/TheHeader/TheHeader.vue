<template>
  <div class="the-header">
    <div class="container the-header__content">
      <div class="the-header__logo">
        <Logo />
      </div>

      <ul class="the-header__menu">
        <li>
          <n-link to="" class="active">Timeline</n-link>
        </li>
        <li>
          <n-link to="">Khoá học</n-link>
        </li>
        <li>
          <n-link to="">Trường học</n-link>
        </li>
        <li>
          <n-link to="">Tin nhắn <span class="the-header__menu-status text-active">(2)</span></n-link>
        </li>
      </ul>

      <form class="the-header__search" @submit.prevent>
        <input type="text" placeholder="Tìm kiếm">
        <button type="submit">
          <IconSearch width="15" height="15" />
        </button>
      </form>

      <div class="the-header__right">
        <ul class="the-header__right-menu">
          <li>
            <a href="" class="the-header__noti">
              <IconGlobe width="34" height="29" />
              <span class="text-white">12</span>
            </a>
          </li>
        </ul>

        <div v-if="isAuthenticated" class="the-header__user">
          <div class="the-header__user-avt">
            <img src="https://via.placeholder.com/44x44" alt="">
          </div>

          <div class="the-header__user-name">Nguyễn Tiến Đạt</div>
          <div class="the-header__user-arrow">
            <IconCaretDown width="13" height="7" />
          </div>
        </div>

        <app-button v-else outline square color="primary">Đăng nhập</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/assets/svg/icons/schoolly.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline"
import IconGlobe from "~/assets/svg/icons/globe.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";

export default {
  components: {
    Logo,
    IconSearch,
    IconGlobe,
    IconCaretDown
  },

  data: () => ({
    isAuthenticated: true
  })
}
</script>

<style lang="scss">
@import "~/assets/scss/components/the-header/_the-header.scss";
</style>