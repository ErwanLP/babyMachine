<template>
  <div class="form-row">
    <div class="form-group  col-md-6">
      <label for="selectPlayerOne">Joueur n°{{number}}</label>
      <select v-model="playerObject.player" class="form-control" id="selectPlayerOne">
        <option v-for="(user) in users" :key="user._id" :value="user">{{user.firstName}} {{user.lastName}}</option>
      </select>
    </div>
    <div class="form-group  col-md-6">
      <div class="form-check">
        <label class="form-check-label">
          <input disabled type="checkbox"  v-model="playerObject.isManager" class="form-check-input" :name="teamId">
          Manager
        </label>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'Player',
        props: ['playerObject', 'teamId', 'users', 'number'],
        data () {
            return {
            }
        },
        created () {

        },
      mounted () {
          if (this.number === 0) {
            this.playerObject.isManager = true
          }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
