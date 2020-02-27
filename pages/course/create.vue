<template>
  <div class="container course-create">
    <div class="row">
      <div class="col-md-3">
        <CreateAside :active="formActive" @click-item="setFormActive" />
      </div>

      <div class="col-md-9">
        <CreateGeneralInformation v-show="formActive === 'general'" class="mb-5" />
        <CreateLearningContent v-show="formActive === 'content'" />
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
import CreateLearningContent from "~/components/page/course/create/CreateLearningContent";
import CreateSetting from "~/components/page/course/create/CreateSetting";
import CreateExcercise from "~/components/page/course/create/CreateExcercise";
import CreateExam from "~/components/page/course/create/CreateExam";

export default {
  layout: "create",

  components: {
    CreateAside,
    CreateGeneralInformation,
    CreateLearningContent,
    CreateSetting,
    CreateExcercise,
    CreateExam
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