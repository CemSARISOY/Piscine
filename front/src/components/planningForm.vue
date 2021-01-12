<template>
    <div>
        <b-button v-b-modal.modal-1>Launch demo modal</b-button>

        <b-modal id="modal-1" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
        </b-modal>
        <!--button @click="toggleWeekends">Afficher Week-end</button--> 
        <FullCalendar :options="calendarOptions" />
    </div>
</template>


<script src='fullcalendar/core/locales/fr'></script>

<script>

  import 'bootstrap/dist/css/bootstrap.css';
  //import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
  import initialLocaleCode from '@fullcalendar/core/locales/fr'

  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import bootstrapPlugin from '@fullcalendar/bootstrap';
  //import listPlugin from '@fullcalendar/list'

  import axios from 'axios'
  export default {
    components: {
      FullCalendar // make the <FullCalendar> tag available
    },
    data() {
      return {
        calendarOptions: {
          plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin], // listPlugin
          themeSystem: 'bootstrap',
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
         if(this.$store.getters.userInfo.isAdmin){
            let entree = prompt("Saisissez la salle du créneau") //cf boostrap
            if (entree){
                axios.post("http://localhost:3000/api/evenements/creneaux/",{date:arg.date.toLocaleDateString(), heureDebut:arg.date.toLocaleTimeString(), salle:entree, idEvent:this.$route.params.id}, {withCredentials: true
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
        }
      },
      handleEventClick: function(){ 
          if(store.getters.userInfo.isAdmin){
            alert("test") 
          }
      }
    }, 
    async mounted(){
        try{
            const result = await axios.get("http://localhost:3000/api/evenements/"+this.$route.params.id+"/creneaux", {withCredentials: true
              });
            for(let i=0; i<result.data.length;i++){
                let creneau = {
                  title: result.data[i].idCreneau, 
                  date: result.data[i].date}
                console.log(creneau)
                this.calendarOptions.events.push(creneau)

            }
            console.log(result)
            console.log(this.calendarOptions.events)
        }catch(err){
            console.log(err)
        }
    }
  }
</script>

