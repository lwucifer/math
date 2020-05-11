<template>
  <aside class="course-create-aside bg-white">
    <h4 class="cca-title">Đề mục</h4>

    <ul class="cca-checkbox-list">
      <li
        v-for="item in menu"
        :key="item.key"
        :class="{ active: item.key === active }"
        @click="handleClickMenuItem(item)"
      >
        <app-checkbox-circle
          :value="item.key"
          :checked="item.checked"
          :disabled="false"
        >
          {{ item.title }}
          <span v-if="item.optional" class="cca-sub-text text-sub"
            >(Tùy chọn)</span
          >
        </app-checkbox-circle>
      </li>
    </ul>

    <div class="cca-action">
      <app-button
        :disabled="!is_submit"
        @click="handlePublishCourse"
        square
        full-width
        >Gửi lên</app-button
      >
    </div>

    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    />
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
    checked: true,
  },
  {
    key: "content",
    title: "Nội dung học tập",
    optional: false,
    checked: false,
  },
  {
    key: "settings",
    title: "Cài đặt",
    optional: false,
    checked: false,
  },
  {
    key: "exercise",
    title: "Bài tập",
    optional: true,
    checked: false,
  },
  {
    key: "exam",
    title: "Bài kiểm tra",
    optional: true,
    checked: false,
  },
];

export default {
  data() {
    return {
      menu,
      active: this.formActive,
      showModalConfirm: false,
      confirmLoading: false,
    };
  },

  props: {
    formActive: String,
  },

  computed: {
    ...mapState("elearning/creating/creating-general", {
      general: "general",
    }),
    ...mapState("elearning/creating/creating-progress", {
      progress: "progress",
    }),
    is_submit() {
      return (
        get(this, "progress.data.general_status", -1) == 1 &&
        get(this, "progress.data.content_status", -1) == 1 &&
        get(this, "progress.data.setting_status", -1) == 1
      );
    },
  },

  mounted() {
    const elearning_id = getParamQuery("elearning_id");
    const options = {
      params: {
        elearning_id,
      },
    };
    this.$store.dispatch(
      `elearning/creating/creating-progress/${actionTypes.ELEARNING_CREATING_PROGRESS}`,
      options
    );
  },

  watch: {
    progress: {
      handler: function() {
        let checked = get(this, "progress.data.general_status", false) == 1;
        this.menu[0]["checked"] = checked;
        checked = get(this, "progress.data.content_status", false) == 1;
        this.menu[1]["checked"] = checked;
        checked = get(this, "progress.data.setting_status", false) == 1;
        this.menu[2]["checked"] = checked;
        checked = get(this, "progress.data.exercise_status", false) == 1;
        this.menu[3]["checked"] = checked;
        checked = get(this, "progress.data.test_status", false) == 1;
        this.menu[4]["checked"] = checked;
      },
      deep: true,
    },
    formActive: {
      handler: function() {
        if (this.formActive === "content-lecture") {
          this.active = "content";
          return;
        }
        if (this.formActive === "content-course") {
          this.active = "content";
          return;
        }
        this.active = this.formActive;
      },
      deep: true,
    },
  },

  methods: {
    handlePublishCourse() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;

      const elearning_id = getParamQuery("elearning_id");
      const data = {
        elearning_id,
      };

      const res = await this.$store.dispatch(
        `elearning/creating/creating-publish/${actionTypes.ELEARNING_CREATING_PUBLISH.POST}`,
        data
      );

      this.handleCancel();

      if (get(res, "success", false)) {
        this.$toasted.success("success");
        this.$router.push("/elearning/manager/courses");
        return;
      }

      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },

    handleCancel() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    handleClickMenuItem({ key }) {
      if (key === "general") {
        this.active = key;
        this.$emit("click-item", key);
        return;
      }

      if (!get(this, "progress.data.general_status", false) == 1) return;

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

      if (!get(this, "progress.data.content_status", false) == 1) return;

      if (key === "settings") {
        this.active = key;
        this.$emit("click-item", key);
        return;
      }

      this.active = key;
      this.$emit("click-item", key);
    },
  },
};
</script>
