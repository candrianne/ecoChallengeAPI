module.exports.getAllChallenges = async(client) => {
    return await client.query(`
        SELECT Challenge.id, Challenge.name, Challenge.description, Challenge.photo, DifficultyLevel.name as difficulty
        FROM Challenge
        INNER JOIN DifficultyLevel ON Challenge.difficultylevelid = DifficultyLevel.id;`
    );
};