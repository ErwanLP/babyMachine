<template >
  <div  class="container">
      <div class="card center-card">
        <div class="card-body">
          <h5 class="card-title">Edition d'un utilisateur</h5>
          <hr>
          <form>
            <div class="form-group">
              <label for="inputTrigram">Trigrame</label>
              <input type="text" v-model="user.trigram" class="form-control" id="inputTrigram">
            </div>
            <div class="form-group">
              <label for="inputEmail">Email</label>
              <input type="text" v-model="user.email" class="form-control" id="inputEmail">
            </div>
            <div class="form-group">
              <label for="inputFirstName">Prénom</label>
              <input type="text" v-model="user.firstName" class="form-control" id="inputFirstName">
            </div>
            <div class="form-group">
              <label for="inputLastName">Nom</label>
              <input type="text" v-model="user.lastName" class="form-control" id="inputLastName">
            </div>
            <div class="form-group">
              <label for="inputPassword">Mot de passe</label>
              <input type="password" v-model="user.lastName" class="form-control" id="inputPassword">
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
                <button v-on:click="saveUser()" class="btn btn-primary">Sauvegarder</button>
              </div>
            </div>
            <div class="center-button" v-if="displayDeleteButton">
              <div class=" alert alert-danger" role="alert">
                 <button v-on:click="deleteUser()" type="button" class="btn btn-danger">Confirmer la suppression</button>
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
  name: 'UserEdit',
  data () {
    return {
      displayDeleteButton : false,
      user : {
        id : null,
        trigram : null,
        email : null,
        firstName : null,
        lastName : null,
        password : null
      }
    }
  },
  created () {
    let id
    if (this.$route.params) {
      id = this.$route.params.id
    }
    if (id) {
      axios.get('/api/users/' + id)
              .then(response => {
                this.user = response.data
              })
              .catch(error => {
                console.error(error)
              })
    }
  },
  methods: {
    saveUser: function () {
      let url = '/api/users'
      if (this.user._id) {
        url += '/' + this.user._id
      }
      axios.post(url, this.user)
              .then(response => {
                router.push({ path: '/users' })
              })
              .catch(error => {
                console.error(error)
              })
    },
    deleteUser: function () {
      if (this.user._id) {
        let url = '/api/users/' + this.user._id
        axios.delete(url)
          .then(response => {
            router.push({ path: '/users' })
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        router.push({ path: '/users' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
