
<template>
  <div class="container">
    <breadcrumb />
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="6" />
      </div>
      <div class="col-md-9">
        <div class="wrap-content-create-notify__ElearningManagerInteractive">
          <h5 class="notify-title">
            <ArrowLeft class="mr-3" />Tạo thông báo
          </h5>

          <div class="notify-content">
            <div class="d-flex flex-column">
              <h5>Chọn bài giảng/ khóa học liên quan</h5>
              <app-vue-select
                label="text"
                placeholder="Chọn"
                searchable
                class="content-select__ElearningManagerInteractive"
                @input="handleSelectElearning"
                :all-opt="allOpt"
                :options="lessonOpts"
              ></app-vue-select>
            </div>

            <div class="form">
              <h5>Tiêu đề thông báo</h5>
              <app-input 
                placeholder="Nhập tiêu đề"
                v-model="params.title"
              />
            </div>

            <div class="form">
              <h5>Nội dung thông báo</h5>
              <app-input
                textarea
                placeholder="Xin chào..."
                class="textArea__ElearningManagerInteractive"
                v-model="params.content"
              />
            </div>

            <div class="d-flex justify-content-center">
              <app-button 
                square 
                size="sm"
                @click="handleSaveNotify"
              >
                Hoàn thành
                </app-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-modal-notify
      v-if="showModal"
      type="success"
      title="Tạo thông báo thành công!"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import IconClose from "~/assets/svg/design-icons/multiply.svg?inline";
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import ArrowLeft from "~/assets/svg/v2-icons/arrow_left_black.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
const STORE_TEACHING_PUBLIC_LIST = "elearning/teaching/teaching-public";
import { Interacts } from "~/models/elearning/Interacts";
export default {
  layout: "manage",
  components: {
    ElearningManagerSide,
    IconClose,
    ArrowLeft
  },
  data() {
    return {
      tab: 1,
      isAuthenticated: true,
      showModal: false,
      allOpt: {
          value: null,
          text: 'Tất cả'
      },
      params:{
        elearning_id: null,
        title: null,
        content: null
      }
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_TEACHING_PUBLIC_LIST, ["teachingPublicList"]),
    filterListLesson() {
      const data = this.teachingPublicList ? this.teachingPublicList : [];
      const filterData = data.map(item => {
        return {
          value: item.id,
          text: item.name
        };
      });
      return filterData;
    },
    lessonOpts() {
        return [this.allOpt, ...this.filterListLesson]
      }
  },
  created(){
    this.fetchElearning()
  },
  methods: {
    async fetchElearning() {
      let params = { ...this.params }
      const userId = this.$store.state.auth.token ? this.$store.state.auth.token.id : "";
      this.$store.dispatch(
          `${STORE_TEACHING_PUBLIC_LIST}/${actionTypes.TEACHING_PUBLIC_LIST.LIST}`,
          {
            params: {
              teacher_id: userId
            }
          }
        )
      console.log('lol')
    },
    handleSaveNotify(){
      console.log('hello',this.params)
    },
    handleSelectElearning(val){
      this.params.elearning_id = val.value;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-interactive.scss";
</style>