<template>
  <div class="elearning-search container">
    <h1 class="elearning-search__heading heading-3">
      <span class="font-weight-semi-bold">Toán học</span>
      <span class="body-2 font-weight-normal">
        (
        <b>50</b> bài giảng -
        <b>20</b> khoá học)
      </span>
    </h1>

    <div class="elearning-search__toolbar">
      <app-button :color="isFilter ? 'primary' : 'default'" size="sm" @click="isFilter = !isFilter">
        <IconHamberger class="icon mr-1" />&nbsp;Lọc kết quả
      </app-button>

      <template v-if="isFilter">
        <app-select v-model="fee" :options="feeOpts" placeholder="Học phí" size="sm" />
        <app-select v-model="time" :options="timeOpts" placeholder="Thời lượng" size="sm" />
        <app-select v-model="level" :options="levelOpts" placeholder="Trình độ" size="sm" />
      </template>

      <div class="ml-auto">
        <span class="text-dark body-3 mr-3">Sắp xếp</span>
        <app-select v-model="sort" :options="sortOpts" placeholder size="sm" />
      </div>
    </div>

    <div class="elearing-search__tabs">
      <a
        v-for="item in tabs"
        :key="item.tab"
        :href="`#${item.tab}`"
        :class="['elearning-search__tab', tab === item.tab && 'active']"
        @click.prevent="tab = item.tab"
      >{{ item.text }}</a>
    </div>

    <div v-if="pageLoading" class="container mt-6">
      <div class="row">
        <div v-for="i in 16" :key="i" class="col-md-3 mb-6">
          <div class="bg-white py-6 px-3">
            <VclList />
          </div>
        </div>
      </div>
    </div>

    <template v-for="item in tabs" v-else>
      <div
        v-show="item.tab === tab"
        class="elearning-search__tab-pane"
        :key="item.tab"
        :id="item.tab"
      >
        <div class="row">
          <div class="col-md-3 elearning-search__col" v-for="item in lessons" :key="item.id">
            <CourseItem2
              class="my-0"
              :to="`/elearning/${item.id}`"
              :image="get(item, 'avatar.medium', '')"
              :livestream="item && item.livestream && item.livestream.time"
              :name="item.name"
              :teacher="item.teacher"
              :averageRate="get(item, 'rates.average_rate', 0)"
              :totalReview="get(item, 'rates.total_review', 0)"
              :price="get(item, 'price.price')"
              :originalPrice="get(item, 'price.original_price')"
              :free="item.free"
              :discount="calcDiscount(item)"
            />
          </div>
        </div>

        <app-pagination
          :pagination="{
            first: true,
            last: false,
            number: 0,
            numberOfElements: 10,
            size: 10,
            totalElements: 65,
            totalPages: 7,
          }"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import Search from "~/services/elearning/public/Search";

import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import CourseItem2 from "~/components/page/course/CourseItem2";

import { VclList } from "vue-content-loading";

export default {
  name: "ELearningSearch",

  components: {
    IconHamberger,
    CourseItem2,
    VclList
  },

  created() {
    this.getLessons();
  },

  data() {
    return {
      fee: null,
      feeOpts: [
        { value: 0, text: "Học phí 1" },
        { value: 1, text: "Học phí 2" },
        { value: 2, text: "Học phí 3" },
        { value: 3, text: "Học phí 4" }
      ],
      fee: null,
      feeOpts: [
        { value: 0, text: "Học phí 1" },
        { value: 1, text: "Học phí 2" },
        { value: 2, text: "Học phí 3" },
        { value: 3, text: "Học phí 4" }
      ],
      time: null,
      timeOpts: [
        { value: 0, text: "Thời lượng 1" },
        { value: 1, text: "Thời lượng 2" },
        { value: 2, text: "Thời lượng 3" },
        { value: 3, text: "Thời lượng 4" }
      ],
      level: null,
      levelOpts: [
        { value: 0, text: "Trình độ 1" },
        { value: 1, text: "Trình độ 2" },
        { value: 2, text: "Trình độ 3" },
        { value: 3, text: "Trình độ 4" }
      ],
      sort: 0,
      sortOpts: [
        { value: 0, text: "Mới nhất" },
        { value: 1, text: "Liên quan nhất" },
        { value: 2, text: "Đánh giá cao nhất" },
        { value: 3, text: "Nhiều bình luận nhất" },
        { value: 4, text: "Giá thấp nhất" },
        { value: 5, text: "Giá cao nhất" }
      ],
      isFilter: false,
      lessons: [],
      tab: "lecture",
      tabs: [
        {
          tab: "lecture",
          text: "Bài giảng"
        },
        {
          tab: "course",
          text: "Khoá học"
        }
      ],
      payload: {
        subject: ""
      },

      pageLoading: true,
    };
  },

  mounted() {
    this.pageLoading = false;
  },

  methods: {
    get,

    async getLessons() {
      const res = await new Search(this.$axios)[actionTypes.BASE.ADD](
        this.payload
      );
      this.lessons = get(res, "data.content", []);
    },

    calcDiscount(elearning) {
      const { price = {} } = elearning;
      const currentPrice = price.price || 0;
      const originPrice = price.original_price || 0;
      return (currentPrice / originPrice) * 100;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-search.scss";
</style>
