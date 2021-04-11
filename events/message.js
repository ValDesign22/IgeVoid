const Discord = require("discord.js");
const leveling = require("discord-leveling");
const canvacord = require("canvacord");
const Database = require("easy-json-database");

const dbTickets = new Database("./tickets.json");
const dbPrefixs = new Database("./prefixs.json");
const dbWelcome = new Database("./welcome.json");
const dbGoodbye = new Database("./goodbye.json");
const dbRank = new Database("./leveling.json");
const dbMCount = new Database("./memberCount.json");
const dbWarns = new Database("./warns.json");
const dbRanks = new Database("./ranks.json")

module.exports = async (client, message) => {
    //Ignore bots
    if (message.author.bot) return;

    //Ticket mp system
    if(message.channel.type === "dm") {
        return;
    }
    else {
		let prefix = client.config.prefix;
        if (dbPrefixs.has(`prefix_${message.guild.id}`)) {
            prefix = dbPrefixs.get(`prefix_${message.guild.id}`)
        }

        if (dbRank.get(`lvl_${message.guild.id}`) === "on" && message.content.indexOf(prefix) !== 0) {
            const actualXP = dbRanks.get(`xp_${message.author.id}_${message.guild.id}`)

            if (dbRanks.has(`xp_${message.author.id}_${message.guild.id}`)) {
                dbRanks.set(`xp_${message.author.id}_${message.guild.id}`, `${Number(actualXP) + 5}`)
            }
            else {
                dbRanks.set(`xp_${message.author.id}_${message.guild.id}`, `${Number(5)}`)
            }
            
            let mbrLvl = dbRanks.get(`lvl_${message.author.id}_${message.guild.id}`)
            if (dbRanks.has(`lvl_${message.author.id}_${message.guild.id}`)) {
                mbrLvl = dbRanks.get(`lvl_${message.author.id}_${message.guild.id}`)
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

            if (dbRanks.get(`xp_${message.author.id}_${message.guild.id}`) === `${requiredXP}`) {
                dbRanks.set(`xp_${message.author.id}_${message.guild.id}`, `${Number(0)}`);

                const actualLevel = dbRanks.get(`lvl_${message.author.id}_${message.guild.id}`);

                if (dbRanks.has(`lvl_${message.author.id}_${message.guild.id}`)) {
                    dbRanks.set(`lvl_${message.author.id}_${message.guild.id}`, `${Number(actualLevel) + 1}`);
                }
                else {
                    dbRanks.set(`lvl_${message.author.id}_${message.guild.id}`, `${Number(1)}`)
                }

                const memberLevel = dbRanks.get(`lvl_${message.author.id}_${message.guild.id}`);
                const memberXP = dbRanks.get(`xp_${message.author.id}_${message.guild.id}`);
                
                const XP2NextLvl = `${Number(memberLevel) * 100}`

                const rank = new canvacord.Rank()
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
                    const attachment = new Discord.MessageAttachment(data, "newRank.png")
                    message.channel.send(attachment)
                })
            }
        }

        const mentionRegex = new RegExp(`^(<@!?${client.user.id})\\s*`);
        
        if (mentionRegex.test(message.content)) { 
    		const e = new Discord.MessageEmbed()
    		.setColor("#2F3136")
    		.setDescription(`Je suis ${client.user}\nLe prefix du bot sur ce serveur est \`${prefix}\`.\nPour voir la liste de commandes: \`${prefix}help\``)
    
    		message.channel.send(e); 
        }
        
        //Ignore message starting with not prefix
        if (message.content.indexOf(prefix) !== 0) return;
            
        //Define args and command
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
  
        //Get the command
        const cmd = client.commands.get(command);
  
        //If the bot doesn't have the command
        if (!cmd) return;
  
        //Run the command
        cmd.run(client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank, dbMCount, dbWarns, dbRanks);
    }
};