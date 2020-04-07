<template>
  <div class="elearning-manager-result__section">
    <h4 class="content-title">{{ title }}</h4>
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
          @click="clickQuestion({row, index})"
        >
          
          
          <v-popover
            class="tooltip--question"
            :open="index == currentQuestionIndex"
            offset="10"
          >
            <div class="">
              <span>{{ index + 1 }}</span>
            </div>
            
            <template slot="popover">
              <span v-close-popover class="icon-close" title="Đóng">
                <IconClose/>
              </span>
              <!--<div class="question-detail" v-if="index == currentQuestionIndex">-->
              <app-spin v-if="loadingQuestion"></app-spin>
              <choice-question-detail
                v-else-if="selectedQuestion"
                :name="selectedQuestion.name"
                :content="selectedQuestion.content"
                :options="[{ title: 'abc', content: 'options 1' }]"
              />
            </template>
          
          </v-popover>
        
        
        </td>
      </template>
    </app-table><!--End table-->
  </div>
</template>

<script>
  import IconClose from "~/assets/svg/icons/close2.svg?inline"
  import ChoiceQuestionDetail from "~/components/page/elearning/manager/exam/ChoiceQuestionDetail"
  
  import {get} from "lodash"
  
  export default {
    components: {
      IconClose,
      ChoiceQuestionDetail
    },
    
    props: {
      title: {
        type: String,
        default: 'Chi tiết kết quả'
      },
      list: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    
    filters: {},
    
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
        currentQuestionIndex: null,
        loadingQuestion: false,
        selectedQuestion: null
      }
    },
    
    computed: {
      updating: function () {
        return this.loading
      },
    },
    methods: {
      clickQuestion({row, index}) {
        console.log('click row: ', row, index)
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