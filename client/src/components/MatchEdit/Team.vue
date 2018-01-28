<template>
  <div class="form-row">
    <div class="form-group  col-md-6">
      <label for="selectPlayerOne">Equipe n°{{number}}</label>
      <select v-model="teamObject.team" class="form-control" id="selectPlayerOne">
        <option v-for="(currentTeam) in teams" :key="currentTeam._id" :value="currentTeam">{{currentTeam.name}}</option>
      </select>
    </div>
    <div class="form-group  col-md-6">
      <div class="form-check">
        <label for="inputScore">Score</label>
        <input type="number" v-model="teamObject.score" class="form-control-plaintext" id="inputScore">
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'Team',
        props: ['teamObject', 'teams', 'number'],
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
