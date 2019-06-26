module.exports =(env) => {
    return require(`./webpack/webpack.${env}.js`)
}

//https://github.com/wbkd/webpack-starter