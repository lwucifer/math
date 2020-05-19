<template>
  <div>
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h4 class="cc-panel__heading">Bài tập</h4>
      </div>

      <div class="px-4">
        <app-alert type="info" class="mt-4" show-close>
          Bạn có thể tạo bài tập cho bài giảng/ khóa học của bạn tại đây. Nếu bài giảng/ khóa học của
          bạn không yêu cầu làm bài tập, bạn có thể bỏ qua phần này và tiến hành
          gửi lên để được xét duyệt.
        </app-alert>

        <h5 v-if="get(general, 'type', '') === 'COURSE'" class="mb-3 mt-4">
          Chọn bài học liên quan
        </h5>

        <SelectLesson
          :class="{'pb-3': isShowButtonCreate}"
          v-if="get(general, 'type', '') === 'COURSE'"
          :lessons="lessons"
          :default-value="lessons[0] && lessons[0].id"
        />
      </div>

      <div v-if="lesson" class="pb-3">
        <ButtonCreateExercise
          v-if="isShowButtonCreate"
          @handleClick="handleShowFormAdd"
          :category="category"
        />

        <FormCreateExercise
          v-if="isShowFormAdd"
          @cancel="handleCancelAddCreate"
          :lesson="lesson"
          :category="category"
        />

        <ExerciseList
          v-for="(exercise, index) in get(lesson, 'exercises', [])"
          :key="exercise.id"
          :lesson="lesson"
          :index="index"
          :exercise="exercise"
        />
      </div>
    </div>

    <div class="create-action pt-5">
      <div class="create-action__right d-flex align-items-center">
        <!-- <app-button
          outline
          class="mr-4"
          color="error"
          ><IconDelete class="mr-2" /> Thiết lập lại</app-button
        >
        <app-button
          class="mr-4"
          color="primary"
          outline
          ><IconSave class="mr-2" /> Lưu nháp</app-button
        > -->
        <app-button class="create-action__btn mr-4" @click="handleNextStep"
          ><Forward class="mr-2" /> Lưu & Tiếp tục</app-button
        >
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
import IconPlus2 from "~/assets/svg/icons/plus2.svg?inline";
import IconDelete from "~/assets/svg/v2-icons/delete_sweep_2.svg?inline";
import IconSave from "~/assets/svg/v2-icons/save_24px.svg?inline";
import Forward from "~/assets/svg/v2-icons/forward_2.svg?inline";

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
    IconPlus2,
    IconAngleDown,
    IconDelete,
    IconDelete,
    Forward,
    IconSave,
  },

  data() {
    return {
      isShowButtonCreate: true,
      isShowFormAdd: false,
      category: "EXERCISE",
    };
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
      lesson: "lesson",
      lessons: "lessons",
    }),
  },

  mounted() {
    this.$store.dispatch("elearning/create/getLessons");
  },

  updated() {
    console.log(this.lesson, this.lessons);
  },

  methods: {
    handleShowFormAdd() {
      this.isShowButtonCreate = false;
      this.isShowFormAdd = true;
    },

    handleCancelAddCreate() {
      this.isShowButtonCreate = true;
      this.isShowFormAdd = false;
    },

    handleNextStep() {
      this.$emit("nextStep", "exam");
    },

    get,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-exercise.scss";
</style>
