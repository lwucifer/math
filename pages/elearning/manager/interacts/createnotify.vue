
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="6" />
      </div>
      <div class="col-md-9 wrap-content__ElearningManagerInteractive">
        <div class="wrap-content-create-notify__ElearningManagerInteractive">
          <h5>Tạo thông báo</h5>
          <div class="d-flex flex-column">
            <span>Chọn bài giảng/ khóa học liên quan</span>
            <app-select
              label="text"
              placeholder="Theo kết quả"
              searchable
              clearable
              class="content-select__ElearningManagerInteractive"
            ></app-select>
          </div>
          <div>
            <span>Tiêu đề thông báo</span>
            <app-input placeholder="Nhập tiêu đề" />
          </div>
          <div>
            <span>Tiêu đề thông báo</span>
            <app-input
              textarea
              placeholder="Textarea placeholder"
              class="textArea__ElearningManagerInteractive"
            />
          </div>
          <div class="d-flex justify-content-center">
            <app-button square size="sm">Hoàn thành</app-button>
          </div>
          <button class="btn-close__ElearningManagerInteractive">
            <IconClose />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconClose from "~/assets/svg/design-icons/multiply.svg?inline";
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
export default {
  layout: "manage",

  components: {
    ElearningManagerSide,
    IconClose
  },
  data() {
    return {
      tab: 1,
      isAuthenticated: true
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-interactive.scss";
</style>