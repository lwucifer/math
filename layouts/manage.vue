<template>
  <div class="page-wrap layout-manage">
    <Header />

    <nuxt class="page-content"/>

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Header from "~/components/layout/header/Header"
import Footer from "~/components/layout/footer/Footer"
import { TITLE_PAGE_DEFAULT } from "~/utils/config"

export default {
  middleware: ["teacher-role"],
  
  components: {
    Header,
    Footer
  },

  head() {
    if (this.$device.isMobile && this.desktopView) {
      return {
        titleTemplate: this.titlePg ? this.titlePg : TITLE_PAGE_DEFAULT,
        meta: [
          {
            hid: "viewport",
            name: "viewport",
            content: "width=1200, user-scalable=yes"
          }
        ]
      };
    } else {
      return {
        titleTemplate: this.titlePg,
      }
    }
  },

  computed: {
    ...mapState(["desktopView"]),
    ...mapGetters("common", ["titlePg"])
  },

  data() {
    return {
      TITLE_PAGE_DEFAULT
    }
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
