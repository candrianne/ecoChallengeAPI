const {getUser} = require('./userDB');
const {getAdmin} = require('./adminDB');
const {compareHash} = require('../utils/utils');

module.exports.getRole = async (client, email, password) => {
    const promises = [];
    const promiseUser = getUser(email, client);
    const promiseManager = getAdmin(email, client);
    promises.push(promiseUser, promiseManager);
    const values = await Promise.all(promises);
    const userRow = values[0].rows[0];
    const adminRow = values[1].rows[0];

    if(userRow !== undefined && await compareHash(password, userRow.password)) {
        return {userType: "user", value: userRow};
    } else if (adminRow !== undefined && await compareHash(password, adminRow.password)) {
        return {userType: "admin", value: adminRow};
    } else {
        return {userType: "inconnu", value: null}
    }
};
