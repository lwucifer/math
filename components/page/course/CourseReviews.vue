<template>
  <div class="course-rates__commnents">
    <course-rate-comment
      :review="review"
      v-for="(review, index) in reviews"
      :key="index"
    />
    <app-pagination
      :pagination="page"
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
      active: 0
    };
  },

  methods: {
    get,
    onPageChange(e) {
      this.pagination = { ...this.pagination, ...e };
      const elearning_id = get(this, "$route.params.id", "");
      const options = {
        params: {
          elearning_id: "39fe1dd5-2df2-465f-8cf7-59d4ead68189",
          page: get(this, "pagination.page", 1),
          size: 10
        }
      };
      this.$store.dispatch(
        `elearning/public/public-vote/${actionTypes.ELEARNING_PUBLIC_VOTE.LIST}`,
        options
      );
    }
  }
};
</script>
