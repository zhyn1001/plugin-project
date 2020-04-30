import testToast from './toast.vue'

let test = {}

test.install = function(Vue, options){
    Vue.prototype.$msg = 'Hello I am test.js'
    Vue.prototype.$myMethod = function(arr){
        if(arr.length < 0) {
            return false
        }else{
            arr = arr.join('-')
            return arr
        }
    }

    Vue.component(testToast.name, testToast)
}

export default test