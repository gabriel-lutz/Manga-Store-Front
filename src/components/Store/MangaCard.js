import styled from "styled-components"
import {FaCartPlus, FaPlus, FaTimes} from "react-icons/fa"
import { useState } from "react"
import Modal from 'react-modal';

export default function MangaCard({mangaInfo}){
    const [showModal, setShowModal] = useState(false)
    const {name, price, categoryName, description, imageUrl} = mangaInfo
    return(
        <Card>
            <img src={imageUrl} alt={name} onClick={()=>{setShowModal(true)}}></img>
            <Modal isOpen={showModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    ariaHideApp={false}>
                <ModalContent>
                    <img src={imageUrl} alt={name} onClick={()=>{setShowModal(true)}}></img>
                    <ModalInfo>
                        <FaTimes onClick={()=>{setShowModal(false)}}></FaTimes>
                        <p>{name}</p>
                        <p>{description}</p>
                        <p>Categoria: {categoryName}</p>
                        <PricePlus>
                            <FaCartPlus></FaCartPlus>
                            <p>{(price/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>
                        </PricePlus>
                    </ModalInfo>
                </ModalContent>
            </Modal>
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
    width: 125px;
    margin: 20px;
    position: relative;
    border-radius: 5px;
    img{
        height: 175px;
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
    word-break: break-all;
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

const ModalContent = styled.div`
    width:100%;
    display: flex;
    height: 100%;
    padding: 10px;
    img{
        height:100%;
    }
`

const ModalInfo = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 10px;
    position: relative;
    color: white;
    & > p:nth-child(2){
        font-size:24px;
    }
    p{
        margin: 10px 0;
    }
    &>svg:nth-child(1){
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 22px;
    }
    div:last-child{
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
    }
`