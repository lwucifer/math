<template>
  <div class="container wrap__study-space">
    <div class="row">
      <div class="col-md-3">
        <MyCourseSide :active="2" />
      </div>

      <div class="col-md-9">
        <div class="mycourses">
          <h4 class="mycourses__title">Bài giảng và khóa học của tôi</h4>

          <div class="mycourses__content">
            <div class="d-flex mb-4">
              <div class="elearning-manager-content__title__nav">
                <!-- <a @click="changeTab(1)" :class="tab === 1 ? 'active' : ''">Tất cả ({{total.elearnings}})</a> -->
                <a @click="changeTab(2)" :class="tab === 2 ? 'active' : ''"
                  >Đang theo học ({{
                    numeral(get(statistic, "total_elearnings", 0)).format()
                  }})</a
                >
                <a @click="changeTab(3)" :class="tab === 3 ? 'active' : ''"
                  >Đã hoàn thành ({{
                    numeral(get(statistic, "total_courses", 0)).format()
                  }})</a
                >

                <a @click="changeTab(4)" :class="tab === 4 ? 'active' : ''"
                  >Yêu thích ({{
                    numeral(get(statistic, "total_favourites", 0)).format()
                  }})</a
                >

                <a @click="changeTab(5)" :class="tab === 5 ? 'active' : ''"
                  >Lưu trữ ({{
                    numeral(get(statistic, "total_archieves", 0)).format()
                  }})</a
                >
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
                  @submit="handleSubmitSearch"
                />
              </div>

              <div class="filter-form__item">
                <app-button
                  :color="showFilter ? 'primary' : 'white'"
                  square
                  :size="'sm'"
                  @click="toggleFilter"
                >
                  <IconHamberger
                    :class="showFilter ? 'fill-white' : 'fill-primary'"
                    class="mr-2"
                  />
                  <span>Lọc kết quả</span>
                </app-button>
              </div>

              <div class="d-flex-center ml-3" v-if="showFilter">
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    label="text"
                    placeholder="Thể loại"
                    has-border
                    :value="params.type"
                    :reduce="(item) => item.value"
                    @input="handleChangeType"
                    :options="[
                      { text: 'Tất cả', value: 'ALL' },
                      { text: 'Bài giảng', value: 'LECTURE' },
                      { text: 'Khoá học', value: 'COURSE' },
                    ]"
                  ></app-vue-select>
                </div>
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectPrivacy"
                    label="text"
                    placeholder="Hiển thị"
                    :value="params.privacy"
                    :reduce="(item) => item.value"
                    @input="handleChangePrivacy"
                    :options="[
                      { text: 'Tất cả', value: '' },
                      { text: 'Công khai', value: 'PUBLIC' },
                      { text: 'Riêng tư', value: 'PRIVATE' },
                    ]"
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
                    :value="params.free"
                    :reduce="(item) => item.value"
                    @input="handleChangeFree"
                    :options="[
                      { text: 'Tất cả', value: '' },
                      { text: 'Miễn phí', value: true },
                      { text: 'Có phí', value: false },
                    ]"
                    has-border
                  ></app-vue-select>
                </div>
              </div>
            </div>

            <ElearningList
              :elearningList="get(list, 'content', [])"
              :col="'col-md-4'"
            >
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
              :pagination="get(list, 'page', {})"
              :type="1"
              @pagechange="onPageChange"
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
import numeral from "numeral";
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import { useEffect } from "~/utils/common";

export default {
  middleware: ["authenticated"],

  components: {
    MyCourseSide,
    ElearningList,
    ElearningItem,
    MenuDropDown,
    ShareElearningModal,
    IconHamberger,
  },
  data() {
    return {
      params: {
        type: "ALL",
        size: 12,
        page: 1,
        keyword: "",
        is_completed: false,
        privacy: "",
        free: "",
      },
      tab: 2,
      checkModalShare: false,
      dataModal: {},
      showFilter: false,
      selectType: null,
      selectPrivacy: null,
      selectFree: null,
    };
  },

  mounted() {
    useEffect(this, this.getData.bind(this), ["params", "tab"]);
    this.$store.dispatch("elearning/study-space/getStatistic");
  },

  computed: {
    ...mapState("elearning/study-space", {
      finished_lecture: "finished_lecture",
      unfinished_lecture: "unfinished_lecture",
      statistic: "statistic",
      archive: "archive",
      favourite: "favourite",
    }),
    list() {
      if (this.tab === 2) {
        return this.unfinished_lecture;
      }
      if (this.tab === 3) {
        return this.finished_lecture;
      }
      if (this.tab === 4) {
        return this.favourite;
      }
      if (this.tab === 5) {
        return this.archive;
      }
      return this.unfinished_lecture;
    },
  },

  methods: {
    handleChangeType(type) {
      this.params.type = type;
    },

    handleChangePrivacy(privacy) {
      this.params.privacy = privacy;
    },

    handleChangeFree(free) {
      this.params.free = free;
    },

    getData() {
      const payload = {
        params: this.params,
      };
      if (this.tab === 2) {
        this.$store.dispatch("elearning/study-space/getStudying", payload);
      }
      if (this.tab === 3) {
        this.$store.dispatch("elearning/study-space/getStudying", payload);
      }
      if (this.tab === 4) {
        this.$store.dispatch("elearning/study-space/getFavourite", payload);
      }
      if (this.tab === 5) {
        this.$store.dispatch("elearning/study-space/getArchive", payload);
      }
    },

    ...mapActions(STORE_NAME_FAVOURITE, [
      "elearningStudyFavouriteAdd",
      "elearningStudyFavouriteDelete",
    ]),

    ...mapActions(STORE_NAME_ARCHIVE, [
      "elearningStudyArchiveAdd",
      "elearningStudyArchiveDelete",
    ]),

    changeTab(tab) {
      this.tab = tab;
      if (tab == 2) {
        this.params.is_completed = false;
      }
      if (tab == 3) {
        this.params.is_completed = true;
      }
      this.params.page = 1;
      this.params.keyword = "";
    },

    handleFavourite(id) {
      const query = {
        elearning_id: id,
      };
      this.elearningStudyFavouriteAdd(query).then((result) => {
        if (result.success == true) {
          this.getData();
        }
      });
    },

    handleDeleteFavourite(id) {
      const query = {
        elearning_ids: [id],
      };
      this.elearningStudyFavouriteDelete(query).then((result) => {
        const payload = {
          params: {
            type: this.params.type,
            size: 8,
            page: this.params.page,
          },
        };
        if (result.success == true) {
          this.getData();
        }
      });
    },

    handleArchive(id) {
      const query = {
        elearning_id: id,
      };
      this.elearningStudyArchiveAdd(query).then((result) => {
        const payload = {
          params: {
            type: this.params.type,
            size: 8,
            page: this.params.page,
          },
        };
        if (result.success == true) {
          this.getData();
        }
      });
    },

    handleDeleteArchive(id) {
      const query = {
        elearning_ids: [id],
      };
      this.elearningStudyArchiveDelete(query).then((result) => {
        const payload = {
          params: {
            type: this.params.type,
            size: 8,
            page: this.params.page,
          },
        };
        if (result.success == true) {
          this.getData();
        }
      });
    },

    onPageChange(e) {
      this.params.page = get(e, "number", 0) + 1;
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
    get,
    numeral,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
@import "~/assets/scss/components/elearning/_elearning-my-courses";
</style>
