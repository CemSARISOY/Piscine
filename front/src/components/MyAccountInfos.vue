<template>
    <div id="infos" class="form w-50 margin-auto text-center">
        <b-row>
            <b-col>
                Votre numéro étudiant :
            </b-col>
            <b-col>
                {{ numEtu }}
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                Votre nom : 
            </b-col>
            <b-col>
                {{ nom }} {{ prenom }}
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                Votre mail : 
            </b-col>
            <b-col>
                {{ email }}
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                Votre promo :
            </b-col>
            <b-col>
                {{ promo }}
            </b-col>
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
<style scoped>
#infos{
    margin:auto
}
</style>