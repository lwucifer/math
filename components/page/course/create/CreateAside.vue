<template>
  <aside class="course-create-aside bg-white">
    <ul class="cca-checkbox-list">
      <li v-for="item in menu" :key="item.key" :class="{ 'active': item.key === active }" @click="handleClickMenuItem(item)">
        <app-checkbox :value="item.key">
          {{ item.title }}
          <span v-if="item.optional" class="cca-sub-text text-sub">(Tùy chọn)</span>
        </app-checkbox>
      </li>
    </ul>

    <div class="cca-action">
      <app-button square full-width>Gửi lên</app-button>
    </div>
  </aside>
</template>

<script>
const menu = [
  {
    key: 'general',
    title: "Thông tin chung",
    optional: false,
    checked: true,
  },
  {
    key: 'content',
    title: "Nội dung học tập",
    optional: false,
    checked: true,
  },
  {
    key: 'settings',
    title: "Cài đặt",
    optional: false,
    checked: true,
  },
  {
    key: 'exercise',
    title: "Bài tập",
    optional: true,
    checked: true,
  },
  {
    key: 'exam',
    title: "Bài kiểm tra",
    optional: true,
    checked: true,
  }
];

export default {
  props: {
    active: {
      type: String,
      default: 'general',
      validator: value => ['general', 'content', 'settings', 'exercise', 'exam'].includes(value)
    }
  },

  data() {
    return {
      menu
    };
  },

  methods: {
    handleClickMenuItem({ key }) {
      this.$emit('click-item', key)
    }
  }
};
</script>

<style>
</style>