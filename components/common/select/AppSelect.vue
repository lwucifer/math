<template>
  <div class="app-select" :class="classes" v-click-outside="hideOptions">
    <div v-if="mode === 'tags'" class="app-select__selected" @click="handleClickSelected">
      <div class="app-select__selected-tags">
        <app-tag class="mb-2" v-for="id in value" :key="id">{{ id }}</app-tag>
      </div>

      <div class="app-select__field">
        <input ref="search" type="text" autocomplete="off" class="app-select__field__input" v-model="search" @input="handleInputSearch">
        <!-- <span class="app-select__field__mirror">{{ search }}</span> -->
      </div>
    </div>

    <div v-else class="app-select__selected" tabindex="0" @click="handleClickSelected">
      <span class="app-select__prepend" v-if="$slots.prepend">
        <slot name="prepend" />
      </span>
      <span class="app-select__selected-value">{{ selectedText }}</span>
      <span class="app-select__arrow">
        <IconCaretDown />
      </span>
    </div>

    <div class="app-select__options" v-show="active">
      <div v-if="!options.length" class="app-select__option">{{ emptyMessage }}</div>
      
      <div
        v-for="option in options"
        class="app-select__option"
        :key="option.value"
        @click="handleClickOption(option)"
      >
        <slot v-if="$scopedSlots.option || $slot.option" name="option" :option="option" />
        <template v-else>{{ option.text }}</template>
      </div>
    </div>
  </div>
</template>

<script>
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";

export default {
  components: {
    IconCaretDown
  },

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    options: {
      type: Array,
      default: () => [],
      validator: value =>
        value.every(option => ["value", "text"].every(key => key in option))
    },
    value: [String, Number, Array],
    mode: {
      type: String,
      default: '' // '' | 'tags'
    },
    emptyMessage: {
      type: String,
      default: 'No option'
    }
  },

  data: () => ({
    active: false,
    search: ''
  }),

  computed: {
    classes() {
      return {
        'app-select__tags': this.mode === 'tags'
      }
    },

    selectedText() {
      const [selected = {}] = this.options.filter(item => item.value === this.value);
      return selected && selected.text
    },

    selectedValues() {
      return this.values.map(id => {
        const option = this.options.filter(option => option.value === id)
      })
    }
  },

  mounted() {
    console.log('this', this)
  },

  methods: {
    hideOptions() {
      this.active = false;
      this.search = '';
    },

    chooseTag(option) {

    },

    handleClickOption(option) {
      if (this.mode === 'tags') {
        this.chooseTag(option);
      } else {
        // on default mode
        this.$emit("change", option.value);
      }

      this.hideOptions();
    },

    handleClickSelected() {
      this.active = !this.active;
      this.$refs.search && this.$refs.search.focus();
    },

    handleInputSearch(e) {
      // Set width of input
      const el = e.target;
      el.style.width = el.scrollWidth + 'px';

      // Emit event to parent
      this.$emit('search', e.target.value);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-select.scss";
</style>