<template>
    <div class="form">
        <b-form @submit="onSubmit">

            <b-form-group id="input-group-2" label="Creneau sélectionné : " label-for="input-id-creneau">
                <b-form-input
                id="input-id-creneau"
                type="text"
                v-model="creneau.idCreneau"
                required
                placeholder="Id du creneau"
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-3" label="Date creneau : " label-for="input-date-creneau">
                <b-form-input
                id="input-date-creneau"
                type="date"
                v-model="creneau.dateCreneau"
                required
                placeholder="XX/XX/XX"
                ></b-form-input>
            </b-form-group>

            
            
            <b-form-group id="input-group-4" label="Heure debut : " label-for="input-heure-debut">
                <b-form-input
                id="input-heure-debut"
                type="text"
                v-model="creneau.heureDebut"
                required
                placeholder="heure début"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Salle pour le créneau : " label-for="input-salle">
                <b-form-input
                id="input-salle"
                type="text"
                v-model="creneau.salleCreneau"
                required
                placeholder="Salle"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="ID du groupe : " label-for="input-id-groupe">
                <b-form-input
                id="input-id-groupe"
                type="text"
                v-model="creneau.idGroupe"
                required
                placeholder="id groupe"
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-4" label="ID event : " label-for="input-id-event">
                <b-form-input
                id="input-id-event"
                type="text"
                v-model="creneau.idEvent"
                required
                placeholder="0"
                ></b-form-input>
            </b-form-group>


          <b-button type="submit" variant="primary">Modifier</b-button>
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
        creneau: {
          
          idCreneau:"",
          dateCreneau:"",
          heureDebut:"",
          salleCreneau:"",
          idGroupe:"",
          idEvent:"",
        },
        
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.creneau))
      
      
      },
      getCreneauData(){
          if(this.$store.getters.authenticated){
            //var etudiantInfo = JSON.parse(this.$store.getters.userInfo)
            var url1 = "http://localhost:3000/api/creneaux/"
            axios.get(url1.concat(this.$route.params.id)).then((res) => {
              let data = res.data
              this.creneau.idCreneau=data.idCreneau

              const date = new Date(data.date)
              this.creneau.dateCreneau= date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2,0) + '-' + date.getDate().toString().padStart(2,0);

              this.creneau.heureDebut=data.heureDebut
              this.creneau.salleCreneau=data.salle
              this.creneau.idGroupe=data.idGroupe
              this.creneau.idEvent=data.idEvent
            });
          }
      },
      modifCreneau(){
        if(this.store.getters.authenticated){
            axios.put("http://localhost:3000/api/creneaux/".concat(this.$route.params.id),
            {
            "idCreneau" : this.creneau.idCreneau,
            "date" :this.creneau.date,
            "heureDebut" :this.creneau.heureDebut,
            "salle" :this.creneau.salle,
            "idGroupe" : this.creneau.idGroupe,
            "idEvent" : this.creneau.idEvent,
            }
            )
            .then(function(response){
            console.log(response);
            }) 
            .catch(function(error){
            console.log(error);
            })
        }
      },
    },
    mounted(){
        this.getCreneauData()
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