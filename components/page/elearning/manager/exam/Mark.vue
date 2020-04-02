<template>
  <div class="mark-section">
    <div class="mark-section__detail row">
      <div class="col-md-4 score"
           :class="{ 'score--pass': isPass, 'score--fail': (hasMark && !isPass), 'score--empty': !hasMark }">
        <p class="font-weight-bold score__num">{{ result }}</p>
        <!--<p class="score__note">Số lần làm bài còn lại: <span>1</span></p>-->
        <p v-if="hasMark && !isPass && resultDesc" class="score__note">{{ resultDesc }}</p>
      </div>
      <div class="col-md-8">
        <div class="description">
          <div class="row item">
            <div class="col-md-5 col-sm-4 label">
              Thời gian bắt đầu làm bài
            </div>
            <div class="col-md-7 col-sm-8 value">
              <!--Thứ 4, 18 tháng 10 năm 2019, 11:00 AM-->
              {{ startedAt }}
            </div>
          </div>
          <div class="row item">
            <div class="col-md-5 col-sm-4 label">
              Thời gian nộp bài
            </div>
            <div class="col-md-7 col-sm-8 value">
              <!--Thứ 4, 18 tháng 10 năm 2019, 11:00 AM-->
              {{ finishedAt }}
            </div>
          </div>
          <div class="row item">
            <div class="col-md-5 col-sm-4 label">
              Tổng thời gian làm bài
            </div>
            <div class="col-md-7 col-sm-8 value">
              {{ duration | durationTime }}
            </div>
          </div>
          <div class="row item">
            <div class="col-md-5 col-sm-4 label">
              Số câu hỏi
            </div>
            <div class="col-md-7 col-sm-8 value">
              {{ questionNum }}
            </div>
          </div>
          <div class="row item" v-if="correctAns">
            <div class="col-md-5 col-sm-4 label">
              Đáp án đúng
            </div>
            <div class="col-md-7 col-sm-8 value">
              {{ correctAns }}
            </div>
          </div>
          <div class="row item" v-if="ignoredQues">
            <div class="col-md-5 col-sm-4 label">
              Bỏ qua
            </div>
            <div class="col-md-7 col-sm-8 value">
              {{ ignoredQues }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isPass: {
        type: Boolean,
        default: false
      },
      hasMark: {
        type: Boolean,
        default: true
      },
      result: {
        type: String,
        required: true
      },
      resultDesc: {
        type: String,
        validator: value => {
          return !this.isPass
        }
      },
      startedAt: {
        type: String
      },
      finishedAt: {
        type: String
      },
      duration: {
        type: String|Number // second
      },
      questionNum: {
        type: String|Number,
        required: true
      },
      correctAns: {
        type: String|Number
      },
      ignoredQues: {
        type: String|Number,
        default: 0
      }
    },

    filters: {
      durationTime: function(val) {
        const h = Math.floor(val/60/60)
        const m = Math.floor((val - 60*60*h)/60)
        const s = val - 60*60*h - 60*m
        let str = ''
        if (h) {
          str += h + ' giờ '
        }
        if (m) {
          str += m + ' phút '
        }
        if (s) {
          str += s + ' giây'
        }
        return str
      }
    }
  }
</script>

<style scoped>

</style>