<template>
    <div>
        <!--button @click="toggleWeekends">Afficher Week-end</button--> 
        <FullCalendar :options="calendarOptions" />
    </div>
</template>


<script src='fullcalendar/core/locales/fr'></script>

<script>
  import initialLocaleCode from '@fullcalendar/core/locales/fr'

  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  //import listPlugin from '@fullcalendar/list' 


  import axios from 'axios'
  export default {
    components: {
      FullCalendar // make the <FullCalendar> tag available
    },
    data() {
      return {
        calendarOptions: {
          plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin], // listPlugin
          headerToolbar: {
            left:'dayGridMonth,timeGridWeek,timeGridDay' ,
            center:'title',
            right: 'prev next today'
          },
          initialView: 'dayGridMonth',
          dateClick: this.dateClick,
          eventClick: this.handleEventClick,
          events: [
          ],
          weekends: false, // initial value as you want it or not 
          selectable: true,//initial value for selecting or not 
          locale: initialLocaleCode
        }
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.creneau))
      
      
      },
      getCreneauData(){
          /*if(this.$store.getters.authenticated){
            //var etudiantInfo = JSON.parse(this.$store.getters.userInfo)
            try{
              var url1 = "http://localhost:3000/api/creneaux/"
              axios.get(url1).then((res) => {
              for(let i=0; i<res.data.length;i++){
                let creneau={}
                await axios.get("http://localhost:3000/api/evenements/"+res.data[i].idEvent).then((resultat)=>{
                  creneau={
                    id:res.data[i].idCreneau,
                    heure:res.data[i].heureDebut,
                    title: resultat.data.nomEvenement,
                    date: res.data[i].date,
                  }
                  console.log(creneau)
                })
                this.calendarOptions.events.push(creneau)
              }
              console.log("lol"+this.calendarOptions.events)
            });
            }catch(err){
              console.log("erreur + "+err);
            }
          }*/
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
    async mounted(){
        if(this.$store.getters.authenticated){
          //var etudiantInfo = JSON.parse(this.$store.getters.userInfo)
          try{
            const url1 = "http://localhost:3000/api/creneaux/"
            let res = await axios.get(url1)
            for(let i=0; i<res.data.length;i++){
              let getTitle = await axios.get("http://localhost:3000/api/evenements/"+res.data[i].idEvent)
              let dateHeure = new Date(res.data[i].date).setHours(res.data[i].heureDebut.split(':')[0], res.data[i].heureDebut.split(':')[1], res.data[i].heureDebut.split(':')[2])
              console.log(res.data[i].heureDebut)
              let creneau={
                id:res.data[i].idCreneau,
                title: getTitle.data.nomEvenement,
                date: dateHeure,
              }
              this.calendarOptions.events.push(creneau)
            }
            console.log("lol"+JSON.stringify(this.calendarOptions.events))
          }catch(err){
            console.log("erreur + "+err);
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