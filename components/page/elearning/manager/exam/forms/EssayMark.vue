<template>
  <div class="writting-test-score">
    <div class="writting-test-score__form">
      <div class="item">
        <label for="" class="content-title">Nhận xét chi biết bài làm của học sinh</label>
        <app-editor id="comment" v-model="$v.formData.note.$model"/>
      </div>
      <div class="item">
        <label for="" class="content-title" style="font-size: 1.5rem;">Chấm điểm cả bài</label>
        <point-choice
          :score-to-pass="8"
          @changedPoint="updatePoint"
        >
        </point-choice>
      </div>
      <!--<div class="item">-->
        <!--<app-input-->
          <!--class="d-inline-block"-->
          <!--type="number"-->
          <!--min="0"-->
          <!--max="10"-->
          <!--v-model="$v.formData.mark.$model"-->
          <!--:disabled="formData.to_passed"-->
          <!--:validate="getValidationCode('formData.mark')"-->
          <!--:message="'Giá trị không hợp lệ'"-->
          <!--label="Chấm điểm"-->
          <!--labelBold-->
        <!--&gt;-->
        <!--</app-input>-->
      <!--</div>-->
      
      <div class="item mt-4">
        <app-checkbox
          v-model="$v.formData.to_passed.$model"
          label="Cho qua"
          style="color: #333;"
          :disabled="formData.mark != ''"
          :class="{ 'disabled': formData.mark != '', 'app-input--error': get($v, 'formData.to_passed.$error', true) }"
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
        >
          Xác nhận
        </app-button>
      </div>
    </div>
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
    data() {
      return {
        isPass: null,
        VALIDATE_STATUS_CODE: Object.freeze(APP_INPUT_VALIDATE_STATUS),
        formData: {
          mark: '',
          note: '',
          to_passed: false
        },
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
          console.log('[Mark Essay Form] submission.error')
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
        console.log('update point: ', point)
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