module.exports.deleteAllUserFriendships = async(id, client) => {
    await client.query(`
        DELETE FROM Friendship
        WHERE idUser1 = $1 or idUser2= $1`, [id]
    );
};