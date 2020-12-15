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

            <b-form-group id="input-group-2" label="Mot de passe:" label-for="input-2">
                <b-form-input
                id="input-2"
                type="password"
                v-model="form.password"
                required
                placeholder="Mot de passe"
                ></b-form-input>
            </b-form-group>


        <b-button type="submit" variant="primary">Se connecter</b-button>
        </b-form>

    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

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
            this.$router.push("/")
        }).catch( error => {
          console.log("erreur : ", error);
        })
      }
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

<style scoped>
    .form{
        width:50%;
        margin:auto
    }
</style>