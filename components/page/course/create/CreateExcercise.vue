<template>
  <div>
    <create-action />
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài tập</h1>
      </div>

      <SelectLesson
        :lessons="lessons"
        @handleSelectLesson="handleSelectLesson"
      />

      <ButtonCreateExcercise
        v-if="isShowButtonCreate"
        @handleClick="handleShowFormAdd"
      />

      <FormCreateExcercise
        v-if="isShowFormAdd"
        @handleCancel="handleCancelAddCreate"
        :lesson="lesson"
      />

      <ExcerciseItem
        v-for="excercise in excercises"
        :key="excercise.id"
        :excercise="excercise"
      />
    </div>

    <!-- <div class="cc-panel bg-white mb-4">
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
              <div class="ce-question-type">
                <a
                  href
                  :class="{ active: createType === 'choice' }"
                  @click.prevent="createType = 'choice'"
                >
                  <IconFileCheck class="icon" />Câu hỏi trắc nghiệm
                </a>
                <a
                  href
                  :class="{ active: createType === 'essay' }"
                  @click.prevent="createType = 'essay'"
                >
                  <IconClipboardNotes class="icon" />Tự luận
                </a>
              </div>

              <app-divider class="my-4" />

              <div v-if="createType === 'choice'">
                <label class="d-inline-block mb-3" for="question-editor"
                  >Nội dung câu hỏi</label
                >

                <app-editor class="mb-4" id="question-editor" />

                <div class="row mb-4">
                  <div class="col-md-3">
                    <label class="d-inline-block mb-3" for="answer-a"
                      >Đáp án đúng</label
                    >
                    <div>
                      <app-radio name="answer" value="a" id="answer-a"
                        >A</app-radio
                      >
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
                          <IconTrashAlt
                            class="icon d-block subheading fill-secondary"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="createType === 'essay'">
                <label class="d-inline-block mb-3" for="question-editor"
                  >Nội dung câu hỏi</label
                >

                <app-editor />
              </div>

              <div>
                <label class="d-inline-block mb-3">Bài giảng liên quan</label>
                <div>
                  <app-select
                    :options="[
                      { value: 0, text: 'Bài giảng 1' },
                      { value: 1, text: 'Bài giảng 2' }
                    ]"
                    placeholder="Chọn bài giảng"
                    size="sm"
                  >
                    <template slot="placeholder-icon">
                      <IconAngleDown class="icon" />
                    </template>
                  </app-select>
                </div>
                <span class="d-inline-block mt-2 caption text-sub"
                  >Chọn bài giảng liên quan để giúp học sinh trả lời câu hỏi một
                  cách chính xác nhất</span
                >
              </div>

              <div class="d-flex justify-content-end mt-5">
                <app-button
                  color="disabled"
                  class="font-weight-semi-bold mr-4"
                  size="sm"
                  square
                  >Huỷ bỏ</app-button
                >
                <app-button
                  color="primary"
                  class="font-weight-semi-bold"
                  size="sm"
                  square
                  >Lưu câu hỏi</app-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import IconInfoCircle from "~/assets/svg/design-icons/info-circle.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconAlignCenterAlt from "~/assets/svg/design-icons/align-center-alt.svg?inline";
import IconFileCheck from "~/assets/svg/design-icons/file-check.svg?inline";
import IconClipboardNotes from "~/assets/svg/design-icons/clipboard-notes.svg?inline";
import ButtonCreateExcercise from "~/components/page/course/create/excercise/ButtonCreateExcercise";
import FormCreateExcercise from "~/components/page/course/create/excercise/FormCreateExcercise";
import ExcerciseItem from "~/components/page/course/create/excercise/ExcerciseItem";
import SelectLesson from "~/components/page/course/create/excercise/SelectLesson";
import CreateAction from "~/components/page/course/create/common/CreateAction";
import * as actionTypes from "~/utils/action-types";
import { getParamQuery } from "~/utils/common";
import { get } from "lodash";

export default {
  components: {
    IconInfoCircle,
    IconAngleDown,
    IconEditAlt,
    IconTrashAlt,
    IconAlignCenterAlt,
    IconFileCheck,
    IconClipboardNotes,
    CreateAction,
    ButtonCreateExcercise,
    FormCreateExcercise,
    ExcerciseItem,
    SelectLesson
  },

  data() {
    return {
      createType: "choice", // 'choice' | 'essay'
      isShowButtonCreate: true,
      isShowFormAdd: false,
      lessons: [],
      lesson: null,
      excercises: []
    };
  },

  created() {
    this.getLessons();
  },

  watch: {
    lesson: {
      handler: function() {
        this.getExcercises();
      },
      deep: true
    }
  },

  methods: {
    handleShowFormAdd() {
      this.isShowButtonCreate = false;
      this.isShowFormAdd = true;
    },

    handleSelectLesson(lesson) {
      this.lesson = lesson;
    },

    handleCancelAddCreate() {
      this.isShowButtonCreate = true;
      this.isShowFormAdd = false;
    },

    async getExcercises() {
      const lesson_id = get(this, "lesson.id", "");
      if (!lesson_id) return;
      const options = {
        params: {
          lesson_id
        }
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-excercises/${actionTypes.ELEARNING_CREATING_EXCERCISES.LIST}`,
        options
      );
      if (get(res, "success", false)) {
        this.excercises = get(res, "data.content", []);
      }
    },

    async getLessons() {
      const elearning_id = getParamQuery("elearning_id");
      const options = {
        not_commit: true,
        params: {
          elearning_id
        }
      };
      const res = await this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.LIST}`,
        options
      );
      if (get(res, "success", false)) {
        let lessons = [];
        get(res, "data", []).map(lesson => {
          lesson.value = lesson.id;
          lesson.text = lesson.name;
          lessons.push(lesson);
        });
        this.lessons = lessons;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-excercise.scss";
</style>
