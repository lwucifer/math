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
      <div class="writting-test-score" v-show="false">
        <label class="title" for="">Chấm điểm</label>
        <form
          class="writting-test-score__form"
          action=""
        >
          <app-input
            class="d-inline-block"
            v-model="score"
          >
          </app-input>
          <div
            class="text-center"
          >
            <app-button
              class="btn--score"
              size="xl"
              square
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

  export default {

    components: {},

    data() {
      return {
        isAuthenticated: true,
        questionContent: "Nội dung câu hỏi",
        answer: "Nội dung câu trả lời",
        score: null
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      hasMark: function () {
        return true
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