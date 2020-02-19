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
        <div class="app-upload__default-slot">
          <div class="app-upload__control">
            <div class="app-upload__text">
              <span class="app-upload__name-file" v-if="innerFileList.length">
                <slot name="fileName" :innerFileList="innerFileList">{{ innerFileList[0] ? innerFileList[0].name : '' }}</slot>
              </span>
              <span class="app-upload__placeholder" v-else>{{ placeholder || 'No file selected' }}</span>
            </div>
            <app-button class="app-upload__btn-choose-file" square>Chọn file</app-button>
          </div>
          <slot name="hint"></slot>
        </div>
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
    },
    placeholder: {
      type: String
    }
  },

  data() {
    return {
      input: true,
      innerFileList: []
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
            vm.innerFileList = event.target.files;
            vm.$emit("change", event.target.files, event);
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