const {guildList} = require('../index');
const GuildMusicInfo = require('../GuildMusicInfo');
const ytdl = require('ytdl-core-discord');
const {google} = require('googleapis');
const {youtube_API_Key} = require('../config.json');

module.exports = {
    name: 'play',
    description: 'plays the currently queued song, if you wish to add a song to the queue type ?play [song]',
    async execute(msg, args) 
    {
        if(msg.member.voice.channel == undefined)
        {
            msg.channel.send("Please join a voice channel.");
            return;
        }
        if (args.length < 1) 
        {
            if (guildList.get(msg.guild.id == undefined)) 
            {
                msg.channel.send('Please specify a song that you would like to play.')
            } else 
            {
                console.log('not yet implemented');
                //check if song is playing
            }
        } else 
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

            console.log(songInfo.data.snippet);

            const song = 'https://www.youtube.com/watch?v=E5yFcdPAGv0&list=RDE5yFcdPAGv0&start_radio=1';
            let guild = guildList.get(msg.guild.id);
            guild.queue.push(song);
            console.log(guild.queue);
            if (guild.queue.length < 2)
            {
                const connection = await msg.member.voice.channel.join();

                const dispatcher = connection.play(await ytdl(guild.queue[0]), {type: 'opus'});

                connection.on('disconnect', () => {
                    guild.queue.splice(0, guild.queue.length);
                })

                dispatcher.on('finish', async () => {
                    console.log('finished song');
                    guild.queue.shift();
                    if (guild.queue.length > 0)
                    {
                        console.log('another song in queue');
                        console.log(guild.queue);
                        connection.play(await ytdl(guild.queue[0]), {type: 'opus'});
                    } else 
                    {
                        connection.disconnect();
                    }
                }); 
            } else
            {
                msg.channel.send(song + ' added to queue.');
            }
        }
    }
}