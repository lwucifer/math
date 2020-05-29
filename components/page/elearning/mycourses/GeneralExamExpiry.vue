<template>
  <div class="wrap-general-exam-expiry">
      <h4 class="mb-4">Bài kiểm tra sắp hết hạn</h4>
      <app-table :heads="heads" :data="list">
          <template v-slot:cell(status)="{ row }">
              <td>
                  <span v-if="row.status == 1" class="text-primary">Đã nộp</span>
                  <span v-if="row.status == 0" >Chưa nộp</span>
              </td>
          </template>
      </app-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            heads:[
                {
                    name:'title',
                    text:'Tiêu đề'
                },
                {
                    name:'date',
                    text:'Hạn nộp'
                },
                {
                    name:'status',
                    text:'Trạng thái'
                }
            ],
            list:[
                {
                    title:"baifd hojcaocs asdjdasjodajd jdaoisdqwudaodal",
                    date:"21/12/2022",
                    status:1
                },
                {
                    title:"baifd hojcaocs asdjdasjodajd jdaoisdqwudaodal",
                    date:"21/12/2022",
                    status:0
                },
                {
                    title:"baifd hojcaocs asdjdasjodajd jdaoisdqwudaodal",
                    date:"21/12/2022",
                    status:1
                }
            ]
        }
    }
}
</script>

<style>

</style>