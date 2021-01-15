<template>
    <div class="form">
        <b-form @submit="modifEvent">

            <b-form-group id="input-group-2" label="Evenement sélectionné : " label-for="input-name-event">
                <b-form-input
                id="input-name-event"
                type="text"
                v-model="event.nameEvent"
                required
                placeholder="Nom de l'évènement"
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-3" label="Nombre de créneaux réservés : " label-for="input-number-reserved">
                <b-form-input
                id="input-number-reserved"
                type="text"
                v-model="event.numberReserved"
                required
                placeholder="XX/XX"
                ></b-form-input>
            </b-form-group>

            
            
            <b-form-group id="input-group-4" label="Durée d'une soutenance (minutes) : " label-for="input-duration">
                <b-form-input
                id="input-duration"
                type="text"
                v-model="event.durationEvent"
                required
                placeholder="Durée"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Date début soutenances : " label-for="input-start">
                <b-form-input
                id="input-start"
                type="date"
                v-model="event.start"
                required
                placeholder=""
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Date fin soutenances : " label-for="input-end">
                <b-form-input
                id="input-end"
                type="date"
                v-model="event.end"
                required
                placeholder=""
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-4" label="Date limite réservation : " label-for="input-last-date">
                <b-form-input
                id="input-last-date"
                type="date"
                v-model="event.lastDate"
                required
                placeholder=""
                ></b-form-input>
            </b-form-group>


        <b-button type="button" v-on:click="modifEvent" v-if="isAdmin" variant="primary">Modifier</b-button>
        <b-button type="button" v-on:click="goToPlanning" variant="secondary">Voir planning</b-button>
        <b-button type="button" v-on:click="deleteEvent" v-if="isAdmin  " variant="danger">Supprimer</b-button>
        </b-form>
        <br>
        <p id='txtError'></p>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  export default {
    computed: {
      ...mapState(['isAdmin'])
    },
    data() {
      return {
        event: {
          
          nameEvent:"",
          numberReserved:"",
          durationEvent:"",
          start:"",
          end:"",
          lastDate:"",
        },
        
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.event))
      
      
      },
      getEventData(){
          if(this.$store.getters.authenticated){
            //var etudiantInfo = JSON.parse(this.$store.getters.userInfo)
            var url1 = "https://projet-piscine-g3.herokuapp.com/api/evenements/"
            url1 = url1.concat(this.$route.params.id)
            axios.get(url1).then((res) => {
              var eventDB = res.data
              this.event.nameEvent=eventDB.nomEvenement

              const url2 = url1.concat("/creneaux")
              axios.get(url2).then((res) => {
                this.event.numberReserved=res.data.length
              });

              this.event.durationEvent=eventDB.dureeCreneau.split(':')[0]+"h"+eventDB.dureeCreneau.split(':')[1]
              const dateDebut = new Date(eventDB.dateDebut)
              this.event.start= dateDebut.getFullYear().toString() + '-' + (dateDebut.getMonth() + 1).toString().padStart(2,0) + '-' + dateDebut.getDate().toString().padStart(2,0);

              const dateFin = new Date(dateDebut.setDate(dateDebut.getDate()+eventDB.duree))
              this.event.end= dateFin.getFullYear().toString() + '-' + (dateFin.getMonth() + 1).toString().padStart(2,0) + '-' + dateFin.getDate().toString().padStart(2,0);

              const lastDate = new Date(eventDB.dateLimiteRes)
              this.event.lastDate= lastDate.getFullYear().toString() + '-' + (lastDate.getMonth() + 1).toString().padStart(2,0) + '-' + lastDate.getDate().toString().padStart(2,0);
            });
          }
      },
      modifEvent(){
        if(this.$store.getters.authenticated){
          var url1 = "https://projet-piscine-g3.herokuapp.com/api/evenements/".concat(this.$route.params.id)
          axios.put(url1,
            {
              "nomEvenement" : this.event.nameEvent,
              "dureeCreneau" :this.event.durationEvent,
              "duree" : "",
              "dateDebut" :this.event.start,
              "dateLimiteRes" :this.event.lastDate,
              "promo" : 2020
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
      deleteEvent(){
          if(this.$store.getters.authenticated){
          var url1 = "https://projet-piscine-g3.herokuapp.com/api/evenements/".concat(this.$route.params.id)
          axios.delete(url1)
          .then(function(response){
            console.log(response);
            this.$router.push("/")
          }) 
          .catch(function(error){
            console.log(error);
          })
        }
      },
      goToPlanning(){
          this.$router.push("/planning/"+this.$route.params.id)
      }
    },
    mounted(){
        this.getEventData()
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