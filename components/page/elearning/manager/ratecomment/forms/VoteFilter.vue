<template>
  <div class="filter-form">
    <div class="filter-form__item">
      <app-button
        color="primary"
        class="filter-form__item__btn filter-form__item__btn--submit"
        :size="'sm'"
        @click="submit"
      >
        <IconFilter />
        <span>Lọc kết quả</span>
      </app-button>
    </div>
    
    <div class="filter-form__item">
      <app-checkbox
        v-model="filters.cmt"
        @change="handleChangedCmt"
      >
        Có bình luận
      </app-checkbox>
    </div>
    
    <div class="filter-form__item" style="min-width: 111px;">
      <app-vue-select
        class="app-vue-select w-100"
        :options="rates"
        v-model="filters.rate"
        :reduce="item => item.value"
        label="text"
        placeholder="Đánh giá"
        searchable
        clearable
        @input="handleChangedRate"
      >
      </app-vue-select>
    </div>
    
    <div class="filter-form__item" style="min-width: 77px;">
      <app-vue-select
        class="app-vue-select w-100"
        :options="classes"
        v-model="filters.class"
        :reduce="item => item.value"
        label="text"
        placeholder="Lớp"
        searchable
        clearable
        @input="handleChangedClass"
      >
      </app-vue-select>
    </div>
    
    <div class="filter-form__item" style="min-width: 170px">
      <app-vue-select
        class="app-vue-select w-100"
        :options="classes"
        v-model="filters.course"
        :reduce="item => item.value"
        label="text"
        placeholder="Bài giảng/khóa học"
        searchable
        clearable
        @input="handleChangedCourse"
      >
      </app-vue-select>
    </div>
  </div>
</template>

<script>
  import IconFilter from "~/assets/svg/icons/filter.svg?inline"

  export default {
    components: {
      IconFilter,
    },
    data() {
      return {
        filters: {
          cmt: null,
          rate: null,
          class: null
        },
        classes: [
          {
            value: 1,
            text: '10B'
          },
          {
            value: 2,
            text: '10C'
          },
        ],
        rates: [
          {
            value: '1',
            text: '1 sao'
          },
          {
            value: '2',
            text: '2 sao'
          },
          {
            value: '3',
            text: '3 sao'
          },
          {
            value: '4',
            text: '4 sao'
          },
          {
            value: '5',
            text: '5 sao'
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
    methods: {
      submit() {
        if (!this.initStatus) {
          this.$emit('submitFilter', this.filters)
        }
      },
      handleFocusSearchInput() {
        console.log('[Component] Elearning exam: focus searching ')
      },
      handleChangedRate(val) {
        this.$emit('changedRate', val)
      },
      handleChangedClass(val) {
        this.$emit('changedClass', val)
      },
      handleChangedCourse(val) {
        this.$emit('changedCourse', val)
      },
      handleChangedCmt(val) {
        console.log('cmt change: ', val)
        this.$emit('changedCmt', val)
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
</style>