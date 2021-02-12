const Discord = require('discord.js');
const {prefix} = require('../config.json');

module.exports = {
    name: 'help',
    description: 'provides a list of commands and there functionalities.',
    execute(msg, args) {

        const {commands} = msg.client;

        if (args.length == 0) {
            const helpEmbed = new Discord.MessageEmbed()
            .setTitle('Music Bot Help')
            .setDescription(`Here are a list of commands. If you would like to see the description of [command] please type ${prefix}help [command]`);

            const commandArr = commands.keyArray();
            for (command of commandArr.filter(notHelp => !notHelp.startsWith('help'))) {
                helpEmbed.addField( command, command);
            }

        msg.channel.send(helpEmbed);
        }
    }
}