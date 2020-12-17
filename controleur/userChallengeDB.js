const pool = require('../modele/database');
const UserChallengeDB = require('../modele/userChallengeDB');
const UserChallengeModele = require('../modele/userChallengeDB');


module.exports.getAllUserChallenges = async(req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: challenges} = await UserChallengeDB.getAllChallenges(id, client);
            if(challenges !== undefined){
                res.json(challenges);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
};

module.exports.resumeOrPause = async(req, res)  => {
    if(req.session) {
        const userId = req.session.id;
        const challengeId = req.body.challengeId;
        const action = req.body.action;

        if(action && challengeId && (action === "resume" || action === "pause")) {
            const client = await pool.connect();
            if(await UserChallengeModele.userChallengeExists(client, userId, challengeId)) {
                try {
                    if(action === "resume") {
                        await UserChallengeDB.resumeUserChallenge(userId, challengeId, client);
                        res.sendStatus(204);
                    } else {
                        await UserChallengeDB.pauseUserChallenge(userId, challengeId, client);
                        res.sendStatus(204);
                    }
                } catch(e) {
                    console.log(e);
                    res.sendStatus(500);
                } finally {
                    client.release();
                }
            } else {
                res.status(404).json({error :"l'utilisateur ne participe pas à ce challenge"});
            }
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401)
    }
};

module.exports.addUserChallenge = async(req, res) => {
    if(req.session) {
        const userId = req.session.id;
        const challengeId = req.body.challengeId;
        const client = await pool.connect();
        try {
            if (challengeId === undefined) {
                res.sendStatus(400);
            } else {
                if (!await UserChallengeModele.userChallengeExists(client, userId, challengeId)) {
                    res.status(404).json({error: "l'utilisateur ne participe pas à ce challenge"});
                } else {
                    await UserChallengeDB.addUserChallenge(userId, challengeId, client);
                    res.sendStatus(201);
                }
            }
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
};

module.exports.deleteUserChallenge = async(req, res) => {
    if(req.session) {
        const userId = req.session.id;
        const challengeId = req.body.challengeId;
        const client = await pool.connect();
        try {
            if(challengeId === undefined) {
                res.sendStatus(400);
            } else {
                if(!await UserChallengeModele.userChallengeExists(client, userId, challengeId)) {
                    res.status(404).json({error: "l'utilisateur ne participe pas à ce challenge"});
                } else {
                    await UserChallengeDB.deleteUserChallenge(userId, challengeId, client);
                    res.sendStatus(204);
                }
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
};

