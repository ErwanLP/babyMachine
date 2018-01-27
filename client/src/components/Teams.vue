<template>
  <div  class="container">
    <div class="row"><h2>Team</h2>

    </div>
    <div class="row">
      <table class="table">
        <thead>
        <tr>
          <th><a href="#/team/create"><button type="button" class="btn btn-outline btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> Add Team</button></a></th>
          <th>Name</th>
          <th>Joueurs</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(team, index) in teams"  :key="team._id">
          <th scope="row">#{{ index }}</th>
          <td>{{ team.name }}</td>
          <td>{{ getPlayersTrigram(team.players) }}</td>
          <td></td>
          <td><a v-bind:href="'#/team/'+team._id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import axios from '@/utils/axios'

export default {
  name: 'Teams',
  data () {
    return {
      teams : []
    }
  },
  created () {
    axios.get('/api/teams')
      .then(response => {
        this.teams = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getPlayersTrigram: function (players) {
      let trigrams = ''
      players.forEach(playerObject => {
        trigrams += playerObject.player.trigram + ' - '
      })
      return trigrams
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
