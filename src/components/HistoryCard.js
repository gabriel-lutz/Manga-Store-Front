import styled from "styled-components"
import dayjs from "dayjs"
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import HistoryMangaCard from "./HistoryMangaCard"

export default function HistoryCard({historyEvent}){
    const date = historyEvent[0].saleDate
    const price = historyEvent[0].total
    const [show, setShow] = useState(false)
    
    function display(){
        setShow(!show)
    }
    return(
        
        <Conteiner onClick={display}>
            <p>Sale date: {dayjs(date).format('DD/MM/YYYY')} - {(price/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>
            {show
                ?<FaChevronUp></FaChevronUp>
                :<FaChevronDown></FaChevronDown>
            }
            {show
                ?historyEvent.map((h, i)=><HistoryMangaCard key={i} manga={h}/>)
                : ""
            }
        </Conteiner>

    )
}

const Conteiner = styled.div`
    width: 100%;
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: white;
    position: relative;
    margin-bottom: 20px;
    border-radius: 10px;
    svg{
        position: absolute;
        right: 10px;
        top: 10px;
    }

`