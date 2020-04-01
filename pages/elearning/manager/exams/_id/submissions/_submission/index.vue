<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3"/>
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <header-breadcrumb
              title="Bài tập và bài kiểm tra"
              :breadcrumb="breadcrumb"
            />
          </div>

          <div class="elearning-manager-content__main">
            <component :is="currentComponent"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
  import HeaderBreadcrumb from "~/components/page/elearning/manager/exam/Breadcrumb"
  import { mapState } from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"
  import { EXERCISE_TYPES } from "~/utils/constants"

  const ChoiceSubmission = () => import('../choice')
  const EssaySubmission = () => import('../essay')

  const STORE_NAMESPACE = "elearning/teaching/submission"
  const EXERCISE_STORE_NAMESPACE = "elearning/teaching/exercise"

  export default {
    layout: "exercise",
    components: {
      ElearningManagerSide,
      HeaderBreadcrumb,
      ChoiceSubmission,
      EssaySubmission,
    },

    data() {
      return {
        item: {},
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      ...mapState(EXERCISE_STORE_NAMESPACE, {
        exercise: 'currentExercise'
      }),
      ...mapState(STORE_NAMESPACE, {
        submission: 'currentSubmission'
      }),
      currentComponent: function () { // either Objective Test or Writing Test
        const MATCHED_COMPONENTS = {
          [EXERCISE_TYPES.CHOICE]: "ChoiceSubmission",
          [EXERCISE_TYPES.ESSAY]: "EssaySubmission",
        }
        // let currentComponent

        // if (typeof (MATCHED_COMPONENTS[this.detail.type]) !== "undefined") {
        //     currentComponent = this.detail.type
        // } else {
        //     currentComponent = "objectiveTest"
        // }
        return MATCHED_COMPONENTS['CHOICE']
      },
      breadcrumb: function() {
        let data = [
          {
            text: 'Bài tập',
            link: '/elearning/manager/exams'
          },
          {
            text: get(this, 'exercise.title', ''),
            link: `/elearning/manager/exams/${this.exercise.id}/submissions`
          },
          {
            text: get(this, 'submission.student', ''),
            link: '/elearning/manager/exams'
          }
        ]
        return data
      }
    },

    methods: {
      async getDetail() {
        const submissionId = this.$route.params.submission
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_SUBMISSION.DETAIL}`, submissionId
        )
      },
      async getExerciseDetail() {
        const exerciseId = this.$route.params.id
        if (_.isEmpty(this.exercise) || get(this, 'exercise.id') != exerciseId) {
          await this.$store.dispatch(
            `${EXERCISE_STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_EXERCISE.DETAIL}`, exerciseId
          )
        }
      },
      refreshData() {
        this.getDetail()
        this.getExerciseDetail()
      }
    },

    created() {
      this.refreshData()
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>