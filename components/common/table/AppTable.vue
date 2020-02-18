<template>
  <div class="app-table">
    <table>
      <thead>
        <tr>
          <th v-for="(item, index) in heads" :key="index">
            <div v-if="item.selectAll">
              <app-checkbox />
              <hr />
            </div>
            <div v-else>
              {{item.text}}
              <span class="btn-sort" @click="sort(item.name)" v-if="item.sort">
                <IconDirection height="18" width="18" />
              </span>
              <hr />
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="hasDefaultSlot">
        <slot />
      </tbody>
      <tbody v-else>
        <tr v-for="(cat, i) in sortedCats" :key="i">
          <td v-for="(item, j) in heads" :key="j" v-html="cat[item.name]"></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <hr />
      <app-pagination :type="2" :pagination="pagination" @pagechange="onPageChange" class="mt-3" />
    </div>
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import IconStarO from "~/assets/svg/icons/star-o.svg?inline";
import IconDirection from "~/assets/svg/design-icons/direction.svg?inline";

export default {
  components: {
    IconStar,
    IconStarO,
    IconDirection
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
    sortBy: Array,
    pagination: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data() {
    return {
      cats: [],
      listSortBy: [],
      currentSort: "name",
      currentSortDir: "asc"
    };
  },

  methods: {
    sort: function(sortBy) {
      if (sortBy === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = sortBy;
      this.$emit("sort", this.sortedCats);
    },
    onPageChange(e) {
      this.$emit("pagechange", e);
    },
    swap(array, i, k) {
      const temp = array[i];
      array[i] = array[k];
      array[k] = temp;
    }
  },

  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    sortedCats: function() {
      for (let i = this.listSortBy.length - 1; i > 0; i--) {
        let check = true;
        for (let k = 0; k < i; k++) {
          if (this.currentSortDir === "desc") {
            if (
              this.listSortBy[k][this.currentSort] >
              this.listSortBy[k + 1][this.currentSort]
            ) {
              this.swap(this.cats, k, k + 1);
              this.swap(this.listSortBy, k, k + 1);
            }
            this.currentSortDir === "asc";
            check = false;
          } else {
            if (
              this.listSortBy[k][this.currentSort] <
              this.listSortBy[k + 1][this.currentSort]
            ) {
              this.swap(this.cats, k, k + 1);
              this.swap(this.listSortBy, k, k + 1);
            }
            this.currentSortDir === "desc";
            check = false;
          }
        }
        if (check) {
          break;
        }
      }
      return this.cats;
    }
  },

  created() {
    this.cats = [...this.data];
    this.listSortBy = this.sortBy ? [...this.sortBy] : [...this.data];
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-table.scss";
</style>