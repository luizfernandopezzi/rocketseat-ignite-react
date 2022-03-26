import React from "react";

export default function RepositoryItem( props ){
    return(
        <li>
            <strong>{props.item}</strong>
            <p>Stack</p>
            <a href="">Link</a>
        </li>
    )
}