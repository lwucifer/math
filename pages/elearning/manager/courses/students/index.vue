<template>
  <student-list />
</template>

<script>
import StudentList from "./student";
import * as actionTypes from "~/utils/action-types";
const STORE_NAMESPACE = "elearning/teaching/elearning-participant";

export default {
  layout: "manage",

  components: {
    StudentList
  },
  async fetch({ params, query, store, route }) {
    const elearningId = query.exercise_id;
    const listQuery = {
      params: {
        elearning_id:
          // "366158fc-0034-4da7-b2cd-f2ce3604e8c9"
          elearningId
      }
    };
    await Promise.all([
      store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNING_PARTICIPANT.LIST}`,
        listQuery
      )
    ]);
  },

  data() {
    return {};
  },
  computed: {},

  methods: {}
};
</script>

<style lang="scss" scoped>
</style>