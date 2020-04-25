<template>
  <div class="filter-form">
    <div class="filter-form__item align-items-md-start">
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
  
    <div class="">
      <div class="filter-form flex-wrap">
        <div class="filter-form__item" style="min-width: 105px;">
          <app-checkbox
            v-model="filters.has_cmt"
            @change="handleChangedCmt"
          >
            Có bình luận
          </app-checkbox>
        </div>
        <div class="filter-form__item" style="min-width: 120px;">
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
        <app-select-class
          @changedClass="handleChangedClass"
          placeholder="Lớp"
          class-name="filter-form__item"
          :class-style="{ 'min-width': '170px' }"
          class-year-name="filter-form__item"
          :year-style="{ 'min-width': '150px' }"
          v-model="filters.class_id"
        >
        </app-select-class>
  
        <app-select-voted-elearnings
          class="filter-form__item"
          style="min-width: 245px"
          @input="handleChangedElearning"
          v-model="filters.elearning_id"
        />
      </div>
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
          has_cmt: null,
          rate: null,
          class_id: null,
          elearning_id: null
        },
        
        rates: [
          {
            value: 1,
            text: '1 sao'
          },
          {
            value: 2,
            text: '2 sao'
          },
          {
            value: 3,
            text: '3 sao'
          },
          {
            value: 4,
            text: '4 sao'
          },
          {
            value: 5,
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
    computed: {
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
      handleChangedElearning(val) {
        this.$emit('changedElearning', val)
      },
      handleChangedCmt(val) {
        this.$emit('changedCmt', val)
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
</style>