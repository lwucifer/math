<template>
  <div class="evlc-item mt-3">
    <div class="evlc-item__head bg-input-gray">
      <div class="evlc-item__head-left d-inline-flex align-items-center mr-4">
        <IconPlay width="16px" height="16px"
          v-if="lesson.type == 'VIDEO'"
          class="mr-2 fill-primary"/>

        <IconLibraryBooks width="16px" height="16px"
          v-else
          class="mr-2 fill-primary" />
          
        Bài 1: {{ get(lesson, "name", "") }}
      </div>
      <div class="ml-auto">{{ get(lesson, "duration", "01:00") }}</div>
      <!-- <div class="evlc-item__head-right ml-auto">
        <button class="evlc-item__btn evlc-item__btn-collapse active">
          <IconAngleDown class="icon" />
        </button>
      </div>-->
    </div>

    <!-- <div class="evlc-item__body bg-input-gray">
      <div class="d-flex align-items-center text-error py-3">
        <IconFileAlt class="icon subheading mr-2" />Bài tập số 1
      </div>
      <app-divider class="my-0" />
      <div class="d-flex align-items-center text-error py-3">
        <IconFileAlt class="icon subheading mr-2" />Bài tập số 2
      </div>
    </div>-->
  </div>
</template>

<script>
// const IconFileAlt = () =>
//   import("~/assets/svg/design-icons/file-alt.svg?inline");
// import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconLibraryBooks from "~/assets/svg/icons/library-books.svg?inline";
import IconPlay from '~/assets/svg/icons/play.svg?inline';
import { get } from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    // IconFileAlt,
    // IconAngleDown,
    IconLibraryBooks,
    IconPlay
  },
  methods: {
    get,
  },
  computed: {
    ...mapState("elearning/detail", {
      program: "program",
    }),
    lesson() {
      return get(this, "program.0.lessons.0", null);
    },
  },
};
</script>
