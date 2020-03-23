<template>
  <div>
    <div class="app-pagination-2" v-if="type === 2">
      <div class="left">
        <span>Số dòng trên một trang</span>
        <app-select
          v-model="pager"
          :options="opts"
          class="select-pager"
          @change="goTo(current)"
        />
        <span
          >{{ pages.first }}-{{ pages.last }} của tổng số
          {{ pages.totalElements }}</span
        >
      </div>
      <div class="right">
        <span>Đi đến trang</span>
        <input
          type="text"
          class="current"
          :value="current"
          @change="e => goTo(parseInt(e.target.value))"
        />
        <ul>
          <li
            @click="goTo(1, current == 1)"
            :class="current == 1 ? 'disable' : ''"
          >
            <IconPrevious />
          </li>
          <li
            @click="goTo(prev, current == 1)"
            :class="current == 1 ? 'disable' : ''"
          >
            <IconAngleLeft />
          </li>
          <li
            @click="goTo(next, current == total)"
            :class="current == total ? 'disable' : ''"
          >
            <IconAngleRight />
          </li>
          <li
            @click="goTo(total, current == total)"
            :class="current == total ? 'disable' : ''"
          >
            <IconStepForward />
          </li>
        </ul>
      </div>
    </div>

    <ul class="app-pagination" v-else-if="total < 8">
      <li v-for="(i, index) in parseInt(total, 10)" :key="index">
        <a
          class="link"
          :class="i == current ? 'active' : ''"
          @click="goTo(i)"
          >{{ i }}</a
        >
      </li>
    </ul>

    <ul class="app-pagination" v-else-if="total > 1">
      <li v-if="prev && prev != 1">
        <a class="link" @click="goTo(1)">1</a>
      </li>
      <li v-if="current > 3 && total > 4">
        <a class="link" @click="goTo(4)" v-if="current == 4 || total == 5">2</a>
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
        <a
          class="link"
          @click="goTo(4)"
          v-if="total - current == 3 || total == 5"
          >{{ total - 1 }}</a
        >
        <a class="link bold disable" v-else>...</a>
      </li>
      <li v-if="total - current > 1">
        <a class="link" @click="goTo(total)">{{ total }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import IconAngleLeft from "~/assets/svg/design-icons/angle-left.svg?inline";
import IconAngleRight from "~/assets/svg/design-icons/angle-right.svg?inline";
import IconPrevious from "~/assets/svg/design-icons/previous.svg?inline";
import IconStepForward from "~/assets/svg/design-icons/step-forward.svg?inline";
import { toNumber, get } from "lodash";

export default {
  components: {
    IconPrevious,
    IconStepForward,
    IconAngleLeft,
    IconAngleRight
  },

  data() {
    return {
      pager: toNumber(get(this, 'pagination.size', 10)),
      opts: [
        { value: 10, text: "10" },
        { value: 20, text: "20" },
        { value: 30, text: "30" },
        { value: 50, text: "50" }
      ]
    };
  },

  props: {
    type: {
      type: Number,
      required: false,
      default: 1
    },
    pagination: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  methods: {
    goTo(e, check = false) {
      if (!check) {
        this.$emit("pagechange", { number: e, size: this.pager });
      }
    }
  },

  computed: {
    pages() {
      return this.pagination;
    },
    current() {
      return toNumber(get(this, 'pagination.number', 0)) + 1;
    },
    total() {
      return toNumber(get(this, 'pagination.totalPages', 0));
    },
    prev() {
      return this.current > 1 ? this.current - 1 : null;
    },
    next() {
      return this.current < this.total ? this.current + 1 : null;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-pagination.scss";
</style>
