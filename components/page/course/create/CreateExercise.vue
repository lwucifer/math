<template>
  <div>
    <create-action :isShowAction="false" />
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài tập</h1>
      </div>

      <SelectLesson
        v-if="get(general, 'type', '') === 'COURSE'"
        :lessons="lessons"
        @handleSelectLesson="handleSelectLesson"
      />

      <div v-if="lesson">
        <ButtonCreateExercise
          v-if="isShowButtonCreate"
          @handleClick="handleShowFormAdd"
          :category="category"
        />

        <FormCreateExercise
          v-if="isShowFormAdd"
          @handleCancel="handleCancelAddCreate"
          :lesson="lesson"
          @handleRefreshExcercises="handleRefreshExcercises"
          :category="category"
        />

        <ExerciseList
          v-for="(exercise, index) in get(lesson, 'exercises', [])"
          :key="exercise.id"
          :index="index"
          :exercise="exercise"
          @handleRefreshQuestion="handleRefreshQuestion"
          @handleRefreshExcercises="handleRefreshExcercises"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconInfoCircle from "~/assets/svg/design-icons/info-circle.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconAlignCenterAlt from "~/assets/svg/design-icons/align-center-alt.svg?inline";
import IconFileCheck from "~/assets/svg/design-icons/file-check.svg?inline";
import IconClipboardNotes from "~/assets/svg/design-icons/clipboard-notes.svg?inline";
import ButtonCreateExercise from "~/components/page/course/create/exercise/ButtonCreateExercise";
import FormCreateExercise from "~/components/page/course/create/exercise/FormCreateExercise";
import ExerciseList from "~/components/page/course/create/exercise/ExerciseList";
import SelectLesson from "~/components/page/course/create/exercise/SelectLesson";
import CreateAction from "~/components/page/course/create/common/CreateAction";
import * as actionTypes from "~/utils/action-types";
import { getParamQuery, useEffect } from "~/utils/common";
import { get } from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    IconInfoCircle,
    IconAngleDown,
    IconEditAlt,
    IconTrashAlt,
    IconAlignCenterAlt,
    IconFileCheck,
    IconClipboardNotes,
    CreateAction,
    ButtonCreateExercise,
    FormCreateExercise,
    ExerciseList,
    SelectLesson,
  },

  data() {
    return {
      isShowButtonCreate: true,
      isShowFormAdd: false,
      lessons: [],
      lesson: null,
      category: "EXERCISE",
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general",
    }),
  },

  created() {
    this.getLessons();
  },

  methods: {
    handleRefreshQuestion() {
      this.getProgress();
      this.getLesson(get(this, "lesson.id", ""));
    },

    async getLesson(lesson_id) {
      if (lesson_id) {
        const res = await this.$store.dispatch(
          `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.DETAIL}`,
          lesson_id
        );
        if (get(res, "success", false)) {
          this.lesson = get(res, "data", null);
          return;
        }
      }
      this.lesson = null;
    },

    handleRefreshExcercises() {
      this.getProgress();
      this.getLesson(get(this, "lesson.id", ""));
      this.isShowFormAdd = false;
      this.isShowButtonCreate = true;
    },

    handleShowFormAdd() {
      this.isShowButtonCreate = false;
      this.isShowFormAdd = true;
    },

    handleSelectLesson(lesson) {
      this.getLesson(get(lesson, "id", ""));
    },

    handleCancelAddCreate() {
      this.isShowButtonCreate = true;
      this.isShowFormAdd = false;
    },

    async getLessons() {
      const elearning_id = get(this, "general.id", "");
      const options = {
        params: {
          elearning_id,
        },
      };

      const res = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.LIST}`,
        options
      );
      if (get(res, "success", false)) {
        let lessons = [];
        get(res, "data", []).map((lesson) => {
          lesson.value = lesson.id;
          lesson.text = lesson.name;
          lessons.push(lesson);
        });
        this.lessons = lessons;
        if (get(this, "general.type", "") === "LECTURE") {
          this.lesson = lessons[0];
        }
      }
    },

    getProgress() {
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          elearning_id,
        },
      };
      this.$store.dispatch(
        `elearning/creating/creating-progress/${actionTypes.ELEARNING_CREATING_PROGRESS}`,
        options
      );
    },

    get,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-exercise.scss";
</style>
