const pool = require("../../modele/database");
const fs = require("fs");
const path = require("path");

async function initDB(){
    const client = await pool.connect();
    try{
        const query = fs.readFileSync(path.join(__dirname, "../SQL/createDB.SQL"), "utf-8");
        await client.query(query);
        const secondQuery = fs.readFileSync(path.join(__dirname, "../SQL/insert.SQL"), "utf-8");
        await client.query(secondQuery);
    } catch (e) {
        console.log(e);
    } finally {
        client.release();
        await pool.end();
    }
}

initDB().then(() => console.log("done"));