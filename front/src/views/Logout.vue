<script>
//import axios from 'axios'
import { mapState } from 'vuex'

export default {
    methods: {
        disconnect(){
            
        }
    },
    computed: {
        ...mapState(['connected'])
    },
    mounted() {
        if(this.connected){
            this.disconnect();
            this.$router.push("/")
        }
    }
}
</script>