<template>
    <div id="promos">
        <b-container class="mt-4">
            <b-card>
                <b-form inline @submit.prevent="onSubmit" class="float-right">
                    <label class="sr-only" for="nomP">Name</label>
                    <b-form-input
                    id="nomP"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="nvNom"
                    placeholder="Entrer le nom"
                    ></b-form-input>
                    <label class="sr-only" for="prenomP">Name</label>
                    <b-form-input
                    id="prenomP"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="nvPrenom"
                    placeholder="Entrer le prenom"
                    ></b-form-input>
                    <b-button type="submit" variant="primary">Ajouter</b-button>
                </b-form>
                <b-pagination
                v-model="currentPage"
                :total-rows="rows()"
                :per-page="perPage"
                aria-controls="table"
                ></b-pagination>
                <b-table id="table" striped hover :items="profs" :fields="fields" show-empty :per-page="perPage" :current-page="currentPage">
                    <template #cell(Suppression)="row">
                        <b-button @click="suppression(row.item.idProf)">
                            Supprimer
                        </b-button>
                    </template>
                    <template #empty="scope">
                        <h4>{{ scope.emptyTest = "Aucun professeur à afficher" }}</h4>
                    </template>
                </b-table>
            </b-card>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            nvNom: '',
            nvPrenom: '',
            perPage: 6,
            currentPage: 1,
            sortBy: '',
            sortDesc: '',
            fields: [{key:'idProf', sortable: true}, {key:'nomProf', sortable: true}, {key:'prenomProf', sortable: true}, {key:'Suppression', sortable: false}],
            profs : [],
        }
    },
    mounted(){
        axios.get("http://localhost:3000/api/professeurs", {withCredentials:true})
        .then( (response) => {
            for(let i = 0; i<response.data.length;i++){
                console.log(response.Data)
                this.profs.push({idProf : response.data[i].idProf, nomProf : response.data[i].nomProf, prenomProf : response.data[i].prenomProf})
            }
        });
    },
    methods:{
        suppression(id){
            let result = confirm("Voulez vous vraiment supprimer l'étudiant de numéro : "+id+" ?")
            if(result){
                axios.delete("http://localhost:3000/api/professeurs/"+id, {withCredentials:true}).then( () => {
                    this.$router.go();
                }).catch( (error) => {
                    this.makeToast(error.response.data.message)
                });
            }
        },
        makeToast(string){
            this.$bvToast.toast(string, {
                title: 'Erreur !',
                variant: 'danger',
                autoHideDelay: 5000,
            })
        },
        rows(){
            return this.profs.length
        },
        onSubmit(){
            axios.post("http://localhost:3000/api/professeurs", {nomProf: this.nvNom, prenomProf: this.nvPrenom}, {withCredentials:true})
            .then( () => {
                this.$router.go();
            })
            .catch( (error) => {
                this.makeToast(error.response.data.message)
            });
        }
    }
}
</script>
<style scoped>

</style>