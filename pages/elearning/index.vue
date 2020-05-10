<template>
  <div class="elearning-homepage">
    <ElearingHomeBanner />

    <div class="container mt-6">
      <ElearningHomeBox title="Học gì tiếp theo">
        <ul slot="title-right" class="elearning-home-box__tab">
          <li>
            <a href class="active">Bài giảng nổi bật</a>
          </li>
          <li>
            <a href>khóa học nổi bật</a>
          </li>
        </ul>

        <app-carousel :options="{ slidesPerView: 4, spaceBetween: 24 }">
          <template slot="default" slot-scope="{ classes }">
            <div
              v-for="item in get(elearnings, 'highlight.lectures', [])"
              :key="item.id"
              :class="classes"
            >
              <CourseItem2
                :to="`/elearning/${item.id}`"
                :image="get(item, 'avatar.medium', '')"
                :livestream="true"
                :name="item.name"
                :teacher="item.teacher"
                :averageRate="4"
                :totalReview="476"
                :price="319000"
                :originalPrice="519000"
                :free="false"
                :discount="30"
              />
            </div>
          </template>
        </app-carousel>
      </ElearningHomeBox>

      <ElearningHomeBox>
        <h2 slot="title" class="heading-3 font-weight-medium mb-3">Dành cho bạn</h2>

        <app-carousel :options="{ slidesPerView: 1 }">
          <template slot="default" slot-scope="{ classes }">
            <div
              v-for="item in get(elearnings, 'highlight.lectures', [])"
              :key="item.id"
              :class="classes"
            >
              <ElearningHomePersonalBox
                :image="get(item, 'avatar.medium', '')"
                :title="item.name"
                :teacher="item.teacher"
                :average-rate="get(item, 'rates.average_rate', 0)"
                :total-review="get(item, 'rates.total_review', 0)"
                :description="`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor vitae maecenas nec nisl ornare nec duis. Tempor, non dolor tincidunt turpis eget sit egestas eget dui.`"
                :price="get(item, 'price.price', 0)"
                :originalPrice="get(item, 'price.original_price', 0)"
                :free="!!item.free"
              />
            </div>
          </template>
        </app-carousel>
      </ElearningHomeBox>

      <ElearningHomeBox title="Môn học được yêu thích">
        <div
          slot="title-right"
          class="swiper-pagination eh-subject-pagination"
        ></div>
        <!-- <ol slot="title-right" v-if="subjects.length" class="eh-subject-pagination">
          <li v-for="(item, index) in subjects" :key="index" @click="handleClickSubjectPaginationItem(index)"></li>
        </ol>-->
        <app-carousel
          class="eh-subject-carousel"
          :options="{
            slidesPerView: 5,
            spaceBetween: 22,
            pagination: {
              el: '.eh-subject-pagination',
              type: 'bullets',
              clickable: true
            },
          }"
        >
          <template slot-scope="{ classes }">
            <div v-for="item in subjects" :key="item.title" :class="classes">
              <ElearningHomeSubjectItem :title="item.title">
                <component slot="icon" :is="item.icon" />
              </ElearningHomeSubjectItem>
            </div>
          </template>
        </app-carousel>
      </ElearningHomeBox>

      <ElearningHomeBox>
        <h2 slot="title" class="heading-3 font-weight-medium">Bài giảng mới nhất</h2>
        <n-link
          slot="title-right"
          to
          class="align-self-end d-flex align-items-center text-decoration-none"
        >
          Xem thêm
          <IconArrowForwardIos class="icon fill-opacity-1 ml-2" />
        </n-link>

        <app-carousel :options="{ slidesPerView: 4, spaceBetween: 24 }">
          <template slot="default" slot-scope="{ classes }">
            <div
              v-for="item in get(elearnings, 'highlight.lectures', [])"
              :key="item.id"
              :class="classes"
            >
              <CourseItem2
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
          </template>
        </app-carousel>
      </ElearningHomeBox>

      <ElearningHomeBox>
        <h2 slot="title" class="heading-3 font-weight-medium">Khóa học mới nhất</h2>
        <n-link
          slot="title-right"
          to
          class="align-self-end d-flex align-items-center text-decoration-none"
        >
          Xem thêm
          <IconArrowForwardIos class="icon fill-opacity-1 ml-2" />
        </n-link>

        <app-carousel :options="{ slidesPerView: 4, spaceBetween: 24 }">
          <template slot="default" slot-scope="{ classes }">
            <div
              v-for="item in get(elearnings, 'highlight.lectures', [])"
              :key="item.id"
              :class="classes"
            >
              <CourseItem2
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
          </template>
        </app-carousel>
      </ElearningHomeBox>

      <ElearningHomeBox class="mb-4">
        <h2 slot="title" class="heading-3 font-weight-medium mb-3">Giáo viên tiêu biểu</h2>

        <app-carousel :options="{ slidesPerView: 3, spaceBetween: 35 }">
          <template slot="default" slot-scope="{ classes }">
            <div v-for="i in 4" :key="i" :class="classes">
              <ElearningHomeTeacherCard
                to
                name="Trần Văn Nam"
                school-name="Trường trung học cơ sở Nguyễn Trãi"
                :num-of-lecture="18"
                :num-of-course="18"
                :averageRate="4"
                :totalReview="476"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor vitae maecenas nec nisl ornare nec duis. Tempor, non "
              />
            </div>
          </template>
        </app-carousel>
      </ElearningHomeBox>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

import IconSubjectMath from "~/assets/svg/icons/subject-math.svg?inline";
import IconSubjectPhysical from "~/assets/svg/icons/subject-physical.svg?inline";
import IconSubjectChemistry from "~/assets/svg/icons/subject-chemistry.svg?inline";
import IconSubjectForeignLanguage from "~/assets/svg/icons/subject-foreign-language.svg?inline";
import IconSubjectLiterature from "~/assets/svg/icons/subject-literature.svg?inline";
import IconArrowForwardIos from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline";

import ElearingHomeBanner from "~/components/page/elearning/home/ElearningHomeBanner.vue";
import ElearningHomeBox from "~/components/page/elearning/home/ElearningHomeBox";
import CourseItem2 from "~/components/page/course/CourseItem2";
import ElearningHomePersonalBox from "~/components/page/elearning/home/ElearningHomePersonalBox.vue";
import ElearningHomeSubjectItem from "~/components/page/elearning/home/ElearningHomeSubjectItem.vue";
import ElearningHomeTeacherCard from "~/components/page/elearning/home/ElearningHomeTeacherCard";

// import CourseSliderTab from "~/components/page/course/CourseSliderTab";

export default {
  components: {
    // CourseSliderTab,
    ElearingHomeBanner,
    ElearningHomeBox,
    CourseItem2,
    ElearningHomePersonalBox,
    ElearningHomeSubjectItem,
    ElearningHomeTeacherCard,
    IconArrowForwardIos
  },

  // async fetch({ params, query, store }) {
  //   store.dispatch(
  //     `elearning/public/public-summary/${actionTypes.ELEARNING_PUBLIC_SUMMARY.LIST}`
  //   );
  // },

  mounted() {
    this.$store.dispatch(
      `elearning/public/public-summary/${actionTypes.ELEARNING_PUBLIC_SUMMARY.LIST}`
    );
  },

  // updated() {
  //   console.log(this.elearnings)
  // },

  data() {
    return {
      subjects: [
        {
          icon: IconSubjectMath,
          title: "Toán"
        },
        {
          icon: IconSubjectPhysical,
          title: "Vật lí"
        },
        {
          icon: IconSubjectChemistry,
          title: "Hóa học"
        },
        {
          icon: IconSubjectForeignLanguage,
          title: "Ngoại ngữ"
        },
        {
          icon: IconSubjectLiterature,
          title: "Ngữ văn"
        },
        {
          icon: IconSubjectForeignLanguage,
          title: "Môn học khác"
        }
      ]
    };
  },

  // updated() {
  //   console.log(this.elearnings);
  // },

  computed: {
    ...mapState("elearning/public/public-summary", {
      elearnings: "elearnings"
    })
  },

  methods: {
    get,

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
@import "~/assets/scss/pages/elearning/_home.scss";
</style>
