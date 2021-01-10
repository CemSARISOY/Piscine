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
          dateClick: this.handleDateClick,
          events: [
            "EVENTS"
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
      handleDateClick: function(arg) {
        alert('Vous avez cliqué sur ' + arg.dateStr)
      }
    },
    async mounted(){
        try{
            const responses = await axios.get("http://localhost:3000/api/creneaux/evenements", {withCredentials: true
              }).then( result => {
              this.$store.commit({event: response.data});
              console.log({calendarEvents: response.data})
              })
            for(let i=0; i<result.data.length;i++){
                let option = {
                  title: result.data[i].nomEvent, 
                  date: result.data[i].heureDebut + " " + result.data[i].prenomProf}
                this.events.juryOptions.push(option)
            }
        }catch(err){
            console.log(err)
        }
    }
  }
</script>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b { /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}
.demo-app-sidebar-section {
  padding: 2em;
}
.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
  color: blue;
}
:root {
  --fc-border-color: darkblue;
  --fc-daygrid-event-dot-width: 5px;
  
}
</style>