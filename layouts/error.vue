<template>
  <div class="container">
      <component :is="errorPage" :error="error"/>
  </div>
</template>

<script>
import error404 from '~/components/layout/error/404.vue'
export default {
    name: 'page-error',
    layout: 'default', // optional
    props: {
        error: {
        type: Object,
        default: () => {},
        },
    },
    computed: {
        errorPage() {
        if (this.error.statusCode === 404) {
            return error404;
        }
        },
    }
}
</script>

<style>

</style>