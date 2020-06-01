<template>
  <div class="container wrap__study-space">
    <div class="row">
      <div class="col-md-3">
        <MyCourseSide :active="2"/>
      </div>
      
      <div class="col-md-9">
        <div class="mycourses">
          <h4 class="mycourses__title">Bài giảng và khóa học của tôi</h4>

          <div class="mycourses__content">
            <div class="d-flex mb-4">
              <div class="elearning-manager-content__title__nav">
                <!-- <a @click="changeTab(1)" :class="tab === 1 ? 'active' : ''">Tất cả ({{total.elearnings}})</a> -->
                <a @click="changeTab(2)" :class="tab === 2 ? 'active' : ''">Đang theo học ({{total.lectures}})</a>
                <a @click="changeTab(3)" :class="tab === 3 ? 'active' : ''">Đã hoàn thành ({{total.courses}})</a>

                <a
                  @click="changeTab(4)"
                  :class="tab === 4 ? 'active' : ''"
                >Yêu thích ({{total.favourites}})</a>

                <a @click="changeTab(5)" :class="tab === 5 ? 'active' : ''">Lưu trữ ({{total.archieves}})</a>
              </div>
            </div>

            <div class="d-flex align-items-center search-field">
              <div class="search__mycourses  mr-4">
                <app-search
                  class="mb-0"
                  size="sm"
                  placeholder="Tìm kiếm"
                  v-model="params.keyword"
                  bordered
                  @input="hanldeInputSearch"
                  @keyup.enter.native="handleSubmitSearch"
                  @submit="handleSubmitSearch"
                />
              </div>

              <div class="filter-form__item">
                <app-button :color="showFilter ? 'primary' : 'white'" square :size="'sm'" @click="toggleFilter">
                  <IconHamberger :class="showFilter ? 'fill-white' : 'fill-primary'" class="mr-2" />
                  <span>Lọc kết quả</span>
                </app-button>
              </div>

              <div class="d-flex-center ml-3" v-if="showFilter">
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectType"
                    label="text"
                    placeholder="Thể loại"
                    has-border
                  ></app-vue-select>
                </div>
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectPrivacy"
                    label="text"
                    placeholder="Hiển thị"
                    has-border
                  ></app-vue-select>
                </div>
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectFree"
                    label="text"
                    placeholder="Học phí"
                    has-border
                  ></app-vue-select>
                </div>
              </div>
            </div>
              
            <ElearningList :elearningList="list" :col="'col-md-4'">
              <ElearningItem
                slot-scope="{ item }"
                :elearning="item"
                :tab="tab"
                @handleFavourite="handleFavourite"
                @handleDeleteFavourite="handleDeleteFavourite"
                @handleDeleteArchive="handleDeleteArchive"
                @handleArchive="handleArchive"
                @shareFb="shareFb"
                @shareSchool="shareSchool"
              ></ElearningItem>
            </ElearningList>

            <app-pagination
              :pagination="pagination"
              :type="1"
              @pagechange="onPageChange"
              v-if="pagination.total_pages > 1"
            />
            
            <ShareElearningModal
              v-if="checkModalShare"
              @cancel="cancel"
              :dataModal="dataModal"
              @submit="handleShareSchoolly"
            />
              <!-- ModalShare -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyCourseSide from "~/components/page/elearning/mycourses/MyCourseSide";
import ElearningList from "~/components/page/elearning/mycourses/ElearningList";
import ElearningItem from "~/components/page/elearning/mycourses/ElearningItem";
import MenuDropDown from "~/components/page/elearning/mycourses/MenuDropDown";
import ShareElearningModal from "~/components/page/elearning/mycourses/ShareElearningModal";
import { mapState, mapActions } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
const STORE_NAME_FAVOURITE = "elearning/study/study-favourite";
const STORE_NAME_ARCHIVE = "elearning/study/study-archive";


import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
export default {
  middleware: ["authenticated"],

  components: {
    MyCourseSide,
    ElearningList,
    ElearningItem,
    MenuDropDown,
    ShareElearningModal,
    IconHamberger
  },
  data() {
    return {
      params: {
        keyword: null
      },
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
        // total_elements: 103,
        // last: false,
        // total_pages: 222,
        // size: 10,
        // number: 2,
        // first: true,
        // number_of_elements: 10
      },
      checkModalShare: false,
      dataModal: {},
      showFilter: false,
      selectType: null,
      selectPrivacy: null,
      selectFree: null,
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
      this.pagination.total_pages = _newVal.total_pages;
      this.pagination.total_elements = _newVal.total_elements;
      this.pagination.number_of_elements = _newVal.number_of_elements;
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
      this.params.size = 8;
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
          size: 8,
          page: this.params.page,
          keyword: this.params.keyword
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
      const payloadArchive = {
        params: {
          size: 8,
          page: this.params.page,
          keyword: this.params.keyword
        }
      };
      this.$store.dispatch(
        `elearning/study/study-student/${actionTypes.ELEARNING_STURY_ARCHIVE.LIST}`,
        payloadArchive
      );
    },

    fetchElearningFavourite() {
      const payloadFavour = {
        params: {
          size: 8,
          page: this.params.page,
          keyword: this.params.keyword
        }
      };
      this.$store.dispatch(
        `elearning/study/study-student/${actionTypes.ELEARNING_STURY_FAVOURITE.LIST}`,
        payloadFavour
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
          } else if (this.tab === 5) {
            this.fetchElearningStatisticList();
            this.fetchElearningArchive();
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
            size: 8,
            page: this.params.page
          }
        };
        if (result.success == true) {
          if (this.tab === 4) {
            // this.fetchElearningList();
            this.fetchElearningStatisticList();
            this.fetchElearningFavourite();
          } else if (this.tab === 5) {
            this.fetchElearningStatisticList();
            this.fetchElearningArchive();
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
            size: 8,
            page: this.params.page
          }
        };
        if (result.success == true) {
          if (this.tab === 5) {
            this.fetchElearningStatisticList();
            this.fetchElearningArchive();
          } else if (this.tab === 4) {
            this.fetchElearningStatisticList();
            this.fetchElearningFavourite();
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
            size: 8,
            page: this.params.page
          }
        };
        if (result.success == true) {
          if (this.tab === 5) {
            this.fetchElearningStatisticList();
            this.fetchElearningArchive();
          } else if (this.tab === 4) {
            this.fetchElearningStatisticList();
            this.fetchElearningFavourite();
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
    },
    handleSubmitSearch() {
      this.params.page = 1;
      if (this.tab === 1) {
        this.params.type = "ALL";
        this.fetchElearningList();
        this.list = get(this, "elearningStudyStudent.content", []);
        this.pagination = get(this, "elearningStudyStudent.page", {});
      } else if (this.tab === 2) {
        this.params.type = "LECTURE";
        // this.params.page = 1;
        this.fetchElearningList();
        this.list = get(this, "elearningStudyStudent.content", []);
        this.pagination = get(this, "elearningStudyStudent.page", {});
      } else if (this.tab === 3) {
        this.params.type = "COURSE";
        // this.params.page = 1;
        this.fetchElearningList();
        this.list = get(this, "elearningStudyStudent.content", []);
        this.pagination = get(this, "elearningStudyStudent.page", {});
      } else if (this.tab === 4) {
        this.fetchElearningFavourite();
        this.list = get(this, "elearningStudyFavourite.content", []);
        this.pagination = get(this, "elearningStudyFavourite.page", {});
      } else if (this.tab === 5) {
        this.fetchElearningArchive();
        this.list = get(this, "elearningStudyArchive.content", []);
        this.pagination = get(this, "elearningStudyArchive.page", {});
      }
    },
    hanldeInputSearch(val) {
      if (val == "") {
        this.params.page = 1;
        if (this.tab === 1) {
          this.params.type = "ALL";
          this.fetchElearningList();
          this.list = get(this, "elearningStudyStudent.content", []);
          this.pagination = get(this, "elearningStudyStudent.page", {});
        } else if (this.tab === 2) {
          this.params.type = "LECTURE";
          // this.params.page = 1;
          this.fetchElearningList();
          this.list = get(this, "elearningStudyStudent.content", []);
          this.pagination = get(this, "elearningStudyStudent.page", {});
        } else if (this.tab === 3) {
          this.params.type = "COURSE";
          // this.params.page = 1;
          this.fetchElearningList();
          this.list = get(this, "elearningStudyStudent.content", []);
          this.pagination = get(this, "elearningStudyStudent.page", {});
        } else if (this.tab === 4) {
          this.fetchElearningFavourite();
          this.list = get(this, "elearningStudyFavourite.content", []);
          this.pagination = get(this, "elearningStudyFavourite.page", {});
        } else if (this.tab === 5) {
          this.fetchElearningArchive();
          this.list = get(this, "elearningStudyArchive.content", []);
          this.pagination = get(this, "elearningStudyArchive.page", {});
        }
      }
    },
    shareFb(id) {
      const url =
        "https://facebook.com/sharer.php?display=popup&u=" +
        window.origin +
        `elearning/${id}`;
      window.open(url, "sharer", "_blank");
    },
    async shareSchool(item) {
      this.checkModalShare = true;
      this.dataModal = item;
      // const link = window.origin + `/elearning/${id}`;
      // const doAdd = await this.$store.dispatch(
      //   `social/${actionTypes.SOCIAL.ADD_POST}`,
      //   { link: link }
      // );
      // if (doAdd.success) {
      //   this.menuDropdown = false;
      //   this.$toasted.show("Đã chia sẻ thành công.");
      // } else {
      //   this.$toasted.error(doAdd.message);
      // }
    },
    async handleShareSchoolly(_content) {
      console.log("_content", _content);
      const link = window.origin + `/elearning/${this.dataModal.elearning_id}`;
      const doAdd = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.ADD_POST}`,
        { link: link, content: _content }
      );
      if (doAdd.success) {
        this.menuDropdown = false;
        this.$toasted.show("Đã chia sẻ thành công.");
      } else {
        this.$toasted.error(doAdd.message);
      }
    },
    cancel() {
      this.checkModalShare = false;
    },

    toggleFilter() {
      if (this.showFilter) {
        this.selectType = null;
        this.selectPrivacy = null;
        this.selectFree = null;
      }
      this.showFilter = !this.showFilter;
    },

    handleChangedType() {
      this.params.type = this.selectType.value;
    },
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
@import "~/assets/scss/components/elearning/_elearning-my-courses";
</style>