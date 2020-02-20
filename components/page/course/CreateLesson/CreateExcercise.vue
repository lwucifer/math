<template>
  <div>
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài tập</h1>
      </div>

      <div class="cc-panel__body">
        <app-alert type="warning" class="mb-4" show-close>
          <template slot="icon">
            <IconInfoCircle class="icon ce-alert-icon heading-3 fill-sub" />
          </template>
          Bạn có thể tạo bài kiểm tra bắt buộc cho bài giảng, khóa học của bạn tại đây. Học sinh cần hoàn thành bài kiểm tra và đạt điểm để hoàn thành khóa học.
        </app-alert>

        <app-button class="font-weight-semi-bold" color="secondary" size="sm" square>Tạo bài tập</app-button>
      </div>
    </div>

    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="mb-4">
          <label for="title" class="text-sub mb-2 d-inline-block">Tiêu đề bài tập</label>
          <app-input id="title" :counter="100" />
        </div>

        <div class="row align-items-center mb-4">
          <div class="col-md-2">
            <label for="require" class="text-gray caption">Bài tập bắt buộc?</label>
          </div>
          <div class="col-md-10">
            <app-select
              class="cc-select"
              id="require"
              :options="[{ value: 1, text: 'Có'}, { value: 0, text: 'Không'}]"
              placeholder="Bắt buộc"
              size="sm"
              style="width: 112px"
            >
              <template slot="placeholder-icon">
                <IconAngleDown class="icon" />
              </template>
            </app-select>
          </div>
        </div>

        <div class="row align-items-center mb-4">
          <div class="col-md-2">
            <label for="time" class="text-gray caption">Thời gian làm bài</label>
          </div>

          <div class="col-md-10">
            <app-input
              type="number"
              class="mb-0 ce-input-with-unit"
              id="time"
              size="sm"
              style="width: 112px"
              :value="60"
            >
              <div slot="unit">Phút</div>
            </app-input>
          </div>
        </div>

        <div class="row align-items-center mb-4">
          <div class="col-md-2">
            <label for="point" class="text-gray caption">Điểm đạt</label>
          </div>

          <div class="col-md-10">
            <app-input
              type="number"
              min="0"
              max="10"
              class="mb-0 ce-input-with-unit"
              id="point"
              size="sm"
              style="width: 102px"
            >
              <div slot="unit">/10</div>
            </app-input>
          </div>
        </div>

        <div class="row align-items-center mb-4">
          <div class="col-md-2">
            <label for="count" class="text-gray caption">Số lần làm bài</label>
          </div>

          <div class="col-md-10">
            <app-input type="number" class="mb-0" id="count" size="sm" style="width: 49px"></app-input>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <app-button size="sm" color="disabled" class="font-weight-semi-bold mr-4" square>Huỷ bỏ</app-button>
          <app-button size="sm" color="primary" class="font-weight-semi-bold" square>Tạo bài tập</app-button>
        </div>
      </div>
    </div>

    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="ce-item d-flex align-items-center justify-content-between">
          <div class="ce-item__left d-flex align-items-center">
            <h3 class="body-2 mr-3">Bài tập 1</h3>
            <a href class="ce-item__action edit mr-3">
              <IconEditAlt class="icon d-block subheading fill-primary" />
            </a>
            <a href class="ce-item__action delete mr-3">
              <IconTrashAlt class="icon d-block subheading fill-secondary" />
            </a>
          </div>

          <div class="ce-item__right">
            <a href class="text-secondary">Thêm câu hỏi</a>
          </div>
        </div>
      </div>
    </div>

    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="cc-box">
          <div class="cc-box__head">
            <div class="cc-box__head-left">
              <h2 class="cc-box__title heading-6">Bài tập 1</h2>
              <button class="cc-box__btn cc-box__btn-edit">
                <IconEditAlt class="icon" />
              </button>
            </div>
          </div>

          <div class="cc-box__body">
            <div class="cc-box__bg-gray pa-4">
              <label class="d-inline-block mb-3" for="question-editor">Nội dung câu hỏi</label>

              <client-only>
                <editor-content
                  :editor="editor"
                  class="editor cc-editor mb-4"
                  id="question-editor"
                />
              </client-only>

              <div class="row mb-4">
                <div class="col-md-3">
                  <label class="d-inline-block mb-3" for="answer-a">Đáp án đúng</label>
                  <div>
                    <app-radio name="answer" value="a" id="answer-a">A</app-radio>
                  </div>
                </div>

                <div class="col-md-9">
                  <label class="d-inline-block mb-3" for="answer-editor">Nội dung đáp án</label>
                  <div class="d-flex align-items-start">
                    <div class="flex-grow mr-4">
                      <client-only>
                        <editor-content
                          :editor="answerEditor"
                          class="editor cc-editor"
                          id="answer-editor"
                        />
                      </client-only>
                    </div>

                    <div>
                      <button>
                        <IconTrashAlt class="icon d-block subheading fill-secondary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end">
                <app-button color="disabled" class="font-weight-semi-bold mr-4" size="sm" square>Huỷ bỏ</app-button>
                <app-button color="primary" class="font-weight-semi-bold" size="sm" square>Lưu câu hỏi</app-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";

import IconInfoCircle from "~/assets/svg/design-icons/info-circle.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";

export default {
  components: {
    IconInfoCircle,
    IconAngleDown,
    IconEditAlt,
    IconTrashAlt,
    EditorContent
  },

  data() {
    return {
      editor: null,
      answerEditor: null
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: "Khung Soạn thảo"
        })
      ]
    });

    this.answerEditor = new Editor({
      extensions: [
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: "Nội dung đáp án"
        })
      ]
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-excercise.scss";
</style>