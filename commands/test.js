module.exports = {
    name: 'test',
    description: "a command to test that the command handler is working",
    execute(msg, args) {
        msg.channel.send('test command handled');
    }
}