<template>
  <li class="e-exercise-list-questions__item">
    <h5
      class="e-exercise-list-questions__question"
      v-html="question.content"
    ></h5>

    <div
      v-if="question.type === EXERCISE_TYPES.ESSAY"
      class="e-exercise-list-questions__answer e-exercise-list-questions__answer--essay"
    >
      <a
        href
        class="e-exercise-list-questions__toggle-answer"
        :class="{ expand: expand }"
        @click.prevent="toggleExpand"
      >
        <template v-if="expand">Thu gọn</template>
        <template v-else>Xem đáp án</template>
        <IconAngleDown class="icon" />
      </a>

      <div
        v-if="expand"
        class="e-exercise-list-questions__answer-content"
        v-html="question.correct_answer ? question.correct_answer.content : ''"
      ></div>
    </div>

    <div
      v-if="question.type === EXERCISE_TYPES.CHOICE"
      class="e-exercise-list-questions__answer e-exercise-list-questions__answer--choice"
    >
      <a
        href
        class="e-exercise-list-questions__toggle-answer"
        :class="{ expand: expand }"
        @click.prevent="toggleExpand"
      >
        <template v-if="expand">Thu gọn</template>
        <template v-else>Xem đáp án</template>
        <IconAngleDown class="icon" />
      </a>
      <span v-if="expand">
        <!-- IF USER'S ANSWER IS TRUE -->
        <span
          class="d-inline-flex align-items-center text-primary"
          v-if="question.isUserTrue"
        >
          Câu trả lời: A. Câu trả lời số 1
          <IconCheck class="icon fill-opacity-1 heading-3 ml-2" />
        </span>
        <!-- IF USER'S ANSWER IS TRUE -->

        <!-- IF USER'S ANSWER IS FALSE -->
        <span v-else>
          <span class="d-inline-flex align-items-center text-secondary">
            Câu trả lời:
            {{ question.student_answer ? question.student_answer.index : "" }}.
            {{ question.student_answer ? question.student_answer.content : "" }}
            <IconCancel class="icon fill-opacity-1 heading-3 ml-2" />
          </span>

          <span class="d-inline-flex align-items-center text-primary ml-4">
            Đáp án đúng:
            {{ question.correct_answer ? question.correct_answer.index : "" }}.
            {{ question.correct_answer ? question.correct_answer.content : "" }}
          </span>
        </span>
        <!-- IF USER'S ANSWER IS FALSE -->
      </span>
    </div>
  </li>
</template>

<script>
import { EXERCISE_TYPES } from "~/utils/constants";
const IconAngleDown = () =>
  import("~/assets/svg/design-icons/angle-down.svg?inline");
const IconCheck = () => import("~/assets/svg/v2-icons/check_24px.svg?inline");
const IconCancel = () => import("~/assets/svg/v2-icons/cancel_24px.svg?inline");

export default {
  components: {
    IconAngleDown,
    IconCheck,
    IconCancel
  },

  props: {
    question: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      EXERCISE_TYPES: Object.freeze(EXERCISE_TYPES),
      expand: false
    };
  },

  methods: {
    toggleExpand() {
      this.expand = !this.expand;
    }
  }
};
</script>
