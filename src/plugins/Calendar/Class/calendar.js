class Calendar {
    constructor () {

    }

    isLeapYear = (year) => {
        return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
    };
    // 2.获得每个月的日期有多少，注意 month - [0-11]
    // 闰年2月29天，平年28天
    getMonthCount = (year, month) => {
        let arr = [
            31, null, 31, 30,
            31, 30, 31, 31,
            30, 31, 30, 31
        ];
        let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
        return Array.from(new Array(count), (item, value) => value + 1);
    };
    // 3.获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
    getWeekday = (year, month) => {
        let date = new Date(year, month, 1);
        return date.getDay();
    };
    // 获取某年某月的最后一天是星期几
    getWeekEndDay = (year, month) => {
        let monthCount = this.getMonthCount(year, month)
        let date = new Date(year, month, monthCount.slice(-1));
        return date.getDay();
    }
    // 4.获得上个月的天数
    getPreMonthCount = (year, month) => {
        if (month === 0) {
            return this.getMonthCount(year - 1, 11);
        } else {
            return this.getMonthCount(year, month - 1);
        }
    };
    // 5.获得下个月的天数
    getNextMonthCount = (year, month) => {
        if (month === 11) {
            return this.getMonthCount(year + 1, 0);
        } else {
            return this.getMonthCount(year, month + 1);
        }
    };
    // 获取下一个月
    getNextMonth = (month) => {
        if (month === 11) {
            return 0
        } else {
            return month + 1;
        }
    }
    // 获取上一个月
    getPreMonth = (month) => {
        if (month === 0) {
            return 1
        } else {
            return month - 1;
        }
    }
    // 获取年
    getYear = (year, month) => {
        if (month === 0) {
            return year - 1
        }else if (month === 11) {
            return year + 1;
        }else{
            return year
        }
    }
    addZero = (num) => {
        if(num<10){
            return '0'+num
        }
        return num
    }
    getDateList = ({sign, list, year, month, nowDay}) => {
        let data = []
        for(let i=0;i<list.length;i++) {
            let o = {}
            o.day = list[i]
            if(sign === -1) {
                o.date = year + '-' + this.addZero(this.getPreMonth(month)+1) + '-' + this.addZero(list[i])
            } else if(sign === 1) {
                o.date = year + '-' + this.addZero(this.getNextMonth(month)+1) + '-' + this.addZero(list[i])
            }else if(sign === 0) {
                if(nowDay === list[i]){
                    o.nowDay = list[i]
                }
                o.date = year + '-' + this.addZero(month+1) + '-' + this.addZero(list[i])
            }
            data.push(o)
        }
        return data
    }
    // 这里获得我们第一次的 数据 数组
    updateCalendar = (date) => {
        let year = null,month=null,day=null,nowDay=null
        if (typeof date === 'undefined') {
            let nowDate = new Date();
            year = nowDate.getFullYear();
            month = nowDate.getMonth();
            day = nowDate.getDate();
        }else{
            let dateLi = date.split('-')
            year = dateLi[0]
            month = dateLi[1] - 1
            day = dateLi[2]
        }
        nowDay = day
        // 生成日历数据，上个月剩下的的 x 天 + 当月的 28（平年的2月）或者29（闰年的2月）或者30或者31天 + 下个月的 y 天 = 42
        let res = [];
        let currentMonth = this.getMonthCount(year, month);
        let preMonth = this.getPreMonthCount(year, month);
        let nextMonth = this.getNextMonthCount(year, month);
        let whereMonday = this.getWeekday(year, month);
        whereMonday === 0 ? whereMonday = 7 : whereMonday

        // 这里当 whereMonday 为 0 的时候会截取上月的所有数据
        let preDays = whereMonday - 1
        let preArr = preDays === 0 ? [] : preMonth.slice(-1 * preDays)
        
        let a = this.getWeekEndDay(year, month) === 0 ? 7 : this.getWeekEndDay(year, month) // 本月最后一天是星期几

        let nextArr = nextMonth.slice(0, (7-a));

        let preList = this.getDateList({sign: -1, list: preArr, year: year, month:month})
        
        let NextList = this.getDateList({sign: 1, list: nextArr, year: year, month: month})
        
        let result = this.getDateList({sign: 0, list: currentMonth, year: year, month: month, nowDay: nowDay})
        
        res = [].concat(preList, result, NextList);
        return res
    }
}
let calendar = new Calendar()
export { calendar }