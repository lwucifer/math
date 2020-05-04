<template>
  <div class="d-flex align-items-center">
    <input
      v-if="isEditCourseName"
      v-model="courseNameModel"
      ref="inputCourseName"
      class="cc-box__input-title bg-input-gray mb-0"
      type="text"
    />
    <h2 v-else class="cc-box__title heading-6">
      {{ courseNameModel }}
    </h2>

    <template v-if="isEditCourseName">
      <button
        class="cc-box__btn mr-3 text-success"
        @click="handleSaveCourseName"
      >
        Lưu
      </button>
      <button class="cc-box__btn text-gray-2" @click="cancelEditCourseName">
        Huỷ
      </button>
    </template>

    <button v-else class="cc-box__btn cc-box__btn-edit" @click="editCourseName">
      <IconEditAlt class="icon" />
    </button>
  </div>
</template>

<script>
const IconCheck = () => import("~/assets/svg/design-icons/check.svg?inline");
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
const IconTimes = () => import("~/assets/svg/design-icons/times.svg?inline");
import { get } from "lodash";
import { createPayloadAddCourse } from "~/models/course/AddCourse";
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import { useEffect, getParamQuery } from "~/utils/common";

export default {
  components: {
    IconCheck,
    IconEditAlt,
    IconTimes
  },

  props: {
    defaultName: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isEditCourseName: false,
      courseNameModel: get(this, "defaultName", "")
    };
  },

  watch: {
    defaultName: {
      handler: function() {
        this.courseNameModel = this.defaultName;
      },
      deep: true
    }
  },

  methods: {
    editCourseName() {
      this.isEditCourseName = true;
      const timeout = setTimeout(() => {
        this.$refs.inputCourseName.focus();
        clearTimeout(timeout);
      });
    },

    cancelEditCourseName() {
      this.isEditCourseName = false;
      this.courseNameModel = this.defaultName;
    },

    async handleSaveCourseName() {
      const data = {
        name: this.courseNameModel,
        elearning_id: getParamQuery("elearning_id")
      };
      const payload = createPayloadAddCourse(data);
      const result = await this.$store.dispatch(
        `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.ADD}`,
        payload
      );

      if (get(result, "success", false)) {
        this.$toasted.success(get(result, "message", ""));
        this.isEditCourseName = false;
        const options = {
          params: {
            elearning_id: getParamQuery("elearning_id")
          }
        };
        this.$store.dispatch(
          `elearning/creating/creating-general/${actionTypes.ELEARNING_CREATING_GENERAL.LIST}`,
          options
        );
        return;
      }
      this.$toasted.error(get(result, "message", ""));
    }
  }
};
</script>
