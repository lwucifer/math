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
      <app-vue-select
        class="app-vue-select filter-form__item__selection"
        v-model="filters.class_id"
        :options="classes"
        :reduce="item => item.value"
        label="text"
        placeholder="Theo lớp"
        searchable
        clearable
        @input="handleChangedClass"
      >
      </app-vue-select>
    </div>

    <div class="filter-form__item">
      <app-select-submission-result
        v-model="filters.result"
        @input="handleChangedResult"
      >
      </app-select-submission-result>
      <!--<app-vue-select-->
        <!--class="app-vue-select filter-form__item__selection"-->
        <!--v-model="filters.result"-->
        <!--:options="results"-->
        <!--:reduce="item => item.value"-->
        <!--label="text"-->
        <!--placeholder="Theo kết quả"-->
        <!--searchable-->
        <!--clearable-->
        <!--@input="handleChangedResult"-->
      <!--&gt;-->
      <!--</app-vue-select>-->
    </div>

    <!--Right form-->
    <div class="filter-form__right">
      <div class="filter-form__item filter-form__item--search border-0">
        <app-search
          class="w-100"
          size="sm"
          placeholder="Nhập để tìm kiếm"
          v-model="filters.query"
          @input="handleChangedSearch"
          @keyup.enter.native="handleSubmitSearch"
          @submit="submit"
        >
        </app-search>
      </div>
    </div><!--End right form-->

  </div>
</template>

<script>
  import IconFilter from "~/assets/svg/icons/filter.svg?inline"
  import IconSearch from "~/assets/svg/icons/search.svg?inline"
  import IconArrow from "~/assets/svg/icons/arrow.svg?inline"

  export default {
    name: "ElearningManagerFilterForm",
    components: {
      IconFilter,
      IconSearch,
      IconArrow
    },
    data() {
      return {
        filters: {
          query: null,
          class_id: null,
          result: null
        },
        types: [
          {
            value: 1,
            text: 'Trắc nghiệm'
          },
          {
            value: 2,
            text: 'Tự luận'
          },
        ],
        classes: [
          {
            value: 1,
            text: '10B'
          },
          {
            value: 2,
            text: '11C'
          },
        ],
        results: [
          {
            value: 1,
            text: '4/10'
          },
          {
            value: 2,
            text: '9/10'
          },
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
      handleChangedClass(val) {
        this.$emit('changedClass', val)
      },
      handleChangedSearch(val) {
        this.$emit('changedQuery', val)
      },
      handleChangedResult(val) {
        this.$emit('changedResult', val)
      },
      handleSubmitSearch(e) {
        this.$emit('submitSearch', e.target.value)
      }
    }
  }
</script>

<style scoped>

</style>