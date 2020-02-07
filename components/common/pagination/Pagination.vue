<template>
  <ul class="app-pagination">
    <li v-if="prev && prev != 1">
      <a class="link" @click="goTo(1)">1</a>
    </li>
    <li v-if="total == current">
      <a class="link" @click="goTo(total - 2)">{{ total - 2 }}</a>
    </li>
    <li v-if="prev">
      <a class="link" @click="goTo(prev)">{{ prev }}</a>
    </li>
    <li>
      <a class="link active">{{ current }}</a>
    </li>
    <li v-if="next">
      <a class="link" @click="goTo(next)">{{ next }}</a>
    </li>
    <li v-if="current == 1">
      <a class="link" @click="goTo(3)">3</a>
    </li>
    <li v-if="total - current > 2">
      <a class="link bold disable">...</a>
    </li>
    <li v-if="total - current > 1">
      <a class="link" @click="goTo(total)">{{ total }}</a>
    </li>
  </ul>
</template>

<script>
import IconDots from "~/assets/svg/icons/dots.svg?inline";

export default {
  components: {
    IconDots
  },

  data() {
    return {};
  },

  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    pagination: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  methods: {
    goTo(e) {
      const that = this;
      that.$emit("pagechange", e);
    }
  },

  computed: {
    pages() {
      return this.pagination;
    },
    current() {
      return this.pagination.page;
    },
    total() {
      return this.pagination.total;
    },
    prev() {
      return this.pagination.page > 1 ? this.pagination.page - 1 : null;
    },
    next() {
      return this.pagination.page < this.pagination.total
        ? this.pagination.page + 1
        : null;
    }
  },
  created() {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-pagination.scss";
</style>