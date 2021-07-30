const goodbye = require("../models/goodbye");

module.exports = async (client, member) => {
    let goodbyeStat = await goodbye.findOne({ id: member.guild.id, reason: "goodbye" });

    if (!goodbyeStat) {
        const newWlcDBSave = new goodbye({
            id: member.guild.id,
            statut: false,
            content: member.guild.id,
            reason: 'goodbye',
        }).save();
    }

    let goodbyeStatGet = await goodbye.findOne({ id: member.guild.id, reason: "goodbye" });
    let statut = goodbyeStatGet ? goodbyeStatGet.statut : false;

    if (statut === true) {
        const channel = member.guild.channels.cache.get(client.db.get(`gC_${member.guild.id}`))

        if (!channel) return;
    
        let text = `${client.db.get(`gMsg_${member.guild.id}`)}`
        .replace(/{membre}/g, member)
        .replace(/{membreTag}/g, member.user.tag)
        .replace(/{membreName}/g, member.user.username)
        .replace(/{serveur}/g, member.guild.name)
        .replace(/{memberCount}/g, member.guild.members.cache.filter(x => !x.user.bot).size)
        .replace(/{totalMemberCount}/g, member.guild.members.cache.size)
    
        channel.send(text)
    }
    else return;
}