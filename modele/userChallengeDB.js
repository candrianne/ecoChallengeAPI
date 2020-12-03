module.exports.getChallenges = async(id, client) => {
    return await client.query(`
        SELECT UserChallenge.startdate, UserChallenge.enddate, Challenge.name
        FROM UserChallenge
        INNER JOIN Challenge ON UserChallenge.challengeid = Challenge.id
        WHERE UserChallenge.userid = $1`, [id]
    );
};