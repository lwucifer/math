<template>
  <div>
    <create-action :isShowAction="false" />
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài kiểm tra</h1>
      </div>

      <div class="px-4">
        <app-alert type="info" class="mt-4" show-close>
          Bạn có thể tạo bài kiểm tra cho bài giảng/ khóa học của bạn tại đây. Nếu bài giảng/ khóa học của
          bạn không yêu cầu làm bài tập, bạn có thể bỏ qua phần này và tiến hành
          gửi lên để được xét duyệt.
        </app-alert>
      </div>

      <ButtonCreateExercise
        v-if="isShowButtonCreate"
        @handleClick="handleShowFormAdd"
        :category="category"
      />

      <FormCreateExam
        v-if="isShowFormAdd"
        @cancel="handleHideFormAdd"
        :category="category"
      />

      <ExamList
        v-for="(exercise, index) in get(exams, 'content', [])"
        :key="exercise.id"
        :exercise="exercise"
        :index="index"
      />
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
import FormCreateExam from "~/components/page/course/create/exercise/FormCreateExam";
import ExamList from "~/components/page/course/create/exercise/ExamList";
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
    FormCreateExam,
    ExamList,
    SelectLesson,
  },

  data() {
    return {
      isShowButtonCreate: true,
      isShowFormAdd: false,
      category: "TEST",
    };
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
      exams: "exams",
    }),
  },

  // mounted() {
  //   this.$store.dispatch("elearning/create/getExams");
  // },

  methods: {
    handleShowFormAdd() {
      this.isShowButtonCreate = false;
      this.isShowFormAdd = true;
    },

    handleHideFormAdd() {
      this.isShowButtonCreate = true;
      this.isShowFormAdd = false;
    },

    get,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-exercise.scss";
</style>
