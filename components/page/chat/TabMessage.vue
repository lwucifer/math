<template>
  <div class="col-md-8 message-chat__content">
    <div class="aside-box">
      <div class="aside-box__top" v-if="isCreate">
        <div class="aside-box__top__create d-flex-center w-100">
          <span class="color-999 mr-2">Đến:</span>
          <app-select
            mode="tags"
            placeholder="Gửi cho ai?"
            style="flex: 1"
            :options="tagOptions"
            v-model="tag"
            @visible-change="handleFriendsVisibleChange"
          >
            <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
              <app-avatar
                :src="option.avatar && option.avatar.low ? option.avatar.low : null"
                size="sm"
                class="mr-3"
              ></app-avatar>
              {{ option.text }}
            </div>

            <client-only>
              <infinite-loading
                slot="options-append"
                :identifier="friendsInfiniteId"
                @infinite="friendsInfiniteHandler"
              />
            </client-only>
          </app-select>
        </div>
      </div>
      <div class="aside-box__top" v-else>
        <div class="message-desc">
          <div class="message-decs__image">
            <app-avatar src="https://picsum.photos/40/40" size="sm" class="comment-item__avatar" />
          </div>
          <div class="message-decs__title">
            <span>Đặng Duy Long</span>
          </div>
        </div>
        <div class="message-tool">
          <ul class="list-unstyle">
            <li>
              <a href="#">
                <IconPhone width="15" height="15" />
              </a>
            </li>
            <li>
              <a href="#">
                <IconVideo width="15" height="15" />
              </a>
            </li>
            <li>
              <a @click="visibleAddByPhone = true">
                <IconAddUser width="15" height="15" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="aside-box__content">
        <div class="message-box">
          <!-- message date -->
          <div class="message-box__time">
            <div class="message-box__time__line"></div>
            <div class="message-box__time__content">
              <span>Thứ 5, Ngày 19/09/2019</span>
            </div>
          </div>
          <!-- END / message date -->
          <!-- message box item -->
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
                      <app-avatar
                        src="https://picsum.photos/40/40"
                        size="sm"
                        class="comment-item__avatar"
                      />
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
                    v-model="dropdownShow"
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
                    v-model="dropdownShow"
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
          <!-- message box item -->
          <!-- message box item -->
          <div class="message-box__item item__1">
            <div class="message-box__item__content">
              <div class="message-box__item__meta">
                <div class="message-box__item__meta__image">
                  <app-dropdown
                    position="right"
                    v-model="dropdownShow"
                    :content-width="'10rem'"
                    class="link--dropdown"
                  >
                    <button slot="activator" type="button" class="link--dropdown__button">
                      <app-avatar
                        src="https://picsum.photos/40/40"
                        size="sm"
                        class="comment-item__avatar"
                      />
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
                  <span>Hanna</span>
                </div>
                <div class="message-box__item__meta__time">
                  <span>3:21 PM</span>
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
                    v-model="dropdownShow"
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
          <!-- message box item -->
          <!-- message box item -->
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
                      <app-avatar
                        src="https://picsum.photos/40/40"
                        size="sm"
                        class="comment-item__avatar"
                      />
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
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quo nemo repellendus voluptas laudantium, dicta et, dolorum itaque quis omnis eveniet ex autem necessitatibus culpa.</p>
                </div>
                <div class="message-box__item__desc__actions">
                  <button title="Trả lời" @click="reply()">
                    <IconReply />
                  </button>
                  <button title="Chuyển tiếp" @click="visible = true">
                    <IconUpload />
                  </button>
                  <app-dropdown
                    position="left"
                    v-model="dropdownShow"
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
        </div>
      </div>
      <div class="aside-box__bottom">
        <div v-if="isReply" class="aside-box__bottom__reply">
          <p>
            Đang phản hồi
            <b>Minh</b>
          </p>
          <p class="color-999 mt-1 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <IconClose @click="isReply = false" class="btn-close" />
        </div>
        <div class="input-group">
          <input class="input-control" v-model="textChat" placeholder="Nhấp để chat" />
          <div class="input-group_addon">
            <ul class="list-unstyle">
              <li>
                <a href="#">
                  <IconSmile width="15" height="15" />
                </a>
              </li>
              <li>
                <app-upload class="cgi-upload-avt change-avatar" @change="handleUploadChange">
                  <template>
                    <IconImage width="15" height="15" />
                  </template>
                </app-upload>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal tạo nhóm chát -->
    <app-modal
      centered
      :width="420"
      :component-class="{ 'create-group-chat-modal': true }"
      v-if="visibleAddGroup"
    >
      <div slot="content">
        <h5>Tạo nhóm chat</h5>
        <div class="d-flex-center">
          <app-upload class="cgi-upload-avt change-avatar-group mr-3" @change="handleUploadChange">
            <template>
              <IconCamera width="20" height="20" />
            </template>
          </app-upload>
          <input type="text" class="input-name-group" placeholder="Tên nhóm chat" />
        </div>
        <app-search class="mb-0" />
        <div class="contact-list">
          <div class="item d-flex-center" v-for="(item, index) in friends" :key="index">
            <app-avatar :src="item.avatar" :size="30" class="mr-3" />
            <span>{{item.name}}</span>
            <app-checkbox class="ml-auto" />
          </div>
        </div>
        <div class="text-center mt-4">
          <app-button
            size="sm"
            color="info"
            class="mr-3"
            square
            @click="visibleAddGroup = false"
          >Hủy</app-button>
          <app-button size="sm" square>Tạo</app-button>
        </div>
      </div>
    </app-modal>

    <!-- Modal thêm bạn qua số điện thoại -->
    <app-modal
      centered
      :width="420"
      :component-class="{ 'message-foward-tags-modal': true }"
      v-if="visibleAddByPhone"
    >
      <div slot="content">
        <h5 class="mb-3">Thêm bạn bằng số điện thoại</h5>
        <app-input class="mb-0" />
        <div class="text-right mt-3">
          <app-button
            size="sm"
            color="info"
            class="mr-3"
            square
            @click="visibleAddByPhone = false"
          >Hủy</app-button>
          <app-button size="sm" square>Tìm</app-button>
        </div>
      </div>
    </app-modal>

    <!-- Modal xóa tin nhắn -->
    <app-modal
      centered
      :width="250"
      :component-class="{ 'message-foward-tags-modal': true }"
      v-if="visibleDelete"
    >
      <div slot="content" class="text-center">
        <h5 class="mb-4">Bạn muốn gỡ tin nhắn?</h5>
        <div class="text-center mt-4">
          <app-button size="sm" color="info" class="mr-3" square @click="visibleDelete = false">Hủy</app-button>
          <app-button size="sm" square>Xóa</app-button>
        </div>
      </div>
    </app-modal>

    <!-- Modal foward -->
    <app-modal
      centered
      :width="606"
      :component-class="{ 'message-foward-tags-modal': true }"
      v-if="visible"
    >
      <div slot="content">
        <h5 class="mb-4">Chuyển tiếp đến</h5>
        <app-select
          mode="tags"
          placeholder="Gửi cho ai?"
          style="width: 100%"
          :options="tagOptions"
          v-model="tag"
          @visible-change="handleFriendsVisibleChange"
        >
          <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
            <app-avatar
              :src="option.avatar && option.avatar.low ? option.avatar.low : null"
              size="sm"
              class="mr-3"
            ></app-avatar>
            {{ option.text }}
          </div>

          <client-only>
            <infinite-loading
              slot="options-append"
              :identifier="friendsInfiniteId"
              @infinite="friendsInfiniteHandler"
            />
          </client-only>
        </app-select>
        <div class="text-right mt-4">
          <app-button size="sm" color="info" class="mr-3" square @click="visible = false">Hủy</app-button>
          <app-button size="sm" square @click="foward()">Gửi</app-button>
        </div>
      </div>
    </app-modal>
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