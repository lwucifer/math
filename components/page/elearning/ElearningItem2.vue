<template>
  <div class="elearning-item2">
    <div class="elearning-item2__image">
      <!-- <img class="d-block w-100" :src="get(info, 'avatar.low', '')" alt /> -->
      <img class="d-block w-100" :src="`https://picsum.photos/330/204`" alt />
      <div class="status-online" v-if="item.onlineStatus && item.online === 1">{{item.onlineStatus}}</div>
      <div class="online" v-if="item.online">Trực tiếp</div>
      <div class="video" v-if="item.video">
        <IconVideo3 />
      </div>
    </div>
    <div class="bottom">
      <div class="elearning-item2__title">
        <n-link :to="`/elearning/${item.id}`">{{ item.name }}</n-link>
      </div>

      <div class="elearning-item2_teacher">
        <div>
          <app-avatar :src="get(item, 'teacher.avatar.low', '')" :size="20" />
          <span class="name">{{ get(item, 'teacher.name', '') }}</span>
        </div>
        <div>
          <div class="stars">
            <app-stars :stars="Math.floor(item.review_rate || 0)" />
          </div>
          <span>
            <strong>{{ item.review_rate || 0}}</strong>
            ({{ item.review_count || 0 }})
          </span>
        </div>

        <div v-if="item.free" class="text-sub justify-content-end">Miễn phí</div>
        <div v-else class="price">{{ get(item, 'price.original_price', 0) }}đ</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import IconVideo3 from "~/assets/svg/icons/video3.svg?inline";

export default {
  components: {
    IconVideo3
  },

  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-item2.scss";
</style>