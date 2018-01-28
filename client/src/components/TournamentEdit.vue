<template>
  <div  class="container">
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
          <div class="form-group row"  style="text-align: center">
            <div class="col-sm-4">
              <a href="#/users"><button type="button" class="btn btn-secondary">Annuler</button></a>
            </div>
            <div class="col-sm-4">
              <button v-on:click="displayDeleteButton = !displayDeleteButton" type="button" class="btn btn-danger">Supprimer</button>
            </div>
            <div class="col-sm-4">
              <button v-on:click="saveTournament()" class="btn btn-primary">Sauvegarder</button>
            </div>
          </div>
          <div class="center-button" v-if="displayDeleteButton">
            <div class=" alert alert-danger" role="alert">
              <button v-on:click="deleteTournament()" type="button" class="btn btn-danger">Confirmer la suppression</button>
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
      displayDeleteButton : false,
      tournament : {
        id : null,
        name : null,
        startDate : null,
        endDate : null
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
          router.push({ path: '/tournaments' })
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
            router.push({ path: '/tournaments' })
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        router.push({ path: '/tournaments' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
