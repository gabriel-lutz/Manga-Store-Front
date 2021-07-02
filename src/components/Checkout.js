import Navbar from "./Navbar/Navbar"
import styled from "styled-components"
import {useState, useContext, useEffect} from "react"
import UserContext from "../contexts/UserContext"
import axios from "axios"
import {useHistory} from "react-router-dom"

export default function Checkout(){
    const {userInfo} = useContext(UserContext)
    const [userCart,setUserCart]=useState([])
    const [checkoutData, setCheckoutData] = useState()
    const history = useHistory()

    useEffect(()=>{
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
        }}
        axios.get("http://localhost:4000/cart",config).then((r)=>{
            setUserCart(r.data)
        }).catch((e)=>{
            alert("could not connect to server")
        })
    },[userInfo.token])

    function checkout(e){
        e.preventDefault()
        if(!window.confirm(`Confirm purchase of ${userCart.length} itens for R$ ${String(userCart.reduce((t,i)=>t+i.price,0)/100).replace(".",",")}?`)){return}
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
        }}
        axios.post(`http://localhost:4000/check-out`,{checkoutData},config).then((r)=>{
            history.push('/main')
            alert("Purchase completed! Redirected do store!")
        }).catch((e)=>{
            alert("Something went wrong, try again in a few minutes.")
        })
    }

    return(
        <>
            <Navbar></Navbar>
            <H1>CHECKOUT</H1>
            <Form>
                <p>Receiver name :</p>
                <Input 
                    placeholder="Ex.: Uncle Phil " 
                    onChange={e =>{ setCheckoutData({...checkoutData, deliverName: e.target.value})}}>
                </Input>
                <p>Contact number :</p>
                <Input
                    type="number" 
                    placeholder="(xx) xxxxx-xxxx"
                    onChange={e =>{ setCheckoutData({...checkoutData, deliverPhoneNumber: e.target.value})}}>
                </Input>
                <p>Deliver address :</p>
                <Input 
                    placeholder="Ex.: 251 north Bristol avenue..."
                    onChange={e =>{ setCheckoutData({...checkoutData, deliverAddress: e.target.value})}}>
                </Input>
                <p>Credit card number :</p>
                <Input 
                    type="number" 
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    onChange={e =>{ setCheckoutData({...checkoutData, creditCardNumber: e.target.value})}}>
                </Input>
                <Footer>
                    {checkoutData?.deliverName?.length > 3 
                    && checkoutData.deliverPhoneNumber?.length > 8 
                    && checkoutData.deliverAddress?.length > 5 
                    && checkoutData.creditCardNumber?.length >4 
                    ?<ConfirmButton onClick={checkout}>
                        <p>Total: R$ {String(userCart.reduce((t,i)=>t+i.price,0)/100).replace(".",",")}</p>
                        <span>CONFIRM</span>
                     </ConfirmButton>
                    :<ConfirmButton disabled={true}>
                        <span>FILL IN YOUR INFO</span>
                     </ConfirmButton>
                    }
                </Footer>   
            </Form>
        </>
    )
}

const H1 = styled.div`
    text-align: center;
    margin-top: 125px;
    font-family: 'Fredericka the Great', cursive;
    font-size: 25px;
`

const Form = styled.form`
    margin-top: 25px;
    padding: 0 25px;
    p{
        margin-bottom: 5px;
    }
`

const Input = styled.input`
    height: 40px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    padding-left: 15px;
    margin-bottom: 25px;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    ::placeholder{
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 23px;
        color: lightgray;
    }
`;

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