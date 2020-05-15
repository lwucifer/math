<template>
  <div
    class="content elearning-lesson-side__lesson"
    :class="get(lesson, 'completes', 0) ? 'active' : ''"
  >
    <div class="lesson-title mb-2">
      <app-checkbox
        :checked="lesson.status == lessonCompleted"
        :disabled="lesson.status == lessonCompleted"
        @change="isShowCompleteStudy = true"
      />
      <p
        class="text-uppercase pl-1 text-clickable"
        @click="handleStuty(lesson)"
      >
        {{ get(lesson, "name", "") }}
      </p>
    </div>
    <div class="bottom d-flex">
      <div>
        <IconPlay class="mr-2" />
        <span>{{ get(lesson, "duration", "00:00") }}</span>
      </div>
      <!-- <div class="color-primary ml-auto" v-if="get(lesson, 'completes', 0)">
        <IconFileCheckAlt class="mr-2 fill-primary" height="16" width="16" />
        <span>Xem kết quả</span>
      </div> -->
      <div
        class="ml-auto text-clickable"
        :class="`color-${classExerciseStatus}`"
        v-if="get(lesson, 'exercises', 0)"
        @click.prevent="handleGetExercises"
      >
        <IconFileEditAlt
          class="mr-2"
          :class="`fill-${classExerciseStatus}`"
          height="16"
          width="16"
        />
        <span>Bài tập({{ completeExecerciseRate }})</span>
      </div>
      <!-- <div class="color-yellow ml-auto" v-else>
        <IconFileClock class="mr-2 fill-yellow" height="16" width="16" />
        <span>Chờ chấm điểm</span>
      </div> -->
    </div>

    <app-modal-confirm
      v-if="isShowCompleteStudy"
      title="Hoàn thành bài học"
      :footer="false"
      description="Bạn có chắc là bạn muốn hoàn thành bài học này"
      @close="isShowCompleteStudy = false"
      @cancel="isShowCompleteStudy = false"
      @ok="handleCompleteStudy"
    >
    </app-modal-confirm>

    
  </div>
</template>

<script>
import IconPlay from "~/assets/svg/icons/play.svg?inline";
import IconUpO from "~/assets/svg/icons/up-o.svg?inline";
import IconDownO from "~/assets/svg/icons/down-o.svg?inline";
import IconFileCheck from "~/assets/svg/design-icons/file-check.svg?inline";
import IconFileEditAlt from "~/assets/svg/design-icons/file-edit-alt.svg?inline";
import IconFileCheckAlt from "~/assets/svg/design-icons/file-check-alt.svg?inline";
import IconFileClock from "~/assets/svg/icons/file-clock.svg?inline";
import { get } from "lodash";
import StudyService from "~/services/elearning/study/Study";
import { mapActions, mapMutations } from "vuex";
import {
  EXERCISE_CATEGORIES,
  STUDY_MODE,
  LESSION_STATUS,
} from "~/utils/constants";
import { redirectWithParams, getParamQuery } from "~/utils/common";
import ProgressService from "~/services/elearning/study/Progress";
import * as actionTypes from "~/utils/action-types";

// (VIDEO | ARTICLE | IMAGE | DOCS)

export default {
  data() {
    return {
      lessonCompleted: LESSION_STATUS.COMPLETED,
      isShowCompleteStudy: false,
      
    };
  },
  components: {
    IconPlay,
    IconDownO,
    IconUpO,
    IconFileClock,
    IconFileCheckAlt,
    IconFileEditAlt,
    IconFileCheck,
  },
  props: {
    lesson: Object,
  },

  mounted() {
    const lesson_id = getParamQuery("lesson_id");
    if (lesson_id && lesson_id === this.lesson.id) {
      this.handleStuty(this.lesson);
    }
  },

  methods: {
    getProgress() {
      const elearning_id = get(this, "$router.history.current.params.id", "");
      const options = {
        params: {
          elearning_id,
        },
      };
      this.$store.dispatch(
        `elearning/study/study-progress/${actionTypes.ELEARNING_STUDY_PROGRESS.LIST}`,
        options
      );
    },
    async handleCompleteStudy() {
      const payload = {
        completed: true,
        lesson_id: get(this, "lesson.id", ""),
      };
      const res = await new ProgressService(this.$axios)["add"](payload);
      console.log("[handleCompleteStudy]", res)
      if (get(res, "success", false)) {
        // this.$toasted.success("Thành công");
        // close modal confirm
        this.isShowCompleteStudy = false;

        this.getProgress();
        return;
      }
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },
    get,
    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyElearningExerciseList",
    ]),

    ...mapMutations("event", ["setStudyMode", "setPayload", "setExerciseLoading"]),

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
      this.elearningSudyElearningExerciseList(elearningReq); // get list exercises of lession
    },
  },

  computed: {
    completes() {
      return get(this.lesson, "completes", 0);
    },
    exercises() {
      return get(this.lesson, "exercises", 0);
    },
    completeExecerciseRate() {
      return `${this.completes}/${this.exercises}`;
    },

    // return primary|red
    classExerciseStatus() {
      // debugger;
      if (this.completes == this.exercises) {
        return "primary";
      } else if (this.completes < this.exercises) {
        return "red";
      }
    },
  },
};
</script>
