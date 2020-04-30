<template>
    <div class="home">
        <test-toast ref="toast"></test-toast>
    </div>
</template>

<script>
export default {
    name: "Home",
    components: {},
    created(){
        console.log(this.$msg)
    }
};
</script>
