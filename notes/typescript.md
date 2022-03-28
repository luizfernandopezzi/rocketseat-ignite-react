# Typescript

Typescript é um superset javascript, ou seja, 'é uma linguagem javascript com funcionalidades adicionais de tipagem de variáveis'.

## Configurando Typescript no React

Instala-se typescript e inicializa-se typescript através do arquivo tsconfig.json.

yarn add typescript -D
yarn tsc --init

Configurar o arquivo tsconfig.json:

{
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "jsx": "react-jsx",
    "noEmit": true,
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
  },
  "include": ["src"]
}

É necessário configurar o webpack.config.js pois até então configuramos o babel-loader para interpretação dos arquivos .jsx mas este, não interpreta typescrtip. Assim:

yarn add @babel/preset-typescript -D

E no arquivo babel.config.js:

module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
    ]
}

E no webpack.config.js:

...
entry: path.resolve(__dirname, 'src', 'index.tsx'),
...
resolve: { //Por padrão o webpack lê apenas os arquivos .js. Aqui, define-se que ele também deve ler a extensão .jsx.
    extensions: ['.js', '.jsx', 'ts', 'tsx']
},
...
module: { //Congirações d webpack responsáveis por determinar como nossa aplicação vai se comportar ao importarmos cada tipo de arquivo (.js, .jpeg, .png, .css, etc...).
    rules: [
        {
            test: /\. (j|t)sx$/, //Recebe uma expressão regular para avaliar se o arquivo é .js, devolvendo true ou fales.
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
...

Por fim:

yarn add @types/react-dom -D