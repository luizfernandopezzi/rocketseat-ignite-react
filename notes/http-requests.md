# Hook useState

O hook useState recebe dois parâemtros:

O primeiro é uma função callback que é executada toda vez que alguma coisa acontece.
O segundo é um array de dependências. Caso este array seja um array vazio, a funçao callback é executada somente uma vez, quando o componente é executado/renderizado pela primeira vez. Caso este array receba variáveis como dependências, toda vez que o valor de alguma dessas variáveis mudar, a função callback sera executada novamente.

useState( () => {},[] )