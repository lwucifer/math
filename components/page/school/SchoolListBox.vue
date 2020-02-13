<template>
  <div class="school-list-box">
    <div class="school-list-box__title">
      <h4>
        <span class="school-list-box__title__name">{{ name }}</span>
        <span class="school-list-box__title__description">{{ description }}</span>
      </h4>
    </div>
    <!--List schools-->
    <div class="school-list-box__content">
      <div class="container">
        <div class="row">
          <div
            class="custom-col-lg-5 col-3 col-sm-6 col-xs-12"
            v-for="(item, index) in items"
            :key="index"
          >
            <school-item :item="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="school-list-box__footer">

    </div>
  </div>
</template>

<script>
import { assignIn } from "lodash";
import IconChevronLeft from "~/assets/svg/icons/chevron-left.svg?inline";
import IconChevronRight from "~/assets/svg/icons/chevron-right.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import IconNote from "~/assets/svg/icons/note.svg?inline";
import IconVideo3 from "~/assets/svg/icons/video3.svg?inline";
import SchoolItem from "~/components/page/school/SchoolItem"

export default {
  components: {
    SchoolItem,
    IconChevronLeft,
    IconChevronRight,
    IconBooks,
    IconNote,
    IconVideo3
  },

  props: {
    // item: {
    //   type: Object,
    //   required: true,
    //   default: () => {}
    // },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-list-box.scss";
</style>