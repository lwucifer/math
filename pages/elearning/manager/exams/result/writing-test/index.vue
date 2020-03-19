<template>
  <div class="elearning-manager-result">
    <div class="elearning-manager-result__mark">
      <h4>Kết quả bài làm</h4>
      <div class="elearning-manager-result__mark__detail">
        <div class="item">
          <span>Thời gian làm bài: </span>
          <span>20:30</span>
        </div>
        <div class="item">
          <span>Kết quả: </span>
          <span v-if="hasMark">6/10 (Đạt)</span>
          <span v-else>Chưa chấm điểm</span>
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