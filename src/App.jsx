import React from "react";
import Counter from "./components/Counter";
import RepositoryList from "./components/RepositoryList";

export default function App(){
    return(
        <>
            <RepositoryList />
            <Counter />
        </>
    )
}