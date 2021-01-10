<template>
    <div class=login>
        <h1>Création d'evenement</h1>
        <div class="form">
            <b-form @submit.prevent="onSubmit">
                <b-form-group
                    id="input-group-1"
                    label="Nom de l'événement:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.nomEvenement"
                        type="text"
                        required
                        placeholder="Entrer le nom de l'événement"
                    ></b-form-input>
                </b-form-group>

                <label for="dateDebut-datepicker">Date du début de l'événement</label>
                <b-form-datepicker id="dateDebut-datepicker" placeholder="Veuillez choisir une date" v-model="form.date" class="mb-2"></b-form-datepicker>

                <b-form-group
                    id="input-group-1"
                    label="Durée en jours de l'événement:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.duree"
                        type="number"
                        required
                        placeholder="Entrer la durée de l'événement"
                    ></b-form-input>
                </b-form-group>

                <label for="limite-datepicker">Date limite de réservation de créneaux</label>
                <b-form-datepicker id="limite-datepicker" placeholder="Veuillez choisir une date" v-model="form.dateLimiteRes" class="mb-2"></b-form-datepicker>

                <b-form-group label="Durée d'un créneau" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="form.dureeCreneau" :aria-describedby="ariaDescribedby" name="some-radios" value="01:00">1h</b-form-radio>
                    <b-form-radio v-model="form.dureeCreneau" :aria-describedby="ariaDescribedby" name="some-radios" value="01:30">1h30</b-form-radio>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label="Nombre de créneaux de l'événement:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.nbCreneaux"
                        type="number"
                        required
                        placeholder="Entrer le nombre de créneaux"
                    ></b-form-input>
                </b-form-group>
                
                <label for="promo-selector">Sélectionner la promo</label>
                <b-form-select id="promo-selector" v-model="form.promo" :options="form.options"></b-form-select>

                <label for="promo-selector">Sélectionner les jurys</label>
                <b-form-select v-model="form.jurySelected" :options="form.juryOptions" multiple :select-size="4"></b-form-select>

                <b-form-group
                    id="input-group-1"
                    label="Salles de l'événement (séparer par un point virgule)"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.salles"
                        type="text"
                        required
                        placeholder="Entrer les salles"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Créer l'événement</b-button>
            </b-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return {
            form:{
                nomEvenement: "",
                date: "",
                duree: "",
                dateLimiteRes: "",
                dureeCreneau: "",
                nbCreneaux: "",
                promo: "",
                options: [
                {value: 2020, text: 'IG3'},
                {value: 2019, text: 'IG4'},
                {value: 2018, text: 'IG5'}
                ],
                juryOptions: [],
                jurySelected:[],
                salles :""
            }
        }
    },
    methods: {
        onSubmit(){
            axios.post("http://localhost:3000/api/evenements", {
                promo: this.form.promo,
                nomEvenement: this.form.nomEvenement,
                dateDebut: new Date(this.form.date).toLocaleDateString(),
                duree: this.form.duree,
                dateLimiteRes: new Date(this.form.dateLimiteRes).toLocaleDateString(),
                dureeCreneau: this.form.dureeCreneau,
                creneaux: this.creneaux
            }, {withCredentials:true})
            .then( () => {
                alert("Event créé");
            })
            .catch( () => {
                alert("Erreur");
            })
        }
    },
    computed: {
        creneaux: function() {
            if(this.form.nbCreneaux){
                let dateCreneau = new Date(this.form.date)
                if(dateCreneau.getDay() == 0){
                    dateCreneau.setDate(dateCreneau.getDate() + 1)
                }else if(dateCreneau.getDay() == 6){
                    dateCreneau.setDate(dateCreneau.getDate() + 2)
                }
                let tab = []
                let salles = this.form.salles.split(";")
                let indiceSalle = 0
                let indiceJury = 0
                let heure = 8
                let minute = 0
                for(let i=0; i<this.form.nbCreneaux; i++){
                    tab.push({
                        date: dateCreneau.toLocaleDateString(),
                        heure: heure+":"+minute,
                        salle: salles[indiceSalle],
                        jury: this.form.jurySelected[indiceJury]
                    })
                    let increment = this.form.dureeCreneau.split(":");
                    heure = heure + Number(increment[0])
                    minute = minute + Number(increment[1])
                    if(heure >= 12 && heure < 14){
                        heure = 14
                        minute = 0
                    }
                    if(minute > 59) {
                        minute = 0
                        heure = heure + 1
                    }
                    if(heure>= 18){
                        heure = 8
                        minute = 0
                        if(dateCreneau.getDay() == 5){
                            dateCreneau.setDate(dateCreneau.getDate() + 3)
                        }
                        else{
                            dateCreneau.setDate(dateCreneau.getDate() + 1)
                        }
                    }
                    indiceJury++;
                    if(indiceJury === this.form.jurySelected.length) indiceJury = 0
                    indiceSalle++;
                    if(indiceSalle === salles.length) indiceSalle = 0
                }
                return tab
            }
            return null
        }
    },
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
    .form{
        width:50%;
        margin:auto;
        text-align:left;
    }
</style>