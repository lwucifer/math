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
              :disabled="!hasData"
              title="Chọn tất cả"
            />
          </th>
          <th v-for="(item, index) in heads" :key="index">
            <div v-html="item.text"></div>
            <!--<app-checkbox @change="changeSelect" v-if="item.selectAll" v-model="allSelected" />-->
            <span class="btn-sort" @click="sort(item.name)" v-if="item.sort">
              <IconDirection height="18" width="18" />
            </span>
          </th>
        </tr>
      </thead>
      <!-- Use slot body -->
      <tbody v-if="hasDefaultSlot && hasData">
        <slot />
      </tbody>
      <!-- Use data list -->
      <tbody v-if="(!hasDefaultSlot) && hasData && (!loading)">
        <tr v-for="(cat, i) in sortedCats" :key="i" :class="selectedItems.includes(cat) ? 'selected' : ''">
        
          <td v-if="multipleSelection || selectAll" class="pr-0" 
          @mouseover="mouseOver = false" 
          @mouseleave="mouseOver = true">
            <app-checkbox
              @change="check($event, cat)"
              :checked="selectedItems.includes(cat)"
            />
          </td>
          <!--Slot is named by column key-->
          <template>
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
              :key="j"
            >
            </td>
          </slot>
          </template>

          <!-- Hover actions -->
          <div class="actions" :class="mouseOver ? 'show' : ''">
            <slot name="actions" :row="cat"></slot>
          </div>
        </tr>
      </tbody>
    </table>
    <div class="text-center w-100 py-5" v-if="(!hasData) && (!loading)">
      {{ noDataTxt }}
    </div>
    <div class="text-center w-100 py-5" v-if="loading"><app-spin /></div>
    <div v-if="needPagination" class="pagination mt-3">
      <app-pagination v-if="hasData && (!loading)" :pagination="pagination" @pagechange="onPageChange" :opts="opts" class="mt-3" />
    </div>
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import IconStarO from "~/assets/svg/icons/star-o.svg?inline";
import IconDirection from "~/assets/svg/design-icons/direction.svg?inline";
import { isEqual } from "lodash";

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
      default: () => {
        return {
          total: 0,
          size: 10,
          totalElements: 0,
          first: 1,
          last: 1,
          number: 0
        }
      }
    },
    selectAll: Boolean,
    multipleSelection: {
      type: Boolean,
      default: false,
      required: false
    },
    opts: {
      type: Array,
      default: () => {
        return [
          { value: 10, text: "10" },
          { value: 20, text: "20" },
          { value: 30, text: "30" },
          { value: 50, text: "50" }
        ]
      }
    },
    noDataTxt: {
      type: String,
      default: 'Không tìm thấy dữ liệu'
    },
    loading: {
      type: Boolean,
      default: false
    },
    needPagination: {
      type: Boolean,
      default: true
    },
    primaryKey: {
      type: String,
      default: 'id'
    },
  },

  data() {
    return {
      mouseOver: true,
      listSortBy: [],
      currentSort: "name",
      currentSortDir: "asc",
      selectedItems: [], // An array of selected rows
    };
  },
  watch: {
    selectedItems: function (oldVal, newVal) {
      this.$emit("selectionChange", this.selectedItems);
    }
  },
  methods: {
    check(checked, item) {
      if (checked) {
        this.pushSelectedIndexes(item);
      } else {
        this.popSelectedIndexes(item);
      }
      this.$emit("check", item);
    },

    popSelectedIndexes(item) {
      if (_.some(this.selectedItems, item)) { // this.selectedItems include item
        let popId = item[this.primaryKey];
        this.selectedItems = _.reject([...this.selectedItems], (i) => i[this.primaryKey] === popId);
      }
    },

    pushSelectedIndexes(item) {
      if (!(_.some(this.selectedItems, item))) { // this.selectedItems include item
        this.selectedItems.push(item);
      }
    },

    changeSelect(checked) {// select all
      if (checked) {
        this.selectedItems = this.data;
      } else {
        this.selectedItems = [];
      }
      this.$emit("selectAll", this.selectedItems);
    },

    sort: function(sortBy) {
      if (sortBy === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = sortBy;
      this.$emit("sort", { sortBy: this.currentSort, order: this.currentSortDir });
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
    cats: function() {
      return this.data;
    },
    allSelected: {
      set(value) {
        return value
      },
      get() {
        return this.hasData && isEqual(this.selectedItems, this.data)
      }
    },
    hasData() {
      return this.data.length > 0
    }
  },

  created() {
    // this.cats = [...this.data];
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-table.scss";
</style>