<template>
  <div class="course-rates">
    <course-stars :reviews="get(votes, 'reviews', null)" />

    <course-rates-filter :rates="get(votes, 'reviews.rates', [])" />

    <div class="course-rates__commnents">
      <course-rate-comment
        :review="review"
        v-for="(review, index) in get(elearningInfo, 'reviews.content', [])"
        :key="index"
      />
      <app-pagination
        :pagination="pagination"
        @pagechange="onPageChange"
        class="mt-4 mb-3"
      />
    </div>
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
    CourseStars,
    CourseRateComment,
    CourseRatesFilter
  },

  props: {
    elearningInfo: {
      type: Object,
      default: () => {}
    }
  },

  created() {
    this.getElearningPublicVotes();
    useEffect(this, this.getElearningPublicVotes.bind(this), [
      "$route.params.id"
    ]);
  },

  computed: {
    ...mapState("elearning/public/public-vote", {
      votes: "votes"
    })
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
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    },
    get,
    getElearningPublicVotes() {
      const elearning_id = get(this, "$route.params.id", "");
      const options = {
        params: {
          elearning_id: "39fe1dd5-2df2-465f-8cf7-59d4ead68189",
          page: 1,
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

<style lang="scss">
@import "~/assets/scss/components/course/_course-rates.scss";
</style>
