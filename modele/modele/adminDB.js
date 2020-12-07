module.exports.getAdmin = async(email, client) => {
    return await client.query(`
        SELECT * FROM admin WHERE login = $1`, [email]
    );
};