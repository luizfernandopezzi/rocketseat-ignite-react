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