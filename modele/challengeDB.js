module.exports.getAllChallenges = async(client) => {
    return await client.query(`
        SELECT Challenge.id, Challenge.name, Challenge.description, DifficultyLevel.name, Challenge.photo
        FROM Challenge
        INNER JOIN DifficultyLevel ON Challenge.difficultylevelid = DifficultyLevel.id;`
    );
};