<template>
  <div class="evlc-item mt-3">
    <div class="evlc-item__head bg-input-gray">
      <div class="evlc-item__head-left d-inline-flex align-items-center mr-4">
        <IconLibraryBooks class="icon body-1 mr-2 text-primary" />
        Bài 1: {{ get(lesson, "name", "") }}
      </div>
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
import { get } from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    // IconFileAlt,
    // IconAngleDown,
    IconLibraryBooks,
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
