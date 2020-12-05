module.exports.getChallenges = async(id, client) => {
    return await client.query(`
        SELECT UserChallenge.startdate, UserChallenge.enddate, Challenge.name, DifficultyLevel.score
        FROM UserChallenge
        INNER JOIN Challenge ON UserChallenge.challengeid = Challenge.id
        INNER JOIN DifficultyLevel ON DifficultyLevel.id = Challenge.difficultylevelid
        WHERE UserChallenge.userid = $1`, [id]
    );
};