<template>
  <div class="elearning-review">
    <div class="elearning-review__top mb-4">
      <div class="row items-center">
        <div class="col-md-6 col-sm-12">
          <div class="text-center d-inline-block">
            <strong class="h1 color-primary">{{ get(info, 'rates.averageRate', 0) }}</strong>
            <app-stars :stars="Math.floor(get(info, 'rates.averageRate', 0))" :size="16" class="mt-2 mb-3" />
            <p class="color-999">({{ get(info, 'rates.totalReview', 0) }} người đánh giá)</p>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <ElearningStars :rates="get(info, 'rates.rates', [])" />
        </div>
      </div>
    </div>

    <div class="elearning-review__nav mb-4">
      <app-button
        class="mr-4"
        :color="tabActive === 'all' ? 'primary' : 'gray'"
        normal
        size="sm"
        square
        @click="tabActive = 'all'"
      >Tất cả</app-button>

      <app-button
        v-for="rate in get(info, 'rates.rates', [])"
        class="mr-4"
        :color="tabActive === rate.rate ? 'primary' : 'gray'"
        normal
        :key="rate.rate"
        size="sm"
        square
        @click="tabActive = rate.rate"
      >
        {{ `${rate.rate} sao (${rate.count})` }}
      </app-button>
    </div>

    <div class="elearning-review__commnents">
      <ElearningReviewComment :data="item" v-for="item in get(info, 'reviews.content', [])" :key="item.id" />
      <app-pagination :pagination="pagination" @pagechange="onPageChange" class="mt-4 mb-3" />
    </div>
  </div>
</template>
<script>
import { get } from "lodash";
import ElearningStars from "~/components/page/elearning/ElearningStars";
import ElearningReviewComment from "~/components/page/elearning/ElearningReviewComment";

export default {
  components: {
    ElearningStars,
    ElearningReviewComment
  },

  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      pagination: {
        totalPages: 15,
        number: 6,
        size: 10
      },
      tabActive: "all"
    };
  },

  methods: {
    get,

    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-review.scss";
</style>