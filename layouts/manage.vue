<template>
  <div class="page-wrap layout-manage" :class="show ? 'open-side' : ''">
    <Header />

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
import Header from "~/components/layout/header/Header"
import Footer from "~/components/layout/footer/Footer"
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline"

export default {
  middleware: ["teacher-role"],
  
  components: {
    Header,
    Footer,
    IconHamberger
  },

  data() {
    return {
      show: false
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
