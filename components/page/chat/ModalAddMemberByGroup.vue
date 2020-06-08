<template>
  <app-modal centered :width="420" :component-class="{ 'create-group-chat-modal': true }">
    <div slot="content">
      <h5>Thêm bạn</h5>
      <app-search class="mb-0" />
      <div class="contact-list">
        <div
          class="item d-flex-center"
          v-for="(item, index) in friendList && friendList.listFriend ? friendList.listFriend : []"
          :key="index"
        >
          <app-avatar
            :src="item.avatar && item.avatar.low ? item.avatar.low : ''"
            :size="30"
            class="mr-3"
          />
          <span>{{item.fullname}}</span>
          <span class="ml-auto" v-if="arrIdMember.includes(item.id)">Đã thêm</span>
          <app-checkbox v-else class="ml-auto" @change="handelCheckbox(item.id)" />
        </div>
      </div>
      <div class="text-center mt-4">
        <app-button size="sm" color="info" class="mr-3" square @click="close()">Hủy</app-button>
        <app-button size="sm" square @click="hanldeAddMember">Thêm</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},

  props: {
    // friends: {
    //   type: Array,
    //   default: () => [],
    //   required: true
    // }
  },

  data() {
    return {
      arrMember: [],
      name: ""
    };
  },

  computed: {
    // ...mapState("account", ["friendList"]),
    ...mapState("message", ["memberList", "friendList"]),
    arrIdMember() {
      const data = this.memberList.listMember ? this.memberList.listMember : [];
      console.log(
        "data",
        data.map(item => item.id)
      );
      return data.map(item => item.id);
    }
  },
  methods: {
    ...mapActions("message", ["addMember", "getMemberList"]),
    close() {
      this.$emit("close");
    },
    // create() {
    //   this.$emit("create", this.arrMember, this.name);
    // },
    handelCheckbox(_id) {
      if (this.arrMember.includes(_id)) {
        this.arrMember = this.arrMember.filter(item => item !== _id);
      } else {
        this.arrMember.push(_id);
      }
      console.log("arrayMember", this.arrMember);
    },
    hanldeAddMember() {
      const data = {
        id: this.$route.params.id,
        member_id: this.arrMember.toString(),
        end: "members"
      };
      // const params = {
      //   room_id: this.$route.params.id
      // };
      this.addMember(data).then(result => {
        if (result.success == true) {
          this.getMemberList({
            params: {
              room_id: this.$route.params.id
            }
          });
          this.$emit("close");
          this.$toasted.show("success");
        } else {
          this.$toasted.error(result.message);
        }
      });
    }
  }
};
</script>