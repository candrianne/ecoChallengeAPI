const pool = require('../modele/database');
const ChallengeModele = require("../modele/challengeDB");


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
}