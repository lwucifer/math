<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <CourseSide />
      </div>
      <div class="col-md-9">
        <div class="course-detail__main">
          <div class="course-detail__toolbar">
            <span class="h3">Tạo khóa học</span>
          </div>
          <div class="course-detail__content pb-4">
            <h3 class="title">Thông tin khóa học</h3>
            <div class="content pb-0">
              <app-input labelFixed type="text" v-model="name" label="Tên khóa học" />
              <app-input
                labelFixed
                type="file"
                v-model="desc"
                label="Ảnh khóa học"
                placeholder="Upload"
              />
              <app-input labelFixed type="text" v-model="desc" label="Mô tả ngắn" />
              <div class="row">
                <div class="col-6 app-input-secondary">
                  <label class="label-fixed">Danh mục</label>
                  <app-select v-model="cat" :options="catOpts" class="input" />
                </div>
                <div class="col-6 app-input-secondary">
                  <label class="label-fixed">Danh mục con</label>
                  <app-select v-model="cat" :options="catOpts" class="input" />
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <app-input
                    labelFixed
                    type="text"
                    v-model="price"
                    unit="VNĐ"
                    label="Giá khóa học"
                  />
                </div>
                <div class="col-6">
                  <app-input labelFixed type="text" v-model="off" unit="%" label="Giảm giá" />
                </div>
              </div>
              <app-input labelFixed type="text" v-model="content" textarea label="Mô tả" rows="6" />
            </div>
          </div>
        </div>
        <div class="course-detail__toolbar-bottom mt-4">
          <app-button color="primary" square class="ml-auto">Tiếp tục</app-button>
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

export default {
  name: "Course",

  layout: "create",

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
      file: null,
      name: null,
      catChild: null,
      cat: null,
      desc: null,
      content: null,
      price: null,
      off: null,
      active_el: 1,
      catOpts: [
        { value: 1, text: "Công khai" },
        { value: 2, text: "Bạn bè" },
        { value: 3, text: "Chỉ mình tôi" }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
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