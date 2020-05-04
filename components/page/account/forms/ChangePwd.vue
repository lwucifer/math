<template>
  <div>
    Change pwd
  </div>
</template>

<script>
  import { DATE_SHORTCUT} from "~/utils/config";

  export default {
    data() {
      return {
        filters: {
          time: ''
        },
        DATE_SHORTCUT: DATE_SHORTCUT
      }
    },
    methods: {
      submit() {
        console.log('[Submit filter]')
      }
    }
  }
</script>

<style scoped>

</style>