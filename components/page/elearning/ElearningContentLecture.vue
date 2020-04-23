<template>
  <div class="evlc-item mb-3">
    <div class="evlc-item__head">
      <div class="evlc-item__head-left mr-4">
        Bài 1: {{ get(lesson, "name", "") }}
      </div>
      <!-- <div class="evlc-item__head-right ml-auto">
        <button class="evlc-item__btn evlc-item__btn-collapse active">
          <IconAngleDown class="icon" />
        </button>
      </div> -->
    </div>

    <!-- <div class="evlc-item__body bg-input-gray">
      <div class="d-flex align-items-center text-error py-3">
        <IconFileAlt class="icon subheading mr-2" />Bài tập số 1
      </div>
      <app-divider class="my-0" />
      <div class="d-flex align-items-center text-error py-3">
        <IconFileAlt class="icon subheading mr-2" />Bài tập số 2
      </div>
    </div> -->
  </div>
</template>

<script>
const IconFileAlt = () =>
  import("~/assets/svg/design-icons/file-alt.svg?inline");
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import { get } from "lodash";

export default {
  components: {
    IconFileAlt,
    IconAngleDown,
  },
  props: {
    lesson: {},
  },
  updated() {
    // console.log(this.lesson);
  },
  methods: {
    get,
  },
};
</script>
