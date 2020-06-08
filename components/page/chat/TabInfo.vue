<template>
  <div class="message-chat__info">
    <div class="message-info">
      <div class="message-info__acc">
        <div class="message-info__acc__image" v-if="!noMessage">
          <app-avatar v-if="typeRoom==2" :src="avatarSrc" class="comment-item__avatar" />

          <app-avatar
            v-else
            :src="nameRoom && nameRoom.avatar && nameRoom.avatar.low ? nameRoom.avatar.low : 'https://picsum.photos/60/60'"
            size="md"
            class="comment-item__avatar"
          />

          <app-upload
            class="cgi-upload-avt change-avatar"
            @change="handleUploadChange"
            v-if="!typeRoom"
          >
            <template>
              <div class="cgi-upload-avt-preview">
                <IconPhoto width="16" height="16" />
              </div>
            </template>
          </app-upload>
        </div>

        <div class="message-info__acc__title" v-if="!typeRoom">
          <input v-if="changeName" type="text" v-model="name" />

          <span v-else>
            <a href="#" v-if="name">{{ name.length > 20 ? (name.slice(0, 15) + '...') : name}}</a>
            <span v-else>Đặt tên cho cuộc trò chuyện này</span>
          </span>

          <button v-if="!changeName" @click="changeName = true" class="btn-change-name">
            <IconEditAlt class="fill-primary" width="18px" height="18px" />
          </button>

          <div v-if="changeName" class="mt-3">
            <button @click="changeName = false " class="btn-des-name text-secondary mr-3">HỦY</button>

            <button @click="saveNameGroup" class="btn-save-name text-primary">LƯU</button>
          </div>
        </div>

        <div v-else-if="typeRoom">
          <h4>{{nameRoom}}</h4>
          <p class="mb-4">Đang hoạt động</p>
        </div>
      </div>

      <ListInfoBox class="list-info-box">
        <template #header>TÙY CHỌN</template>

        <template #body>
          <div class="d-flex align-content-center justify-content-between mb-3">
            <div class="d-flex align-content-center">
              <IconNotificationsNone24px class="mr-2" />
              <span class="my-auto color-basse">Thông báo</span>
            </div>

            <app-toggle-switch />
          </div>

          <div class="d-flex align-content-center justify-content-between mb-3">
            <div class="d-flex align-content-center">
              <IconRemoveCircleOutline24px class="mr-2" />
              <span class="my-auto color-basse">Chặn tin nhắn</span>
            </div>

            <app-toggle-switch />
          </div>

          <div class="d-flex align-content-center justify-content-between">
            <div class="d-flex align-content-center">
              <IconRecycle class="mr-2 fill-secondary" />
              <span class="my-auto text-secondary">Xóa cuộc trò chuyện</span>
            </div>

            <div />
          </div>
        </template>
      </ListInfoBox>

      <ListInfoBox v-if="!typeRoom">
        <template #header>MỌI NGƯỜI</template>

        <template #button>
          <IconAddGreen class="fill-primary mr-2 vertical-middle" width="14px" height="14px" />
          <span class="text-primary">Thêm người</span>
        </template>

        <template #body>
          <div
            class="d-flex justify-content-between align-items-center mb-3"
            v-for="(item, index) in filterListMember"
            :key="index"
          >
            <div class="user-add d-flex align-items-center">
              <img src="/images/tmp/user-photo.png" alt class="mr-3" />
              <p>{{item.first_name}}</p>
            </div>

            <div class="position text-disabled" v-if="item.creator">Người tạo</div>

            <div v-else>
              <v-popover 
                
                placement="center">
                <IconDots class="fill-gray"/>

                <template slot="popover">
                  <p class="mb-3"><n-link to="">Xem trang cá nhân</n-link></p>
                  <p class="mb-3"><n-link to="">Nhắn tin</n-link></p>
                  <p><n-link to="" class="text-secondary">Xoá khỏi nhóm</n-link></p>
                </template>
              </v-popover>
              
            </div>
          </div>

         
        </template>
      </ListInfoBox>

      <ListInfoBox>
        <template #header>TỆP ĐƯỢC CHIA SẺ</template>

        <template #body>
          <p
            class="mb-3 d-flex align-content-center"
            v-for="(item, index) in fileList"
            :key="index"
          >
            <IconFileBlank class="fill-info mr-2" />
            <span class="my-auto text-info">{{item && item.name ? item.name : "Lorem, ipsum."}}</span>
          </p>
         
        </template>
      </ListInfoBox>

      <ListInfoBox>
        <template #header>ẢNH ĐƯỢC CHIA SẺ</template>

        <template #body>
          <div class="row" v-for="(item, index) in imageList" :key="index">
            <div class="col-4 px-1">
              <img :src="item && item.src ? item.src : '/images/tmp/user-photo.png'" alt />
            </div>
            
          </div>
        </template>
        <client-only>
          <infinite-loading :identifier="infiniteId" @infinite="membersInfiniteHandler">
            <template slot="no-more">Không còn thành viên.</template>
          </infinite-loading>
        </client-only>
      </ListInfoBox>
    </div>

    <!-- Modal add member -->
    <ModalAddMember @close="visibleAddMember = false" v-if="visibleAddMember" />

    <app-modal-confirm
      centered
      v-if="showModal"
      title=""
      :description="'Bạn có chắc chắn muốn xoá ' + userName + ' ra khỏi nhóm?'"
      @ok="$emit('exit')"
      @cancel="showModal = false"
    />
  </div>
</template>

<script>
// import ModalAddMember from "~/components/page/chat/ModalAddMember";
import ModalAddMember from "~/components/page/chat/ModalAddMemberByGroup";
import * as actionTypes from "~/utils/action-types";
import IconPlus from "~/assets/svg/icons/plus.svg?inline";
import { mapState, mapGetters, mapActions } from "vuex";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import GroupMember from "~/services/message/GroupMember";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconEditAlt from "~/assets/svg/icons/edit.svg?inline";
import IconCloseOutline from "~/assets/svg/icons/Close-outline.svg?inline";
import IconTick from "~/assets/svg/icons/tick.svg?inline";
import IconNotificationsNone24px from "~/assets/svg/v2-icons/notifications_none_24px.svg?inline";
import IconRemoveCircleOutline24px from "~/assets/svg/v2-icons/remove_circle_outline_24px.svg?inline";
import IconRecycle from "~/assets/svg/v2-icons/recycle.svg?inline";
import IconFileBlank from "~/assets/svg/design-icons/file-blank.svg?inline";
import IconAddGreen from "~/assets/svg/v2-icons/add_green.svg?inline";

import ListInfoBox from "~/components/page/chat/ListInfoBox";
import { getBase64 } from "~/utils/common";
import * as constants from "~/utils/constants";

export default {
  components: {
    IconPlus,
    ModalAddMember,
    IconDots,
    IconPhoto,
    IconEditAlt,
    IconCloseOutline,
    IconTick,
    ListInfoBox,
    IconNotificationsNone24px,
    IconRemoveCircleOutline24px,
    IconRecycle,
    IconFileBlank,
    IconAddGreen
  },

  props: {
    noMessage: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visibleAddMember: false,
      dropdownActions: false,
      changeName: false,
      memberListTab: [],
      infiniteId: +new Date(),
      memberListQuery: {
        page: 1
      },
      name: "",
      avatarSrc: "",
      checkMemberList: false,
      showModal: true,
      userName: 'Huy Dịch Vụ'
    };
  },
  created() {
    this.name =
      this.roomDetail && this.roomDetail.room_data
        ? this.roomDetail.room_data.name
        : "";
    this.avatarSrc =
      this.groupListDetail.room &&
      this.groupListDetail.room.room_avatar &&
      this.groupListDetail.room.room_avatar.low
        ? this.groupListDetail.room.room_avatar.low
        : "https://picsum.photos/40/40";
  },
  computed: {
    ...mapState("message", ["memberList", "groupListDetail", "tabChat"]),
    ...mapGetters("auth", ["userId"]),
    ...mapState("chat", ["memberList", "roomDetail", "imageList", "fileList"]),
    listImage() {
      return this.groupListDetail && this.groupListDetail.listImage
        ? this.groupListDetail.listImage
        : [];
    },
    listFile() {
      return this.groupListDetail && this.groupListDetail.listFile
        ? this.groupListDetail.listFile
        : [];
    },
    typeRoom() {
      const data = this.roomDetail ? this.roomDetail.room_data : {};
      if (data.type == constants.CHAT.PRIVATE_GROUP) {
        return true;
      } else {
        return false;
      }
    },
    nameRoom() {
      const data = this.roomDetail ? this.roomDetail.room_data : {};
      if (data && data.type == constants.CHAT.PUBLIC_GROUP) {
        return data.name;
      } else if (data && data.type == constants.CHAT.PRIVATE_GROUP) {
        const [dataFilterMember] =
          this.memberList &&
          this.memberList.filter(item => item.int_id.low != this.userId);
        return dataFilterMember ? dataFilterMember.full_name : "";
      }
    },
    filterListMember() {
      const data = this.memberList ? this.memberList : [];
      const dataRoom =
        this.roomDetail && this.roomDetail.room_data
          ? this.roomDetail.room_data
          : {};
      const dataMap = data.map(item => {
        if (item.id == dataRoom.created_by) {
          return {
            ...item,
            creator: true
          };
        } else {
          return {
            ...item,
            creator: false
          };
        }
      });
      return dataMap;
    }
    // filterTypeRoom() {
    //   return this.roomDetail && this.roomDetail.room_data;
    //   this.roomDetail.room_data.type == constants.CHAT.PRIVATE_GROUP
    //     ? false
    //     : true;
    // }
  },
  methods: {
    ...mapActions("message", [
      "groupRemoveMember",
      "getMemberList",
      "editName",
      "getGroupListDetail",
      "editAvatarGroup"
    ]),
    ...mapActions("chat", [
      "changeRoomName",
      "getRoomDetail",
      "roomRemoveMember"
    ]),
    async membersInfiniteHandler($state) {
      // this.memberListQuery.room_id = this.$route.params.id;
      const { data: getData = {} } = this.$store.dispatch(
        `chat/${actionTypes.CHAT.MEMBER_LIST}`,
        {
          memberListQuery,
          id: "f6a3b88b-b6cd-49c5-988a-6864e58e429a",
          end: "members"
        }
      );
      console.log("getData member", getData);
      // if (getData && !getData.listMember && this.memberListTab.length == 0) {
      //   this.checkMemberList = true;
      // }
      if (getData) {
        this.memberListQuery.page += 1;
        // this.memberListTab.push(...getData.listMember);
        // this.groupsListTab = this.dataPushGroup.map(item => item);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    removeMember(id) {
      const data = {
        id: this.$route.params.id,
        member_id: id,
        end: "members"
      };
      this.roomRemoveMember(data).then(result => {
        const query = {
          room_id: this.$route.params.id,
          page: 1
        };
        if (result.success == true) {
          this.infiniteId += 1;
          this.getMemberList({ params: query });
        }
      });
    },

    saveNameGroup() {
      const dataEdit = {
        id: this.$route.params.id,
        payload: { value: this.name },
        end: "name"
      };
      this.changeRoomName(dataEdit).then(result => {
        console.log("result", result);
        if (!result.error) {
          this.$toasted.show("success");
          this.changeName = false;
          this.getRoomDetail(this.$route.params.id);
        } else {
          this.$toasted.error(result.message);
        }
      });
    },

    async handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
      const body = new FormData();
      body.append("room_avatar", fileList[0]);
      body.append("room_id", this.$route.params.id);
      console.log("[room_avatar]", fileList[0]);
      const data = {
        id: this.$route.params.id,
        payload: body.append("avatar", fileList[0]),
        end: "avatar"
      };
      this.changeRoomName(data).then(result => {
        if (!result.error) {
          setTimeout(() => {
            this.$toasted.show("success");
            this.getGroupListDetail({
              params: { room_id: this.$route.params.id }
            });
          }, 2500);
        } else {
          this.$toasted.error(result.message);
        }
      });
    }
  },
  watch: {
    memberList(_newval) {
      this.memberListTab = [];
      this.memberListQuery.page = 1;
      this.infiniteId += 1;
    },
    tabChat(_newval) {
      if (_newval) {
        this.memberListTab = [];
        this.memberListQuery.page = 1;
        this.infiniteId += 1;
      }
    }
  }
};
</script>
