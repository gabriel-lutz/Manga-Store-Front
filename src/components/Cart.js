import styled from "styled-components"
import {useState, useContext, useEffect} from "react"
import UserContext from "../contexts/UserContext"
import axios from "axios"

import CartItem from "./CartItem"

export default function Cart() {
    const {userInfo} = useContext(UserContext)
    const [userCart,setUserCart]=useState([])

    useEffect(()=>{
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
        }}
        console.log("aqui")
        axios.get("http://localhost:4000/cart",config).then((r)=>{
            console.log(r)
            setUserCart(r.data)
        }).catch((e)=>{
            console.log(e)
            alert("could not connect to server")
        })
    },[])

    function removeFromCart(cartId,name){
        if(!window.confirm(`Confirm removing ${name} from cart?`)){return}

        const body = {cartId, teste:"rodrigo"}
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
        }}
        console.log(config)
        axios.delete(`http://localhost:4000/cart-remove${cartId}`,config).then((r)=>{
            console.log(r)
            setUserCart(userCart.filter(i=> i.cartId===cartId? false:true))
        }).catch((e)=>{
            console.log(e)
            alert("could not connect to server")
        })
    }   

    function checkout(){
        if(!window.confirm(`Confirm purchase of ${userCart.length} itens?`)){return}
        console.log("checkout")
        //axios.post(`http://localhost:4000/check-out`)
    }

    return (
        <Wrapper>
            <h1>CART</h1>
            {userCart.map(i=> <CartItem key={i.cartId} cartId={i.cartId} name={i.name} cover={i.imageUrl} category={i.categoryName} price={String(i.price/100).replace(".",",")} removeFromCart={removeFromCart}/>)}
            <Footer>
                <ConfirmButton onClick={()=>checkout()}>
                    <p>Total: R$ {String(userCart.reduce((t,i)=>t+i.price,0)/100).replace(".",",")}</p>
                    <span>CONFIRM</span>
                </ConfirmButton>
            </Footer>
        </Wrapper>
    )
}

const Wrapper= styled.div`
    margin: 0 auto;
    padding: 120px 25px;
    max-width: 420px;
    background-color:#dbdbdb;
    display: flex;
    flex-direction: column;
    gap:20px;
`

const Footer= styled.div`
    width: 100%;
    background-color: white;
    height: 100px;
    position:fixed;
    left:0;
    bottom:0;
    display:flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0px 10px black;
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