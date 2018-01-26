<template >
  <div  class="container">
    <div class="row"><h2>User Edit</h2>
    </div>
    <div class="row">
      <form>
        <div class="form-group row">
          <label for="inputTrigram" class="col-sm-4 col-form-label">Trigram</label>
          <div class="col-sm-6">
            <input type="text" v-model="user.trigram"  class="form-control" id="inputTrigram" placeholder="Trigram">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail" class="col-sm-4 col-form-label">Email</label>
          <div class="col-sm-6">
            <input type="email" v-model="user.email" class="form-control" id="inputEmail" placeholder="Email">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputFirstName" class="col-sm-4 col-form-label">FirstName</label>
          <div class="col-sm-6">
            <input type="text" v-model="user.firstName" class="form-control" id="inputFirstName" placeholder="FirstName">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputLastName" class="col-sm-4 col-form-label">LastName</label>
          <div class="col-sm-6">
            <input type="text" v-model="user.lastName" class="form-control" id="inputLastName" placeholder="LastName">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-6">
            <input type="password" v-model="user.password" class="form-control" id="inputPassword" placeholder="Password">
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
  name: 'UserEdit',
  data () {
    return {
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
    if (this.$route.params) {
      var id = this.$route.params.id
    }
    if (id) {
      axios.get('/api/users/' + id)
              .then(response => {
                console.log(response)
                this.user = response.data
              })
              .catch(error => {
                console.log(error)
              })
    }
  },
  methods: {
    submit: function () {
      var url = '/api/users'
      if (this.user._id) {
        url += '/' + this.user._id
      }
      axios.post(url, this.user)
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
