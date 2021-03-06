const { botConnection } = require('../methods');

const ytdl = require('ytdl-core-discord');

module.exports = {
    name: 'skip',
    description: 'skips the currently playing song',
    instructions: 'to be implemented',
    execute(msg, args)
    {
        //check that bot is in members voice channel
        const connection = botConnection(msg);

        if (connection == null)
        {
            msg.channel.send('I need to be in your voice channel if you want to skip a song.');
            return;
        }

        //skip the currently playing song and play the next song in the queue, or diconnect if the queue is empty.
        const dispatcher = connection.dispatcher;

        dispatcher.end();
    }
}