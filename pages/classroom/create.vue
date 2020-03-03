<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <create-aside
          :active="actived"
          @selectMenu="changeContent"
        />
      </div>
      <div class="col-md-9">
        <div class="manager-content">
          <create-classroom v-if="actived == 'classroom'"></create-classroom>
          <create-exercise v-if="actived == 'exercise'"></create-exercise>
          <create-exam v-if="actived == 'exam'"></create-exam>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CreateAside from "~/components/page/classroom/create/CreateAside"
  import CreateClassroom from "~/components/page/classroom/create/CreateClassroom"
  import CreateExercise from "~/components/page/classroom/create/CreateExercise"
  import CreateExam from "~/components/page/classroom/create/CreateExam"

  import {mapState} from "vuex";
  import * as actionTypes from "~/utils/action-types";

  export default {
    layout: 'create',
    components: {
      CreateAside,
      CreateClassroom,
      CreateExercise,
      CreateExam
    },

    data() {
      return {
        actived: 'classroom'
      }
    },
    computed: {

    },

    methods: {
      changeContent(data) {
        this.actived = data
      }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/classroom/_classroom-create.scss";
</style>