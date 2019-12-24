<template>
  <div class="page-wrap layout-default">
    <TheHeader />

    <nuxt class="page-content"/>

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "~/components/TheHeader/TheHeader"
import TheFooter from "~/components/TheFooter/TheFooter"

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
