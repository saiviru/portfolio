// const path = require('path');
// var webpack = require('webpack');
// module.exports =  {
//  "mode": "none",
//  "entry": "./js/script.js",
//  "devtools": 'eval-source-map',
//  "output": {
//    "path": __dirname ,
//    "filename": "bundle.js"
//  },
//  module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
// devServer: {
//    contentBase: path.join(__dirname, './')
//  }
// }


var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./js/script.js','./server.js'],
  target: 'node',
  output: {
    path:  path.resolve(__dirname,"./"),
    filename: "bundle.js"
  },
  mode: 'development',
//   inline-source-map: true,
module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
};