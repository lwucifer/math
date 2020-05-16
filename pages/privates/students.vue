<template>
  <div class="container">
      <h3>Danh sách học sinh</h3>
      <div class="wrap_list-students">
          <app-search
            size="sm"
            placeholder="Tìm kiếm học sinh"
          />
          <filter-button
            class="mr-2"
          />
          <div>
              <app-select 
                placeholder="Năm học"
                size="sm"
                class="mr-2"
              />
              <app-select 
                placeholder="Lớp học"
                size="sm"
              />          
          </div>
      </div>
      <div class="wrap-table">
          <app-table :heads="heads" 
                    :data="list"
            >
              <template v-slot:cell(name)="{row}" >
                  <td class="wrap-name__table">{{get(row,"name","")}}</td>
              </template>
              <template v-slot:cell(class)="{row}" >
                  <td class="wrap-name__table">{{get(row,"class","")}}</td>
              </template>
              <template v-slot:cell(percent)="{row}" >
                  <td style="width:30%">
                      <div class="d-flex align-items-center">
                          <span class="mr-3">{{ get(row,"percent","") }}%</span>
                          <div class="w-100">
                              <app-progress
                                    :percentage="row.percent"
                                    rounded
                                />
                          </div>
                      </div>
                  </td>
              </template>
          </app-table>
      </div>
      <app-pagination
        :pagination="pagination"
        :type="1"
        class="right-pagination"
      />
  </div>
</template>

<script>
import { get } from "lodash"
export default {
    data(){
        return{
            heads:[
                {
                    name:"name",
                    text:"Họ và tên",
                    sort:"true"
                },
                {
                    name:"year",
                    text:"Năm học"
                },
                {
                    name:"class",
                    text:"Lớp"
                },
                {
                    name:"mark",
                    text:"Điểm chuyên cần"
                },
                {
                    name:"percent",
                    text:"Tỉ lệ hoàn thành các bài học và khóa học"
                }
            ],
            list:[
                {
                    name:"Nguyễn Văn A",
                    year:"2020",
                    class:"10A",
                    mark:10,
                    percent:50
                },
                {
                    name:"Nguyễn Văn A",
                    year:"2020",
                    class:"10A",
                    mark:10,
                    percent:50
                }
            ],
            pagination:{
                "totalElements": 44,
                "last": false,
                "totalPages": 5,
                "size": 10,
                "number": 0,
                "first": true,
                "numberOfElements": 10
            }
        }
    },
    methods:{
        get
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/privates/_students.scss";
</style>