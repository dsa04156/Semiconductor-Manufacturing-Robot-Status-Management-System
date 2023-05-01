/* server/server.js */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');
const cors = require('cors');

app.use(cors());
app.get('/api/host', (req, res) => {
    res.send({ host : 'sejun' });
})


app.get('/api/test', (req, res) => {
    db.query("select * from User", (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})