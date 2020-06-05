<template>
    <student-list />
</template>

<script>
import StudentList from "./student";
import { mapState } from "vuex";
import { get } from "lodash";

import * as actionTypes from "~/utils/action-types";
const STORE_NAMESPACE = "elearning/teaching/elearning-participant";
const STORE_SCHOOL_CLASSES = "elearning/school/school-classes";
const STORE_TEACHING_REQUEST = "elearning/teaching/request";
const STORE_PUBLIC_CLASSES = "elearning/teaching/public-classes";
const STORE_STUDY_INFO = "elearning/study/study-info";

export default {
  layout: "manage",

  components: {
    StudentList
  },

   async fetch({ params, query, store, route }) {
    const elearningId = query.elearning_id;
    const dataProfile = await store.dispatch(
      `${STORE_PUBLIC_CLASSES}/${actionTypes.ACCOUNT_PROFILE.LIST}`
    );
    console.log("dataProfile", dataProfile);
    const dataOrgan =
      dataProfile && dataProfile.organization ? dataProfile.organization : {};
    const schoolId = dataOrgan && dataOrgan.id ? dataOrgan.id : "";
    const listQuery = {
      params: {
        elearning_id: elearningId
      }
    };

    await Promise.all([
      store.dispatch(`elearning/detail/getInfo`,
      listQuery
    ),
      store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNING_PARTICIPANT.LIST}`,
        listQuery
      ),
      store.dispatch(
        `${STORE_SCHOOL_CLASSES}/${actionTypes.SCHOOL_CLASSES.LIST}`
      ),
      // store.dispatch(
      //   `${STORE_TEACHING_REQUEST}/${actionTypes.TEACHING_ELEARNING_REQUESTS.LIST}`,
      //   listQuery
      // ),
      store.dispatch(
        `${STORE_PUBLIC_CLASSES}/${actionTypes.PUBLIC_CLASSES.LIST}`,
        {
          params: {
            school_id: schoolId
          }
        }
      )
    ]);
  },


  data() {
    return {};
  },
  
  computed: {
  },

  methods: {get}
};
</script>

<style lang="scss" scoped>
</style>