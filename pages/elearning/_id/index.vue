<template>
  <div class="container elearning-view">
    <div class="row">
      <div class="col-md-8">
        <h2>{{ get(info, "name", "") }}</h2>

        <div class="elearning-view__info">
          <div class="author">
            <app-avatar
              :src="get(info, 'teacher.avatar.low', null)"
              :size="32"
            />
            <span class="name ml-2">{{ get(info, "teacher.name", "") }}</span>
          </div>

          <div class="views ml-auto">
            <IconEye />
            <strong class="ml-2 mr-1">{{ get(info, "total_view", 0) }}</strong>
            lượt xem
          </div>

          <div class="stars">
            <app-stars
              :stars="Math.floor(get(info, 'rates.averageRate', 0))"
              :size="16"
            />
            <strong class="ml-3">{{ get(info, "rates.averageRate", 0) }}</strong
            >&nbsp;
            <span class="text-sub"
              >({{ get(info, "rates.totalReview", 0) }})</span
            >
          </div>
        </div>

        <div class="elearning-view__main-nav" v-sticky>
          <a
            class="scroll-link"
            href="#introduce"
            @click.prevent="scrollTo('#introduce')"
            >Giới thiệu</a
          >
          <a
            class="scroll-link"
            href="#course-content"
            @click.prevent="scrollTo('#course-content')"
            >Nội dung {{ typeText }}</a
          >
          <a
            class="scroll-link"
            href="#teacher"
            @click.prevent="scrollTo('#teacher')"
            >Giáo viên</a
          >
          <a
            class="scroll-link"
            href="#review"
            @click.prevent="scrollTo('#review')"
            >Đánh giá</a
          >
        </div>

        <section class="scroll-target" id="introduce">
          <div class="box mb-4">
            <h5 class="mb-4">Lợi ích từ {{ typeText }}</h5>

            <div
              v-if="typeof get(info, 'benefits', '') === 'string'"
              class="d-flex"
            >
              <template v-if="get(info, 'benefits', [])">
                <IconCheckCircle class="icon body-1 mr-2" />
                <p v-html="get(info, 'benefits', [])" />
              </template>
            </div>

            <span
              v-else-if="!get(info, 'benefits', [])"
              class="caption text-sub"
              >Chưa có nội dung</span
            >

            <div v-else class="row">
              <div
                v-for="(item, index) in get(info, 'benefits', [])"
                :key="index"
                class="col-md-6 d-flex mb-15"
              >
                <IconCheckCircle class="icon body-1 mr-2" />
                <p v-html="item" />
              </div>
            </div>
          </div>

          <div class="box mb-4">
            <h5 class="mb-4">Mô tả tổng quát</h5>
            <div
              v-if="get(info, 'description', '')"
              v-html="get(info, 'description', '')"
            ></div>
            <span v-else class="caption text-sub">Chưa có nội dung.</span>
            <!-- <div class="text-center my-3">
              <a class="btn-load-more">Xem thêm</a>
            </div>-->
          </div>
        </section>

        <section
          class="box elearning-view__content scroll-target mb-4"
          id="course-content"
        >
          <h5>Nội dung {{ typeText }}</h5>
          <div class="row flex-wrap info">
            <div class="col-auto">
              Trình độ:
              <strong class="color-primary">{{
                get(program, "level", "")
              }}</strong>
            </div>
            <div class="col-auto">
              Môn học:
              <strong class="color-primary">{{
                get(program, "subject", "")
              }}</strong>
            </div>
            <div class="col-auto">
              Số bài giảng:
              <strong class="color-primary">chưa ghép</strong>
            </div>
            <div class="col-auto">
              Thời lượng:
              <strong class="color-primary">{{
                get(info, "duration", "--")
              }}</strong>
            </div>
          </div>

          <div class="evlc-item mb-3">
            <div class="evlc-item__head">
              <div class="evlc-item__head-left mr-4">
                Bài giảng đại số lớp 10
              </div>
              <div class="evlc-item__head-right ml-auto">
                <button class="evlc-item__btn evlc-item__btn-collapse active">
                  <IconAngleDown class="icon" />
                </button>
              </div>
            </div>

            <div class="evlc-item__body bg-input-gray">
              <div class="d-flex align-items-center text-error py-3">
                <IconFileAlt class="icon subheading mr-2" />Bài tập số 1
              </div>
              <app-divider class="my-0" />
              <div class="d-flex align-items-center text-error py-3">
                <IconFileAlt class="icon subheading mr-2" />Bài tập số 2
              </div>
            </div>
          </div>

          <div class="evlc-item mb-3">
            <div class="evlc-item__head">
              <div class="evlc-item__head-left mr-4">
                <b>Chương 1:</b> Tạo và tối ưu tài khoản Instagram trên máy tính
              </div>
              <div
                class="evlc-item__head-right d-flex align-items-center ml-auto"
              >
                <span class="mr-3">3 Bài</span>
                <button class="evlc-item__btn evlc-item__btn-collapse active">
                  <IconAngleDown class="icon" />
                </button>
              </div>
            </div>

            <div class="evlc-item__body bg-input-gray">
              <div class="d-flex align-items-center py-3">
                <div class="d-flex align-items-center mr-4">
                  <IconPlayCircle
                    class="icon subheading mr-2 text-primary"
                  />Bài 1: Tạo và tối ưu tài khoản instagran trên máy tính
                </div>
                <div class="ml-auto">10:15</div>
              </div>
              <app-divider class="my-0" />
              <div class="d-flex align-items-center py-3">
                <div class="d-flex align-items-center mr-4">
                  <IconPlayCircle
                    class="icon subheading mr-2 text-primary"
                  />Bài 2: Tạo và tối ưu tài khoản instagran trên máy tính
                </div>
                <div class="ml-auto">10:15</div>
              </div>
              <app-divider class="my-0" />
              <div class="d-flex align-items-center py-3">
                <div class="d-flex align-items-center mr-4">
                  <IconPlayCircle
                    class="icon subheading mr-2 text-primary"
                  />Bài 3: Tạo và tối ưu tài khoản instagran trên máy tính
                </div>
                <div class="ml-auto">10:15</div>
              </div>
              <app-divider class="my-0" />
            </div>
          </div>

          <div class="evlc-item mb-3">
            <div class="evlc-item__head">
              <div class="evlc-item__head-left mr-4">
                <b>Chương 2:</b> Tạo và tối ưu tài khoản Instagram trên máy tính
              </div>
              <div
                class="evlc-item__head-right d-flex align-items-center ml-auto"
              >
                <span class="mr-3">3 Bài</span>
                <button class="evlc-item__btn evlc-item__btn-collapse">
                  <IconAngleDown class="icon" />
                </button>
              </div>
            </div>
          </div>

          <div class="download-item">
            <IconBooks class="fill-primary mr-3" />Tài liệu đính kèm
            <a
              href
              class="ml-auto color-primary d-flex-center font-weight-bold text-decoration-none"
            >
              Tải về
              <IconDownload class="ml-2" />
            </a>
          </div>
        </section>

        <div class="box">
          <section class="scroll-target" id="teacher">
            <h5 class="mb-4">Thông tin giáo viên</h5>
            <CourseTeacherInfo
              :teacher="get(info, 'teacher', null)"
              class="mb-3"
            />
          </section>

          <hr class="mt-3 mb-4" />

          <section class="scroll-target" id="review">
            <h5 class="mb-3">Đánh giá {{ typeText }}</h5>
            <ElearningReview :info="info" />
          </section>
        </div>
      </div>

      <div class="col-md-4">
        <ElearningRightSide
          v-sticky
          sticky-offset="top"
          v-bind="{ info, program }"
        />
      </div>
    </div>

    <ElearningSliderTab
      class="mt-4"
      :content="relatedCourses"
      :swiperOptions="sliderOptions"
      title="Bài giảng cùng giáo viên"
    />

    <ElearningSliderTab
      :content="relatedCourses"
      :swiperOptions="sliderOptions"
      title="Bài giảng liên quan"
      class="mt-5"
    />
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { ELEARNING_TYPES } from "~/utils/constants";

import InfoService from "~/services/elearning/public/Info";
import LevelService from "~/services/elearning/public/Level";
import SubjectService from "~/services/elearning/public/Subject";
import ProgramService from "~/services/elearning/public/Program";
import RelatedService from "~/services/elearning/public/Related";

import CourseTeacherInfo from "~/components/page/course/CourseTeacherInfo";
import ElearningSliderTab from "~/components/page/elearning/ElearningSliderTab";
import ElearningReview from "~/components/page/elearning/ElearningReview";
import ElearningRightSide from "~/components/page/elearning/ElearningRightSide";

import IconEye from "~/assets/svg/icons/eye.svg?inline";
import IconPlayO from "~/assets/svg/icons/play-o.svg?inline";
import IconDownload from "~/assets/svg/icons/download.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
const IconCheckCircle = () =>
  import("~/assets/svg/icons/check-circle.svg?inline");
const IconFileAlt = () =>
  import("~/assets/svg/design-icons/file-alt.svg?inline");
const IconPlayCircle = () =>
  import("~/assets/svg/design-icons/play-circle.svg?inline");

export default {
  name: "E-learningDetail",

  components: {
    CourseTeacherInfo,
    ElearningSliderTab,
    ElearningReview,
    ElearningRightSide,
    IconEye,
    IconPlayO,
    IconBooks,
    IconDownload,
    IconCheckCircle,
    IconAngleDown,
    IconFileAlt,
    IconPlayCircle,
  },

  async asyncData({ $axios, params }) {
    // const getInfo = () =>
    //   new InfoService($axios)[actionTypes.BASE.LIST]({
    //     params: {
    //       elearning_id: params.id
    //     }
    //   });
    // const getLevels = () => new LevelService($axios)[actionTypes.BASE.LIST]();
    // const getSubjects = () =>
    //   new SubjectService($axios)[actionTypes.BASE.LIST]();
    // const getProgram = () =>
    //   new ProgramService($axios)[actionTypes.BASE.LIST]({
    //     params: {
    //       elearning_id: params.id
    //     }
    //   });
    // const getRelatedCourses = () =>
    //   new RelatedService($axios)[actionTypes.BASE.LIST]({
    //     params: {
    //       elearning_id: params.id
    //     }
    //   });
    // const [
    //   dataInfo = {},
    //   dataLevels = {},
    //   dataSubjects = {},
    //   dataProgram = {},
    //   dataRelatedCourses = {}
    // ] = await Promise.all([
    //   getInfo(),
    //   getLevels(),
    //   getSubjects(),
    //   getProgram(),
    //   getRelatedCourses()
    // ]);
    // return {
    //   info: dataInfo.data || {},
    //   levels: dataLevels.data || [],
    //   subjects: dataSubjects.data || [],
    //   program: dataProgram.data || {},
    //   relatedCourses: dataRelatedCourses.data || []
    // };
  },

  created() {
    this.getData();
  },

  data() {
    return {
      info: null,
      levels: [],
      subjects: [],
      program: [],
      relatedCourses: [],
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        watchOverflow: true,
      },
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),

    typeText() {
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

    levelText() {
      const [level = {}] = this.levels.filter(
        (level) => this.info.level === level.id
      );
      return level.name || "";
    },

    subjectText() {
      const [subject = {}] = this.subjects.filter(
        (subject) => this.info.subject === subject.code
      );
      return subject.name || "";
    },
  },

  mounted() {
    // window.addEventListener("scroll", this.bindScrollStatus);
    // if (this.$route.hash && process.browser) {
    //   const hashEl = document.querySelector(this.$route.hash);
    //   hashEl && this.scrollTo(this.$route.hash);
    // }
  },

  beforeDestroy() {
    // window.removeEventListener("scroll", this.bindScrollStatus);
  },

  methods: {
    get,

    async getData() {
      const elearning_id = get(this, "$route.params.id", "");

      const getInfo = () =>
        new InfoService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id,
          },
        });
      const getLevels = () =>
        new LevelService(this.$axios)[actionTypes.BASE.LIST]();
      const getSubjects = () =>
        new SubjectService(this.$axios)[actionTypes.BASE.LIST]();
      const getProgram = () =>
        new ProgramService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id,
          },
        });
      const getRelatedCourses = () =>
        new RelatedService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id,
          },
        });

      const data = await Promise.all([
        getInfo(),
        getLevels(),
        getSubjects(),
        getProgram(),
        getRelatedCourses(),
      ]);

      this.info = get(data, "0.data", null);
      this.levels = get(data, "0.data", []);
      this.subjects = get(data, "0.data", []);
      this.program = get(data, "0.data", []);
      this.relatedCourses = get(data, "0.data.content", []);
    },

    bindScrollStatus(event) {
      const navLink = document.querySelector(".elearning-view__main-nav");
      const link = document.querySelectorAll('.scroll-link[href^="#"]');
      const target = document.getElementsByClassName("scroll-target");
      const scrollDistance = window.scrollY + navLink.clientHeight;

      for (const el of target) {
        const react = el.getBoundingClientRect();

        if (window.scrollY + react.top <= scrollDistance + 1) {
          Array.from(link).forEach((linkEl) => {
            const activeLink = document.querySelector(
              `.scroll-link[href="#${el.id}"]`
            );
            linkEl.classList.remove("active");
            activeLink.classList.add("active");
          });
        }
      }
    },

    scrollTo(id) {
      const target = document.querySelector(id);
      const navLink = document.querySelector(".elearning-view__main-nav");
      const targetTop = target.getBoundingClientRect().top;
      const scrollPosition = targetTop + window.scrollY;
      const hash = this.$route.hash;
      // this.requestFrameId && window.cancelAnimationFrame(this.requestFrameId);
      // this.requestFrameId = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPosition - navLink.clientHeight,
        left: 0,
        behavior: "smooth",
      });
      // })
      // this.$router.replace({
      //   path: this.$route.path,
      //   hash: id
      // });
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-id.scss";
</style>
