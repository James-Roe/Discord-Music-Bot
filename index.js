const fs = require('fs');
const Discord = require('discord.js');
const {token, prefix} = require('./config.json');
const ytdl = require('ytdl-core');

let queue = [];

exports.queue = queue;


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready');
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot)
        return;
    let args = msg.content.trim().slice(prefix.length).split(/\s+/);
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command)) {
        msg.reply('That is not a valid command, for a list of valid commands type ?help');
        return;
    }

    try {
        client.commands.get(command).execute(msg, args);
    } catch(error) {
        console.error(error);
        msg.reply("there was an error trying to execute that command.");
    }
});

client.login(token);