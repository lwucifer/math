<template>
  <div class="container school-manager">
    <div class="row">
      <div class="col-md-3">
        <menu-aside
          :actived="actived"
          @selectMenu="changeContent"
        />
      </div>
      <div class="col-md-9">
        <div class="manager-content">
          <keep-alive>
            <component
              :is="currentComponent"
            >
            </component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuAside from "~/components/page/district-department/school/MenuAside";

  // Import faked data
  import { SCHOOL } from "~/server/fakedata/school/test";
  import { mapState } from "vuex";

  export default {
    name: "SchoolDetail",

    components: {
      MenuAside,
      Overview: () => import('~/components/page/district-department/school/Overview'),
      Course: () => import('~/components/page/district-department/school/Course'),
      TeacherResume: () => import('~/components/page/district-department/school/TeacherResume'),
      TeacherTask: () => import('~/components/page/district-department/school/TeacherTask'),
      Field: () => import('~/components/page/district-department/school/Field'),
      Classroom: () => import('~/components/page/district-department/school/Classroom'),
      Student: () => import('~/components/page/district-department/school/Student'),
    },

    data() {
      return {
        school: SCHOOL,
        actived: 'overview'
      };
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      currentComponent: function() {
        const MATCHED_COMPONENTS = {
          overview: 'Overview',
          course: 'Course',
          'teacher-resume': 'TeacherResume',
          'teacher-task': 'TeacherTask',
          field: 'Field',
          classroom: 'Classroom',
          student: 'Student'
        }
        return MATCHED_COMPONENTS[this.actived]
      }
    },
    methods: {
      changeContent(data) {
        this.actived = data
      }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/district-department/_school.scss";
</style>