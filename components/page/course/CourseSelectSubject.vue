<template>
  <app-vue-select
    class="cc-select"
    :options="subjects"
    placeholder="Chọn môn học"
    @input="handleChangeSubject"
    label="name"
    v-model="subject"
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
import { useEffect } from "~/utils/common";

export default {
  components: {
    IconAngleDown
  },

  created() {
    useEffect(this, this.handleChangeSubjects.bind(this), [
      "subjects",
      "defaultValue"
    ]);
    this.$store.dispatch(
      `elearning/public/public-subject/${actionTypes.ELEARNING.SUBJECT}`
    );
  },

  props: {
    defaultValue: ""
  },

  data() {
    return {
      subject: null
    };
  },

  computed: {
    ...mapState("elearning/public/public-subject", {
      subjects: "subjects"
    })
  },

  methods: {
    handleChangeSubjects() {
      this.subject = this.subjects.filter(
        subject => subject.code == this.defaultValue
      )[0];
    },
    get,
    handleChangeSubject(subject) {
      this.$emit("handleChangeSubject", subject);
    }
  }
};
</script>
