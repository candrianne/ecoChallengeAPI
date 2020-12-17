module.exports.getAllChallenges = async(client) => {
    return await client.query(`
        SELECT Challenge.id, Challenge.name, Challenge.description, Challenge.photo, DifficultyLevel.name as difficulty
        FROM Challenge
        INNER JOIN DifficultyLevel ON Challenge.difficultyLevelId = DifficultyLevel.id;`
    );
};

module.exports.getChallenge = async(id, client) => {
    return await client.query(`
        SELECT * FROM Challenge WHERE id = $1`, [id]
    );
};

module.exports.updateChallenge = async(client, id, name, description, photo, difficultyLevelId) => {
    const params = [];
    const querySet = [];
    let query = "UPDATE Challenge SET ";
    if(name !== undefined){
        params.push(name);
        querySet.push(` name = $${params.length} `);
    }
    if(description !== undefined){
        params.push(description);
        querySet.push(` description = $${params.length} `);
    }
    if(photo !== undefined){
        params.push(photo);
        querySet.push(` photo = $${params.length} `);
    }
    if(difficultyLevelId !== undefined){
        params.push(difficultyLevelId);
        querySet.push(` difficultyLevelId = $${params.length} `);
    }

    if(params.length > 0){
        query += querySet.join(',');
        params.push(id);
        query += ` WHERE id = $${params.length}`;

        return client.query(query, params);
    } else {
        throw new Error("No field to update");
    }
};

module.exports.deleteChallenge = async (id, client) =>{
    return await client.query(`
        DELETE FROM Challenge WHERE id = $1`, [id]
    );
};

module.exports.addChallenge = async(client, name, description, photo, difficultyLevelId) => {
    return await client.query(`
        INSERT INTO Challenge(name, description, photo, difficultylevelid)
        VALUES ($1, $2, $3, $4)`, [name, description, photo, difficultyLevelId]
    );
};

module.exports.challengeExists = async(client, id) => {
    const {rows} = await client.query(
        "SELECT count(id) AS nbr FROM Challenge WHERE id = $1",
        [id]
    );
    return rows[0].nbr > 0;
};