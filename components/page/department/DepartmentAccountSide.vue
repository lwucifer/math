 <template>
   <div class="department-side">
       <div>
           <div class="editavatar__Department">
               <app-avatar src="https://picsum.photos/150/150" :size="125"/>
               <div class="btn-camera">
                   <IconCamera/>
               </div>
           </div>
           <strong style="border:1px solid red;">Phòng GDĐT Huyện Mê Linh</strong>
       </div>
   </div>
 </template>
 
 <script>
 import IconCamera from "~/assets/svg/icons/camera.svg?inline"
 export default {
     components:{
         IconCamera
     }
 }
 </script>
 
 <style lang="scss">
@import "~/assets/scss/components/department/_department-account-side.scss";
 </style>