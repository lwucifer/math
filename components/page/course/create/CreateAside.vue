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
      <app-button :disabled="!is_submit" square full-width>Gửi lên</app-button>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import { useEffect, getParamQuery } from "~/utils/common";
import { get, toBoolean } from "lodash";
import * as actionTypes from "~/utils/action-types";

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
  data() {
    return {
      menu,
      active: "general"
    };
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general"
    }),
    ...mapState("elearning/creating/creating-progress", {
      progress: "progress"
    }),
    is_submit() {
      return (
        get(this, "progress.data.general_complete", false) &&
        get(this, "progress.data.content_complete", false) &&
        get(this, "progress.data.setting_complete", false)
      );
    }
  },

  created() {
    const elearning_id = getParamQuery("elearning_id");
    const options = {
      params: {
        elearning_id
      }
    };
    this.$store.dispatch(
      `elearning/creating/creating-progress/${actionTypes.ELEARNING_CREATING_PROGRESS}`,
      options
    );
  },

  watch: {
    progress: {
      handler: function() {
        let checked = get(this, "progress.data.general_complete", false);
        this.menu[0]["checked"] = checked;
        checked = get(this, "progress.data.content_complete", false);
        this.menu[1]["checked"] = checked;
        checked = get(this, "progress.data.setting_complete", false);
        this.menu[2]["checked"] = checked;
        checked = get(this, "progress.data.exercise_complete", false);
        this.menu[3]["checked"] = checked;
        checked = get(this, "progress.data.test_complete", false);
        this.menu[4]["checked"] = checked;
      },
      deep: true
    }
  },

  methods: {
    handleClickMenuItem({ key }) {
      if (key === "general") {
        this.active = key;
        this.$emit("click-item", key);
        return;
      }

      if (!get(this, "progress.data.general_complete", false)) return;

      if (key === "content") {
        this.active = key;
        if (get(this, "general.type", "") === "LECTURE") {
          this.$emit("click-item", "content-lecture");
          return;
        }
        if (get(this, "general.type", "") === "COURSE") {
          this.$emit("click-item", "content-course");
          return;
        }
        return;
      }

      if (!get(this, "progress.data.content_complete", false)) return;

      if (key === "settings") {
        this.active = key;
        this.$emit("click-item", key);
        return;
      }

      if (!get(this, "progress.data.setting_complete", false)) return;

      this.active = key;
      this.$emit("click-item", key);
    }
  }
};
</script>

<style></style>
