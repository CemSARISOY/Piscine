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
    },
    computed: {
        ...mapState(['connected'])
    },
    mounted() {
        if(this.connected){
            axios.post("https://projet-piscine-g3.herokuapp.com/api/etudiants/logout", {}, {withCredentials:true})
            .then( () => {
                store.dispatch("disconnect")
            });
        }
    }
}
</script>