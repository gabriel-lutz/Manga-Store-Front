import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import MangaCard from "./MangaCard"
import Navbar from "../Navbar/Navbar"

export default function Store(){
    const [data, setData] = useState([])
    const [categories,setCategories]= useState([])

    useEffect(()=>{
        const promisse = axios.get(`http://localhost:4000/mangasall`)
        promisse.then(promisseData =>{
            setData(promisseData.data)
        })
        const request = axios.get(`http://localhost:4000/categories`)
        request.then(resp=>{
            setCategories(resp.data)
        })
        request.catch(()=>{
            alert(`algo deu errado`)
        })
    },[])

    function loadMangasByCategory(id){
        const promisse = axios.get(`http://localhost:4000/mangas${id}`)
        promisse.then(promisseData =>{
            setData(promisseData.data)
        })
    }

    return(
        <>
        <Navbar store={true}/>
        <Categories>
                <p onClick={()=>loadMangasByCategory("all")}>All</p>
                {categories.map(i=><p key={i.id} onClick={()=>loadMangasByCategory(i.id)}>{i.name}</p>)}
            </Categories>
            <Conteiner>
                {data.length ? data.map(m=> <MangaCard key={m.id} mangaInfo={m}></MangaCard>): "Nehum mangá disponível no momento"}
            </Conteiner>
        </>
    )
}

const Conteiner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 135px;
    width: 100%;
    padding: 0 10px;
`

const Categories = styled.div`
    background-color: #474747;
    width: 90%;
    height: 30px;
    position:fixed;
    top:100px;
    left:5%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    gap:10px;
    padding:5px 10px;
    box-shadow: 0 0px 10px #474747;
    overflow-x: scroll;
    z-index: 1;
    font-size: 13px;
    color:white;
    &::-webkit-scrollbar{
        display:none;
    }

`