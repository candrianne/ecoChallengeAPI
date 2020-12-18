const pool = require('../modele/database');
const ChallengePropositionModele = require('../modele/challengePropositionDB');

module.exports.createChallengeProposition = async(req, res) => {
    if(req.session) {
        const userId = req.session.id;
        const {name, description, photo} = req.body;

        if(!name || !description || !photo || !userId) {
            res.sendStatus(400);
        } else {
            const client = await pool.connect();
            try {
                await ChallengePropositionModele.createChallengeProposition(client, name, description, photo, userId);
                res.sendStatus(201);
            } catch (e){
                console.log(e);
                res.sendStatus(500);
            } finally {
                client.release();
            }
        }
    } else {
        res.sendStatus(401);
    }
};

module.exports.getAllChallengePropositions = async(req, res) => {
    const client = await pool.connect();

    try {
        const{rows : propositions} = await ChallengePropositionModele.getAllChallengePropositions(client);
        if(propositions !== undefined) {
            res.json(propositions);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
};

module.exports.deleteChallengeProposition = async(req, res) => {
    const id = req.body.id;

    if(id === undefined) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const challengeExists = await ChallengePropositionModele.challengePropositionExists(client, id);
            if(challengeExists) {
                await ChallengePropositionModele.deleteChallengeProposition(id, client);
                res.sendStatus(204);
            } else {
                res.status(404).json({error : "challenge id n'existe pas"});
            }
        } catch (e){
            console.log(e);
            res.sendStatus(500)
        } finally {
            client.release();
        }
    }
};