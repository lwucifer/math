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
      v-if="isFailed"
      @submit="handleMark"
    />
  
    <!--Table-->
    <result-table-section
      class="py-3"
      :list.sync="submissionContent"
    />
  
    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="confirmMark"
      @cancel="cancelMark"
    >
    </app-modal-confirm>
  </div>
</template>

<script>
  import MarkSection from "~/components/page/elearning/manager/exam/Mark"
  import MarkFormSection from "~/components/page/elearning/manager/exam/forms/ChoiceMark"
  import ResultTableSection from "~/components/page/elearning/manager/exam/tables/ChoiceResult"
  import {mapState} from "vuex"
  import { subResult2Txt } from "~/plugins/filters"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"
  import { SUBMISSION_RESULTS } from "~/utils/constants"
  import { getParamQuery } from "~/utils/common"
  import { createPayloadAddEvaluation } from "~/models/elearning/Evaluation"

  const STORE_NAMESPACE = 'elearning/teaching/evaluation'

  export default {
    layout: "exercise",
    
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
        showModalConfirm: false,
        confirmLoading: false,
        payload: {
          exercise_id: this.$route.params.id,
          user_id: this.getParamQuery('user_id')
        }
      };
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      isPass: function() {
        return get(this, 'detail.result', false) &&
          (get(this, 'detail.result', SUBMISSION_RESULTS.FAILED) == SUBMISSION_RESULTS.PASSED)
      },
      isPending: function() {
        return get(this, 'detail.result', false) &&
          (get(this, 'detail.result', SUBMISSION_RESULTS.FAILED) == SUBMISSION_RESULTS.PENDING)
      },
      isFailed: function() {
        return get(this, 'detail.result') == SUBMISSION_RESULTS.FAILED
      },
      hasMark: function() {
        return get(this, 'detail.result', false) &&
          (get(this, 'detail.result', '') != SUBMISSION_RESULTS.PENDING)
      },
      result: function() {
        if (
          get(this, 'detail.result', false) &&
          get(this, 'detail.result') == SUBMISSION_RESULTS.PENDING
        ) {
          return subResult2Txt(SUBMISSION_RESULTS.PENDING)
        } else {
          if (this.isPass) {
            return `${get(this, 'detail.mark', 0)}/${get(this, 'detail.points', 0)} (${subResult2Txt(SUBMISSION_RESULTS.PASSED)})`
          } else {
            return `${get(this, 'detail.mark', 0)}/${get(this, 'detail.points', 0)} (${subResult2Txt(SUBMISSION_RESULTS.FAILED)})`
          }
        }
      },
      submissionContent: function() {
        return get(this, 'detail.question_list', [])
      }
    },

    methods: {
      handleMark(content) {
        this.payload = { ...this.payload, ...content }
        this.showModalConfirm = true
      },
      async confirmMark() {
        this.confirmLoading = true
        await this.mark()
        this.confirmLoading = false
        this.showModalConfirm = false
      },
      cancelMark() {
        this.showModalConfirm = false
      },
      async mark() {
        const payload = createPayloadAddEvaluation(this.payload)
        const res = await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_EVALUATION.ADD}`,
          payload
        )
        if (get(res, "success", false)) {
          this.$emit("refreshSubmission")
          this.$toasted.success(
            get(res, "message", "")
          );
          return
        }
        this.$toasted.error(
          get(res, "message", "")
        );
      },
      get,
      getParamQuery
    },

    created() {
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-result.scss";
  @import "~/assets/scss/components/elearning/_elearning-objective-test-table.scss";
</style>
