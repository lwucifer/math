<template>
  <div class="school-list-box">
    <div class="school-list-box__title">
      <div>
        <span class="school-list-box__title__name">{{ category.name }}</span>
        <span class="school-list-box__title__description">
          (
          <b>{{ schoolNum }}</b> trường học -
          <b>{{ teacherNum }}</b> giáo viên -
          <b>{{ studentNum }}</b> học sinh )
        </span>
      </div>
      <button square class="school-list-box__title__submit-btn" @click="showAll">
        Xem tất cả
        <IconRight class="fill-primary" />
      </button>
    </div>
    <!--List schools-->
    <div class="school-list-box__content">
      <div class="row row--school-list">
        <div
          class="custom-col-lg-5 col-3 col-sm-6 col-xs-12"
          v-for="(school, index) in schools"
          :key="index"
        >
          <school-item :school="school" />
        </div>
      </div>

      <div v-swiper:mySwiper="currentSwiperOptions" class="post-slider" v-on="$listeners">
            <div class="swiper-wrapper">
                <div class="swiper-slide post-slider-container" v-for="(item, index) in posts" :key="index">
                    <school-item :school="school" />
                </div>
            </div>

            <div class="swiper-button-prev" v-if="currentSwiperOptions.navigation">
                <IconChevronLeft/>
            </div>
            <div class="swiper-button-next" v-if="currentSwiperOptions.navigation">
                <IconChevronRight/>
            </div>
            <div class="swiper-pagination" v-if="currentSwiperOptions.pagination"></div>
        </div>
    </div>
  </div>
</template>

<script>
import {assignIn} from "lodash";
import IconRight from "~/assets/svg/icons/arrow-forward-ios-24px-outlined.svg?inline";
import IconChevronLeft from "~/assets/svg/icons/chevron-left.svg?inline";
import IconChevronRight from "~/assets/svg/icons/chevron-right.svg?inline";
import SchoolItem from "~/components/page/school/SchoolItem";
import { get, toNumber } from "lodash";
import { SCHOOL_TYPE } from "~/server/fakedata/school/test";

export default {
  components: {
    SchoolItem,
    IconRight,
    IconChevronLeft,
    IconChevronRight
  },

  props: {
    category: {
      type: Object,
      required: true
    },
    schoolSearch: {
      type: Object,
      default: () => {}
    },
    swiperOptions: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    const defaultSwiperOptions = {
      slidesPerView: "auto",
      spaceBetween: 4,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: false,
      showName: false
    };

    return {
      defaultSwiperOptions,
      currentSwiperOptions: assignIn(defaultSwiperOptions, this.swiperOptions)
    };
  },

  computed: {
    schools() {
      const type = get(this, "category.type", "");
      const schoolList = get(this, `schoolSearch.data.content`, []);
      console.log("[schoolList]", schoolList, type);
      return schoolList.filter(sc => sc.type == type) || [];
    },

    schoolNum() {
      return this.schools.length || 0;
    },

    studentNum() {
      return this.schools.reduce((a, b) => {
        return a + b.student_number;
      }, 0);
    },

    teacherNum() {
      return this.schools.reduce((a, b) => {
        return a + b.teacher_number;
      }, 0);
    }
  },

  methods: {
    showAll() {
      this.$emit("showAll", this.id);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-list-box.scss";
</style>
