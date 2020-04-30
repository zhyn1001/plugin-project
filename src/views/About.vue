<template>
    <div class="about" v-model="value">
        <el-calendar v-model="value">
            <template slot="dateCell" slot-scope="{date, data}" >
                <div class="content_box">
                    <div>{{data.date}}</div>
                    <template v-for="item in dateList">
                        <div v-if="data.day === item.date" :key="item.date">
                            <template v-for="subItem in item.list">
                                <div class="item_box" :key="subItem.id">
                                    <div>{{subItem.subjectName}}</div>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
            </template>
        </el-calendar>
    </div>
</template>
<script>
import data from '@/utils/data.json'
export default {
    data(){
        return {
            dateList: [],
            value: new Date('2020-05-01')
        }
    },
    created(){
        this.getData(data.data)
    },
    methods:{
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
            this.dateList = arr
            return arr
        },
    }
}
</script>
<style lang="stylus">
    .el-calendar-table tr td
        min-height 80px
    .el-calendar-table .el-calendar-day
        height 100%
        padding 0
</style>