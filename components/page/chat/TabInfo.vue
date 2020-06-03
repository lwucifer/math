<template>
  <div class="message-chat__info">
    <div class="message-info">
      <div class="message-info__acc">
        <div class="message-info__acc__image" v-if="!noMessage">
          <app-avatar v-if="typeRoom==2" :src="avatarSrc" class="comment-item__avatar" />

          <app-avatar
            v-else
            :src="nameRoom && nameRoom.avatar && nameRoom.avatar.low ? nameRoom.avatar.low : ''"
            size="md"
            class="comment-item__avatar"
          />

          <app-upload
            class="cgi-upload-avt change-avatar"
            @change="handleUploadChange"
            v-if="typeRoom == 2"
          >
            <template>
              <div class="cgi-upload-avt-preview">
                <IconPhoto width="16" height="16" />
              </div>
            </template>
          </app-upload>
        </div>

        <div class="message-info__acc__title" v-if="!noMessage && typeRoom == 2">
          <input v-if="changeName" type="text" v-model="name" />

          <span v-else>
            <a href="#" v-if="name">{{name}}</a>
            <span v-else>Đặt tên cho cuộc trò chuyện này</span>
          </span>
          <button v-if="!changeName" @click="changeName = true" class="btn-change-name">
            <IconEditAlt width="20" height="20" />
          </button>
          <button v-if="changeName" @click="changeName = false " class="btn-des-name">
            <IconCloseOutline width="20" height="20" />
          </button>
          <button v-if="changeName" @click="saveNameGroup" class="btn-save-name">
            <IconTick width="20" height="20" />
          </button>
        </div>

        <div v-else-if="typeRoom==1">
          <h4>{{nameRoom && nameRoom.fullname ? nameRoom.fullname : ''}}</h4>
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

      <ListInfoBox v-if="filterTypeRoom">
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
          </div>

          <!-- <div class="d-flex justify-content-between align-items-center">
              <div class="user-add d-flex align-items-center">
                <img src="/images/tmp/user-photo.png" alt class="mr-3" />
                <p>Albert Cooper</p>
              </div>

              <div class="position text-disabled">Người tạo</div>
          </div>-->
        </template>
      </ListInfoBox>

      <ListInfoBox>
        <template #header>TỆP ĐƯỢC CHIA SẺ</template>

        <template #body>
          <p class="mb-3 d-flex align-content-center">
            <IconFileBlank class="fill-info mr-2" />
            <span class="my-auto text-info">Lorem, ipsum.</span>
          </p>
          <p class="mb-3 d-flex align-content-center">
            <IconFileBlank class="fill-info mr-2" />
            <span class="my-auto text-info">Lorem, ipsum.</span>
          </p>
          <p class="d-flex align-content-center">
            <IconFileBlank class="fill-info mr-2" />
            <span class="my-auto text-info">Lorem, ipsum.</span>
          </p>
        </template>
      </ListInfoBox>

      <ListInfoBox>
        <template #header>ẢNH ĐƯỢC CHIA SẺ</template>

        <template #body>
          <div class="row">
            <div class="col-4 px-1">
              <img src="/images/tmp/user-photo.png" alt />
            </div>
            <div class="col-4 px-1">
              <img src="/images/tmp/user-photo.png" alt />
            </div>
            <div class="col-4 px-1">
              <img src="/images/tmp/user-photo.png" alt />
            </div>
          </div>
        </template>
        <client-only>
          <infinite-loading :identifier="infiniteId" @infinite="membersInfiniteHandler">
            <template slot="no-more">Không còn thành viên.</template>
          </infinite-loading>
        </client-only>
      </ListInfoBox>

      <!-- <div class="message-info__box">
        <h5 class="message-info__box__title">File chia sẻ</h5>
        <div class="message-info__box__content attachment">
          <ul class="list-unstyle" v-for="(item, index) in listFile" :key="index">
            <li>
              <a>{{ item.file_name_upload }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="message-info__box">
        <h5 class="message-info__box__title">Ảnh chia sẻ</h5>
        <div class="message-info__box__content images-attachment" v-if="listImage.length > 0">
          <ul class="list-unstyle">
            <li v-for="(item, index) in listImage" :key="index">
              <n-link to>
                <img :src="item.img_url && item.img_url.low ? item.img_url.low : ''" />
              </n-link>
            </li>
          </ul>
        </div>
        <div class="message-info__box__content" v-else></div>
      </div>


      <div class="message-info__box" v-if="!tabChat && typeRoom == 2">
        <h5 class="message-info__box__title">Thành viên</h5>
        <div
          class="message-info__box__content"
          v-if="memberList.listMember && memberList.listMember.length > 0"
        >
          <button class="d-flex-center mt-3 mb-3" @click="visibleAddMember = true">
            <IconPlus height="20" width="20" class="mr-3" />Thêm người
          </button>
          <ul class="members">
            <li v-for="(item, index) in memberListTab" :key="index" class="d-flex-center mb-3">
              <app-avatar
                :src="item.avatar && item.avatar.low ? item.avatar.low : ''"
                :size="30"
                class="mr-3"
              />
              <span>{{item.fullname}}</span>
              <app-dropdown
                position="right"
                v-model="dropdownActions"
                :content-width="'14rem'"
                class="link--dropdown ml-auto pl-2"
              >
                <button slot="activator" type="button" class="link--dropdown__button">
                  <IconDots class="fill-999" width="16" />
                </button>
                <div class="link--dropdown__content">
                  <ul>
                    <li>
                      <a>Nhắn tin</a>
                    </li>
                    <li>
                      <a>Xem trang cá nhân</a>
                    </li>
                    <li @click.stop="removeMember(item.id)">
                      <a>Xoá khỏi nhóm</a>
                    </li>
                  </ul>
                </div>
              </app-dropdown>
            </li>
            <client-only>
              <infinite-loading :identifier="infiniteId" @infinite="membersInfiniteHandler">
                <template slot="no-more">Không còn thành viên.</template>
              </infinite-loading>
            </client-only>
          </ul>
        </div>
      </div>-->
    </div>

    <!-- Modal add member -->
    <ModalAddMember @close="visibleAddMember = false" v-if="visibleAddMember" />
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
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
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
    // fileshare: {
    //   type: Array,
    //   default: () => [],
    //   required: true
    // },
    // members: {
    //   type: Array,
    //   default: () => [],
    //   required: true
    // },
    // imageshare: {
    //   type: Array,
    //   default: () => [],
    //   required: true
    // },
    // isGroup: {
    //   type: Boolean,
    //   default: false,
    //   required: true
    // },
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
      checkMemberList: false
    };
  },
  created() {
    this.name =
      this.groupListDetail.room && this.groupListDetail.room.room_name
        ? this.groupListDetail.room.room_name
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
    ...mapState("chat", ["memberList", "roomDetail"]),
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
      return this.groupListDetail &&
        this.groupListDetail.room &&
        this.groupListDetail.room.type
        ? this.groupListDetail.room.type
        : "";
    },
    nameRoom() {
      if (
        this.groupListDetail &&
        this.groupListDetail.room &&
        this.groupListDetail.room.type == 1
      ) {
        const [dataName] = this.memberList.listMember.filter(
          item => item.id != this.userId
        );
        return dataName;
      }
    },
    filterListMember() {
      const data = this.memberList ? this.memberList : [];
      const dataMap = data.map(item => {
        if (item.id == this.roomDetail.created_by) {
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
    },
    filterTypeRoom() {
      return this.roomDetail &&
        this.roomDetail.type == constants.CHAT.PRIVATE_GROUP
        ? false
        : true;
    }
  },
  methods: {
    ...mapActions("message", [
      "groupRemoveMember",
      "getMemberList",
      "editName",
      "getGroupListDetail",
      "editAvatarGroup"
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
        room_id: this.$route.params.id,
        member_id: id
      };
      this.groupRemoveMember(data).then(result => {
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
        room_id: this.$route.params.id,
        room_name: this.name
      };
      this.editName(dataEdit).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.changeName = false;
          this.getGroupListDetail({
            params: { room_id: this.$route.params.id }
          });
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
      this.editAvatarGroup(body).then(result => {
        if (result.success == true) {
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