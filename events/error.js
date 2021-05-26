const moment = require("moment");

module.exports = (client, error) => {
    console.log(error.message);
    client.channels.cache.get(client.configs.logsChannel).send(`[${moment(new Date()).locale("fr").format('lll')}] [ERROR] \`\`\`js\n${error.message}\n\`\`\``)
}