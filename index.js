const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Aktif'));
app.listen(port);

const client = new SteamUser();

client.logOn({
    accountName: process.env.ardab2134,
    password: process.env.1905ardaM1907,
    twoFactorCode: SteamTotp.generateAuthCode(process.env.G255W)
});

client.on('loggedOn', () => {
    console.log('Giris basarili');
    client.setPersona(1);
    client.gamesPlayed([730]);
});

client.on('error', (err) => {
    console.log('Hata:', err);
});
