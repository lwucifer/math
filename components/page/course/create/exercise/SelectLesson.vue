<template>
  <div class="">
    <app-vue-select
      class="cc-select"
      id="require"
      :options="lessons"
      placeholder="Chọn bài học"
      label="name"
      size="md"
      style="width: 100%; height: 40px"
      @input="handleSelectLesson"
    >
      <template slot="placeholder-icon">
        <IconAngleDown class="icon" />
      </template>
    </app-vue-select>
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import { get } from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    IconAngleDown,
  },

  props: {
    lessons: {
      type: Array,
      default: [],
    },
  },

  methods: {
    handleSelectLesson(lesson) {
      this.$store.dispatch("elearning/create/getLesson", get(lesson, "id", ""));
    },
  },
};
</script>
