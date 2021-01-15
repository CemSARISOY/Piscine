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
          eventClick: this.modifCreneau,
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
              var url1 = "https://projet-piscine-g3.herokuapp.com/api/creneaux/"
              axios.get(url1).then((res) => {
              for(let i=0; i<res.data.length;i++){
                let creneau={}
                await axios.get("https://projet-piscine-g3.herokuapp.com/api/evenements/"+res.data[i].idEvent).then((resultat)=>{
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
      modifCreneau(info){
        if(this.$store.getters.authenticated){
          const url1 = "https://projet-piscine-g3.herokuapp.com/api/creneaux/"+info.event.id
          axios.get(url1).then((res)=>{
            let dateToFormat = new Date(res.data.date)
            if(res.data.idGroupe==null){
              var confirmation = confirm(
                "Date du créneau :\n" + dateToFormat.getDate()+"/"+(dateToFormat.getMonth()+1)+"/"+dateToFormat.getFullYear()+"\n"+
                "Heure de début :\n" + res.data.heureDebut +"\n"+
                "Salle :\n"+ res.data.salle + "\n"+
                "Voulez-vous réserver ce créneau ?"
              )
              if(confirmation){
                const numEtud = JSON.stringify(this.$store.getters.userInfo.numEtudiant)
                let etuds = []
                etuds.push(numEtud)
                const numEtud2 = prompt("Veuillez entrer votre le numéro étudiant de votre camarade 1 :")
                if(numEtud2) etuds.push(numEtud2)
                const numEtud3 = prompt("Veuillez entrer votre le numéro étudiant de votre camarade 2 :")
                const tuteurGroupe = prompt("Veuillez entrer l'id de votre tuteur:")
                const nomTutEnt = prompt("Veuillez entrer le NOM de votre tuteur entreprise :")
                const prenomTutEnt = prompt("Veuillez entrer le PRENOM de votre tuteur entreprise :")
                const nomEntreprise = prompt("Veuillez entrer le nom de votre entreprise")
                if(numEtud3) etuds.push(numEtud3)
                  axios.post("https://projet-piscine-g3.herokuapp.com/api/groupes/", {
                    tuteurGroupe: tuteurGroupe,
                    nomTutEnt : nomTutEnt,
                    prenomTutEnt: prenomTutEnt,
                    nomEntreprise: nomEntreprise,
                    etudiants : etuds
                  }, {withCredentials:true}).then( (response) => {
                    axios.put("https://projet-piscine-g3.herokuapp.com/api/creneaux/"+info.event.id,{
                    idGroupe:response.data.idGroupe,
                    }).then((res)=>{
                      alert(JSON.stringify(res.data))
                    })
                  }).catch( error => {
                    console.log(error.response)
                  })
                  
              }
            } else {
              alert("Date du créneau :\n" + dateToFormat.getDate()+"/"+(dateToFormat.getMonth()+1)+"/"+dateToFormat.getFullYear()+"\n"+
                "Heure de début :\n" + res.data.heureDebut +"\n"+
                "Salle :\n"+ res.data.salle + "\n"+
                "Réservé par le groupe "+res.data.idGroupe)
            }
          })
          
        }
      },
    },
    async mounted(){
        if(this.$store.getters.authenticated){
          //var etudiantInfo = JSON.parse(this.$store.getters.userInfo)
          try{
            const url1 = "https://projet-piscine-g3.herokuapp.com/api/evenements/"+this.$route.params.id+"/creneaux/"
            let res = await axios.get(url1)
            for(let i=0; i<res.data.length;i++){
              let getTitle = await axios.get("https://projet-piscine-g3.herokuapp.com/api/evenements/"+this.$route.params.id)
              let dateHeure = new Date(res.data[i].date).setHours(res.data[i].heureDebut.split(':')[0], res.data[i].heureDebut.split(':')[1], res.data[i].heureDebut.split(':')[2])
              let creneau={
                id:res.data[i].idCreneau,
                title: getTitle.data.nomEvenement,
                date: dateHeure,
              }
              if(!res.data[i].idGroupe){
                this.calendarOptions.events.push(creneau)
              }
            }
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