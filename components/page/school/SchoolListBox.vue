<template>
  <div class="school-list-box">
    <!--List schools-->
    <div class="school-list-box__content">
      <div class="row row--school-list">
        <div
          class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3"
          v-for="(school, index) in schools"
          :key="index"
        >
          <school-item :school="school" />
        </div>
      </div>

      <app-pagination
        :pagination="pagination"
        @pagechange="onPageChange"
        :opts="opts"
        class="mt-3"
      />
    </div>
  </div>
</template>

<script>
import IconRight from "~/assets/svg/icons/arrow-forward-ios-24px-outlined.svg?inline";

import SchoolItem from "~/components/page/school/SchoolItem";
import { get, toNumber } from "lodash";
import { SCHOOL_TYPE } from "~/server/fakedata/school/test";

export default {
  components: {
    SchoolItem,
    IconRight
  },

  props: {
    category: {
      type: Object,
      required: true
    },
    schoolSearch: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      pagination: {
        totalPages: 5,
        size: 10,
        totalElements: 50,
        first: 1,
        last: 5,
        number: 1
      },
      opts: [
        { value: 10, text: "10" },
        { value: 20, text: "20" },
        { value: 30, text: "30" },
        { value: 50, text: "50" }
      ]
    };
  },

  computed: {
    schools() {
      const type = get(this, "category.type", "");
      const schoolList = get(this, `schoolSearch.data.content`, []);
      // console.log("[schoolList]", schoolList, type);
      if (!type) return schoolList;
      return schoolList.filter(sc => sc.type == type) || [];
    }
  },

  methods: {
    onPageChange(e) {
      this.$emit("pagechange", e);
    },
    showAll() {
      this.$emit("showAll", this.id);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-list-box.scss";
</style>
