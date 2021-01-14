<template>
  <div class="col-md-6">
    <h4>EVENEMENTS</h4>

    <b-list-group>
      <b-list-group-item href="/eventinfo">
        {{
        this.event.evenements[0].promo}} : {{
        this.event.evenements[0].nomEvenement}}
      </b-list-group-item>

      <b-list-group-item href="/eventinfo">
        {{
        this.event.evenements[1].promo}} : {{
        this.event.evenements[1].nomEvenement}}
      </b-list-group-item>

      <b-list-group-item href="/eventinfo">
        {{
        this.event.evenements[2].promo}} : {{
        this.event.evenements[2].nomEvenement}}
      </b-list-group-item>

      <b-list-group-item variant="secondary" href="/event/create">Ajouter un événement</b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      event: {
        evenements: []
      },
      state: {
        evenement: ""
      }
    };
  },
  methods: {
    getEvents() {
      if (
        this.$store.getters.authenticated ||
        this.$store.getters.userInfo.isAdmin
      ) {
        axios
          .get(`http://localhost:3000/api/evenements`)
          .then(response => {
            this.event.evenements = response.data;
          })
          .catch(error => {
            console.log("erreur : ", error);
          });
      }
    }
  },

  async mounted() {
    this.getEvents();
  }
};
</script>

<style scoped>
.form {
  width: 50%;
  margin: auto;
}

.col-md-6 {
  margin-left: auto;
  margin-right: auto;
}
</style>