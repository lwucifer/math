<template>
  <div class="app-select" :class="classes" v-click-outside="hideOptions">
    <!-- TAGS MODE -->
    <template v-if="mode === 'tags'">
      <div class="app-select__selected" @click="handleClickSelected">
        <span class="app-select__placeholder" v-if="!value.length">{{ $attrs.placeholder || '' }}</span>
        <app-tag
          v-for="(item, index) in selectedValues"
          :key="item.value"
          class="ma-1"
          show-close
          @close="handleCloseTag(item, index)"
        >{{ item.text }}</app-tag>

        <div class="app-select__field">
          <input
            ref="search"
            type="text"
            autocomplete="off"
            class="app-select__field__input"
            v-model="search"
            @input="handleSearchTag"
          />
          <!-- <span class="app-select__field__mirror">{{ search }}</span> -->
        </div>
      </div>

      <div class="app-select__options" v-show="active">
        <div v-if="!optionsVisible.length" class="app-select__option">{{ emptyMessage }}</div>

        <div
          v-for="option in optionsVisible"
          v-show="value.findIndex(id => id === option.value)"
          class="app-select__option"
          :key="option.value"
          @click="handleClickOption(option)"
        >
          <slot v-if="$scopedSlots.option || $slots.option" name="option" :option="option" />
          <template v-else>{{ option.text }}</template>
        </div>
      </div>
    </template>
    <!-- END TAGS MODE -->

    <!-- DEFAULT MODE -->
    <template v-else>
      <div class="app-select__selected" tabindex="0" @click="handleClickSelected">
        <span class="app-select__prepend" v-if="$slots.prepend">
          <slot name="prepend" />
        </span>

        <span
          v-if="value === null || value === undefined"
          class="app-select__placeholder"
        >{{ $attrs.placeholder || '' }}</span>

        <span class="app-select__selected-value">{{ selectedText }}</span>

        <div class="mr-auto"></div>

        <template v-if="searchable">
          <div class="app-select__search">
            <input
              type="text"
              autocomplete="off"
              class="app-select__search-input"
              v-model="search"
              @input="handleSearchDefault"
            />
          </div>
        </template>

        <template v-if="showClear">
          <span
            v-if="!(value === null || value === undefined)"
            class="app-select__clear"
            @click.stop="handleClickClear"
          >
            <IconClose class="icon" />
          </span>
        </template>

        <span class="app-select__arrow">
          <!--Slot for change the caret icon-->
          <slot name="placeholder-icon">
            <IconCaretDown />
          </slot>
        </span>
      </div>

      <div class="app-select__options" v-show="active">
        <div v-if="!options.length" class="app-select__option">{{ emptyMessage }}</div>

        <div
          v-for="option in options"
          :class="['app-select__option', option.value === value && 'active']"
          :key="option.value"
          @click="handleClickOption(option)"
        >
          <slot v-if="$scopedSlots.option || $slots.option" name="option" :option="option" />
          <template v-else>{{ option.text }}</template>
        </div>
      </div>
    </template>
    <!-- END DEFAULT MODE -->
  </div>
</template>

<script>
const IconCaretDown = () => import("~/assets/svg/icons/caret-down.svg?inline");
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");

export default {
  inheritAttrs: false,
  
  components: {
    IconCaretDown,
    IconClose
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
      default: "" // '' | 'tags'
    },
    emptyMessage: {
      type: String,
      default: "No option"
    },
    showClear: Boolean,
    searchable: Boolean
  },

  data: () => ({
    active: false,
    search: ""
  }),

  computed: {
    classes() {
      return {
        active: this.active,
        "app-select--tags": this.mode === "tags",
        "app-select--searchable": this.searchable
      };
    },

    selectedText() {
      const [selected = {}] = this.options.filter(
        item => item.value === this.value
      );
      return selected && selected.text;
    },

    selectedValues() {
      if (this.mode !== "tags") return;
      return this.value.map(id => {
        const [optionItem = {}] = this.options.filter(
          option => option.value === id
        );
        return optionItem;
      });
    },

    optionsVisible() {
      return this.options.filter(
        option => this.value.findIndex(id => id === option.value) === -1
      );
    }
  },

  methods: {
    hideOptions() {
      this.active = false;
      this.search = "";
    },

    unSelectOption(index) {
      return this.value
        .slice(0, index)
        .concat(this.value.slice(index + 1, this.value.length));
    },

    handleClickOption(option) {
      if (this.mode === "tags") {
        this.$emit("change", [...this.value, option.value]);
      } else {
        // on default mode
        this.$emit("change", option.value);
      }

      this.hideOptions();
    },

    handleClickSelected() {
      console.log("handleClickSelected");
      this.active = !this.active;
      this.$refs.search && this.$refs.search.focus();
    },

    handleSearchTag(e) {
      // Set width of input
      const el = e.target;
      el.style.width = el.scrollWidth + "px";

      // Emit event to parent
      this.$emit("search", e.target.value);
    },

    handleSearchDefault(e) {
      this.$emit("search", e.target.value);
    },

    handleCloseTag(id, index) {
      this.$emit("change", this.unSelectOption(index));
    },

    handleClickClear() {
      if (this.mode === "tags") {
        this.$emit("change", []);
      } else {
        this.$emit("change", null);
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-select.scss";
</style>