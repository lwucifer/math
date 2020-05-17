<template>
  <div class="">
    <app-select
      class="cc-select"
      id="require"
      :options="lessonsOpt"
      placeholder="Chọn bài học"
      label="name"
      size="md"
      style="width: 100%; height: 40px"
      @change="handleSelectLesson"
      :defaultValue="defaultValue"
    >
      <template slot="placeholder-icon">
        <IconAngleDown class="icon" />
      </template>
    </app-select>
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
    defaultValue: {
      type: [Number, String],
      default: null
    }
  },

  computed: {
    lessonsOpt() {
      return this.lessons.map(item => ({
          ...item,
          value: item.id,
          text: item.name
      }))
    }
  },

  methods: {
    handleSelectLesson(lesson) {
      this.$store.dispatch("elearning/create/getLesson", lesson);
    },
  },
};
</script>
