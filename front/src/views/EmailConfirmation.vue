<template>
<p> Confirmation de votre mail en cours... </p>
</template>

<script>
import axios from 'axios'



export default {
  data() {
    return{}

  },
  methods: {
    confirmMail() {
      axios.post(`http://localhost:3000/api/etudiants/confirmation/${this.$route.params.token}`)
        .then( result => {
          console.log(result.data.success)
          this.$router.push("/")
      }).catch( error => {
        console.log("erreur : ", error);
      })
    }
  },
    mounted(){
        
        this.confirmMail()
    }
}
</script>

<style scoped>
    .form{
        width:50%;
        margin:auto
    }
</style>