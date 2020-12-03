module.exports.getChallenges = async(id, client) => {
    return await client.query(`
        SELECT * FROM UserChallenge WHERE userid = $1`, [id]
    );
};