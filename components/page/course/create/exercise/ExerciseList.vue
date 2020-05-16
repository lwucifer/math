<template>
  <div class="cc-panel__body">
    <div class="cc-box">
      <div class="cc-box__head">
        <div class="cc-box__head-left">
          <EditExerciseName
            :exercise="get(this, 'exercise', {})"
            :index="index"
          />
        </div>

        <div class="cc-box__head-right">
          <button
            @click.prevent="toggleFormAdd"
            class="text-primary d-flex align-items-center"
          >
            <IconPlus2 class="mr-3 fill-primary font-weight-semi-bold" /> Thêm câu hỏi
          </button>
          <button
            class="cc-box__btn cc-box__btn-collapse"
            @click="isShowExercise = !isShowExercise"
          >
            <IconAngleDown  width="20px" height="20px" class="icon" v-if="!isShowExercise" />
            <IconAngleUp  width="20px" height="20px" class="icon" v-else />
          </button>
        </div>
      </div>

      <div
        class="cc-box__body"
        :class="{ 'add-background': isAddQuestionForm }"
      >
        <CreateQuestionChoice
          v-if="isAddQuestionForm && get(exercise, 'type', '') === 'CHOICE'"
          :exercise="exercise"
          @cancel="toggleFormAdd"
        />
        <CreateQuestionEssay
          v-if="isAddQuestionForm && get(exercise, 'type', '') === 'ESSAY'"
          :exercise="exercise"
          @cancel="toggleFormAdd"
        />
        <fragment v-if="isShowExercise">
          <ListQuestion
            v-for="(question, index) in get(exercise, 'questions', [])"
            :key="question.id"
            :index="index"
            :question="question"
            :exercise="exercise"
          />
        </fragment>
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

import { get } from "lodash";
import CreateQuestionEssay from "~/components/page/course/create/exercise/CreateQuestionEssay";
import CreateQuestionChoice from "~/components/page/course/create/exercise/CreateQuestionChoice";
import ListQuestion from "~/components/page/course/create/exercise/ListQuestion";
import EditExerciseName from "~/components/page/course/create/exercise/EditExerciseName";
import IconAngleUp from "~/assets/svg/design-icons/angle-up.svg?inline";
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
    CreateQuestionEssay,
    CreateQuestionChoice,
    ListQuestion,
    EditExerciseName,
    IconAngleUp,
    IconPlus2,
  },

  props: {
    exercise: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: 0,
    },
    lesson: Object,
  },

  data() {
    return {
      isAddQuestionForm: false,
      isShowExercise: true,
    };
  },

  methods: {
    toggleFormAdd() {
      this.isAddQuestionForm = !this.isAddQuestionForm;
    },
    get,
  },
};
</script>

<style lang="scss">
.add-background {
  background: #f9f9f9;
}
</style>
