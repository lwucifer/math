<template>
  <div class="course-rates">
    <div class="course-rates__top">
      <div class="row items-center">
        <div class="col-md-6 col-sm-12">
          <div class="text-center d-inline-block">
            <strong class="h1 color-primary">{{
              get(elearningInfo, "review_rate", 0)
            }}</strong>
            <app-stars
              :stars="elearningInfo.review_rate"
              :size="16"
              class="mt-2 mb-2"
            />
            <p class="color-999">
              ({{ get(elearningInfo, "review_count", 0) }} người đánh giá)
            </p>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <course-stars :five="50" :four="30" :three="10" :two="10" :one="0" />
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
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-rates.scss";
</style>
