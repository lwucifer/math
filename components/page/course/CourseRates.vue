<template>
  <div class="course-rates">
    <div class="course-rates__top">
      <div class="row items-center">
        <div class="col-md-6 col-sm-12">
          <div class="text-center d-inline-block">
            <strong class="h1 color-primary">{{
              get(votes, "reviews.averageRate", 0)
            }}</strong>
            <app-stars
              :stars="Math.floor(get(votes, 'reviews.averageRate', 0))"
              :size="16"
              class="mt-2 mb-2"
            />
            <p class="color-999">
              ({{ get(votes, "reviews.totalReview", 0) }} người đánh giá)
            </p>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <course-stars :rates="get(votes, 'reviews.rates', 0)" />
        </div>
      </div>
    </div>

    <div class="course-rates__nav">
      <app-button
        square
        normal
        :color="active == 0 ? 'primary' : 'gray'"
        @click="active = 0"
        >Tất cả
      </app-button>

      <app-button
        square
        normal
        :color="active == 5 ? 'primary' : 'gray'"
        @click="active = 5"
        >5 sao (500)
      </app-button>

      <app-button
        square
        normal
        :color="active == 4 ? 'primary' : 'gray'"
        @click="active = 4"
        >4 sao (400)
      </app-button>

      <app-button
        square
        normal
        :color="active == 3 ? 'primary' : 'gray'"
        @click="active = 3"
        >3 sao (10)
      </app-button>

      <app-button
        square
        normal
        :color="active == 2 ? 'primary' : 'gray'"
        @click="active = 2"
        >2 sao (2)
      </app-button>

      <app-button
        square
        normal
        :color="active == 1 ? 'primary' : 'gray'"
        @click="active = 1"
        >1 sao (0)
      </app-button>
    </div>

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

export default {
  components: {
    CourseStars,
    CourseRateComment
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
