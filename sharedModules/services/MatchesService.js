function getScoreOfMatchByTeam(match, team) {
    "use strict";
    let selectedTeamObject
    match.teams.forEach(currentTeamObject => {
        if (currentTeamObject.team._id === team._id) {
            selectedTeamObject = currentTeamObject
        }
    })
    return selectedTeamObject.score;
}
function findMatchInArrayByTeams(matches, team1, team2) {
    "use strict";
    let selectedMatch, findTeamObject1, findTeamObject2
    matches.forEach(currentMatch => {
        findTeamObject1 = false
        findTeamObject2 = false
        currentMatch.teams.forEach(currentTeamObject => {
            if (team1._id === currentTeamObject.team._id) {
                findTeamObject1 = true
            }
            if (team2._id === currentTeamObject.team._id) {
                findTeamObject2 = true
            }
        })
        if (findTeamObject1 && findTeamObject2) {
            selectedMatch = currentMatch
        }
    })
    return selectedMatch;
}
function findMatchesInArrayByTeamWithContition(matches, team, fn) {
    "use strict";
    let selectedMatches = [], findTeamObject1, findTeamObject2
    matches.forEach(currentMatch => {
        findTeamObject1 = false
        currentMatch.teams.forEach(currentTeamObject => {
            if (team._id === currentTeamObject.team._id) {
                if (!fn || (fn && fn(currentTeamObject))) {
                    findTeamObject1 = true
                }
            }
        })
        if (findTeamObject1) {
            selectedMatches.push(currentMatch);
        }
    })
    return selectedMatches;
}
function getNumberOfPointInMatches(matches, team, reverse) {
    "use strict";
    let pointCounter = 0, findTeamObject1, findTeamObject2
    matches.forEach(currentMatch => {
        findTeamObject1 = false
        currentMatch.teams.forEach(currentTeamObject => {
            if (team._id === currentTeamObject.team._id) {
                if (!reverse && currentTeamObject.score) {
                    pointCounter += currentTeamObject.score;
                }
            } else {
                if (reverse && currentTeamObject.score) {
                    pointCounter += currentTeamObject.score;
                }
            }
        })
    })
    return pointCounter;
}

export {
    getScoreOfMatchByTeam,
    findMatchInArrayByTeams,
    findMatchesInArrayByTeamWithContition,
    getNumberOfPointInMatches
}
