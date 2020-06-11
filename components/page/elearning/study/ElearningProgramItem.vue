<template>
  <div class="e-program-item" :class="isLessonCompleted ? 'completed' : ''">
    <div class="e-program-item__left">
      <app-checkbox
        v-model="lessonStatus"
        ref="completedCheckbox"
        :style="{
          'pointer-events': isLessonCompleted ? 'none' : 'inherit'
        }"
        @change="isShowCompleteStudy = true"
      />
    </div>

    <div class="e-program-item__right">
      <a href class="e-program-item__title" @click.prevent="handleExitExercise2"
        >{{ `${index}.` }} {{ get(lesson, "name", "") }}</a
      >

      <div class="e-program-item__bottom">
        <div class="e-program-item__time">
          <span
            v-if="isShowVideoLesson"
            class="d-inline-flex align-items-center"
          >
            <IconSlowMotionVideo class="icon body-1 mr-1 text-primary" />
            <span>{{ durationTimes }}</span>
          </span>

          <span v-else class="d-inline-flex align-items-center">
            <IconEventNote class="icon body-1 mr-1 text-primary" />
            <span class="mw-4">01:00</span>
          </span>
        </div>

        <div class="e-program-item__exercises">
          <a
            v-if="get(lesson, 'exercises', 0)"
            href
            class="d-inline-flex align-items-center text-decoration-none"
            :class="`text-${classExerciseStatus}`"
            v-scroll-to="'body'"
            @click.prevent="handleExitExercise"
          >
            <IconFileCheckAlt class="icon body-1 mr-1" />
            <span>Bài tập ({{ completeExecerciseRate }})</span>
          </a>
        </div>

        <div class="e-program-item__download">
          <app-dropdown
            v-if="lesson_docs.length"
            class="e-program-item__download-tooltip"
            position="topCenter"
          >
            <span
              slot="activator"
              class="d-inline-flex align-items-center text-decoration-none"
            >
              <IconFileDownloadAlt class="icon body-1 text-info" />
            </span>

            <template>
              <div v-for="(link, index) in lesson_docs || []" :key="index">
                <a
                  :href="link.url"
                  class="d-inline-flex align-items-center caption"
                  download
                  target="_blank"
                >
                  <IconFileDownloadAlt class="icon body-1 text-info mr-2" />
                  {{ link.name }}
                </a>
              </div>
            </template>
          </app-dropdown>
        </div>
      </div>
    </div>

    <app-modal-confirm
      v-if="isShowCompleteStudy"
      title="Hoàn thành bài học"
      :footer="false"
      description="Bạn có chắc là bạn muốn hoàn thành bài học này"
      @close="closeConfirmCompleteStudy"
      @cancel="closeConfirmCompleteStudy"
      @ok="handleCompleteStudy"
    ></app-modal-confirm>

    <app-modal-notify
      v-if="notify.isShowNotify"
      :type="notify.type"
      :title="notify.title"
      @close="notify.isShowNotify = false"
      @ok="notify.isShowNotify = false"
    />

    <app-modal-confirm
      centered
      v-if="isShowConfirmExit"
      title="Xác nhận thoát?"
      description="Bạn có chắc chắn muốn thoát? Hệ thống sẽ đánh trượt bài làm của bạn."
      @ok="handleGetOkExercises"
      @cancel="isShowConfirmExit = false"
    />

    <app-modal-confirm
      centered
      v-if="isShowConfirmExit2"
      title="Xác nhận thoát?"
      description="Bạn có chắc chắn muốn thoát? Hệ thống sẽ đánh trượt bài làm của bạn."
      @ok="handleOkStudy"
      @cancel="isShowConfirmExit2 = false"
    />
  </div>
</template>

<script>
import { get } from "lodash";
import { mapActions, mapMutations, mapState } from "vuex";
import {
  EXERCISE_CATEGORIES,
  STUDY_MODE,
  LESSION_STATUS,
  LESSION_TYPE,
  PAGE_SIZE
} from "~/utils/constants";
import {
  redirectWithParams,
  getParamQuery,
  getCountdown_MM_SS
} from "~/utils/common";
import ProgressService from "~/services/elearning/study/Progress";
import * as actionTypes from "~/utils/action-types";

const IconFileCheckAlt = () =>
  import("~/assets/svg/design-icons/file-check-alt.svg?inline");
const IconFileDownloadAlt = () =>
  import("~/assets/svg/design-icons/file-download-alt.svg?inline");
import IconSlowMotionVideo from "~/assets/svg/v2-icons/slow_motion_video_24px.svg?inline";
import IconEventNote from "~/assets/svg/v2-icons/event_note_24px.svg?inline";

import StudyService from "~/services/elearning/study/Study";
import { ERRORS } from "../../../../utils/error-code";

// (VIDEO | ARTICLE | IMAGE | DOCS)

export default {
  components: {
    IconFileCheckAlt,
    IconSlowMotionVideo,
    IconFileDownloadAlt,
    IconEventNote
  },

  props: {
    lesson: {
      type: Object,
      default: () => {}
    },
    index: {}
  },

  data() {
    return {
      lessonCompleted: LESSION_STATUS.COMPLETED,
      isShowCompleteStudy: false,
      notify: {
        type: "",
        description: "",
        isShowNotify: false
      },
      lessonStatus: false,
      isShowConfirmExit: false,
      isShowConfirmExit2: false
    };
  },

  created() {
    // console.log("[this.lesson]", this.lesson);
  },

  mounted() {
    this.lessonStatus = get(this, "lesson.status", 0) == this.lessonCompleted;

    const lesson_id = getParamQuery("lesson_id");
    if (lesson_id && lesson_id === this.lesson.id) {
      this.handleStudy(this.lesson);
      // window.scrollTo(0, 0);
    }
  },

  computed: {
    ...mapState("elearning/study/study-exercise", ["isReloadExerciseList"]),
    ...mapState("event", ["studyMode"]),

    passedExercise() {
      return get(this.lesson, "passed", 0);
    },
    pendingExercise() {
      return get(this.lesson, "pending", 0);
    },
    failedExercise() {
      return get(this.lesson, "failed", 0);
    },
    workingExercise() {
      return get(this.lesson, "working", 0);
    },
    exercises() {
      return get(this.lesson, "exercises", 0);
    },
    completeExecerciseRate() {
      const totalExDid =
        this.passedExercise +
        this.pendingExercise +
        this.failedExercise +
        this.workingExercise;
      return `${totalExDid}/${this.exercises}`;
    },

    // return primary|secondary|warning
    classExerciseStatus() {
      // debugger;
      if (this.passedExercise == this.exercises) {
        return "primary";
      } else if (this.failedExercise > 0 || this.workingExercise > 0) {
        return "secondary";
      } else if (this.pendingExercise > 0) {
        return "warning";
      } else {
        return "warning";
      }
    },

    isShowVideoLesson() {
      return get(this.lesson, "type", "") == LESSION_TYPE.VIDEO;
    },

    durationTimes() {
      const duration = get(this.lesson, "duration", 0);
      return getCountdown_MM_SS(duration);
    },

    isLessonCompleted() {
      const status = get(this.lesson, "status", 0);
      return status == this.lessonCompleted;
    },

    lesson_docs() {
      return get(this.lesson, "lesson_docs", []);
    }
  },

  methods: {
    getProgress() {
      const elearning_id = get(this, "$router.history.current.params.id", "");
      const options = {
        params: {
          elearning_id
        }
      };
      this.$store.dispatch(
        `elearning/study/study-progress/${actionTypes.ELEARNING_STUDY_PROGRESS.LIST}`,
        options
      );
    },
    async handleCompleteStudy() {
      const payload = {
        completed: true,
        lesson_id: get(this, "lesson.id", "")
      };
      const res = await new ProgressService(this.$axios)["add"](payload);
      console.log("[handleCompleteStudy]", res);
      this.handleResultCompleteStudy(res);

      // this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },
    get,
    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyElearningExerciseList"
    ]),

    ...mapMutations("event", [
      "setStudyMode",
      "setPayload",
      "setExerciseLoading"
    ]),
    ...mapMutations("elearning/study/study-exercise", [
      "setStudyExerciseCurrentLession"
    ]),

    handleExitExercise2() {
      console.log("[handleExitExercise2]", this.studyMode);
      // need to confirm if user in mode DO_EXERCISE_DOING
      if (this.studyMode == STUDY_MODE.DO_EXERCISE_DOING) {
        this.isShowConfirmExit2 = true;
        return;
      } else {
        this.handleStudy();
      }
    },

    async handleStudy() {
      this.isShowConfirmExit2 = false;
      redirectWithParams({ lesson_id: get(this.lesson, "id", "") });

      if (get(this.lesson, "type", "") === "DOCS") {
        this.setStudyMode(STUDY_MODE.DOCS);
        this.setPayload(this.lesson);
        this.setExerciseLoading(false); // turnoff loading
        return;
      }

      if (get(this.lesson, "type", "") === "ARTICLE") {
        this.setStudyMode(STUDY_MODE.ARTICLE);
        this.setPayload(this.lesson);
        this.setExerciseLoading(false); // turnoff loading
        return;
      }

      if (get(this.lesson, "type", "") === "IMAGE") {
        this.setStudyMode(STUDY_MODE.IMAGE);
        this.setPayload(this.lesson);
        this.setExerciseLoading(false); // turnoff loading
        return;
      }

      if (get(this.lesson, "type", "") === "VIDEO") {
        const elearning_id = get(this, "$router.history.current.params.id", "");
        const lesson_id = get(this.lesson, "id", "");
        const res = await new StudyService(this.$axios)["studyLesson"](
          elearning_id,
          lesson_id
        );
        if (get(res, "success", false)) {
          this.setStudyMode(STUDY_MODE.VIDEO_PLAYING);
          this.setPayload(get(res, "data", null));
          return;
        }
        this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
      }
    },

    handleOkStudy() {
      this.getProgress();
      this.handleStudy();
    },

    handleGetOkExercises() {
      this.getProgress();
      this.handleGetExercises();
    },

    handleExitExercise() {
      console.log("[handleExitExercise]");
      // need to confirm if user in mode DO_EXERCISE_DOING
      if (this.studyMode == STUDY_MODE.DO_EXERCISE_DOING) {
        this.isShowConfirmExit = true;
        return;
      } else {
        this.handleGetExercises();
      }
    },

    // get list exercise of elearning lession
    async handleGetExercises() {
      console.log("[handleGetExercises]", this.lesson);
      this.isShowConfirmExit = false;

      const elearning_id = get(this, "$router.history.current.params.id", "");
      const lesson_id = get(this, "lesson.id", "");
      const category = EXERCISE_CATEGORIES.EXERCISE;
      const elearningReq = { elearning_id, lesson_id, category, size: PAGE_SIZE.MAXIMIZE, };

      this.setStudyMode(STUDY_MODE.DO_EXERCISE); // change display exercise list instead of video_playing
      this.setStudyExerciseCurrentLession(this.lesson); // set current lesson to return list exercise after submission success
      this.elearningSudyElearningExerciseList(elearningReq); // get list exercises of lession
    },

    handleResultCompleteStudy(res) {
      // if false
      if (!get(res, "success", false)) {
        let msgErr = "Có lỗi xảy ra";
        switch (res.code) {
          case ERRORS.EXERCISE.MUST_COMPLETE_ALL_REQUIRED_EXERCISES:
            msgErr =
              "Bạn phải hoàn thành tất cả các bài tập bắt buộc của bài học trước.";
            break;

          default:
            break;
        }
        this.lessonStatus = false;
        this.notify = {
          type: "error",
          title: msgErr,
          isShowNotify: true
        };
      }

      // always do these things
      this.isShowCompleteStudy = false;
      this.getProgress();
    },

    closeConfirmCompleteStudy() {
      this.isShowCompleteStudy = false;
      this.lessonStatus = false;
      // this.$refs.completedCheckbox.checked = false;
      console.log("[closeConfirmCompleteStudy]", this.$refs);
    }
  },

  watch: {
    isReloadExerciseList(_newVal) {
      console.log("[isReloadExerciseList]", _newVal);
      if (_newVal) {
        this.handleGetExercises();
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_elearning-program-item.scss";
</style>
