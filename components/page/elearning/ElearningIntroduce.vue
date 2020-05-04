<template>
  <section class="elearning-id-box scroll-target" id="introduce">
    <h4 class="mb-4">Lợi ích từ {{ title }}</h4>

    <div v-if="typeof get(info, 'benefits', '') === 'string'" class="d-flex">
      <template v-if="get(info, 'benefits', [])">
        <IconCheck class="icon text-primary body-1 mr-2" />
        <p v-html="get(info, 'benefits', [])" />
      </template>
    </div>

    <span v-else-if="!get(info, 'benefits', [])" class="caption text-sub">Chưa có nội dung</span>

    <div v-else class="row">
      <div
        v-for="(item, index) in get(info, 'benefits', [])"
        :key="index"
        class="col-md-6 d-flex mb-15"
      >
        <IconCheck class="icon text-primary body-1 mr-2" />
        <p v-html="item" />
      </div>
    </div>

    <h4 class="my-4">Mô tả tổng quát</h4>
    <div v-if="get(info, 'description', '')" v-html="get(info, 'description', '')"></div>
    <span v-else class="caption text-sub">Chưa có nội dung.</span>
    <!-- <div class="text-center mt-3">
      <a class="btn-load-more">Xem thêm</a>
    </div> -->
  </section>
</template>

<script>
import { get } from "lodash";
const IconCheck = () => import("~/assets/svg/design-icons/check.svg?inline");

export default {
  components: {
    IconCheck
  },
  props: {
    info: {}
  },
  computed: {
    title() {
      switch (get(this, "info.type", "")) {
        case "LECTURE":
          return "bài giảng";
          break;
        case "COURSE":
          return "khoá học";
          break;
        default:
          break;
      }
    }
  },
  methods: { get }
};
</script>
