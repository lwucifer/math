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
        style="min-width: 25rem;"
      >
        <app-date-picker
          class="w-100"
          v-model="filters.time"
          square
          range
          size="sm"
          placeholder="DD/MM/YYYY - DD/MM/YYYY"
          :shortcuts="DATE_SHORTCUT"
        >
          <!--<template v-slot:icon-calendar>-->
          <!--<IconCalendar />-->
          <!--</template>-->
        </app-date-picker>
      </div>
      <div class="filter-form__item">
        <filter-button @click="submit">
          Lọc kết quả
        </filter-button>
      </div>
    </div>
  </filter-form>
</template>

<script>
  import { DATE_SHORTCUT} from "~/utils/config";

  export default {
    data() {
      return {
        filters: {
          time: ''
        },
        DATE_SHORTCUT: DATE_SHORTCUT
      }
    },
    methods: {
      submit() {
        console.log('[Submit filter]')
      }
    }
  }
</script>

<style scoped>

</style>