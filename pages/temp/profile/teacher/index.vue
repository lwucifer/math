<template>
<div class="container">
    <div class="wrapProfileTeacher">
        <ProfileTeacherHead/>
        <div class="wrapInfoTeacher">
            <strong>Thông tin giáo viên</strong>
            <div>
              <span v-if="!readMoreActivated">{{infoTeacher.slice(0,200)}}</span>
              <a v-if="!readMoreActivated" href="#" v-on:click="activeReadMore">Xem thêm</a>
              <span v-if="readMoreActivated" v-html="infoTeacher"></span>
            </div>
        </div>
         <hr/>
        <div class="wrapSlider__ProfileTeacher">
            <ProfileSliderTab
                :items="lessons"
                :name="'Bài học và khóa giảng'"
            />
        </div>
    </div>
</div>
</template>

<script>
import ProfileTeacherHead from "~/components/page/profile/teacher/ProfileTeacherHead";
import ProfileSliderTab from "~/components/page/profile/ProfileSliderTab";
export default {
    layout:"backhome",
    data(){
        return{
            infoTeacher:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus accumsan quam non tempus. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum. Quisque scelerisque porttitor sem, dictum dapibus tortor blandit vestibulum",
            readMoreActivated:false,
            sliderOptions: {
                spaceBetween: 20,
                slidesPerView: 5,
                setWrapperSize: true,
                autoHeight: true,
                watchOverflow: true,
                showName: true
            },
            lessons: [
        {
          id: 1,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 1,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        },
        {
          id: 2,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 1,
          onlineStatus: "Lớp học đang diễn ra",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        },
        {
          id: 3,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 0,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        },
        {
          id: 8,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 0,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        }
      ],

       }
    },
    components:{
        ProfileTeacherHead,
        ProfileSliderTab
    },
    methods:{
      activeReadMore(){
        this.readMoreActivated= true;
      }
    }
}
</script>

<style lang="scss">
    @import "~/assets/scss/components/profile/_profile-teacher.scss";
</style>