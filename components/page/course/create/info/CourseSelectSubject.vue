<template>
  <div class="col-md-4 ml-5">
    <div
      class="cgi-form-group mb-4 d-flex justify-content-between align-items-center"
    >
      <h2 class="cgi-form-title heading-6">Môn học</h2>
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

  mounted() {
    this.$store.dispatch(
      `elearning/public/public-subject/${actionTypes.ELEARNING.SUBJECT}`
    );
    useEffect(this, this.handleChangeSubjects.bind(this), [
      "subjects",
      "defaultValue",
    ]);
  },

  props: {
    defaultValue: "",
  },

  data() {
    return {
      subject: null,
    };
  },

  computed: {
    ...mapState("elearning/public/public-subject", {
      subjects: "subjects",
    }),
  },

  methods: {
    handleChangeSubjects() {
      const subject = this.subjects.filter(
        (subject) => subject.id == this.defaultValue
      )[0];
      if (subject) this.subject = subject;
    },
    get,
    handleChangeSubject(subject) {
      this.$emit("handleChangeSubject", subject);
    },
  },
};
</script>
