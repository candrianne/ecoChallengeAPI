const pool = require('../modele/database');
const FriendshipModele = require("../modele/friendshipDB");
const {friendRequestExists} = require("../modele/friendRequestDB");
const {deleteFriendRequest} = require("../modele/friendRequestDB");

module.exports.createFriendship = async(req, res) => {
    const {idUser1, idUser2} = req.body;

    if(!idUser1 || !idUser2) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const promises = [friendRequestExists(idUser1, idUser2, client), friendRequestExists(idUser2, idUser1, client)];
            const values = await Promise.all(promises);
            if(values[0] || values[1]) {
                if(values[0]) {
                    await deleteFriendRequest(idUser1, idUser2, client);
                } else {
                    await deleteFriendRequest(idUser2, idUser1, client);
                }
                await FriendshipModele.createFriendship(idUser1, idUser2, client);
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