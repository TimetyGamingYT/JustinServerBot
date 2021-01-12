const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    message.delete();

    if (!message.channel.name.startsWith('ticket-')) {
        message.channel.send('Dit kanaal is geen ticket en kan dus niet gesloten worden met `-sluit`!')
        .then(msg => {
            msg.delete({ timeout: 5000 })
        });
        return;
    };

    let sluitEmbed = new Discord.MessageEmbed()
        .setTitle('Ticket gesloten')
        .setDescription('Dit ticket is gesloten.')
        .setColor("#004b96")
        .setFooter('MinecraftGamers')
        .setTimestamp();

    let ticketName = message.guild.channels.cache.get(message.channel.id);

    message.channel.lockPermissions().then(channel2 => {
        channel2.send(sluitEmbed);
        channel2.setName(`gesloten-${ticketName.name}`);
    });
}

module.exports.help = {
    name: "sluit"
}