import reactServerregister from 'react-server-dom-webpack/node-register'
reactServerregister();

import babelRegister from '@babel/register'
babelRegister({
    ignore: [/[\\\/](dist|server|node_modules)[\\\/]/],
    plugins: ["@babel/transform-modules-module"]
})

import "./server"