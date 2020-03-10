<template>
  <aside class="course-create-aside bg-white">
    <ul class="cca-checkbox-list">
      <li
        v-for="item in menu"
        :key="item.key"
        :class="{ active: item.key === active }"
        @click="handleClickMenuItem(item)"
      >
        <app-checkbox
          :value="item.key"
          :checked="item.checked"
          :disabled="true"
        >
          {{ item.title }}
          <span v-if="item.optional" class="cca-sub-text text-sub"
            >(Tùy chọn)</span
          >
        </app-checkbox>
      </li>
    </ul>

    <div class="cca-action">
      <app-button square full-width>Gửi lên</app-button>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import { useEffect } from "~/utils/common";
import { get } from "lodash";

const menu = [
  {
    key: "general",
    title: "Thông tin chung",
    optional: false,
    checked: false
  },
  {
    key: "content",
    title: "Nội dung học tập",
    optional: false,
    checked: false
  },
  {
    key: "settings",
    title: "Cài đặt",
    optional: false,
    checked: false
  },
  {
    key: "exercise",
    title: "Bài tập",
    optional: true,
    checked: false
  },
  {
    key: "exam",
    title: "Bài kiểm tra",
    optional: true,
    checked: false
  }
];

export default {
  props: {
    active: {
      type: String,
      default: "general",
      validator: value =>
        ["general", "content", "settings", "exercise", "exam"].includes(value)
    }
  },

  data() {
    return {
      menu
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    })
  },

  created() {
    useEffect(this, this.handleChangeGeneral.bind(this), ["general.id"]);
  },

  methods: {
    handleClickMenuItem({ key }) {
      this.$emit("click-item", key);
    },

    handleChangeGeneral() {
      const elearning_id = get(this, "$route.query.elearning_id", "");
      if (this.general && elearning_id) this.menu[0].checked = true;
    }
  }
};
</script>

<style></style>
