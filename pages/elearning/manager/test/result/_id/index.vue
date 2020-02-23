<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3" />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <h5 class="color-primary mb-3">Bài tập và bài kiểm tra</h5>
            <div class="elearning-manager-content__title__breadcrumb">
              <n-link to >Bài tập</n-link> <i> > </i>
              <n-link to >Bài tập đại số lớp 10 (Bài giảng đại số lớp 10)</n-link> <i> > </i>
              <n-link to ><b>Trần Văn Nam</b></n-link>
            </div>
            <hr class />
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
    import { mapState } from "vuex"
    import * as actionTypes from "~/utils/action-types"
    const ObjectiveTest = () => import('../objective-test')
    const WritingTest = () => import('../writing-test')
    // Import faked data
    import { EXERCISE_DETAIL } from "~/server/fakedata/elearning/test"

    export default {

        components: {
            ElearningManagerSide,
            ObjectiveTest,
            WritingTest,
        },

        data() {
            return {
                result: {},
            }
        },
        computed: {
            ...mapState("auth", ["loggedUser"]),
            currentComponent: function () { // either Objective Test or Writing Test
                const MATCHED_COMPONENTS = {
                    "objective": "ObjectiveTest",
                    "writing": "WritingTest",
                }
                let currentComponent

                if (typeof (MATCHED_COMPONENTS[this.result.type]) !== "undefined") {
                    currentComponent = this.result.type
                } else {
                    currentComponent = "objectiveTest"
                }
                return MATCHED_COMPONENTS[currentComponent]
            }
        },

        methods: {

        },

        created() {
            const resultId = this.$route.params.id
            //Get faked data
            const currentResult = EXERCISE_DETAIL.find(o => o.id == resultId)
            this.result = Object.assign({}, currentResult)
        }
    };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>