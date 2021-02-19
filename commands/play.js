const {guildList} = require('../index');
const GuildMusicInfo = require('../GuildMusicInfo');
const ytdl = require('ytdl-core-discord');
const {google} = require('googleapis');
const {youtube_API_Key} = require('../config.json');
const { nextSong } = require('../methods');

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
                console.log('not yet implemented');
                //check if song is playing
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

            const item = songInfo.data.items[0];

            const song = `https://www.youtube.com/watch?v=${item.id.videoId}`;
            let guild = guildList.get(msg.guild.id);
            guild.queue.enqueue(song);
            console.log(guild.queue);
            if (!guild.getPlaying())
            {
                const connection = await msg.member.voice.channel.join();

                const dispatcher = connection.play(await ytdl(guild.queue.dequeue()), {type: 'opus'});

                guild.isPlaying();

                msg.channel.send(`playing: ${item.snippet.title}`);

                connection.on('disconnect', () => {
                    guild.isNotPlaying();
                    guild.queue.clear();
                })

                dispatcher.on('finish', async () => {
                    console.log('finished song');
                    if (!guild.queue.isEmpty())
                    {
                        console.log('another song in queue');
                        console.log(guild.queue);
                        connection.play(await ytdl(guild.queue.dequeue()), {type: 'opus'});
                    } else 
                    {
                        console.log('no more songs in queue');
                        guild.isNotPlaying();
                        connection.disconnect();
                    }
                }); 
            } else
            {
                msg.channel.send(`${item.snippet.title} added to queue.`);
            }
        }
    }
}