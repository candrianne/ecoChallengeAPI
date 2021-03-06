const pool = require('../modele/database');
const UserDB = require('../modele/userDB');
const {deleteAllUserFriendships} = require('../modele/friendshipDB');
const {deleteUserFriendRequests} = require('../modele/friendRequestDB');
const {deleteUserChallengePropositions} = require('../modele/challengePropositionDB');
const {deleteUserChallengesByUserId} = require('../modele/userChallengeDB');

/**
 * @swagger
 *  components:
 *      responses:
 *          UserInscrit:
 *              description: l'utilisateur a été ajouté à la BD
 *      requestBodies:
 *          InscriptionUser:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              firstName:
 *                                      type: string
 *                              lastName:
 *                                      type: string
 *                              email:
 *                                      type: string
 *                                      format : email
 *                              password:
 *                                      type: string
 *                                      format: password
 *                              birthYear:
 *                                      type : integer
 *                          required:
 *                                  - firstName
 *                                  - lastName
 *                                  - email
 *                                  - password
 *                                  - birthYear
 *
 */
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

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              email:
 *                  type: string
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              photo:
 *                  type: string
 *              birthyear:
 *                  type: integer
 */

/**
 * @swagger
 * components:
 *  responses:
 *      UserFound:
 *           description: renvoie un utilisateur
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 */
module.exports.getUserById = async(req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);

    try {
        if(isNaN(id)) {
            res.sendStatus(400);
        } else {
            const {rows : users} = await UserDB.getUserById(id, client);
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

/**
 * @swagger
 * components:
 *  responses:
 *      UserFound:
 *           description: renvoie un utilisateur
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 */
module.exports.getAllUsers = async(req, res) => {
    const client = await pool.connect();

    try {
        const{rows : users} = await UserDB.getAllUsers(client);
        if(users !== undefined) {
            res.json(users);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

/**
 * @swagger
 *  components:
 *      responses:
 *          UserUpdated:
 *              description: l'utilisateur a été mis à jour
 *      requestBodies:
 *          UserAUpdate:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  format : email
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              photo:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                                  format: password
 */
module.exports.updateUser = async(req, res) => {
    if(req.session){
        const userObj = req.session;
        const toUpdate = req.body;
        const newData = {};
        let doUpdate = false;

        if(
            toUpdate.email !== undefined ||
            toUpdate.firstName !== undefined ||
            toUpdate.lastName !== undefined ||
            toUpdate.photo !== undefined ||
            toUpdate.password !== undefined ||
            toUpdate.birthYear !== undefined ||
            toUpdate.firebaseToken !== undefined
        ){
            doUpdate = true;
        }

        if(doUpdate){
            newData.email = toUpdate.email;
            newData.firstName = toUpdate.firstName;
            newData.lastName = toUpdate.lastName;
            newData.photo = toUpdate.photo;
            newData.password = toUpdate.password;
            newData.birthYear = toUpdate.birthYear;
            newData.fireBaseToken = toUpdate.firebaseToken;

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
                    newData.birthYear,
                    newData.fireBaseToken
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

//permet à un utilisateur de supprimer son propre compte, étant donné que son id est récupérer lors de l'identification
//pas besoin d'envoyer l'id via le body de la requête ou via l'url
module.exports.deleteUser = async(req, res) => {
    if(req.session) {
        const id = req.session.id;
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            await deleteAllUserFriendships(id, client);
            await deleteUserFriendRequests(id, client);
            await deleteUserChallengePropositions(id, client);
            await deleteUserChallengesByUserId(id, client);
            await UserDB.deleteUser(id, client);
            await client.query("COMMIT");
            res.sendStatus(204);
        } catch(e) {
            await client.query("ROLLBACK");
            console.log(e);
            res.sendStatus(500)
        }
    } else {
        res.sendStatus("401");
    }
}