<template>
  <div class="cc-tab-panel">
    <div class="d-flex justify-content-start">
      <app-input
        placeholder="Nhập để tìm kiếm..."
        style="width: 260px"
        @input="handleChangeSearch"
      >
        <template #append-inner
          ><IconSearch2 style="margin: auto 2rem" width="20px" height="20px"
        /></template>
      </app-input>
    </div>

    <div class="clc-table-wrapper">
      <table class="clc-table">
        <thead>
          <tr>
            <th class="font-weight-bold text-dark">Tên file</th>
            <th class="font-weight-bold text-dark">Loại</th>
            <th class="font-weight-bold text-dark">Ngày tháng</th>
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
            <td>{{ get(file, "created_at", "") | moment("DD/MM/YYYY") }}</td>
            <td>
              <a
                @click="handleSelectUrl(file, $event)"
                href="#"
                class="clc-table-action mr-4"
                >Chọn</a
              >
              <a
                class="clc-table-action clc-table-action-delete"
                @click="handleDeleteDocs(file, $event)"
                href="#"
              >
                <IconTrashAlt class="icon" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <app-modal-confirm
        centered
        v-if="showModalConfirm"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancelModal"
      />
    </div>
  </div>
</template>

<script>
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import IconSearch2 from "~/assets/svg/icons/search2.svg?inline";

import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

export default {
  components: {
    IconTrashAlt,
    IconSearch2,
  },

  props: {
    type: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      file_select: null,
      id_file: "",
      showModalConfirm: false,
      confirmLoading: false,
      keyword: "",
    };
  },

  created() {
    useEffect(this, this.handleGetFile.bind(this), ["keyword"]);
  },

  computed: {
    ...mapState("elearning/teaching/repository-files", {
      files: "files",
    }),
  },

  methods: {
    handleSelectUrl(file, e) {
      this.file_select = file;
      this.$emit("handleSelectUrl", file);
      e.preventDefault();
    },
    async handleDeleteDocs(file, e) {
      (this.id_file = get(file, "id", "")), console.log(this.id_file);
      this.showModalConfirm = true;
      e.preventDefault();
    },
    async handleOk() {
      this.confirmLoading = true;
      const options = {
        data: {
          ids: [this.id_file],
        },
      };
      const result = await this.$store.dispatch(
        `elearning/teaching/repository-files/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.DELETE}`,
        options
      );

      this.handleCancelModal();

      if (get(result, "success", false)) {
        this.$toasted.success(get(result, "message", "Thành công"));
        this.handleGetFile();
        return;
      }
      this.$toasted.error(get(result, "message", "Có lỗi xảy ra"));
    },
    handleCancelModal() {
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },
    active(file) {
      return get(this, "file_select.id", "") == get(file, "id", "-1")
        ? "background: #ddd"
        : "";
    },
    handleChangeSearch(keyword) {
      this.keyword = keyword;
    },
    handleGetFile() {
      let params = {
        type: this.type,
        page: 1,
        size: 10,
      };
      if (this.keyword) params.name = this.keyword;
      const options = { params };
      this.$store.dispatch(
        `elearning/teaching/repository-files/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.LIST}`,
        options
      );
    },
    get,
  },
};
</script>
