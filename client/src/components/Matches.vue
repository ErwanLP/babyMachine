<template>
  <div  class="container">
    <div class="card center-card">
      <div class="card-body">
        <h5 class="card-title">Liste des matches</h5>
        <hr>
        <table class="table">
          <thead>
          <tr>
            <th><a href="#/match/create">
              <button type="button" class="btn btn-outline btn-sm">
                <i class="fa fa-plus" aria-hidden="true"></i></button></a></th>
            <th>Nom</th>
            <th>Edition</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(match, index) in matches"  :key="match._id">
            <th scope="row">#{{ index }}</th>
            <td>{{ match.name }}</td>
            <td><a v-bind:href="'#/match/'+match._id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
          </tr>
          </tbody>
        </table>
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
      matches : [],
      teams : []
    }
  },
  created () {
    // GET TOURNAMENT
    axios.get('/api/matches')
      .then(response => {
        this.matches = response.data
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
