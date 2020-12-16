const pool = require('../modele/database');
const ChallengeModele = require("../modele/challengeDB");
const UserChallengeModele = require("../modele/userChallengeDB");

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
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    const toUpdate = req.body;
    let newData = {};
    let doUpdate = false;

    if(
        toUpdate.name !== undefined ||
        toUpdate.description !== undefined ||
        toUpdate.photo !== undefined ||
        toUpdate.difficultyLevelId !== undefined
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
        res.sendStatus("400")
    }
};

module.exports.deleteChallenge = async (req,res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    const client = await pool.connect();

    try {
        await UserChallengeModele.deleteUserChallengesByChallengeId(id, client);
        await ChallengeModele.deleteChallenge(id, client);
        res.sendStatus(204);
    } catch (e){
        console.log(e);
        res.sendStatus(500)
    } finally {
        client.release();
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
};

