# Componente React

* Class Component
** Sintax
import React from "react";
import { Component } from "react";
export default class MyClassComponent extends Component {
    render(){
        return(
            <h1>Teste</h1>
        )
    }
}

* Function Component
import React from "react";
export default function MyFunctionComponent(){
    return(
        <h1>My Function Component</h1>
    )
}

# Propriedade dos Componentes

Propriedade de componentes são análogas aos atributos das tags HTML e têm a função de passar informações para um componente funcionar de forma determinada/diferente e portanto mudar de certa forma o seu comportamento.

Além disso, em React, uma propriedade permite enviar informação de um componente pai para um componente filho. As propriedades recebidas pelo componente filho no componente pai podem ser acessadas no componente filho através de um argumento único do componente, afinal, lembre-se que um componente é uma function! O React coloca todas as propriedades recebidas por um componente dentro deste argumento único, geralmente denominado de props.

# Estado dos Componentes, hook: useState

Por padrão, o React não fica monitorando suas variáveis afim de reconhecer se os seus valores estão sendo alterados para então renderizar esta alteração. Para isso existem estados! Ou seja, ao definirmos um estado e associarmos uma variável a esse estado, toda vez que esta variável for alterada, o componente será renderizado novamente exibindo em tela esta alteração.

let counter = useState(0);

O useState retorna um Array com o valor da variável, counter[0], e uma função que altera o valor desta variável, counter[2].

Utilizando destructuring assignment:

const [counter, setCounter] = useState()

Em resumo: estado de um componente refere-se à variáveis que ao serem alteradas na aplicação resultaram em nova renderização do componente levando em consideração este novo valor. Qualquer outro tipo de varíavel que não é associada a um estado estará disponível somente no JS e não serão refletidas no HTML/interface da aplicação.

# Imutabilidade

Definição: imutabilidade em seu conceito mais simples é algo que não pode ser alterado. No conceito de programação a imutabilidade se aplica normalmente a objetos/variáveis que não podem ter seu estado modificado após serem criados, mas isso não garante que os seus valores serão sempre os mesmos. Por exemplo em Javascript os itens imutáveis podem ser declarados como const (constante) cujo o conteúdo não deve ser alterado (mas pode ser copiado e modificado). Ao tentar redeclarr o valor de uma const, verifica-se o erro: 'TypeError: Assignment to constant variable', que basicamente é um erro referente a não permissão de mudança de valores em uma variável que já possui um valor.
Outro detalhe da const, você não pode criá-la sem definir um valor, pois vai gerar o seguinte erro:

const score; // SyntaxError: Missing initializer in const declaration

É regra básica, não se pode criar constante sem definir seu estado inicial, pois undefined não é uma definição de um bom estado, não é?
Porém, usar const torna qualquer tipo de dado do JavaScript imutável? NÃO!
Somente dados primitivos: String, Number, Date, Boolean, serão imútaveis. Se você usar objeto ou array, facilmente você poderá modificar os atributos internos deles, o que teoricamente deveria ser imútavel também. 

const scores = [];
scores.push(1);
scores.push(3);
scores.push(4);
console.log(scores); /// [1, 3, 4]

Nestes dois cenários, seus atributos internos foram modificados e nenhum erro ocorreu, afinal o const somente torna imútavel as atribuições das variáveis, ou seja, tudo aquilo que for atribuído usando = na inicialização de uma variável.

Ao fazer uso da imutabilidade, opta-se por não mutar variáveis já definidas e sim, criar uma cópia e então modificar esta cópia. Ao criarmos uma nova variável, um novo espaço na memória é reservado e associado ao valor dessa nova variável.

const array [1,2,3,4,5]
const novoArray = [...array, 6,7,8,9,10]

## Imutabilidade vs Estado React (useState):

A função setState não modifica o valor da variável de estado originalmente criada, ele cria uma nova variável (com o mesmo nome porém em outro container da memória) com um novo valor.

# Fast Refresh no Webpack

Ao rodarmos uma aplicação watching somente com o webpack-dev-server, toda vez que faz-se uma mudança no código, a aplicação é renderizada novamente e automaticamente, porém, no seu estado inicial. Ou seja, perde-se qualquer mudança de estado que tenha ocorrido até o momento e a aplicação é renderizada com a nova funcionalidade, porém, no seu estado inicial.

O react-refresh-webpack-plugin (fast refresh) permite alterarmos o código da aplicação e ter esse código com uma eventual nova funcionalidade refletido no browser porém mantendo o estado dos components.

Para isso:

yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh

E no webpack.config.js:

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html') //Qual arquivo de template será utilizado para gerar o HTML da aplicação ("virtual-dom".)
    })
].filter(Boolean)

devServer: {
    static: path.resolve(__dirname, 'public'), //Caminho onde está o html estático da aplicação.
    hot: true
},

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

Nota: adiciona-se a condicional isDevelopment pois queremos esta funcionalidade somente em desenvolvimento, visto que em produção não estaremos mudando o código. Neste caso, quando estivermos no ambiente de produção, isDevelopment irá retornar false e não executará o ReactRefreshWebpackPlugin(). Ou seja:

plugins: [
    false,
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html') //Qual arquivo de template será utilizado para gerar o HTML da aplicação ("virtual-dom".)
    })
]

Como o boolean false não é um plugin do webpack, o código acima daria erro e então, para isso, adiciona-se a funionalidade .filter(Boolean), a qual filtrará o array plugin retornando um array somente com o que for true, que no caso é o plugin HtmlWebpackPlugin. Este último, é necessário e tem a função de criar o arquivo HTML que faz referência ao bundle.js quando executa-se o build da aplicação.

