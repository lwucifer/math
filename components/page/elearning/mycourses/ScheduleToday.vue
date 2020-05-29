<template>
  <div class="wrap-schedulte-today-study-space">
      <div class="d-flex">
          <h4>Học gì hôm nay?</h4>
          <app-date-picker
            label="Chọn thời gian:"
            class="schedule-today-date-picker"
            v-model="dateSchedule"
             @input="changeDate"
             valueFormat="YYYY-MM-DD"
             placeholder="YYYY-MM-DD"
          >
          </app-date-picker>
      </div>
      <div class="mb-3">
          <div class="day">
            <div class="item">Thứ 2</div>
            <div class="item">Thứ 3</div>
            <div class="item">Thứ 4</div>
            <div class="item">Thứ 5</div>
            <div class="item">Thứ 6</div>
            <div class="item">Thứ 7</div>
            <div class="item sunday" >Chủ nhật</div>
        </div>
        <div class="day-number" v-if="dateSchedule">
            <div 
                class="item"
                v-for="(item, index) in dayslist"
                :key="index"
            >
                <span 
                    v-if="item==dayslist[dayslist.length -1]" 
                    class="sunday"
                     @click="changeDateInWeek(item)"
                     :class="checkDate(item) ? 'active' :''"
                     >
                    {{item | moment('DD')}}
                </span>
                
                <span v-else :class="checkDate(item) ? 'active' :''" @click="changeDateInWeek(item)">
                    {{item | moment('DD')}}
                </span>
            </div>
        </div>
      </div>
      <div class="row schedule-item">
          <IconEllipse2 class="col-md-1"/>
          <h5 class="col-md-3">Học online</h5>
          <span class="col-md-5">Phòng học số 3</span>
          <span class="col-md-3">Thời gian học: 15:30 - 16:30</span>
      </div>
      <div class="row schedule-item">
          <IconEllipse2 class="col-md-1"/>
          <h5 class="col-md-3">Làm bài kiểm tra</h5>
          <span class="col-md-5">Phòng học số 3</span>
          <span class="col-md-3">Thời gian học: 15:30 - 16:30</span>
      </div>
      <div class="row schedule-item">
          <IconEllipse2 class="col-md-1"/>
          <h5 class="col-md-3">Làm bài kiểm tra</h5>
          <span class="col-md-5">Phòng học số 3</span>
          <span class="col-md-3">Thời gian học: 15:30 - 16:30</span>
      </div>
  </div>
</template>

<script>
import IconEllipse2 from '~/assets/svg/icons/ellipse2.svg?inline';
import moment from 'moment';
export default {
    components:{
        IconEllipse2
    },
    data(){
        return{
            dateSchedule:'',
            dayslist:[]
        }
    },
    methods:{
        changeDate(date){
            this.dayslist.length = 0
            for(let i=1;i<=7;i++){
                 const day = moment(date).day(i.toString()).toString()
                 this.dayslist.push(day)
            }
            console.log(this.dayslist)
        },
        checkDate(d1){
            let date1 = moment(d1).format("YYYY-MM-DD").toString()
            let date2 = moment(this.dateSchedule).format("YYYY-MM-DD").toString()
            if(date1 == date2){
                return true
            }
            else 
            return false
        },
        changeDateInWeek(i){
            this.dateSchedule = moment(i).format("YYYY-MM-DD").toString()
            console.log(this.dateSchedule)
        },
        moment
    }
}
</script>

<style>

</style>