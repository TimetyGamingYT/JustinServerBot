const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let botEmbed = new Discord.MessageEmbed()
    .setColor("#004b96")
    .addField("Naam:", `<@${client.user.id}>`, true)
    .addField("Versie:", "1.0.0", true)
    .addField("Aangemaakt op:", "Vrijdag 6 November 2020", false)
    .setFooter("MinecraftGamers", client.user.displayAvatarURL())
    .setTimestamp();

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "botinfo"
}