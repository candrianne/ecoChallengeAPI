module.exports.getAllChallenges = async(id, client) => {
    return await client.query(`
        SELECT UserChallenge.startdate, UserChallenge.enddate, Challenge.name, DifficultyLevel.score
        FROM UserChallenge
        INNER JOIN Challenge ON UserChallenge.challengeid = Challenge.id
        INNER JOIN DifficultyLevel ON DifficultyLevel.id = Challenge.difficultylevelid
        WHERE UserChallenge.userid = $1`, [id]
    );
};

module.exports.resumeUserChallenge = async(userId, challengeId, client) => {
    return await client.query(`
        UPDATE UserChallenge
        SET pausedate = enddate,
        enddate = NULL
        WHERE challengeid = $1 AND userid = $2`, [challengeId, userId]
    );
}

module.exports.pauseUserChallenge = async(userId, challengeId, client) => {
    return await client.query(`
        UPDATE UserChallenge
        SET enddate = NULL
        WHERE challengeid = $1 AND userid = $2`, [challengeId, userId]
    );
}