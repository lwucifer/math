<template>
  <elearning-list />
</template>

<script>
import ElearningList from './elearning'
import { initBreadcrumb, createPageTitle, initPageTitle } from "~/utils/common";

export default {
  layout: "manage",

  components: {
    ElearningList,
  },
  
  data() {
    return {
    }
  },
  computed: {
  },

  methods: {
  
  },
  mounted() {
    const breadcrumb = [
      {
        title: 'Quản lý E-learning',
        to: '/elearning'
      },
      {
        title: 'Bài tập và bài kiểm tra',
        to: '/elearning/manager/exams'
      },
    ]
    initBreadcrumb(this, breadcrumb);
    initPageTitle(this, createPageTitle('Quản lý bài tập & bài kiểm tra'));
  }
};
</script>

<style lang="scss" scoped>
</style>