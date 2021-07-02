import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import MangaCard from "./MangaCard"
import {DebounceInput} from 'react-debounce-input';
import { FaSearch } from "react-icons/fa";
import Navbar from "../Navbar/Navbar"

export default function Store(){
    const [data, setData] = useState([])
    const [categories,setCategories]= useState([])
    const [filteredString, setFilteredString] = useState("")
    const [filteredData, setFilteredData] = useState([])
    useEffect(()=>{
        const promisse = axios.get(`http://localhost:4000/mangasall`)
        promisse.then(promisseData =>{
            setData(promisseData.data)
            filterList("", true, promisseData.data)
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
            filterList("", true, promisseData.data)
        })
    }

    function filterList(e, redoFilter, promisseData){
        if(redoFilter){
            setFilteredData(promisseData.filter(m=> m.name.toLowerCase().includes(filteredString.toLowerCase())))
        }else{
            setFilteredString(e.target.value)
            setFilteredData(data.filter(m=> m.name.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    return(
        <>
        <Navbar store={true}/>
        <Categories>
                <p onClick={()=>loadMangasByCategory("all")}>All</p>
                {categories.map(i=><p key={i.id} onClick={()=>loadMangasByCategory(i.id)}>{i.name}</p>)}
            </Categories>
            <Wrapper>    
                <DebounceInput
                    element={Search}
                    minLength={2}
                    debounceTimeout={300}
                    onChange={e=>filterList(e, false)}
                    placeholder="Filter by name..."
                />
                <FaSearch></FaSearch>
            </Wrapper>
            <Conteiner>
                {filteredData.length ? filteredData.map(m=> <MangaCard key={m.id} mangaInfo={m}></MangaCard>): "Nehum mangá disponível no momento"}
            </Conteiner>
        </>
    )
}

const Conteiner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 15px;
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
const Wrapper = styled.div`
    margin-top: 150px;
    padding: 0 25px;
    display:flex;
    position:relative;
    svg{
        position: absolute;
        right: 35px;
        top:10px;
    }
`
const Search = styled.input`
    width:100%;
    height:35px;
    border-radius: 10px;
    padding: 0 10px;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    ::placeholder{
        color:#a5a5a5;
    }
`