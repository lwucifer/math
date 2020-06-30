<template>
  <div class="page-wrap layout-manage">
    <Header />

    <nuxt class="page-content"/>

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "~/components/layout/header/Header"
import Footer from "~/components/layout/footer/Footer"

export default {
  middleware: ["teacher-role"],
  
  components: {
    Header,
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
};
</script>

<style lang="scss">
.layout-manage {
  display: flex;
  flex-direction: column;

  .page-content {
    flex-grow: 1;
  }
}
</style>
