<template>
  <div class="elearning-review">
    <div class="elearning-review__top mb-4">
      <div class="row items-center">
        <div class="col-md-6 col-sm-12">
          <div class="text-center d-inline-block">
            <strong class="h1 color-primary">4.5</strong>
            <app-stars :stars="4" :size="16" class="mt-2 mb-3" />
            <p class="color-999">(15 người đánh giá)</p>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <ElearningStars :five="50" :four="30" :three="10" :two="10" :one="0" />
        </div>
      </div>
    </div>

    <div class="elearning-review__nav mb-4">
      <app-button
        v-for="tab in tabs"
        class="mr-4"
        :color="tabActive === tab.key ? 'primary' : 'gray'"
        normal
        :key="tab.key"
        size="sm"
        square
        @click="tabActive = tab.key"
      >
        {{ tab.text }}
        <template v-if="tab.quantity">({{ tab.quantity || 0 }})</template>
      </app-button>
    </div>

    <div class="elearning-review__commnents">
      <ElearningReviewComment :data="{}" v-for="(item, index) in  5" :key="index" />
      <app-pagination :pagination="pagination" @pagechange="onPageChange" class="mt-4 mb-3" />
    </div>
  </div>
</template>
<script>
import ElearningStars from "~/components/page/elearning/ElearningStars";
import ElearningReviewComment from "~/components/page/elearning/ElearningReviewComment";

export default {
  components: {
    ElearningStars,
    ElearningReviewComment
  },

  props: {
    reviews: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      pagination: {
        total: 15,
        page: 6,
        pager: 10
      },
      tabActive: "all",
      tabs: [
        { key: "all", text: "Tất cả", quantity: "" },
        { key: "5", text: "5 sao", quantity: "" },
        { key: "4", text: "4 sao", quantity: "" },
        { key: "3", text: "3 sao", quantity: "" },
        { key: "2", text: "2 sao", quantity: "" },
        { key: "1", text: "1 sao", quantity: "" }
      ]
    };
  },

  methods: {
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