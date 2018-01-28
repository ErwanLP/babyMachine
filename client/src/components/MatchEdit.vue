<template>
  <div class="container">
    <div class="card center-card">
      <div class="card-body">
        <h5 class="card-title">Edition d'un match</h5>
        <hr>
        <form>
          <div class="form-group">
            <label for="inputNumberPlayer">Nombre d'équipe</label>
            <input type="text" v-model="match.numberOfTeam" readonly class="form-control-plaintext" id="inputNumberPlayer">
          </div>
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
              <button v-on:click=" displayDeleteButton = !displayDeleteButton" type="button" class="btn btn-danger">
                Supprimer
              </button>
            </div>
            <div class="col-sm-4">
              <button v-on:click="saveMatch()" class="btn btn-primary">Sauvegarder</button>
            </div>
          </div>
          <div class="center-button" v-if="displayDeleteButton">
            <div class=" alert alert-danger" role="alert">
              <button v-on:click="deleteMatch()" type="button" class="btn btn-danger">Confirmer la suppression</button>
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
        displayDeleteButton: false,
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
      let id
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
      saveMatch: function () {
        let url = '/api/matches'
        if (this.match._id) {
          url += '/' + this.match._id
        }
        axios.post(url, this.match)
          .then(function (response) {
            router.push({path: '/matches'})
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      deleteMatch: function () {
        if (this.team._id) {
          let url = '/api/matches/' + this.match._id
          axios.delete(url)
            .then(response => {
              router.push({path: '/matches'})
            })
            .catch(error => {
              console.error(error)
            })
        } else {
          router.push({path: '/matches'})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
