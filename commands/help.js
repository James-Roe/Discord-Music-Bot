const Discord = require('discord.js');
const {prefix} = require('../config.json');

module.exports = {
    name: 'help',
    description: 'provides a list of commands and there functionalities.',
    execute(msg, args) {

        const {commands} = msg.client;
        const embed = new Discord.MessageEmbed();

        //the following is for the case in which no arguments have been added
        if (args.length < 1)
        {
            embed.setTitle('Music Bot Help')
                 .setDescription(`Here are a list of available commands. To find out more about a specific command please type "${prefix}help " followed by the command name`);
            
            //goes through all the commands and adds a new field for each command with the fields name set to the commands name and the fields value set to its description
            const commandArray = commands.array();
            for (const index in commandArray)
            {
                const command = commandArray[index];
                embed.addField(command.name, command.description);
            }
        }

        //the following is for the case that an argument was included
        else
        {
            //first we check that the argument is a valid command
            const argToCheck = args.join(' ');
            const command = commands.find(command => command.name == argToCheck);
            if(!command)
            {
                msg.channel.send(`the command "${argToCheck}" does not exist.`);
                return;
            }

            embed.setTitle(command.name)
                 .setDescription(command.instructions);
        }
        msg.channel.send(embed);
    }
}