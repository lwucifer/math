<template>
  <div class="container course-view">


    <div class="course-view__main">
      <div class="row">
        <div class="col-md-8">

          <h2>{{ get(elearningInfo, "name", "") }}</h2>
          <div class="course-view__info">
            <div class="author">
              <app-avatar
                :src="get(elearningInfo, 'teacher.avatar', '')"
                :size="32"
              />
              <span class="name ml-2">{{
          get(elearningInfo, "teacher.name", "")
        }}</span>
            </div>

            <div class="views">
              <IconEye />
              <strong class="ml-2 mr-1">{{
                get(elearningInfo, "review_count", 0)
                }}</strong>
              lượt xem
            </div>

            <div
              class="price color-red bold"
              v-if="!get(elearningInfo, 'free', false)"
            >
              <IconUsd class="mr-2" />
              {{ get(elearningInfo, "price.original_price", 0) | toThousandFilter() }}
              đ
            </div>
            <div class="price color-red bold" v-else>
              <IconUsd class="mr-2" />Miễn phí
            </div>

            <div class="stars">
              <app-stars
                :stars="Math.floor(get(elearningInfo, 'lesson.stars', 0))"
                :size="16"
              />
              <strong class="ml-3">{{
                get(elearningInfo, "lesson.stars", 0)
                }}</strong>
              <span>({{ get(elearningInfo, "review_rate", 0) }})</span>
            </div>
          </div>

          <div class="course-view__thumnail">
            <app-video :poster-src="get(elearningInfo, 'avatar', '')">
            </app-video>
          </div>

          <div class="course-view__main-nav">
            <a href="#tab1" :class="tab == 1 ? 'active' : ''" @click="tab = 1"
              >Giới thiệu</a
            >

            <a href="#tab2" :class="tab == 2 ? 'active' : ''" @click="tab = 2"
              >Nội dung bài giảng</a
            >

            <a href="#tab3" :class="tab == 3 ? 'active' : ''" @click="tab = 3"
              >Giáo viên</a
            >

            <a href="#tab4" :class="tab == 4 ? 'active' : ''" @click="tab = 4"
              >Đánh giá</a
            >
          </div>

          <cource-general />

          <div class="box">
            <h5 class="mb-4">Mô tả tổng quát</h5>
            <div>
              {{ get(elearningInfo, "description", "") }}
            </div>
            <div class="text-center mt-3 mb-3">
              <a class="btn-load-more">Xem thêm</a>
            </div>
          </div>

          <div id="tab2" class="box course-view__content">
            <h5>Nội dung bài giảng</h5>
            <cource-program
              :program="program"
              v-for="program in get(elearningProgram, 'programs', [])"
              :key="get(program, 'id', '')"
            />
          </div>

          <div id="tab3" class="box">
            <h5 class="mb-4">Thông tin giáo viên</h5>
            <course-teacher-info
              :teacher="get(elearningInfo, 'teacher', null)"
              class="mb-4"
            />
            <hr />
            <div id="tab4" class="pt-2">
              <h5 class="mt-3 mb-4">Đánh giá bài giảng</h5>
              <course-rates />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <course-right-side
            @joinCourse="joinCourse"
            @startLearn="startLearn"
            @buy="buyCourse"
            :is-joined="isJoined"
            :is-done="isDone"
            :is-buyed="isBuyed"
          >

            <template slot="tooltip" v-if="isBuyed">
              <app-alert type="warning" class="mb-4 font-size-12">
                <template slot="icon">
                  <IconInfoCircle/>
                </template>
                Bạn đã mua bài giảng này vào ngày 20/10/2019
              </app-alert>
            </template>

          </course-right-side>
        </div>
      </div>
    </div>

    <course-slider-tab
      class="mt-4"
      :lessons="sciences"
      :swiperOptions="sliderOptions"
      title="Bài giảng cùng giáo viên"
    />

    <course-slider-tab
      :lessons="elearningRelated"
      :swiperOptions="sliderOptions"
      title="Bài giảng liên quan"
      class="mt-5"
    />
  </div>
</template>

<script>
import CourseTeacherInfo from "~/components/page/course/CourseTeacherInfo";
import CourceGeneral from "~/components/page/course/CourceGeneral";
import CourceProgram from "~/components/page/course/CourceProgram";
import IconEye from "~/assets/svg/icons/eye.svg?inline";
import IconUsd from "~/assets/svg/icons/usd.svg?inline";
import IconSuccess from "~/assets/svg/icons/success.svg?inline";
import IconPlayO from "~/assets/svg/icons/play-o.svg?inline";
import IconDownload from "~/assets/svg/icons/download.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import IconInfoCircle from "~/assets/svg/icons/info.svg?inline";
import CourseSliderTab from "~/components/page/course/CourseSliderTab";
import CourseRates from "~/components/page/course/CourseRates";
import CourseRightSide from "~/components/page/course/CourseRightSide";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
// Import faked data
import { SCIENCES } from "~/server/fakedata/course/courses";

export default {
  components: {
    CourseSliderTab,
    CourseRates,
    CourseRightSide,
    IconEye,
    IconUsd,
    IconSuccess,
    IconPlayO,
    IconBooks,
    IconDownload,
    IconInfoCircle,
    CourseTeacherInfo,
    CourceProgram,
    CourceGeneral
  },

  async fetch({ params, query, store }) {
    await Promise.all([
      store.dispatch(
        `elearning/public/public-info/${actionTypes.ELEARNING_PUBLIC_INFO.LIST}`,
        params.id
      ),
      store.dispatch(
        `elearning/public/public-program/${actionTypes.ELEARNING_PUBLIC_PROGRAM.LIST}`,
        params.id
      ),
      store.dispatch(
        `elearning/public/public-related/${actionTypes.ELEARNING_PUBLIC_RELATED.LIST}`,
        params.id
      ),
      store.dispatch(
        `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.LIST}`,
        {
          params: {
            elearning_id: params.id
          }
        }
      )
    ]);
  },

  data() {
    return {
      tab: 1,
      isAuthenticated: true,
      // teacher: {},
      title: "Làm chủ 6 công cụ Marketing online HOT NHẤT hiện nay",
      lesson: {
        avatar: "https://picsum.photos/32/32",
        author: "Nguyễn Ngọc Quyên",
        views: 28751,
        stars: 4.5,
        rates: 469,
        price: 1201000
      },
      sciences: SCIENCES,
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true,
        showName: true
      },
      active_el: 0,
      isJoined: false,
      isDone: false,
      isBuyed: false
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning/public/public-info", ["elearningInfo"]),
    ...mapState("elearning/public/public-program", ["elearningProgram"]),
    ...mapState("elearning/public/public-related", ["elearningRelated"]),
  },
  methods: {
    joinCourse() {
      console.log('joint course')
    },
    startLearn() {
      console.log('start learn')
    },
    buyCourse() {
      console.log('buy')
    },
    get
  },
  created() {
    console.log(this.elearningInfo);
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-id.scss";
</style>
