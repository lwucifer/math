<template>
  <div class="app-noti-header">
    <ul>
      <li>
        <a href class="app-noti-header__item">
          <IconMessenger height="22" width="22"/>
          <span class="text-white">12</span>
        </a>
      </li>
      <li>
        <a href class="app-noti-header__item">
          <IconCart height="22" width="22"/>
          <span class="text-white">12</span>
        </a>
      </li>
      <li>
        <a href class="app-noti-header__item">
          <IconBell height="22" width="22"/>
          <span class="text-white">2</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import IconBell from "~/assets/svg/icons/bell.svg?inline";
  import IconCart from "~/assets/svg/icons/cart2.svg?inline";
  import IconMessenger from "~/assets/svg/icons/messenger2.svg?inline";

  export default {
    name: "AppNotificationHeader",
    components: {
      IconBell,
      IconCart,
      IconMessenger
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/components/app/_app-notification-header.scss";
</style>