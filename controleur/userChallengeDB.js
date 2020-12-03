const pool = require('../modele/database');
const ChallengeDB = require('../modele/challengeDB');
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
            const {rows: challenges} = await ChallengeDB.getChallenges(id, client);
            const challenge = challenges[0];
            if(challenge !== undefined){
                res.json(challenge);
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