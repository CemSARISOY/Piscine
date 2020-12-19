<script>
import { mapState } from 'vuex'

export default {
    computed: {
    ...mapState(['connected'])
  },
  mounted() {
    if(this.connected){
      this.$router.push("/")
    }
  }
}
</script>