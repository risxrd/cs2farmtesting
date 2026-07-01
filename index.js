const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const express = require('express');
require('dotenv').config();

const app = express();
app.get('/', (req, res) => res.send('OK'));
app.listen(process.env.PORT || 3000);

const client = new SteamUser();

client.logOn({
    accountName: process.env.ardab2134,
    password: process.env.1905ardaM1907,
    twoFactorCode: SteamTotp.generateAuthCode(process.env.G65X3)
});

client.on('loggedOn', () => {
    console.log('Basarili');
    client.setPersona(1);
    client.gamesPlayed([730]);
});

client.on('error', (err) => {
    console.log('Hata:', err);
});
