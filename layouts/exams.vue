<template>
  <div class="page-wrap layout-default">
    <TheHeader />

    <nuxt class="page-content"/>

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TheHeader from "~/components/layout/header/Header"
import Footer from "~/components/layout/footer/Footer"

export default {
  middleware: ["authenticated", "teacher-role"],
  
  components: {
    TheHeader,
    Footer
  },

  head() {
    if (this.$device.isMobile && this.desktopView) {
      return {
        meta: [
          {
            hid: "viewport",
            name: "viewport",
            content: "width=1200, user-scalable=yes"
          }
        ]
      };
    } else {
      return {}
    }
  },

  computed: {
    ...mapState(["desktopView"])
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
