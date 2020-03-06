<template>
  <div class="course-rates">
    <course-stars :reviews="get(votes, 'reviews', null)" />
    <course-rates-filter :rates="get(votes, 'reviews.rates', [])" />
    <course-reviews
      :reviews="get(votes, 'content', [])"
      :page="get(votes, 'page', null)"
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
import CourseReviews from "~/components/page/course/CourseReviews";

export default {
  components: {
    CourseStars,
    CourseRateComment,
    CourseRatesFilter,
    CourseReviews
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

  methods: {
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
