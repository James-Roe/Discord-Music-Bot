const ytdl = require('ytdl-core-discord');

module.exports = {

    //takes a message from a member as an argument and returns the bot's voice connection in that member's guild if they are in the same channel or null otherwise.
    botConnection(message)
    {
        const memberChannel = message.member.voice.channelID;
        const botConnections = message.client.voice.connections.array();

        for (let i in botConnections)
        {
            if (botConnections[i].channel.id == memberChannel)
                return botConnections[i];
        }
        return null;
    },

    async nextSong(guild, connection)
    {
        const songData = guild.queue.dequeue();
        const songId = songData.id.videoID;
        const songUrl = `https://www.youtube.com/watch?v=${songId}`;

        const dispatcher = connection.play(await ytdl(songUrl), {type: 'opus'});


        dispatcher.on('finish', () => {
            console.log('finished song');
            if (!guild.queue.isEmpty())
            {
                console.log('another song in queue');
                console.log(guild.queue);
                module.exports.nextSong(guild, connection);
            } else 
            {
                console.log('no more songs in queue');
                guild.isNotPlaying();
                connection.disconnect();
            }
        }); 
    }
}