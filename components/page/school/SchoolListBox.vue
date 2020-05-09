<template>
  <div class="school-list-box">
    <!--List schools-->
    <div class="school-list-box__content">
      <div class="row row--school-list">
        <div
          class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3"
          v-for="(school, index) in schools"
          :key="index"
        >
          <school-item :school="school" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconRight from '~/assets/svg/icons/arrow-forward-ios-24px-outlined.svg?inline';

import SchoolItem from "~/components/page/school/SchoolItem";
import { get, toNumber } from "lodash";
import { SCHOOL_TYPE } from "~/server/fakedata/school/test";

export default {
  components: {
    SchoolItem,
    IconRight
  },

  props: {
    category: {
      type: Object,
      required: true
    },
    schoolSearch: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    schools() {
      const type = get(this, "category.type", "");
      const schoolList = get(this, `schoolSearch.data.content`, []);
      console.log("[schoolList]", schoolList, type);
      return schoolList.filter(sc => sc.type == type) || [];
    },
  },

  methods: {
    showAll() {
      this.$emit("showAll", this.id);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-list-box.scss";
</style>
