<template>
  <div class="page-wrap layout-create">
    <nuxt class="page-content" />

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Footer from "~/components/layout/footer/Footer";

export default {
  middleware: ["authenticated"],

  components: {
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
      return {};
    }
  },

  computed: {
    ...mapState(["desktopView"])
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_create.scss";
</style>
