<template>
  <div>
    <HeaderCourse />
    <div class="container" v-if="loading">Loading...</div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-md-8">
          <div class="box22">
            <img
              v-if="studyMode === defaultMode"
              :src="
                get(info, 'cover_url.high', '') ||
                  '/images/adefltu - course - image.png'
              "
              width="750"
              height="422"
              alt
            />
            <Streaming
              v-if="studyMode == videoMode"
              :url="get(payload, 'stream_urls.hls_url', '')"
            />
            <a v-if="studyMode == docMode" :href="get(payload, 'link', '')"
              >Download</a
            >
            <img
              v-if="studyMode === imageMode"
              :src="get(payload, 'link', '')"
              alt
            />
            <iframe
              v-if="studyMode == articleMode"
              style="width: 712px"
              :src="get(payload, 'link', '')"
            ></iframe>

            <!-- DO EXERCISE -->
            <ElearningExercise
              v-if="studyMode !== videoMode && studyMode !== defaultMode"
            />

            <div class="elearning-study-tabs">
              <a
                :class="{ active: type === 'summary' }"
                @click="type = 'summary'"
                >Tổng quan</a
              >
              <a :class="{ active: type === 'qa' }" @click="type = 'qa'"
                >Hỏi đáp</a
              >
              <a
                :class="{ active: type === 'notification' }"
                @click="type = 'notification'"
                >Thông báo</a
              >
              <a :class="{ active: type === 'review' }" @click="type = 'review'"
                >Đánh giá</a
              >
            </div>

            <TabSummary :info="info" v-if="type === 'summary'" />
            <TabQA v-if="type === 'qa'" />
            <TabNotification v-if="type === 'notification'" />
            <TabReview v-if="type === 'review'" />
            <!-- <ElearningQuestion
              v-if="type === 'qa'"
              :interactive_questions="interactive_questions"
              @addQuestionSuccess="addQuestionSuccess"
            /> -->
          </div>
          
        </div>

        <div class="col-md-4">
          <ElearningCourseSide />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState, mapMutations } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { STUDY_MODE, EXERCISE_CATEGORIES } from "~/utils/constants";
import { useEffect } from "~/utils/common";
import InfoService from "~/services/elearning/study/Info";
import InteractiveQuestionService from "~/services/elearning/study/InteractiveQuestion";
// import ProgressService from "~/services/elearning/study/Progress";
import ProgramService from "~/services/elearning/public/Program";

import { COURSE_LESSON } from "~/server/fakedata/elearning/test";
import { AUTH, COMMENTS, LESSON } from "~/server/fakedata/elearning/test";

import IconSearch from "~/assets/svg/design-icons/search.svg?inline";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

import ElearningCourseSide from "~/components/page/elearning/study/ElearningCourseSide";
import HeaderCourse from "~/components/layout/header/HeaderCourse";
import TabSummary from "~/components/page/elearning/study/tab-summary/TabSummary";
import TabQA from "~/components/page/elearning/study/tab-qa/TabQA";
import TabNotification from "~/components/page/elearning/study/tab-notification/TabNotification";
import TabReview from "~/components/page/elearning/study/tab-review/TabReview";
// import ElearningQuestion from "~/components/page/elearning/study/ElearningQuestion";
import Streaming from "~/components/page/elearning/study/Streaming";
import ElearningExercise from "~/components/page/elearning/study/exercise/ElearningExercise";

// http://localhost:5000/elearning/79408a5d-12d7-4498-a2b3-faf4b9a9d1bd/study?lession_id=xxx&start_time=yyyy

export default {
  name: "Elearning",

  layout: "studying",

  components: {
    ElearningCourseSide,
    IconSearch,
    IconCamera,
    HeaderCourse,
    TabSummary,
    TabQA,
    TabNotification,
    TabReview,
    // ElearningQuestion,
    Streaming,
    ElearningExercise
  },

  data() {
    return {
      type: "summary",
      loading: true,
      interactive_questions: null,
      videoMode: STUDY_MODE.VIDEO_PLAYING,
      exerciseMode: STUDY_MODE.DO_EXERCISE,
      defaultMode: STUDY_MODE.DEFAULT,
      docMode: STUDY_MODE.DOCS,
      articleMode: STUDY_MODE.ARTICLE,
      imageMode: STUDY_MODE.IMAGE
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("event", ["payload", "studyMode"]),
    ...mapState("elearning/study/study-info", ["info"])
  },

  mounted() {
    this.getData(get(this, "$router.history.current.params.id", ""));
  },

  destroyed() {
    this.setStudyMode("");
    this.setPayload(null);
  },

  watch: {
    payload: {
      handler: function() {
        console.log(this.payload);
      },
      deep: true
    }
  },

  methods: {
    async getData(elearning_id) {
      const options = {
        params: {
          elearning_id
        }
      };
      const getInfo = this.$store.dispatch(
        `elearning/study/study-info/${actionTypes.ELEARNING_STUDY_INFO.LIST}`,
        options
      );
      const getTest = this.$store.dispatch(
        `elearning/study/study-exercise/${actionTypes.ELEARNING_STUDY_EXERCISE.LIST_ELEARNING_EXERCISE}`,
        {
          elearning_id: elearning_id,
          category: EXERCISE_CATEGORIES.TEST
        }
      );

      const getInteractiveQuestion = () =>
        new InteractiveQuestionService(this.$axios)[actionTypes.BASE.LIST](
          options
        );
      const getProgress = this.$store.dispatch(
        `elearning/study/study-progress/${actionTypes.ELEARNING_STUDY_PROGRESS.LIST}`,
        options
      );

      this.loading = true;

      const data = await Promise.all([
        getInfo,
        getTest,
        getInteractiveQuestion(),
        getProgress
      ]);

      console.log(data);

      this.loading = false;

      this.interactive_questions = get(data, "1.data", null);
    },

    async addQuestionSuccess() {
      const res = await new InteractiveQuestionService(this.$axios)[
        actionTypes.BASE.LIST
      ]({
        params: {
          elearning_id: get(this, "$router.history.current.params.id", "")
        }
      });
      this.interactive_questions = get(res, "data", null);
    },

    get,
    ...mapMutations("event", ["setStudyMode", "setPayload"])
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/elearning/_study.scss";
</style>
