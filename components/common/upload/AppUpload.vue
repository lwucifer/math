<template>
  <div class="app-upload">
    <span role="button" tabindex="0" class="app-upload__button" @click="triggerClickInput">
      <input
        v-if="input"
        ref="inputFile"
        type="file"
        class="app-upload__input"
        v-bind="$attrs"
        :multiple="multiple"
        v-on="uploadListeners"
      />
      <slot>
        <span>Click to upload File</span>
      </slot>
    </span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    multiple: Boolean,
    fileList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      input: true
    };
  },

  computed: {
    uploadListeners: function() {
      const vm = this;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          change: function(event) {
            vm.$emit("change", event);
            vm.input = false;
            setTimeout(() => (vm.input = true));
          }
        }
      );
    }
  },

  methods: {
    triggerClickInput() {
      this.$refs.inputFile.click();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-upload.scss";
</style>