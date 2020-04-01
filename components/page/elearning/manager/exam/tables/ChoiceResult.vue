<template>
  <div>
    <app-table
      class="table--objective-test"
      :heads="heads"
      :data="list"
      :need-pagination="false"
    >
      <template v-slot:cell(num)="{row, index}">
        <td
          class="table--question-test__question-index"
          title="Chi tiết"
          @click.self="clickQuestion({row, index})"
        >
          <span>{{ index + 1 }}</span>
          <div class="question-detail" v-if="index == currentQuestionIndex">
            <div class="text-right">
                <span
                  class="icon-close"
                  @click.stop="closeDetail"
                  title="Đóng"
                >
                  <IconClose />
                </span>
            </div>
            <div class="question" v-html="get(row, 'question_name', '')"></div>
            <div class="options">
              <p>Đáp án</p>
              <div class="options__detail">
                <!--<div>-->
                  <!--<span>A</span>: <p class="answer-wrapper" v-html="row.options[0]"></p>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<span>B</span>: <p class="answer-wrapper" v-html="row.options[1]"></p>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<span>C</span>: <p class="answer-wrapper" v-html="row.options[2]"></p>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<span>D</span>: <p class="answer-wrapper" v-html="row.options[3]"></p>-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </td>
      </template>
    </app-table><!--End table-->
  </div>
</template>

<script>
  import IconClose from "~/assets/svg/icons/close2.svg?inline"

  import { get } from "lodash"

  export default {
    components: {
      IconClose
    },

    props: {
      list: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      }
    },

    filters: {

    },

    data() {
      return {
        heads: [
          {
            name: "num",
            text: "Câu hỏi",
          },
          {
            name: "student_answer",
            text: "Đáp án học sinh",
          },
          {
            name: "correct_answer",
            text: "Đáp án đúng",
          },
        ],
        currentQuestionIndex: null
      }
    },

    computed: {
      updating: function () {
        return this.loading
      }
    },
    methods: {
      clickQuestion({ row, index }) {
        this.currentQuestionIndex = index
      },
      closeDetail() {
        this.currentQuestionIndex = null
      },
      get
    },
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/material/_elearning-filtertable.scss";
</style>