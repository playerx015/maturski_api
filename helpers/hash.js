const crypto = require('crypto');

module.exports = ime => {
    const sha256Hasher = crypto.createHmac("sha256", process.env.HASH_SECRET);
    return sha256Hasher.update(ime).digest("hex");
}
