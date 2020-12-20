<template>
    <div id="app">
        <menuComponent />
        <router-view/>
    </div>
</template>
<script>
import menuComponent from "@/components/menu";
import store from "./store"
import axios from "axios"
export default {
    name: "App",
    components: {
        menuComponent,
    },
    beforeMount(){
        axios.get("http://localhost:3000/api/etudiants/token", {withCredentials:true})
        .then( result => {
            if(result.data.success){
                store.commit("CONNECT", result.data.success)
            }
        })
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
     color: #42b983;
}
</style>
