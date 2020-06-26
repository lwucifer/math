<template>
  <VclFacebook v-if="loading"></VclFacebook>
  <div class="container course-create" v-else>
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
        <ContentLecture
          v-if="formActive === 'content-lecture'"
          @nextStep="nextStep"
        />
        <ContentCourse
          v-if="formActive === 'content-course'"
          @nextStep="nextStep"
        />
        <CreateSetting v-if="formActive === 'settings'" @nextStep="nextStep" />
        <CreateExercise v-if="formActive === 'exercise'" @nextStep="nextStep" />
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
import { getParamQuery, useEffect } from "~/utils/common";
import { mapState } from "vuex";
import { VclFacebook } from "vue-content-loading";
import { get } from "lodash";

export default {
  layout: "manage",

  components: {
    CreateAside,
    CreateGeneralInformation,
    ContentLecture,
    CreateSetting,
    CreateExercise,
    CreateExam,
    ContentCourse,
    VclFacebook,
  },

  data() {
    return {
      formActive: "general",
      loading: true,
      redirect: true,
    };
  },

  mounted() {
    useEffect(this, this.handleGetData.bind(this), [""]);

    useEffect(this, this.handleChangeContent.bind(this), [
      "lessons_lecture",
      "chapters",
    ]);

    useEffect(this, this.handleUpdateProgress.bind(this), [
      "general",
      "lessons_lecture",
      "chapters",
      "setting",
      "lessons",
      "exams",
      "lesson",
    ]);
  },

  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },

  watch: {
    disabled_all: {
      handler: function() {
        if (this.disabled_all && this.redirect) {
          this.formActive = "settings";
          this.redirect = false;
        }
      },
      deep: true,
    },
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
      progress: "progress",
      lessons_lecture: "lessons_lecture",
      chapters: "chapters",
      setting: "setting",
      lessons: "lessons",
      exams: "exams",
      lesson: "lesson",
    }),
    disabled_all() {
      return this.$store.getters["elearning/create/disabled_all"];
    },
  },

  methods: {
    handleUpdateProgress() {
      if (!this.loading) {
        this.$store.dispatch("elearning/create/getProgress");
      }
    },

    handleChangeContent() {
      if (!this.loading) {
        this.$store.dispatch("elearning/create/getLessons");
      }
    },

    async handleGetData() {
      this.loading = true;
      this.$store.dispatch("elearning/create/reset");
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        params: {
          elearning_id,
        },
      };
      await this.$store.dispatch(`elearning/create/getGeneral`, options);
      await Promise.all([
        this.$store.dispatch(`elearning/create/getContent`),
        this.$store.dispatch("elearning/create/getLessons"),
        this.$store.dispatch(`elearning/create/getSetting`),
        this.$store.dispatch("elearning/create/getExams"),
      ]);
      await this.$store.dispatch("elearning/create/getProgress");
      this.loading = false;
    },

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
