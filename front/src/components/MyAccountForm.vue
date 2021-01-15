<template>
    <div class="form">
        <b-form @submit="onSubmit">

            <b-form-group id="input-group-2" 
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7" label="Nouveau nom" label-for="input-nom">
                <b-form-input
                id="input-nom"
                type="text"
                v-model="form.nom"
                required
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-3" 
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7" label="Nouveau prenom" label-for="input-prenom">
                <b-form-input
                id="input-prenom"
                type="text"
                v-model="form.prenom"
                required
                ></b-form-input>
            </b-form-group>

            
            
            <b-form-group id="input-group-4" 
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7" label="Nouvelle adresse mail" label-for="input-email">
                <b-form-input
                id="input-email"
                type="email"
                v-model="form.email"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group 
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7" label = "Votre nouvelle promo">
              <b-form-select id="promo-selector" v-model="form.promo" :options="form.options"></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-4" 
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7" label="Mot de passe actuel" label-for="input-password">
                <b-form-input
                id="input-password"
                type="password"
                v-model="form.password"
                required
                ></b-form-input>
            </b-form-group>


        <b-button type="submit" variant="primary">Mettre à jour</b-button>
        </b-form>
        <br>
        <p id='txtError'></p>

    </div>
</template>

<script>
  
  import axios from 'axios'

  export default {
    data() {
      return {
        form: {
          
          numEtu:"",
          nom:"",
          prenom:"",
          email:"",
          password:"",
          promo: "",
          options: [
          {value: 2020, text: 'IG3'},
          {value: 2019, text: 'IG4'},
          {value: 2018, text: 'IG5'}
          ]
        },
        
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.modifCompte();
      
      
      },
      getUserData(){
        if(this.$store.getters.authenticated){

            var etudiantInfo = this.$store.getters.userInfo
            axios.get("https://projet-piscine-g3.herokuapp.com/api/etudiants/"+etudiantInfo.numEtudiant, {withCredentials:true})
            .then((response)=>{
              console.log(response.data)
                this.form.numEtu = response.data.numEtudiant
                this.form.prenom = response.data.prenomEtudiant
                this.form.nom = response.data.nomEtudiant
                this.form.email = response.data.mailEtudiant
                this.form.promo = response.data.promoEtudiant
            })
            .catch((error)=>{
                console.log(error)
            })
              
          }
      },
      handlePassword(){
        if(this.form.password != this.form.passwordCheck){
            var element = document.getElementById('txtError')
            element.innerHTML = "Les mots de passes ne concordent pas"
            // var element = document.getElementById('txtError');
            return false;
          }
        else{
          return true;
        }

      },
      
      modifCompte(){
        if(this.$store.getters.authenticated){
          axios.put("https://projet-piscine-g3.herokuapp.com/api/etudiants/"+this.form.numEtu,
          {
            "nomEtudiant" :this.form.nom,
            "prenomEtudiant" :this.form.prenom,
            "mailEtudiant" :this.form.email,
            "promoEtudiant" : this.form.promo,
            "mdpConfirm" : this.form.password
          }, {withCredentials:true})
          .then(() =>{
            this.$router.go()
          }) 
          .catch((error)=>{
            this.makeToast(error.response.data.message)
          })
        }
      },
      makeToast(string){
        this.$bvToast.toast(string, {
          title: 'Erreur !',
          variant: 'danger',
          autoHideDelay: 5000,
        })
      }

    },
    mounted(){
        
        this.getUserData()
    }
  }
</script>

<style scoped>
    .form{
        width:70%;
        margin:auto
    }
    #txtError{
      color: red;
    }
</style>