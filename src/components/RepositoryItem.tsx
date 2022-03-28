import React from "react";

// A interface das props será: o que tem dentro de props? O que eu espero receber de props? Recebe-se como prop repo={repo} onde repo é um objeto {id..., name..., description..., url}.
interface RepositoryItemProps {
    repo: {
        id: number;
        name: string;
        description: string;
        url: string;
    }
}

export default function RepositoryItem( {repo}: RepositoryItemProps ){
    return(
        <li>
            <strong>{repo.name}</strong>
            <p>{repo.description}</p>
            <a href={repo.url}>Link</a>
        </li>
    )
}