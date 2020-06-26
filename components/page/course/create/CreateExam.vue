<template>
  <div>
    <create-action :isShowAction="false" />
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài kiểm tra</h1>
      </div>

      <div class="px-4">
        <app-alert type="info" class="mt-4" show-close>
          Bạn có thể tạo bài kiểm tra cho bài giảng/ khóa học của bạn tại đây.
          Nếu bài giảng/ khóa học của bạn không yêu cầu làm bài tập, bạn có thể
          bỏ qua phần này và tiến hành gửi lên để được xét duyệt.
        </app-alert>
      </div>

      <ButtonCreateExam
        v-if="isShowButtonCreate"
        @handleClick="handleShowFormAdd"
      />

      <AddExam v-if="isShowFormAdd" @cancel="handleHideFormAdd" />

      <ExamList
        v-for="(exam, index) in get(exams, 'content', [])"
        :key="exam.id"
        :exam="exam"
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
import ButtonCreateExam from "~/components/page/course/create/exams/ButtonCreateExam";
import AddExam from "~/components/page/course/create/exams/AddExam";
import ExamList from "~/components/page/course/create/exams/ExamList";
import SelectLesson from "~/components/page/course/create/exams/SelectLesson";
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
    ButtonCreateExam,
    AddExam,
    ExamList,
    SelectLesson,
  },

  data() {
    return {
      isShowButtonCreate: true,
      isShowFormAdd: false,
    };
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
      exams: "exams",
      progress: "progress",
    }),
  },

  methods: {
    handleShowFormAdd() {
      if (this.disabled_all) return;
      this.isShowButtonCreate = false;
      this.isShowFormAdd = true;
    },

    handleHideFormAdd() {
      if (this.disabled_all) return;
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
