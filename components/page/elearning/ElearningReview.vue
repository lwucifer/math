<template>
  <section class="scroll-target" id="review">
    <h5 class="mb-3">Đánh giá {{ title }}</h5>
    <div class="elearning-review">
      <div class="elearning-review__top mb-4">
        <div class="row items-center">
          <div class="col-md-6 col-sm-12">
            <div class="text-center d-inline-block">
              <strong class="h1 color-primary">{{
                get(info, "rates.averageRate", 0)
              }}</strong>
              <app-stars
                :stars="Math.floor(get(info, 'voting.average_rate', 0))"
                :size="16"
                class="mt-2 mb-3"
              />
              <p class="color-999">
                ({{ get(info, "voting.total_votes", 0) }} người đánh giá)
              </p>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <ElearningStars :voting="get(info, 'voting', null)" />
          </div>
        </div>
      </div>

      <ElearningReviewButton
        :info="info"
        @changeTab="changeTab"
        :tabActive="tabActive"
      />

      <div class="elearning-review__commnents">
        <div v-if="fetchingReview" class="text-center">
          <app-spin />
        </div>
        <div
          v-else-if="!localReview.content || !localReview.content.length"
          class="text-sub text-center"
        >
          Chưa có nhận xét nào phù hợp với tiêu chí bạn đã chọn
        </div>

        <ElearningReviewComment
          :data="item"
          v-for="item in get(localReview, 'content', [])"
          :key="item.id"
        />
        <app-pagination
          :pagination="get(localReview, 'page', {})"
          @pagechange="onPageChange"
          class="mt-4 mb-3"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { get } from "lodash";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import VoteService from "~/services/elearning/public/Vote.js";
import ElearningStars from "~/components/page/elearning/ElearningStars";
import ElearningReviewComment from "~/components/page/elearning/ElearningReviewComment";
import ElearningReviewButton from "~/components/page/elearning/ElearningReviewButton";
import { ELEARNING_TYPES } from "~/utils/constants";

export default {
  components: {
    ElearningStars,
    ElearningReviewComment,
    ElearningReviewButton,
  },

  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    title() {
      if (this.info) {
        switch (this.info.type) {
          case ELEARNING_TYPES.LECTURE:
            return "bài giảng";
            break;
          case ELEARNING_TYPES.COURSE:
            return "khoá học";
            break;
          default:
            break;
        }
      }
    },
  },

  data() {
    return {
      tabActive: "all",
      localReview: get(this.info, "reviews", []),
      fetchingReview: false,
      pagination: {
        totalPages: 15,
        number: 6,
        size: 10,
      },
    };
  },

  methods: {
    get,

    async changeTab(key) {
      this.tabActive = key;

      this.fetchingReview = true;
      const getReview = await this.getReview(key !== "all" ? key : null, 1);
      this.fetchingReview = false;

      if (getReview.success) {
        getReview.data.content = this.formatReviewData(getReview.data.content);
        this.localReview = getReview.data;
        return;
      }
      this.$toasted.error(getReview.message);
    },

    async onPageChange({ number }) {
      if (number === this.localReview.page.number) return;
      this.fetchingReview = true;

      const rate = this.tabActive !== "all" ? this.tabActive : null;
      const page = number + 1;
      const getReview = await this.getReview(rate, page);

      if (getReview.success) {
        getReview.data.content = this.formatReviewData(getReview.data.content);
        this.localReview = getReview.data;
        this.tabActive = key;
      } else {
        this.$toasted.error(getReview.message);
      }

      this.fetchingReview = false;
    },

    getReview(rate, page) {
      return new VoteService(this.$axios)[ACTION_TYPE_BASE.LIST]({
        params: {
          elearning_id: this.info.id,
          rate: rate,
          page: page,
        },
      });
    },

    formatReviewData(content) {
      return content.map((item) => ({
        avatar: get(item, "creator.avatar.low", ""),
        comment: item.content,
        created: item.timestamp,
        fullname: get(item, "creator.name", ""),
        rate: item.vote,
      }));
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-review.scss";
</style>
