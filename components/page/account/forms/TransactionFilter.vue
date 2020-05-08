<template>
  <filter-form>
    <div class="mb-3">
      <span class="filter-form__title">
        Chọn khoảng thời gian
      </span>
    </div>
    
    <div class="d-flex filter-form__input-wrapper">
      <div
        class="filter-form__item"
        style="min-width: 21rem;"
      >
        <app-date-picker
          class="w-100"
          v-model="dateDefault"
          square
          range
          size="sm"
          placeholder="DD/MM/YYYY - DD/MM/YYYY"
          :shortcuts="DATE_SHORTCUT"
          @input="changeDate"
          valueFormat="YYYY-MM-DD"
        >
          <!--<template v-slot:icon-calendar>-->
          <!--<IconCalendar />-->
          <!--</template>-->
        </app-date-picker>
      </div>
      <div class="filter-form__item d-flex">
        <filter-button @click="filterSelect= !filterSelect">
          Lọc kết quả
        </filter-button>
      </div>
      <div class="filter-form__item" v-if="filterSelect">
        <app-vue-select
          class="app-vue-select"
          :options="statuses"
          :reduce="item => item.value"
          v-model="filters.status"
          label="text"
          placeholder="Theo trạng thái"
          searchable
          clearable
          @input="handleSelectStatus"
        />
      </div>
      <div class="filter-form__item" v-if="filterSelect" style="min-width: 27rem;">
        <app-vue-select
          class="app-vue-select w-100"
          :options="opts"
          :reduce="item => item.value"
          v-model="filters.payment"
          label="text"
          placeholder="Theo phương thức thanh toán"
          searchable
          clearable
          @input="handleSelectPayment"
        />
      </div>
    </div>
  </filter-form>
</template>

<script>
  import { DATE_SHORTCUT} from "~/utils/config";

  export default {
    data() {
      return {
        filters:{
          status:'',
          payment:'',
        },
        statuses: [
          {
            value: -1,
            text: 'Thất bại'
          },
          {
            value: 0,
            text: 'Chờ xử lí'
          },
          {
            value: 1,
            text: 'Thành công'
          },
          {
            value: -2,
            text: 'Đã Huỷ'
          }
        ],
        opts:[
          {
            value: 'BANK',
            text: 'BANK'
          },
          {
            value: 'ATM',
            text: 'ATM'
          },
          {
            value: 'EWALLET',
            text: 'EWALLET'
          }
        ],
        filterSelect:false,
        DATE_SHORTCUT: DATE_SHORTCUT,
        dateDefault: this.selectDateDefault
      }
    },
    props:{
      selectDateDefault:{
        type: Array,
        default: () => []
      }
    },
    methods: {
      changeDate(date){
        this.$emit("changeDate", date);
        console.log(date)
      },
      handleSelectPayment(e){
        this.$emit("changePayment", e);
      },
      handleSelectStatus(s){
        this.$emit("changeStatus", s);
      },
    }
  }
</script>

<style scoped>

</style>