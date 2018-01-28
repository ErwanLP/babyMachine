<template>
  <div  class="container">
    <div class="card center-card">
      <div class="card-body">
        <h5 class="card-title">Liste des tournois</h5>
        <hr>
        <table class="table">
          <thead>
          <tr>
            <th><a href="#/tournament/create">
              <button type="button" class="btn btn-outline btn-sm">
                <i class="fa fa-plus" aria-hidden="true"></i></button></a></th>
            <th>Nom</th>
            <th>Edition</th>
            <th>Inscription</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(tournament, index) in tournaments"  :key="tournament._id">
            <th scope="row">#{{ index }}</th>
            <td>{{ tournament.name }}</td>
            <td><a v-bind:href="'#/tournament/'+tournament._id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
            <td><button v-on:click="selectedTournament = tournament" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalRegistrationTournament"> Inscription  </button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalRegistrationTournament" tabindex="-1" role="dialog" aria-labelledby="modalRegistrationTournament" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="selectedTournament" class="modal-title" id="exampleModalLongTitle">Inscription - {{selectedTournament.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group  col-md-6">
              <label for="selectPlayerOne">Equipe : </label>
              <select v-model="selectedTeam" class="form-control" id="selectPlayerOne">
                <option v-for="(team) in teams" :key="team._id" :value="team">{{team.name}}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" v-on:click="registrationTournament()" data-dismiss="modal">Inscription</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from '@/utils/axios'

export default {
  name: 'Tournaments',
  data () {
    return {
      selectedTournament : null,
      selectedTeam : null,
      tournaments : [],
      teams : []
    }
  },
  created () {
    // GET TOURNAMENT
    axios.get('/api/tournaments')
      .then(response => {
        this.tournaments = response.data
      })
      .catch(error => {
        console.log(error)
      })
    // GET TEAM
    axios.get('/api/teams')
      .then(response => {
        this.teams = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    registrationTournament : function () {
      console.log(this.selectedTournament, this.selectedTeam)
      let url = '/api/tournaments/' + this.selectedTournament._id + '/registration'
      axios.post(url, {selectedTeam : this.selectedTeam})
        .then(response => {
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
