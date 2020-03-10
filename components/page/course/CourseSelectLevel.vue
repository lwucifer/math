<template>
  <app-vue-select
    class="cc-select"
    :options="levels"
    placeholder="Chọn lớp"
    @input="handleChangeLevel"
    label="name"
  >
    <template slot="placeholder-icon">
      <IconAngleDown class="icon" />
    </template>
  </app-vue-select>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";

export default {
  components: {
    IconAngleDown
  },

  created() {
    this.$store.dispatch(
      `elearning/public/public-levels/${actionTypes.ELEARNING.LEVEL}`
    );
  },

  computed: {
    ...mapState("elearning/public/public-levels", {
      levels: "levels"
    })
  },

  methods: {
    get,
    handleChangeLevel(level) {
      this.$emit("handleChangeLevel", level);
    }
  }
};
</script>
