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
      <div class="filter-form__item filter-form__item--search">
        <app-input
          type="text"
          v-model="filters.query"
          placeholder="Nhập để tìm kiếm..."
          :size="'sm'"
          @input="handleChangedSearch"
        />
        <button type="submit">
          <IconSearch width="15" height="15" />
        </button>
      </div>
    </div><!--End right form-->

  </div><!--End filter form-->
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
          category: null,
          type: null,
          query: ''
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
      }
    },
    watch: {
      filters: {
        handler(val, old){
          this.$emit("changedFilter", val)
        },
        deep: true
      }
    },
    methods: {
      submit() {
        this.$emit('submit', this.filters)
      },
      handleChangedType(val) {
        this.$emit('changedType', val)
      },
      handleChangedSearch(val) {
        this.$emit('changedQuery', val)
      },
    }
  }
</script>

<style scoped>

</style>