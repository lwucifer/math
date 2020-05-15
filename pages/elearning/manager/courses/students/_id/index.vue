<template>
  <div class="container">
    <breadcrumb />
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <sub-block-section :title="progress.name" has-icon>
          <template v-slot:content>
            <div class="d-flex">
              <h5 class="text-primary">Thông tin học sinh</h5>
              <app-button
                square
                color="secondary"
                size="sm"
                class="btn-block__manager-student"
                @click="bannedStudent"
              >
                <IconBlock24px class="icon mr-2" />Cấm học sinh này
              </app-button>
            </div>
            <StudentManagerInfo />
            <div class="mt-4">
              <h5 class="text-primary mb-3">Điểm đánh giá</h5>
              <StudentManagerInfoTable
                :heads="heads"
                :list="filterListExercises"
                :pagination="pagination"
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
        totalElements: 0,
        last: false,
        totalPages: 1,
        size: 10,
        number: 0,
        first: true,
        numberOfElements: 0
      }
    };
  },
  computed: {
    ...mapState(STORE_TEACHING_PROGRESS, ["progress"]),
    filterListExercises() {
      return this.progress && this.progress.exercises
        ? this.progress.exercises
        : [];
    }
  },

  methods: {
    ...mapActions(STORE_TEACHING_BANNED, ["teachingElearningBanned"]),
    bannedStudent() {
      const data = createBannedStudent({
        elearning_id:
          this.$route.query && this.$route.query.elearning_id
            ? this.$route.query.elearning_id
            : "",
        student_id:
          this.$route.params && this.$route.params.id
            ? this.$route.params.id
            : "",
        banned: true
      });
      console.log("data", data);
      this.teachingElearningBanned(data).then(result => {});
    }
  },
  created() {
    // this.getList()
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
.btn-block__manager-student {
  background: #eb5757;
  margin-left: auto;
}
</style>