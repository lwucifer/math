<template>
  <div class="wrap-study-space" v-if="checRoleStudent()">
    <app-dropdown
      position="left"
      v-model="dropdownCourse"
      :content-width="'20rem'"
      class="link--dropdown link--dropdown-course"
    >
      <n-link slot="activator" to="/elearning/mycourses" class="item">
        Góc học tập
        <IconCaretDown width="10" height="10" />
      </n-link>
      <div class="link--dropdown__content">
        <ul>
          <li v-for="(elearning,index) in elearningList" :key="index" v-if="index < 3">
            <n-link :to="'/elearning/'+ elearning.elearning_id">
              <div>
                <div class="d-flex">
                  <img :src="elearning.avatar.low" class="avatar-elearning__study" />
                  <span class="ml-2 name-elearning__study">{{elearning.name}}</span>
                </div>
                <div class="proccess-bar-study-border">
                  <div class="percent-proccess" v-bind:style="{width: elearning.progress +'%'}"></div>
                </div>
                <div>
                  <span>Đã hoàn thành:</span>
                  <strong class="color-primary">{{elearning.progress}}</strong>
                </div>
              </div>
            </n-link>
          </li>
          <li class="text-center">
            <n-link to="/elearning/mycourses">Xem thêm</n-link>
          </li>
        </ul>
      </div>
    </app-dropdown>
  </div>
</template>

<script>
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { isCommonElementIn2Array } from "~/utils/common";
import { USER_ROLES } from "~/utils/constants";
export default {
  data() {
    return {
      dropdownCourse: false,
      elearningList: []
    };
  },
  components: {
    IconCaretDown
  },
  watch: {
    elearningStudyStudent: {
      handler: function() {
        this.elearningList = get(this, "elearningStudyStudent.content", []);
      }
    }
  },
  methods: {
    fetchElearningList() {
      const payload = {
        params: {
          types: "ALL",
          size: 3,
          page: 1
        }
      };
      this.$store.dispatch(
        `elearning/study/study-student/${actionTypes.ELEARNING_STUDY_STUDENT.LIST}`,
        payload
      );
    },
    async fetchProfile() {
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`)
      ]);
    },
    checRoleStudent() {
      let isValid = true;
      isValid = isCommonElementIn2Array(this.userRoles, [
        USER_ROLES.ROLE_STUDENT
      ]);
      return isValid;
    },
    get
  },
  computed: {
    ...mapState("elearning/study/study-student", {
      elearningStudyStudent: "elearningStudyStudent"
    }),
    ...mapState("account", { profile: "profileList" }),
    userRoles() {
      return this.get(this, "profile.role.authority", false) || [];
    }
  },
  async created() {
    this.fetchElearningList();
    await this.fetchProfile();
    this.checRoleStudent();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-study-space.scss";
</style>