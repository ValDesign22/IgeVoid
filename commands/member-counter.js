const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank, dbMCount) => {
    if (message.member.hasPermission("MANAGE_SERVER")) {
        if (!args[0]) {
            const e = new MessageEmbed()
            .setColor("RED")
            .setTitle("Erreur de syntaxe")
            .setDescription(`Merci de mettre \`${prefix}member-counter active\` pour activer le compteur de membres ou \`${prefix}member-counter desactive\` pour l'activer.`)

            message.channel.send(e)
        }
        else if (args[0] === "active") {

            let categorie = message.guild.channels.cache.find(c => c.name == "Members Counters" && c.type == "category")
            if (!categorie) categorie = await message.guild.channels.create("Members Counters", { type: "category", position: 1 }).catch(e => { return console.error(e) })
            
            dbMCount.set(`cat_${message.guild.id}`, categorie.id)

            /* Members Counter */

            message.guild.channels.create(`Members: ${message.guild.members.cache.filter(m => !m.user.bot).size}`, {
                type: "voice",

                permissionOverwrites: [
                    {
                        deny: 'CONNECT',
                        id: message.guild.id
                    },
                ],
                parent: categorie.id,
            })
            .then(ch => {
                dbMCount.set(`members_${message.guild.id}`, ch.id)
            });

            /* Bots Counter */

            message.guild.channels.create(`Bots: ${message.guild.members.cache.filter(m => m.user.bot).size}`, {
                type: "voice",

                permissionOverwrites: [
                    {
                        deny: 'CONNECT',
                        id: message.guild.id
                    },
                ],
                parent: categorie.id,
            })
            .then(ch => {
                dbMCount.set(`bots_${message.guild.id}`, ch.id)
            });

            /* All Members Counter */

            message.guild.channels.create(`All Members: ${message.guild.memberCount}`, {
                type: "voice",

                permissionOverwrites: [
                    {
                        deny: 'CONNECT',
                        id: message.guild.id
                    },
                ],
                parent: categorie.id,
            })
            .then(ch => {
                dbMCount.set(`allMembers_${message.guild.id}`, ch.id)
            });

            /* Message de Réussite */

            const e = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Réussite")
            .setDescription(`Le compteur de membres à été activé sur ce serveur.`)

            message.channel.send(e)
        }
        else if (args[0] === "desactive") {

            /* Get Channels */

            const catChs = await message.guild.channels.cache.find(c => c.id === dbMCount.get(`cat_${message.guild.id}`) && c.type == "category");

            const membersCh = message.guild.channels.cache.find(c => c.id === dbMCount.get(`members_${message.guild.id}`));

            const botsCh = message.guild.channels.cache.find(c => c.id === dbMCount.get(`bots_${message.guild.id}`));

            const allMembersCh = message.guild.channels.cache.find(c => c.id === dbMCount.get(`allMembers_${message.guild.id}`));

            /* Channels Delete */

            await catChs.delete()
            .then(() => {
                dbMCount.delete(`cat_${message.guild.id}`)
            });

            membersCh.delete()
            .then(() => {
                dbMCount.delete(`members_${message.guild.id}`)
            });
            
            botsCh.delete()
            .then(() => {
                dbMCount.delete(`bots_${message.guild.id}`)
            });

            allMembersCh.delete()
            .then(() => {
                dbMCount.delete(`allMembers_${message.guild.id}`)
            });

            /* Message de Réussite */

            const e = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Réussite")
            .setDescription(`Le compteur de membres à été désactivé sur ce serveur.`)

            message.channel.send(e)
        }
        else if (args[0]) {
            const e = new MessageEmbed()
            .setColor("RED")
            .setTitle("Erreur de syntaxe")
            .setDescription(`Merci de mettre \`${prefix}member-counter active\` pour activer le compteur de membres ou \`${prefix}member-counter desactive\` pour l'activer.`)

            message.channel.send(e)
        }
    }
    else {
        const e = new MessageEmbed()
        .setTitle("Permission")
        .setColor("RED")
        .setDescription("Tu n'as pas la permission `MANAGE_SERVER`")
        
        message.reply(e)
    }
}