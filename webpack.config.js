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


// import { resolve,dirname } from 'path';
// import webpack from 'webpack';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// // app.use(express.static(__dirname + '/public'));

// export const entry = ['./js/script.js'];
// export const target = 'node';
// export const output = {
//   path: resolve(__dirname, "./public/js/"),
//   filename: "bundle.js"
// };
// export const mode = 'development';
// export const module = {
//   rules: [
//     {
//       test: /\.m?js$/,
//       exclude: /(node_modules|bower_components)/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-env']
//         }
//       }
//     }
//   ]
// };



import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default  {
    entry: path.resolve(__dirname, 'public/js/script.js'),
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js',
    },
    experiments: {
        outputModule: true,
    },
    plugins: [
       //empty pluggins array
    ],
    module: {
         // https://webpack.js.org/loaders/babel-loader/#root
        rules: [
            {
                test: /.m?js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ],
    },
    devtool: 'source-map'
}