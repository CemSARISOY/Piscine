<template>
  <div class="home">
    <b-container>
      <b-card>
        <div class="text-center">
          <h2>Evenements en cours</h2>
          <accueil-etu v-if="!isAdmin"/>
          <accueil-prof v-if="isAdmin"/>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import accueilEtu from "../components/accueilEtu"
import accueilProf from "../components/accueilProf"

export default {
  name: 'Home',
  components: {
    accueilEtu,
    accueilProf
  },
  computed: {
      ...mapState(['isAdmin'])
    }
}
</script>
