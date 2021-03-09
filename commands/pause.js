const { botConnection } = require('../methods');

module.exports = {
    name: 'pause',
    description: 'pauses the current song',
    instructions: 'to be implemented',
    execute(msg, args) 
    {
        
        //check if bot is in members voice channel.
        const connection = botConnection(msg);

        if (connection == null)
        {
            msg.channel.send('I need to be in your voice channel if you want to pause me.');
            return;
        }
        //check if stream is paused, and then if it isn't pause it.
        const { dispatcher } = connection;

        if (dispatcher.paused)
        {
            msg.channel.send("I'm already paused.")
            return;
        }
        dispatcher.pause();
    }
}