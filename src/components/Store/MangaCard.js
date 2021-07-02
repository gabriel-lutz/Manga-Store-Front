import styled from "styled-components"
import {FaCartPlus, FaPlus, FaTimes,FaCheck} from "react-icons/fa"
import {useContext, useState} from "react"
import UserContext from "../../contexts/UserContext"
import Modal from 'react-modal';
import axios from "axios"

export default function MangaCard({mangaInfo}){
    const [showModal, setShowModal] = useState(false)
    const {id,name, price, categoryName, description, imageUrl} = mangaInfo
    const [showCheck, setShowCheck] = useState(false)

    const {userInfo,cartItens,setCartItens} = useContext(UserContext)
    function addToCart(){
        const config = {headers:{Authorization:`${userInfo.token}`}}
        const promisse = axios.post(`${process.env.REACT_APP_API_BASE_URL}/addproduct/${id}`,{}, config )
        promisse.then(()=>{
            setCartItens(cartItens+1)
            setShowCheck(!showCheck)
            setTimeout(()=>{
                setShowCheck(false)
            }, 2000)
        })
    }

    return(
        <Card>
            <img src={imageUrl} alt={name} onClick={()=>{setShowModal(true)}}></img>
            <Modal isOpen={showModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    ariaHideApp={false}>
                <ModalContent>
                    <Wrapper>
                        <img src={imageUrl} alt={name} onClick={()=>{setShowModal(true)}}></img>
                        <ModalInfo>
                                <FaTimes onClick={()=>{setShowModal(false)}}></FaTimes>
                                <p>{name}</p>
                                <p>Categoria: {categoryName}</p>
                                <PricePlus>
                                    {showCheck
                                        ? <FaCheck></FaCheck>
                                        :<FaCartPlus onClick={addToCart}></FaCartPlus>
                                    }
                                    <p>{(price/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>
                                </PricePlus>
                        </ModalInfo>
                    </Wrapper>
                <p>Sinopse: "{description}"</p>
                </ModalContent>
            </Modal>
            <OpenInfo onClick={()=>{setShowModal(true)}}>
                <FaPlus></FaPlus>
                <p>Informações</p>
            </OpenInfo>
            <CardInfo>
                <p>{name}</p>
                <PricePlus>
                    {showCheck
                        ? <FaCheck></FaCheck>
                        :<FaCartPlus onClick={addToCart}></FaCartPlus>
                    }
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
    width: 130px;
    margin: 10px;
    position: relative;
    border-radius: 5px;
    img{
        height: 190px;
    }
`

const OpenInfo = styled.div`
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
    svg{
        margin-right: 5px;
    }
`

const CardInfo = styled.div`
    width:100%;
    display:flex;
    flex-direction: column;
    padding: 0 5px;
    word-break: break-all;
    font-size: 14px;
    p{
        margin: 5px 0;
    }
`

const PricePlus = styled.div`
    display: flex;
    svg{
        font-size: 22px;
        margin-right: 10px;
    }
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    &>p:last-child{
        color:white;
        word-break:break-word;
        text-align: justify;
        margin-top: 10px;
        border-top:1px solid white;
        padding-top: 10px;
    }
`

const ModalInfo = styled.div`
    width: 100%;
    padding-left: 10px;
    position: relative;
    color: white;
    & > p:nth-child(2){
        margin-top: 0;
        padding-right: 50px;
        word-break:break-word;
        font-size:24px;
    }
    p{
        margin: 10px 0;
    }
    &>svg:nth-child(1){
        position: absolute;
        right: 10px;
        top: 0px;
        font-size: 22px;
    }
    div:last-child{
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
    }
`

const Wrapper = styled.div`
    display:flex;
    img{
        height:200px;
    }
`