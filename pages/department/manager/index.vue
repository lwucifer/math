<template>
  <div class="container">
      <div class="row">
          <div class="col-3">
              <DepartmentManagerSide active="1"/>
          </div>
          <div class="col-9 wrap-department-manager">
              <h5 class="color-primary">Tổng quan</h5>
              <hr class="mt-3 mb-4" />
              <div class="row">
                  <div>
                      <app-avatar :src="school.avatar" :size="150" :shape="'square'" class="avatar"/>
                  </div>
                  <div class="col-9 department-manager-text">
                      <h3>{{school.name}}</h3>
                      <p> {{school.introduce}}</p>
                      <p>Mã trường: <strong>{{school.code}}</strong></p>
                      <P>Địa chỉ: <strong>{{school.address}}</strong></P>
                      <p>Số điện thoại: <strong>{{school.phone}}</strong></p>
                      <p>Email: <strong>{{school.email}}</strong></p>
                      <p>Tổng số giáo viên: <strong>{{school.teachers}}</strong></p>
                      <p>Tổng số học sinh: <strong>{{school.students}}</strong></p>
                      <p>Số bài đã duyệt: <strong>{{school.lessons}}</strong></p>
                      <p>Số khóa đã duyệt: <strong>{{school.course}}</strong></p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import DepartmentManagerSide from "~/components/page/department/DepartmentManagerSide"
import {SCHOOL} from "~/server/fakedata/department/test"
export default {
    components:{
        DepartmentManagerSide
    },
    data(){
        return{
            school:SCHOOL
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/department/_department-manager.scss";
</style>