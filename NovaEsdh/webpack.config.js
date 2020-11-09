// import path from 'path';
var path = require('path');

module.exports = {
    mode: 'development',
    devServer: { 
        port: 5001, 
        contentBase: path.join(__dirname, "public") 
    }
}
