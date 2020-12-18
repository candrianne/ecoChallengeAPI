const pool = require('../modele/database');
const FriendshipModele = require("../modele/friendshipDB");
const {friendRequestExists} = require("../modele/friendRequestDB");
const {deleteFriendRequest} = require("../modele/friendRequestDB");



module.exports.createFriendship = async(req, res) => {
    const idUser = req.session.id;
    const idNewFriend = req.body.idNewFriend;

    if(!idUser || !idNewFriend) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            if(await friendRequestExists(idNewFriend, idUser, client)) {
                await deleteFriendRequest(idNewFriend, idUser, client);
                await FriendshipModele.createFriendship(idUser, idNewFriend, client);
                await client.query("COMMIT");
                res.sendStatus(201);
            } else {
                await client.query("ROLLBACK");
                res.status(404).json({error: "la demande d'ami n'a pas été envoyée"});
            }
        } catch (e) {
            await client.query("ROLLBACK");
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.createFriendship = async(req, res) => {
    const idUser = req.session.id;
    const idNewFriend = req.body.idNewFriend;

    if(!idUser || !idNewFriend) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const promises = [friendRequestExists(idUser, idNewFriend, client), friendRequestExists(idNewFriend, idUser, client)];
            const values = await Promise.all(promises);
            if(values[0] || values[1]) {
                if(values[0]) {
                    await deleteFriendRequest(idUser, idNewFriend, client);
                } else {
                    await deleteFriendRequest(idNewFriend, idUser, client);
                }
                await FriendshipModele.createFriendship(idUser, idNewFriend, client);
                await client.query("COMMIT");
                res.sendStatus(201);
            } else {
                await client.query("ROLLBACK");
                res.status(404).json({error: "la demande d'ami n'a pas été envoyée"});
            }
        } catch (e) {
            await client.query("ROLLBACK");
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.getFriendship = async(req, res) => {
    const {idUser1, idUser2} = req.query;

    if(!idUser1 || !idUser2) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const {rows : friendships} = await FriendshipModele.getFriendship(idUser1, idUser2, client);
            const friendship = friendships[0];
            if(friendship !== undefined) {
                res.json(friendship);
            } else {
                res.sendStatus(404);
            }
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}


module.exports.getAllUserFriendships = async(req, res) => {
    if(req.session) {
        const id = req.session.id;
        const client = await pool.connect();
        try {
            const {rows : friendships} = await FriendshipModele.getAllUserFriendships(id, client);
            if(friendships.length > 0) {
                res.json(friendships);
            } else {
                res.sendStatus(404);
            }
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}

module.exports.deleteFriendship = async(req, res) => {
    if(req.session) {
        const id = req.session.id;
        const idFriend = req.body.idFriend;
        if(idFriend) {
            const client = await pool.connect();
            try {
                if(await FriendshipModele.friendshipExists(id, idFriend, client)) {
                    await FriendshipModele.deleteFriendship(id, idFriend, client);
                    res.sendStatus(204);
                } else {
                    res.sendStatus(404);
                }
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            } finally {
                client.release();
            }
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }
}