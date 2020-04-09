<template>
  <div class="container course-create">
    <div class="row">
      <div class="col-md-3">
        <CreateAside @click-item="setFormActive" />
      </div>

      <div class="col-md-9">
        <CreateGeneralInformation
          v-if="formActive === 'general'"
          class="mb-5"
        />
        <CreateLearningContentCourse v-if="formActive === 'content-course'" />
        <CreateLearningContentLecture v-if="formActive === 'content-lecture'" />
        <CreateSetting v-if="formActive === 'settings'" />
        <CreateExercise v-if="formActive === 'exercise'" />
        <CreateExam v-if="formActive === 'exam'" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateAside from "~/components/page/course/create/CreateAside";
import CreateGeneralInformation from "~/components/page/course/create/CreateGeneralInformation";
import CreateSetting from "~/components/page/course/create/CreateSetting";
import CreateExercise from "~/components/page/course/create/CreateExercise";
import CreateExam from "~/components/page/course/create/CreateExam";
import CreateLearningContentLecture from "~/components/page/course/create/lecture/CreateLearningContentLecture";
import CreateLearningContentCourse from "~/components/page/course/create/course/CreateLearningContentCourse";
import * as actionTypes from "~/utils/action-types";

export default {
  layout: "no-header",

  components: {
    CreateAside,
    CreateGeneralInformation,
    CreateLearningContentCourse,
    CreateSetting,
    CreateExercise,
    CreateExam,
    CreateLearningContentLecture
  },

  async fetch({ params, query, store }) {
    await store.dispatch(
      `elearning/public/public-subject/${actionTypes.ELEARNING.SUBJECT}`
    );
    await store.dispatch(
      `elearning/public/public-levels/${actionTypes.ELEARNING.LEVEL}`
    );
  },

  data() {
    return {
      formActive: "general"
    };
  },

  methods: {
    setFormActive(key) {
      this.formActive = key;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-create.scss";
</style>
