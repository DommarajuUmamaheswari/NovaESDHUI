// import path from 'path';
var path = require('path');

module.exports = {
    mode: 'development',
    devServer: { 
        port: 1234, 
        contentBase: path.join(__dirname, "dist") 
    }
}
