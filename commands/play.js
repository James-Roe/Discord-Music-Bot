const { Message } = require('discord.js');
const {guildList} = require('../index');

module.exports = {
    name: 'play',
    description: 'plays the currently queued song, if you wish to add a song to the queue type ?play [song]',
    execute(msg, args) {

        if (args.length < 1) {
            if (guildList.get(msg.guild.id == undefined)) {
                msg.channel.send('Please specify a song that you would like to play.')
            } else {
                //check if song is playing
            }
        } else {
            if (guildList.get(msg.guild.id == undefined)) {
                //guildList.set(msg.guild.id, )
            }
        }
    }
}