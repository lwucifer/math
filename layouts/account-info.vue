<template>
  <div class="page-wrap layout-default">
  <TheHeader />
    <nuxt class="page-content"/>

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TheHeader from "~/components/layout/header/Header"

export default {
  middleware: ["authenticated"],
  
  components: {
    TheHeader
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
