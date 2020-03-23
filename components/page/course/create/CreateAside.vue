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
import { useEffect, getParamQuery } from "~/utils/common";
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
  // props: {
  //   active: {
  //     type: String,
  //     default: "general",
  //     // validator: value =>
  //     //   ["general", "content", "settings", "exercise", "exam"].includes(value)
  //   }
  // },

  data() {
    return {
      menu,
      active: 'general'
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    }),
    ...mapState("elearning/creating/creating-lesson", {
      lessons: "lessons"
    }),
    ...mapState("elearning/creating/creating-setting", {
      setting: "setting"
    })
  },

  created() {
    useEffect(this, this.handleChangeGeneral.bind(this), ["general.id"]);
    useEffect(this, this.handleChangeSetting.bind(this), ["setting"]);
    useEffect(this, this.handleChangeLesson.bind(this), [
      "lessons"
    ]);
  },

  methods: {
    handleClickMenuItem({ key }) {
      this.active = key
      const elearning_id = getParamQuery("elearning_id");
      if (key === "general") {
        this.$emit("click-item", key);
      }
      if (get(this, "general", null) && key === "content") {
        this.active = 'content'
        if (get(this, "general.type", "") === "LECTURE") {
          this.$emit("click-item", 'content-lecture');
          return;
        }
        if (get(this, "general.type", "") === "COURSE") {
          this.$emit("click-item", 'content-course');
          return;
        }
      }
      if (get(this, "lessons.data.length", 0) && key === "settings") {
        this.$emit("click-item", key);
      }
      if (get(this, "setting", null) && key === "exercise") {
        this.$emit("click-item", key);
      }
      if (get(this, "setting", null) && key === "exam") {
        this.$emit("click-item", key);
      }
    },

    handleChangeSetting() {
      if (get(this, "setting", null)) {
        this.menu[2].checked = true;
        return;
      }
      this.menu[2].checked = false;
    },

    handleChangeLesson() {
      if (get(this, "lessons", 0)) {
        this.menu[1].checked = true;
        return;
      }
      this.menu[1].checked = false;
    },

    handleChangeGeneral() {
      if (this.general) {
        this.menu[0].checked = true;
        return;
      }
      this.menu[0].checked = false;
    }
  }
};
</script>

<style></style>
