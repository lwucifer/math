<template>
  <app-vue-select
    class="cc-select"
    :options="subjects"
    placeholder="Chọn môn học"
    @input="handleChangeSubject"
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
      `elearning/public/public-subject/${actionTypes.ELEARNING.SUBJECT}`
    );
  },

  computed: {
    ...mapState("elearning/public/public-subject", {
      subjects: "subjects"
    })
  },

  methods: {
    get,
    handleChangeSubject(subject) {
      this.$emit("handleChangeSubject", subject);
    }
  }
};
</script>
