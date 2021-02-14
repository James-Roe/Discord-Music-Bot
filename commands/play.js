const { Message, Guild } = require('discord.js');
const {guildList} = require('../index');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'plays the currently queued song, if you wish to add a song to the queue type ?play [song]',
    async execute(msg, args) {

        if (args.length < 1) {
            if (guildList.get(msg.guild.id == undefined)) {
                msg.channel.send('Please specify a song that you would like to play.')
            } else {
                console.log('not yet implemented');
                //check if song is playing
            }
        } else {
            if (guildList.get(msg.guild.id) == undefined) {
                guildList.set(msg.guild.id, new Guild());
            }
            //search for video id based upon arguments using youtube API
            let guild = guildList.get(msg.guild.id);
            guild.queue.push(/*video url*/);
            if (guild.queue.length < 1) 
            {
                const connection = await msg.member.voice.channel.join();

                const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=E5yFcdPAGv0&list=RDE5yFcdPAGv0&start_radio=1'));

                dispatcher.on('finish', () => {
                    guild.queue.shift();
                    if (guild.queue.length > 0)
                    {
                        connection.play(guild.queue[0]);
                    } else 
                    {
                        connection.disconnect();
                    }
                }); 
            }
        }
    }
}