const Discord = require('discord.js');
const config = require('../config/config.default.json');

module.exports.run = async (client, message, args) => {
    let helpEmbed = new Discord.MessageEmbed()
    .setTitle(`Prefix: \`${config.prefix}\``)
    .addField(`\`${config.prefix}help\``, 'Laat deze hulp embed zien.')
    .addField(`\`${config.prefix}botinfo\``, 'Laat informatie over de bot zien.')
    .addField(`\`${config.prefix}serverinfo\``, 'Laat informatie over de server zien.')
    .addField(`\`${config.prefix}ban\``, 'Ban iemand van de server.')
    .addField(`\`${config.prefix}warn\``, 'warn iemand op de server.')
    .addField(`\`${config.prefix}kick\``, 'Kick iemand van de server.')
    .addField(`\`${config.prefix}mute\``, 'Mute iemand.')
    .addField(`\`${config.prefix}tempmute\``, 'Tempmute iemand.')
    .addField(`\`${config.prefix}unmute\``, 'Unmute iemand.')
    .addField(`\`${config.prefix}purge\``, 'Verwijder berichten.')
    .setColor("#004b96")
    .setFooter("MinecraftGamers", client.user.displayAvatarURL())
    .setTimestamp();

    message.channel.send(helpEmbed);

    return;
}

module.exports.help = {
    name: "help"
}