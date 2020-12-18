module.exports.getFriendship = async(idUser1, idUser2, client) => {
    return await client.query(`
        SELECT idUser1, idUser2 FROM friendship
        WHERE (idUser1 = $1 and idUser2 = $2) OR (idUser1 = $2 and idUser2 = $1)`, [idUser1, idUser2]
    );
};

module.exports.createFriendship = async(idUser1, idUser2, client) => {
    await client.query(`
        INSERT INTO friendship(idUser1, idUser2)
        VALUES ($1, $2)`, [idUser1, idUser2]
    );
};

module.exports.deleteAllUserFriendships = async(id, client) => {
    await client.query(`
        DELETE FROM Friendship
        WHERE idUser1 = $1 or idUser2= $1`, [id]
    );
};

module.exports.getAllUserFriendships = async(id, client) => {
    return await client.query(`
        SELECT * FROM friendship
        WHERE idUser1 = $1 OR idUser2 = $1`, [id]
    );
};

module.exports.deleteFriendship = async(idUser1, idUser2, client) => {
    await client.query(`
        DELETE FROM friendship
        WHERE (idUser1 = $1 and idUser2 = $2) OR (idUser1 = $2 and idUser2 = $1)`, [idUser1, idUser2]
    );
};

module.exports.friendshipExists = async(idUser1, idUser2, client) => {
    const {rows} = await client.query(
        "SELECT count(*) AS nbr from friendship WHERE (idUser1 = $1 and idUser2 = $2)" +
        " OR (idUser1 = $2 and idUser2 = $1)", [idUser1, idUser2]
    );
    return rows[0].nbr > 0;
};

