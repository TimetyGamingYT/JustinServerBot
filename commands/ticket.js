const Discord = require('discord.js');
const { timeStamp } = require('console');

module.exports.run = async (client, message, args) => {
    message.delete();

    let ticketAanmakenEmbed = new Discord.MessageEmbed()
        .setTitle('Ticket aanmaken')
        .setDescription('Je gaat nu een ticket aanmaken, je krijgt binnen 24 uur antwoord op je vraag.')
        .setColor("#004b96")
        .addField('Bij welke categorie hoort je vraag?', '🎟 Algemene vragen\n🔧 Techische vragen\n💾 Sales');

    message.author.send(ticketAanmakenEmbed)
        .then(async msg => {

            let emoji = await promptMessage(msg, message.author, 30, ["🎟", "🔧", "💾"]);

            let categoryOpen = message.guild.channels.cache.find(c => c.name == '— Tickets' && c.type == 'category')

            let vraag2;
            async function messageVraag() {
                return message.author.dmChannel.awaitMessages(m => m.author.id == message.author.id,
                    { max: 1, time: 30000 }).then(collected => {
                        vraag2 = collected.first()
                    })
            }

            if (emoji === "🎟") {
                let vraagEmbed = new Discord.MessageEmbed()
                    .setColor("#004b96")
                    .setDescription('Wat is je vraag?');

                message.author.send(vraagEmbed)

                let vraag = await messageVraag(message, message.author)

                message.author.send('`Bezig met ticket aanmaken...`')
                    .then(msg => {
                        msg.delete({ timeout: 1000 })
                    });
                if (!categoryOpen) return console.log(`Er is geen ticket categorie genaamd ${categoryOpen.name}`);

                message.guild.channels.create(`ticket-${message.author.username}`, "text"
                ).then(channel2 => {

                    channel2.updateOverwrite(message.guild.roles.everyone, { READ_MESSAGES: false });
                    channel2.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
                    channel2.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });

                    let ticketEmbed = new Discord.MessageEmbed()
                        .addField("Categorie:", "🎟 Algemene vragen")
                        .addField("Vraag:", vraag2)
                        .addField("Ticket sluiten?", "Je kan met `-sluit` dit ticket sluiten.")
                        .setTimestamp()
                        .setColor("#004b96")
                        .setFooter('MinecraftGamers');

                    channel2.send(ticketEmbed)

                    channel2.setParent(categoryOpen.id);
                });

                message.author.send('Er is succesvol een ticket voor je aangemaakt! ✅');

            } else if (emoji === "🔧") {
                let vraagEmbed2 = new Discord.MessageEmbed()
                .setColor("#004b96")
                .setDescription('Wat is je vraag?');

                message.author.send(vraagEmbed2)

                let vraag = await messageVraag(message, message.author)

                message.author.send('`Bezig met ticket aanmaken...`')
                    .then(msg => {
                        msg.delete({ timeout: 1000 })
                    });
                if (!categoryOpen) return console.log(`Er is geen ticket categorie genaamd ${categoryOpen.name}`);

                message.guild.channels.create(`ticket-${message.author.username}`, "text"
                ).then(channel2 => {

                    channel2.updateOverwrite(message.guild.roles.everyone, { READ_MESSAGES: false });
                    channel2.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
                    channel2.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });

                    let ticketEmbed3 = new Discord.MessageEmbed()
                    .addField("Categorie:", "🔧 Technische vragen")
                    .addField("Vraag:", vraag2)
                    .addField("Ticket sluiten?", "Je kan met `-sluit` dit ticket sluiten.")
                    .setTimestamp()
                    .setColor("#004b96")
                    .setFooter('MinecraftGamers');

                    channel2.send(ticketEmbed3)

                    channel2.setParent(categoryOpen.id);
                });

                message.author.send('Er is succesvol een ticket voor je aangemaakt! ✅');

            } else if (emoji === "💾") {
                let vraagEmbed3 = new Discord.MessageEmbed()
                    .setColor("#004b96")
                    .setDescription('Wat is je vraag?');

                message.author.send(vraagEmbed3);

                let vraag = await messageVraag(message, message.author)

                message.author.send('`Ticket aan het aanmaken...`')
                    .then(msg => {
                        msg.delete({ timeout: 1000 })
                    });
                if (!categoryOpen) return console.log(`Er is geen ticket categorie genaamd ${categoryOpen.name}`);

                message.guild.channels.create(`ticket-${message.author.username}`, "text"
                ).then(channel2 => {

                    channel2.updateOverwrite(message.guild.roles.everyone, { READ_MESSAGES: false });
                    channel2.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
                    channel2.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });

                    let ticketEmbed2 = new Discord.MessageEmbed()
                        .addField("Categorie:", "💾 Sales")
                        .addField("Vraag:", vraag2)
                        .addField("Ticket sluiten?", "Je kan met `-sluit` dit ticket sluiten.")
                        .setTimestamp()
                        .setColor("#004b96")
                        .setFooter('MinecraftGamers');

                    channel2.send(ticketEmbed2)

                    channel2.setParent(categoryOpen.id);
                });

                message.author.send('Er is succesvol een ticket voor je aangemaakt! ✅');
            }
        }).catch(err => {   
            message.channel.send('Je moet je DM open hebben staan anders kan ik je geen bericht sturen!')
            .then(msg => {
                msg.delete({ timeout: 5000 })
            });
       });
}

async function promptMessage(message, author, time, reactions) {
    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    let filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}


module.exports.help = {
    name: "ticket"
}
