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

    nextSong(guild, dispatcher)
    {
        const botConnection = dispatcher.player.voiceConnection;

        dispatcher.on('finish', async () => {
            console.log('finished song');
            if (!guild.queue.isEmpty())
            {
                console.log('another song in queue');
                console.log(guild.queue);
                const newDispatcher = botConnection.play(await ytdl(guild.queue.dequeue()), {type: 'opus'});
                nextSong(guild, newDispatcher);
            } else 
            {
                console.log('no more songs in queue');
                guild.isNotPlaying();
                botConnection.disconnect();
            }
        }); 
    }
}