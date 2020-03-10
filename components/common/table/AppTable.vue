<template>
  <div class="app-table">
    <table>
      <thead>
        <tr>
          <th
            v-if="multipleSelection"
          >
            <app-checkbox
              @change="changeSelect"
              v-model="allSelected"
              title="Chọn tất cả"
            />
            <hr />
          </th>
          <th v-for="(item, index) in heads" :key="index">
            {{item.text}}
            <!--<app-checkbox @change="changeSelect" v-if="item.selectAll" v-model="allSelected" />-->
            <span class="btn-sort" @click="sort(item.name)" v-if="item.sort">
              <IconDirection height="18" width="18" />
            </span>
            <hr />
          </th>
        </tr>
      </thead>
      <!-- Use slot body -->
      <tbody v-if="hasDefaultSlot">
        <slot />
      </tbody>
      <!-- Use data list -->
      <tbody v-else>
        <tr v-for="(cat, i) in sortedCats" :key="i">
          <td v-if="multipleSelection || selectAll" class="pr-0">
            <app-checkbox
              @change="check($event, i)"
              :checked="selectedIds.includes(i)"
            />
          </td>
          <!--Slot is named by column key-->
          <slot
            v-for="(item, j) in heads"
            :item="item"
            :index="i"
            :row="cat"
            :name="'cell(' + item.name + ')'"
          >
            <td
              v-html="cat[item.name]"
              v-bind:style="cat[item.css] ? cat[item.css] : ''"
            >

            </td>
          </slot>
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
    },
    selectAll: Boolean,
    multipleSelection: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  data() {
    return {
      cats: [],
      listSortBy: [],
      currentSort: "name",
      currentSortDir: "asc",
      allSelected: false,
      selectedIds: [], // An array of indexes of selected row (0, 1, 2, ...)
    };
  },
  watch: {
    selectedIds: function (oldVal, newVal) {
      this.$emit("selectionChange", this.selectedRows);
    }
  },
  methods: {
    check(checked, index) {
      if (checked) {
        this.pushSelectedIndexes(index);
      } else {
        this.popSelectedIndexes(index);
      }
      this.$emit("check", this.data[index]);
    },

    popSelectedIndexes(index) {
      if (this.selectedIds.includes(index)) {
        this.selectedIds.forEach((item, i) => {
          if(item == index) {
            this.selectedIds.splice(i, 1);
          }
        });
      }
    },

    pushSelectedIndexes(index) {
      if (!this.selectedIds.includes(index)) {
        this.selectedIds.push(index);
      }
    },

    changeSelect(checked) {
      if (checked) {
        let tmp = [];
        this.data.forEach((item, i) => {
          tmp[i] = i;
        });
        this.selectedIds = tmp;
      } else {
        this.selectedIds = [];
      }
      this.$emit("selectAll", this.ids);
    },

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
      for (let i = this.cats.length - 1; i > 0; i--) {
        let check = true;
        for (let k = 0; k < i; k++) {
          if (this.currentSortDir === "desc") {
            if (
              this.cats[k][this.currentSort] >
              this.cats[k + 1][this.currentSort]
            ) {
              this.swap(this.cats, k, k + 1);
            }
            this.currentSortDir === "asc";
            check = false;
          } else {
            if (
              this.cats[k][this.currentSort] <
              this.cats[k + 1][this.currentSort]
            ) {
              this.swap(this.cats, k, k + 1);
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
    },
    ids: function() {
      const that = this;
      let ids = [];
      if (that.allSelected) {
        that.cats.forEach(function(item) {
          ids.push(item.id);
        });
      }
      return ids;
    },
    selectedRows: function() {
      const data = [];
      this.selectedIds.forEach(value => {
        data.push(this.data[value]);
      });
      return data;
    }
  },

  created() {
    this.cats = [...this.data];
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-table.scss";
</style>