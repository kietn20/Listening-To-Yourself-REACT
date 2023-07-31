import express, { query } from "express";
import axios from "axios";
import cors from "cors";
import querystring from "querystring"
import 'dotenv/config';
import { access } from "fs";

const PORT = 3000;

const CLIENT_ID = process.env.CLIENTID;
const CLIENT_SECRET = process.env.CLIENTSECRET;

const REDIRECT_URI = 'http://localhost:3000/callback';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize?'
const SCOPE = "user-top-read playlist-modify-public playlist-modify-private user-read-private user-read-email playlist-read-private playlist-read-collaborative"

const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const app = express();
app.use(cors());

global.access_token = '';

app.get('/', (req, res) => {
    res.send('Hello World');
});

const stateKey = 'spotify_auth_state';

app.get('/login', (req, res) => {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: SCOPE,
        show_dialog: true
    })

    res.redirect(SPOTIFY_AUTH_URL + queryParams);
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(response => {
        access_token = response.data.access_token;
        res.redirect("http://localhost:5173/")
        // res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
    }).catch(error => {
        res.redirect("http://localhost:5173/")
    })
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.body.refresh_token;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/token', (req, res) => {
    res.json(
        {
            access_token: access_token
        }
    );
});

app.listen(PORT, () => console.log('SERVER STARTED'));