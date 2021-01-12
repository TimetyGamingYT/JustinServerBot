const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let umUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!umUser) return message.channel.send("Je hebt geen naam opgegeven of deze persoon heeft de server al verlaten!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt geen rechten om dit command uit te voeren!");
    let muteRole = message.guild.roles.cache.find(muteRole => muteRole.name === "Muted");

    if(umUser.roles.cache.has(muteRole.id)) {
        umUser.roles.remove(muteRole.id);
        message.delete();
        message.channel.send(`${umUser} is geünmute.`);
    } else {
        message.channel.send('Deze persoon heeft geen mute.');
    }

    return;
}

module.exports.help = {
    name: "unmute"
}