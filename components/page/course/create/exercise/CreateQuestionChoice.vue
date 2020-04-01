<template>
  <div>
    <label class="d-inline-block mb-3" for="question-editor"
      >Nội dung câu hỏi</label
    >

    <app-editor class="mb-4" id="question-editor" />

    <div class="row mb-4">
      <div class="col-md-3">
        <label class="d-inline-block mb-3" for="answer-a">Đáp án đúng</label>
        <div>
          <app-radio name="answer" value="a" id="answer-a">A</app-radio>
        </div>
      </div>

      <div class="col-md-9">
        <label class="d-inline-block mb-3" for="answer-editor"
          >Nội dung đáp án</label
        >
        <div class="d-flex align-items-start">
          <div class="flex-grow mr-4">
            <app-editor id="answer-editor" />
          </div>

          <div>
            <button>
              <IconTrashAlt class="icon d-block subheading fill-secondary" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-5">
      <app-button
        color="disabled"
        class="font-weight-semi-bold mr-4"
        size="sm"
        square
        >Huỷ bỏ</app-button
      >
      <app-button color="primary" class="font-weight-semi-bold" size="sm" square
        >Lưu câu hỏi</app-button
      >
    </div>
  </div>
</template>

<script>
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";

export default {
  components: {
    IconTrashAlt
  }
};
</script>
