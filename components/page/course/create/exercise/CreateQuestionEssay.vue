<template>
  <div>
    <label class="d-inline-block mb-3" for="question-editor"
      >Nội dung câu hỏi</label
    >
    <app-editor />
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
