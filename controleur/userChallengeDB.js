const pool = require('../modele/database');
const UserChallengeDB = require('../modele/userChallengeDB');
require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');


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
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
};

module.exports.resumeOrPause = async(req, res)  => {
    if(req.session) {
        const userId = req.session.id;
        const challengeId = parseInt(req.body.challengeId);
        const action = req.body.action;

        if(action && challengeId && (action === "resume" || action === "pause")) {
            const client = await pool.connect();
            try {
                if(action === "resume") {
                    await UserChallengeDB.resumeUserChallenge(userId, challengeId, client);
                    res.sendStatus(204);
                } else {
                    await UserChallengeDB.pauseUserChallenge(userId, challengeId, client);
                }
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            } finally {
                client.release();
            }
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401)
    }
}