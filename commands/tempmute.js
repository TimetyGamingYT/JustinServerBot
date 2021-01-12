const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {
    let tmUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!tmUser) return message.channel.send("Je hebt geen naam opgegeven of deze persoon heeft de server al verlaten!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt geen rechten om dit command uit te voeren!");
    if(tmUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je kan deze gebruiker niet tempmuten!");

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
    let muteTime = args[1];
    if(!muteTime) return message.channel.send("Je hebt geen tijd opgegeven!");

    let tempmuteEmbed = new Discord.MessageEmbed()
    .addField("Tempmuted gebruiker:", tmUser)
    .addField("Getempmute door:", message.author)
    .addField("Duur:", `${ms(ms(muteTime))}`)
    .setColor("#004b96")
    .setFooter("MinecraftGamers", client.user.displayAvatarURL())
    .setTimestamp();

    message.delete();
    await(tmUser.roles.add(muteRole.id));
    message.channel.send(tempmuteEmbed);

    setTimeout(function(){
        if(tmUser.roles.cache.has(muteRole.id)) {
            tmUser.roles.remove(muteRole.id);
            message.channel.send(`<@${tmUser.id}> is geünmute.`);
        } else {
            return;
        }
    }, ms(muteTime));

    return;
}

module.exports.help = {
    name: "tempmute"
}