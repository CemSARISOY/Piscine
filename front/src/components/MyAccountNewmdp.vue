<template>
    <div class="form">
        <b-form @submit="onSubmit">

            <b-form-group id="input-group-1" 
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7" label="Mot de passe actuel" label-for="input-password1">
                <b-form-input
                id="input-password1"
                type="password"
                v-model="actuMdp"
                autocomplete="current-password"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" 
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7" label="Nouveau mot de passe" label-for="input-password2">
                <b-form-input
                id="input-password2"
                type="password"
                v-model="nvMdp"
                autocomplete="new-password"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" 
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7" label="Confirmation mot de passe" label-for="input-password3">
                <b-form-input
                id="input-password3"
                type="password"
                v-model="confirmMdp"
                autocomplete="new-password"
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
        actuMdp :"",
        nvMdp :"",
        confirmMdp :""
        
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        if(this.handlePassword()){
            this.modifCompte();
        }else{
            this.makeToast("Les mots de passes ne concordent pas")
        }
      
      
      },
      handlePassword(){
        return this.nvMdp == this.confirmMdp
      },
      
      modifCompte(){
        if(this.$store.getters.authenticated){
            var etudiantInfo = this.$store.getters.userInfo
          axios.put("http://localhost:3000/api/etudiants/"+etudiantInfo.numEtudiant,
          {
            "mdpEtudiant" :this.nvMdp,
            "mdpConfirm" : this.confirmMdp
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