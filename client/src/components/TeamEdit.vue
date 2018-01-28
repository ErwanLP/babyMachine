<template>
  <div class="container">
    <div class="card center-card">
      <div class="card-body">
        <h5 class="card-title">Edition d'une équipe</h5>
        <hr>
        <form>
          <div class="form-group">
            <label for="inputTrigram">Name</label>
            <input type="text" v-model="team.name" class="form-control" id="inputTrigram">
          </div>
          <div class="form-group">
            <label for="inputNumberPlayer">Nombre de joueurs</label>
            <input type="text" v-model="team.numberPlayer" readonly class="form-control-plaintext" id="inputNumberPlayer">
          </div>
          <Player v-for="(playerObject, i) in team.players" :key="i" :player-object="playerObject"
                  :team-id="team.id || 'newTeam'" :users="users" :number="i"></Player>
          <hr>
          <div class="form-group row" style="text-align: center">
            <div class="col-sm-4">
              <a href="#/teams">
                <button type="button" class="btn btn-secondary">Annuler</button>
              </a>
            </div>
            <div class="col-sm-4">
              <button v-on:click=" displayDeleteButton = !displayDeleteButton" type="button" class="btn btn-danger">
                Supprimer
              </button>
            </div>
            <div class="col-sm-4">
              <button v-on:click="saveTeam()" class="btn btn-primary">Sauvegarder</button>
            </div>
          </div>
          <div class="center-button" v-if="displayDeleteButton">
            <div class=" alert alert-danger" role="alert">
              <button v-on:click="deleteTeam()" type="button" class="btn btn-danger">Confirmer la suppression</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from '@/utils/axios'
  import Player from '@/components/TeamEdit/Player'
  import router from '@/router'

  export default {
    name: 'TeamEdit',
    data () {
      return {
        displayDeleteButton: false,
        users: [],
        team: {
          name: null,
          numberPlayer: 2,
          players: []
        }
      }
    },
    components: {Player},
    created () {
      // GET USER
      axios.get('/api/users/')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        })
      for (let i = 0; i < this.team.numberPlayer; i++) {
        this.team.players.push({
          player: {},
          isManager: false
        })
      }
      // GET TEAM
      let id
      if (this.$route.params) {
        id = this.$route.params.id
      }
      if (id) {
        axios.get('/api/teams/' + id)
          .then(response => {
            this.team = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    methods: {
      saveTeam: function () {
        let url = '/api/teams'
        if (this.team._id) {
          url += '/' + this.team._id
        }
        axios.post(url, this.team)
          .then(function (response) {
            router.push({path: '/teams'})
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      deleteTeam: function () {
        if (this.team._id) {
          let url = '/api/teams/' + this.team._id
          axios.delete(url)
            .then(response => {
              router.push({path: '/teams'})
            })
            .catch(error => {
              console.error(error)
            })
        } else {
          router.push({path: '/teams'})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
