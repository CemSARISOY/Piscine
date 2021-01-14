<template>
    <div class="form">
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Numéro étudiant "
                label-for="input-numEtu"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
            >
                <b-form-input
                id="input-numEtu"
                v-model="form.numEtu"
                type="number"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group
            label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
             id="input-group-2" label="Nom " label-for="input-nom">
                <b-form-input
                id="input-nom"
                type="text"
                v-model="form.nom"
                required
                ></b-form-input>
            </b-form-group>
            
            <b-form-group label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7" id="input-group-3" label="Prenom:" label-for="input-prenom">
                <b-form-input
                id="input-prenom"
                type="text"
                v-model="form.prenom"
                required
                ></b-form-input>
            </b-form-group>

            
            
            <b-form-group label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7" id="input-group-4" label="Adresse Mail " label-for="input-email">
                <b-form-input
                id="input-email"
                type="email"
                v-model="form.email"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7" id="input-group-4" label="Mot de passe " label-for="input-password">
                <b-form-input
                id="input-password"
                type="password"
                v-model="form.password"
                :state="pwdState"
                required
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  Le mot de passe doit être au minimum de 7 caractères
                </b-form-invalid-feedback>
            </b-form-group>
            
            <b-form-group label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7" id="input-group-4" label="Confirmation du mot de passe" label-for="passwordCheck">
                <b-form-input
                id="input-passwordCheck"
                type="password"
                v-model="form.passwordCheck"
                :state="pwdCheck"
                required
                ></b-form-input>
                
            </b-form-group>

        <div class="text-center">
        <b-button type="submit" variant="primary">S'inscrire</b-button>
        </div>
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
    computed:{
      pwdState(){
        return this.form.password.length > 6 ? true : false
      },
      pwdCheck(){
        return this.form.password == this.form.passwordCheck && this.form.password.length > 6 ? true : false
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.creerCompte()
      

      
      },
      handlePassword(){
        return this.form.password == this.form.passwordCheck
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
        .then(()=>{
          this.$router.push("/login")
          
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