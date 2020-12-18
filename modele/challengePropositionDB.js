module.exports.createChallengeProposition = async(client, name, description, photo, difficultyLevelId, userId) => {
    await client.query(`
        INSERT INTO challengeProposition(name, description, photo, difficultyLevelId, userId)
        VALUES ($1, $2, $3, $4, $5)`, [name, description, photo, difficultyLevelId, userId]
    );
};

module.exports.getAllChallengePropositions = async(client) => {
    return await client.query(`
        SELECT * from challengeProposition`, []
    );
};

module.exports.challengePropositionExists = async(client, id) => {
    const {rows} = await client.query(
        "SELECT count(id) AS nbr FROM challengeProposition WHERE id = $1", [id]
    );
    return rows[0].nbr > 0;
};

module.exports.deleteChallengeProposition = async (id, client) => {
    return await client.query(`
        DELETE FROM challengeProposition WHERE id = $1`, [id]
    );
};

module.exports.deleteUserChallengePropositions = async(id, client) => {
    await client.query(`
        DELETE FROM challengeProposition WHERE userId = $1`, [id]
    );
};

module.exports.getChallengePropositionIdByName = async(name, client) => {
    return await client.query(`
        SELECT id from challengeProposition WHERE name = $1`, [name]
    );
}