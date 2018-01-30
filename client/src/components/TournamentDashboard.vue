<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Matches</h5>
                        <table class="table">
                            <tbody>
                            <tr  v-for="match in matches" :key="match._id">
                                <td>{{match.teams[0].team.name}}</td>
                                <td>{{match.teams[0].score}} - {{match.teams[1].score}}</td>
                                <td>{{match.teams[1].team.name}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Poule</h5>
                        <GroupsTable :teams="tournament.teams" :matches="matches" ></GroupsTable>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Phase Finale</h5>
                <Bracket :teams="tournament.teams" :matches="matches" ></Bracket>
            </div>
          </div>
        </div>
    </div>

</template>

<script>

    import axios from '@/utils/axios'
    // import router from '@/router'
    import GroupsTable from '@/components/TournamentDashboard/GroupsTable'
    import Bracket from '@/components/TournamentDashboard/Bracket'

    export default {
        name: 'TournamentDashboard',
        data () {
            return {
                tournament: {
                    id: null,
                    teams: []
                },
                matches : []
            }
        },
        components: {GroupsTable, Bracket},
        created () {
            if (this.$route.params) {
                var id = this.$route.params.id
            }
            if (id) {
                axios.get('/api/tournaments/' + id)
                        .then(response => {
                            this.tournament = response.data
                            axios.get('/api/matches/byTournamentId/' + this.tournament._id)
                                    .then(response => {
                                        this.matches = response.data
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                        })
                        .catch(error => {
                            console.log(error)
                        })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
