<template>
  <app-vue-select
    class="app-vue-select filter-form__item__selection w-100"
    v-model="selectedItem"
    :options="options"
    :reduce="item => item.val"
    label="label"
    :placeholder="placeholder"
    :searchable="searchable"
    :clearable="clearable"
    @input="handleChangedResult"
  >
  </app-vue-select>
</template>

<script>
import { get } from "lodash"

export default {
  
  components: {
  },

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    placeholder: {
      type: String,
      default: 'Theo kết quả'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    searchable: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => {
        return [
          {
            label: 'Đạt',
            val: true
          },
          {
            label: 'Không đạt',
            val: false
          }
        ]
      }
    }
  },

  data() {
    return {
      selectedItem: null,
    }
  },

  computed: {
  
  },
  watch: {
  },

  methods: {
    handleChangedResult() {
      this.$emit('input', this.selectedItem)
    },
    get
  },
  mounted () {
  },
  created() {
  
  },
};
</script>

<style lang="scss">
</style>