<template>
  <app-modal centered :width="420" :component-class="{ 'invite-student-modal': true }">
    <div slot="content">
      <div class="text-center">
        <h5 class="color-primary mb-2">Mời thêm học sinh</h5>
        <p>Gửi lời mời tham gia bài giảng/ khoá học của bạn tới học sinh trong trường THCS Nguyễn Trãi</p>
        <div class="mt-4 d-flex-center justify-content-center">
          <span class="pr-4">Chọn lớp</span>
          <app-vue-select
            class="app-vue-select filter-form__item__selection"
            style="width: 19rem"
            v-model="classSelected"
            :options="classList"
            label="text"
            placeholder="Chọn lớp"
            searchable
            clearable
            @input="handleChangedClass"
          ></app-vue-select>
        </div>
      </div>

      <div class="student-list">
        <div class="item">
          <app-checkbox class="ml-auto" @change="handelAllCheckbox" />
          <strong>Chọn tất cả danh sách</strong>
        </div>
        <div class="item" v-for="(item, index) in studentList ? studentList : []" :key="index">
          <app-checkbox
            class="ml-auto"
            @change="handelCheckbox(item.id)"
            :checked="arrMember.includes(item.id)"
          />
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="text-center mt-4">
        <app-button size="sm" color="info" class="mr-3" square @click="close(false)">Hủy</app-button>
        <app-button size="sm" square @click="hanldeInvate">Mời</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { useEffect, getParamQuery } from "~/utils/common";

const STORE_TEACHING_OLCLASS = "elearning/teaching/olclass";
const STORE_SCHOOL_CLASSES = "elearning/school/school-classes";
const STORE_SCHOOL_STUDENT = "elearning/school/school-student";

export default {
  components: {},

  data() {
    return {
      arrMember: [],
      name: "",
      classSelected: null,
      classList: [],
      studentList: [],
      invateStudent: {
        invitation_ids: ["string"],
        online_class_id: "string",
        student_ids: ["string"]
      }
    };
  },

  methods: {
    close(invite) {
      this.$emit("close", invite);
    },

    arrayToStringIds(data) {
      return data.reduce((result, item) => {
        const com = result ? ',' : '';
        return result = result + com + item.id;
      }, '')
    },

    async hanldeInvate() {
      if (this.studentList.length > 0) {
        const online_class_id = this.$route.params.id ? this.$route.params.id : "";
        let params = {
          online_class_id: online_class_id,
          student_ids: [this.arrayToStringIds(this.studentList)]
        };
        try {
          await this.$store.dispatch(
            `${STORE_TEACHING_OLCLASS}/${actionTypes.TEACHING_OLCLASS_INVITES.ADD}`,
            params
          );
        } catch (e) {
        } finally {
          this.close(true)
        }
      }
    },

    async handleChangedClass() {
      let params = {
        class_id: this.classSelected.value,
        size: 999
      };
      try {
        await this.$store.dispatch(
          `${STORE_SCHOOL_STUDENT}/${actionTypes.SCHOOL_STUDENTS.LIST}`,
          params
        );
        this.studentList = this.get(this.stateSchoolStudents, "data.content", []);
      } catch (e) {
      } finally {
      }
    },

    handelAllCheckbox(checked) {
      if (checked) {
        this.arrMember = this.studentList.map(item => item.id);
      } else {
        this.arrMember = [];
      }
    },
    handelCheckbox(_id) {
      if (this.arrMember.includes(_id)) {
        this.arrMember = this.arrMember.filter(item => item !== _id);
      } else {
        this.arrMember.push(_id);
      }
    },

    async getSchoolClasses() {
      try {
        await this.$store.dispatch(
          `${STORE_SCHOOL_CLASSES}/${actionTypes.SCHOOL_CLASSES.LIST}`
        );
        let lessonList = this.get(this.stateSchoolClasses, "data.content", []);
        let list = [];
        lessonList.forEach(element => {
          list.push({
            value: element.id,
            text: element.name
          });
        });
        this.classList = list;
      } catch (e) {
      } finally {
      }
    },

    get
  },

  computed: {
    ...mapState(STORE_SCHOOL_CLASSES, {
      stateSchoolClasses: "schoolClasses"
    }),
    ...mapState(STORE_SCHOOL_STUDENT, {
      stateSchoolStudents: "schoolStudents"
    })
  },

  created() {
    this.getSchoolClasses();
  }
};
</script>

<style lang="scss">
.invite-student-modal .app-modal-content {
  padding: 2rem 1.5rem;
}
.student-list {
  background: #fbfbfb;
  padding: 1.2rem 1.5rem;
  margin-top: 2rem;
  .item {
    display: block;
    margin-bottom: 1rem;
    .app-checkbox {
      display: inline-block;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
}
</style>