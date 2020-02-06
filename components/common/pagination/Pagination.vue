<template>
  <ul class="app-pagination">
    <li v-if="prev && prev != 1">
        <a class="link" @click="goTo(1)">1</a>
    </li>
    <li v-if="prev">
      <a class="link" @click="goTo(prev)">{{ prev }}</a>
    </li>
    <li>
      <a class="link active">{{ current }}</a>
    </li>
    <li v-if="total == current">
        <a class="link" @click="goTo(total - 2)">{{ total - 2 }}</a>
    </li>
    <li>
      <a class="link" @click="goTo(next)">{{ next }}</a>
    </li>
    <li v-if="current == 1">
        <a class="link" @click="goTo(3)">3</a>
    </li>
    <li>
        <a class="link" @click="goTo(total)">{{ total }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      current: null,
      prev: null,
      next: null,
      total: null
    };
  },

  props: {
    pagination: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
      goTo(e) {
         this.current = e; 
      }
  },

  watch: {
    current() {
      this.$emit("goTo", this.current);
    }
  },

  computed: {
    prev() {
      if (this.pagination.current > 1) {
        return this.pagination.current - 1;
      }
    },
    next() {
      if (this.pagination.current < this.pagination.total) {
        return this.pagination.current + 1;
      }
    },
    current() {
        return this.this.pagination.current
    },
    total() {
        return this.this.pagination.total
    }
  },
  created() {
    //this.prev = this.sex;
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-pagination.scss";
</style>