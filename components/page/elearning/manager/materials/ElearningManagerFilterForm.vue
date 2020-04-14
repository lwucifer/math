<template>
  <div class="row">
    <div class="col-md-7 wrapfilterform__ElearningManagerFilterTable">
      <div>
        <button class="btnFitlerSummit__ElearningManagerFilterTable" @click="submit">
          <IconFilter/>
          <span>Lọc kết quả</span>
        </button>
      </div>
      <div style="min-width: 15.5rem;">
        <app-vue-select
          class="selectTypes__ElearningManagerFilterTable"
          :options="fileTypes"
          :reduce="item => item.value"
          v-model="filters.type"
          label="text"
          placeholder="Theo loại"
          searchable
          clearable
          @input="handleChangedType"
        >
        </app-vue-select>
      </div>
      <div style="min-width: 15.5rem">
        <app-vue-select
          class="selectStatus__ElearningManagerFilterTable"
          :options="statuses"
          :reduce="item => item.value"
          v-model="filters.used"
          label="text"
          placeholder="Theo trạng thái"
          searchable
          clearable
          @input="handleChangedStatus"
        >
        </app-vue-select>
      </div>
    </div>
    <div class="col-md-5">
      <div class="wrapSearchForm___ElearningManagerFilterTable">
        <app-input
          type="text"
          v-model="filters.name"
          placeholder="Nhập để tìm kiếm..."
          :size="'sm'"
          @input="handleChangedSearch"
          @keyup.enter.native="handleSubmitSearch"
          class="inputSearch"
        />
        <button type="submit">
          <IconSearch width="15" height="15"/>
        </button>
      </div>
    </div>
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
      }
    }
  }
</script>

<style scoped>

</style>