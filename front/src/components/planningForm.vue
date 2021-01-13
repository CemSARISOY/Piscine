<template>
    <div class="center-div">
        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Ajouter un Créneau"
          :header-bg-variant="headerBgVariant"
          :header-text-variant="headerTextVariant"
          :body-bg-variant="bodyBgVariant"
          :body-text-variant="bodyTextVariant"
          :footer-bg-variant="footerBgVariant"
          :footer-text-variant="footerTextVariant"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              label="N° salle"
              label-for="salle-input"
              invalid-feedback="Une salle est requise !"
              :state="salleState"
            >
              <b-form-input
                id="salle-input"
                v-model="salle"
                :state="salleState"
                placeholder="Entrer le numéro de la salle"
                required
              >
              </b-form-input>
            </b-form-group>
            <label for="promo-selector">Sélectionner les jurys</label>
            <!--b-form-group
              label="Nom jury(s)"
              label-for="jury-input"
              invalid-feedback="Un jury est requis !"
              :state="juryState"
            -->
              <b-form-select 
                v-model="form.jurySelected" 
                :options="form.juryOptions" 
                multiple :select-size="4"
              >
              </b-form-select>
            <!--/b-form-group-->
          </form>
        </b-modal>
        <FullCalendar :options="calendarOptions" />
    </div>
</template>


<script src='fullcalendar/core/locales/fr'></script>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
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
        form:{
                juryOptions: [],
                jurySelected:[]
            },
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'warning',
        footerTextVariant: 'dark',
        modalShow: false,
        salle: '',
        //jury: '',
        salleState: null,
        //juryState: null,
        submittedSalle: [],
        //submittedJury: [],
        calendarOptions: {
          plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin], // listPlugin
          themeSystem: 'bootstrap4',
          headerToolbar: {
            left:'timeGridWeek,timeGridDay' ,//dayGridMonth,
            center:'title',
            right: 'prev next today'
          },
          initialView: 'timeGridWeek',
          selectable: true,
          dateClick: this.dateClick,
          eventClick: this.handleEventClick,
          events: [
            //"EVENTS"
            //{ title: 'event 1', date: '2021-01-05'}, //display: 'background' },
            //{ title: 'event 2', date: '2021-01-07'}//display: 'background' }
          ],
          weekends: false, // initial value as you want it or not 
          slotMinTime: "07:00",
          slotMaxTime:"20:30",
          selectable: true,//initial value for selecting or not 
          locale: initialLocaleCode
        }
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.salleState = valid
        //this.juryState = valid
        return valid
      },
      resetModal() {
        this.salle = ''
        this.salleState = null
        //this.jury = ''
        //this.juryState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        //this.submittedSalle.push(this.salle)
        //this.submittedJury.push(this.jury)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      dateClick: function(arg) {
         if(this.$store.getters.userInfo.isAdmin){
            //console.log("connected")
            let entree = this.$bvModal.show('modal-prevent-closing') 
            if (entree){
                //recuperer jury dans la bdd 
                axios.post("http://localhost:3000/api/evenements/:id/creneaux/",{date:arg.date.toLocaleDateString(), heureDebut:arg.date.toLocaleTimeString(), salle:entree, idEvent:this.$route.params.id}, {withCredentials: true
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
    //get creneaux
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
    },
    //get prof 
    async mounted(){
        try{
            let result = await axios.get("http://localhost:3000/api/professeurs", {withCredentials: true})
            for(let i=0; i<result.data.length;i++){
                let option = {value: result.data[i].idProf, text: result.data[i].nomProf + " " + result.data[i].prenomProf}
                this.form.juryOptions.push(option)
            }
        }catch(err){
            console.log(err)
        }
    }
  }
</script>

<style scoped>
  @import 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/cosmo/bootstrap.min.css';
</style>

<style >
  .center-div
{
  width: 70%;
  display: block;
  margin-left: auto;
  margin-right: auto 
}

</style>