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
      <n-link class="school-list-box__title__submit-btn" :to="'/school/search'">
        Xem thêm
        <IconRight class="fill-primary" />
      </n-link>
    </div>
    <!--List schools-->
    <div class="school-list-box__content">
      <div class="row row--school-list">
        <div v-swiper:mySwiper="currentSwiperOptions" class="post-slider" v-on="$listeners">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide post-slider-container"
              v-for="(school, index) in schools"
              :key="index"
            >
              <school-item :school="school" />
            </div>
          </div>
          <div class="swiper-pagination" v-if="currentSwiperOptions.pagination"></div>
        </div>
        <div
          class="swiper-button-custom swiper-button-prev--circle"
          v-if="currentSwiperOptions.navigation && schools.length > 0"
          slot="button-prev"
          @click="mySwiper.slidePrev()"
        >
          <IconChevronLeft />
        </div>
        <div
          class="swiper-button-custom swiper-button-next--circle"
          v-if="currentSwiperOptions.navigation && schools.length > 0"
          slot="button-next"
          @click="mySwiper.slideNext()"
        >
          <IconChevronRight />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { assignIn } from "lodash";
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
    }
  },

  data() {
    const defaultSwiperOptions = {
      slidesPerView: "auto",
      spaceBetween: 4,
      navigation: true,
      pagination: false,
      showName: false,
      loop: true,
      breakpoints: {
        4000: {
          slidesPerView: 5,
          spaceBetween: 20
        },
        1366: {
          slidesPerView: 5,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    };

    return {
      defaultSwiperOptions,
      currentSwiperOptions: assignIn(defaultSwiperOptions, this.sliderOptions),
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        autoHeight: false,
        watchOverflow: true,
        showName: true
      }
    };
  },

  computed: {
    schools() {
      const type = get(this, "category.type", "");
      const schoolList = get(this, `schoolSearch.data.content`, []);
      console.log("[schools]", type, schoolList, schoolList.filter(sc => sc.type == type))
      return schoolList.filter(sc => sc.type == type);
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

.post-slider {
  .swiper-button-custom {
    $background-disable: #e1e1e1;
    position: absolute;
    width: 4rem;
    height: 4rem;
    background-color: $background-disable;
    text-align: center;
    line-height: 4rem;
    z-index: 10;
    display: inline-block;
    cursor: pointer;
    background-image: none !important;

    &:hover,
    &:visited,
    &:focus {
      background-color: $color-primary;
      outline: none;
    }

    svg {
      width: 0.6rem;
      height: 1.2rem;
      fill: #fff;
    }

    &.swiper-button-disabled {
      background-color: $background-disable;
    }
  }
}
.row--school-list {
  position: relative;
}

.swiper-button-next--circle {
  border-radius: 50%;
  top: 50%;
  margin-top: -2rem;
  right: -2rem;
  left: auto;
}

.swiper-button-prev--circle {
  border-radius: 50%;
  top: 50%;
  margin-top: -2rem;
  left: -2rem;
  right: auto;
}
</style>
