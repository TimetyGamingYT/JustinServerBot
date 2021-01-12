const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let serverEmbed = new Discord.MessageEmbed()
    .setColor("#004b69")
    .addField("Naam:", message.guild.name, true)
    .addField("Aantal leden:", message.guild.memberCount, true)
    .setFooter("MinecraftGamers", client.user.displayAvatarURL())
    .setTimestamp();

    return message.channel.send(serverEmbed);
}

module.exports.help = {
    name: "serverinfo"
}