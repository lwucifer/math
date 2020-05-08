<template>
  <div>
    <HeaderCourse />
    <div class="container elearning-lesson" v-if="loading">Loading...</div>
    <div class="container elearning-lesson" v-else>
      <div class="elearning-lesson__main">
        <div class="row">
          <div class="col-md-8">
            <div class="box22">

              <!-- VIDEO STREAMING -->
              <div class="elearning-lesson_image" v-if="studyMode == videoMode">
                <Streaming
                  v-if="type_study_lesson === 'video'"
                  :url="url_video_streaming"
                />
                <img
                  src="https://picsum.photos/750/422"
                  alt
                  v-if="type_study_lesson === 'image'"
                />
              </div>

              <!-- DO EXERCISE -->
              <ElearningExercise v-else/>

              
              <div class="elearning-lesson__main-nav">
                <a
                  :class="{ active: type === 'summary' }"
                  @click="type = 'summary'"
                  >Tổng quan</a
                >
                <a
                  :class="{ active: type === 'question' }"
                  @click="type = 'question'"
                  >Hỏi đáp</a
                >
                <!-- <n-link :to="'/elearning/course/question'">Hỏi đáp</n-link> -->
                <n-link :to="'/elearning/course/notify'">Thông báo</n-link>
                <n-link :to="'/elearning/course/question'">Đánh giá</n-link>
              </div>
              <ElearningInfo :info="info" v-if="type === 'summary'" />
              <ElearningQuestion
                v-if="type === 'question'"
                :interactive_questions="interactive_questions"
                @addQuestionSuccess="addQuestionSuccess"
              />
            </div>
          </div>
          <div class="col-md-4">
            <ElearningCourseSide :info="info" :progress="progress" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningCourseSide from "~/components/page/elearning/study/ElearningCourseSide";
import HeaderCourse from "~/components/layout/header/HeaderCourse";
import IconSearch from "~/assets/svg/design-icons/search.svg?inline";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
// Import faked data
import { COURSE_LESSON } from "~/server/fakedata/elearning/test";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import InfoService from "~/services/elearning/study/Info";
import InteractiveQuestionService from "~/services/elearning/study/InteractiveQuestion";
import ProgressService from "~/services/elearning/study/Progress";
import { get } from "lodash";
import ProgramService from "~/services/elearning/public/Program";
import { AUTH, COMMENTS, LESSON } from "~/server/fakedata/elearning/test";
import ElearningInfo from "~/components/page/elearning/study/ElearningInfo";
import ElearningQuestion from "~/components/page/elearning/study/ElearningQuestion";
import Streaming from "~/components/page/elearning/study/Streaming";
import ElearningExercise from "~/components/page/elearning/study/exercise/ElearningExercise";
import {
  STUDY_LESSON_TYPE_VIDEO,
  STUDY_LESSON_TYPE_IMAGE,
} from "~/utils/event-type";
import { STUDY_MODE } from '~/utils/constants';

// http://localhost:5000/elearning/79408a5d-12d7-4498-a2b3-faf4b9a9d1bd/study?lession_id=xxx&start_time=yyyy

export default {
  name: "Elearning",
  layout: "studying",

  components: {
    ElearningCourseSide,
    IconSearch,
    IconCamera,
    HeaderCourse,
    ElearningInfo,
    ElearningQuestion,
    Streaming,
    ElearningExercise
  },

  created() {
    this.getData(get(this, "$router.history.current.params.id", ""));
  },

  methods: {
    async getData(elearning_id) {
      const getInfo = () =>
        new InfoService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id,
          },
        });
      const getInteractiveQuestion = () =>
        new InteractiveQuestionService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id,
          },
        });
      const getProgress = () =>
        new ProgressService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id,
          },
        });

      this.loading = true;

      const data = await Promise.all([
        getInfo(),
        getInteractiveQuestion(),
        getProgress(),
      ]);

      this.loading = false;

      this.info = get(data, "0.data", null);
      this.interactive_questions = get(data, "1.data", null);
      this.progress = get(data, "2.data", null);
    },
    get,
    async addQuestionSuccess() {
      const res = await new InteractiveQuestionService(this.$axios)[
        actionTypes.BASE.LIST
      ]({
        params: {
          elearning_id: get(this, "$router.history.current.params.id", ""),
        },
      });
      this.interactive_questions = get(res, "data", null);
    },
  },

  data() {
    return {
      type: "summary",
      loading: true,
      info: null,
      interactive_questions: null,
      progress: null,
      type_study_lesson: "image",
      url_video_streaming: "",
      videoMode: STUDY_MODE.VIDEO_PLAYING,
      exerciseMode: STUDY_MODE.DO_EXERCISE,
    };
  },

  watch: {
    event_study_lesson: {
      handler: function() {
        const type = get(this, "event_study_lesson.name", "");

        if (type === STUDY_LESSON_TYPE_VIDEO) {
          const url = get(
            this,
            "event_study_lesson.data.stream_urls.hls_url",
            ""
          );
          this.type_study_lesson = "video";
          this.url_video_streaming = url;
        }

        if (type === STUDY_LESSON_TYPE_IMAGE) {
          this.type_study_lesson = "image";
          this.url_video_streaming = "";
        }
      },
      deep: true,
    },
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("event", [
      { event_study_lesson: "payload" },
      'studyMode',
    ]),
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course.scss";
</style>
