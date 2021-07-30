module.exports = async (client, user) => {
    if (client.dashDB.has(`${user.id}`)) return;
    console.log(`${user.username} just logged into the dashboard`);
    client.dashDB.set(`${user.id}`, true)
}