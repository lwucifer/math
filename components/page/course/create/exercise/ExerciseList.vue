<template>
  <div class="cc-panel__body">
    <div class="cc-box">
      <div class="cc-box__head">
        <div class="cc-box__head-left">
          <h2 class="cc-box__title heading-6">
            {{ get(exercise, "title", "") }}
          </h2>
          <button class="cc-box__btn cc-box__btn-edit">
            <IconEditAlt class="icon" />
          </button>
        </div>

        <div class="cc-box__head-right">
          <a href @click.prevent="handleAddQuestion" class="text-secondary"
            >Thêm câu hỏi</a
          >
          <button class="cc-box__btn cc-box__btn-collapse">
            <IconAngleDown class="icon" />
          </button>
        </div>
      </div>

      <div class="cc-box__body">
        <CreateQuestionChoice
          v-if="isAddQuestionForm && get(exercise, 'type', '') === 'CHOICE'"
          :exercise="exercise"
          @handleCancelAddQuestion="handleCancelAddQuestion"
          @handleRefreshQuestion="handleRefreshQuestion"
        />
        <CreateQuestionEssay
          v-if="isAddQuestionForm && get(exercise, 'type', '') === 'ESSAY'"
          :exercise="exercise"
        />
        <ListQuestion
          v-for="question in get(exercise, 'questions', [])"
          :key="question.id"
          :question="question"
          @handleRefreshQuestion="handleRefreshQuestion"
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
import { get } from "lodash";
import CreateQuestionEssay from "~/components/page/course/create/exercise/CreateQuestionEssay";
import CreateQuestionChoice from "~/components/page/course/create/exercise/CreateQuestionChoice";
import ListQuestion from "~/components/page/course/create/exercise/ListQuestion";

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
    ListQuestion
  },

  props: {
    exercise: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      isAddQuestionForm: false
    };
  },

  methods: {
    handleRefreshQuestion() {
      this.isAddQuestionForm = false;
      this.$emit("handleRefreshQuestion");
    },

    handleCancelAddQuestion() {
      this.isAddQuestionForm = false;
    },

    get,

    handleAddQuestion() {
      this.isAddQuestionForm = !this.isAddQuestionForm;
    }
  }
};
</script>
