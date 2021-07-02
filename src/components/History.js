import axios from "axios"
import {useContext, useEffect, useState} from "react"
import UserContext from "../contexts/UserContext"
import styled from "styled-components"
import Navbar from "./Navbar/Navbar"
import HistoryCard from "./HistoryCard"

export default function History(){
    const {userInfo} = useContext(UserContext)
    const [historyData, setHistoryData] = useState()

    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get("http://localhost:4000/history", config)
        promisse.then(data=>{
            setHistoryData(data.data)
        })
    }, [userInfo.token])
    return(
        <Conteiner>
            <Navbar store={false}></Navbar>
            <h1>SALE HISTORY</h1>
            {historyData?.length ? historyData.map((h, i) => <HistoryCard key={i} historyEvent={h}/>) : <p>"nenhuma compra ainda"</p> }
        </Conteiner>
    )

}

const Conteiner = styled.div`
    margin-top: 125px;
    padding: 0 25px;
    
    &>h1{
        font-family: 'Fredericka the Great', cursive;
        font-size: 25px;
        text-align: center;
        margin-bottom: 20px;
    }
`