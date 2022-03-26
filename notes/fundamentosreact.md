# React é uma biblioteca de construção de interfaces e SPA;
# Através do conceito de componetização permite que seja renderizado/recarregado na interface apenas o que é necessário. Sem o React, todo HTML, CSS e JS são recarregados novamente em qualquer atualização da interface ou mudança de rota.

# React-dom: biblioteca utilizada para trabalhar com o React na web. Permite que o React comunique-se com o DOM (objeto JavaScript representando a árvore de elementos HTML). Para mobile, utiliza-se o react-native.

# Configurando Babel: tratando-se de React, seu principal papel é traduzir o JSX para JS, para posterior renderição do HTML. Além disso, converte os mais novos métodos e funções e ferramentas (que ainda não sao compreendidas por todos os anvegadores) das bibliotecas/frameworks para JS padrão/nativo que todos os navegadores conseguem ler e renderizar.

@babel/core = biblioteca do babel;
@babel/cli = responsável por permitir rodar o Babel na linha de comando;
@babel/preset-env: responsável por identificar em qual ambiente a aplicação está sendo executada para assim otimizar a transcrição do código e suas funcionalidades mais modernas para código compreendível pelo cliente final (node ou browser por exemplo);
@babel/preset-react: responsável por transcrever o código React/JSX.

Deve-se criar o arquivo babel.config.js.

## Babel and Refactoring Elements Using JSX
yarn add @babel/preset-react

The structure below is used to render contents through HTML TAGS to the DOM using React. It works fine for small pages/apps. So, this works, but this is a whole lot of nesting. Consider a time where you're building an actual entire page. You're building divs and headings, and lists, and things like this. That's a lot of nesting and that's going to be prone to a lot of errors. So, now is a really good time to incorporate JSX.

ReactDOM.render(
    React.createElement(
        React.createElement("h1", {style: { color: "blue" } }, "Hello World")
    ),
    document.getElementById('root')
);

* JSX or JavaScript as XML, is a language extension that allows you to write tags directly in JavaScript. It doesn't run in the browser natively. Babel is the tool that's working behind the scenes. Now, if you're curious about how Babel works, you can take a look at the https://babeljs.io compiler page. So, Babel is this incredibly useful tool that you'll find in a ton of different JavaScript projects. And if you're writing JSX or you're writing some sort of new JavaScript syntax that isn't supported by the execution enviroment (browser mostly). Babel will do the hard work of compiling your code behind the scenes:

JSX:

ReactDOM.render(
  <ul>
    <li>Monday</li>
    <li>Tuesday</li>
    <li>Wednesday</li>
  </ul>,
  document.getElementById('root')
);

Babel:

function App() {
  return 
    /*#__PURE__*/_react["default"].createElement("ul", null, 
        /*#__PURE__*/_react["default"].createElement("li", null, "Monday"), 
        /*#__PURE__*/_react["default"].createElement("li", null, "Tuesday"), 
        /*#__PURE__*/_react["default"].createElement("li", null, "Wednesday")
    )
}

# Configurando Webpack: nativamente, já é possível trabalhar com JS em módulos/packages/bibliotecas através do import/export. O webpack permite que sejam importados outras extensões de arquivos: css, jpeg, png, sass... o webpack estipula uma série de configurações (loaders) que converte estes arquivos em arquivos compreedíveis pelo browser.

yarn add
webpack
webpack-cli
webpack-dev-server

Deve-se criar o arquivo webpack.config.js:

module.exports: {
    entry: 'src/index.jsx', //Qual é o arquivo principal/incial da aplicação
}

//Cada sistema operacional possui uma maneira de indicar diretórios, exemplo:
//Linux: src/index.jsx
//Windows: src\indes.jsx
//Por isso, é uma boa prática trabalhar com a biblioteca path, que soluciona este tipo de divergência.
//O import do módulo path é feito através do require pois o webpack roda dentro do node, e o node só entende a importação através do método require.
//Nota: __dirname sempre refere-se ao diretório do arquivo no qual está sendo chamado.

const path = require('path')

module.exports: {
    entry: path.resolve(__dirname, 'src', 'indes.jsx'), //Qual é o arquivo principal/incial da aplicação.
}

Preenchendo o webpack.config.js:

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'indes.jsx'), //Qual é o arquivo principal/incial da aplicação.
    output: { //Define-se o diretório de saída do build do webpack.
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: { //Por padrão o webpack lê apenas os arquivos .js. Aqui, define-se que ele também deve ler a extensão .jsx.
        extensions: ['.js', '.jsx']
    },
    module: { //Congirações responsáveis por determinar como nossa aplicação vai se comportar ao importarmos cada tipo de arquivo (.js, .jpeg, .png, .css, etc...).
        rules: [
            {
                test: /\.jsx$/, //Recebe uma expressão regular para avaliar se o arquivo é .js, devolvendo true ou fales.
                exclude: /node_modules/, //A responsabilidade de conversão/build dos arquivos das biblitocas é de responsabilidade das próprias bibliotecas.
                use: 'babel-loader' //yarn add babel-loader: integração entre Babel e Webpack. O webpack identifica que precisa importar determinado tipo de arquivo (.jsx por exemplo), e através do babel-loader sabe que tem que usar o babel para converter o arquivo de maneira compreedível para o browser.
            }
        ]
    }
}

Exemplo prático:

Arquivo exemplo2.jsx:
import React from "react";
export default function App(){
    return(
        <h1>Hello World!</h1>
    )
}

Arquivo index.jsx:
import React from "react";
import App from "../exemplos/exemplo2"

Ao rodar o comando yarn webpack cria-se o arquivo bundle.js em /dist. Este arquivo agora contém tudo o que é necessário do React e do App (todos os arquivos importados no index.jsx até então) para rodar no browser:

/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var t={418:t=>{var e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function n(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(t){o[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(t){return!1}}()?Object.assign:function(t,a){for(var i,c,p=n(t),s=1;s<arguments.length;s++){for(var u in i=Object(arguments[s]))r.call(i,u)&&(p[u]=i[u]);if(e){c=e(i);for(var f=0;f<c.length;f++)o.call(i,c[f])&&(p[c[f]]=i[c[f]])}}return p}},408:(t,e,r)=>{var o=r(418);if("function"==typeof Symbol&&Symbol.for){var n=Symbol.for;n("react.element"),n("react.portal"),n("react.fragment"),n("react.strict_mode"),n("react.profiler"),n("react.provider"),n("react.context"),n("react.forward_ref"),n("react.suspense"),n("react.memo"),n("react.lazy")}"function"==typeof Symbol&&Symbol.iterator;function a(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var i={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},c={};function p(t,e,r){this.props=t,this.context=e,this.refs=c,this.updater=r||i}function s(){}function u(t,e,r){this.props=t,this.context=e,this.refs=c,this.updater=r||i}p.prototype.isReactComponent={},p.prototype.setState=function(t,e){if("object"!=typeof t&&"function"!=typeof t&&null!=t)throw Error(a(85));this.updater.enqueueSetState(this,t,e,"setState")},p.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},s.prototype=p.prototype;var f=u.prototype=new s;f.constructor=u,o(f,p.prototype),f.isPureReactComponent=!0;Object.prototype.hasOwnProperty},294:(t,e,r)=>{r(408)}},e={};!function r(o){var n=e[o];if(void 0!==n)return n.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,r),a.exports}(294)})();

# Estrutura do ReactJS

O React é uma biblioteca que cria toda a interface da aplicação através do JS/JSX. A interface da aplicação é transcrita em HTML de fato através da funcionalidade render do react-dom, responsável por criar o virtual-dom contendo o código HTML gerado a partir do código JSX (quem faz a transcrição de JSX para JS é o Babel).

A função render() recebe dois parâmetros: o que se quer exibir em tela e dentro de qual elemento quer-se renderizar esta informação. Em index.jsx:

import React from "react";
import { render } from "react-dom";
render(<h1>Teste</h1>, document.getElementById('root'))

# Servindo HTML estático

Até agora o HTML do projeto está com uma tag <script src='dist/bundle.js'><script>. Lembrando que o arquivo bundle.js é criado através do webpack, o qual converte (com ajuda do Babel) todos os arquivos presentes direta e indiretamente no index.jsx (entry do webpack.config.js), ou seja, através do Babel e Webpack, cria-se o arquivo bundle.js que contém todas as bibliotecas utilizadas, arquivos utilizados e código JS e JSX em uma só arquivo JS. Este arquivo contendo todo o código da aplicação é injetado no HTML através do <script>.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Github Explorer</title>
</head>
<body>
    <div id="root"></div>
    <script src='dist/bundle.js'><script>
</body>
</html>

yarn add html-webpack-plugin -D

Através do html-webpack-plugin o arquivo bundle é injetado no HTML sem a necessidade de incluir a tag <scipt>. Para isso, em webpack.config.js:

yarn add html-webpack-plugin

const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html') //Qual arquivo de template será utilizado para gerar o HTML da aplicação ("virtual-dom".)
        })
],

Assim, ao rodar o yarn webpack e realizar o build da aplicação, cria-se também um arquivo html no diretório /dist.

# Webpack Dev Server

Até o momento, precisamos rodar o yarn webpack e fazer o build/conversão da aplicação para qualquer mudança realizada no código. Através do webpack-dev-server faz-se com que o webpack fique observando os arquivos da pasta /src, e desta maneira, sempre que houver uma alteração, o webpack cria o bundle automaticamente. Para isso:

    yarn add webpack-dev-server -D

E no arquivo webpack.config.js:

    devServer: {
        contentBase: path.resolve(__dirname, 'public') //Caminho onde está o html estático da aplicação.
    },

E no terminal:

  yarn webpack serve

# Utilizando source map

Configuração do webpack que é basicamente uma forma de conseguir visualizar o código original da aplicação mesmo quando o código da aplicação está convertido e embaralhado no arquivo bundle.js (criado pelo webpack e babel). Assim, ao acessar os logs de erro/etc no console/brownser, os arquivos e códigos exibidos são iguais aos arquivos do projeto React, ou seja, entre outros, mostra o JSX e não o JS convertido do Babel, pro exemplo. Facilita muito o processo de debug.

Para isso, configurar no webpack.config.js:

devTools: 'eval-source-map', //Webpack-dev-server para ambiente de desenvolvimento.

# Ambiente dev e produção

Configurando o ambiente do webpack tanto para desenvolvimento quanto para produção. 
Nota: variáveis de ambiente, dentro de códigos JS, são variáveis para configurar algo de acordo com o ambiente de execução da aplicação. A variável de ambiente NODE_ENV é utilizada para identificar se o ambiente de trabalho é de desenvolvimento ou de produção e pode ser criada pelo desenvolvedor.
No arquivo webpack.config.js:

...
const isDevelopment = process.env.NODE_ENV !== 'production';
module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devTools: isDevelopment ? 'eval-source-map' : 'source-map',
...}

Para criar a variável de ambiente, no Linux ou Mac, basta executar no terminal:

NODE_ENV=production webpack

No Windows, é necessário instalar a dependência cross-env, a qual permite definir variáveis de ambiente para qualquer sistema operacional. Como os comandos para executar a aplicação começam a ser extensos, cria-se scripts no arquivo package.json.

yarn add cross-env -D

"scripts": {
  "dev": "webpack serve", //Aqui não faz-se necessário especificar o NODE_ENV pois em webpack.config.js definiu-se que as configurações de desenvolvimento do webpack serão utilizadas caso NODE_ENV !== 'production'. Neste caso, como não se define NODE_ENV, ela é diferente de 'production' e as configurações do ambiente de desenvolvimento serão utilizadas.
  "build": "cross-env NODE_ENV=production webpack" //Aqui não utiliza-se o serve pois estamos rodando o build da aplicação e portanto, não queremos ficar escutando/watching mudanças em nenhum arquivo.
}

# Importando arquivos CSS

Em React, Vue, etc... os arquicos CSS, imagens, etc. são importados para dentro dos componentes JS/JSX. Como CSS e imagens, por exemplo, não são JavaScript, para criação do bundle, o webpack precisa reconher e ler/compreender estes arquivos e posteriormente, converter para JS e então ser renderizada a aplicação. Para isso, vimos que podemos configurar rules para o webpack.config.js.

Para os arquivos CSS instala-se:

yarn add style-loader css-loader -D

E então:

  module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }

Nota: os estilos css são introduzidos em uma tag <style> no html do build.

# Utilizando SASS

Para utilizar o pre processador de css SASS é necessário instalar o sass-loader do webpack para interpretar código SASS. 

yarn add node-sass
yarn add sass-loader

Em webpack.config.js substituíse a rule de .css para .scss:

  {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }