<template>
    <div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import store from '../store'

export default {
    methods: {
        disconnect(){
            
        }
    },
    computed: {
        ...mapState(['connected'])
    },
    mounted() {
        if(this.connected){
            axios.get("http://localhost:3000/api/etudiants/logout", {withCredentials:true})
            .then( () => {
                store.commit("CONNECT", false)
            });
        }
        this.$router.push("/")
    }
}
</script>