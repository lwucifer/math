<template>
  <div class="writting-test-score">
    <div class="writting-test-score__form">
      <div class="item">
        <label for="" class="content-title">Nhận xét chi biết bài làm của học sinh</label>
        <app-editor id="comment" v-model="$v.formData.note.$model"/>
      </div>
      <div class="item" v-if="pending">
        <label for="" class="content-title" style="font-size: 1.5rem;">Chấm điểm cả bài</label>
        <point-choice
          :score-to-pass="scoreToPass"
          @changedPoint="updatePoint"
        >
        </point-choice>
      </div>
      
      <div class="item mt-4">
        <app-checkbox
          v-model="$v.formData.to_passed.$model"
          label="Cho qua"
          style="color: #333;"
          :disabled="formData.mark != '' && formData.mark != null && failed == false"
          :class="{ 'disabled': formData.mark != '' && formData.mark != null, 'app-input--error': get($v, 'formData.to_passed.$error', true) }"
        >
        </app-checkbox>
        <p class="form--note">
          <i>*Học sinh này đã vượt quá số lần làm bài cho phép. Bạn có đồng ý cho phép học sinh này hoàn thành bài tập với số điểm tối thiểu?</i>
        </p>
      </div>

      <div class="item text-center">
        <app-button
          normal
          @click="submit"
          :disabled="$v.$invalid"
        >
          Xác nhận
        </app-button>
      </div>
    </div>
  
    <app-modal-notify
      v-if="visible.error"
      type="warning"
      title="Chấm điểm thất bại!"
      :description="notiMes"
      @ok="visible.error = false"
      @close="visible.error = false"
    >
      <template v-slot:icon>
    
      </template>
    </app-modal-notify>
  </div>
</template>

<script>
  import PointChoice from "~/components/page/elearning/manager/exam/forms/PointChoice"
  
  import {
    required,
    requiredIf,
    minLength,
    maxLength,
    numeric,
    decimal,
    maxValue,
    minValue,
    between,
  } from "vuelidate/lib/validators"
  import { get } from "lodash"

  import { APP_INPUT_VALIDATE_STATUS } from "~/utils/constants"

  export default {
    components: {
      PointChoice
    },
    props: {
      pending: {
        type: Boolean
      },
      failed: {
        type: Boolean
      },
      scoreToPass: {
        type: Number | String,
        required: true
      }
    },
    data() {
      return {
        isPass: null,
        VALIDATE_STATUS_CODE: Object.freeze(APP_INPUT_VALIDATE_STATUS),
        formData: {
          mark: '',
          note: '',
          to_passed: false
        },
        visible: {
          error: false
        },
        notiMes: ''
      }
    },
    validations: {
      formData: {
        mark: {
          required: requiredIf(function (model) {
            return (!model.to_passed) && (model.mark == '' || model.mark == null)
          }),
          decimal,
          maxValue: maxValue(10),
          minValue: minValue(0),
          between: between(0.0, 10.0)
        },
        note: {
          minLength: minLength(5),
          maxLength: maxLength(500)
        },
        to_passed: {
          required: requiredIf(function (model) {
            return (!model.to_passed) && (model.mark == '' || model.mark == null)
          }),
        }
      }
    },
    watch: {
    
    },
    methods: {
      submit() {
        if (this.$v.$invalid) {
          this.notiMes = 'Vui lòng nhập đủ thông tin!'
          this.$nextTick(() => {
            this.visible.error = true
          })
        } else {
          this.$emit('submit', this.formData)
        }
      },
      getValidationCode(input) {
        if (get(this.$v, `${input}.$error`)) {
          return this.VALIDATE_STATUS_CODE.ERROR
        }
        return this.VALIDATE_STATUS_CODE.DEFAULT
      },
      updatePoint(point) {
        this.formData.mark = point
        this.formData.to_passed = false
      },
      resetForm() {
        this.formData.mark = ''
        this.formData.note = ''
        this.formData.to_passed = false
      },
      get
    }
  }
</script>

<style lang="scss">
  .app-checkbox.disabled {
    .app-checkbox__checkmark {
      background-color: #eee;
    }
  }
</style>