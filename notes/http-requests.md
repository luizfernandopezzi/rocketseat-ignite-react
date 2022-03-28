# Hook useEffect

O hook useEffect recebe dois parâmetros:

O primeiro é uma função callback que é executada toda vez que alguma coisa acontece.
O segundo é um array de dependências. Caso este array seja um array vazio, a funçao callback é executada somente uma vez, quando o componente é executado/renderizado pela primeira vez. Caso este array receba variáveis como dependências, toda vez que o valor de alguma dessas variáveis mudar, a função callback sera executada novamente.

useEffect( () => {},[] )

Nota: ao renderizar uma componente pela primeira vez, todo o código em seu interior será executado, inclusive o código da função callback do hook useEffect. Caso o array de dependências do useEffect esteja vazio, essa função callback só é executada essa única vez! Ou seja, em todas as futuras renderizações do componente, essa função callback não é mais executada. Tomemos como exemplo o código abaixo:

...
const [ repos, setRepos ] = useState([])
const getRepos = () => {
    fetch('https://api.github.com/users/luizfernandopezzi/repos')
        .then( res => res.json() )
        .then( data => setRepos(data) )
}

useEffect(()=>{
    getRepos()
},[])
console.log(repos)
...

Quando o componente for renderizado pela primeira vez em tela, a função callback do useEffect faz com que a função getRepos() seja executada e o console.log(repos) retorna [] visto que é o valor inicial definido para a variável repos através do useState. A execução da função getRepos realiza um fetch, que quando finalizado altera o estado do componente, através do setRepos e alterando o valor da constante repos. Sabe-se que quando o estado de um componente é alterado, o componente é renderizado novamente e por isso o console.log(repos) agora retorna a data do fetch. Note que nessa renderização, a função callback do useEffect não é executada novamente e um novo fetch não é realizado pois o array de dependências está vazio.

OBS: alterações nas propriedades dos componentes (passadas pelos componentes pais) também resultam em nova renderização do componente.

