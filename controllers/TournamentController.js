let TournamentsService = require('../services/TournamentsService');
let MatchesService = require('../services/MatchesService');

module.exports.generateMatches = function (id, data) {
    return TournamentsService.findOne(id).then(
        tournament => {
            let matchesToCreate = [];
            for (let i = 0; i < tournament.teams.length; i++) {
                for (let j = i + 1; j < tournament.teams.length; j++) {
                    matchesToCreate.push({
                        teams: [
                            {
                                team : tournament.teams[i].team,
                            },
                            {
                                team :tournament.teams[j].team
                            }

                        ],
                        tournament : tournament,
                        numberOfTeam : 2
                    })
                }
            }
            let savePromises = [];
            matchesToCreate.forEach( matchToCreate => {
                savePromises.push(MatchesService.create(matchToCreate))
            });
            return Promise.all(matchesToCreate);
        }
    )
};