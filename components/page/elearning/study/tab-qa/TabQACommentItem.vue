<template>
  <div class="tab-qa-comment-item" :class="classes">
    <app-avatar
      :size="level === 1 ? 40 : 30"
      :src="get(question, 'creator.avatar.low', '')"
    />

    <div class="tab-qa-comment-item__right">
      <div class="tab-qa-comment-item__top">
        <div class="tab-qa-comment-item__top-left">
          <h6 class="tab-qa-comment-item__name">
            {{ get(question, "creator.name", "") }}
          </h6>
          <!-- <app-stars
            v-if="showStars"
            class="tab-qa-comment-item__rate ml-2"
            :stars="stars"
          /> -->
        </div>

        <span class="tab-qa-comment-item__time">
          <IconAccessTime class="icon mr-2" />{{
            get(question, "timestamp", "") | getDateTimeHH_MM_D_M_Y
          }}
        </span>
      </div>

      <!-- <div class="tab-qa-comment-item__title" v-if="showTitle">{{ title }}</div> -->

      <div class="tab-qa-comment-item__content">
        <div v-if="!showInputUpdate" v-html="get(question, 'content', '')" class="word-break-all"></div>
        <div v-else>
          <!-- show content update -->
        </div>
        <img
          v-if="get(question, 'image_url', '')"
          class="tab-qa-comment-item__img d-block"
          :src="get(question, 'image_url', '')"
          alt=""
        />
      </div>
      <div class="tab-qa-comment-item__actions">
        <button
          class="tab-qa-comment-item__like"
          :class="{ active: get(question, 'liked', false) }"
          @click="handleLike"
        >
          <IconThumbUp class="icon" />&nbsp;{{
            numeral(get(question, "likes", 0)).format()
          }}
        </button>
        <button
          v-if="level == 1"
          class="tab-qa-comment-item__reply"
          @click="showReply = !showReply"
        >
          Phản hồi
        </button>
        <a class="action item-edit" @click.prevent="handleUpdate">
          <IconEdit class="icon fill-primary" />
          <span>Chỉnh sửa</span>
        </a>
        <a class="action item-delete" @click.prevent="modalConfirmSubmit = true">
          <IconTrashAlt class="icon fill-secondary" />
          <span>Xóa</span>
        </a>
      </div>
      <app-modal-confirm
        v-if="modalConfirmSubmit"
        title="Bạn chắc chắn muốn xoá bình luận"
        description="Bạn chắc chắn muốn xoá bình luận?"
        @cancel="modalConfirmSubmit = false"
        @ok="handleQuestionSubmission(question)"
        @close="modalConfirmSubmit = false"
      ></app-modal-confirm>

      <slot v-bind="{ showReply }" />
    </div>
  </div>
</template>

<script>
import IconThumbUp from "~/assets/svg/v2-icons/thumb_up_24px.svg?inline";
import IconAccessTime from "~/assets/svg/v2-icons/access_time_24px.svg?inline";
import { get } from "lodash";
import numeral from "numeral";
import QuestionLikeService from "~/services/elearning/study/QuestionLike";
import InteractiveAnswer from "~/services/elearning/study/InteractiveAnswer";
import IconEdit from "~/assets/svg/v2-icons/border_color_24px.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";

export default {
  components: {
    IconThumbUp,
    IconAccessTime,
    IconEdit,
    IconTrashAlt
  },

  data() {
    return {
      showReply: false,
      submit: true,
      modalConfirmSubmit: false,
      showInputUpdate: false,
    };
  },

  props: {
    level: {
      type: Number,
      default: 1,
      validator: (value) => [1, 2].includes(value),
    },
    question: {},
  },

  computed: {
    classes() {
      return {
        "tab-qa-comment-item--level-2": this.level === 2,
      };
    },
  },

  methods: {
    handleLike() {
      if (this.level == 1) {
        this.likeQuestion();
      }
      if (this.level == 2) {
        this.likeAnswer();
      }
    },
    async likeQuestion() {
      if (!this.submit) return;
      this.submit = false;
      const payload = {
        question_id: get(this, "question.id", ""),
        like: !get(this, "question.liked", false),
      };

      const res = await new QuestionLikeService(this.$axios)["add"](payload);

      this.submit = true;

      if (get(res, "success", false)) {
        this.updateQuestions();
        return;
      }

      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },
    async likeAnswer() {
      if (!this.submit) return;
      this.submit = false;

      const payload = {
        like: !get(this, "question.liked", false),
        answer_id: get(this, "question.id", ""),
      };

      const res = await new InteractiveAnswer(this.$axios)["likeAnswer"](payload);

      this.submit = true;

      if (get(res, "success", false)) {
        this.updateQuestions();
        return;
      }

      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },
    updateQuestions() {
      const options = {
        params: {
          elearning_id: get(this, "$route.params.id", ""),
          page: 1,
          sort_by: "NEWEST",
        },
      };
      this.$store.dispatch(
        `elearning/study/detail/getListQuestion`,
        options
      );
    },
    handleUpdate(){
      this.showInputUpdate = true;
    },
    handleQuestionSubmission(question) {
      console.log('handleQuestionSubmission', question)
    },
    get,
    numeral,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_tab-qa-comment-item.scss";
</style>
