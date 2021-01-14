<template>
  <div class=signup>
    <b-container class="mt-4">
      <b-card>
        <div class="text-center">
          <h2>Votre compte</h2>
        </div>
        <b-button v-if="modif === 1 || modif === 2" @click="switchMod(0)">Retour</b-button>
        <my-account-infos v-if="modif===0"/>
        <my-account-form v-if="modif===1"/>
        <my-account-newmdp v-if="modif===2"/>
        <div class="mt-2 text-center">
          <b-button class="mt-2 mr-2" v-if="modif===0" @click="switchMod(1)">Modifier vos informations</b-button>
          <b-button class="mt-2 ml-2" v-if="modif===0" @click="switchMod(2)">Modifier votre mot de passe</b-button>
        </div>

      </b-card>
    </b-container>
  </div>
</template>
<script>

import MyAccountForm from '../components/MyAccountForm'
import MyAccountInfos from '../components/MyAccountInfos'
import MyAccountNewmdp from '../components/MyAccountNewmdp'
export default {
  data(){
    return{
      modif: 0
    }
  },
  components:{
    MyAccountForm,
    MyAccountInfos,
    MyAccountNewmdp

  },
  methods:{
    switchMod(mod){
      this.modif = mod
    }
  }
}
</script>
