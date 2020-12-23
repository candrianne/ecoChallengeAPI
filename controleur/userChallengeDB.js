const pool = require('../modele/database');
const UserChallengeModele = require('../modele/userChallengeDB');
const ChallengeModele = require('../modele/challengeDB');


/**
 * @swagger
 * components:
 *  schemas:
 *      UserChallenge:
 *          type: object
 *          properties:
 *              startdate:
 *                  type: string
 *                  format: date
 *              enddate:
 *                  type: string
 *                  format: date
 *              name:
 *                  description : le nom du challenge
 *                  type: string
 *              score:
 *                  description : le score de la difficulté du challenge
 *                  type: integer
 *              nbpausedays:
 *                  description : le nombre de jours de "pause" cumulés
 *                  type : integer
 */
module.exports.getAllUserChallenges = async(req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: challenges} = await UserChallengeModele.getAllChallenges(id, client);
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
/**
 * @swagger
 *  components:
 *      responses:
 *          UserChallengeUpdated:
 *              description: le challenge de l'utilisateur à été mis a jour
 *      requestBodies:
 *          UserChallengePauseOrUpdate:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              challengeId:
 *                                  type: integer
 *                              action:
 *                                  type: string
 *                                  enum:
 *                                      - resume
 *                                      - pause
 *
 */
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
                        await UserChallengeModele.resumeUserChallenge(userId, challengeId, client);
                        res.sendStatus(204);
                    } else {
                        await UserChallengeModele.pauseUserChallenge(userId, challengeId, client);
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
/**
 * @swagger
 *  components:
 *      responses:
 *          UserChallengeAdded:
 *              description: le userChallenge a été ajouté à la db
 *      requestBodies:
 *          UserChallengeUpdateOrDelete:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              challengeId:
 *                                  type: integer
 *                          required:
 *                              - challengeId
 */
module.exports.addUserChallenge = async(req, res) => {
    if(req.session) {
        const userId = req.session.id;
        const challengeId = req.body.challengeId;
        const client = await pool.connect();
        try {
            if (challengeId === undefined) {
                res.sendStatus(400);
            } else {
                if (!await ChallengeModele.challengeExists(client, challengeId)) {
                    res.status(404).json({error: "le challenge n'existe pas"});
                } else {
                    await UserChallengeModele.addUserChallenge(userId, challengeId, client);
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
                    await UserChallengeModele.deleteUserChallenge(userId, challengeId, client);
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

