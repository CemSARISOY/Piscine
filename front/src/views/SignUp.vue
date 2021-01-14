<template>
  <div class=myaccount>
    <b-container class="mt-4">
      <b-card>
        <h1 class="text-center">Inscription</h1>
        <sign-up-form/>
      </b-card>
    </b-container>
  </div>
</template>
<script>

import SignUpForm from "../components/SignUpForm"
export default {
  components:{
    SignUpForm
  }
}
</script>
