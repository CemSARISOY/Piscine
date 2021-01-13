<template>
    <div class="login">
        <b-container>
            <b-card>
                <div class="text-center">
                    <h1>Connexion</h1>
                </div>
                <login-form/>
            </b-card>
        </b-container>
    </div>
</template>
<script>
import loginForm from "../components/loginForm"
import { mapState } from 'vuex'

export default {
    components:{
        loginForm
    },
    computed: {
        ...mapState(['connected'])
    },
    mounted() {
        if(this.connected){
            this.$router.push("/")
        }
    }

}
</script>
