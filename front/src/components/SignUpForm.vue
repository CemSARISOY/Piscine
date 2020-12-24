<template>
    <div class="form">
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Numéro étudiant:"
                label-for="input-numEtu"
            >
                <b-form-input
                id="input-numEtu"
                v-model="form.numEtu"
                type="text"
                required
                placeholder="Numéro étudiant"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Nom:" label-for="input-nom">
                <b-form-input
                id="input-nom"
                type="text"
                v-model="form.nom"
                required
                placeholder="Nom de famille"
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-3" label="Prenom:" label-for="input-prenom">
                <b-form-input
                id="input-prenom"
                type="text"
                v-model="form.prenom"
                required
                placeholder="Prénom"
                ></b-form-input>
            </b-form-group>

            
            
            <b-form-group id="input-group-4" label="Adresse Mail:" label-for="input-email">
                <b-form-input
                id="input-email"
                type="email"
                v-model="form.email"
                required
                placeholder="Adresse Mail"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Mot de passe:" label-for="input-password">
                <b-form-input
                id="input-password"
                type="password"
                v-model="form.password"
                required
                placeholder="Mot de passe"
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-4" label="Mot de passe:" label-for="passwordCheck">
                <b-form-input
                id="input-passwordCheck"
                type="password"
                v-model="form.passwordCheck"
                required
                placeholder="Mot de passe"
                ></b-form-input>
            </b-form-group>


        <b-button type="submit" variant="primary">S'inscrire</b-button>
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
          passwordCheck:"",
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))

        this.creerCompte()
      

      
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
      creerCompte(){
      if(this.handlePassword()){
        
        axios.post("http://localhost:3000/api/etudiants/",
        {
          "numEtudiant" : this.form.numEtu,
          "nomEtudiant" :this.form.nom,
          "prenomEtudiant" :this.form.prenom,
          "mailEtudiant" :this.form.email,
          "mdpEtudiant" :this.form.password,
          "promoEtudiant" : 2020
        }
        )
        .then((response)=>{
          console.log(response);
          this.$router.push("/login")
        }) 
        .catch((error)=>{
          console.log(error);
        })
      }
      }
    }
  }
</script>

<style scoped>
    .form{
        width:50%;
        margin:auto
    }
    #txtError{
      color: red;
    }
</style>