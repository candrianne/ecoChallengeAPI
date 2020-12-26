module.exports.getAdmin = async(email, client) => {
    return await client.query(`
        SELECT * FROM admin WHERE email = $1`, [email]
    );
};