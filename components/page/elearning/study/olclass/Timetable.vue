<template>
  <app-modal centered :width="922" :component-class="{ 'time-table-modal': true }"
     :footer="false" title="Thời khóa biểu"
     @close="$emit('close')"
  >
    <div slot="content">
        <div class="table_schedule">
            <h5 class="text-primary mb-4">Thời gian từ ngày</h5>
            <app-table :heads="heads" :data="list">
                <template v-slot:cell(day)="{row}">
                    <td v-if="row.day==1">Sáng</td>
                    <td v-else-if="row.day==2">Chiều</td>
                    <td v-else-if="row.day==3">Tối</td>
                </template>
            </app-table>
        </div>

    </div>
  </app-modal>
</template>

<script>
export default {
    data(){
        return{
            list:[
                {
                    mon:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    web:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    thu:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    fri:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    sat:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    sun:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    day:1
                },
                {
                    mon:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    tue:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    web:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    thu:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    fri:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    sat:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    sun:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    day:2
                },
                {
                    mon:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    tue:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    web:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    thu:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    fri:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    sat:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    sun:["9:00 AM -10:00AM","3:00PM-4:00PM"],
                    day:3
                }
            ],
            heads:[
                {
                    name:"day",
                    text:""
                },
                {
                    name:"mon",
                    text:"Thứ 2"
                },

                {
                    name:"tue",
                    text:"Thứ 3"
                },
                {
                    name:"web",
                    text:"Thứ 4"
                },
                {
                    name:"thu",
                    text:"Thứ 5"
                },
                {
                    name:"fri",
                    text:"Thứ 6"
                },
                {
                    name:"sat",
                    text:"Thứ 7"
                },
                {
                    name:"sun",
                    text:"Chủ nhật"
                }

            ]
        }
    }
}
</script>

<style lang="scss">
.table_schedule{
    table{
        width: 100%;
        border: 1px solid #EEEEEE;
    }
    th, td {
        border: 1px solid #EEEEEE;
    }
    th{
        width: 108px;
        height: 60px
    }
    tr{
        border:1px solid red;
    }
}
</style>