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
          <!--        <div class="item">-->
          <!--          <span>Trả lời đúng: </span>-->
          <!--          <span>10</span>-->
          <!--        </div>-->
          <!--        <div class="item">-->
          <!--          <span>Trả lời sai: </span>-->
          <!--          <span>1</span>-->
          <!--        </div>-->
          <!--        <div class="item">-->
          <!--          <span>Bỏ qua: </span>-->
          <!--          <span>10</span>-->
          <!--        </div>-->
          <!--        <div class="item">-->
          <!--          <span>Thời gian làm bài: </span>-->
          <!--          <span>20:30</span>-->
          <!--        </div>-->
          <!--        <div class="item">-->
          <!--          <span>Kết quả: </span>-->
          <!--          <span>6/10 (Đạt)</span>-->
          <!--        </div>-->
        </div>
      </div>
    </div>

    <div class="py-3">
      <div class="elearning-writting-test-result">
        <div class="item">
          <label class="title">Câu hỏi</label>
          <div class="test_content" v-html="questionContent"></div>
        </div>
        <div class="item">
          <label class="title">Câu trả lời</label>
          <div class="test_content" v-html="answer"></div>
        </div>
      </div>

      <!--Score form-->
      <div class="writting-test-score" v-show="!hasMark">
        <label class="title" for="">Chấm điểm</label>
        <form
          class="writting-test-score__form"
          action=""
        >
          <app-input
            class="d-inline-block"
            v-model="score"
            :disabled="isPass"
          >
          </app-input>
          <div>
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
            class="text-center mt-4"
          >
            <app-button
              square
              normal
            >
              Xác nhận
            </app-button>
          </div>
        </form>
      </div><!--Score form-->
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import * as actionTypes from "~/utils/action-types"
  // Import faked data
  import {RESULTS} from "~/server/fakedata/elearning/test"
  import AppCheckbox from "~/components/common/checkbox/AppCheckbox";

  export default {

    components: {AppCheckbox},

    data() {
      return {
        isAuthenticated: true,
        questionContent: "Nội dung câu hỏi",
        answer: "Nội dung câu trả lời",
        score: '5/10',
        isPass: true
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      hasMark: function () {
        return false
      }
    },

    methods: {},

    created() {
      const resultId = this.$route.params.id
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-result.scss";
  @import "~/assets/scss/components/elearning/_elearning-writing-test-result.scss";
</style>