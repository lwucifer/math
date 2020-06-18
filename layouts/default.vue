<template>
  <div class="page-wrap layout-default" :class="show ? 'open-side' : ''">
    <TheHeader />

    <div class="page-content" >
      <!--btn toggle side on tablet-->
      <button class="btn-toggle-side" @click="show = !show">
        <IconHamberger class="fill-primary"/>
      </button>
      <nuxt/>
    </div>

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import TheHeader from "~/components/layout/header/Header"
import Footer from "~/components/layout/footer/Footer"
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline"

export default {
  components: {
    TheHeader,
    Footer,
    IconHamberger
  },

  data() {
    return {
      show: false
    }
  }
}

</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
