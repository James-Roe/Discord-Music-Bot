const {guildList} = require('../index');
const GuildMusicInfo = require('../GuildMusicInfo');
const { google } = require('googleapis');
const { youtube_API_Key } = require('../config.json');
const { nextSong, botConnection } = require('../methods');

module.exports = {
    name: 'play',
    description: 'plays the currently queued song, if you wish to add a song to the queue type ?play [song]',
    async execute(msg, args) 
    {
        //check that the member is in a voice channel.
        if(msg.member.voice.channel == undefined)
        {
            msg.channel.send("Please join a voice channel.");
            return;
        }

        //the following is for the case in which the member just told the bot to '?play'.
        if (args.length < 1) 
        {
            if (guildList.get(msg.guild.id == undefined)) 
            {
                msg.channel.send('Please specify a song that you would like to play.')
            } else 
            {
                //check if song is playing
                const guild = guildList.get(msg.guild.id);

                //if song is playing then check whether it's paused or not
                if (guild.getPlaying())
                {
                    const connection = botConnection(msg);
                    const {dispatcher} = connection;
                    if (dispatcher.paused)
                        dispatcher.resume();
                    return;
                }

                //if song is not playing then play last played song
                else
                {

                }
            }
        } 
        
        //the following is in the case that the member followed '?play' by a set of arguments.
        else 
        {
            if (guildList.get(msg.guild.id) == undefined)
            {
                guildList.set(msg.guild.id, new GuildMusicInfo());
            }

            //search for video id based upon arguments using youtube API
            const songInfo = await google.youtube('v3').search.list({
                part: 'snippet',
                key: youtube_API_Key,
                type: 'video',
                maxResults: 1,
                q: args.join(' ')
            });

            const songData = songInfo.data.items[0];

            const guild = guildList.get(msg.guild.id);
            guild.queue.enqueue(songData);
            if (!guild.getPlaying())
            {
                const connection = await msg.member.voice.channel.join();

                guild.isPlaying();

                connection.on('disconnect', () => {
                    guild.isNotPlaying();
                    guild.queue.clear();
                });

                nextSong(guild, connection);
                
            } 
                msg.channel.send(`${songData.snippet.title} added to queue.`);
        }
    }
}