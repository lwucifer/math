<template>
  <div class="elearning-manager-result">
    <div class="elearning-manager-result__section">
      <h4 class="title">Kết quả bài làm</h4>
      <div class="mark-section">
        <div class="mark-section__detail row">
          <div class="col-md-4 score score--fail">
            <p class="font-weight-bold text-primary score__num">6/10 (Đạt)</p>
            <p class="score__note">Số lần làm bài còn lại: <span>1</span></p>
          </div>
          <div class="col-md-8">
            <div class="description">
              <div class="row item">
                <div class="col-md-5 col-sm-4 label">
                  Thời gian bắt đầu làm bài
                </div>
                <div class="col-md-7 col-sm-8 value">
                  Thứ 4, 18 tháng 10 năm 2019, 11:00 AM
                </div>
              </div>
              <div class="row item">
                <div class="col-md-5 col-sm-4 label">
                  Thời gian nộp bài
                </div>
                <div class="col-md-7 col-sm-8 value">
                  Thứ 4, 18 tháng 10 năm 2019, 11:00 AM
                </div>
              </div>
              <div class="row item">
                <div class="col-md-5 col-sm-4 label">
                  Tổng thời gian làm bài
                </div>
                <div class="col-md-7 col-sm-8 value">
                  10 phút 15 giây
                </div>
              </div>
              <div class="row item">
                <div class="col-md-5 col-sm-4 label">
                  Số câu hỏi
                </div>
                <div class="col-md-7 col-sm-8 value">
                  20
                </div>
              </div>
              <div class="row item">
                <div class="col-md-5 col-sm-4 label">
                  Đáp án đúng
                </div>
                <div class="col-md-7 col-sm-8 value">
                  10
                </div>
              </div>
              <div class="row item">
                <div class="col-md-5 col-sm-4 label">
                  Bỏ qua
                </div>
                <div class="col-md-7 col-sm-8 value">
                  1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Score form-->
      <div class="px-4">
        <div class="form--score">
          <app-checkbox
            v-model="isPass"
            label="Cho qua"
          >
          </app-checkbox>
          <p class="form--note mt-2">
            <i>*Học sinh này đã vượt quá số lần làm bài cho phép. Bạn có đồng ý cho phép học sinh này hoàn thành bài tập với số điểm tối thiểu?</i>
          </p>
        </div>

        <div
          class="mt-4"
        >
          <app-button
            square
            normal
            color="disabled"
          >
            Xác nhận
          </app-button>
        </div>

        <app-divider class="mb-3 mt-4"/>
      </div><!--Score form-->
    </div>


    <div class="py-3 elearning-manager-result__section">
      <h4 class="title">Chi tiết kết quả</h4>
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
          page: 1,
          pager: 20,
          size: 10,
          total_elements: 55,
          first: 1,
          last: 10
        },
        list: RESULTS,
        isPass: false
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
