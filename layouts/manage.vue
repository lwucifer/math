<template>
  <div class="page-wrap layout-manage">
    <TheHeaderManager />

    <nuxt class="page-content"/>

    <portal-target name="modal" slim></portal-target>
  </div>
</template>

<script>
import TheHeaderManager from "~/components/layout/header/HeaderManager"

export default {
  components: {
    TheHeaderManager,
  }
}
</script>

<style lang="scss">
.layout-create {
  padding-top: 80px;
  display: flex;
  flex-direction: column;

  .page-content {
    flex-grow: 1;
  }
}
</style>
