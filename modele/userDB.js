const {getHash} = require("../utils/utils");

module.exports.createUser = async(client, firstName, lastName, email, password, birthYear) => {
    return await client.query(`
        INSERT INTO "User"(firstName, lastName, email, password, birthYear)
        VALUES ($1, $2, $3, $4, $5)`, [firstName, lastName, email, await getHash(password), birthYear]
    );
};

module.exports.getUser = async(email, client) => {
    return await client.query(`
        SELECT * FROM "User" WHERE "email" = $1`, [email]
    );
};