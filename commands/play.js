const {queue} = require('../index');

module.exports = {
    name: 'play',
    description: 'plays the currently queued song, if you wish to add a song to the queue type ?play [song]',
    execute(msg, args) {
        queue.push(msg.content);
        msg.channel.send(queue);
    }
}