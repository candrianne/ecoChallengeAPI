const pool = require('../modele/database');
const RoleDB = require('../modele/roleDB');
require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

module.exports.login = async(req, res) => {
    const {email, password} = req.body;
    if(email === undefined || password === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await RoleDB.getRole(client, email, password);
            const {userType, value} = result;
            if (userType === "inconnu") {
                res.sendStatus(404);
            } else if (userType === "admin") {
                const {id, login} = value;
                const payload = {status: userType, value: {id, login}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );  
                res.json({jwt : token});

            } else {
                const {id, email, firstname, lastname} = value;
                const payload = {status: userType, value: {id, email, firstname, lastname}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json({jwt :token});
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}
