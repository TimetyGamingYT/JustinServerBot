const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!kUser) return message.channel.send("Je hebt geen naam opgegeven of deze persoon heeft de server al verlaten!");
    let kReason = args.join(" ").slice(22);
    if(!kReason) kReason = "Geen reden opgegeven.";
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Je hebt geen rechten om dit command uit te voeren!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Je kan deze gebruiker niet kicken!");

    let kickEmbed = new Discord.MessageEmbed()
    .addField("Gekickte gebruiker:", kUser)
    .addField("Gekickt door:", message.author)
    .addField("Reden:", kReason)
    .setColor("#004b69")
    .setFooter("MinecraftGamers", client.user.displayAvatarURL())
    .setTimestamp();

    message.delete();
    message.guild.member(kUser).kick(kReason);
    message.channel.send(kickEmbed);

    return;
}

module.exports.help = {
    name: "kick"
}