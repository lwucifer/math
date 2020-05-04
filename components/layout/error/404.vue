<template>
  <div class="wrap404page">
      <Logo404/>
      <p>Trang không tồn tại</p>
      <app-button square size="md" color="white">
          <n-link to="/">
            <IconArrowLeft/>
            Quay lại trang chủ
          </n-link>
      </app-button>
  </div>
</template>

<script>
import IconArrowLeft  from "~/assets/svg/design-icons/arrow-left.svg?inline"
import Logo404 from "~/assets/svg/logo/logo-404.svg?inline"
export default {
    components:{
        Logo404,
        IconArrowLeft
    },
    name: 'error-404',
    props: {
      error: {
        type: Object,
        default: () => {},
      },
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/pages/_page_404.scss";
</style>