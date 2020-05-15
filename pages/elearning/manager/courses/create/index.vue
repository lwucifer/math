<template>
  <div class="container course-create">
    <breadcrumb />

    <div class="row">
      <div class="col-md-3">
        <CreateAside @click-item="setFormActive" :formActive="formActive" />
      </div>

      <div class="col-md-9">
        <CreateGeneralInformation
          v-if="formActive === 'general'"
          class="mb-5"
          @nextStep="nextStep"
        />
        <ContentLecture v-if="formActive === 'content-lecture'" />
        <ContentCourse v-if="formActive === 'content-course'" />
        <CreateSetting v-if="formActive === 'settings'" @nextStep="nextStep" />
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
import ContentLecture from "~/components/page/course/create/ContentLecture";
import ContentCourse from "~/components/page/course/create/ContentCourse";
import * as actionTypes from "~/utils/action-types";
import { getParamQuery } from "~/utils/common";

export default {
  layout: "exercise",

  components: {
    CreateAside,
    CreateGeneralInformation,
    ContentLecture,
    CreateSetting,
    CreateExercise,
    CreateExam,
    ContentCourse,
  },

  // async fetch({ params, query, store }) {
  //   await store.dispatch(
  //     `elearning/public/public-subject/${actionTypes.ELEARNING.SUBJECT}`
  //   );
  //   await store.dispatch(
  //     `elearning/public/public-levels/${actionTypes.ELEARNING.LEVEL}`
  //   );
  // },

  data() {
    return {
      formActive: "general",
    };
  },

  mounted() {
    //
  },

  updated() {
    console.log(this.formActive);
  },

  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },

  watch: {
    "$route.query.elearning_id": {
      handler: function() {
        window.location.reload();
      },
    },
  },

  methods: {
    nextStep(active) {
      this.formActive = active;
      window.scrollTo(0, 0);
    },
    preventNav(event) {
      event.preventDefault();
      event.returnValue = "";
    },

    setFormActive(key) {
      this.formActive = key;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-create.scss";
</style>
