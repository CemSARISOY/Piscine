<template>
    <div id="promos">
        <b-container>
            <b-card>
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
        }
    }
}
</script>
<style scoped>

</style>