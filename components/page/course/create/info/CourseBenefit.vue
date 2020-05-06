<template>
  <div class="cgi-form-group mb-4">
    <h2 class="cgi-form-title heading-6 mb-3">
      Lợi ích từ {{ name }}
      <span class="text-sub caption font-weight-normal"
        >(Tối thiểu tổng 300 ký tự)</span
      >
    </h2>

    <div class="row">
      <div v-for="(item, index) in benefit" class="col-md-6 mb-15" :key="index">
        <div class="cgi-demo-benefit d-flex">
          <IconCheckCircle class="icon body-1 mr-2" />
          <p v-html="item" />
          <a
            href
            class="text-decoration-none body-1 ml-2 text-error"
            @click.prevent="removeBenefit(index)"
          >
            <IconTrashAlt class="icon" />
          </a>
        </div>
      </div>
    </div>

    <div v-if="benefit.length < 10" class="d-flex">
      <app-editor-menu-bubble
        class="bg-input-gray mb-3 flex-grow"
        placeholder="Nhập lợi ích từ khoá học"
        v-model="benefitEditorValue"
        @onBlur="handleBlur"
      />
      <app-button
        square
        class="font-weight-normal body-2"
        @click="addBenefit(benefitEditorValue)"
        >Thêm</app-button
      >
    </div>
    <span class="text-error">{{ error }}</span>
  </div>
</template>

<script>
import { useEffect } from "~/utils/common";
const IconCheckCircle = () =>
  import("~/assets/svg/icons/check-circle.svg?inline");
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");

export default {
  components: {
    IconCheckCircle,
    IconTrashAlt,
  },

  props: {
    name: {
      type: String,
      default: "",
    },
    benefit: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      benefitEditorValue: "",
      error: "",
    };
  },

  watch: {
    benefit: {
      handler: function() {
        if (!this.benefit.length) {
          this.error = "Chưa thêm lợi ích";
        } else {
          this.error = "";
        }
      },
      deep: true,
    },
  },

  methods: {
    handleBlur() {
      if (!this.benefit.length) {
        this.error = "Chưa thêm lợi ích";
      } else {
        this.error = "";
      }
    },

    removeBenefit(index) {
      this.$emit("removeBenefit", index);
    },

    addBenefit(html) {
      if (this.benefit.length < 10 && this.benefitEditorValue) {
        this.$emit("addBenefit", html);
        this.benefitEditorValue = "";
      }
    },
  },
};
</script>
