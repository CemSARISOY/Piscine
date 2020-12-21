<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand tag="h1" class="mb-0" href="/">Projet Piscine</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item router-link to="/">Accueil</b-nav-item>
                    <b-nav-item v-if="this.$route.path == '/planning' "> Planning</b-nav-item>
                    <b-nav-item v-if="this.$route.path == '/reserve' "> Réservation</b-nav-item>
                    <b-nav-item v-if="this.$route.path == '/profile' "> Profil</b-nav-item>
                    <b-nav-item v-if="this.$route.path == '/login' "> Connexion</b-nav-item>
                    <b-nav-item v-if="this.$route.path == '/signup' "> Inscription</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown v-if=connected right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>Mon Compte</em>
                        </template>
                        <b-dropdown-item router-link to="/profile" >Profil</b-dropdown-item>
                        <b-dropdown-item router-link to="/logout">Se déconnecter</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-navbar-nav v-else>
                        <b-nav-item router-link to="/login">Se connecter</b-nav-item>
                        <b-nav-item router-link to="/signup">S'inscrire</b-nav-item>
                    </b-navbar-nav>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
      ...mapState(['connected'])
    }
}
</script>
<style scoped>

</style>