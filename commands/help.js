const D = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args, dbPrefixs, dbTickets, prefix) => {    
    fs.readdir("./commands", (_err, files) => {
        let commands = files.length;
    
    if (!args[0]) {
        const e = new D.MessageEmbed()
        .setTitle(`Commandes de ${client.user.tag}`)
        .setColor("#2F3136")
        .setDescription(`Mon prefix sur le serveur est: \`${prefix}\`\nCommandes: \`${commands}\`\nPour voir l'aide d'une commande:\n\`${prefix}help <commande>\`\n\u200b`)
        .addField("Utils (5)", "`help`, `serverinfos`, `userinfos`, `invites`, `avatar`")
        .addField("Music (12)", "`clear-queue`, `loop`, `nowplaying`, `pause`, `play`, `queue`, `resume`, `search`, `shuffle`, `skip`, `stop`, `volume`")
        .addField("Moderation (10)", "`ban`, `kick`, `warn`, `role`, `channel`, `clear`, `warns`, `mp`, `lock`, `unlock`")
        .addField("Niveau (4)", "`rank`, `levels`, `messages`, `leveling`")
        .addField("Fun (4)", "`embed`, `webhook`, `clyde`, `qr`")
        .addField("Giveaway (3)", "`reroll`, `end`, `start`")
        .addField("Configuration (8)", "`ticket`, `setprefix`, `setwelcome`, `setgoodbye`, `unsetgoodbye`, `unsetwelcome`, `member-counter`, `test`")
        .addField("Bot (5)", "`ping`, `invite`, `botinfo`, `support`, `vote`")
        .addField("Owner (5)", "`eval`, `restart`, `cmd-reload`, `event-reload`, `servers`")
        .addField("Liens", "[[Support]](https://discord.gg/nDKqMN6cG8) • [[Site]](http://beta.projectheberg.fr:20051) • [[Top.gg]](https://top.gg/bot/804289381141446666/)")
        .setImage("https://cdn.discordapp.com/attachments/825774787598090280/826847828651016202/350kb_1.gif")
        
        message.channel.send(e)
    }
    if (args[0] === "embed") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'afficher votre message dans un embed.\nUsage: \`${prefix}embed message\``)

        message.channel.send(e)
    }
    else if (args[0] === "end") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de faire terminer un giveaway.\nUsage: \`${prefix}end <giveawayID>\``)

        message.channel.send(e)
    }
    else if (args[0] === "help") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'afficher la liste des commandes.\nUsage: \`${prefix}help (commande)\``)

        message.channel.send(e)
    }
    else if (args[0] === "reroll") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de reroll un giveaway.\nUsage: \`${prefix}reroll <giveawayID>\``)

        message.channel.send(e)
    }
    else if (args[0] === "start") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de démarrer un giveaway.\nUsage: \`${prefix}start #channel 1s/m/d gagnants lot(s)\``)

        message.channel.send(e)
    }
    else if (args[0] === "ticket") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'ouvrir un ticket.\nUsage: \`${prefix}ticket\``)

        message.channel.send(e)
    }
    else if (args[0] === "ban") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de bannir une personne.\nUsage: \`${prefix}ban @user raison\``)

        message.channel.send(e)
    }
    else if (args[0] === "kick") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'expulser une personne.\nUsage: \`${prefix}kick @user raison\``)

        message.channel.send(e)
    }
    else if (args[0] === "warn") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de warn une personne.\nUsage: \`${prefix}warn @user raison\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "serverinfos") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de savoir les informations du serveur.\nUsage: \`${prefix}serverinfos\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "userinfos") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de savoir les informations d'un membre ou de vous même.\nUsage: \`${prefix}userinfos (@user)\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "ping") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de savoir la latence du message et de l'API.\nUsage: \`${prefix}ping\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "role") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de créer/supprimer un role sur le serveur ou ajouter/enlever un role à un membre.\nUsage: \`${prefix}role create/delete/add/remove\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "channel") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de créer/supprimer un role sur le serveur.\nUsage: \`${prefix}role create/delete\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "rank") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de savoir son niveau ou savoir le niveau des autres.\nUsage: \`${prefix}rank (@user)\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "levels") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de voir le leaderboard du serveur.\nUsage: \`${prefix}levels (@user)\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "messages") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de voir votre nombre de messages.\nUsage: \`${prefix}messages\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "clear") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de supprimer un nombre de mesages compris entre 1 et 99.\nUsage: \`${prefix}clear <1-99>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "webhook") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'envoyer votre message dans un webhook.\nUsage: \`${prefix}webhook <message>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "invite") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'avoir le lien d'invitation du bot.\nUsage: \`${prefix}invite\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "setprefix") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de changer le prefix du bot sur le serveur.\nUsage: \`${prefix}setprefix <nouveau_prefix>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "eval") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'executer un morceau de code.\nUsage: \`${prefix}eval <code>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "setwelcome") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de mettre un salon de bienvenue.\nUsage: \`${prefix}setwelcome <#channel>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "setgoodbye") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de mettre un salon d'aurevoir.\nUsage: \`${prefix}setgoodbye <#channel>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "clear-queue") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de supprimer toutes les musiques de la playlist.\nUsage: \`${prefix}clear-queue\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "loop") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet ^de faire répeter la musique actuelle en boucle.\nUsage: \`${prefix}loop\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "nowplaying") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet .\nUsage: \`${prefix}\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "nowplaying") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de savoir les infos de la musique actuelle.\nUsage: \`${prefix}\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "pause") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de mettre votre musique actuelle en pause.\nUsage: \`${prefix}pause\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "play") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de jouer de la musique ou d'ajouter la musique demandée dans la file d'attente.\nUsage: \`${prefix}play <musique>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "queue") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de voir les musiques se trouvants dans la file d'attente.\nUsage: \`${prefix}queue\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "resume") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de relancer votre musique après avoir mis pause.\nUsage: \`${prefix}resume\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "search") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de rechercher le titre demandé sur YouTube.\nUsage: \`${prefix}search <musique>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "shuffle") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de mélanger la file d'attente.\nUsage: \`${prefix}shuffle\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "skip") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de passer à la musique suivante.\nUsage: \`${prefix}skip\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "stop") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'arreter la musique.\nUsage: \`${prefix}stop\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "volume") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de changer le volume de la musique.\nUsage: \`${prefix}volume <1/100>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "invites") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de savoir votre nombre d'invitations ou celui du membre mentionné.\nUsage: \`${prefix}invites (@member)\``)
        
        message.channel.send(e)
    }
    else if (args[0] === "botinfo") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de savoir les informations du bot.\nUsage: \`${prefix}botinfo\``)
        
        message.channel.send(e)
    }
    else if (args[0] === "unsetwelcome") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de supprimer le channel de bienvenue.\nUsage: \`${prefix}unsetwelcome\``)
        
        message.channel.send(e)
    }
    else if (args[0] === "unsetgoodbye") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de supprimer le channel d'aurevoir.\nUsage: \`${prefix}unsetgoodbye\``)
        
        message.channel.send(e)
    }
    else if (args[0] === "unsetgoodbye") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de supprimer le channel d'aurevoir.\nUsage: \`${prefix}unsetgoodbye\``)
        
        message.channel.send(e)
    }
    else if (args[0] === "restart") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de restart le bot.\nUsage: \`${prefix}restart\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "leveling") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de désactiver ou activer le système de niveau.\nUsage: \`${prefix}leveling <active/desactive>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "member-counter") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de désactiver ou activer le compteur de membres.\nUsage: \`${prefix}member-counter <active/desactive>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "support") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'avoir le lien du serveur support du bot.\nUsage: \`${prefix}support\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "warns") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de savoir le nombre d'avertissements de l'utilisateur ou de vous même, ou permet aussi de supprimer les warns de la personne mentionnée.\nUsage: \`${prefix}warns (@member/delete)\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "mp") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'envoyer un message privé via le bot à un membre trouvé avec son ID.\nUsage: \`${prefix}mp <userID> <message>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "vote") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'avoir les liens pour voter pour le bot.\nUsage: \`${prefix}vote\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "lock") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de bloquer le channel d'où à été envoyé le message.\nUsage: \`${prefix}lock\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "unlock") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet de débloquer le channel d'où à été envoyé le message.\nUsage: \`${prefix}unlock\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "avatar") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'avoir votre avatar ou celui des personnes mentionnées.\nUsage: \`${prefix}avatar (@mention)\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "clyde") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'envoyer votre message dans une image avec le bot clyde.\nUsage: \`${prefix}clyde <texte>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "cmd-reload") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet au propriétaire du bot de recharger la commande demandée.\nUsage: \`${prefix}cmd-reload <commande>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "event-reload") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet au propriétaire du bot de recharger l'event demandé.\nUsage: \`${prefix}event-reload <event>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "servers") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet au propriétaire du bot voir la liste des serveurs du bot.\nUsage: \`${prefix}servers\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "qr") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet d'envoyer un QR code avec l'URL ou le texte que vous avez envoyé.\nUsage: \`${prefix}qr <texte>\``)
    
        message.channel.send(e)
    }
    else if (args[0] === "test") {
        const e = new D.MessageEmbed()
        .setTitle(`Commande ${args[0]}`)
        .setColor("#2F3136")
        .setDescription(`Permet au membres du staff du serveur de tester le channel de bienvenue et d'aurevoir.\nUsage: \`${prefix}test <welcome/goodbye>\``)
    
        message.channel.send(e)
    }
    else if (args[0]) {
        const e = new D.MessageEmbed()
        .setTitle(`Erreur`)
        .setColor("RED")
        .setDescription(`La commande \`${args[0]}\` n'existe pas.`)
    
        message.channel.send(e)
    }
    });
}