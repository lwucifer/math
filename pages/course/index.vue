<template>
  <div>
    <SliderBanner :images="banners" class="timeline-banner" />
    <div class="container">
      <div v-if="this.isAuthenticated">
        <div class="mb-4">
          <app-button size="lg" color="white" square class="mr-5"
            >Kho nhập liệu</app-button
          >
          <app-button size="lg" square nuxt to="/course/create">Tạo khóa học</app-button>
        </div>
        <AsideBox
          title="Khóa học của tôi"
          class="link-underline"
          link="/school"
          linkText="Xem toàn bộ >>"
        >
          <CourseSlider :courses="myCourses" :swiperOptions="sliderOptions" />
        </AsideBox>
      </div>
      <div v-else>
        <AsideBox title="Khóa học theo chủ đề" class="nav-links">
          <app-button
            @click="activate(0)"
            :color="active_el === 0 ? 'primary' : 'gray'"
            square
            >Tất cả</app-button
          >
          <app-button
            square
            v-for="(item, i) in categories"
            :key="i"
            @click="activate(item.id)"
            :color="active_el === item.id ? 'primary' : 'gray'"
            >{{ item.name }}</app-button
          >
        </AsideBox>
      </div>
      <div class="row">
        <div class="col-md-3" v-if="this.isAuthenticated">
          <AsideBox title="Khóa học theo chủ đề" class="course__side">
            <div>
              <n-link to class="active">Miễn phí</n-link>
              <n-link to>Trả phí</n-link>
            </div>
            <div>
              <n-link
                :to="'/course/category/' + item.id"
                v-for="(item, i) in categories"
                :key="i"
                >{{ item.name }}</n-link
              >
            </div>
          </AsideBox>
        </div>
        <div :class="this.isAuthenticated ? 'col-md-9' : 'col-md-12'">
          <div class="row">
            <div
              :class="classes"
              v-for="(course, index) in earningSummaryList"
              :key="index"
            >
              <CourseItem :course="course" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseSlider from "~/components/page/course/CourseSlider";
import CourseItem from "~/components/page/course/CourseItem";
import AsideBox from "~/components/layout/asideBox/AsideBox";
import SliderBanner from "~/components/page/timeline/slider/SliderBanner";
import BannerImage from "~/assets/images/tmp/timeline-slider.jpg";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import axios from "axios";

export default {
  name: "Course",

  components: {
    CourseSlider,
    CourseItem,
    SliderBanner,
    AsideBox
  },

  async fetch({ params, query, store }) {
    console.log("get earning summary");
    await store.dispatch(`course/${actionTypes.ELEARNING_SUMMARY.LIST}`)
  },

  async fetch({ params, query, store }) {
    console.log("get my course");
    await store.dispatch(`study-elearning/${actionTypes.STUDY.ELEARNING}`)
  },

  data() {
    return {
      banners: new Array(3).fill(BannerImage, 0),
      isAuthenticated: true,
      courses: [],
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true,
        navigation: false,
        pagination: {
          el: ".swiper-pagination"
        },
        showName: true
      },
      categories: [
        {
          id: 1,
          name: "Ngoại ngữ"
        },
        {
          id: 2,
          name: "Âm nhạc"
        },
        {
          id: 3,
          name: "Thể thao"
        },
        {
          id: 4,
          name: "Công nghệ thông tin"
        },
        {
          id: 5,
          name: "Marketing"
        },
        {
          id: 6,
          name: "Thiết kế"
        }
      ],
      active_el: 0
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("course", ["earningSummaryList"]),
    ...mapState("study-elearning", ["myCourses"]),
    classes() {
      return {
        "col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4": !this.isAuthenticated,
        "col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4": this.isAuthenticated
      };
    }
  },

  watch: {},

  methods: {
    activate: function(el) {
      this.active_el = el;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course.scss";
</style>
