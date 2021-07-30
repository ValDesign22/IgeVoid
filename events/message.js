const { MessageEmbed, Collection, MessageAttachment } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const { Rank } = require("canvacord");

const guild = require("../models/guild");
const levels = require("../models/levels");

/* Extends */

require("../Util/ExtendedMessage")

module.exports = async (client, message) => {
    const { author, channel, content, error } = message;
    const { configs, commands, user, aliases, emotes, cooldowns, colors } = client;

    let buttonDeleteMsg = new MessageButton()
    .setStyle("red")
    .setEmoji("🗑️")
    .setID("deleteMsgButton")

    if (author.bot) return;

    if (channel.type === "dm") return;

    /* Prefix */

    client.antispam(message);

    let prefixedb = await guild.findOne({ id: message.guild.id, reason: `prefix` });
    if (!prefixedb) {
        const newGuildDBSave = new guild({
            id: `${message.guild.id}`,
            content: `${configs.prefix}`,
            reason: 'prefix',
        }).save();
    }
        
    let prefixget = await guild.findOne({ id: message.guild.id, reason: `prefix` });

    let prefix = prefixget ? prefixget.content : `${configs.prefix}`;

    /* Language */

    let langDB = await guild.findOne({ id: message.guild.id, reason: `lang` });
    if (!langDB) {
        const newLangDBSave = new guild({
            id: `${message.guild.id}`,
            content: `fr`,
            reason: 'lang',
        }).save();
    }
        
    let langGet = await guild.findOne({ id: message.guild.id, reason: `lang` });

    let lang = langGet ? langGet.content : `fr`;

    message.guild.lang = `${lang}`;
    message.lang = require(`../languages/${lang}.json`);
    message.guild.language = message.lang;

    const mentionRegex = new RegExp(`^(<@!?${user.id})\\s*`);
        
    if (mentionRegex.test(content)) { 
    	const e = new MessageEmbed()
		.setColor(colors.blue)
   		.setDescription(message.lang.regexMention.replace(/{user}/g, user).replace(/{prefix}/g, prefix))
    
   		channel.send({ embed: e, component: buttonDeleteMsg });
    }

    let levelDB = await guild.findOne({ id: message.guild.id, reason: `levels` });

    if (!levelDB) {
        const newLevelDBSave = new guild({
            id: `${message.guild.id}`,
            content: `off`,
            reason: 'levels',
        }).save();
    }

    let levelGet = await guild.findOne({ id: message.guild.id, reason: `levels` });

    let level = levelGet ? levelGet.content : `off`;

    if (level === "on" && content.indexOf(prefix) !== 0) {
        const userdata = await levels.findOne({ sID: message.guild.id, uID: author.id });
        if (userdata) {
            let requiredXP;
            if (userdata.lvl === 0) {
                requiredXP = 100
            }
            else {
                requiredXP = (userdata.lvl * 100);
            }

            if ((userdata.xp + 5) === requiredXP) {
                const lvlUpdate = await levels.findOneAndUpdate({ sID: message.guild.id, uID: author.id }, { $set: { xp: '0', lvl: userdata.lvl + 1, msgCount: userdata.msgCount + 1 } }, { new: true });

                const newUserdata = await levels.findOne({ sID: message.guild.id, uID: author.id });

                const newRequiredXP = ((newUserdata.lvl) * 100);

                const XP2NextLvl = (newRequiredXP - newUserdata.xp);

                const rankCard = new Rank()
                .setAvatar(message.author.displayAvatarURL({ format: "png" }))
                .setCurrentXP(newUserdata.xp)
                .setRequiredXP(Number(newRequiredXP))
                .setLevel(newUserdata.lvl)
                .setStatus(message.author.presence.status)
                .setProgressBar(client.colors.blue, "COLOR")
                .setUsername(message.author.username)
                .setDiscriminator(message.author.discriminator)
                .setRank(Number(XP2NextLvl), "XP Requis: ")
                .build()
        
                .then(data => {
                    const attachment = new MessageAttachment(data, "levelUp.png")
                    message.channel.send(attachment)
                });
            }
            else {
                const xpUpdate = await levels.findOneAndUpdate({ sID: message.guild.id, uID: author.id }, { $set: { xp: `${userdata.xp + 5}`, msgCount: userdata.msgCount + 1 } }, { new: true });
            }
        } else {
            const levelNew = new levels({
                sID: `${message.guild.id}`,
                uID: `${author.id}`,
                xp: 5,
                lvl: 0,
                msgCount: 1
            }).save();
        }
    }

    if (content.indexOf(prefix) !== 0) return;

    const args = content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) return;
    
    const cmd = commands.get(command) || aliases.get(command);

    if (!cmd) {
        error(message.lang.noCommand.replace(/{command}/g, command).replace(/{prefix}/g, prefix), message, client)
    }
    else {
        if (!cooldowns.has(cmd.help.name)) {
            cooldowns.set(cmd.help.name, new Collection())
        }
    
        const tNow = Date.now();
        const tStamps = cooldowns.get(cmd.help.name);
        const cdAmount = (cmd.help.cooldown || 3) * 1000;
    
        if (tStamps.has(author.id)) {
            const cdExpTime = tStamps.get(author.id) + cdAmount;
    
            if (tNow < cdExpTime) {
                tLeft = (cdExpTime - tNow) / 1000;
                return message.reply(message.lang.cooldown.replace(/{tLeft}/g, tLeft.toFixed(0)).replace(/{command}/g, command))
            }
        }
    
        tStamps.set(author.id, tNow);
        setTimeout(() => { tStamps.delete(author.id) }, cdAmount);

	    if (cmd.help.category === "owner" && author.id === configs.ownerID) {
	        cmd.run(client, message, args, prefix);
	    }
	    else if (cmd.help.category === "owner" && author.id !== configs.ownerID) {
	        message.reply(message.lang.ownerOnly);
	    }
	    else if (cmd.help.category !== "owner") {
            cmd.run(client, message, args, prefix);
	    }
    }
}