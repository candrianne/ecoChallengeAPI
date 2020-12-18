const pool = require('../modele/database');
const ChallengeModele = require("../modele/challengeDB");
const UserChallengeModele = require("../modele/userChallengeDB");

/**
 *@swagger
 * components:
 *  schemas:
 *      ChallengeAdapted:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              photo:
 *                  type: string
 *              difficulty:
 *                  type: string
 *      Challenge:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              photo:
 *                  type: string
 *              difficultylevelid:
 *                  type: integer
 *      ChallengeUpdate:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              photo:
 *                  type: string
 *              difficultylevelid:
 *                  type: integer
 *      ChallengeCreate:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              photo:
 *                  type: string
 *              difficultylevelid:
 *                  type: integer
 *          required:
 *              - name
 *              - description
 *              - photo
 *              - difficultylevelid
 */
module.exports.getAllChallenges = async(req, res) => {
    const client = await pool.connect();

    try {
        const{rows : challenges} = await ChallengeModele.getAllChallenges(client);
        if(challenges !== undefined) {
            res.json(challenges);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
};

module.exports.updateChallenge = async(req, res) => {
    const toUpdate = req.body;
    const id = toUpdate.id;
    let newData = {};
    let doUpdate = false;

    if(
        (toUpdate.name !== undefined ||
        toUpdate.description !== undefined ||
        toUpdate.photo !== undefined ||
        toUpdate.difficultyLevelId !== undefined) &&
        !isNaN(id)
    ) {
        doUpdate = true;
    }

    if(doUpdate) {
        newData = {
            name : toUpdate.name,
            description : toUpdate.description,
            photo : toUpdate.photo,
            difficultyLevelId : toUpdate.difficultyLevelId
        };

        const client = await pool.connect();
        try {
            await ChallengeModele.updateChallenge(
                client,
                id,
                newData.name,
                newData.description,
                newData.photo,
                newData.difficultyLevelId
            );
            res.sendStatus(204);
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(400);
    }
};

module.exports.deleteChallenge = async (req,res) => {
    const id = req.body.id;

    if(id === undefined) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const challengeExists = await ChallengeModele.challengeExists(client, id);
            if(challengeExists) {
                await UserChallengeModele.deleteUserChallengesByChallengeId(id, client);
                await ChallengeModele.deleteChallenge(id, client);
                await client.query("COMMIT");
                res.sendStatus(204);
            } else {
                await client.query("ROLLBACK");
                res.status(404).json({error : "challenge id n'existe pas"});
            }
        } catch (e){
            await client.query("ROLLBACK");
            console.log(e);
            res.sendStatus(500)
        } finally {
            client.release();
        }
    }
}

module.exports.addChallenge = async (req,res) => {
    const {name, description, photo, difficultyLevelId} = req.body;

    if(!name || !description || !photo || !difficultyLevelId) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await ChallengeModele.addChallenge(client, name, description, photo, difficultyLevelId);
            res.sendStatus(201);
        } catch (e){
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.getChallenge = async(req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    const client = await pool.connect();

    try {
        if(isNaN(id)) {
            res.sendStatus(400);
        } else {
            const {rows : challenges} = await ChallengeModele.getChallenge(id, client);
            const challenge = challenges[0];
            if(challenge !== undefined) {
                res.json(challenge);
            } else {
                res.sendStatus(404);
            }
        }
    } catch(e) {
        res.json(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getChallengeIdByName = async(req, res) => {
    const name = req.params.name;
    const client = await pool.connect();

    try {
        const {rows : challenges} = await ChallengeModele.getChallengeIdByName(name, client);
        const challenge = challenges[0];
        if(challenge !== undefined) {
            res.json(challenge.id);
        } else {
            res.sendStatus(404);
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
};

