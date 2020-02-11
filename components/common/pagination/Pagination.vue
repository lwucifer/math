<template>
  <div>
    <ul class="app-pagination" v-if="total < 8">
      <li v-for="(i, index) in parseInt(total, 10)" :key="index">
        <a class="link" :class="i == current ? 'active' : ''" @click="goTo(i)">{{i}}</a>
      </li>
    </ul>

    <ul class="app-pagination" v-else-if="total > 1">
      <li v-if="prev && prev != 1">
        <a class="link" @click="goTo(1)">1</a>
      </li>
      <li v-if="current > 3 && total > 4">
        <a class="link" @click="goTo(4)" v-if="current == 4  || total == 5">2</a>
        <a class="link bold disable" v-else>...</a>
      </li>
      <li v-if="total == current && total > 3">
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
      <li v-if="current == 1 && total > 3">
        <a class="link" @click="goTo(3)">3</a>
      </li>
      <li v-if="total - current > 2 && total > 4">
        <a class="link" @click="goTo(4)" v-if="total - current == 3 || total == 5">{{total - 1}}</a>
        <a class="link bold disable" v-else>...</a>
      </li>
      <li v-if="total - current > 1">
        <a class="link" @click="goTo(total)">{{ total }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 7
    },
    pagination: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  methods: {
    goTo(e) {
      this.$emit("pagechange", e);
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