<template>
  <v-select
    v-bind="{ ...$attrs, ...$props, ...$slots }"
    v-on="$listeners" ref="vueSelectItem"
    @input="handleInput"
    @open="handleOpen"
    @search="handleSearch"
  >
    <template v-slot:selected-option="option">
      <span v-if="isSltedAll(option)">{{placeholder}}</span>
      <span v-else>{{getOptionLabel(option)}}</span>
    </template>
    <template v-slot:option="option">
      <span v-if="isSltedOption(option)">
        <i class="vs__icon-selected">
          <slot name="selected-icon">
            <IconCheck />
          </slot>
        </i>{{ getOptionLabel(option) }}
      </span>
      <span v-else>{{ getOptionLabel(option) }}</span>
    </template>
    <template v-slot:list-footer>
      <slot name="list-footer"></slot>
    </template>
    <template v-slot:no-options>
      <slot name="no-options">Không có dữ liệu</slot>
    </template>
  </v-select>
</template>
<script>
  import vSelect from 'vue-select'
  import IconCheck from "~/assets/svg/v2-icons/check.svg?inline";
  
  export default {
    props: {
      // size: {
      //   type: String,
      //   default: "sm" // 'sm' | 'md' | 'lg'
      // },
      allOpt: {
        type: Object,
      }
    },
    components: {
      vSelect,
      IconCheck
    },
    computed: {
      isAll() {
        return true
      },
      classes() {
        const sizeCls = {
        
        }
        return {
        
        }
      }
    },
    // mixins: [vSelect],
    extends: vSelect,
    methods: {
      isSltedOption(option) {
        return this.$refs['vueSelectItem'].isOptionSelected(option)
      },
      isSltedAll(option) {
        if (this.allOpt) {
          return this.optionComparator(option, this.allOpt)
        }
        return false
      },
      handleInput(val) {
        this.$emit('input', val)
      },
      handleOpen() {
        this.$emit('open')
      },
      handleSearch(val) {
        console.log('emit search: ', val)
      }
    },
    mounted() {
    
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/app/_app-vue-select.scss";
</style>