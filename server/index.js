import express, { query } from "express";
import axios from "axios";
import cors from "cors";
import querystring from "querystring"
import 'dotenv/config';

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
        // show_dialog: true
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
        if (response.status === 200) {
            const { access_token, token_type } = response.data;

            axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers: {
                    Authorization: `${token_type} ${access_token}`
                }
            })
                .then(response => {
                    res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);s
                })
                .catch(error => {
                    res.send(error);
                })

            // res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
            // res.send('code: ' + code);
        } else {
            res.send(response);
        }
    }).catch(error => {
        res.send(error);
    })

    // try {
    //     const response = axios.post('https://accounts.spotify.com/api/token', {
    //         data: querystring.stringify({
    //             code: code,
    //             redirect_uri: REDIRECT_URI,
    //             grant_type: 'authorization_code'
    //         }),
    //         headers: {
    //             'Authorization': 'Basic' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     })
    //     res.send(response);
    // } catch (error) {
    //     res.send(err);
    // }
})

app.listen(PORT, () => console.log('SERVER STARTED'));