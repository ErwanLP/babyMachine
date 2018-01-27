<template>
    <div class="container">
        <div class="row"><h2>Team Edit</h2>
        </div>
        <div class="row">
            <form>
                <div class="form-group row">
                    <label for="inputTrigram" class="col-sm-4 col-form-label">Name</label>
                    <div class="col-sm-6">
                        <input type="text" v-model="team.name" class="form-control" id="inputTrigram"
                               placeholder="Name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputTrigram" class="col-sm-4 col-form-label">Number in team</label>
                    <div class="col-sm-6">
                        <input type="number" v-model="team.number" class="form-control" id="inputNumber" number
                               disabled>
                    </div>
                </div>
                <Player v-for="(playerObject, i) in team.players" :key="i" :player-object="playerObject" :team-id="team.id || 'newTeam'" :users="users"></Player>
                -----------------
                Team Player : {{team.players}}
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
    import Player from '@/components/TeamEdit/Player'

    export default {
        name: 'TeamEdit',
        data () {
            return {
                users: [],
                team: {
                    name: null,
                    number: 2,
                    players: []
                }
            }
        },
        components: {Player},
        created () {
            axios.get('/api/users/')
                    .then(response => {
                        this.users = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            for (let i = 0; i < this.team.number; i++) {
                this.team.players.push({
                    player : {},
                    isManager : false
                })
            }
          if (this.$route.params) {
            var id = this.$route.params.id
          }
          if (id) {
            axios.get('/api/teams/' + id)
              .then(response => {
                console.log(response)
                this.team = response.data
              })
              .catch(error => {
                console.log(error)
              })
          }
        },
        methods: {
            submit: function () {
                let url = '/api/teams'
                if (this.team._id) {
                    url += '/' + this.team._id
                }
                axios.post(url, this.team)
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
