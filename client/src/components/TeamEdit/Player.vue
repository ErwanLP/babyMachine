<template>
  <div>
    <div class="form-group">
      <label for="selectPlayerOne">Joueur </label>
      <select v-model="playerObject.player" class="form-control" id="selectPlayerOne">
        <option v-for="(user) in users" :key="user._id" :value="user">{{user.firstName}} {{user.lastName}}</option>
      </select>
    </div>
    <div class="form-group">
      <div class="form-check">
        <label class="form-check-label">
          <input type="checkbox"  v-model="playerObject.isManager" class="form-check-input" :name="teamId" value=true>
          Is manager
        </label>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'Player',
        props: ['playerObject', 'teamId', 'users'],
        data () {
            return {
            }
        },
        created () {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
