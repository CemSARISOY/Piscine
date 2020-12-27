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

                <label for="example-datepicker">Date du début de l'événement</label>
                <b-form-datepicker id="example-datepicker" placeholder="Veuillez choisir une date" v-model="form.date" class="mb-2"></b-form-datepicker>

                <b-form-group
                    id="input-group-1"
                    label="Durée en jours de l'événement:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.duree"
                        type="text"
                        required
                        placeholder="Entrer la durée de l'événement"
                    ></b-form-input>
                </b-form-group>

                <label for="example-datepicker">Date limite de réservation de créneaux</label>
                <b-form-datepicker id="example-datepicker" placeholder="Veuillez choisir une date" v-model="form.dateLimiteRes" class="mb-2"></b-form-datepicker>

                <b-form-group label="Durée d'un créneau" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="form.dureeCreneau" :aria-describedby="ariaDescribedby" name="some-radios" value="01:00:00">1h</b-form-radio>
                    <b-form-radio v-model="form.dureeCreneau" :aria-describedby="ariaDescribedby" name="some-radios" value="01:30:00">1h30</b-form-radio>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label="Nombre de créneaux de l'événement:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.nbCreneaux"
                        type="text"
                        required
                        placeholder="Entrer le nombre de créneaux"
                    ></b-form-input>
                </b-form-group>
                
                <label for="promo-selector">Sélectionner la promo</label>
                <b-form-select id="promo-selector" v-model="form.promo" :options="form.options"></b-form-select>

                <b-button type="submit" variant="primary">Créer l'événement</b-button>
            </b-form>
        </div>
    </div>
</template>
<script>

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
                ]
            }
        }
    },
    methods: {
        onSubmit(){
            console.log(this.form)
            console.log(this.creneaux)
        }
    },
    computed: {
        creneaux: function() {
            if(this.form.nbCreneaux){
                let tab = []
                for(let i=0; i<this.form.nbCreneaux; i++){
                    tab.push(1)
                }
                return tab
            }
            return null
        }
    },
    mounted(){

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