module.exports.getAllUserFriendRequests = async(id, client) => {
    return await client.query(`
        SELECT FriendRequest.sender, FriendRequest.receiver, "User".photo, "User".firstname, "User".lastname
        FROM FriendRequest INNER JOIN "User"
        ON FriendRequest.sender = "User".id
        WHERE FriendRequest.receiver = $1`, [id]
    );
};

module.exports.deleteUserFriendRequests =  async(id, client) => {
    await client.query(`
        DELETE FROM friendRequest 
        WHERE sender = $1 OR receiver = $1`, [id]
    );
};

module.exports.createFriendRequest = async(senderId, receiverId, client) => {
    await client.query(`
        INSERT INTO friendRequest(sender, receiver)
        VALUES ($1, $2)`, [senderId, receiverId]
    );
};

module.exports.deleteFriendRequest = async(senderId, receiverId, client) => {
    await client.query(`
        DELETE FROM friendRequest
        WHERE sender = $1 and receiver = $2;`, [senderId, receiverId]
    );
};

module.exports.friendRequestExists = async(senderId, receiverId, client) => {
    const {rows} = await client.query(
        "SELECT count(*) AS nbr FROM friendRequest WHERE sender = $1 AND receiver = $2",
        [senderId, receiverId]
    );
    return rows[0].nbr > 0;
};

