const fs = require("fs");
var path = require('path');

exports.getFileName = (path) => {
    return filePath.split('/').pop().split('.').shift();
}

exports.loadJsons = (folder, root = "..") => {
    const data = {};
    fs.readdirSync(folder).forEach(function (file) {
        data[file.replace(/\.json$/, '')] = require(path.join(root, folder, file));
    });
    return data;
} 