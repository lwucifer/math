<template>
  <student-list />
</template>

<script>
import StudentList from "./student";
import * as actionTypes from "~/utils/action-types";
const STORE_NAMESPACE = "elearning/teaching/elearning-participant";
const STORE_SCHOOL_CLASSES = "elearning/school/school-classes";
const STORE_TEACHING_REQUEST = "elearning/teaching/request";

export default {
  layout: "manage",

  components: {
    StudentList
  },
  async fetch({ params, query, store, route }) {
    const elearningId = query.elearning_id;
    const listQuery = {
      params: {
        elearning_id: elearningId
      }
    };
    await Promise.all([
      store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNING_PARTICIPANT.LIST}`,
        listQuery
      ),
      store.dispatch(
        `${STORE_SCHOOL_CLASSES}/${actionTypes.SCHOOL_CLASSES.LIST}`
      ),
      store.dispatch(
        `${STORE_TEACHING_REQUEST}/${actionTypes.TEACHING_ELEARNING_REQUESTS.LIST}`,
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