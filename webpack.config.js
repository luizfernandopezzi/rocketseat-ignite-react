//Cada sistema operacional possui uma maneira de indicar diretórios, exemplo:
//Linux: src/index.jsx
//Windows: src\indes.jsx
//Por isso, é uma boa prática trabalhar com a biblioteca path, que soluciona este tipo de divergência.
//O import do módulo path é feito através do require pois o webpack roda dentro do node, e o node só entende a importação através do método require.
//Nota: __dirname sempre refere-se ao diretório do arquivo no qual está sendo chamado.

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'), //Qual é o arquivo principal/incial da aplicação.
    output: { //Define-se o diretório de saída do build do webpack.
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: { //Por padrão o webpack lê apenas os arquivos .js. Aqui, define-se que ele também deve ler a extensão .jsx.
        extensions: ['.js', '.jsx']
    },
    devServer: {
        static: path.resolve(__dirname, 'public'), //Caminho onde está o html estático da aplicação.
        hot: true
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html') //Qual arquivo de template será utilizado para gerar o HTML da aplicação ("virtual-dom".)
        })
    ].filter(Boolean),
    module: { //Congirações d webpack responsáveis por determinar como nossa aplicação vai se comportar ao importarmos cada tipo de arquivo (.js, .jpeg, .png, .css, etc...).
        rules: [
            {
                test: /\.jsx$/, //Recebe uma expressão regular para avaliar se o arquivo é .js, devolvendo true ou fales.
                exclude: /node_modules/, //A responsabilidade de conversão/build dos arquivos das biblitocas é de responsabilidade das próprias bibliotecas.
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                } //yarn add babel-loader: integração entre Babel e Webpack. O webpack identifica que precisa importar determinado tipo de arquivo (.jsx por exemplo), e através do babel-loader sabe que tem que usar o babel para converter o arquivo de maneira compreedível para o browser.
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}