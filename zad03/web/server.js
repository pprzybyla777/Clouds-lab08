const express = require('express');
const redis = require('redis');
const postgres = require("postgres");


const app = express();
app.use(express.json());


const redisClient = redis.createClient({
    url: 'redis://redis:6379',
    legacyMode: true,
});

const sql = postgres({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});


async function getUsers() {
    const users = await sql`
        SELECT
            user_id,
            username
        FROM users
    `
    return users;
}

async function insertUser({username}) {
    const users = await sql`
        INSERT INTO users
            ( username )
        VALUES
            (${username})
        RETURNING username
    `;
    return users;
}

// Redis

app.get('/', function(req, res) {
    res.send("Hello!")
});

app.get('/message', function(req, res) {

    const { key } = req.query;

    if (key) {

        redisClient.get(key, function(err, value) {
            return res.status(200).json({value: value})
        })

    } else {
        return res.status(400).json({message: "You have to query key!"});
    }

});

app.post('/message', async function(req, res) {

    const { key, value } = req.body;

    if (!key || !value ) {
        return res.status(400).json({ message: "All fields are required." });
    }

    await redisClient.set(key, value);

    return res.status(201).json({message: "Operation was successful"});

});

// Postgres

app.get('/users', (req, res) => {
    getUsers()
    .then((result) => {
        res.status(200).send({
            status: "OK",
            data: result,
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({
            status: "Internal server error"
        })
    })
});


app.post('/users', (req, res) => {

    const { username } = req.body;

    if (!username) {
        return res.status(400).send({
            status: "Bad request",
        });
    }

    insertUser({username: username})
    .then((result) => {
        res.status(200).send({
            status: "OK",
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: "Internal server error"
        })
    })
});


app.listen(3000, async function() {
    await redisClient.connect();
    console.log('Web application is listening on port 3000');
});