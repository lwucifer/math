<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3" />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <head-tabs
              :title="'Bài tập và bài kiểm tra'"
              :tabs="tabs"
              :active.sync="tab"
              @selectedItem="changeTab"
            />
          </div>

          <div class="elearning-manager-content__main">
            <keep-alive>
              <component v-bind:is="currentTabComponent"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import HeadTabs from "~/components/page/elearning/HeadTab";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

const ExerciseTab = () => import("./tabs/exercise");
const ExamTab = () => import("./tabs/exam");

export default {
  layout: "manage",

  components: {
    ElearningManagerSide,
    ExerciseTab,
    ExamTab,
    HeadTabs
  },

  data() {
    return {
      tab: 'exercise',
      tabs: [
        {
          key: 'exercise',
          text: 'Bài tập'
        },
        {
          key: 'exam',
          text: 'Bài kiểm tra'
        },
      ],
      isAuthenticated: true,
    }
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    currentTabComponent: function() {
      const MATCHED_TABS = {
        exercise: 'ExerciseTab',
        exam: 'ExamTab'
      }
      return MATCHED_TABS[this.tab]
    }
  },

  methods: {
    changeTab(key) {
      this.tab = key
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>