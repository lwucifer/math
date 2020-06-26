<template>
  <app-modal
    centered
    :width="600"
    :component-class="{ 'invite-student-modal': true }"
    :footer="false"
    title="Mời thêm học sinh"
    @close="close(false)"
  >
    <div slot="content">
      <div>
        <p>
          Gửi lời mời tham gia
          <b>{{title}}</b> của bạn tới học sinh trong trường THCS Nguyễn Trãi
        </p>
        <div class="mt-4 d-flex-center">
          <strong class="pr-4">Chọn lớp</strong>
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
          <app-checkbox class="ml-auto" @click="handleAllCheckbox" :checked="checkAll">
            <strong>Chọn tất cả danh sách</strong>
          </app-checkbox>
        </div>
        <div class="item" v-for="(item, index) in studentList ? studentList : []" :key="index">
          <app-checkbox
            class="ml-auto"
            @click="handleCheckbox(item.id)"
            :checked="arrMember.includes(item.id)"
          >{{item.name}}</app-checkbox>
        </div>
      </div>
      <div class="text-center mt-4">
        <app-button color="white" class="mr-4 pl-5 pr-5" square @click="close(false)">Hủy</app-button>
        <app-button square @click="hanldeInvate" class="pl-5 pr-5">Mời</app-button>
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
  props: {
    title: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      arrMember: [],
      classSelected: null,
      classList: [],
      studentList: [],
      checkAll: false,
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
        const com = result ? '","' : "";
        return (result = result + com + item);
      }, "");
    },

    async hanldeInvate() {
      if (this.arrMember.length > 0) {
        const online_class_id = this.$route.params.id
          ? this.$route.params.id
          : "";
        let params = {
          online_class_id: online_class_id,
          student_ids: [...this.arrMember]
        };
        try {
          await this.$store.dispatch(
            `${STORE_TEACHING_OLCLASS}/${actionTypes.TEACHING_OLCLASS_INVITES.ADD}`,
            params
          );
        } catch (e) {
        } finally {
          this.close(true);
        }
      }
    },

    async handleChangedClass() {
      this.checkAll = false;
      let params = {
        class_id: this.classSelected.value,
        size: 9999
      };
      try {
        await this.$store.dispatch(
          `${STORE_SCHOOL_STUDENT}/${actionTypes.SCHOOL_STUDENTS.LIST}`,
          params
        );
        this.studentList = this.get(
          this.stateSchoolStudents,
          "data.content",
          []
        );
      } catch (e) {
      } finally {
      }
    },

    handleAllCheckbox() {
      this.checkAll = !this.checkAll;
      this.$nextTick(() => {
        if (this.checkAll) {
          this.arrMember = this.studentList.map(item => item.id);
        } else {
          this.arrMember = [];
        }
      });
    },

    handleCheckbox(_id) {
      if (this.arrMember.includes(_id)) {
        this.arrMember = this.arrMember.filter(item => item !== _id);
      } else {
        this.arrMember.push(_id);
      }

      this.checkAll && (this.checkAll = false);
      this.$nextTick(() => {
        this.arrMember.length === this.studentList.length &&
          (this.checkAll = true);
      });
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
@import "~/assets/scss/components/elearning/olclass/invite-student.scss";
</style>