<template>
  <div class="elearning-lesson__main-content">
    <div class="d-flex-center">
      <strong
        >{{ get(interactive_questions, "page.total_elements", 0) }} bình
        luận</strong
      >
      <!-- <div class="ml-auto d-flex">
                    <app-input class="mr-3 mb-0" size="sm">
                      <button slot="unit">
                        <IconSearch class="fill-999" height="16" width="16" />
                      </button>
                    </app-input>
                    <app-select v-model="opt" :options="opts" size="sm" />
                  </div> -->
    </div>
    <hr class="mt-4 mb-4" />
    <ElearningCourseComment
      :comments="get(interactive_questions, 'content', [])"
      @addQuestionSuccess="$emit('addQuestionSuccess')"
    />
  </div>
</template>

<script>
import ElearningCourseComment from "~/components/page/elearning/study/Comment";
import { get } from "lodash";

export default {
  components: {
    ElearningCourseComment,
  },
  props: {
    interactive_questions: {},
  },
  methods: { get },
};
</script>
