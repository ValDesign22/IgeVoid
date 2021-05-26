const { MessageEmbed, MessageAttachment, Collection } = require("discord.js");
const { Rank } = require("canvacord");

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    let prefix = client.configs.prefix;
    if (client.db.has(`prefix_${message.guild.id}`)) {
        prefix = client.db.get(`prefix_${message.guild.id}`)
    }

    const mentionRegex = new RegExp(`^(<@!?${client.user.id})\\s*`);
        
    if (mentionRegex.test(message.content)) { 
    	const e = new MessageEmbed()
		.setColor("#2F3136")
   		.setDescription(`Je suis ${client.user}\nLe prefix du bot sur ce serveur est \`${prefix}\`.\nPour voir la liste de commandes fais \`${prefix}help\`.`)
    
   		message.channel.send(e); 
    }

    if (client.ranks.get(`lvl_${message.guild.id}`) === "on" && message.content.indexOf(prefix) !== 0) {
        const actualXP = client.ranks.get(`xp_${message.author.id}_${message.guild.id}`);

        if (client.ranks.has(`xp_${message.author.id}_${message.guild.id}`)) {
            client.ranks.set(`xp_${message.author.id}_${message.guild.id}`, `${Number(actualXP) + 5}`)
        }
        else {
            client.ranks.set(`xp_${message.author.id}_${message.guild.id}`, `${Number(5)}`)
        }

        let mbrLvl = client.ranks.get(`lvl_${message.author.id}_${message.guild.id}`)
        if (client.ranks.has(`lvl_${message.author.id}_${message.guild.id}`)) {
            mbrLvl = client.ranks.get(`lvl_${message.author.id}_${message.guild.id}`)
        }
        else {
            mbrLvl = Number(1)
        }

        let requiredXP
        if (mbrLvl === `${Number(1)}`) {
            requiredXP = Number(100)
        }
        else {
            requiredXP = `${Number(mbrLvl) * 100}`
        }

        if (client.ranks.get(`xp_${message.author.id}_${message.guild.id}`) === `${requiredXP}`) {
            client.ranks.set(`xp_${message.author.id}_${message.guild.id}`, `${Number(0)}`);

            const actualLevel = client.ranks.get(`lvl_${message.author.id}_${message.guild.id}`);

            if (client.ranks.has(`lvl_${message.author.id}_${message.guild.id}`)) {
                client.ranks.set(`lvl_${message.author.id}_${message.guild.id}`, `${Number(actualLevel) + 1}`);
            }
            else {
                client.ranks.set(`lvl_${message.author.id}_${message.guild.id}`, `${Number(1)}`)
            }

            const memberLevel = client.ranks.get(`lvl_${message.author.id}_${message.guild.id}`);
            const memberXP = client.ranks.get(`xp_${message.author.id}_${message.guild.id}`);
            
            const XP2NextLvl = `${Number(memberLevel) * 100}`

            const rank = new Rank()
            .setAvatar(message.author.displayAvatarURL({dynamic: false, format: "png"}))
            .setCurrentXP(Number(memberXP))
            .setRequiredXP(Number(XP2NextLvl))
            .setBackground("COLOR", "#1781b5")
            .setRank(Number(XP2NextLvl) - memberXP, "XP Requis: ")
            .setLevel(Number(memberLevel), "Level: ")
            .setStatus(message.author.presence.status)
            .setProgressBar("#195080", "COLOR")
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)

            rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "newRank.png")
                message.channel.send(attachment)
            })
        }
    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    const cmd = client.commands.get(command) || client.aliases.get(command);

    if (!client.cooldowns.has(cmd.help.name)) {
        client.cooldowns.set(cmd.help.name, new Collection())
    }

    const tNow = Date.now();
    const tStamps = client.cooldowns.get(cmd.help.name);
    const cdAmount = (cmd.help.cooldown || 3) * 1000;

    if (tStamps.has(message.author.id)) {
        const cdExpTime = tStamps.get(message.author.id) + cdAmount;

        if (tNow < cdExpTime) {
            tLeft = (cdExpTime - tNow) / 1000;
            return message.reply(`Attends encore ${tLeft.toFixed(0)} secondes avant de réutiliser la commande \`${command}\`.`)
        }
    }

    tStamps.set(message.author.id, tNow);
    setTimeout(() => { tStamps.delete(message.author.id) }, cdAmount);

    //If the bot doesn't have the command
    if (!cmd) {
        const e = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription(`Je ne possède pas la commande \`${command}\`, merci de regarder le \`${prefix}help\` correctement pour pouvoir utiliser la commande demandée.`)

        message.channel.send(e)
    }
    else {
        //Run the command
        cmd.run(client, message, args, prefix);
    }
}
