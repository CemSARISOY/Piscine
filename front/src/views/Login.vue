<template>
  <div class=login>
    <h1>Connexion</h1>
    <login-form/>
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
