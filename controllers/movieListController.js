const fs = require("fs").promises;
const { EOL } = require("os");

const readData = (file) => {
    return new Promise((resolve, reject) => {
        const movieObj = {};
        fs.readFile(file, "utf-8")
        .then(result => {
            let items = (result.split(EOL));
            for (const iterator of items) {
                let tmp = iterator.split(":");
                movieObj[`${tmp[0]}`] = tmp[1];
            }
            resolve(movieObj);
        })
        .catch(err => reject(err));
    });
}

module.exports = {readData};