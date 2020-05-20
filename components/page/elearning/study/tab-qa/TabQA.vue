<template>
  <div class="e-study-tab-qa">
    <TabQAEditor class="mb-15" />

    <div class="d-flex align-items-center">
      <h5>151 Bình luận</h5>
      <div class="ml-auto">
        <app-search
          class="mb-0 mr-4"
          placeholder="Tìm kiếm bình luận"
          size="sm"
        />
        <app-select
          placeholder="Sắp xếp theo"
          size="sm"
          :options="sortOpts"
        ></app-select>
      </div>
    </div>

    <div class="e-study-tab-qa__comment-list">
      <TabQACommentItem>
        <!-- <TabQACommentItem :level="2" />
        <a href class="e-study-tab-qa__more e-study-tab-qa__more--child"
          >Xem thêm bình luận</a
        >
        <TabQACommentEditor class="mt-4" /> -->
      </TabQACommentItem>

      <!-- <TabQACommentItem>
        <TabQACommentItem :level="2" />
        <TabQACommentItem :level="2" />
        <TabQACommentItem :level="2" />
        <TabQACommentItem :level="2" />
      </TabQACommentItem> -->

      <div class="text-center">
        <a href class="e-study-tab-qa__more">Xem thêm bình luận</a>
      </div>
    </div>
  </div>
</template>

<script>
import IconSearch from "~/assets/svg/v2-icons/search_24px.svg?inline";
import TabQAEditor from "~/components/page/elearning/study/tab-qa/TabQAEditor.vue";
import TabQACommentItem from "~/components/page/elearning/study/tab-qa/TabQACommentItem.vue";
import TabQACommentEditor from "~/components/page/elearning/study/tab-qa/TabQACommentEditor.vue";
import { get } from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    IconSearch,
    TabQAEditor,
    TabQACommentItem,
    TabQACommentEditor,
  },

  mounted() {
    const options = {
      params: {
        elearning_id: get(this, "$route.params.id", ""),
      },
    };
    this.$store.dispatch(`elearning/study/questions/getListQuestion`, options);
  },

  computed: {
    ...mapState("elearning/study/questions", {
      questions: "questions",
    }),
  },

  data() {
    return {
      sortOpts: [
        {
          value: 0,
          text: "Thích nhiều nhất",
        },
        {
          value: 1,
          text: "Mới nhất",
        },
        {
          value: 2,
          text: "Cũ nhất",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_tab-qa.scss";
</style>
