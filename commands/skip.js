const usefulMethods = require('../methods');
const { guildList } = require('../index');
const ytdl = require('ytdl-core-discord');

module.exports = {
    name: 'skip',
    description: 'skips the currently playing song',
    execute(msg, args)
    {
        //check that bot is in members voice channel
        const botConnection = usefulMethods.botConnection(msg);

        if (botConnection == null)
        {
            msg.channel.send('I need to be in your voice channel if you want to skip a song.');
            return;
        }

        //skip the currently playing song and play the next song in the queue, or diconnect if the queue is empty.
        const dispatcher = botConnection.dispatcher;

        dispatcher.end();
    }
}