<template>
  <div class="cc-panel__body">
    <app-vue-select
      class="cc-select"
      id="require"
      :options="lessons"
      placeholder="Chọn bài học"
      label="name"
      size="md"
      style="width: 100%"
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

export default {
  components: {
    IconAngleDown
  },

  props: {
    lessons: {
      type: Array,
      default: []
    }
  },

  methods: {
    handleSelectLesson(lesson) {
      this.$emit("handleSelectLesson", lesson);
    }
  }
};
</script>
