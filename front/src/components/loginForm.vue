<template>
    <div class="form">
        <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Numéro étudiant"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.numEtu"
                type="text"
                autocomplete="username"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Mot de passe" label-for="input-2">
                <b-form-input
                id="input-2"
                type="password"
                v-model="form.password"
                autocomplete="current-password"
                required
                ></b-form-input>
                  <a id="mdpOublie" href="/forgotpassword" > Mot de passe oublié ?</a>
            </b-form-group>
      

        <b-row align-v="center" class="text-center">
          <b-col>
            <a href="/signup"> Créer un compte </a><br>
          </b-col>
          <b-col>
            <b-button type="submit" variant="primary">Se connecter</b-button>
          </b-col>
        </b-row>
        
        </b-form>

    </div>
</template>

<script>
import axios from 'axios'



export default {
  data() {
    return {
      form: {
        numEtu: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      axios.post("http://localhost:3000/api/etudiants/login", {
        numEtudiant: this.form.numEtu,
        mdpEtudiant: this.form.password} ,
        {withCredentials:true}
        ).then( result => {
          this.$store.commit("CONNECT", result.data.success);
          this.$store.commit("SET_USER", {userId: result.data.userId, isAdmin: result.data.isAdmin })
          this.$router.push("/")
      }).catch( error => {
        console.log("erreur : ", error);
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
    #mdpOublie{
        font-size: 0.75rem;
    }
</style>