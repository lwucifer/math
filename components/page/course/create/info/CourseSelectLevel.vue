<template>
  <div class="col-md-3">
    <div
      class="cgi-form-group mb-4 d-flex justify-content-between align-items-center"
    >
      <h2 class="cgi-form-title heading-6">Trình độ</h2>
      <app-vue-select
        class="cc-select"
        :options="levels"
        placeholder="Chọn lớp"
        @input="handleChangeLevel"
        label="name"
        :value="level"
      >
        <template slot="placeholder-icon">
          <IconAngleDown class="icon" />
        </template>
      </app-vue-select>
    </div>
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import { useEffect } from "~/utils/common";

export default {
  components: {
    IconAngleDown,
  },

  props: {
    defaultValue: {
      default: "",
    },
  },

  data() {
    return {
      level: null,
    };
  },

  mounted() {
    this.$store.dispatch(
      `elearning/public/public-levels/${actionTypes.ELEARNING.LEVEL}`
    );
    useEffect(this, this.handleChangeLevels.bind(this), [
      "defaultValue",
      "levels",
    ]);
  },

  computed: {
    ...mapState("elearning/public/public-levels", {
      levels: "levels",
    }),
  },

  methods: {
    get,
    handleChangeLevel(level) {
      this.$emit("handleChangeLevel", level);
    },
    handleChangeLevels() {
      this.level = this.levels.filter(
        (level) => level.id == this.defaultValue
      )[0];
    },
  },
};
</script>
