const {getHash} = require("../utils/utils");

module.exports.createUser = async(client, firstName, lastName, email, password, birthYear) => {
    return await client.query(`
        INSERT INTO "User"(firstName, lastName, email, password, birthYear)
        VALUES ($1, $2, $3, $4, $5)`, [firstName, lastName, email, await getHash(password), birthYear]
    );
};

module.exports.getUserById = async(id, client) => {
    return await client.query(`
        SELECT id, email, firstName, lastName, photo, birthYear 
        FROM "User" WHERE id = $1`, [id]
    );
};

module.exports.getUserByEmail = async(email, client) => {
    return await client.query(`
        SELECT id, email, firstName, lastName, photo, password, birthYear
        FROM "User" WHERE email = $1`, [email]
    );
};

module.exports.updateUser = async(client, id, firstName, lastName, email, photo, password, birthYear) => {
    const params = [];
    const querySet = [];
    let query = `UPDATE "User" SET `;

    if(firstName !== undefined) {
        params.push(firstName);
        querySet.push(`firstName = $${params.length}`);
    }
    if(lastName !== undefined) {
        params.push(lastName);
        querySet.push(`lastName = $${params.length}`);
    }
    if(email !== undefined) {
        params.push(email);
        querySet.push(`email = $${params.length}`);
    }
    if(photo !== undefined) {
        params.push(photo);
        querySet.push(`photo = $${params.length}`);
    }
    if(password !== undefined) {
        params.push(await getHash(password));
        querySet.push(`password = $${params.length}`);
    }
    if(birthYear !== undefined) {
        params.push(birthYear);
        querySet.push(`birthYear = $${params.length}`);
    }

    if(params.length > 0) {
        query += querySet.join(",");
        params.push(id);
        query += `WHERE id = $${params.length}`;

        return client.query(query, params);
    } else {
        throw new Error("No field to update");
    }
};

module.exports.getAllUsers = async(client) => {
    return await client.query(`
        SELECT id, email, firstName, lastName, photo, birthYear
        FROM "User";
    `);
};

module.exports.deleteUser = async(id, client) => {
    return await client.query(`
        DELETE FROM "User" WHERE id = $1`, [id]
    );
};