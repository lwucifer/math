<template>
  <filter-form>
    <div class="d-flex">
      <div
        class="filter-form__item filter-form__item--search border-0 ml-0"
        style="max-width: 36rem; min-width: 30rem;"
      >
        <app-search
          class="w-100"
          size="sm"
          placeholder="Nhập để tìm kiếm"
          v-model="filters.query"
          @input="handleChangedSearch"
          @keyup.enter.native="handleSubmitSearch"
          @submit="submit"
          color="primary"
        >
        </app-search>
      </div>
      <div class="filter-form__item">
        <filter-button @click="clickSubmit">
          Lọc kết quả
        </filter-button>
      </div>
      <div class="filter-form__item" v-if="filterSelect" style="min-width: 11rem;">
        <app-vue-select
          class="app-vue-select w-100"
          :options="fileTypes"
          :reduce="item => item.value"
          v-model="filters.type"
          label="text"
          placeholder="Thể loại"
          searchable
          clearable
          @input="handleChangedType"
        >
        </app-vue-select>
      </div>
      <div class="filter-form__item" v-if="filterSelect" style="min-width: 12.5rem;">
        <app-vue-select
          class="app-vue-select w-100"
          :options="statuses"
          :reduce="item => item.value"
          v-model="filters.used"
          label="text"
          placeholder="Trạng thái"
          searchable
          clearable
          @input="handleChangedStatus"
        >
        </app-vue-select>
      </div>
    </div>
  </filter-form>
  
  <!--<div class="filter-form">-->
    <!--<div class="filter-form__item">-->
      <!--<app-button-->
        <!--color="primary"-->
        <!--class="filter-form__item__btn filter-form__item__btn&#45;&#45;submit"-->
        <!--:size="'sm'"-->
        <!--@click="submit"-->
      <!--&gt;-->
        <!--<IconFilter/>-->
        <!--<span>Lọc kết quả</span>-->
      <!--</app-button>-->
    <!--</div>-->
    <!---->
    <!--<div class="filter-form__item" style="min-width: 15.5rem;">-->
      <!--<app-vue-select-->
        <!--class="app-vue-select filter-form__item__selection w-100"-->
        <!--:options="fileTypes"-->
        <!--:reduce="item => item.value"-->
        <!--v-model="filters.type"-->
        <!--label="text"-->
        <!--placeholder="Theo loại"-->
        <!--searchable-->
        <!--clearable-->
        <!--@input="handleChangedType"-->
      <!--&gt;-->
      <!--</app-vue-select>-->
    <!--</div>-->
    <!--<div class="filter-form__item" style="min-width: 15.5rem">-->
      <!--<app-vue-select-->
        <!--class="app-vue-select filter-form__item__selection w-100"-->
        <!--:options="statuses"-->
        <!--:reduce="item => item.value"-->
        <!--v-model="filters.used"-->
        <!--label="text"-->
        <!--placeholder="Theo trạng thái"-->
        <!--searchable-->
        <!--clearable-->
        <!--@input="handleChangedStatus"-->
      <!--&gt;-->
      <!--</app-vue-select>-->
    <!--</div>-->
    <!---->
    <!--&lt;!&ndash;Right form&ndash;&gt;-->
    <!--<div class="filter-form__right">-->
      <!--<div class="filter-form__item filter-form__item&#45;&#45;search border-0">-->
        <!--<app-search-->
          <!--class="w-100"-->
          <!--size="sm"-->
          <!--placeholder="Nhập để tìm kiếm"-->
          <!--v-model="filters.name"-->
          <!--@input="handleChangedSearch"-->
          <!--@keyup.enter.native="handleSubmitSearch"-->
          <!--@submit="submit"-->
        <!--&gt;-->
        <!--</app-search>-->
      <!--</div>-->
    <!--</div>&lt;!&ndash;End right form&ndash;&gt;-->
  <!--</div>-->
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
        filterSelect:false,
        filters: {
          type: null,
          used: null,
          name: ''
        },
        statuses: [
          {
            value: true,
            text: 'Đã sử dụng'
          },
          {
            value: false,
            text: 'Chưa sử dụng'
          },
        ],
        fileTypes: [
          {
            value: 'audio',
            text: 'Audio'
          },
          {
            value: 'video',
            text: 'Video'
          },
          {
            value: 'docs',
            text: 'Văn bản'
          },
          {
            value: 'image',
            text: 'Hình ảnh'
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
      handleFocusSearchInput() {
        console.log('[Component] Elearning exam: focus searching ')
      },
      handleBlurSearchInput() {
        console.log('[Component] Elearning exam: blur searching ')
      },
      handleChangedSearch(val) {
        this.$emit('changedQuery', val)
      },
      handleChangedType(val) {
        this.$emit('changedType', val)
      },
      handleChangedStatus(val) {
        this.$emit('changedStatus', val)
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
        this.filters.type = null
        this.filters.used = null
        this.filters.name = ''
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";*/
</style>