<template>
  <div  class="container">
    <div class="card center-card">
      <div class="card-body">
        <h5 class="card-title">Liste des utilisateurs</h5>
        <hr>
        <table class="table">
          <thead>
          <tr>
            <th><a href="#/user/create">
              <button type="button" class="btn btn-outline btn-sm">
                <i class="fa fa-plus" aria-hidden="true"></i></button></a></th>
            <th>Trigrame</th>
            <th>Nom</th>
            <th>Edition</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in users"  :key="user._id">
            <th scope="row">#{{ index }}</th>
            <td>{{ user.trigram }}</td>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td><a v-bind:href="'#/user/'+user._id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
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
  name: 'Users',
  data () {
    return {
       users : []
    }
  },
  created () {
    axios.get('/api/users')
      .then(response => {
        this.users = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
