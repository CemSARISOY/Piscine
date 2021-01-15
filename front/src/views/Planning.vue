<template>
  <div class=planning>
    <center>
      <h1> {{nomEvent}}</h1>
    </center>
    <planning-form />
  </div>
</template>
<script>

import axios from 'axios'
import PlanningForm from '../components/planningForm.vue'
export default {
  components:{
    PlanningForm
  },
  async mounted(){
        try{
            const result = await axios.get("https://projet-piscine-g3.herokuapp.com/api/evenements/"+this.$route.params.id, {withCredentials: true
              });
                this.nomEvent = result.data.nomEvenement
        }catch(err){
            console.log(err)
        }
    }, data(){
        return{
            nomEvent:""
        }
    }
}
</script>