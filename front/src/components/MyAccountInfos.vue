<template>
    <div class="form">
        <b-row>
            Votre numéro étudiant : {{ numEtu }}
        </b-row>
        <b-row>
            Votre nom : {{ nom }} {{ prenom }}
        </b-row>
        <b-row>
            Votre mail : {{ email }}
        </b-row>
        <b-row>
            Votre promo : {{ promo }}
        </b-row>


    </div>
</template>

<script>
  
  import axios from 'axios'

  export default {
    data() {
      return {
        numEtu : "",
        nom :"",
        prenom: "",
        email: "",
        promo :""
        
      }
    },
    methods: {
      getUserData(){
        if(this.$store.getters.authenticated){

            var etudiantInfo = this.$store.getters.userInfo
            axios.get("http://localhost:3000/api/etudiants/"+etudiantInfo.numEtudiant, {withCredentials:true})
            .then((response)=>{
                this.numEtu = response.data.numEtudiant
                this.prenom = response.data.prenomEtudiant
                this.nom = response.data.nomEtudiant
                this.email = response.data.mailEtudiant
                this.promo = response.data.promoEtudiant
            })
              
          }
      },
    },
    mounted(){
        
        this.getUserData()
    }
  }
</script>