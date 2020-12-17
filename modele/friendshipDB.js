module.exports.getFriendship = async(idUser1, idUser2, client) => {
    return await client.query(`
        SELECT iduser1, iduser2 FROM friendship
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

