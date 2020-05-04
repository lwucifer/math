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

    <div class="filter-form__item" style="min-width: 140px;">
      <app-vue-select
        class="app-vue-select w-100"
        v-model="filters.type"
        :options="types"
        :reduce="item => item.value"
        label="text"
        placeholder="Theo thể loại"
        searchable
        clearable
        @input="handleChangedType"
      >
      </app-vue-select>
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

  </div><!--End filter form-->
</template>

<script>
  import IconFilter from "~/assets/svg/icons/filter.svg?inline"
  import { EXERCISE_TYPES } from "~/utils/constants"

  export default {
    name: "ElearningManagerFilterForm",
    components: {
      IconFilter,
    },
    data() {
      return {
        filters: {
          type: null,
          keyword: ''
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
      handleChangedType(val) {
        this.$emit('changedType', val)
      },
      handleChangedSearch(val) {
        this.$emit('changedQuery', val)
      },
      handleSubmitSearch(e) {
        this.$emit('submitSearch', e.target.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
</style>