import styled from "styled-components"
import {useState, useContext, useEffect} from "react"
import UserContext from "../contexts/UserContext"
import axios from "axios"
import {useHistory} from "react-router-dom"

import CartItem from "./CartItem"
import Navbar from "./Navbar/Navbar"

export default function Cart() {
    const {userInfo} = useContext(UserContext)
    const [userCart,setUserCart]=useState([])
    const history = useHistory()

    useEffect(()=>{
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
        }}
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart`,config).then((r)=>{
            setUserCart(r.data)
        }).catch((e)=>{
            alert("could not connect to server")
        })
    },[userInfo.token])

    function removeFromCart(cartId,name){
        if(!window.confirm(`Confirm removing ${name} from cart?`)){return}
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
        }}
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart${cartId}`,config).then((r)=>{
            setUserCart(userCart.filter(i=> i.cartId===cartId? false:true))
        }).catch((e)=>{
            alert("could not connect to server")
        })
    }   

    return (
        <>
        <Navbar store={false}/>
        <Wrapper>
            <h1>YOUR CART</h1>
            {userCart.map(i=> <CartItem key={i.cartId} cartId={i.cartId} name={i.name} cover={i.imageUrl} category={i.categoryName} price={String(i.price/100).replace(".",",")} removeFromCart={removeFromCart}/>)}
            {userCart.length?
                <Footer>
                    <ConfirmButton onClick={()=>history.push("/checkout")}>
                        <p>Total: R$ {String(userCart.reduce((t,i)=>t+i.price,0)/100).replace(".",",")}</p>
                        <span>CHECKOUT</span>
                    </ConfirmButton>
                </Footer>:
                <>
                    <p>You dont have any itens in your cart!</p>
                    <p>click <span onClick={()=>history.push('/main')}>here</span> to go back to the store</p>
                    
                </>
            }
        </Wrapper>
        </>
    )
}

const Wrapper= styled.div`
    margin: 0 auto;
    padding: 120px 25px;
    max-width: 420px;
    background-color:#dbdbdb;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:20px;
    h1{
        font-family: 'Fredericka the Great', cursive;
        font-size: 25px;
    }
    span{
        color:#56AD6E;
    }
`

const Footer= styled.div`
    width: 100%;
    background-color: #dbdbdb;
    height: 100px;
    position:fixed;
    left:0;
    bottom:0;
    display:flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0px 10px #474747;
`

const ConfirmButton = styled.button`
    background-color: #474747;
    width: 80%;
    height: 80%;
    border-radius: 50px;
    p{
        font-size: 20px;
        color:#56AD6E;
    }
    span{
        color:#56AD6E;
        font-size: 30px;
        font-weight: bold;
    }
`