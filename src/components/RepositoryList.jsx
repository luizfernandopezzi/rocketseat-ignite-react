import React from "react"
import { useEffect, useState } from "react"
import RepositoryItem from "./RepositoryItem"
import '../styles/repositorylist.scss'

export default function RepositoryList(){
    const [ repos, setRepos ] = useState([])

    const getRepos = () => {
        fetch('https://api.github.com/users/luizfernandopezzi/repos')
            .then( res => res.json() )
            .then( data => setRepos(data) )
    }
    
    useEffect(()=>{
        getRepos()
    },[])

    const repositories = [1,2,3]

    return(
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>
            <ul>
                {repositories.map((item, index)=> {
                    return <RepositoryItem key={index} item={item}/>
                })}
            </ul>
        </section>
    )
}