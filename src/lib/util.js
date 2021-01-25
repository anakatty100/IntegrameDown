const fs = require("fs-extra");

module.exports = {
    async deleteLocalFile(path) {
        try {
            await fs.unlink(path);
        } catch (e) {
            console.log(e);
        }
    },
};