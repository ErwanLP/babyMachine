<template>
    <div>
        <div id="BracketContainer"></div>
    </div>
</template>

<script>

     import 'rebracket'

    export default {
        name: 'Bracket',
        props: ['teams', 'matches'],
        data () {
            return {
              isMounted : false,
              elementID : 'BracketContainer'
            }
        },
        watch: {
          teams: function (_new, _old) {
            this.isMounted && this.initBracket()
          },
          matches: function (_new, _old) {
            this.isMounted && this.initBracket()
          }
        },
        mounted () {
          this.isMounted = true
          this.initBracket()
        },
        methods : {
          initBracket : function () {
            document.getElementById(this.elementID).innerHTML = ''
            var size = 4
            while (size < this.teams.length) {
              size = size * 2
            }
            if (this.teams.length !== 0) {
              var competitorList = generateCompetitors(size, this.teams)
              var resultList = generateResults(size - 1)
              var bracket = window.Rebracket(document.getElementById(this.elementID), {
                format: 'single-elimination',
                size: size,
                competitors: competitorList,
                results: resultList,
                options: {
                  showMatchNumber: true,
                  showScores: true,
                  highlightWinner: true
                }
              })
            }

            console.log(bracket)

            function generateCompetitors (bracketSize, teamsObject) {
              var competitors = []
              for (let i = 0; i < bracketSize / 2; i++) {
                // PUSH FIRST
                  competitors.push({ name: teamsObject[i].team.name })
                // PUSH LAST
                if (teamsObject[bracketSize - i]) {
                  competitors.push({ name: teamsObject[bracketSize - i].team.name })
                } else {
                    competitors.push({ name: 'Rotaldo ' + i })
                }
              }
              return competitors
            }

            function generateResults (numberOfMatches) {
              var results = []
              for (var i = 0; i < numberOfMatches / 2; i++) {
                var winner = getRandomInt(1, 2)
                var score = []
                if (winner === 1) {
                  score[0] = 10
                  score[1] = 0
                } else {
                  score[0] = 0
                  score[1] = 10
                }
                results.push({
                  matchNumber: i,
                  winner: winner,
                  score: score
                })
              }
              return results
            }

            function getRandomInt (min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min
            }
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
