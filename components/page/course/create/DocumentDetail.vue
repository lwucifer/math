<template>
  <div
    class="clc-choosen-doc-item d-flex align-items-center justify-content-between mb-3"
  >
    <span class="text-sub d-flex align-items-center">
      <IconFileBlank class="icon body-1 mr-2" />{{ get(doc, "name", "") }}
      (25.6kB)
    </span>

    <a href @click="handleDeleteDoc($event)">
      <IconTrashAlt class="icon subheading fill-secondary" />
    </a>
  </div>
</template>

<script>
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
const IconFileBlank = () =>
  import("~/assets/svg/design-icons/file-blank.svg?inline");
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    IconTrashAlt,
    IconFileBlank
  },

  props: {
    doc: {
      type: Object
    }
  },

  methods: {
    async handleDeleteDoc(e) {
      e.preventDefault();
      const doc_id = get(this, "doc.id", "");
      const options = {
        data: {
          id: doc_id
        }
      };
      const result = await this.$store.dispatch(
        `elearning/creating/creating-doc/${actionTypes.ELEARNING_CREATING_DOC.DELETE}`,
        options
      );
      if (get(result, "success", false)) {
        this.$toasted.success(get(result, "message", ""));
        this.$emit("handleRefreshDocs");
        return;
      }
      this.$toasted.error(get(result, "message", ""));
    },

    get
  }
};
</script>
