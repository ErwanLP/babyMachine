<template>
    <div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th v-for="teamObject in teams" scope="col" :key="teamObject._id">{{teamObject.team.name}}</th>
                <th>J</th>
                <th>G</th>
                <th>P</th>
                <th>p</th>
                <th>c</th>
                <th>diff</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="teamObject1 in order(teams)" :key="teamObject1._id">
                <th scope="row">{{teamObject1.team.name}}</th>
                <td
                        v-for="teamObject2 in order(teams)" :key="teamObject2._id"
                        :class="{ 'case-disable': teamObject2 === teamObject1}"
                > {{teamObject2 !== teamObject1 ? getScore(teamObject1,teamObject2) : null}}</td>
                <td>{{getNumberOfMatchesPlayed(teamObject1)}}</td>
                <td>{{getNumberOfMatchesWon(teamObject1)}}</td>
                <td>{{getNumberOfMatchesLost(teamObject1)}}</td>
                <td>{{getNumberOfPointWonInMatches(teamObject1)}}</td>
                <td>{{getNumberOfPointLostInMatches(teamObject1)}}</td>
                <td>{{getNumberOfPointWonInMatches(teamObject1) - getNumberOfPointLostInMatches(teamObject1)}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import {
            getScoreOfMatchByTeam,
            findMatchInArrayByTeams,
            findMatchesInArrayByTeamWithContition,
            getNumberOfPointInMatches
    } from './../../../../sharedModules/services/MatchesService'

    export default {
        name: 'TournamentDashboard',
        props: ['teams', 'matches'],
        data () {
            return {}
        },
        created () {

        },
        methods: {
            order : function (array) {
                return array.slice().sort((a, b) => {
                    let diffWon = this.getNumberOfMatchesWon(a) - this.getNumberOfMatchesWon(b)
                    if (diffWon) {
                        return -diffWon
                    } else {
                        let diffPoint = (this.getNumberOfPointWonInMatches(a) - this.getNumberOfPointLostInMatches(a)) - (this.getNumberOfPointWonInMatches(b) - this.getNumberOfPointLostInMatches(b))
                        return -diffPoint
                    }
                })
            },
            getScore: function (teamObject1, teamObject2) {
                if (teamObject1.team._id !== teamObject2.team._id) {
                    let selectedMatch = findMatchInArrayByTeams(this.matches, teamObject1.team, teamObject2.team)
                    if (selectedMatch) {
                        return getScoreOfMatchByTeam(selectedMatch, teamObject1.team)
                    } else {
                        return 'NO MATCH'
                    }
                } else {
                    return null
                }
            },
            getNumberOfMatchesPlayed : function (teamObject) {
                return findMatchesInArrayByTeamWithContition(this.matches, teamObject.team, function (findTeamObject1) {
                    return findTeamObject1.score || findTeamObject1.score === 0
                }).length
            },
            getNumberOfMatchesWon : function (teamObject) {
                return findMatchesInArrayByTeamWithContition(this.matches, teamObject.team, function (findTeamObject1) {
                    return findTeamObject1.score === 10
                }).length
            },
            getNumberOfMatchesLost : function (teamObject) {
                return findMatchesInArrayByTeamWithContition(this.matches, teamObject.team, function (findTeamObject1) {
                    return (findTeamObject1.score || findTeamObject1.score === 0) && findTeamObject1.score !== 10
                }).length
            },
            getNumberOfPointWonInMatches : function (teamObject) {
                return getNumberOfPointInMatches(this.matches, teamObject.team, false)
            },
            getNumberOfPointLostInMatches : function (teamObject) {
                let filteredMatch = findMatchesInArrayByTeamWithContition(this.matches, teamObject.team, null)
                return getNumberOfPointInMatches(filteredMatch, teamObject.team, true)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .case-disable {
        background-color: lightgray;
    }
</style>
