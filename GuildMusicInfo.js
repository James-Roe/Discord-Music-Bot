const Queue = require('./Queue');

module.exports = GuildMusicInfo;

function GuildMusicInfo(voiceChannelId)
{
    let currentVoiceChannelId = voiceChannelId;

    this.currentVoiceChannel = function()
    { return currentVoiceChannelId; }

    this.changeVoiceChannel = function(newVoiceChannel)
    { currentVoiceChannelId = newVoiceChannel; }

    this.leaveVoiceChannel = function()
    { currentVoiceChannelId = null; }


    let playerState = false;

    this.isPlaying = function()
    { playerState = true; }

    this.isNotPlaying = function()
    { playerState = false; }

    this.queue = new Queue();
}