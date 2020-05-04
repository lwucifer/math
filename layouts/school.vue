<template>
  <div class="page-wrap layout-school">
    <TheHeaderSchool />

    <nuxt class="page-content"/>

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import TheHeaderSchool from "~/components/layout/header/HeaderSchool"

export default {
  components: {
    TheHeaderSchool,
  }
}
</script>

<style lang="scss">
.layout-school {
  padding-top: 80px;
  display: flex;
  flex-direction: column;

  .page-content {
    flex-grow: 1;
  }
}
</style>
