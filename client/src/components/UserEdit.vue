<template >
  <div  class="container">
      <div class="center-card"
           v-bind:class="{ 'card': isCard() }"
      >
        <div class="card-body">
          <h5 v-if="displayTitle()" class="card-title">Edition d'un utilisateur</h5>
          <hr>
          <form>
            <div class="form-group">
              <label for="inputTrigram">Trigrame</label>
              <input type="text" v-model="user.trigram"
                     v-bind:class="{  'is-invalid': !user.trigram }"
                     class="form-control" id="inputTrigram">
              <div class="invalid-feedback">
                Obligatoire
              </div>
            </div>
            <div class="form-group">
              <label for="inputEmail">Email</label>
              <input type="text" v-model="user.email"
                     class="form-control"
                     v-bind:class="{  'is-invalid': !user.email }"
                     id="inputEmail">
              <div class="invalid-feedback">
                Obligatoire
              </div>
            </div>
            <div class="form-group">
              <label for="inputFirstName">Prénom</label>
              <input type="text" v-model="user.firstName"
                     class="form-control"
                     v-bind:class="{  'is-invalid': !user.firstName }"
                     id="inputFirstName">
              <div class="invalid-feedback">
                Obligatoire
              </div>
            </div>
            <div class="form-group">
              <label for="inputLastName">Nom</label>
              <input type="text" v-model="user.lastName"
                     class="form-control"
                     v-bind:class="{  'is-invalid': !user.lastName }"
                     id="inputLastName">
              <div class="invalid-feedback">
                Obligatoire
              </div>
            </div>
            <div class="form-group" v-if="!user._id">
              <label for="inputPassword">Mot de passe</label>
              <input type="password"
                     v-model="user.password"
                     v-bind:class="{  'is-invalid': !user.password }"
                     class="form-control" id="inputPassword">
              <div class="invalid-feedback">
                Obligatoire
              </div>
            </div>
            <div v-if="displayRole()" class="form-group">
              <label for="selectPlayerOne">Role</label>
              <select v-model="user.role" class="form-control" id="selectPlayerOne">
                <option v-for="(role) in roles" :key="role" :value="role">{{role}}</option>
              </select>
            </div>
            <hr>
            <div class="form-group row"  style="text-align: center">
              <div class="col-sm-4" v-if="displayCancelButton()">
                <a href="#/users"><button type="button" class="btn btn-secondary">Annuler</button></a>
              </div>
              <div class="col-sm-4"  v-if="user._id">
                <button v-on:click="displayDeleteButton = !displayDeleteButton" type="button" class="btn btn-danger">Supprimer</button>
              </div>
              <div class="col-sm-4" v-if="displaySaveButton()">
                <button v-on:click="saveUser()" class="btn btn-primary">Sauvegarder</button>
              </div>
              <div class="col-sm-4" v-if="displayInscriptionButton()">
                <button v-on:click="signIn()" class="btn btn-primary">Inscription</button>
              </div>
            </div>
            <div class="form-group row"  style="text-align: center"  v-if="user._id">
              <div class="col-sm-4">
                <button  v-on:click="displayChangePasswordButton = !displayChangePasswordButton" type="button" class="btn btn-info">Change mot de passe</button>
              </div>
            </div>
            <div class="center-button" v-if="displayDeleteButton">
              <div class=" alert alert-danger" role="alert">
                 <button v-on:click="deleteUser()" type="button" class="btn btn-danger">Confirmer la suppression</button>
              </div>
            </div>
            <div class="center-button" v-if="displayChangePasswordButton">
              <div class=" alert alert-info" role="alert" style="text-align: center">
                  <input type="password" v-model="newPassword" class="form-control" id="inputNewPassword">
                  <button v-on:click="changePassword(newPassword)" type="button" class="btn btn-info">Confirmer</button>
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
import {
        isUserValid
} from './../../../sharedModules/services/UsersService'

export default {
  name: 'UserEdit',
  props: ['loginState'],
  data () {
    return {
      displayDeleteButton : false,
      displayChangePasswordButton : false,
      newPassword : undefined,
      roles : ['ADMIN', 'USER'],
      user : {
        _id : null,
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
        if (isUserValid(this.user)) {
            let url = '/api/users'
            if (this.user._id) {
                url += '/' + this.user._id
            }
            axios.post(url, this.user)
                    .then(response => {
                router.push({path: '/users'})
        })
        .catch(error => {
                console.error(error)
        })
        } else {
          console.error('user is not valid')
        }
    },
    signIn: function () {
        if (isUserValid(this.user)) {
            let url = '/api/users'
            if (this.user._id) {
                url += '/' + this.user._id
            }
            axios.post(url, this.user)
                    .then(response => {
        })
        .catch(error => {
                console.error(error)
        })
        } else {
          console.error('user is not valid')
        }
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
    },
    changePassword: function (newPassword) {
      if (this.user._id) {
        let url = '/api/users/' + this.user._id + '/changePassword'
        axios.post(url, {password : newPassword})
          .then(response => {
            router.push({ path: '/users' })
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        router.push({ path: '/users' })
      }
    },
    displayTitle: function () {
      return !this.loginState
    },
    isCard: function () {
      return !this.loginState
    },
    displayCancelButton: function () {
      return !this.loginState
    },
    displaySaveButton: function () {
      return !this.loginState
    },
    displayRole: function () {
      return !this.loginState
    },
    displayInscriptionButton: function () {
      return this.loginState
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
