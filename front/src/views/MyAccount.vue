<template>
  <div class=signup>
    <b-container>
      <b-card>
        <div class="text-center">
          <h2>Votre compte</h2>
        </div>
        <my-account-form v-if="modif"/>
        <my-account-infos v-else/>
        <b-button v-if="!modif" @click="switchMod">Modifier vos informations</b-button>
      </b-card>
    </b-container>
  </div>
</template>
<script>

import MyAccountForm from '../components/MyAccountForm'
import MyAccountInfos from '../components/MyAccountInfos'
export default {
  data(){
    return{
      modif: false
    }
  },
  components:{
    MyAccountForm,
    MyAccountInfos

  },
  methods:{
    switchMod(){
      this.modif = !this.modif
    }
  }
}
</script>
