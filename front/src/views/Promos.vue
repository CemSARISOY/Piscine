<template>
    <div id="promos">
        <b-container class="mt-4">
            <b-card>
                <b-tabs content-class="mt-3">
                    <b-tab title="IG3" active>
                        <b-pagination
                        v-model="currentPage[0]"
                        :total-rows="rows(0)"
                        :per-page="perPage"
                        aria-controls="tabig3"
                        ></b-pagination>
                        <b-table id="tabig3" striped hover :items="IG3" :fields="fields" show-empty :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive="sm" :per-page="perPage" :current-page="currentPage[0]">
                            <template #cell(Suppression)="row">
                                <b-button @click="suppression(row.item.numEtudiant)">
                                    Supprimer
                                </b-button>
                            </template>
                            <template #empty="scope">
                                <h4>{{ scope.emptyTest = "Aucun étudiant à afficher" }}</h4>
                            </template>
                        </b-table>
                    </b-tab>
                    
                    <b-tab title="IG4">
                        <b-pagination
                        v-model="currentPage[1]"
                        :total-rows="rows(1)"
                        :per-page="perPage"
                        aria-controls="tabig4"
                        ></b-pagination>
                        <b-table id="tabig4" striped hover :items="IG4" :fields="fields" show-empty :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive="sm" :per-page="perPage" :current-page="currentPage[1]">
                            <template #cell(Suppression)="row">
                                <b-button @click="suppression(row.item.numEtudiant)">
                                    Supprimer
                                </b-button>
                            </template>
                            <template #empty="scope">
                                <h4>{{ scope.emptyTest = "Aucun étudiant à afficher" }}</h4>
                            </template>
                        </b-table>
                    </b-tab>

                    <b-tab title="IG5">
                        <b-pagination
                        v-model="currentPage[2]"
                        :total-rows="rows(2)"
                        :per-page="perPage"
                        aria-controls="tabig5"
                        ></b-pagination>
                        <b-table id="tabig5" striped hover :items="IG5" :fields="fields" show-empty :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive="sm" :per-page="perPage" :current-page="currentPage[2]">
                            <template #cell(Suppression)="row">
                                <b-button @click="suppression(row.item.numEtudiant)">
                                    Supprimer
                                </b-button>
                            </template>
                            <template #empty="scope">
                                <h4>{{ scope.emptyTest = "Aucun étudiant à afficher" }}</h4>
                            </template>
                        </b-table>
                    </b-tab>
                </b-tabs>
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
            currentPage: [1,1,1],
            sortBy: '',
            sortDesc: '',
            fields: [{key:'numEtudiant', sortable: true}, {key:'nomEtudiant', sortable: true}, {key:'prenomEtudiant', sortable: true}, {key:'Suppression', sortable: false}],
            IG3 : [],
            IG4 : [],
            IG5 : []
        }
    },
    mounted(){
        axios.get("http://localhost:3000/api/promos/2020/etudiants", {withCredentials:true})
        .then( (response) => {
            for(let i = 0; i<response.data.length;i++){
                this.IG3.push({numEtudiant : response.data[i].numEtudiant, nomEtudiant : response.data[i].nomEtudiant, prenomEtudiant : response.data[i].prenomEtudiant})
            }
        });
        axios.get("http://localhost:3000/api/promos/2019/etudiants", {withCredentials:true})
        .then( (response) => {
            for(let i = 0; i<response.data.length;i++){
                this.IG4.push({numEtudiant : response.data[i].numEtudiant, nomEtudiant : response.data[i].nomEtudiant, prenomEtudiant : response.data[i].prenomEtudiant})
            }
        });
        axios.get("http://localhost:3000/api/promos/2018/etudiants", {withCredentials:true})
        .then( (response) => {
            for(let i = 0; i<response.data.length;i++){
                this.IG5.push({numEtudiant : response.data[i].numEtudiant, nomEtudiant : response.data[i].nomEtudiant, prenomEtudiant : response.data[i].prenomEtudiant})
            }
        });
    },
    methods:{
        suppression(id){
            let result = confirm("Voulez vous vraiment supprimer l'étudiant de numéro : "+id+" ?")
            if(result){
                axios.delete("http://localhost:3000/api/etudiants/"+id, {withCredentials:true}).then( () => {
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
        rows(int){
            if(int == 0){
                return this.IG3.length
            }else if(int == 1){
                return this.IG4.length
            }else{
                return this.IG5.length
            }
        }
    }
}
</script>
<style scoped>

</style>