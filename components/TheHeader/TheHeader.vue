<template>
  <div class="the-header">
    <div class="container the-header__content">
      <div class="the-header__logo">
        <Logo />
      </div>

      <ul class="the-header__menu">
        <li>
          <n-link to="">Timeline</n-link>
        </li>
        <li>
          <n-link to="">Khoá học</n-link>
        </li>
        <li>
          <n-link to="">Trường học</n-link>
        </li>
        <li>
          <n-link to="">Tin nhắn <span class="text-active">(2)</span></n-link>
        </li>
      </ul>

      <form class="the-header__search" @submit.prevent>
        <input type="text">
        <button type="submit">
          <IconSearch width="15" height="15" />
        </button>
      </form>

      <div class="the-header__right">
        <ul class="the-header__right-menu">
          <li>
            <a href="" class="the-header__noti">
              <IconGlobe width="34" height="29" />
              <span class="text-white bg-error">(12)</span>
            </a>
          </li>
        </ul>

        <app-button></app-button>
        <div class="the-header__user">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/assets/svg/schoolly.svg?inline";
import IconSearch from "~/assets/svg/search.svg?inline"
import IconGlobe from "~/assets/svg/globe.svg?inline";

export default {
  components: {
    Logo,
    IconSearch,
    IconGlobe
  },

  data: () => ({
    isAuthenticated: false
  })
}
</script>

<style>

</style>