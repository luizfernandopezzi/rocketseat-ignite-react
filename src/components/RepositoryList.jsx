import React from "react"
import { useEffect, useState } from "react"
import RepositoryItem from "./RepositoryItem"

export default function RepositoryList(){
    const [ repos, setRepos ] = useState()

    // const getRepos = async() => {
    //     const res = await fetch('https://api.github.com/users/luizfernandopezzi')
    //     const data = await res.json()
    //     setRepos(data)
    //     console.log(data)
    // }
    
    // useEffect(async()=>{
    //     await getRepos()
    // },[])
    
    const reposArr = ['a', 'b', 'c']

    return(
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>
            <ul>
                {reposArr.map((item, index)=>
                    <RepositoryItem key={index} item={item}/>
                )}
            </ul>
        </section>
    )
}