
const { Client, Intents, MessageEmbed } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus, entersState } = require('@discordjs/voice');
const SlCom = require('@discordjs/builders');
const fetch = require('node-fetch');
const {token, prefix: prfx} = require('./settings.json');


const client = new Client( { intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
]});


client.on('ready', e => client.user.setActivity('gym', { type: 'COMPETING'} ));

client.on('messageCreate', e => {
  let msg;

  if (e.author.username == client.user.username) {
    return
  }

  e.content.startsWith(prfx) ? msg = e.content.slice(prfx.length).split(/ +/) : '#';
  console.log(e.content, '|', msg);

  switch(msg ? msg.join(' ').slice(0, msg[0].length) : 'foo'.split('')) {
    case 'embed': 
    client.channels.cache.get(e.channelId).send({ embeds: [ new MessageEmbed()
    .setColor('#216314').setTitle('embed')
    .setURL(msg[1])
    .setThumbnail(e.author.avatarURL())
    .setImage(msg[1])
    .setAuthor(e.author.username) ]});
    break;

    case 'fetch': fetch(e.author.avatarURL()).then(e => console.log(e));
    break;
    case 'eval': 
    // eval(msg.slice(1).join(' '));
    break;
  }
})


client.login(token);
console.clear()