const btoa = require("btoa");

module.exports = (data) => {
    return btoa(btoa(data));
}
