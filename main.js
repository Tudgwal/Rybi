require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const bdm = require('./bdm.js');
const player = require('./player.js');

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.charAt(0) == '!'){
        if (msg.content === '!ruping') {
            msg.channel.send('rupong');
        } else if (msg.content.substring(0,4) === '!bdm'){
            bdm.newbdm(msg, msg.content.substring(5, msg.content.length));
        } else if (msg.content.substring(0,4) === '!rpl') {
            player.playerCommand(msg, client);
        }
    }
});
