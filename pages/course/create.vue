<template>
  <div class="container course-create">
    <div class="row">
      <div class="col-md-3">
        <aside class="course-create-aside bg-white">
          <ul class="cca-checkbox-list">
            <li class="active">
              <app-checkbox>Thông tin chung</app-checkbox>
            </li>
            <li>
              <app-checkbox>Nội dung học tập</app-checkbox>
            </li>
            <li>
              <app-checkbox>Cài đặt</app-checkbox>
            </li>
            <li>
              <app-checkbox>Bài tập <span class="cca-sub-text text-sub">(Tùy chọn)</span></app-checkbox>
            </li>
            <li>
              <app-checkbox>Bài kiểm tra <span class="cca-sub-text text-sub">(Tùy chọn)</span></app-checkbox>
            </li>
          </ul>

          <div class="cca-action">
            <app-button square full-width>Gửi lên</app-button>
          </div>
        </aside>
      </div>

      <div class="col-md-9"></div>
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
@import "~/assets/scss/components/course/_course-create.scss";
</style>