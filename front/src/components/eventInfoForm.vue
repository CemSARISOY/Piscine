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

            
            
            <b-form-group id="input-group-4" label="Durée d'une soutenance : " label-for="input-duration">
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


        <b-button type="submit" variant="primary">Modifier</b-button>
        <b-button type="button" v-on:click="goToPlanning" variant="secondary">Voir planning</b-button>
        <b-button type="button" v-on:click="deleteEvent" variant="danger">Supprimer</b-button>
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
          if(this.event.numberReserved=="0" || this.event.numberReserved==undefined/*this.$store.getters.authenticated*/){
            //var etudiantInfo = JSON.parse(this.$store.getters.userInfo)
            var url1 = "http://localhost:3000/api/evenements/"
            var eventDB = JSON.parse(axios.get(url1.concat("0")))
            this.event.nameEvent=eventDB.nomEvenement
            this.event.numberReserved="0"
            this.event.durationEvent=eventDB.duree
            this.event.start=eventDB.dateDebut
            this.event.end="01/01/1999"
            this.event.lastDate=eventDB.dateLimiteRes
          }
      },
      modifEvent(){
        if(/*this.store.getters.authenticated*/this.event.numberReserved=="0" || this.event.numberReserved==undefined){
            axios.put("http://localhost:3000/api/evenements/".concat("0"),
            {
            "nomEvenement" : this.event.nameEvent,
            "duree" :this.event.durationEvent,
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
          alert("delete")
      },
      goToPlanning(){
          alert("planning")
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