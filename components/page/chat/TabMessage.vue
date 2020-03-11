<template>
  <div class="col-md-8 message-chat__content">
    <div class="aside-box">
      <div class="aside-box__top">
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
              <a href="#">
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
                  <app-avatar
                    src="https://picsum.photos/40/40"
                    size="sm"
                    class="comment-item__avatar"
                  />
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
                  <button title="Reply">
                    <IconReply />
                  </button>
                  <button title="Foward">
                    <IconUpload />
                  </button>
                  <app-dropdown
                    position="right"
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
                          <n-link to="/" class="link-dark">
                            <IconTickGray />
                            <span>Item 1</span>
                          </n-link>
                        </li>
                        <li class="link--dropdown__content__item">
                          <n-link to="/" class="link-dark">
                            <IconTickGray />
                            <span>Item 2</span>
                          </n-link>
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
                  <button title="Reply">
                    <IconReply />
                  </button>
                  <button title="Foward">
                    <IconUpload />
                  </button>
                  <app-dropdown
                    position="right"
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
                          <n-link to="/" class="link-dark">
                            <IconTickGray />
                            <span>Item 1</span>
                          </n-link>
                        </li>
                        <li class="link--dropdown__content__item">
                          <n-link to="/" class="link-dark">
                            <IconTickGray />
                            <span>Item 2</span>
                          </n-link>
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
                  <app-avatar
                    src="https://picsum.photos/40/40"
                    size="sm"
                    class="comment-item__avatar"
                  />
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
                  <button>
                    <IconReply />
                  </button>
                  <button>
                    <IconUpload />
                  </button>
                  <button>
                    <IconDots />
                  </button>
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
                  <app-avatar
                    src="https://picsum.photos/40/40"
                    size="sm"
                    class="comment-item__avatar"
                  />
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
                  <button>
                    <IconReply />
                  </button>
                  <button>
                    <IconUpload />
                  </button>
                  <button>
                    <IconDots />
                  </button>
                </div>
              </div>
              <div class="message-box__item__desc">
                <div class="message-box__item__desc__text">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quo nemo repellendus voluptas laudantium, dicta et, dolorum itaque quis omnis eveniet ex autem necessitatibus culpa.</p>
                </div>
                <div class="message-box__item__desc__actions">
                  <button>
                    <IconReply />
                  </button>
                  <button>
                    <IconUpload />
                  </button>
                  <button>
                    <IconDots />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- message box item -->
          <!-- message date -->
          <div class="message-box__time">
            <div class="message-box__time__line"></div>
            <div class="message-box__time__content">
              <span>Thứ 5, Ngày 19/09/2019</span>
            </div>
          </div>
          <!-- END / message date -->
          <!-- message box item -->
          <div class="message-box__item item__1">
            <div class="message-box__item__content">
              <div class="message-box__item__meta">
                <div class="message-box__item__meta__image">
                  <app-avatar
                    src="https://picsum.photos/40/40"
                    size="sm"
                    class="comment-item__avatar"
                  />
                </div>
                <div class="message-box__item__meta__desc">
                  <span>Hanna</span>
                </div>
                <div class="message-box__item__meta__time">
                  <span>3:21 PM</span>
                </div>
              </div>
              <div class="message-box__item__desc">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
          <!-- message box item -->
          <!-- message box item -->
          <div class="message-box__item item__0">
            <div class="message-box__item__content">
              <div class="message-box__item__meta">
                <div class="message-box__item__meta__image">
                  <app-avatar
                    src="https://picsum.photos/40/40"
                    size="sm"
                    class="comment-item__avatar"
                  />
                </div>
                <div class="message-box__item__meta__desc">
                  <span>Đặng Duy Long</span>
                </div>
                <div class="message-box__item__meta__time">
                  <span>3:21 PM</span>
                </div>
              </div>
              <div class="message-box__item__desc">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
          <!-- message box item -->
        </div>
      </div>
      <div class="aside-box__bottom">
        <div class="input-group">
          <input class="input-control" type="text" placeholder="Nhấp để chat" />
          <div class="input-group_addon">
            <ul class="list-unstyle">
              <li>
                <a href="#">
                  <IconSmile width="15" height="15" />
                </a>
              </li>
              <li>
                <a href="#">
                  <IconImage width="15" height="15" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconPhone from "~/assets/svg/icons/phone-green.svg?inline";
import IconVideo from "~/assets/svg/icons/video-green.svg?inline";
import IconAddUser from "~/assets/svg/icons/add-user-green.svg?inline";
import IconSmile from "~/assets/svg/icons/smile.svg?inline";
import IconImage from "~/assets/svg/icons/image.svg?inline";
import IconUpload from "~/assets/svg/icons/upload.svg?inline";
import IconReply from "~/assets/svg/icons/reply.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";

export default {
  components: {
    IconPhone,
    IconVideo,
    IconAddUser,
    IconSmile,
    IconImage,
    IconReply,
    IconUpload,
    IconDots
  },

  data() {
    return {
      dropdownShow: false
    }
  },
};
</script>