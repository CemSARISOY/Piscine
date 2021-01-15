<template>
    <div class="form">
        <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Numéro étudiant:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.numEtu"
                type="text"
                required
                placeholder="Numéro étudiant"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Adrese mail:" label-for="input-2">
                <b-form-input
                id="input-2"
                type="text"
                v-model="form.email"
                required
                placeholder="email"
                ></b-form-input>
            </b-form-group>


        <b-button type="submit" variant="primary">Réinitialiser </b-button>
        <p>
          Pas encore inscrit ? <a href="/signup"> Cliquez ici </a><br>
        </p>
        
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
        password: ''
      },
    }
  },
  methods: {
    onSubmit() {
      axios.post("https://projet-piscine-g3.herokuapp.com/api/etudiants/pswd", {
        numEtudiant: this.form.numEtu,
        mailEtudiant: this.form.email})
        .then( result => {
          console.log(result.data.success)
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
        width:50%;
        margin:auto
    }
</style>