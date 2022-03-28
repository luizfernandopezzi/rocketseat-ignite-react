import React from "react"
import { useEffect, useState } from "react"
import RepositoryItem from "./RepositoryItem"
import '../styles/repositorylist.scss'

interface InterfaceRepository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

export default function RepositoryList(){
    const [data, setData] = useState<InterfaceRepository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const getRepos = () => {
        fetch(`https://api.github.com/users/luizfernandopezzi/repos`)
            .then( response => response.json() )
            .then( data => setData(data) )
            .then( () => setLoading(false) )
            .catch( setError )
    }

    function extractData(repository: InterfaceRepository){
      return (
          {
              id: repository.id,
              name: repository.name,
              description: repository.description,
              url: repository.html_url
          }
      )
    }

    useEffect( () => {
      getRepos()
    }, [] );

    const repos = data.map(extractData)
  
    if(loading) return(<h1>Loading...</h1>);
    if(error) return (<pre>{JSON.stringify(error,null,2)}</pre>);

    return (
      <section className="repository-list">
        <h1>Meus repositórios GitHub</h1>
        <ul>
            {repos.map( (repo) => {
                return <RepositoryItem 
                  key={repo.id}
                  repo={repo}
                />
            })}
        </ul>
      </section>
    )
}