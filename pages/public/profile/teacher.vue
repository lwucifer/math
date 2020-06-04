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
          <div v-if="description" v-html="description" class="dont-break-out teacher-story"></div>
          <div v-else class="text-center caption text-gray-2">Chưa có nội dung.</div>

          <div class="text-center mt-3" v-if="load_more">
            <a @click="handleLoadMore" class="btn-load-more">Xem thêm</a>
          </div>

          <div class="text-center mt-3" v-if="hide_description">
            <a @click="handleCompact" class="btn-load-more">Rút gọn</a>
          </div>
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
        lengthDescription: 300,
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
      description() {
        let string = get(this, "teacher.biography", "").substring(
          0,
          this.lengthDescription
        );
        if (this.load_more) string += "...";
        return string;
      },
      load_more() {
        return get(this, "teacher.biography.length", 0) > this.lengthDescription;
      },
      hide_description() {
        return (
          this.lengthDescription == get(this, "teacher.biography.length", 0) &&
          get(this, "teacher.biography.length", 0) > 300
        );
      },
    },
    methods: {
      handleLoadMore() {
        this.lengthDescription = get(this, "teacher.biography.length", 0);
      },
      handleCompact() {
        this.lengthDescription = 300;
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
