<template>
  <div class="elearning-manager-result">
    <mark-section
      title="Kết quả bài làm"
      :is-pass="isPass"
      :result="result"
      :started-at="get(this, 'detail.start_time', '')"
      :finished-at="get(this, 'detail.timestamp', '')"
      :duration="get(this, 'detail.duration', 0)"
      :question-num="get(this, 'detail.questions', 0)"
      :correct-ans="get(this, 'detail.corrects', 0)"
      :has-mark="hasMark"
    />
    <!--Form-->
    <mark-form-section
      @submit="mark"
    />

    <!--Table-->
    <result-table-section
      class="py-3"
      :list.sync="list"
    />
  </div>
</template>

<script>
  import MarkSection from "~/components/page/elearning/manager/exam/Mark"
  import MarkFormSection from "~/components/page/elearning/manager/exam/forms/ChoiceMark"
  import ResultTableSection from "~/components/page/elearning/manager/exam/tables/ChoiceResult"
  import {mapState} from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"
  import { SUBMISSION_RESULTS, SCALE_MARK } from "~/utils/constants"

  const STORE_NAMESPACE = 'elearning/teaching/evaluation'

  export default {

    components: {
      MarkSection,
      MarkFormSection,
      ResultTableSection
    },
    props: {
      detail: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        list: get(this, 'detail.contents', []),
      };
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      isPass: function() {
        return get(this, 'detail.result', -1) == SUBMISSION_RESULTS.PASS
      },
      hasMark: function() {
        return (get(this, 'detail.result', -1) != SUBMISSION_RESULTS.NO_SCORE)
      },
      result: function() {
        if (get(this, 'detail.result') == SUBMISSION_RESULTS.NO_SCORE) {
          return 'Chưa chấm điểm'
        } else {
          if (this.isPass) {
            return `${get(this, 'detail.mark', 0)}/${SCALE_MARK} (Đạt)`
          } else {
            return `${get(this, 'detail.mark', 0)}/${SCALE_MARK} (Không đạt)`
          }
        }
      }
    },

    methods: {
      async mark(content) {
        // const payload = { ...createPayloadMarkSubmission(content), ...{ submission_id: this.detail.id } }
        // const res = await this.$store.dispatch(
        //   `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_SUBMISSION.MARK}`, payload
        // )
        // if (get(res, "success", false)) {
        //   this.$emit("refreshSubmission")
        //   this.$toasted.success(
        //     get(res, "message", "")
        //   );
        //   return
        // }
        // this.$toasted.error(
        //   get(res, "message", "")
        // );
      },
      get
    },

    created() {
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-result.scss";
  @import "~/assets/scss/components/elearning/_elearning-objective-test-table.scss";
</style>
