
<template>
  <div class="container">
    <breadcrumb />

    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="6" />
      </div>
      <div class="col-md-9">
        <sub-block-section title="Tương tác với học sinh">
          <template #content>
            <div
              class="elearning-manager-content__title mb-4 justify-content-between align-items-center"
            >
              <div class="elearning-manager-content__title__nav">
                <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">HỎI ĐÁP</a>
                <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">THÔNG BÁO</a>
              </div>

              <app-button
                nuxt
                :to="'/elearning/manager/interacts/createnotify'"
                v-if="tab == 2"
                class="make-noti-button btn--color-info"
              >
                <IconPlusCircle class="mr-2" />Tạo thông báo
              </app-button>
            </div>

            <div class="elearning-manager-content__main">
              <keep-alive>
                <component v-bind:is="currentTabComponent"></component>
              </keep-alive>
            </div>
          </template>
        </sub-block-section>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
const QATab = () => import("./tabs/QA");
const NotifyTab = () => import("./tabs/notify");
const STORE_NAME_INTERACTS = "elearning/teaching/interactive-listquestion";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";
export default {
  layout: "manage",

  components: {
    ElearningManagerSide,
    QATab,
    NotifyTab,
    IconPlusCircle
  },
  async fetch({ params, store, query }) {
    const userId = 14;
    await Promise.all([
      store.dispatch(
        `${STORE_NAME_INTERACTS}/${actionTypes.TEACHING_INTERACTIVE_LISTQUESTION.LIST}`
      ),
      store.dispatch(
        `${STORE_PUBLIC_SEARCH}/${actionTypes.ELEARNING_PUBLIC_SEARCH.DETAIL}`,
        { userId }
      )
    ]);
  },
  data() {
    return {
      tab: 1,
      isAuthenticated: true
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_PUBLIC_SEARCH, ["Lessons"]),

    currentTabComponent: function() {
      // List of tabs
      const MATCHED_TABS = ["QATab", "NotifyTab"];
      return this.tab > 0 ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0];
    }
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    }
  }
};
</script>

<style lang="scss" scoped>
.make-noti-button {
  height: 32px;

  &:hover {
    background: #14bff4 !important;
  }
}
</style>