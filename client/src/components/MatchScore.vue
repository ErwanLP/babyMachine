<template>
  <div class="container">
    <div class="card center-card">
      <div class="card-body">
        <h5 class="card-title">Score d'un match</h5>
        <hr>
        <form>
          <Team v-for="(teamObject, i) in match.teams" :key="i" :team-object="teamObject"
                 :teams="teams" :number="i"></Team>
          <hr>
          <div class="form-group row" style="text-align: center">
            <div class="col-sm-4">
              <a href="#/matches">
                <button type="button" class="btn btn-secondary">Annuler</button>
              </a>
            </div>
            <div class="col-sm-4">
              <button v-on:click="setScore()" class="btn btn-primary">set score</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from '@/utils/axios'
  import Team from '@/components/MatchEdit/Team'
  import router from '@/router'

  export default {
    name: 'TeamEdit',
    data () {
      return {
        teams: [],
        match: {
          numberOfTeam: 2,
          teams: []
        }
      }
    },
    components: {Team},
    created () {
      // GET TEAM
      axios.get('/api/teams/')
        .then(response => {
          this.teams = response.data
        })
        .catch(error => {
          console.log(error)
        })
      for (let i = 0; i < this.match.numberOfTeam; i++) {
        this.match.teams.push({
          team: {},
          score: null
        })
      }
      // GET MATCH
      let id;
      if (this.$route.params) {
        id = this.$route.params.id
      }
      if (id) {
        axios.get('/api/matches/' + id)
          .then(response => {
            this.match = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    methods: {
      setScore: function () {
        let url = `/api/matches/${this.match._id}/score`
        axios.post(url, this.match)
          .then(function (response) {
            router.push({path: '/matches'})
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
