const express = require('express');
const path = require('path')
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const {Pool} = require('pg');



require('dotenv').config();
const port = process.env.PORT || 4000

const app = express();

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASS,
    port: process.env.DBPORT
})

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'sessions',
        createTableIfMissing: true
    }),
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*10 //10 seconds
    }
}))


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('home');
})
app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});