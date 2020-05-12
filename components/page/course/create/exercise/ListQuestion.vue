<template>
  <div>
    <div
      class="ce-question-item d-flex align-items-center"
      v-if="!isShowEditQuestion"
    >
      <h3 class="body-2 mr-1">Câu {{ index + 1 }}:</h3>
      <p class="body-2 mr-4" v-html="get(question, 'content', '')"></p>
      <span class="text-sub mr-4">{{ type }}</span>

      <div class="d-flex align-items-center ml-auto ce-question-item__actions">
        <button class="mr-4" @click="isShowEditQuestion = !isShowEditQuestion">
          <IconEditAlt class="icon d-block subheading fill-primary" />
        </button>

        <button class="mr-4" @click="handleDeleteQuestion">
          <IconTrashAlt class="d-block subheading fill-secondary" width="20px" height="20px" />
        </button>

        <!-- <button>
        <IconAlignCenterAlt class="icon d-block subheading fill-gray" />
      </button> -->
      </div>
      <app-modal-confirm
        v-if="showModalConfirm"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      />
    </div>
    <div v-else>
      <EditQuestionChoice
        v-if="get(question, 'type', '') === 'CHOICE'"
        @handleCancelAddQuestion="handleCancelAddQuestion"
        @handleRefreshQuestion="handleRefreshQuestion"
        :question="question"
        :exercise="exercise"
      />
      <EditQuestionEssay
        v-else
        @handleCancelAddQuestion="handleCancelAddQuestion"
        @handleRefreshQuestion="handleRefreshQuestion"
        :question="question"
        :exercise="exercise"
      />
    </div>
  </div>
</template>

<script>
import IconInfoCircle from "~/assets/svg/design-icons/info-circle.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconEditAlt from "~/assets/svg/v2-icons/edit.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconAlignCenterAlt from "~/assets/svg/design-icons/align-center-alt.svg?inline";
import IconFileCheck from "~/assets/svg/design-icons/file-check.svg?inline";
import IconClipboardNotes from "~/assets/svg/design-icons/clipboard-notes.svg?inline";
import { get } from "lodash";
import CreateQuestionEssay from "~/components/page/course/create/exercise/CreateQuestionEssay";
import EditQuestionChoice from "~/components/page/course/create/exercise/EditQuestionChoice";
import EditQuestionEssay from "~/components/page/course/create/exercise/EditQuestionEssay";
import * as actionTypes from "~/utils/action-types";

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
    EditQuestionChoice,
    EditQuestionEssay,
  },

  props: {
    question: {
      type: Object,
      default: null,
    },
    exercise: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      isShowEditQuestion: false,
      showModalConfirm: false,
      confirmLoading: false,
    };
  },

  computed: {
    type() {
      return get(this, "question.type", "") === "CHOICE"
        ? "Câu hỏi trắc nghiệm"
        : "Câu hỏi tự luận";
    },
  },

  methods: {
    handleDeleteQuestion() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;
      const payload = {
        data: {
          id: get(this, "question.id", ""),
        },
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-question/${actionTypes.ELEARNING_CREATING_QUESTIONS.DELETE}`,
        payload
      );
      this.handleCancel();
      if (get(res, "success", false)) {
        this.$toasted.success("success");
        this.$emit("handleRefreshQuestion");
        return;
      }
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },

    handleCancel() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    handleCancelAddQuestion() {
      this.isShowEditQuestion = false;
    },

    handleRefreshQuestion() {
      this.isShowEditQuestion = false;
      this.$emit("handleRefreshQuestion");
    },

    get,
  },
};
</script>
