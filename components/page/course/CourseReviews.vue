<template>
  <div class="course-rates__commnents">
    <course-rate-comment
      :review="review"
      v-for="(review, index) in reviews"
      :key="index"
    />
    <app-pagination
      :pagination="pagination"
      @pagechange="onPageChange"
      class="mt-4 mb-3"
    />
  </div>
</template>

<script>
import CourseStars from "~/components/page/course/CourseStars";
import CourseRateComment from "~/components/page/course/CourseRateComment";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { useEffect } from "~/utils/common";
import { mapState } from "vuex";
import CourseRatesFilter from "~/components/page/course/CourseRatesFilter";

export default {
  components: {
    CourseRateComment
  },

  props: {
    reviews: {
      types: Array,
      default: []
    },
    page: {
      types: Object,
      default: null
    }
  },

  data() {
    return {
      active: 0,
      pagination: {
        total: 15,
        page: 6,
        pager: 10
      }
    };
  },

  methods: {
    get,
    onPageChange(e) {
      this.pagination = { ...this.pagination, ...e };
      console.log(this.pagination);
    }
  }
};
</script>
