<template>
  <div class="row mb-4">
    <div class="col-md-3">
      <label class="d-inline-block mb-3" for="answer-a">Đáp án đúng</label>
      <div>
        <app-radio
          @click="$emit('handleSelectAnswerTrue', index)"
          name="answer"
          value="A"
          id="answer-a"
          >{{ get(answer, "index", "") }}</app-radio
        >
      </div>
    </div>

    <div class="col-md-9">
      <label class="d-inline-block mb-3" for="answer-editor"
        >Nội dung đáp án</label
      >
      <div class="d-flex align-items-start">
        <div class="flex-grow mr-4">
          <!-- <app-editor id="answer-editor" /> -->
          <app-input @input="handleChangeContent" />
        </div>

        <div>
          <button>
            <IconTrashAlt class="icon d-block subheading fill-secondary" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import { get } from "lodash";

export default {
  components: {
    IconTrashAlt
  },

  props: {
    answer: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: 0
    }
  },

  methods: {
    get,

    handleChangeContent(value) {
      this.$emit("handleChangeContent", this.index, value);
    }
  }
};
</script>
