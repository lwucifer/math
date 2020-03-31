<template>
  <div class="cc-panel__body">
    <div class="cc-box">
      <div class="cc-box__head">
        <div class="cc-box__head-left">
          <h2 class="cc-box__title heading-6">
            {{ get(excercise, "title", "") }}
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
        <CreateQuestionChoice v-if="isAddQuestionForm" />

        <div class="ce-question-item d-flex align-items-center">
          <h3 class="body-2 mr-4">1. Đây là câu hỏi</h3>
          <span class="text-sub mr-4">Câu hỏi trắc nghiệm</span>

          <div
            class="d-flex align-items-center ml-auto ce-question-item__actions"
          >
            <button class="mr-4">
              <IconEditAlt class="icon d-block subheading fill-primary" />
            </button>

            <button class="mr-4">
              <IconTrashAlt class="icon d-block subheading fill-secondary" />
            </button>

            <button>
              <IconAlignCenterAlt class="icon d-block subheading fill-gray" />
            </button>
          </div>
        </div>
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
import CreateQuestionEssay from "~/components/page/course/create/excercise/CreateQuestionEssay";
import CreateQuestionChoice from "~/components/page/course/create/excercise/CreateQuestionChoice";

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
    CreateQuestionChoice
  },

  props: {
    excercise: {
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
    get,

    handleAddQuestion() {
      this.isAddQuestionForm = !this.isAddQuestionForm;
    }
  }
};
</script>
