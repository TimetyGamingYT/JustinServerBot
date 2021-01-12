const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!bUser) return message.channel.send("Je hebt geen naam opgegeven of deze persoon heeft de server al verlaten!");
    let bReason = args.join(" ").slice(22);
    if(!bReason) bReason = "Geen reden opgegeven.";
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Je hebt geen rechten om dit command uit te voeren!");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Je kan deze gebruiker niet verbannen!");

    let banEmbed = new Discord.MessageEmbed()
    .addField("Verbannen gebruiker:", bUser)
    .addField("Verbannen door:", message.author)
    .addField("Reden:", bReason)
    .setColor("#004b69")
    .setFooter("MinecraftGamers", client.user.displayAvatarURL())
    .setTimestamp();

    message.delete();
    message.guild.member(bUser).ban({reason: bReason});
    message.channel.send(banEmbed);

    return;
}

module.exports.help = {
    name: "ban"
}