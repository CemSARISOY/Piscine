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
              <b-form-select 
                v-model="form.jurySelected" 
                :options="form.juryOptions" 
                multiple :select-size="4"
              >
              </b-form-select>
          </form>
        </b-modal>
        <b-modal 
          ref="modal-scoped"
          title="Voulez-vous vraiment supprimer ce creneau ?"
        >
          <p>creneau selectionné : {{ String(datecreneau) }} à {{ String(heurecreneau) }}</p>
          <div>
            <b-button @click="showMsgBoxTwo" variant="danger">Supprimer 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </b-button>
          </div>
          <div>
          
            <b-button size="sm" variant="primary" @click="modifClick()">
              Modifier
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg>
            </b-button>
          </div>
          <template #modal-footer="{cancel }">
            <b-button size="sm" variant="dark" @click="cancel()">
                Annuler

            </b-button>
          </template>
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
        dateCreneau:"",
        boolModif:false,
        boxTwo:"",
        form:{
                juryOptions: [],
                jurySelected:[]
            },
        value: null,
        idcreneau:"",
        datecreneau:"",
        heurecreneau:"",
        sallecreneau:"",
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
          editable: false,
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
          eventColor: '#378006',
          weekends: false, // initial value as you want it or not 
          slotMinTime: "08:00",
          slotMaxTime:"20:30",
          selectable: true,//initial value for selecting or not 
          locale: initialLocaleCode,
          date: "",
          heures:""
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
          this.salle = this.$refs['my-modal'].value //affiche la valeur de salle
          console.log(this.calendarOptions.events)
          //console.log(this.value)
          if (this.value){
              this.calendarOptions.heures = this.value
              //console.log(this.calendarOptions.heures)
          }
          if (this.boolModif){
            console.log(this.idcreneau)
            console.log(this.calendarOptions.heures)
            axios.put("http://localhost:3000/api/creneaux/"+this.idcreneau ,{heureDebut:this.calendarOptions.heures, salle:this.salle}, {withCredentials: true
                }).then(response =>{
                    this.$router.go()//pour actualiser
                }).catch(function(){
                    console.log("Erreur de modification")
                })
          }
          else{
            console.log(this.calendarOptions.date)
            axios.post("http://localhost:3000/api/creneaux",{date:this.calendarOptions.date, heureDebut:this.calendarOptions.heures, salle:this.salle, idEvent:this.$route.params.id}, {withCredentials: true
                  }).then(response =>{
                      axios.post("http://localhost:3000/api/creneaux/"+response.data.idCreneau+"/jurys",{jurys:this.form.jurySelected}, {withCredentials: true
                        }).then(response =>{
                            this.$router.go()//pour actualiser
                            //console.log(this.form.jurySelected)
                        }).catch(function(error){
                            console.log(error.response)
                        })
                  }).catch(function(error){
                      console.log(error)
                  })
                  //console.log(this.form.juryOptions.text) 
                  console.log(this.form.jurySelected)
            
          }
        })
      },
      testClick: function(arg) {
        if(this.$store.getters.userInfo.isAdmin){
          this.$bvModal.show('modal-prevent-closing') 
          this.calendarOptions.date = arg.date.toLocaleDateString()
          this.calendarOptions.heures = arg.date.toLocaleTimeString()  
          this.boolModif = false 
          }
      },   
      modifClick(){
        if(this.$store.getters.userInfo.isAdmin){
          this.$bvModal.show('modal-prevent-closing') 
          this.boolModif = true 
        }
      },
         //j = this.submittedJury.push(this.jury)
        //console.log(this.$refs['my-modal'].show())

      setNow() {
        const now = new Date()
        // Grab the HH:mm:ss part of the time string
        this.value = now.toTimeString().slice(0, 8)
      },
      clearTime() {
        this.value = ''
      },
      handleEventClick: function(arg){ 
        if(this.$store.getters.userInfo.isAdmin){
          //this.calendarOptions.date = arg.event.date.toLocaleDateString()
          //this.calendarOptions.heures = arg.date.toLocaleTimeString()
          this.$refs['modal-scoped'].show()
          this.idcreneau = (arg.event.id)
          this.datecreneau = (arg.event.start.toLocaleDateString())
          this.heurecreneau = (arg.event.start.toLocaleTimeString())
          //if (this.boxTwo == true){
              //console.log(this.idcreneau)
              //arg.event.remove()
          //}
          
        }
        this.dateCreneau = arg.event.start
        
        //console.log(this.value)
        // axios.delete("http://localhost:3000/api/creneaux/",{date:this.calendarOptions.date, heureDebut:this.calendarOptions.heures, salle:this.salle, idEvent:this.$route.params.id}, {withCredentials: true
        //         }).then(response =>{
                    
        //             this.$router.go()//pour actualiser
        //         }).catch(function(){
        //             console.log("Erreur de création")
        //         })
      },
      showMsgBoxTwo() {
        this.$bvModal.msgBoxConfirm('Etes-vous sûr de vouloir continuer ?', {
          title: 'Confirmer',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'OUI',
          cancelTitle: 'NON',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
            this.$refs['modal-scoped'].hide()
            if (this.boxTwo == true){
              this.$bvModal.hide('modal-scoped')
              console.log(this.idcreneau)
              axios.delete("http://localhost:3000/api/creneaux/"+this.idcreneau, {withCredentials: true
                      }).then(response =>{
                    
                          this.$router.go()//pour actualiser
                      }).catch(function(){
                          console.log("Erreur de création")
                      })
              

            }
            //this.boxTwo = ''
          })
          .catch(err => {
            // An error occurred
          })
          //this.$nextTick(() => {
          //   if (this.boxTwo == true){
          //     console.log(this.idcreneau)
          //     event.remove(this.idcreneau) 
          //     //this.boxTwo=""
          //   }
          //})
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
            console.log("r")
            result = await axios.get("http://localhost:3000/api/evenements/"+this.$route.params.id+"/creneaux", {withCredentials: true
              });
            let tabtemp = []
            for(let i=0; i<result.data.length;i++){
                let h = result.data[i].heureDebut.split(":")[0]
                let d = Number((result.data[i].date.split("T")[0]).split("-")[2])
                h = h-1
                d = d+1
                if (h<10){
                  h = "0"+h
                }
                if (d<10){
                  d = "0"+d
                }
                let profbyCreneau = await axios.get("http://localhost:3000/api/creneaux/"+result.data[i].idCreneau+"/jurys",{jurys:this.form.jurySelected}, {withCredentials: true
                  });
                let creneau = {
                  id: result.data[i].idCreneau,
                  title: result.data[i].salle, 
                  //date: result.data[i].date,08:00:00
                  start: (result.data[i].date.split("T")[0]).split("-")[0]+"-"+(result.data[i].date.split("T")[0]).split("-")[1]+"-"+d+"T"+h+":"+result.data[i].heureDebut.split(":")[1]+":"+result.data[i].heureDebut.split(":")[2]+"Z",
                  color:"#ff3300"
                  }
                this.calendarOptions.events.push(creneau)
                for(let j=0; j<profbyCreneau.data.length;j++){
                  creneau.title += " "+ profbyCreneau.data[j].nomProf + " " +profbyCreneau.data[j].prenomProf
                  console.log(creneau)
                }
                let colorevent = ['#0066ff','#ff3399','#ff6600','#669900','#cc6600','#9900cc','#006600','#006666','#cc00ff','#990033','#002b80']
                  creneau.color = colorevent[i]

                let s = creneau.title.split(" ")[0] 
                  if (!tabtemp.includes(s)){
                    tabtemp.push(s)
                  }
                // if (creneau.title.split(" ")[0] == tabtemp[0])
                //   creneau.color = colorevent[i]
            }
            console.log(tabtemp)
            //console.log(result.data[0].date.split("T")[0]+"T"+result.data[0].heureDebut+"Z"+ " "+result.data[0].salle)
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
  width: 85%;
  display: block;
  margin-left: auto;
  margin-right: auto 
}

</style>