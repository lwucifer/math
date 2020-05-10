<template>
  <div class="box11 mb-4 pb-0">
    <h6>Phòng học online</h6>
    <div
      v-for="(item, index) in get(info, 'ol_classes', [])"
      :key="index"
      class="elearning-lesson-side__class"
    >
      <div class="d-flex">
        <span>{{ index }}. {{ item.name }}</span>
        <!-- <app-checkbox v-model="item.status" class="ml-auto" /> -->
      </div>
      <div class="d-flex-center mt-3">
        <div class="color-999 d-flex-center" v-if="item.status">
          <IconPlay class="mr-2" />
          <span>Đang diễn ra</span>
        </div>
        <!-- <div class="d-flex-center color-red ml-auto" v-if="item.done">
            <IconFileCheck class="mr-2 fill-red" height="16" width="16" />
            <span>Làm bài tập</span>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import IconPlay from "~/assets/svg/icons/play.svg?inline";
import { get } from "lodash";
import { mapState } from 'vuex';


export default {
  components: {
    IconPlay,
  },

  computed: {
    ...mapState("elearning/study/study-info", ["info"]),
  },

  methods: { get },
};
</script>
