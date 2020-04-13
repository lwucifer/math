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
            :options="classes"
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
        <div
          class="item"
          v-for="(item, index) in studentList ? studentList : []"
          :key="index"
        >
          <app-checkbox class="ml-auto" @change="handelCheckbox(item.id)" :checked="arrMember.includes(item.id)"/>
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="text-center mt-4">
        <app-button size="sm" color="info" class="mr-3" square @click="close()">Hủy</app-button>
        <app-button size="sm" square @click="hanldeCreateGroup">Mời</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},

  data() {
    return {
      arrMember: [],
      name: "",
      classSelected: {
        value: "10B",
        text: "Lớp 10B (50 học sinh)"
      },
      classes: [
        {
          value: "12B",
          text: "Lớp 12B (68 học sinh)"
        },
        {
          value: "10B",
          text: "Lớp 10B (50 học sinh)"
        }
      ],
      studentList: [
        {
          id: "10B",
          name: "Lớp 10B (40 học sinh)"
        },
        {
          id: "11B",
          name: "Lớp 11B (50 học sinh)"
        },
        {
          id: "12B",
          name: "Lớp 12B (60 học sinh)"
        },
      ],
    };
  },

  methods: {
    ...mapActions("message", ["createGroup", "getGroupList"]),
    close() {
      this.$emit("close");
    },
    handleChangedClass(val) {
      
    },
    handelAllCheckbox(checked){
      if (checked) {
        this.arrMember = this.studentList.map(item => item.id);
      } else {
        this.arrMember = [];
      }
      console.log("arrayMember", this.arrMember);
    },
    handelCheckbox(_id) {
      if (this.arrMember.includes(_id)) {
        this.arrMember = this.arrMember.filter(item => item !== _id);
      } else {
        this.arrMember.push(_id);
      }
      console.log("arrayMember", this.arrMember);
    },
    getClassList() {

    }
  },

  computed: {
  }
};
</script>

<style lang="scss">
  .invite-student-modal .app-modal-content {
    padding: 2rem 1.5rem;
  }
  .student-list {
    background: #FBFBFB;
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