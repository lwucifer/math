<template>
  <div>
    <app-input
      v-if="isEditCourseName"
      v-model="courseNameModel"
      ref="inputCourseName"
      class="cc-box__input-title mb-0 w-100"
      size="sm"
      type="text"
    />
    <h2 v-else class="cc-box__title heading-6">
      {{ courseNameModel }}
    </h2>

    <template v-if="isEditCourseName">
      <button
        class="cc-box__btn mr-2 text-success"
        @click="handleSaveCourseName"
      >
        <IconCheck class="icon" />
      </button>
      <button class="cc-box__btn text-error" @click="cancelEditCourseName">
        <IconTimes class="icon" />
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
      courseNameModel: ""
    };
  },

  created() {
    useEffect(this, this.handleChangeDefaultName.bind(this), ["defaultName"]);
  },

  methods: {
    handleChangeDefaultName() {
      this.courseNameModel = this.defaultName;
    },

    editCourseName() {
      this.isEditCourseName = true;
      const timeout = setTimeout(() => {
        this.$refs.inputCourseName.focus();
        clearTimeout(timeout);
      });
    },

    cancelEditCourseName() {
      this.isEditCourseName = false;
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
