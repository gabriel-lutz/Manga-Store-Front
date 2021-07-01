import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import MangaCard from "./MangaCard"


export default function Store(){
    const [data, setData] = useState([])

    useEffect(()=>{
        const promisse = axios.get("http://localhost:4000/allmangas")
        promisse.then(promisseData =>{
            setData(promisseData.data)
        })
    },[])
    return(
        <Conteiner>
            {data.length ? data.map(m=> <MangaCard key={m.id} mangaInfo={m}></MangaCard>): "Nehum mangá disponível no momento"}
        </Conteiner>
    )
}

const Conteiner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 100px;
    width: 100%;
    padding: 0 10px;
`