<template>
  <div class="message-box__item item__0">
    <div class="message-box__item__content">
      <div class="message-box__item__meta">
        <div class="message-box__item__meta__image">
          <app-dropdown
            position="left"
            v-model="dropdownShow"
            :content-width="'10rem'"
            class="link--dropdown"
          >
            <button slot="activator" type="button" class="link--dropdown__button">
              <app-avatar src="https://picsum.photos/40/40" size="sm" class="comment-item__avatar" />
            </button>
            <div class="link--dropdown__content">
              <ul>
                <li class="link--dropdown__content__item">
                  <n-link to="/" class="link-dark">
                    <span>Gửi tin nhắn</span>
                  </n-link>
                </li>
                <li class="link--dropdown__content__item">
                  <n-link to="/" class="link-dark">
                    <span>Xem trang cá nhân</span>
                  </n-link>
                </li>
              </ul>
            </div>
          </app-dropdown>
        </div>
        <div class="message-box__item__meta__desc">
          <span>Đặng Duy Long</span>
        </div>
        <div class="message-box__item__meta__time">
          <span>3:21 PM</span>
        </div>
      </div>
      <div class="message-box__item__desc">
        <div class="message-box__item__desc__text">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="message-box__item__desc__actions">
          <button title="Trả lời" @click="reply()">
            <IconReply />
          </button>
          <button title="Chuyển tiếp">
            <IconUpload />
          </button>
          <app-dropdown
            position="left"
            v-model="dropdownEdit"
            :content-width="'10rem'"
            class="link--dropdown"
          >
            <button slot="activator" type="button" class="link--dropdown__button">
              <IconDots />
            </button>
            <div class="link--dropdown__content">
              <ul>
                <li class="link--dropdown__content__item">
                  <a>Sửa tin nhắn</a>
                </li>
                <li class="link--dropdown__content__item">
                  <a @click="visibleDelete = true">Xóa tin</a>
                </li>
              </ul>
            </div>
          </app-dropdown>
        </div>
      </div>
      <div class="message-box__item__desc">
        <div class="message-box__item__desc__text">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quo nemo repellendus voluptas laudantium, dicta et, dolorum itaque quis omnis eveniet ex autem necessitatibus culpa.</p>
        </div>
        <div class="message-box__item__desc__actions">
          <button title="Trả lời" @click="reply()">
            <IconReply />
          </button>
          <button title="Chuyển tiếp">
            <IconUpload />
          </button>
          <app-dropdown
            position="left"
            v-model="dropdownEdit"
            :content-width="'10rem'"
            class="link--dropdown"
          >
            <button slot="activator" type="button" class="link--dropdown__button">
              <IconDots />
            </button>
            <div class="link--dropdown__content">
              <ul>
                <li class="link--dropdown__content__item">
                  <a>Sửa tin nhắn</a>
                </li>
                <li class="link--dropdown__content__item">
                  <a @click="visibleDelete = true">Xóa tin</a>
                </li>
              </ul>
            </div>
          </app-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";

import { getBase64 } from "~/utils/common";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import FriendService from "~/services/social/friend";

import IconPhone from "~/assets/svg/icons/phone-green.svg?inline";
import IconVideo from "~/assets/svg/icons/video-green.svg?inline";
import IconAddUser from "~/assets/svg/icons/add-user-green.svg?inline";
import IconSmile from "~/assets/svg/icons/smile.svg?inline";
import IconImage from "~/assets/svg/icons/image.svg?inline";
import IconUpload from "~/assets/svg/icons/upload.svg?inline";
import IconReply from "~/assets/svg/icons/reply.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

export default {
  components: {
    IconPhone,
    IconVideo,
    IconAddUser,
    IconSmile,
    IconImage,
    IconReply,
    IconUpload,
    IconDots,
    IconClose,
    IconCamera
  },

  props: {
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropdownShow: false,
      textChat: "",
      isReply: false,
      tag: [],
      visible: false,
      visibleDelete: false,
      visibleAddByPhone: false,
      visibleAddGroup: false,
      friendsInfiniteId: +new Date(),
      friendsListQuery: {
        page: 1
      },
      friendsList: [],
      friends: [
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        }
      ]
    };
  },

  methods: {
    reply() {
      this.isReply = true;
    },

    foward() {},

    async handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
      const body = new FormData();
      body.append("avatar_images", fileList[0]);
      console.log("[avatar_images]", fileList[0]);
      this.accountPersonalEditAvatar(body).then(result => {});
    },

    async friendsInfiniteHandler($state) {
      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.friendsListQuery
      });

      if (data.listFriend && data.listFriend.length) {
        this.friendsListQuery.page += 1;
        this.friendsList = this.friendsList.concat(data.listFriend);
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    handleFriendsVisibleChange(isVisible) {
      console.log("handleFriendsVisibleChange", isVisible);

      if (isVisible) {
        this.friendsInfiniteId += 1;
      } else {
        this.friendsList = [];
        this.friendsListQuery.page = 1;
      }
    }
  },

  computed: {
    ...mapState("social", { labelList: "labels" }),

    selectedTags() {
      return this.tag.map(item => {
        const [resultItem = {}] = this.tagOptions.filter(i => i.value === item);
        return resultItem;
      });
    },

    selectedCheckin() {
      const [result = {}] = this.checkinOptions.filter(
        item => item.value === this.checkin
      );
      return result.text;
    },

    tagOptions() {
      return this.friendsList.map(item => ({
        ...item,
        value: item.id,
        text: item.fullname
      }));
    }
  }
};
</script>