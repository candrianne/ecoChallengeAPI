const pool = require('../modele/database');
const UserDB = require('../modele/userDB');


module.exports.inscriptionUser = async(req, res) => {
    const {firstName, lastName, email, password, birthYear} = req.body;

    if(!firstName || !lastName || !email || !password || !birthYear) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await UserDB.createUser(client, firstName, lastName, email, password, birthYear);
            res.sendStatus(201);
        } catch(e) {
            res.status(500).send(e);
        } finally {
            client.release();
        }
    }
};

module.exports.getUser = async(req, res) => {
    const client = await pool.connect();
    const email = req.query.email;

    try {
        if(isNaN(id)) {
            res.sendStatus(400);
        } else {
            const {rows : users} = await UserDB.getUser(email, client);
            console.log(users[0]);
            const user = users[0];
            if(user !== undefined) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }
    } catch(e) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
};