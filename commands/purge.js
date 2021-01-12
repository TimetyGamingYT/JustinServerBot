const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.deletable) {
        message.delete();
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt geen rechten om dit command uit te voeren!");
    if (isNaN(args[0]) || parseInt(args[0]) <= 0) return message.channel.send("Dit is geen geldig getal!");

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("Sorry, ik kan geen berichten verwijderen.")
    }

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => message.channel.send(`Ik heb \`${deleted.size}\` berichten verwijderd!`))
        .then(message => message.delete({ timeout: 5000 }))
        .catch(err => message.channel.send(`Er is iets fout gegaan... ${err}`));
}

module.exports.help = {
    name: "purge"
}