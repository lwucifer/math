<template>
  <div class="elearning-manager-result__section">
    <h5 class="font-weight-bold text-primary mb-3">{{ title }}</h5>
    <app-table
      class="table--objective-test"
      :heads="heads"
      :data="list"
      :need-pagination="false"
    >
      <template v-slot:cell(question)="{row, index}">
        <!--<td-->
          <!--class="table&#45;&#45;question-test__question-index"-->
          <!--title="Chi tiết"-->
          <!--@click="clickQuestion({row, index})"-->
        <!--&gt;-->
        <td
          class="table--question-test__question-index"
        >
          
          <!--<v-popover-->
            <!--class="tooltip&#45;&#45;question"-->
            <!--:open="index == currentQuestionIndex"-->
            <!--offset="10"-->
          <!--&gt;-->
          <v-popover
            class="tooltip--question"
            offset="10"
            trigger="hover"
          >
            <div>
              <div v-html="get(row, 'content', '')"></div>
            </div>
            
            <template slot="popover" class="tooltip-detail">
              <div class="text-right">
                <span v-close-popover class="icon-close" title="Đóng">
                <IconClose/>
              </span>
              </div>
              <!--<div class="question-detail" v-if="index == currentQuestionIndex">-->
              <!--<div v-if="loadingQuestion" class="text-center">-->
                <!--<app-spin></app-spin>-->
              <!--</div>-->
              <choice-question-detail
                style="min-width: 41rem; max-width: 75rem;"
                :content="get(row, 'content')"
                :options="get(row, 'answers')"
              />
            </template>
          
          </v-popover>
        
        </td>
      </template>
  
      <template v-slot:cell(student_answer)="{row}">
        <td>
          {{ row | ansKey }}
        </td>
      </template>
  
      <template v-slot:cell(correct_answer)="{row}">
        <td>
          {{ row | trueAns }}
        </td>
      </template>
    </app-table><!--End table-->
  </div>
</template>

<script>
  import IconClose from "~/assets/svg/icons/close2.svg?inline"
  import ChoiceQuestionDetail from "~/components/page/elearning/manager/exam/ChoiceQuestionDetail"
  import { get } from "lodash"

  const ANS_KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

  export default {
    components: {
      IconClose,
      ChoiceQuestionDetail
    },
    filters: {
      trueAns(info) {
        const opts = info.answers
        const optsLeng = opts.length
        
        for(let i = 0; i < optsLeng; i++) {
          const tmp = opts[i]
          if (get(tmp, 'correct', false)) {
            return ANS_KEYS[i]
          }
        }
        return '-'
      },
      ansKey(info) {
        const opts = info.answers
        const optsLeng = opts.length
        const ans = get(info, 'student.answer', '')
  
        for(let i = 0; i < optsLeng; i++) {
          const tmp = opts[i]
          if (tmp.id == ans) {
            return ANS_KEYS[i]
          }
        }
        return '-'
      }
    },
    props: {
      title: {
        type: String,
        default: 'Chi tiết kết quả'
      },
      list: {
        type: Array,
        default: () => [],
        // validator: value => value.every(item => ["content", "index", "student"].every(key => key in item))
      },
      loading: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        heads: [
          {
            name: "question",
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
        currentQuestionIndex: null,
        loadingQuestion: false,
        selectedQuestion: null,
      }
    },
    
    computed: {
      updating: function () {
        return this.loading
      },
    },
    methods: {
      clickQuestion({row, index}) {
        this.currentQuestionIndex = index
        this.$nextTick(() => {
          this.loadingQuestion = true
          setTimeout(() => {
            this.selectedQuestion = {
              name: 'Tên câu hỏi',
              content: 'Nội dung câu hỏi update'
            }
            this.loadingQuestion = false
          }, 4999)
        })
      },
      closeDetail() {
        this.currentQuestionIndex = null
      },
      renderQuestionDetail() {
        setTimeout(() => {
          return 'abc'
        }, 4000)
      },
      get
    },
  }
</script>

<style lang="scss">
</style>