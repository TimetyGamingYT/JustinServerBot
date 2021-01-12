const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!mUser) return message.channel.send("Je hebt geen naam opgegeven of deze persoon heeft de server al verlaten!");
    let mReason = args.join(" ").slice(22);
    if(!mReason) mReason = "Geen reden opgegeven.";
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt geen rechten om dit command uit te voeren!");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je kan deze gebruiker niet warnen!");

    let warnEmbed = new Discord.MessageEmbed()
    .addField("gewarnde gebruiker:", mUser)
    .addField("Gewarned door:", message.author)
    .addField("Reden:", mReason)
    .setColor("#004b96")
    .setFooter("MinecraftGamers", client.user.displayAvatarURL())
    .setTimestamp();

    message.delete();
    message.channel.send(warnEmbed);

    return;
}

module.exports.help = {
    name: "warn"
}