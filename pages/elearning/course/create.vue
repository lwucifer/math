<template>
  <div class="container course-create">
    <div class="row">
      <div class="col-md-3">
        <CreateAside @click-item="setFormActive" />
      </div>

      <div class="col-md-9">
        <CreateGeneralInformation v-show="formActive === 'general'" class="mb-5" />
        <CreateLearningContentCourse v-show="formActive === 'content-course'" />
        <CreateLearningContentLecture v-show="formActive === 'content-lecture'" />
        <CreateSetting v-show="formActive === 'settings'" />
        <CreateExcercise v-show="formActive === 'exercise'" />
        <CreateExam v-show="formActive === 'exam'" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateAside from "~/components/page/course/create/CreateAside";
import CreateGeneralInformation from "~/components/page/course/create/CreateGeneralInformation";
import CreateLearningContentCourse from "~/components/page/course/create/CreateLearningContentCourse";
import CreateSetting from "~/components/page/course/create/CreateSetting";
import CreateExcercise from "~/components/page/course/create/CreateExcercise";
import CreateExam from "~/components/page/course/create/CreateExam";
import CreateLearningContentLecture from "~/components/page/course/create/CreateLearningContentLecture";

export default {
  layout: "no-header",

  components: {
    CreateAside,
    CreateGeneralInformation,
    CreateLearningContentCourse,
    CreateSetting,
    CreateExcercise,
    CreateExam,
    CreateLearningContentLecture
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