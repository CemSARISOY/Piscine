<template>
  <div class="col-md-6">

    <b-list-group>
      <b-list-group-item>Evénement : <a :href="urlEventInfo">{{this.form.nomEvent}}</a></b-list-group-item>
      <b-list-group-item>Nombre de créneaux libres : {{this.form.nombreCrenauxLibres}}</b-list-group-item>
      <b-list-group-item>Durée d'une soutenance : {{parseDuree(this.form.dureeCreneau)}}</b-list-group-item>
      <b-list-group-item>Date de début des soutenances : {{parseDate(this.form.dateDebut)}}</b-list-group-item>
      <b-list-group-item>Date de fin des soutenances {{addparseDate(this.form.dateDebut,this.form.duree)}}</b-list-group-item>
      <b-list-group-item>Date limite de réservation : {{parseDate(this.form.dateLimiteRes)}}</b-list-group-item>
      <b-list-group-item>Etat de votre réservation : {{status}}</b-list-group-item>
      <b-list-group-item variant="secondary" router-link :to="urlCreneauxEvent">Réserver crénaux</b-list-group-item>
      <b-list-group-item variant="secondary" router-link :to="urlPlanningEvent">Voir planning</b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import axios from "axios";

export default {
  computed: {
    urlEventInfo(){
      return "/event/"+this.form.numEvent
    },
    status(){
      if(this.idGroupe == null){
        return "En attente"
      }else{
        return "Réservé"
      }
    },
    urlCreneauxEvent(){
      return "/creneaux/"+this.form.numEvent 
    },
    urlPlanningEvent(){
      return "/planning/"+this.form.numEvent 
    }
  },
  data() {
    return {
      idGroupe : null,
      grpInfo: {
        tuteurGroupe : "",
        nomTutEnt :"",
        prenomTutEnt: "",
        nomEntreprise : ""
      },
      form: {
        num: "",
        nomEvent: "",
        dateDebut: "",
        dateLimiteRes: "",
        dureeCreneau: "",
        duree: "",
        dateFin: "",
        nombreCrenauxLibres: "",
        numEvent: ""
      }
    };
  },
  methods: {
    parseDate(date) {
      let parsed =
        date.substr(8, 2) + "/" + date.substr(5, 2) + "/" + date.substr(0, 4);
      return parsed;
    },
    parseDuree(duree) {
      let parsed = duree.substr(1, 1) + "h" + duree.substr(3, 2);
      return parsed;
    },
    addparseDate(date, duree) {
      var ajouter = new Date();
      console.log(date);
      console.log(duree);
      console.log(ajouter);
      let annee = date.substr(0, 4);
      let mois = date.substr(5, 2);
      let jour = date.substr(8, 2);

      var dates = new Date(annee, mois, jour);
      console.log(dates);

      ajouter.setDate(dates.getDate() + duree);
      console.log(ajouter);
      var ajouterStr = ajouter.toLocaleDateString();

      return ajouterStr;
    },
    getUserEvent() {
      if (this.$store.getters.authenticated) {
        var etudiantInfo = this.$store.getters.userInfo;

        var num = etudiantInfo.numEtudiant;
        this.form.num = etudiantInfo.numEtudiant;
        axios.get("http://localhost:3000/api/etudiants/"+num+"/groupes", {withCredentials:true}).then( (response) => {
          this.idGroupe = response.data.idGroupe
          axios.get("http://localhost:3000/api/groupes/"+this.idGroupe, {withCredentials:true}).then ( (grp) => {
            this.grpInfo.tuteurGroupe = grp.data.tuteurGroupe
            this.grpInfo.nomTutEnt = grp.data.nomTutEnt
            this.grpInfo.prenomTutEnt = grp.data.prenomTutEnt
            this.grpInfo.nomEntreprise = grp.data.nomEntreprise
          }).catch( (error) => {
            console.log(error.response)
          });
        }).catch( (error) => {
          console.log(error.response)
        })
        axios
          .get(`http://localhost:3000/api/etudiants/${num}/evenements`,{withCredentials:true})
          .then(response => {
            this.form.numEvent = response.data[response.data.length - 1].numEvenement;
            this.form.nomEvent = response.data[response.data.length - 1].nomEvenement;
            this.form.dateDebut = response.data[response.data.length - 1].dateDebut;
            this.form.dateLimiteRes = response.data[response.data.length - 1].dateLimiteRes;
            this.form.dureeCreneau = response.data[response.data.length - 1].dureeCreneau;
            this.form.duree = response.data[response.data.length - 1].duree;
            this.form.dateFin = response.data[response.data.length - 1].duree + response.data[response.data.length - 1].dateDebut;
            axios
              .get(
                `http://localhost:3000/api/evenements/${response.data[response.data.length - 1].numEvenement}/creneaux`, {withCredentials:true}
              )
              .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                  if (response.data[i].idGroupe == null) {
                    this.form.nombreCrenauxLibres++;
                  }
                }
              })
              .catch(error => {
                console.log("erreur : ", error);
              });
          })
          .catch(error => {
            console.log("erreur : ", error);
          });
      }
    }
  },

  async mounted() {
    this.getUserEvent();
  }
};
</script>

<style scoped>
.form {
  width: 50%;
  margin: auto;
}

.col-md-6 {
  margin-left: auto;
  margin-right: auto;
}
</style>

