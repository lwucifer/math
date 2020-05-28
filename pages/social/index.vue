<template>
  <div class="page-social container">
    <div class="row">
      <div class="col page-social__col-menu">
        <div
          v-sticky
          sticky-offset="{ top: 101 }"
          :sticy-z-index="9"
          class="page-social__aside-wrapper"
        >
          <SocialMenu />
        </div>
      </div>

      <div class="col page-social__col-content">
        <nuxt-child />
      </div>

      <div class="col-md-3">
        <div
          v-sticky
          sticky-offset="{ top: 101 }"
          :sticy-z-index="9"
          class="page-social__aside-wrapper"
        >
          <AsideBox class="page-social__aside-birthday" title="Sinh nhật">
            <div class="aside-birthday">
              <div class="aside-birthday__img">
                <IconSocialBirthday />
              </div>
              <div class="aside-birthday__text text-dark">
                <span class="font-weight-medium">Trâm Anh</span>&nbsp;và
                <span class="font-weight-medium">Ngọc Trinh</span> có sinh nhật vào hôm nay
              </div>
            </div>
          </AsideBox>

          <AsideBox class="page-social__aside-friends-list" title="Bạn bè đang trực tuyến">
            <MessagesFriendItem
              v-for="i in 10"
              :key="i"
              name="Hồ Ngọc Thạch"
              avatar="https://picsum.photos/40/40"
              avatar-size="sm"
              online
              show-button-add
            />
          </AsideBox>

          <AsideBox class="page-social__aside-friends-list" title="Gợi ý kết bạn">
            <MessagesFriendItem
              v-for="i in 10"
              :key="i"
              name="Hồ Ngọc Thạch"
              avatar="https://picsum.photos/40/40"
              avatar-size="sm"
              online
            />
          </AsideBox>

          <AsideBox title="Bài giảng khóa học nổi bật">
            <div class="page-social__aside-tabs">
              <a href :class="{ active: coursesTab === 0 }" @click.prevent="coursesTab = 0">Miễn phí</a>
              <a href :class="{ active: coursesTab === 1 }" @click.prevent="coursesTab = 1">Trả phí</a>
            </div>

            <div class="time-aside-tabs-content">
              <div v-show="coursesTab === 0" class="page-social__aside-tab-pane">
                <app-content-box
                  v-for="item in freeCourses || []"
                  :key="item.id"
                  class="mb-4"
                  size="sm"
                  :image="get(item, 'avatar.low', null)"
                >
                  <n-link slot="image" :to="`/elearning/${item.id}`">
                    <img :src="item.image" :alt="item.name" />
                  </n-link>

                  <n-link slot="title" :to="`/elearning/${item.id}`">{{ item.name }}</n-link>

                  <!-- <n-link slot="desc" to>{{ get(item, 'teacher.name', null) }}</n-link> -->
                </app-content-box>
              </div>

              <div v-show="coursesTab === 1" class="page-social__aside-tab-pane">
                <app-content-box
                  v-for="item in privateCourses || []"
                  :key="item.id"
                  class="mb-4"
                  size="sm"
                  :image="get(item, 'avatar.low', null)"
                >
                  <n-link slot="image" :to="`/elearning/${item.id}`">
                    <img :src="item.image" :alt="item.name" />
                  </n-link>

                  <n-link slot="title" :to="`/elearning/${item.id}`">{{ item.name }}</n-link>

                  <!-- <n-link slot="desc" to>{{ get(item, 'teacher.name', null) }}</n-link> -->
                </app-content-box>
              </div>

              <div class="text-center mt-4">
                <n-link class="text-decoration-none" to="/elearning">Xem thêm</n-link>
              </div>
            </div>
          </AsideBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import LimitMessagesSerice from "~/services/message/LimitMessages";
import SearchService from "~/services/elearning/public/Search";
import SocialMenu from "~/components/page/social/SocialMenu";
import AsideBox from "~/components/layout/asideBox/AsideBox";
import MessagesFriendItem from "~/components/page/social/messages/MesagesFriendItem";
import IconSocialBirthday from "~/assets/svg/icons/social-birthday.svg?inline";

export default {
  middleware: "authenticated",

  components: {
    SocialMenu,
    AsideBox,
    MessagesFriendItem,
    IconSocialBirthday
  },

  async asyncData({ $axios, error }) {
    try {
      const getFreeCourse = () =>
        new SearchService($axios)[actionTypes.BASE.ADD]({
          free: true,
          limit: 5
        });
      const getPrivateCourse = () =>
        new SearchService($axios)[actionTypes.BASE.ADD]({
          free: false,
          limit: 5
        });

      const [
        { data: freeCourses = [] },
        { data: privateCourses = [] }
      ] = await Promise.all([getFreeCourse(), getPrivateCourse()]);

      return {
        freeCourses: freeCourses.content || [],
        privateCourses: privateCourses.content || []
      };
    } catch (e) {
      error({ statusCode: e.status, message: e.message });
    }
  },

  data() {
    return {
      // Course tabs
      coursesTab: 0,
      coursesTabsList: [
        {
          text: "Miễn phí",
          value: 0
        },
        {
          text: "Trả phí",
          value: 1
        }
      ]
    };
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/social/_social-index.scss";
</style>