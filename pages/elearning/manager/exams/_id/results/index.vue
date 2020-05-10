<template>
  <div class="container">
    <!--<breadcrumb />-->
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3"/>
      </div>
      <div class="col-md-9">
        <sub-block-section
          title="Kết quả làm bài"
          has-icon
        >
          <template v-slot:content>
            <div class="elearning-manager-content p-0">
              <div class="elearning-manager-content__main py-2">
                <component
                  :is="currentComponent"
                  :detail="result"
                  @refreshSubmission="refreshData"
                >
                </component>
              </div>
            </div>
          </template>
        </sub-block-section>
      </div>
    </div>
  </div>
</template>

<script>
  import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
  import HeaderBreadcrumb from "~/components/page/elearning/HeadBreadcrumb"
  import { mapState } from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import { get, isEmpty } from "lodash"
  import { EXERCISE_TYPES } from "~/utils/constants"
  import { getParamQuery } from "~/utils/common"
  import { exCate2Txt } from "~/plugins/filters"

  const ChoiceSubmission = () => import('./choice')
  const EssaySubmission = () => import('./essay')
  
  const STORE_NAMESPACE = "elearning/teaching/result"
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
        result: 'currentResult'
      }),
      currentComponent: function () { // either Objective Test or Writing Test
        const MATCHED_COMPONENTS = {
          [EXERCISE_TYPES.CHOICE]: "ChoiceSubmission",
          [EXERCISE_TYPES.ESSAY]: "EssaySubmission",
        }
        
        return MATCHED_COMPONENTS[get(this, 'result.type')]
      },
      breadcrumb: function() {
        let data = [
          {
            text: exCate2Txt(this.get(this.exercise, 'category', '')),
            link: '/elearning/manager/exams'
          },
          {
            text: get(this, 'exercise.title', ''),
            link: `/elearning/manager/exams/${this.exercise.id}/participant`
          },
          {
            text: get(this, 'result.name', ''),
            link: '/elearning/manager/exams'
          }
        ]
        return data
      }
    },
    
    methods: {
      async getDetail() {
        const exerciseId = this.$route.params.id
        const studentId = getParamQuery('student_id')
        const userId = getParamQuery('user_id')
        const params = {
          exercise_id: exerciseId,
          student_id: studentId,
          user_id: userId
        }
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_RESULT.DETAIL}`,
          { params }
        )
      },
      async getExerciseDetail() {
        const exerciseId = this.$route.params.id
        if (isEmpty(this.exercise) || get(this, 'exercise.id') != exerciseId) {
          await this.$store.dispatch(
            `${EXERCISE_STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_EXERCISE.DETAIL}`, exerciseId
          )
        }
      },
      refreshData() {
        this.getDetail()
        // this.getExerciseDetail()
      },
      get
    },
    
    created() {
      this.refreshData()
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>