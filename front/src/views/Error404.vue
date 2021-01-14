<template>
    <div id="error404">
        <b-container class="mt-4">
            <b-card>
                <b-container class="d-flex justify-content-center">
                    <b-row align-v="center">
                        <b-col>
                            <div class="h1 mb-0 text-center">
                                <b-icon-exclamation-circle-fill></b-icon-exclamation-circle-fill>
                                <h2>La page désirée n'existe pas !</h2>

                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </b-card>
        </b-container>
    </div>
</template>
<script>
import { BIconExclamationCircleFill } from 'bootstrap-vue'
export default {
    components: {
        
        BIconExclamationCircleFill
    }
}
</script>
