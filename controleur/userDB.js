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
    const email = req.params.email;

    try {
        if(!email.includes("@")) {
            res.sendStatus(400);
        } else {
            const {rows : users} = await UserDB.getUser(email, client);
            const user = users[0];
            if(user !== undefined) {
                res.json(user);
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
};

module.exports.updateUser = async(req, res) => {
    if(req.session){
        const userObj = req.session;
        const toUpdate = req.body;
        const newData = {};
        let doUpdate = false;

        if(
            toUpdate.email !== undefined ||
            toUpdate.firstname !== undefined ||
            toUpdate.lastname !== undefined ||
            toUpdate.photo !== undefined ||
            toUpdate.password !== undefined ||
            toUpdate.birthyear !== undefined
        ){
            doUpdate = true;
        }

        if(doUpdate){
            newData.email = toUpdate.email;
            newData.firstName = toUpdate.firstname;
            newData.lastName = toUpdate.lastname;
            newData.photo = toUpdate.photo;
            newData.password = toUpdate.password;
            newData.birthYear = toUpdate.birthyear;

            const client = await pool.connect();
            try{
                await UserDB.updateUser(
                    client,
                    userObj.id,
                    newData.firstName,
                    newData.lastName,
                    newData.email,
                    newData.photo,
                    newData.password,
                    newData.birthYear
                );
                res.sendStatus(204);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            } finally {
                client.release();
            }
        } else {
            res.sendStatus(400);
        }

    } else {
        res.sendStatus(401);
    }
};