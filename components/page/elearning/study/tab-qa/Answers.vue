<template>
  <div>
    <a
      v-if="get(question, 'interactive_answers.length', 0) >= 5"
      class="e-study-tab-qa__more e-study-tab-qa__more--child"
      >Xem thêm bình luận</a
    >
    <div
      v-for="(interactive_answer, index) in get(
        question,
        'interactive_answers',
        []
      )"
      :key="index"
    >
      <TabQACommentItem :level="2" :question="interactive_answer" />
    </div>
  </div>
</template>

<script>
import TabQACommentItem from "~/components/page/elearning/study/tab-qa/TabQACommentItem.vue";
import { get } from "lodash";

export default {
  components: {
    TabQACommentItem,
  },

  props: {
    question: {},
  },

  methods: {
    get,
  },
};
</script>
