<template>
<div class="col-md-4 message-chat__info">
  <div class="message-info">
    <div class="message-info__acc">
      <div class="message-info__acc__image">
        <app-avatar src="https://picsum.photos/40/40" size="md" class="comment-item__avatar" />
      </div>
      <div class="message-info__acc__title">
        <span>
          <a href="#">Đặng Duy Long</a>
        </span>
      </div>
    </div>
    <div class="message-info__box">
      <h5 class="message-info__box__title">File chia sẻ</h5>
      <div class="message-info__box__content attachment">
        <ul class="list-unstyle" v-for="(item, index) in fileshare" :key="index">
          <li>
            <a :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="message-info__box">
      <h5 class="message-info__box__title">Ảnh chia sẻ</h5>
      <div class="message-info__box__content images-attachment">
        <ul class="list-unstyle">
          <li v-for="(item, index) in imageshare" :key="index">
            <n-link to>
              <img :src="item.image"/>
            </n-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    fileshare: {
      type: Array,
      default: () => [],
      required: true
    },
    imageshare: {
      type: Array,
      default: () => [],
      required: true
    }
  }
};
</script>