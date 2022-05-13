const atob = require("atob");

module.exports = (data) => {
    return atob(atob(data));
}
