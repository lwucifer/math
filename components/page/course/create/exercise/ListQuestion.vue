<template>
  <div class="ce-question-item d-flex align-items-center">
    <h3 class="body-2 mr-4" v-html="get(question, 'content', '')"></h3>
    <span class="text-sub mr-4">{{ type }}</span>

    <div class="d-flex align-items-center ml-auto ce-question-item__actions">
      <button class="mr-4">
        <IconEditAlt class="icon d-block subheading fill-primary" />
      </button>

      <button class="mr-4">
        <IconTrashAlt class="icon d-block subheading fill-secondary" />
      </button>

      <!-- <button>
        <IconAlignCenterAlt class="icon d-block subheading fill-gray" />
      </button> -->
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

export default {
  components: {
    IconInfoCircle,
    IconAngleDown,
    IconEditAlt,
    IconTrashAlt,
    IconAlignCenterAlt,
    IconFileCheck,
    IconClipboardNotes
  },

  props: {
    question: {
      type: Object,
      default: null
    }
  },

  computed: {
    type() {
      return get(this, 'question.type', '') === 'CHOICE' ? 'Câu hỏi trắc nghiệm' : 'Câu hỏi tự luận'
    }
  },

  methods: {
    get
  }
};
</script>
