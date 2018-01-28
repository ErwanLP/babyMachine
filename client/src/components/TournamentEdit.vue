<template>
  <div class="container">
    <div class="card center-card">
      <div class="card-body">
        <h5 class="card-title">Edition d'un tournoi</h5>
        <hr>
        <form>
          <div class="form-group">
            <label for="inputName">Nom</label>
            <input type="text" v-model="tournament.name" class="form-control" id="inputName">
          </div>
          <div class="form-group">
            <label for="inputStartDate">Date de début</label>
            <input type="date" v-model="tournament.startDate" class="form-control" id="inputStartDate">
          </div>
          <hr>
          <ul class="list-group">
            <a class="list-group-item" v-for="(teamObject) in tournament.teams" :key="teamObject._id"
               style="background-color: #d3d3d338; border-bottom: 3px solid white;">
              <i class="fa fa-users" aria-hidden="true"></i>
              <div class="bmd-list-group-col">
                <p class="list-group-item-heading">{{teamObject.team.name}}</p>
                <p class="list-group-item-text">{{getPlayerNameInTeam(teamObject.team)}}</p>
              </div>
              <i class="fa fa-trash pull-xs-right"></i>
            </a>
          </ul>
          <hr>
          <div class="form-check row"  style="text-align: center">
            <div class="col-sm-5">
              <input v-model="canGenerateMatches" type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1"> Géneration matchs (poule)</label>
            </div>
            <div class="col-sm-5">
              <button :disabled="canGenerateMatches === false" v-on:click="generateMatches()" class="btn btn-primary">Générer</button>
            </div>
          </div>
          <hr>
          <div class="form-group row" style="text-align: center">
            <div class="col-sm-4">
              <a href="#/tournaments">
                <button type="button" class="btn btn-secondary">Annuler</button>
              </a>
            </div>
            <div class="col-sm-4">
              <button v-on:click="displayDeleteButton = !displayDeleteButton" type="button" class="btn btn-danger">
                Supprimer
              </button>
            </div>
            <div class="col-sm-4">
              <button v-on:click="saveTournament()" class="btn btn-primary">Sauvegarder</button>
            </div>
          </div>
          <div class="center-button" v-if="displayDeleteButton">
            <div class=" alert alert-danger" role="alert">
              <button v-on:click="deleteTournament()" type="button" class="btn btn-danger">Confirmer la suppression
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from '@/utils/axios'
  import router from '@/router'

  export default {
    name: 'TournamentEdit',
    data () {
      return {
        displayDeleteButton: false,
        canGenerateMatches: false,
        tournament: {
          id: null,
          name: null,
          startDate: null,
          endDate: null
        }
      }
    },
    created () {
      if (this.$route.params) {
        var id = this.$route.params.id
      }
      if (id) {
        axios.get('/api/tournaments/' + id)
          .then(response => {
            this.tournament = response.data
            this.tournament.startDate = this.dateToShortISOString(response.data.startDate)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    methods: {
      saveTournament: function () {
        let url = '/api/tournaments'
        if (this.tournament._id) {
          url += '/' + this.tournament._id
        }
        axios.post(url, this.tournament)
          .then(function (response) {
            router.push({path: '/tournaments'})
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      deleteTournament: function () {
        if (this.tournament._id) {
          let url = '/api/tournaments/' + this.tournament._id
          axios.delete(url)
            .then(response => {
              router.push({path: '/tournaments'})
            })
            .catch(error => {
              console.error(error)
            })
        } else {
          router.push({path: '/tournaments'})
        }
      },
      getPlayerNameInTeam: function (team) {
        let string = ''
        team.players.forEach(playerObject => {
          string += playerObject.player.trigram + ' '
        })
        return string
      },
      generateMatches: function () {
        let url = '/api/tournaments/' + this.tournament._id + '/generateMatches'
        axios.post(url, {})
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
