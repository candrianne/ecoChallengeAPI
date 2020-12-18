const pool = require('../modele/database');
const RoleDB = require('../modele/roleDB');
require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *          required:
 *              - email
 *              - password
 */
module.exports.login = async(req, res) => {
    const {email, password} = req.body;
    if(email === undefined || password === undefined) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await RoleDB.getRole(client, email, password);
            const {userType, value} = result;
            if (userType === "inconnu") {
                res.sendStatus(404);
            } else if (userType === "admin") {
                const {id, email} = value;
                const payload = {status: userType, value: {id, email}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );  
                res.json({jwt : token});

            } else {
                const {id, email, firstName, lastName, photo} = value;
                const payload = {status: userType, value: {id, email, firstName, lastName, photo}};
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
