import calendarTest from './calendar.vue'

let calendar = {}
calendar.install = function(Vue, options) {
    Vue.component(calendarTest.name, calendarTest)
}

export default calendar