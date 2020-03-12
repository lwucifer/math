<template>
  <div class="cc-tab-panel">
    <div class="d-flex justify-content-end">
      <app-input
        placeholder="Nhập để tìm kiếm..."
        style="width: 260px"
      ></app-input>
    </div>

    <div class="clc-table-wrapper">
      <table class="clc-table">
        <thead>
          <tr>
            <th>Tên file</th>
            <th>Loại</th>
            <th>Ngày tháng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="file in get(files, 'data.content', [])"
            :key="get(file, 'id', '')"
            :style="active(file)"
          >
            <td>{{ get(file, "name", "") }}</td>
            <td>{{ get(file, "type", "") }}</td>
            <td>{{ get(file, "created_at", "") }}</td>
            <td>
              <a @click="handleSelectUrl(file, $event)" href="#" class="clc-table-action mr-4"
                >Chọn</a
              >
              <a class="clc-table-action clc-table-action-delete">
                <IconTrashAlt class="icon" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import { get } from "lodash";

export default {
  components: {
    IconTrashAlt
  },

  data() {
    return {
      file_select: null
    };
  },

  created() {
    const options = {
      params: {
        type: "VIDEO",
        page: 1,
        size: 10
      }
    };
    this.$store.dispatch(
      `elearning/teaching/repository-files/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.LIST}`,
      options
    );
  },

  computed: {
    ...mapState("elearning/teaching/repository-files", {
      files: "files"
    })
  },

  methods: {
    handleSelectUrl(file, e) {
      this.file_select = file;
      this.$emit("handleSelectUrl", file);
      e.preventDefault();
    },

    active(file) {
      return get(this, "file_select.id", "") == get(file, "id", "-1")
        ? "background: #ddd"
        : "";
    },

    get
  }
};
</script>
