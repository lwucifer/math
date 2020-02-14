<template>
  <div class="app-table">
    <table>
      <thead>
        <tr>
          <th v-for="(item, index) in heads" :key="index" @click="sort(item.name)">{{item.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, i) in sortedCats" :key="i">
          <td v-for="(item, j) in heads" :key="j">{{ cat[item.name] }}</td>
        </tr>
      </tbody>
    </table>

    <app-pagination :type="2" :pagination="pagination" @pagechange="onPageChange" class="mt-3" />
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import IconStarO from "~/assets/svg/icons/star-o.svg?inline";

export default {
  components: {
    IconStar,
    IconStarO
  },

  props: {
    heads: {
      type: Array,
      required: false,
      default: () => []
    },
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    pagination: {
      type: Object,
      required: false,
      default: () => {}
    },
    type: [String, Number]
  },

  data() {
    return {
      cats: [],
      currentSort: "name",
      currentSortDir: "asc"
    };
  },

  methods: {
    sort: function(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    }
  },

  computed: {
    sortedCats: function() {
      return this.cats.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    }
  },

  created() {
    this.cats = [...this.data];
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-stars.scss";
</style>