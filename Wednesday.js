require('dotenv').config();

const fetch = require('node-fetch');
const cron = require('cron');
const d = new Date();
const t = d.getHours();
const weekday = d.getDay();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOTTOKEN);

client.once('ready', () => {
    console.log('Wednesday, My Dudes is online!');
    console.log(d);

    let wednesday = new cron.CronJob('00 22 15 * * Wed', () => {
        client.channels.cache.get('868269464808984629').send("https://media.tenor.com/images/1747d1c447b3e31de9b24c58c72495aa/tenor.gif");
    });
    wednesday.start();
})

client.on('message', newMessage);

async function newMessage(msg) {

    
    if(msg.content == '?wednesday' && weekday == 3) {
        let keywords = "wednesday my dudes";
        let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&limit=5`;
        let response = await fetch(url);
        let json = await response.json();
        console.log(json);
        let num = Math.floor(Math.random() * json.results.length);
        client.channels.cache.get('868269464808984629').send(json.results[num].url);
    }
    else if (msg.content == '?wednesday' && weekday != 3) {
        msg.channel.send('NO');
    }
}
