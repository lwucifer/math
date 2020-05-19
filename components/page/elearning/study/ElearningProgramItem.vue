<template>
  <div
    class="e-program-item"
    :class="get(lesson, 'status', 0) ? 'completed' : ''"
  >
    <div class="e-program-item__left">
      <app-checkbox
        :checked="lesson.status == lessonCompleted"
        :style="{
          'pointer-events':
            lesson.status == lessonCompleted ? 'none' : 'inherit'
        }"
        @change="isShowCompleteStudy = true"
      />
    </div>

    <div class="e-program-item__right">
      <a href class="e-program-item__title" @click.prevent="handleStuty(lesson)"
        >{{ `${lesson.index}.` }} {{ get(lesson, "name", "") }}</a
      >

      <div class="e-program-item__bottom">
        <span v-if="isShowVideoLesson" class="d-inline-flex align-items-center">
          <IconSlowMotionVideo class="icon body-1 mr-1 text-primary" />
          <span>{{ durationTimes }}</span>
        </span>

        <span v-else class="d-inline-flex align-items-center">
          <IconEventNote class="icon body-1 mr-1 text-primary" />
          <span class="mw-4">{{ durationTimes }}</span>
        </span>

        <a
          href
          class="d-inline-flex align-items-center text-decoration-none"
          :class="`text-${classExerciseStatus}`"
          v-if="get(lesson, 'exercises', 0)"
          @click.prevent="handleGetExercises"
        >
          <IconFileCheckAlt class="icon body-1 mr-1" />
          <span>Bài tập({{ completeExecerciseRate }})</span>
        </a>

        <app-dropdown
          v-if="lesson.link"
          class="e-program-item__download-tooltip"
          position="topCenter"
        >
          <a
            slot="activator"
            download
            target="_blank"
            :href="lesson.link"
            class="d-inline-flex align-items-center text-decoration-none"
          >
            <IconFileDownloadAlt class="icon body-1 text-info" />
          </a>

          <span>Tải tài liệu</span>
        </app-dropdown>
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
  </div>
</template>

<script>
import { get } from "lodash";
import { mapActions, mapMutations, mapState } from "vuex";
import {
  EXERCISE_CATEGORIES,
  STUDY_MODE,
  LESSION_STATUS,
  LESSION_TYPE
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
import { ERRORS } from '../../../../utils/error-code';

// (VIDEO | ARTICLE | IMAGE | DOCS)

export default {
  components: {
    IconFileCheckAlt,
    IconSlowMotionVideo,
    IconFileDownloadAlt,
    IconEventNote
  },

  props: {
    lesson: Object
  },

  data() {
    return {
      lessonCompleted: LESSION_STATUS.COMPLETED,
      isShowCompleteStudy: false,
      notify: {
        type: "",
        description: "",
        isShowNotify: false
      }
    };
  },

  mounted() {
    const lesson_id = getParamQuery("lesson_id");
    if (lesson_id && lesson_id === this.lesson.id) {
      this.handleStuty(this.lesson);
      // window.scrollTo(0, 0);
    }
  },

  computed: {
    ...mapState("elearning/study/study-exercise", ["isReloadExerciseList"]),

    completes() {
      return get(this.lesson, "completes", 0);
    },
    exercises() {
      return get(this.lesson, "exercises", 0);
    },
    completeExecerciseRate() {
      return `${this.completes}/${this.exercises}`;
    },

    // return primary|secondary
    classExerciseStatus() {
      // debugger;
      if (this.completes == this.exercises) {
        return "primary";
      } else if (this.completes < this.exercises) {
        return "secondary";
      }
    },

    isShowVideoLesson() {
      return get(this.lesson, "type", "") == LESSION_TYPE.VIDEO;
    },

    durationTimes() {
      const duration = get(this.lesson, "duration", 0);
      return getCountdown_MM_SS(duration);
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

    async handleStuty(lesson) {
      redirectWithParams({ lesson_id: get(lesson, "id", "") });

      if (get(lesson, "type", "") === "DOCS") {
        this.setStudyMode(STUDY_MODE.DOCS);
        this.setPayload(lesson);
        this.setExerciseLoading(false); // turnoff loading
        return;
      }

      if (get(lesson, "type", "") === "ARTICLE") {
        this.setStudyMode(STUDY_MODE.ARTICLE);
        this.setPayload(lesson);
        this.setExerciseLoading(false); // turnoff loading
        return;
      }

      if (get(lesson, "type", "") === "IMAGE") {
        this.setStudyMode(STUDY_MODE.IMAGE);
        this.setPayload(lesson);
        this.setExerciseLoading(false); // turnoff loading
        return;
      }

      if (get(lesson, "type", "") === "VIDEO") {
        const elearning_id = get(this, "$router.history.current.params.id", "");
        const lesson_id = get(lesson, "id", "");
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

    // get list exercise of elearning lession
    async handleGetExercises() {
      console.log("[handleGetExercises]", this.lesson);
      const elearning_id = get(this, "$router.history.current.params.id", "");
      const lesson_id = get(this, "lesson.id", "");
      const category = EXERCISE_CATEGORIES.EXERCISE;
      const elearningReq = { elearning_id, lesson_id, category };

      this.setStudyMode(STUDY_MODE.DO_EXERCISE); // change display exercise list instead of video_playing
      this.setStudyExerciseCurrentLession(this.lesson); // set current lesson to return list exercise after submission success
      this.elearningSudyElearningExerciseList(elearningReq); // get list exercises of lession
    },

    handleResultCompleteStudy(res) {
      // if false
      if (!get(res, "success", false)) {
        let msgErr = 'Có lỗi xảy ra';
        switch (res.code) {
          case ERRORS.EXERCISE.MUST_COMPLETE_ALL_REQUIRED_EXERCISES:
            msgErr = 'Bạn phải hoàn thành tất cả các bài tập bắt buộc của bài học trước.'
            break;
        
          default:
            break;
        }
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
      // this.getProgress();
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
