<template>
  <div class="container wrap__study-space">
    <span class="title__study-space">Góc học tập</span>
    <div class="d-flex">
      <div class="elearning-manager-content__title__nav">
        <a @click="changeTab(1)" :class="tab === 1 ? 'active' : ''">Tất cả ({{total.elearnings}})</a>
        <a @click="changeTab(2)" :class="tab === 2 ? 'active' : ''">Bài giảng ({{total.lectures}})</a>
        <a @click="changeTab(3)" :class="tab === 3 ? 'active' : ''">Khóa học ({{total.courses}})</a>
        <a
          @click="changeTab(4)"
          :class="tab === 4 ? 'active' : ''"
        >Yêu thích ({{total.favourites}})</a>
        <a @click="changeTab(5)" :class="tab === 5 ? 'active' : ''">Lưu trữ ({{total.archieves}})</a>
      </div>
      <div style="width: 267px;margin-left:auto">
        <app-search placeholder="Tìm kiếm" />
      </div>
    </div>
    <ElearningList :elearningList="list">
      <ElearningItem
        slot-scope="{ item }"
        :elearning="item"
        @handleFavourite="handleFavourite"
        @handleDeleteFavourite="handleDeleteFavourite"
        @handleDeleteArchive="handleDeleteArchive"
        @handleArchive="handleArchive"
      ></ElearningItem>
    </ElearningList>
    <app-pagination :pagination="pagination" :type="1" @pagechange="onPageChange" />
  </div>
</template>

<script>
import ElearningList from "~/components/page/elearning/mycourses/ElearningList";
import ElearningItem from "~/components/page/elearning/mycourses/ElearningItem";
import { mapState, mapActions } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
const STORE_NAME_FAVOURITE = "elearning/study/study-favourite";
const STORE_NAME_ARCHIVE = "elearning/study/study-archive";

export default {
  middleware: ["student-role"],
  components: {
    ElearningList,
    ElearningItem
  },
  data() {
    return {
      params: {},
      tab: 1,
      list: [],
      total: {
        elearnings: null,
        courses: null,
        lectures: null,
        favourites: null,
        archieves: null
      },
      pagination: {
        // totalElements: 103,
        // last: false,
        // totalPages: 222,
        // size: 10,
        // number: 2,
        // first: true,
        // numberOfElements: 10
      }
    };
  },
  created() {
    this.fetchElearningList();
    this.fetchElearningStatisticList();
    // this.fetchElearningFavourite();
    // this.fetchElearningArchive();
  },
  computed: {
    ...mapState("elearning/study/study-student", {
      elearningStudyStudent: "elearningStudyStudent"
    }),
    ...mapState("elearning/study/study-student", {
      elearningStudyStatistic: "elearningStudyStatistic"
    }),
    ...mapState("elearning/study/study-student", {
      elearningStudyArchive: "elearningStudyArchive"
    }),
    ...mapState("elearning/study/study-student", {
      elearningStudyFavourite: "elearningStudyFavourite"
    })
  },
  watch: {
    elearningStudyStatistic: {
      handler: function() {
        this.total.elearnings = get(
          this,
          "elearningStudyStatistic.total_elearnings",
          0
        );
        this.total.courses = get(
          this,
          "elearningStudyStatistic.total_courses",
          0
        );
        this.total.lectures = get(
          this,
          "elearningStudyStatistic.total_lectures",
          0
        );
        this.total.favourites = get(
          this,
          "elearningStudyStatistic.total_favourites",
          0
        );
        this.total.archieves = get(
          this,
          "elearningStudyStatistic.total_archieves",
          0
        );
      }
    },
    elearningStudyStudent: {
      handler: function() {
        this.list = get(this, "elearningStudyStudent.content", []);
        this.pagination = get(this, "elearningStudyStudent.page", {});
      }
    },
    elearningStudyFavourite: {
      handler: function() {
        this.list = get(this, "elearningStudyFavourite.content", []);
        this.pagination = get(this, "elearningStudyFavourite.page", {});
      }
    },
    elearningStudyArchive: {
      handler: function() {
        this.list = get(this, "elearningStudyArchive.content", []);
        this.pagination = get(this, "elearningStudyArchive.page", {});
      }
    },
    tab(_tab) {},
    pagination(_newVal) {
      this.pagination.size = _newVal.size;
      this.pagination.first = _newVal.first;
      this.pagination.last = _newVal.last;
      this.pagination.number = _newVal.number;
      this.pagination.totalPages = _newVal.total_pages;
      this.pagination.totalElements = _newVal.total_elements;
      this.pagination.numberOfElements = _newVal.number_of_elements;
    }
  },
  methods: {
    ...mapActions(STORE_NAME_FAVOURITE, [
      "elearningStudyFavouriteAdd",
      "elearningStudyFavouriteDelete"
    ]),
    ...mapActions(STORE_NAME_ARCHIVE, [
      "elearningStudyArchiveAdd",
      "elearningStudyArchiveDelete"
    ]),
    changeTab(tab) {
      this.tab = tab;
      this.params.size = 10;
      if (tab === 1) {
        this.params.type = "ALL";
        this.fetchElearningList();
        this.list = get(this, "elearningStudyStudent.content", []);
        this.pagination = get(this, "elearningStudyStudent.page", {});
      } else if (tab === 2) {
        this.params.type = "LECTURE";
        this.params.page = 1;
        this.fetchElearningList();
        this.list = get(this, "elearningStudyStudent.content", []);
        this.pagination = get(this, "elearningStudyStudent.page", {});
      } else if (tab === 3) {
        this.params.type = "COURSE";
        this.params.page = 1;
        this.fetchElearningList();
        this.list = get(this, "elearningStudyStudent.content", []);
        this.pagination = get(this, "elearningStudyStudent.page", {});
      } else if (tab === 4) {
        this.fetchElearningFavourite();
        this.list = get(this, "elearningStudyFavourite.content", []);
        this.pagination = get(this, "elearningStudyFavourite.page", {});
      } else if (tab === 5) {
        this.fetchElearningArchive();
        this.list = get(this, "elearningStudyArchive.content", []);
        this.pagination = get(this, "elearningStudyArchive.page", {});
      }
    },
    fetchElearningList() {
      const payload = {
        params: {
          type: this.params.type,
          size: 10,
          page: this.params.page
        }
      };
      this.$store.dispatch(
        `elearning/study/study-student/${actionTypes.ELEARNING_STUDY_STUDENT.LIST}`,
        payload
      );
    },
    fetchElearningStatisticList() {
      this.$store.dispatch(
        `elearning/study/study-student/${actionTypes.ELEARNING_STUDY_STATISTIC.LIST}`
      );
    },
    fetchElearningArchive() {
      this.$store.dispatch(
        `elearning/study/study-student/${actionTypes.ELEARNING_STURY_ARCHIVE.LIST}`
      );
    },
    fetchElearningFavourite() {
      this.$store.dispatch(
        `elearning/study/study-student/${actionTypes.ELEARNING_STURY_FAVOURITE.LIST}`
      );
    },
    handleFavourite(id) {
      const query = {
        elearning_id: id
      };
      this.elearningStudyFavouriteAdd(query).then(result => {
        if (result.success == true) {
          if (this.tab === 4) {
            // this.fetchElearningList();
            this.fetchElearningStatisticList();
            this.fetchElearningFavourite();
          } else {
            this.fetchElearningList();
            this.fetchElearningStatisticList();
            // this.fetchElearningFavourite();
          }
        }
      });
    },
    handleDeleteFavourite(id) {
      const query = {
        elearning_ids: [id]
      };
      this.elearningStudyFavouriteDelete(query).then(result => {
        const payload = {
          params: {
            type: this.params.type,
            size: 10,
            page: this.params.page
          }
        };
        if (result.success == true) {
          if (this.tab === 4) {
            // this.fetchElearningList();
            this.fetchElearningStatisticList();
            this.fetchElearningFavourite();
          } else {
            this.fetchElearningList();
            this.fetchElearningStatisticList();
            // this.fetchElearningFavourite();
          }
        }
      });
    },
    handleArchive(id) {
      const query = {
        elearning_id: id
      };
      this.elearningStudyArchiveAdd(query).then(result => {
        const payload = {
          params: {
            type: this.params.type,
            size: 10,
            page: this.params.page
          }
        };
        if (result.success == true) {
          if (this.tab === 5) {
            this.fetchElearningStatisticList();
            this.fetchElearningArchive();
          } else {
            this.fetchElearningList();
            this.fetchElearningStatisticList();
          }
        }
      });
    },
    handleDeleteArchive(id) {
      const query = {
        elearning_ids: [id]
      };
      this.elearningStudyArchiveDelete(query).then(result => {
        const payload = {
          params: {
            type: this.params.type,
            size: 10,
            page: this.params.page
          }
        };
        if (result.success == true) {
          if (this.tab === 5) {
            this.fetchElearningStatisticList();
            this.fetchElearningArchive();
          } else {
            this.fetchElearningList();
            this.fetchElearningStatisticList();
          }
        }
      });
    },
    onPageChange(e) {
      console.log(e);
      this.pagination = { ...this.pagination, ...e };
      this.params.size = this.pagination.size;
      this.params.page = this.pagination.number + 1;
      this.fetchElearningList();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
@import "~/assets/scss/components/elearning/_elearning-my-courses";
</style>