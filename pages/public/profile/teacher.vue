<template>
  <div class="container teacher-profile">
    <div v-if="pageLoading" class="teacher-profile__overview mb-3">
      <div class="bg-white px-3"><VclFacebook :height="100"/></div>
    </div>
    
    <div v-else class="teacher-profile__overview">
      <ProfileTeacherHead :info="teacher"/>
      <app-divider class="my-4"/>
      <div class="">
        <p class="mb-3"><span class="h5">Thông tin giáo viên</span></p>
        <div>
          <p v-if="!readMoreActivated" class="teacher-story">{{get(teacher, 'biography', '').slice(0,300)}}</p>
          <p class="text-center">
            <a
              v-if="!readMoreActivated"
              class="text-decoration-none font-weight-normal"
              href="#"
              v-on:click="activeReadMore">
              Xem thêm
            </a>
          </p>
          <p v-if="readMoreActivated" class="teacher-story" v-html="get(teacher, 'biography', '')"></p>
        </div>
      </div>
    </div>
    
    <!--slide-->
    <div v-if="pageLoading" class="container">
      <div class="row">
        <div v-for="i in 4" :key="i" class="col-md-3 mb-6">
          <div class="bg-white py-6 px-3">
            <VclList/>
          </div>
        </div>
      </div>
    </div>
    <ProfileSliderTab
      v-else
      :items="get(elearnings, 'content', [])"
      :name="`Bài học và khóa giảng (${get(elearnings, 'page.total_elements', 0)})`"
    />
  </div>
</template>

<script>
  import ProfileTeacherHead from "~/components/page/profile/teacher/ProfileTeacherHead";
  import ProfileSliderTab from "~/components/page/profile/ProfileSliderTab";
  import CourseItem2 from "~/components/page/course/CourseItem2";
  import {VclFacebook, VclList} from "vue-content-loading";
  import {mapState} from "vuex";
  import * as actionTypes from "~/utils/action-types";
  import {get} from "lodash"
  
  export default {
    // layout:"backhome",
    data() {
      return {
        pageLoading: true,
        courseLoading: false,
        infoTeacher: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus accumsan quam non tempus. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        readMoreActivated: false,
      }
    },
    async fetch({params, query, store}) {
      const userId = query.user_id
      const getProfile = () =>
        store.dispatch(
          `elearning/public/public-elearning-teacher/${actionTypes.ELEARNING_PUBLIC_ELEARNING_TEACHER.LIST}`,
          {
            params: {
              teacher_id: userId
            }
          }
        );
      
      const getElearnings = () =>
        store.dispatch(
          `elearning/public/public-teacher-els/${actionTypes.ELEARNING_PUBLIC_TEACHER_ELS.LIST}`,
          {
            params: {
              teacher_id: userId,
              size: 16,
              page: 1
            }
          }
        );
      
      return await Promise.all([
        getProfile(),
        getElearnings()
      ])
    },
    components: {
      ProfileTeacherHead,
      ProfileSliderTab,
      CourseItem2,
      VclFacebook,
      VclList
    },
    computed: {
      ...mapState("elearning/public/public-elearning-teacher", ["teacher"]),
      ...mapState("elearning/public/public-teacher-els", ["elearnings"]),
    },
    methods: {
      activeReadMore() {
        this.readMoreActivated = true;
      },
      get
    },
    mounted() {
      this.pageLoading = false;
    },
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/profile/_profile-teacher.scss";
</style>