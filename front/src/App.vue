<template>
    <div id="app">
        <menuComponent />
        <router-view/>
    </div>
</template>
<script>
import menuComponent from "@/components/menu";

export default {
    name: "App",
    components: {
        menuComponent,
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
