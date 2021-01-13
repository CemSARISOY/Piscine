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
            <b-time
              v-model="value"
              id="ex-disabled-readonly"
              locale="fr"
            >
              <div class="d-flex" dir="ltr">
                <b-button
                  size="sm"
                  variant="outline-danger"
                  v-if="value"
                  @click="clearTime"
                >
                  Effacer
                </b-button>
                <b-button 
                  size="sm"
                  variant="outline-primary"
                  class="ml-auto"
                  @click="setNow"
                >
                  Heure actuelle
                </b-button>
              </div>
            
            
            </b-time>
            
            <b-form-group
              label="N° salle"
              label-for="salle-input"
              invalid-feedback="Une salle est requise !"
              :state="salleState"
            >
              <b-form-input ref="my-modal"
                id="salle-input"
                v-model="salle"
                :state="salleState"
                placeholder="Entrer le numéro de la salle"
                required
              >
              </b-form-input>
            </b-form-group>
            <label for="promo-selector">Sélectionner le(s) professeur(s)</label>
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
  import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction'
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
        value: null,
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'info',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'info',
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
          allDaySlot: false,
          selectable: true,
          dateClick: this.testClick,//dateClick,
          eventClick: this.handleEventClick,
          events: [
            //"EVENTS"
            { title: 'event 1 \n' +'Prof: Mr Berry' + 'Salle : TD015', 
            start: '2021-01-14T12:30:00Z',
            //end:
            display: 'background',
            },
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
          console.log(this.$refs['my-modal'].value) //affiche la valeur de salle
          console.log(this.value)
          
        })
      },
      testClick: function(arg) {
        if(this.$store.getters.userInfo.isAdmin){
          this.$bvModal.show('modal-prevent-closing') 
          //console.log(arg.date.toLocaleDateString())
          axios.post("http://localhost:3000/api/evenements/:id/creneaux/",{date:arg.date.toLocaleDateString(), heureDebut:arg.date.toLocaleTimeString(), salle:this.value, idEvent:this.$route.params.id}, {withCredentials: true
                }).then(response =>{
                    console.log('bien vu')
                    let creneau = {
                    title: response.value, 
                    date:arg.date.toLocaleDateString(),
                    eventColor: 'green'}

                    console.log("Creneau crée !")
                    this.calendarOptions.events.push(creneau)
                    console.log(this)
                    this.$router.go()
                }).catch(function(){
                    console.log("Erreur de création")
                })
        }   

        //j = this.submittedJury.push(this.jury)
        //console.log(this.$refs['my-modal'].show())
      },
      setNow() {
        const now = new Date()
        // Grab the HH:mm:ss part of the time string
        this.value = now.toTimeString().slice(0, 8)
      },
      clearTime() {
        this.value = ''
      },

      // dateClick: function(arg) {
      //    if(this.$store.getters.userInfo.isAdmin){
      //       //console.log("connected")
      //       //let entree = prompt("")
      //       this.$bvModal.show('modal-prevent-closing') 
      //       if (this.handleSubmit()){
      //           console.log("bien vu")
      //           //recuperer jury dans la bdd 
      //           axios.post("http://localhost:3000/api/evenements/:id/creneaux/",{date:arg.date.toLocaleDateString(), heureDebut:arg.date.toLocaleTimeString(), salle:this.value, idEvent:this.$route.params.id}, {withCredentials: true
      //           }).then(response =>{
      //               let creneau = {
      //               title: response.value, 
      //               date:arg.date.toLocaleDateString(),
      //               eventColor: 'green'}

      //               console.log("Creneau crée !")
      //               this.calendarOptions.events.push(creneau)
      //               console.log(this)
      //               this.$router.go()
      //           }).catch(function(){
      //               console.log("Erreur de création")
      //           })
      //       }
      //   }
      // },
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
                  date: result.data[i].date,
                  start: result.data[i].heureDebut,
                  eventColor: 'green'}
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