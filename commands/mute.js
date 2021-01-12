const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!mUser) return message.channel.send("Je hebt geen naam opgegeven of deze persoon heeft de server al verlaten!");
    let mReason = args.join(" ").slice(22);
    if(!mReason) mReason = "Geen reden opgegeven.";
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt geen rechten om dit command uit te voeren!");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je kan deze gebruiker niet tempmuten!");

    let muteRole = message.guild.roles.cache.find(muteRole => muteRole.name === "Muted");
    if(!muteRole){
        try {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted'
                }
            })
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(muteRole.id, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false
                });
            });
        } catch (err) {
            console.log(err.stack);
        }
    }

    let muteEmbed = new Discord.MessageEmbed()
    .addField("Muted gebruiker:", mUser)
    .addField("Gemute door:", message.author)
    .addField("Reden:", mReason)
    .setColor("#004b96")
    .setFooter("OpenRP", client.user.displayAvatarURL())
    .setTimestamp();

    message.delete();
    await(mUser.roles.add(muteRole.id));
    message.channel.send(muteEmbed);

    return;
}

module.exports.help = {
    name: "mute"
}