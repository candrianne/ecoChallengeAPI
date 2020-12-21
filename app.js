const Router = require('./route');
const express = require('express');
const app = express();
const port = process.env.PORT;
require('dotenv').config();


app.use(express.json());
app.use(Router);

app.listen(port, () => {
    console.log(process.env.VERSION);
    console.log(`Example app listening at http://localhost:${port}`);
});
