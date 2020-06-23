<template>
  <filter-form class="">
    <div class="d-flex">
      <div
        class="ml-0 filter-form__item filter-form__item--search border-0"
        style="max-width: 33rem; min-width: 28rem;"
      >
        <app-search
          class="w-100"
          size="sm"
          placeholder="Nhập để tìm kiếm"
          bordered
          v-model="filters.query"
          @input="handleChangedSearch"
          @keyup.enter.native="handleSubmitSearch"
          @submit="submit"
          color="primary"
        >
        </app-search>
      </div>
      <div class="filter-form__item">
        <filter-button
          @click="clickSubmit"
          :color="filterSelect ? 'primary': 'white'"
        ></filter-button>
      </div>
      <div class="filter-form__item" v-if="filterSelect" style="min-width: 12.5rem;">
        <app-vue-select
          class="app-vue-select w-100"
          :options="typeOpts"
          :reduce="item => item.value"
          v-model="filters.type"
          label="text"
          placeholder="Thể loại"
          @input="handleSelectType"
          :all-opt="allOpt"
          has-border
        />
      </div>
      <div class="filter-form__item" v-if="filterSelect" style="min-width: 11rem;">
        <app-vue-select
          class="app-vue-select w-100"
          :options="rateOpts"
          :reduce="item => item.value"
          v-model="filters.status"
          label="text"
          placeholder="Trạng thái"
          @input="handleSelectRate"
          :all-opt="allOpt"
          has-border
        />
      </div>
      <!-- <div class="filter-form__item" v-if="filterSelect" style="min-width: 13.7rem;">
        <app-vue-select
          class="app-vue-select w-100"
          :options="optionOpts"
          :reduce="item => item.value"
          v-model="filters.required"
          label="text"
          placeholder="Hình thức"
          @input="handleSelectOption"
          :all-opt="allOpt"
          has-border
        />
      </div> -->
    </div>
  </filter-form>
</template>

<script>
  import IconFilter from "~/assets/svg/icons/filter.svg?inline"
  import { ELEARNING_STATUSES, EXERCISE_TYPES } from '~/utils/constants'
  
  export default {
    components: {
      IconFilter,
    },
    data() {
      return {
        allOpt: {
          value: null,
          text: 'Tất cả'
        },
        filterSelect:false,
        filters: {
          type: null,
          query: '',
          status: null,
          required: null
        },
        types: [
          {
            value: EXERCISE_TYPES.CHOICE,
            text: 'Trắc nghiệm'
          },
          {
            value: EXERCISE_TYPES.ESSAY,
            text: 'Tự luận'
          },
        ],
        rates: [
          {
            value: ELEARNING_STATUSES.PASSED,
            text: 'Đạt'
          },
          {
            value: ELEARNING_STATUSES.FAILED,
            text: 'Không đạt'
          },
          {
            value: ELEARNING_STATUSES.NONE,
            text: 'Chưa làm'
          },
          {
            value: ELEARNING_STATUSES.PENDING,
            text: 'Chưa chấm'
          },
        ],
        options: [
          {
            value: true,
            text: 'Bắt buộc'
          },
          {
            value: false,
            text: 'Không bắt buộc'
          }
        ],
        initStatus: true
      }
    },
    watch: {
      filters: {
        handler(val, old){
          this.initStatus = false
          this.$emit("changedFilter", val)
        },
        deep: true
      }
    },
    computed: {
      typeOpts() {
        return [this.allOpt, ...this.types]
      },
      rateOpts() {
        return [this.allOpt, ...this.rates]
      },
      optionOpts() {
        return [this.allOpt, ...this.options]
      }
    },
    methods: {
      submit() {
        if (!this.initStatus) {
          this.$emit('submitFilter', this.filters)
        }
      },
      handleSelectRate(val) {
        this.$emit('changedRate', val)
      },
      handleSelectType(val) {
        this.$emit('changedType', val)
      },
      handleChangedSearch(val) {
        this.$emit('changedQuery', val)
      },
      handleSelectOption(val) {
        this.$emit('changedOption', val)
      },
      handleSubmitSearch(e) {
        this.$emit('submitSearch', e.target.value)
      },
      clickSubmit() {
        if (this.filterSelect) {
          this.resetForm()
          this.filterSelect = false
          if (!this.initStatus) {
            this.$emit('submitFilter', this.filters)
          }
        } else {
          this.filterSelect = true
        }
      },
      resetForm() {
        this.filters.status = null
        this.filters.type = null
        this.filters.required = null
        this.filters.query = ''
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
