import styled from "styled-components"
import {FaCartPlus, FaPlus} from "react-icons/fa"
import { useState } from "react"

export default function MangaCard({mangaInfo}){
    const [showModal, setShowModal] = useState(false)
    const {name, price, categoryName, description, imageUrl} = mangaInfo
    return(
        <Card>
            <img src={imageUrl}></img>
            <OpenInfo>
                <FaPlus></FaPlus>
                <p>Informações</p>
            </OpenInfo>
            <CardInfo>
                <p>{name}</p>
                <p>Categoria: {categoryName}</p>
                <PricePlus>
                    <FaCartPlus></FaCartPlus>
                    <p>{(price/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>
                </PricePlus>
            </CardInfo>
        </Card>
    )
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    width: 175px;
    margin: 20px;
    position: relative;
    border-radius: 5px;
    img{
        height: 250px;
    }
    &:hover div:nth-child(2){
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height:20px;
        background: white;
        position: absolute;
        border-bottom-right-radius: 5px;
        top: 0;
        left: 0;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        font-size: 12px;
        transition: .2s ;
    }
`

const OpenInfo = styled.div`
        width: 0px;
        height:0px;
        font-size: 0;
        svg{
            margin-right: 5px;
        }
`

const CardInfo = styled.div`
    width:200px;
    display:flex;
    flex-direction: column;
    padding: 0 5px;
    p{
        margin: 5px 0;
    }
`

const PricePlus = styled.div`
    display: flex;
    svg{
        font-size: 22px;;
        margin-right: 10px;
    }
`