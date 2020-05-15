<template>
  <elearning-list />
</template>

<script>
import ElearningList from './elearning'

export default {
  components: {
    ElearningList,
  },
  middleware: ["teacher-role"],
  data() {
    return {
    }
  },
  computed: {
  },

  methods: {
  
  }
};
</script>

<style lang="scss" scoped>
</style>