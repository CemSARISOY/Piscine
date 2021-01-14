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
            //"EVENTS"
            //{ title: 'event 1', date: '2021-01-05'}, //display: 'background' },
            //{ title: 'event 2', date: '2021-01-07'}//display: 'background' }
          ],
          weekends: false, // initial value as you want it or not 
          selectable: true,//initial value for selecting or not 
          locale: initialLocaleCode
        }
      }
    },
    methods: {
      //toggleWeekends: function() {
        //this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
      //},
      dateClick: function(arg) {
        let entree = prompt("Saisissez la salle du créneau") //cf boostrap
        if (entree){
            axios.post("http://localhost:3000/api/creneaux/",{date:arg.date.toLocaleDateString(), heureDebut:arg.date.toLocaleTimeString(), salle:entree, idEvent:this.$route.params.id}, {withCredentials: true
              }).then(response =>{
                  let creneau = {
                  title: response.idCreneau, 
                  date:arg.date.toLocaleDateString()}
                  console.log("Creneau crée !")
                  this.calendarOptions.events.push(creneau)
                  console.log(this)
                  this.$router.go()
              }).catch(function(){
                  console.log("Erreur de création")
              })
        }
      },
      handleEventClick: function(){
          alert("test")
      }
    },
    async mounted(){
        try{
            const result = await axios.get("http://localhost:3000/api/evenements/"+this.$route.params.id+"/creneaux", {withCredentials: true
              });
            for(let i=0; i<result.data.length;i++){
                let creneauDate = new Date(result.data[i].date)
                let creneau = {
                  title: result.data[i].idCreneau,
                  date: creneauDate.getFullYear().toString() + '-' + (creneauDate.getMonth() + 1).toString().padStart(2,0) + '-' + creneauDate.getDate().toString().padStart(2,0),
                }
                this.calendarOptions.events.push(creneau)

            }
        }catch(err){
            console.log(err)
        }
    }
  }
</script>

