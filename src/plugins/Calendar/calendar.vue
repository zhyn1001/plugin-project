<template>
    <div id="Calendar_container">
        <div class="month" @click="preMonth">上一月</div>
        <div class="month" @click="nextMonth">下一月</div>
        <table class="Calendar__table" cell-spacing="0">
            <thead>
                <tr>
                    <th width="100">周一</th>
                    <th width="100">周二</th>
                    <th width="100">周三</th>
                    <th width="100">周四</th>
                    <th width="100">周五</th>
                    <th width="100">周六</th>
                    <th width="100">周日</th>
                </tr>
            </thead>
            <tbody id="tbody">
                <tr v-for="(item, index) in list" :key="index">
                    <td v-for="child in item" :key="child.day">
                        <div class="calendar__td__cell">
                            <div class="calendar__cell_day">{{child.day}}</div>

                        </div>
                        
                    </td>
                </tr>
                <slot name=""></slot>
            </tbody>
        </table>
    </div>
</template>
<script>
import {calendar} from './Class/calendar'
import data from '@/utils/data.json'
export default {
    name: 'calendar-test',
    data() {
        return {
            list:[],
            spaceList: ['morningLessons', 'afternoonLessons', 'eveningLessons'],
            now_date: '',
        }
    },
    created() {
        this.format()
    },
    methods: {
        getData(data) {
            let arr = []
            let list = data.lessonScheduleWeekList
            for(let i=0;i<list.length;i++) {
                let weekList = list[i].weekDayList
                let li = list[i].lessonScheduleDayList
                for(let k=0;k<weekList.length;k++) {
                    if(li.length>0) {
                        for(let j=0;j<li.length;j++) {
                            if(weekList[k].date === li[j].sectDate) {
                                weekList[k].list = li[j].morningLessons.concat(li[j].afternoonLessons).concat(li[j].eveningLessons)
                            }
                        }
                    }
                }
                arr = arr.concat(list[i].weekDayList)
            }
            return arr
        },
        format(date){
            let res = calendar.updateCalendar(date)
            // let dateList = this.getData(data.data)
            // for(let i=0;i<res.length;i++) {
            //     for(let j=0;j<dateList.length;j++) {
            //         if(res[i].date === dateList[j].date) {
            //             res[i].weekNum = dateList[j].weekNum
            //             res[i].list = dateList[j].list
            //         }
            //     }
            // }
            let _res = []
            let arr = []
            for(var m=0;m<=res.length;m++){
                if(m==0){
                    arr.push(res[m])
                }else{
                    if(m % 7==0){
                        _res.push(arr)
                        arr = []
                    }
                    arr.push(res[m])
                }
            }
            
            this.list = _res
        },
        preMonth(){
            this.format()
        },
        nextMonth() {}
    }
}
</script>
<style lang="stylus">
    #Calendar_container 
        width 100%
        .Calendar__table
            width 100%
            border-collapse collapse
            border-spacing 0
            tr
                th
                    height 25px
                    color #b2b2b2
                td, th
                    border 1px solid #b2b2b2
                    padding 0
            .calendar__td__cell
                min-height 80px
                .calendar__cell_day
                    test-align right

</style>