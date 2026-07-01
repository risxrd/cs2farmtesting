const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const express = require('express');
require('dotenv').config();

// Railway'in projeyi uyku moduna almasını engellemek için mini web portu
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('CS2 Saat Kasma Sistemi Aktif!'));
app.listen(port, () => console.log(`Sunucu ${port} portunda dinleniyor.`));

const client = new SteamUser();

const logOnOptions = {
    accountName: process.env.ardab2134,
    password: process.env.1905ardaM1907,
    twoFactorCode: SteamTotp.generateAuthCode(process.env.XN8YQ)
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('✅ Steam hesabına başarıyla giriş yapıldı.');
    client.setPersona(SteamUser.EPersonaState.Online);
    
    // Sadece CS2
    client.gamesPlayed([730]); 
    console.log('CS2 saat kasma işlemi başladı...');
});

client.on('disconnected', (eresult, msg) => {
    console.log(`⚠️ Bağlantı koptu: ${msg}. Tekrar deneniyor...`);
});

client.on('error', (err) => {
    console.error(`❌ Hata: ${err.message}`);
});
