module.exports.getAllChallenges = async(id, client) => {
    return await client.query(`
        SELECT UserChallenge.startDate, UserChallenge.endDate, Challenge.name, DifficultyLevel.score, UserChallenge.nbPauseDays
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
};

module.exports.pauseUserChallenge = async(userId, challengeId, client) => {
    return await client.query(`
        UPDATE UserChallenge
        SET endDate = CURRENT_DATE
        WHERE challengeId = $1 AND userId = $2`, [challengeId, userId]
    );
};

module.exports.deleteUserChallengesByChallengeId = async(challengeId, client) => {
    return await client.query(`
        DELETE FROM UserChallenge
        WHERE challengeId = $1`, [challengeId]
    );
};

module.exports.deleteUserChallengesByUserId = async(userId, client) => {
    return await client.query(`
        DELETE FROM UserChallenge
        WHERE userId = $1`, [userId]
    );
};

module.exports.addUserChallenge = async(userId, challengeId, client) => {
    return await client.query(`
        INSERT INTO userChallenge(startDate, userId, challengeId)
        VALUES (CURRENT_DATE, $1, $2)`, [userId, challengeId]
    );
};

module.exports.deleteUserChallenge = async(userId, challengeId, client) => {
    return await client.query(`
        DELETE FROM userChallenge
        WHERE userId = $1 AND challengeId = $2`, [userId, challengeId]
    );
};

module.exports.userChallengeExists = async(client, userId, challengeId) => {
    const {rows} = await client.query(
        "SELECT count(*) AS nbr from userChallenge WHERE userId = $1 and challengeId = $2",
        [userId, challengeId]
    );
    return rows[0].nbr > 0;
};