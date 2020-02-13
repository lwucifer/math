<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <CourseSide />
      </div>
      <div class="col-md-9">
        <div class="course-detail__main">
          <div class="course-detail__toolbar">
            <span class="h3">Khóa học</span>
          </div>
          <div class="course-detail__content">
            <h3 class="title">Nội dung khóa học</h3>
            <div class="content">
              <div
                class="chapter"
                v-for="(chapter, i) in chapters"
                :key="i"
                :class="active_el == chapter.id ? 'active' : ''"
              >
                <div class="chapter-title">
                  <div>
                    <IconList />
                    <strong>Chương {{ i + 1 }}:</strong>
                    <span>{{ chapter.name }}</span>
                  </div>
                  <div class="actions">
                    <a
                      @click="active(chapter.id)"
                      :class="active_el == chapter.id ? 'active' : ''"
                    >
                      <IconUp />
                    </a>
                    <a @click="remove(chapter.id)">
                      <IconClose />
                    </a>
                  </div>
                </div>
                <div class="lessons">
                  <div
                    class="lesson"
                    v-for="(lesson, j) in chapter.lessons"
                    :key="j"
                  >
                    <div class="lesson-title">
                      <IconListDark />
                      <strong>Bài {{ j + 1 }}:</strong>
                      <span>{{ lesson.name }}</span>
                    </div>
                    <div class="lesson-file">
                      <a href class="active">Upload video</a>
                      <a href>Upload tài liệu</a>
                    </div>
                    <div class="lesson-upload" v-if="lesson.file">
                      <span class="pr-3">{{ lesson.file }}</span>
                      <span class="color-primary">
                        <IconTick />Upload thành công
                      </span>
                    </div>
                    <div class="lesson-upload" v-else>
                      <app-button size="sm" square class="mr-3"
                        >Chọn file</app-button
                      >
                      <span
                        >Lưu ý: Chỉ upload video nhỏ hơn 3GB, dịnh dạng
                        .mp4</span
                      >
                    </div>
                  </div>
                  <a href class="btn-plus">
                    <IconPlus />
                    <span>Thêm bài giảng</span>
                  </a>
                </div>
              </div>
            </div>
            <a href class="btn-plus">
              <IconPlus />
              <span>Thêm chương</span>
            </a>
          </div>
        </div>
        <div class="course-detail__toolbar-bottom">
          <app-button color="info" square>Quay lại</app-button>
          <app-button color="white" square class="ml-auto mr-4"
            >Lưu lại</app-button
          >
          <app-button color="primary" square>Tiếp tục</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseSide from "~/components/page/course/CourseSide";
import IconList from "~/assets/svg/icons/list.svg?inline";
import IconListDark from "~/assets/svg/icons/list-dark.svg?inline";
import IconPlus from "~/assets/svg/icons/plus.svg?inline";
import IconUp from "~/assets/svg/icons/up.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";
import IconTick from "~/assets/svg/icons/tick.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";

export default {
  name: "Course",

  components: {
    CourseSide,
    IconListDark,
    IconList,
    IconPlus,
    IconUp,
    IconClose,
    IconTick
  },

  data() {
    return {
      isAuthenticated: false,
      active_el: 1,
      chapters: [
        {
          id: 1,
          name: "Tên chương",
          lessons: [
            {
              id: 1,
              name: "Giới thiệu chung",
              file: ""
            },
            {
              id: 2,
              name: "Mở đầu",
              file: "Bài 1.mp4"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning", ["elearningInfo"])
  },

  async fetch({ params, query, store }) {
    const elearningId = get(params, "id", "");
    await store.dispatch(`elearning/${actionTypes.ELEARNING.INFO}`, elearningId);
  },

  watch: {},

  methods: {
    active(id) {
      if (this.active_el == id) {
        this.active_el = null;
      } else {
        this.active_el = id;
      }
    },
    remove(id) {
      const that = this;
      that.chapters = _.filter(that.chapters, function(item) {
        return item.id !== id;
      });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-detail.scss";
</style>
