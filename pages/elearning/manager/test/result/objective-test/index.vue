<template>
  <div class="elearning-manager-result">
    <div class="elearning-manager-result__mark">
      <h4>Kết quả bài làm</h4>
      <div class="elearning-manager-result__mark__detail">
        <div class="item">
          <span>Trả lời đúng: </span>
          <span>10</span>
        </div>
        <div class="item">
          <span>Trả lời sai: </span>
          <span>1</span>
        </div>
        <div class="item">
          <span>Bỏ qua: </span>
          <span>10</span>
        </div>
        <div class="item">
          <span>Thời gian làm bài: </span>
          <span>20:30</span>
        </div>
        <div class="item">
          <span>Kết quả: </span>
          <span>6/10 (Đạt)</span>
        </div>
      </div>
    </div>
    <div class="py-3">
      <!--Table-->
      <app-table
        class="table--objective-test"
        :heads="heads"
        :pagination="pagination"
        @pagechange="onPageChange"
        :data="list"
      >
        <template v-slot:cell(num)="{row, index}">
          <td
            class="table--question-test__question-index"
            title="Chi tiết"
            @click.self="clickQuestion({row, index})"
          >
            <span>{{ index + 1 }}</span>
            <div class="question-detail" v-if="(currentQuestionIndex >=0) && (index == currentQuestionIndex)">
              <div class="text-right">
                <span
                  class="icon-close"
                  @click.stop="closeDetail"
                  title="Đóng"
                >
                  <IconClose />
                </span>
              </div>
              <div class="question" v-html="row.question"></div>
              <div class="options">
                <p>Đáp án</p>
                <div class="options__detail">
                  <div>
                    <span>A</span>: <p class="answer-wrapper" v-html="row.options[0]"></p>
                  </div>
                  <div>
                    <span>B</span>: <p class="answer-wrapper" v-html="row.options[1]"></p>
                  </div>
                  <div>
                    <span>C</span>: <p class="answer-wrapper" v-html="row.options[2]"></p>
                  </div>
                  <div>
                    <span>D</span>: <p class="answer-wrapper" v-html="row.options[3]"></p>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </template>
      </app-table><!--End table-->
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import IconClose from "~/assets/svg/icons/close2.svg?inline"
  // Import faked data
  import {RESULTS} from "~/server/fakedata/elearning/test"

  export default {

    components: {
      IconClose
    },

    data() {
      return {
        currentQuestionIndex: null,
        tab: 1,
        heads: [
          {
            name: "num",
            text: "Câu hỏi",
            sort: false
          },
          {
            name: "answer",
            text: "Đáp án học sinh",
            sort: false
          },
          {
            name: "key",
            text: "Đáp án đúng",
            sort: false
          },
        ],
        isAuthenticated: true,
        pagination: {
          total: 15,
          page: 6,
          pager: 20,
          totalElements: 55,
          first: 1,
          last: 10
        },
        list: RESULTS,
      };
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
    },

    methods: {
      onPageChange(e) {
        const that = this;
        that.pagination = {...that.pagination, ...e}
        console.log(that.pagination);
      },
      clickQuestion({row, index}) {
        console.log('click question')
        this.currentQuestionIndex = index
      },
      closeDetail() {
        console.log('close')
        this.currentQuestionIndex = null
      }
    },

    created() {
      const resultId = this.$route.params.id
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-result.scss";
  @import "~/assets/scss/components/elearning/_elearning-objective-test-table.scss";
</style>