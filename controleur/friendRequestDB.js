const pool = require('../modele/database');
const FriendRequestModele = require("../modele/friendRequestDB");
const UserModele = require("../modele/userDB");


/**
 * @swagger
 *  components:
 *      responses:
 *          FriendRequestCreated:
 *              description: nouvelle demande d'ami ajoutée à la db
 *
 */
module.exports.createFriendRequest = async(req, res) => {
    if(req.session) {
        const senderId = req.session.id;
        const receiverId = req.body.receiverId;
        const client = await pool.connect();
        try {
            if (receiverId === undefined) {
                res.sendStatus(400);
            } else {
                if (!await UserModele.userExists(client, receiverId)) {
                    res.status(404).json({error: "l'utilisateur n'existe pas"});
                } else {
                    await FriendRequestModele.createFriendRequest(senderId, receiverId, client);
                    res.sendStatus(201);
                }
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
};

module.exports.deleteFriendRequest = async(req, res) => {
    if(req.session) {
        const senderId = req.session.id;
        const receiverId = req.body.receiverId;
        const client = await pool.connect();
        try {
            if(!receiverId) {
                res.sendStatus(400);
            } else {
                if(!await FriendRequestModele.friendRequestExists(senderId, receiverId, client)) {
                    res.status(404).json({error: "la demande d'ami n'existe pas"});
                } else {
                    await FriendRequestModele.deleteFriendRequest(senderId, receiverId, client);
                    res.sendStatus(204);
                }
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
};