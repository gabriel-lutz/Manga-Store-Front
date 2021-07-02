import styled from "styled-components"
import {FaShoppingCart, FaSignOutAlt, FaListUl} from "react-icons/fa"
import {useContext, useEffect} from "react"
import UserContext from "../../contexts/UserContext"
import axios from "axios"
import {useHistory} from "react-router-dom"

export default function Navbar({store}){
    const {userInfo,cartItens,setCartItens} = useContext(UserContext)
    const history = useHistory()

    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart`, config )
        promisse.then(data=>{
            setCartItens(data.data.length)
        })
        promisse.catch(()=>{
            alert("algo deu errado")
        })
    },[userInfo.token,setCartItens])

    function logout(){
        const header = {
            headers: {"Authorization": `${userInfo.token}`}
        }
        const promisse = axios.post(`${process.env.REACT_APP_API_BASE_URL}/logout`, {}, header)
        promisse.then(()=>{
            localStorage.clear()
            history.push('/')
        })
        promisse.catch((data)=>{
            if(data.response.status === 401){
                localStorage.clear()
                history.push('/')
            }
        })
    }
    
    return(
        <Conteiner>
            <UserMenu>
                <UserName>
                    <p>Bem vindo, {userInfo.user.name}</p>
                </UserName>
                <HorizontalSeparator></HorizontalSeparator>
                <CartLogoutWrapper>
                    <FaSignOutAlt onClick={logout} style={{cursor:'pointer'}}></FaSignOutAlt>
                    <VerticalSeparator></VerticalSeparator>
                    <FaListUl onClick={()=>{history.push("/history")}}></FaListUl>
                    <VerticalSeparator></VerticalSeparator>
                        {store?
                            <>
                                <FaShoppingCart onClick={()=>history.push('/cart')}></FaShoppingCart>
                                <p onClick={()=>history.push('/cart')}>{cartItens} itens</p>
                            </>:
                            <p onClick={()=>history.push('/main')}>Back to store</p>
                        }
                </CartLogoutWrapper>
            </UserMenu>
            <PageName> Mangá <br/>Store </PageName>
        </Conteiner>
    )
}

const Conteiner = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    height: 100px;
    background: #151515;
    color:white;
    z-index:2;
    box-shadow: 0 0px 10px #474747;
`

const UserMenu = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
`

const PageName = styled.h1`
    font-family: 'Fredericka the Great', cursive;
    font-size: 30px;
    word-break: break-all;
`

const CartLogoutWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    svg{
        font-size: 20px;
    }
`

const HorizontalSeparator = styled.div`
    width: 100%;
    border: 1px solid white;
`

const VerticalSeparator = styled.div`
    border: 1px solid white;
    height: 20px;
    margin: 0 5px;
`

const UserName = styled.div`
    font-size: 18px;
`
