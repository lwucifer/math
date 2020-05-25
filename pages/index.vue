<template>
  <div class="elearning-homepage">
    <HomeBanner />
    <SubBanner/>

    <div v-if="pageLoading" class="container mt-6">
      <div class="row">
        <div v-for="i in 16" :key="i" class="col-md-3 mb-6">
          <div class="bg-white py-6 px-3">
            <VclList />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mt-6">
      <ElearningHomeBox title="Học gì tiếp theo">
        <ul slot="title-right" class="elearning-home-box__tab">
          <li v-for="tab in whatNextsTabs" :key="tab.value">
            <a
              href="javscript:;"
              :class="{ 'active': whatNextsTab === tab.value }"
              @click.prevent="changeWhatNextsTab(tab.value)"
            >{{ tab.text }}</a>
          </li>
        </ul>

        <app-carousel
          :options="{ slidesPerView: 4, spaceBetween: 24, preventClicksPropagation: false }"
          ref="whatNextsCarousel"
        >
          <template slot="default" slot-scope="{ classes }">
            <div
              v-for="item in whatNexts && whatNexts.content || []"
              :key="item.elearning_id"
              :class="classes"
            >
              <div v-if="whatNextsLoading" class="bg-white py-6 px-4">
                <vcl-list />
              </div>

              <CourseItem2 v-else class="my-0" :item="item" :size="'sm'" />
            </div>
          </template>
        </app-carousel>
      </ElearningHomeBox>

    </div>

    <HowToLearn/>
    <LearnCoursera/>
    <LearnEverywhere/>
    <NumberHighlight/>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { ELEARNING_TYPES, SUBJECT_CODE } from "~/utils/constants";
import { VclList } from "vue-content-loading";

const IconDefaultSubject = () =>
  import("~/assets/svg/icons/default-subject.svg?inline");
const IconSubjectMath = () =>
  import("~/assets/svg/icons/subject-math.svg?inline");
const IconSubjectPhysical = () =>
  import("~/assets/svg/icons/subject-physical.svg?inline");
const IconSubjectChemistry = () =>
  import("~/assets/svg/icons/subject-chemistry.svg?inline");
const IconSubjectForeignLanguage = () =>
  import("~/assets/svg/icons/subject-foreign-language.svg?inline");
const IconSubjectLiterature = () =>
  import("~/assets/svg/icons/subject-literature.svg?inline");
const IconSubjectBiology = () =>
  import("~/assets/svg/icons/subject-biology.svg?inline");
const IconSubjectGeography = () =>
  import("~/assets/svg/icons/subject-geography.svg?inline");
const IconSubjectHistory = () =>
  import("~/assets/svg/icons/subject-history.svg?inline");
const IconSubjectInformatics = () =>
  import("~/assets/svg/icons/subject-informatics.svg?inline");
const IconSubjectTechnology = () =>
  import("~/assets/svg/icons/subject-technology.svg?inline");
const IconSubjectFineArt = () =>
  import("~/assets/svg/icons/subject-fine-art.svg?inline");
const IconSubjectCivicEducation = () =>
  import("~/assets/svg/icons/subject-civic-education.svg?inline");
const IconSubjectMusic = () =>
  import("~/assets/svg/icons/subject-music.svg?inline");
const IconSubjectScience = () =>
  import("~/assets/svg/icons/subject-science.svg?inline");
import IconArrowForwardIos from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline";

import HomeBanner from "~/components/page/home/HomeBanner.vue";
import SubBanner from "~/components/page/elearning/home/SubBanner"
import ElearningHomeBox from "~/components/page/elearning/home/ElearningHomeBox";
import HowToLearn from "~/components/page/elearning/home/HowToLearn";
import LearnCoursera from "~/components/page/elearning/home/LearnCoursera";
import LearnEverywhere from "~/components/page/elearning/home/LearnEverywhere";
import NumberHighlight from "~/components/page/elearning/home/NumberHighlight";
import CourseItem2 from "~/components/page/course/CourseItem2";
import ElearningHomePersonalBox from "~/components/page/elearning/home/ElearningHomePersonalBox.vue";
import ElearningHomeSubjectItem from "~/components/page/elearning/home/ElearningHomeSubjectItem.vue";
import ElearningHomeTeacherCard from "~/components/page/elearning/home/ElearningHomeTeacherCard";

// import CourseSliderTab from "~/components/page/course/CourseSliderTab";

export default {
  components: {
    // CourseSliderTab,
    VclList,
    HomeBanner,
    SubBanner,
    ElearningHomeBox,
    HowToLearn,
    LearnCoursera,
    LearnEverywhere,
    NumberHighlight,
    CourseItem2,
    ElearningHomePersonalBox,
    ElearningHomeSubjectItem,
    ElearningHomeTeacherCard,
    IconArrowForwardIos
  },

  async fetch({ params, query, store }) {
    const getWhatNexts = () =>
      store.dispatch(
        `elearning/public/public-what-nexts/${actionTypes.ELEARNING_PUBLIC_WHAT_NEXTS.LIST}`,
        {
          params: {
            type: ELEARNING_TYPES.LECTURE
          }
        }
      );
    const getForYou = () =>
      store.dispatch(
        `elearning/public/public-for-you/${actionTypes.ELEARNING_PUBLIC_FOR_YOU.LIST}`
      );
    const getVotedSubjects = () =>
      store.dispatch(
        `elearning/public/public-voted-subjects/${actionTypes.ELEARNING_PUBLIC_VOTED_SUBJECTS.LIST}`
      );
    const getNewestLecture = () =>
      store.dispatch(
        `elearning/public/public-newest/${actionTypes.ELEARNING_PUBLIC_NEWEST.LIST_LECTURE}`,
        {
          params: {
            type: ELEARNING_TYPES.LECTURE
          }
        }
      );
    const getNewestCourse = () =>
      store.dispatch(
        `elearning/public/public-newest/${actionTypes.ELEARNING_PUBLIC_NEWEST.LIST_COURSE}`,
        {
          params: {
            type: ELEARNING_TYPES.COURSE
          }
        }
      );
    const getHightlightTeachers = () =>
      store.dispatch(
        `elearning/public/public-highlight-teachers/${actionTypes.ELEARNING_PUBLIC_HIGHLIGHT_TEACHERS.LIST}`
      );

    return await Promise.all([
      getWhatNexts(),
      getForYou(),
      getVotedSubjects(),
      getNewestLecture(),
      getNewestCourse(),
      getHightlightTeachers()
    ]);
  },

  data() {
    return {
      ELEARNING_TYPES: Object.freeze(ELEARNING_TYPES),
      pageLoading: true,
      whatNextsLoading: false,
      whatNextsTab: ELEARNING_TYPES.LECTURE,
      whatNextsTabs: [
        {
          value: ELEARNING_TYPES.LECTURE,
          text: "Bài giảng nổi bật"
        },
        {
          value: ELEARNING_TYPES.COURSE,
          text: "Khóa học nổi bật"
        }
      ]
    };
  },

  computed: {
    ...mapState("elearning/public/public-summary", {
      elearnings: "elearnings"
    }),
    ...mapState("elearning/public/public-what-nexts", ["whatNexts"]),
    ...mapState("elearning/public/public-for-you", ["forYou"]),
    ...mapState("elearning/public/public-voted-subjects", ["votedSubjects"]),
    ...mapState("elearning/public/public-newest", [
      "newestLecture",
      "newestCourse"
    ]),
    ...mapState("elearning/public/public-highlight-teachers", [
      "highlightTeachers"
    ])
  },

  mounted() {
    this.pageLoading = false;
  },

  methods: {
    get,

    calcDiscount(elearning) {
      const { price = {} } = elearning;
      const currentPrice = price.price || 0;
      const originPrice = price.original_price || 0;
      return (currentPrice / originPrice) * 100;
    },

    checkSubjectIcon(code) {
      switch (code) {
        case SUBJECT_CODE.MATHS:
          return IconSubjectMath;
          break;
        case SUBJECT_CODE.PHYSICS:
          return IconSubjectPhysical;
          break;
        case SUBJECT_CODE.CHEMISTRY:
          return IconSubjectChemistry;
          break;
        case SUBJECT_CODE.FOREIGN_LANGUAGE:
          return IconSubjectForeignLanguage;
          break;
        case SUBJECT_CODE.LITERATURE:
          return IconSubjectLiterature;
          break;
        case SUBJECT_CODE.BIOLOGY:
          return IconSubjectBiology;
          break;
        case SUBJECT_CODE.GEOGPRAPHY:
          return IconSubjectGeography;
          break;
        case SUBJECT_CODE.HISTORY:
          return IconSubjectHistory;
          break;
        case SUBJECT_CODE.INFORMATICS:
          return IconSubjectInformatics;
          break;
        case SUBJECT_CODE.TECHNOLOGY:
          return IconSubjectTechnology;
          break;
        case SUBJECT_CODE.FINE_ART:
          return IconSubjectFineArt;
          break;
        case SUBJECT_CODE.CIVIC_EDUCATION:
          return IconSubjectCivicEducation;
          break;
        case SUBJECT_CODE.MORAL:
          return IconSubjectCivicEducation;
          break;
        case SUBJECT_CODE.MUSIC:
          return IconSubjectMusic;
          break;
        case SUBJECT_CODE.SCIENCE:
          return IconSubjectScience;
          break;
        default:
          return IconDefaultSubject;
          break;
      }
    },

    async changeWhatNextsTab(tab) {
      const { whatNextsCarousel = {} } = this.$refs;

      this.whatNextsTab = tab;
      this.whatNextsLoading = true;

      await this.$store.dispatch(
        `elearning/public/public-what-nexts/${actionTypes.ELEARNING_PUBLIC_WHAT_NEXTS.LIST}`,
        {
          params: {
            type: tab
          }
        }
      );

      if (whatNextsCarousel.mySwiper) {
        whatNextsCarousel.mySwiper.update();
        whatNextsCarousel.mySwiper.slideTo(0);
      }

      this.whatNextsLoading = false;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/elearning/_home.scss";
</style>
