<template>
  <div  class="container">
    <div class="row"><h2>Tournament Edit</h2>
    </div>
    <div class="row">
      <form>
        <div class="form-group row">
          <label for="inputName" class="col-sm-12 col-form-label">Name</label>
          <div class="col-sm-12">
            <input type="text" v-model="tournament.name"  class="form-control" id="inputName" placeholder="Name">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputStartDate" class="col-sm-12 col-form-label">StartDate</label>
          <div class="col-sm-12">
            <input type="date" v-model="tournament.startDate" class="form-control" id="inputStartDate" placeholder="StartDate">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <button v-on:click="submit()" class="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import axios from '@/utils/axios'

export default {
  name: 'TournamentEdit',
  data () {
    return {
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
          console.log(response)
          this.tournament = response.data
          this.tournament.startDate = this.dateToShortISOString(response.data.startDate)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  methods: {
    submit: function () {
      let url = '/api/tournaments'
      if (this.tournament._id) {
        url += '/' + this.tournament._id
      }
      axios.post(url, this.tournament)
        .then(function (response) {
          console.log(response)
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
