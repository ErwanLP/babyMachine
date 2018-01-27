<template>
  <div  class="container">
    <div class="row"><h2>Tounois</h2>

    </div>
    <div class="row">
      <table class="table">
        <thead>
        <tr>
          <th><a href="#/tournament/create">
            <button type="button" class="btn btn-outline btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> Add Tournament</button>
          </a></th>
          <th>Name</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(tournament, index) in tournaments"  :key="tournament._id">
          <th scope="row">#{{ index }}</th>
          <td>{{ tournament.name }}</td>
          <td></td>
          <td><a v-bind:href="'#/tournament/'+tournament._id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import axios from '@/utils/axios'

export default {
  name: 'Tournaments',
  data () {
    return {
      tournaments : []
    }
  },
  created () {
    axios.get('/api/tournaments')
      .then(response => {
        this.tournaments = response.data
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
