module.exports.getAllChallenges = async(id, client) => {
    return await client.query(`
        SELECT UserChallenge.startDate, UserChallenge.endDate, Challenge.name, DifficultyLevel.score
        FROM UserChallenge
        INNER JOIN Challenge ON UserChallenge.challengeId = Challenge.id
        INNER JOIN DifficultyLevel ON DifficultyLevel.id = Challenge.difficultyLevelId
        WHERE UserChallenge.userId = $1`, [id]
    );
};

module.exports.resumeUserChallenge = async(userId, challengeId, client) => {
    return await client.query(`
        UPDATE UserChallenge
        SET nbPauseDays = CURRENT_DATE - endDate,
        endDate = NULL
        WHERE challengeId = $1 AND userId = $2`, [challengeId, userId]
    );
}

module.exports.pauseUserChallenge = async(userId, challengeId, client) => {
    return await client.query(`
        UPDATE UserChallenge
        SET endDate = NULL
        WHERE challengeId = $1 AND userId = $2`, [challengeId, userId]
    );
}