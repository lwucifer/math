<template>
  <div class="course-item2">
    <div class="course-item2__image">
      <img :src="get(item, 'avatar.medium', '')" alt class="w-100" />
      <div
        class="status-online"
        v-if="get(item, 'onlineStatus', '') && get(item, 'online', 0) === 1"
      >
        {{ get(item, "onlineStatus", "") }}
      </div>
      <div class="online" v-if="get(item, 'online', 0)">Trực tiếp</div>
      <div class="video" v-if="get(item, 'video', '')">
        <IconVideo3 />
      </div>
    </div>
    <div class="bottom">
      <n-link
        class="title"
        v-if="get(item, 'name', '')"
        :to="'/elearning/' + get(item, 'id', '')"
        >{{ get(item, "name", "") }}</n-link
      >

      <div class="course-item2_teacher">
        <div>
          <app-avatar
            :src="get(item, 'teacher.avatar.medium', '')"
            :size="20"
          />
          <span class="name">{{ get(item, "teacher.name", "") }}</span>
        </div>
        <div>
          <div class="stars">
            <app-stars :stars="get(item, 'review_rate', 0)" />
          </div>
          <span>
            <strong>{{ get(item, "review_rate", 0) }}</strong>
            ({{ get(item, "review_count", 0) }})
          </span>
        </div>
        <div class="price-wrapper">
          <span v-if="get(item, 'price.original_price', 0)" class="price">
            {{ numeral(get(item, "price.original_price", 0)).format() }}đ
          </span>
          <span v-else class="price price--free">
            Miễn phí
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { assignIn, get } from "lodash";
import IconChevronLeft from "~/assets/svg/icons/chevron-left.svg?inline";
import IconChevronRight from "~/assets/svg/icons/chevron-right.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import IconNote from "~/assets/svg/icons/note.svg?inline";
import IconVideo3 from "~/assets/svg/icons/video3.svg?inline";
import numeral from "numeral";

export default {
  components: {
    IconChevronLeft,
    IconChevronRight,
    IconBooks,
    IconNote,
    IconVideo3
  },

  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  methods: {
    get,
    numeral
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-item2.scss";
</style>
