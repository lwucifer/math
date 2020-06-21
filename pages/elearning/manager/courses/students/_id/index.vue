<template>
  <div class="container">
    <breadcrumb />
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <sub-block-section :title="get(progress, 'name', '')" has-icon>
          <template v-slot:content>
            <div class="d-flex">
              <h5 class="text-primary">Thông tin học sinh</h5>
              <app-button
                v-if="!get(progress, 'is_banned', false)"
                square
                color="secondary"
                size="sm"
                class="btn-block__manager-student"
                @click="bannedStudent(get(progress, 'is_banned', false))"
              >
                <IconBlock24px class="icon mr-2" />Cấm học sinh này
              </app-button>
              <app-button
                v-else
                square
                color="primary"
                size="sm"
                class="btn-unblock__manager-student"
                @click="bannedStudent"
              >
                <IconBlock24px class="icon mr-2" />Bỏ cấm học sinh này
              </app-button>
            </div>
            <StudentManagerInfo />
            <div class="mt-4">
              <h5 class="text-primary mb-3">Điểm đánh giá</h5>
              <StudentManagerInfoTable
                :heads="heads"
                :list="list"
                :pagination="pagination"
                @onPageChange="onPageChange"
                :loading="loading"
              />
            </div>
          </template>
        </sub-block-section>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import StudentManagerInfo from "~/components/page/elearning/manager/student/StudentManagerInfo";
import IconBlock24px from "~/assets/svg/v2-icons/block_24px.svg?inline";
import StudentManagerInfoTable from "~/components/page/elearning/manager/student/StudentManagerInfoTable";
import { mapState, mapActions } from "vuex";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { createBannedStudent } from "~/models/elearning/BannedStudent";
const STORE_TEACHING_EXERCISES = "elearning/study/exercises";
const STORE_TEACHING_PROGRESS = "elearning/teaching/progress";
const STORE_TEACHING_BANNED = "elearning/teaching/banned";
export default {
  layout: "manage",

  components: {
    ElearningManagerSide,
    StudentManagerInfo,
    IconBlock24px,
    StudentManagerInfoTable
  },
  async fetch({ params, query, store, route }) {
    const elearningId = query.elearning_id;
    const studentId = params.id;
    const listQuery = {
      params: {
        elearning_id: elearningId,
        student_id: studentId
      }
    };
    await Promise.all([
      store.dispatch(
        `${STORE_TEACHING_PROGRESS}/${actionTypes.TEACHING_STUDENT_PROGRESS.LIST}`,
        listQuery
      )
    ]);
  },

  data() {
    return {
      loading: false,
      heads: [
        {
          name: "name",
          text: "Tiêu đề bài tập"
        },
        {
          name: "mark",
          text: "Điểm"
        },
        {
          name: "action",
          text: ""
        }
      ],
      list: [
        {
          name: "Justice League",
          mark: 10
        },
        {
          name: "Justice League",
          mark: 4
        },
        {
          name: "Justice League"
        }
      ],
      pagination: {
        total_elements: 0,
        last: false,
        total_pages: 1,
        size: 10,
        number: 0,
        first: true,
        number_of_elements: 0
      },
      params: {
        page: 1,
        size: 10,
      },
    };
  },
  computed: {
    ...mapState(STORE_TEACHING_PROGRESS, ["progress"]),
    ...mapState(STORE_TEACHING_EXERCISES, {
      stateExercises: "exercises"
    }),
  },

  methods: {
    get,
    ...mapActions(STORE_TEACHING_BANNED, ["teachingElearningBanned"]),
    ...mapActions(STORE_TEACHING_PROGRESS, ["teachingStudentProGressList"]),
    bannedStudent(isBanned) {
      const data = createBannedStudent({
        elearning_id:
          this.$route.query && this.$route.query.elearning_id
            ? this.$route.query.elearning_id
            : "",
        user_id:
          this.$route.params && this.$route.params.id
            ? this.$route.params.id
            : "",
        banned: !isBanned
      });
      const dataQuery = {
        params: {
          elearning_id:
            this.$route.query && this.$route.query.elearning_id
              ? this.$route.query.elearning_id
              : "",
          student_id:
            this.$route.params && this.$route.params.id
              ? this.$route.params.id
              : ""
        }
      };
      this.teachingElearningBanned(data).then(result => {
        if (result.success == true) {
          this.teachingStudentProGressList(dataQuery);
        }
      });
    },
    
    onPageChange(e) {
      this.pagination = { ...this.pagination, ...e };
      this.params.size = this.pagination.size;
      this.params.page = this.pagination.number + 1;
      this.getList();
    },

    async getList() {
      const self = this;
      try {
        self.loading = true;
        let params = { ...self.params };
        params.user_id = this.$store.state.auth.token ? this.$store.state.auth.token.id : "";
        params.student_id = this.$route.params && this.$route.params.id ? this.$route.params.id : "";
        await self.$store.dispatch(
          `${STORE_TEACHING_EXERCISES}/${actionTypes.TEACHING_STUDENT_EXERCISES.LIST}`,
          { params }
        );
        self.list = self.get(self.stateExercises, "content", []);
        self.pagination.size = self.get(self.stateExercises, "page.size", 10);
        self.pagination.first = self.get(self.stateExercises, "page.first", 1);
        self.pagination.last = self.get(self.stateExercises, "page.last", 1);
        self.pagination.number = self.get(self.stateExercises, "page.number", 0);
        self.pagination.total_pages = self.get(
          self.stateExercises,
          "data.total_pages",
          0
        );
        self.pagination.total_elements = self.get(
          self.stateExercises,
          "data.total_elements",
          0
        );
        self.pagination.number_of_elements = self.get(
          self.stateExercises,
          "data.number_of_elements",
          0
        );
      } catch (e) {
      } finally {
        self.loading = false;
      }
    },
  },
  created() {
    this.getList()
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
.btn-block__manager-student {
  background: #eb5757;
  margin-left: auto;
}
.btn-unblock__manager-student {
  margin-left: auto;
}
</style>